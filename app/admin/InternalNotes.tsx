// app/admin/InternalNotes.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNotesAction, deleteNoteAction } from "./actions";

export default function InternalNotes({ pedidoId, currentNotes }: { pedidoId: number, currentNotes: string | null }) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateNotesAction(pedidoId, note, currentNotes);
    if (result.success) {
      setNote(""); // Limpiamos el textarea
      router.refresh(); // Recargamos los datos de la página
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const handleDelete = async (index: number) => {
    if (!confirm("¿Eliminar esta nota permanentemente?")) return;
    setLoading(true);
    const result = await deleteNoteAction(pedidoId, index, currentNotes || "");
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  // Convertimos el string de notas en un array para mostrarlas individualmente
  const notesList = currentNotes ? currentNotes.split('\n') : [];

  return (
    <div className="mt-6 border-t border-gray-900 pt-6">
      <h4 className="text-[10px] font-mono tracking-widest text-gray-500 mb-4">// NOTAS INTERNAS DEL EQUIPO</h4>
      
      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-2">
        {notesList.map((n, i) => (
          <div key={i} className="bg-black p-3 border border-gray-800 flex justify-between items-start group hover:border-gray-700 transition-colors">
             <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap normal-case flex-1">{n}</pre>
             <button 
               onClick={() => handleDelete(i)}
               disabled={loading}
               className="text-[9px] text-zinc-700 hover:text-[#D70000] font-black ml-4 transition-colors uppercase opacity-0 group-hover:opacity-100"
               title="Eliminar nota"
             >
               [X]
             </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Añadir nota (ej: Falta vector del logo...)" rows={1} className="flex-grow bg-zinc-900 border border-gray-800 p-3 text-xs text-white focus:border-[#D70000] outline-none font-mono placeholder:text-gray-700 normal-case resize-y min-h-[44px]" />
        <button type="submit" disabled={loading || !note.trim()} className="bg-[#D70000] text-black px-6 font-black text-xs tracking-widest hover:bg-white transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed">
          {loading ? '...' : 'AÑADIR'}
        </button>
      </form>
    </div>
  );
}