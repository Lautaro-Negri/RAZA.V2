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
  // Desestructuramos para que coincida con tus columnas de la DB
  const { contacto, jugadores, linea, prendas, fecha } = payload;

  const { data, error } = await supabase
    .from('manifiestos') // La tabla que acabas de crear
    .insert([{
      nombre_responsable: contacto.nombreResponsable,
      nombre_club: contacto.nombreClub,
      telefono: contacto.telefono,
      email: contacto.email,
      linea: linea,
      prendas: prendas, 
      jugadores: jugadores, 
      fecha_envio: fecha
    }]);

  if (error) {
    console.error("Error en carga de manifiesto:", error.message);
    return { success: false, error: error.message };
  }

  // Enviar email con Resend
  if (contacto.email) {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D70000;">✅ Manifiesto Registrado</h2>
        <p>¡Hola ${contacto.nombreResponsable}!</p>
        <p>Tu manifiesto ha sido registrado exitosamente en RAZA TECHNICAL CLOTHING.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Detalles del Pedido:</h3>
          <p><strong>Club/Equipo:</strong> ${contacto.nombreClub}</p>
          <p><strong>Línea:</strong> ${linea}</p>
          <p><strong>Prendas:</strong> ${prendas.join(', ')}</p>
          <p><strong>Unidades:</strong> ${jugadores.length}</p>
          <p><strong>Teléfono:</strong> ${contacto.telefono}</p>
        </div>
        
        <p>Nos pondremos en contacto pronto para confirmar los detalles de tu pedido.</p>
        <p style="color: #666; font-size: 12px;">Este es un email automático, por favor no respondas directamente.</p>
      </div>
    `;

    await resend.emails.send({
      from: 'noreply@raza.com',
      to: contacto.email,
      subject: `Manifiesto Registrado - ${contacto.nombreClub}`,
      html: emailHtml,
    });
  }

  revalidatePath('/admin'); // Para que aparezca el nuevo pedido al instante
  return { success: true };
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