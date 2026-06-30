// app/deportiva/actions.ts
'use server' 

import { supabase } from "@/lib/supabase"; // Usamos tu misma librería
import { revalidatePath } from "next/cache";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Resend } from 'resend';

async function createAuthClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {}
        },
      },
    }
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleManifestAction(payload: any) {
  try {
    if (!payload || typeof payload !== "object") {
      return { success: false, error: "Payload inválido." };
    }

    const { contacto, jugadores, linea, prendas, fecha } = payload;

    if (!contacto?.nombreResponsable || !contacto?.nombreClub || !contacto?.telefono || !linea || !Array.isArray(prendas) || !Array.isArray(jugadores)) {
      return { success: false, error: "Faltan datos obligatorios en el protocolo de carga." };
    }

    const { data, error } = await supabase
      .from('manifiestos')
      .insert([{ 
        nombre_responsable: contacto.nombreResponsable,
        nombre_club: contacto.nombreClub,
        telefono: contacto.telefono,
        email: contacto.email,
        linea: linea,
        prendas: prendas,
        jugadores: jugadores,
        fecha_envio: fecha,
      }]);

    if (error) {
      console.error("Error en carga de manifiesto:", error.message);
      return { success: false, error: error.message };
    }

    const ownerEmail = 'razaindumentariaok@gmail.com';
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D70000;">📋 NUEVO MANIFIESTO REGISTRADO</h2>
        <p>Un nuevo pedido ha sido registrado en RAZA TECHNICAL CLOTHING.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Datos del Solicitante:</h3>
          <p><strong>Responsable:</strong> ${contacto.nombreResponsable}</p>
          <p><strong>Club/Equipo:</strong> ${contacto.nombreClub}</p>
          <p><strong>Teléfono:</strong> ${contacto.telefono}</p>
          <p><strong>Email:</strong> ${contacto.email || 'No proporcionado'}</p>
        </div>

        <div style="background-color: #fff8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Detalles del Pedido:</h3>
          <p><strong>Línea:</strong> ${linea}</p>
          <p><strong>Prendas:</strong> ${prendas.join(', ')}</p>
          <p><strong>Unidades:</strong> ${jugadores.length}</p>
          <p><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString('es-AR')}</p>
        </div>

        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #D70000;">
          <h3 style="margin-top: 0;">Jugadores/Unidades:</h3>
          <table style="width: 100%; font-size: 12px;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 5px;"><strong>N°</strong></td>
              <td style="padding: 5px;"><strong>Nombre</strong></td>
              <td style="padding: 5px;"><strong>Número</strong></td>
            </tr>
            ${jugadores.map((j: any, i: number) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 5px;">${String(i + 1).padStart(2, '0')}</td>
                <td style="padding: 5px;">${j.name || '-'}</td>
                <td style="padding: 5px;">${j.number || '-'}</td>
              </tr>
            `).join('')}
          </table>
        </div>

        <p style="margin-top: 30px; color: #666; font-size: 12px;">⏰ Accede al panel de admin para gestionar este pedido.</p>
      </div>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY no está configurada. El email no se envió.");
    } else {
      try {
        await resend.emails.send({
          from: 'noreply@raza.com',
          to: ownerEmail,
          subject: `📋 Nuevo Manifiesto: ${contacto.nombreClub} - ${linea}`,
          html: emailHtml,
        });
      } catch (sendError: any) {
        console.error("Error al enviar email de notificación:", sendError?.message || sendError);
      }
    }

    revalidatePath('/admin'); // Para que aparezca el nuevo pedido al instante
    return { success: true };
  } catch (error: any) {
    console.error("Error en handleManifestAction:", error?.message || error);
    return { success: false, error: error?.message || "Error inesperado al procesar el manifiesto." };
  }
}
export async function updateOrderStatus(id: number, nuevoEstado: string) {
  const supabaseAuth = await createAuthClient();
  const { data, error } = await supabaseAuth
    .from('manifiestos')
    .update({ estado: nuevoEstado })
    .eq('id', id);

  if (error) {
    console.error("Error al actualizar estado:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin'); // CRÍTICO: Esto actualiza la vista del admin
  return { success: true };
}

export async function updateCatalogoItem(id: string, updates: any) {
  const supabaseAuth = await createAuthClient();
  const { data, error } = await supabaseAuth
    .from('lineas_catalogo')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error("Error al actualizar catálogo:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateStreetwearStock(id: string, isSoldOut: boolean) {
  const supabaseAuth = await createAuthClient();
  // Si se marca como agotado, ponemos 0. Si se marca disponible, ponemos 100 (o cualquier positivo).
  const newStock = isSoldOut ? 0 : 100;

  const { error } = await supabaseAuth
    .from('streetwear_products')
    .update({ 
      stock: newStock, 
      sold_out: isSoldOut 
    })
    .eq('id', id);

  if (error) {
    console.error("Error stock:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  return { success: true };
}