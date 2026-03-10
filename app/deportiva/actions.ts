// app/deportiva/actions.ts
'use server' 

import { supabase } from "@/lib/supabase"; // Usamos tu misma librería
import { revalidatePath } from "next/cache";

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

  revalidatePath('/admin'); // Para que aparezca el nuevo pedido al instante
  return { success: true };
}
export async function updateOrderStatus(id: number, nuevoEstado: string) {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
    .from('lineas_catalogo')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error("Error al actualizar catálogo:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateStreetwearStock(id: string, newStock: number) {
  const isSoldOut = newStock <= 0;
  const { error } = await supabase
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

  return { success: true };
}