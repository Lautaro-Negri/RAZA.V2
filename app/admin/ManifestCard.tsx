// app/admin/ManifestCard.tsx
"use client";

import { useState } from "react";
import StatusSelector from "./StatusSelector";
import ExportCsvButton from "./ExportCsvButton";
import InternalNotes from "./InternalNotes";

export default function ManifestCard({ pedido }: { pedido: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const estadoVisual = pedido.estado || 'RECIBIDO';

  // Función para formatear la fecha
  const formattedDate = new Date(pedido.created_at).toLocaleDateString("es-AR", {
    day: "2-digit", month: "2-digit", year: "2-digit"
  });

  return (
    <div className={`border border-gray-800 bg-[#050505] relative overflow-hidden transition-all duration-300 ${isExpanded ? 'border-gray-600' : 'hover:border-gray-700'}`}>
      
      {/* Barra lateral de color según estado */}
      <div className={`absolute left-0 top-0 w-1 h-full transition-colors duration-500
        ${estadoVisual === 'RECIBIDO' ? 'bg-blue-600' : ''}
        ${estadoVisual === 'EN_DISEÑO' ? 'bg-purple-600' : ''}
        ${estadoVisual === 'PRODUCCION' ? 'bg-yellow-500' : ''}
        ${estadoVisual === 'DESPACHADO' ? 'bg-green-600' : ''}
        ${estadoVisual === 'ARCHIVADO' ? 'bg-zinc-700' : ''}
      `}></div>

      <div className="p-4 md:p-6">
        
        {/* HEADER (Siempre visible) */}
        <div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer group select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
               <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 border border-gray-800 uppercase rounded
                  ${estadoVisual === 'RECIBIDO' ? 'text-blue-500' : ''}
                  ${estadoVisual === 'EN_DISEÑO' ? 'text-purple-500' : ''}
                  ${estadoVisual === 'PRODUCCION' ? 'text-yellow-500' : ''}
                  ${estadoVisual === 'DESPACHADO' ? 'text-green-500' : ''}
                  ${estadoVisual === 'ARCHIVADO' ? 'text-zinc-500' : ''}
               `}>
                  {estadoVisual.replace('_', ' ')}
               </span>
               <span className="text-[10px] text-gray-500 font-mono tracking-widest">
                 REF_{pedido.id} // {formattedDate}
               </span>
            </div>
            
            <div className="flex items-center gap-4">
               <h2 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase text-white group-hover:text-[#D70000] transition-colors">
                 {pedido.nombre_club}
               </h2>
               <span className="text-gray-600 text-[10px] group-hover:text-white transition-colors">
                 {isExpanded ? "[ - ]" : "[ + ]"}
               </span>
            </div>
          </div>

          {!isExpanded && (
             <div className="hidden md:block text-right">
                <span className="text-[9px] text-gray-500 font-mono block tracking-widest uppercase">RESPONSABLE</span>
                <span className="text-xs text-gray-300 font-bold uppercase">{pedido.nombre_responsable}</span>
             </div>
          )}
        </div>

        {/* CONTENIDO DESPLEGABLE */}
        {isExpanded && (
          <div className="mt-8 pt-6 border-t border-gray-900 animate-in fade-in slide-in-from-top-2 duration-300">
            
            {/* Datos de contacto y acciones */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="text-[10px] text-gray-400 font-mono space-y-2 bg-zinc-900/20 p-4 border border-gray-800/50 w-full md:w-auto">
                <div className="flex gap-2 border-b border-gray-800 pb-1 mb-1">
                    <span className="text-gray-600 min-w-[80px]">RESPONSABLE:</span> 
                    <span className="text-white font-bold uppercase">{pedido.nombre_responsable}</span>
                </div>
                <div className="flex gap-2 border-b border-gray-800 pb-1 mb-1">
                    <span className="text-gray-600 min-w-[80px]">TELÉFONO:</span> 
                    <a href={`https://wa.me/${pedido.telefono}`} target="_blank" className="text-white hover:text-[#D70000]">{pedido.telefono} ↗</a>
                </div>
                <div className="flex gap-2">
                    <span className="text-gray-600 min-w-[80px]">EMAIL:</span> 
                    <span className="text-white">{pedido.email}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <ExportCsvButton pedido={pedido} />
                <StatusSelector pedidoId={pedido.id} estadoActual={estadoVisual} />
              </div>
            </div>

            {/* Tabla de Jugadores */}
            <div className="overflow-x-auto mb-8 bg-zinc-900/10 border border-gray-800/50">
              <table className="w-full text-left text-[10px] font-mono whitespace-nowrap">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-800 uppercase bg-black/40">
                    <th className="p-3 w-12 text-center border-r border-gray-800">#</th>
                    <th className="p-3 uppercase">JUGADOR</th>
                    <th className="p-3 w-16 text-center border-l border-gray-800">DORSAL</th>
                    {pedido.prendas.map((p: string) => (
                      <th key={p} className="p-3 text-center text-[#D70000] border-l border-gray-800 uppercase">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/40">
                  {pedido.jugadores.map((j: any, idx: number) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-2 text-center text-gray-600 border-r border-gray-800/30">{j.number || idx + 1}</td>
                      <td className="p-2 font-bold text-gray-300 uppercase pl-3">{j.name || "S/N"}</td>
                      <td className="p-2 text-center text-gray-500 border-l border-gray-800/30">{j.number || "-"}</td>
                      {pedido.prendas.map((p: string) => (
                        <td key={p} className="p-2 text-center text-gray-400 font-medium italic border-l border-gray-800/30 uppercase">
                          {j.sizes[p] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notas Internas */}
            <InternalNotes pedidoId={pedido.id} currentNotes={pedido.notas_internas} />
          </div>
        )}
      </div>
    </div>
  );
}
