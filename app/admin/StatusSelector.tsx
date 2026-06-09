"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "../deportiva/actions";

export default function StatusSelector({ pedidoId, estadoActual }: { pedidoId: number, estadoActual: string }) {
  const [status, setStatus] = useState(estadoActual);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (nuevoEstado: string) => {
    if (nuevoEstado === 'ARCHIVADO' && !confirm("¿Estás seguro de archivar este pedido? Se ocultará de la vista principal.")) return;

    const estadoAnterior = status; // Guardamos backup
    setLoading(true);
    setStatus(nuevoEstado); // Actualización optimista

    try {
      const result = await updateOrderStatus(pedidoId, nuevoEstado);
      
      if (result.success) {
        router.refresh();
      } else {
        throw new Error(result.error || "Error desconocido al guardar");
      }
    } catch (error: any) {
      alert("NO SE PUDO GUARDAR: " + error.message + "\n\nTip: Revisa las políticas RLS en Supabase.");
      setStatus(estadoAnterior); // Revertimos al estado real
    }
    setLoading(false);
  };

  return (
    <>
      {status !== 'ARCHIVADO' && (
        <div className="relative group">
          <select 
            value={status}
            disabled={loading}
            onChange={(e) => handleUpdate(e.target.value)}
            className={`bg-black border p-2 text-[10px] font-black tracking-widest outline-none cursor-pointer transition-all uppercase
              ${loading ? 'opacity-50 grayscale' : ''}
              ${status === 'RECIBIDO' ? 'border-blue-900 text-blue-400' : ''}
              ${status === 'EN_DISEÑO' ? 'border-purple-900 text-purple-400' : ''}
              ${status === 'PRODUCCION' ? 'border-yellow-900 text-yellow-400' : ''}
              ${status === 'DESPACHADO' ? 'border-green-900 text-green-400' : ''}
            `}
          >
            <option value="RECIBIDO">● RECIBIDO</option>
            <option value="EN_DISEÑO">● EN DISEÑO</option>
            <option value="PRODUCCION">● EN PRODUCCIÓN</option>
            <option value="DESPACHADO">● DESPACHADO</option>
          </select>
          {loading && <span className="absolute -right-6 top-2 animate-spin text-[8px]">⌛</span>}
        </div>
      )}

      {status === 'DESPACHADO' && (
        <button
          onClick={() => handleUpdate('ARCHIVADO')}
          disabled={loading}
          className="border border-zinc-800 text-zinc-500 px-4 py-2 font-mono text-[9px] tracking-widest hover:border-zinc-600 hover:text-zinc-300 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "ARCHIVAR"}
        </button>
      )}

      {status === 'ARCHIVADO' && (
        <div className="flex flex-col items-center justify-center p-2 border border-dashed border-zinc-800 w-full">
          <span className="text-zinc-600 text-[9px] font-black tracking-widest">ARCHIVADO</span>
          <button
            onClick={() => handleUpdate('DESPACHADO')}
            disabled={loading}
            className="text-zinc-500 hover:text-white text-[8px] font-bold tracking-widest"
          >
            (RESTAURAR)
          </button>
        </div>
      )}
    </>
  );
}