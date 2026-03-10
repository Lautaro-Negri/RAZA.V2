// app/admin/CatalogoManager.tsx
"use client";

import { useState } from "react";
import EditLineaModal from "./EditLineaModal";

export default function CatalogoManager({ lineas }: { lineas: any[] }) {
  const [editingLinea, setEditingLinea] = useState<any | null>(null);

  return (
    <div className="mt-20">
      <h2 className="text-xl font-black italic tracking-tighter mb-8 border-l-4 border-gray-500 pl-4 uppercase">
        GESTIÓN DE <span className="text-[#D70000]">CONTENIDO TÉCNICO</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lineas.map((linea) => (
          <div key={linea.id} className="border border-gray-900 bg-[#050505] p-6 relative group overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[8px] font-mono text-gray-600 block tracking-widest">{linea.label}</span>
                <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">{linea.id}</h3>
              </div>
              <button 
                onClick={() => setEditingLinea(linea)}
                className="bg-white text-black px-3 py-1 text-[9px] font-black italic hover:bg-[#D70000] transition-colors"
              >
                EDITAR
              </button>
            </div>
            <p className="text-[10px] text-gray-500 font-mono line-clamp-2 italic uppercase">
              {linea.descripcion}
            </p>
          </div>
        ))}
      </div>

      {editingLinea && (
        <EditLineaModal 
          linea={editingLinea} 
          onClose={() => setEditingLinea(null)} 
        />
      )}
    </div>
  );
}