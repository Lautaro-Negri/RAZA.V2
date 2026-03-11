"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function StreetwearOrderActions({ order }: { order: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateStatus = async (newStatus: string) => {
    if (!confirm(`¿Estás seguro de cambiar el estado a ${newStatus}?`)) return;
    setLoading(true);

    try {
      const { error, data } = await supabase
        .from('pedidos')
        .update({ estado: newStatus })
        .eq('id', order.id)
        .select(); // Importante: devuelve los datos modificados

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("No se pudo actualizar (Bloqueo de seguridad RLS)");

      toast.success(`PEDIDO ${newStatus}`);
      router.refresh(); // Recarga la página para ver los cambios
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {order.estado === 'PENDIENTE' && (
        <button
          onClick={() => updateStatus('DESPACHADO')}
          disabled={loading}
          className="bg-[#D70000] text-black px-3 py-1 text-[9px] font-black tracking-widest hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "MARCAR DESPACHADO"}
        </button>
      )}
      
      {order.estado === 'DESPACHADO' && (
        <button
          onClick={() => updateStatus('ARCHIVADO')}
          disabled={loading}
          className="border border-zinc-800 text-zinc-500 px-3 py-1 text-[9px] font-black tracking-widest hover:border-zinc-600 hover:text-zinc-300 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "ARCHIVAR"}
        </button>
      )}

      {order.estado === 'ARCHIVADO' && (
        <button
          onClick={() => updateStatus('DESPACHADO')}
          disabled={loading}
          className="border border-dashed border-zinc-800 text-zinc-600 px-3 py-1 text-[9px] font-black tracking-widest hover:border-zinc-500 hover:text-zinc-400 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "RESTAURAR"}
        </button>
      )}
    </div>
  );
}