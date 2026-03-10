"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "../deportiva/actions";

export default function StatusSelector({ pedidoId, estadoActual }: { pedidoId: number, estadoActual: string }) {
  const [status, setStatus] = useState(estadoActual);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (nuevoEstado: string) => {
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
    <div className="relative group">
      <select 
        value={status}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value)}
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
  );
}