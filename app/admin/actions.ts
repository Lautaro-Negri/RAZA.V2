"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

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

export async function updateNotesAction(pedidoId: number, newNote: string, currentNotes: string | null) {
  if (!newNote.trim()) {
    return { error: "La nota no puede estar vacía." };
  }

  // Formateamos la nueva nota con fecha y hora
  const timestamp = new Date().toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const formattedNote = `[${timestamp}] - ${newNote}`;
  
  // Unimos la nota nueva con las existentes
  const updatedNotes = currentNotes 
    ? `${currentNotes}\n${formattedNote}`
    : formattedNote;

  // Actualizamos el registro en Supabase
  const supabaseAuth = await createAuthClient();
  const { error } = await supabaseAuth
    .from('manifiestos')
    .update({ notas_internas: updatedNotes })
    .eq('id', pedidoId);

  if (error) {
    return { error: `Error al guardar la nota: ${error.message}` };
  }

  return { success: true };
}

export async function clearNotesAction(pedidoId: number) {
  const supabaseAuth = await createAuthClient();
  const { error } = await supabaseAuth
    .from('manifiestos')
    .update({ notas_internas: null })
    .eq('id', pedidoId);

  if (error) {
    return { error: `Error al eliminar las notas: ${error.message}` };
  }

  return { success: true };
}

export async function deleteNoteAction(pedidoId: number, indexToRemove: number, currentNotesStr: string) {
  if (!currentNotesStr) return { error: "No hay notas para eliminar." };

  // Convertimos el string en array separando por saltos de línea
  const notes = currentNotesStr.split('\n');
  
  // Eliminamos la nota en la posición indicada
  if (indexToRemove >= 0 && indexToRemove < notes.length) {
    notes.splice(indexToRemove, 1);
  }

  // Si no quedan notas, guardamos null, si no, unimos de nuevo con saltos de línea
  const updatedNotes = notes.length > 0 ? notes.join('\n') : null;

  const supabaseAuth = await createAuthClient();
  const { error } = await supabaseAuth
    .from('manifiestos')
    .update({ notas_internas: updatedNotes })
    .eq('id', pedidoId);

  if (error) {
    return { error: `Error al eliminar la nota: ${error.message}` };
  }

  return { success: true };
}