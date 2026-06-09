// app/admin/EditLineaModal.tsx
"use client";

import { useState } from "react";
import { updateCatalogoItem } from "../deportiva/actions";

export default function EditLineaModal({ linea, onClose }: { linea: any, onClose: () => void }) {
  const [formData, setFormData] = useState({
    label: linea.label,
    img: linea.img,
    descripcion: linea.descripcion,
    specs: Array.isArray(linea.specs) ? linea.specs.join(", ") : ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

const specsArray = formData.specs
  .split(",")
  .map((s: string) => s.trim())
  .filter((s: string) => s !== "");

    const result = await updateCatalogoItem(linea.id, {
      label: formData.label,
      img: formData.img,
      descripcion: formData.descripcion,
      specs: specsArray
    });

    if (result.success) {
      alert("SISTEMA ACTUALIZADO: DATOS DE " + linea.id + " GUARDADOS.");
      window.location.reload();
    } else {
      alert("ERROR: " + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-[#050505] border border-gray-800 w-full max-w-2xl p-8 relative animate-in zoom-in-95 duration-300">
        
        <div className="flex justify-between items-center mb-8 border-b border-gray-900 pb-4">
          <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">
            EDITAR UNIDAD: <span className="text-[#D70000]">{linea.id}</span>
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white font-mono text-xs tracking-widest">[X] CERRAR</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono text-gray-500 tracking-[0.3em]">ETIQUETA_REF</label>
              <input 
                type="text" 
                value={formData.label}
                onChange={(e) => setFormData({...formData, label: e.target.value})}
                className="bg-black border border-gray-800 p-3 text-xs text-white focus:border-[#D70000] outline-none font-mono"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono text-gray-500 tracking-[0.3em]">URL_IMAGEN_FONDO</label>
              <input 
                type="text" 
                value={formData.img}
                onChange={(e) => setFormData({...formData, img: e.target.value})}
                className="bg-black border border-gray-800 p-3 text-xs text-white focus:border-[#D70000] outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-mono text-gray-500 tracking-[0.3em]">DESCRIPCIÓN_PRINCIPAL</label>
            <textarea 
              rows={2}
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="bg-black border border-gray-800 p-3 text-xs text-white focus:border-[#D70000] outline-none font-mono resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-mono text-gray-500 tracking-[0.3em]">SPECS_TÉCNICAS (SEPARAR POR COMAS)</label>
            <textarea 
              rows={3}
              value={formData.specs}
              onChange={(e) => setFormData({...formData, specs: e.target.value})}
              placeholder="SECADO RÁPIDO, TEJIDO TÉCNICO, ETC..."
              className="bg-black border border-gray-800 p-3 text-xs text-white focus:border-[#D70000] outline-none font-mono resize-none"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#D70000] text-black font-black py-4 text-xs tracking-[0.4em] hover:bg-white transition-all disabled:opacity-50"
          >
            {loading ? "TRANSFERIENDO DATOS..." : "CONFIRMAR ACTUALIZACIÓN"}
          </button>
        </form>
      </div>
    </div>
  );
}