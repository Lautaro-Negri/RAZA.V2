// app/contacto/actions.ts
'use server' // <-- Esto es vital al inicio del archivo

import { supabase } from "@/lib/supabase";

export async function handleSubmitAction(rawFormData: { nombre: any; tipo: string; mensaje: any; contacto: any; }) {
  const { data, error } = await supabase
    .from('alianzas') 
    .insert([rawFormData]);

  if (error) {
    console.error("Error técnico de carga:", error);
    return { success: false };
  }

  return { success: true };
}