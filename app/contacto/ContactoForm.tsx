"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { handleSubmitAction } from "./actions";

function ContactoFormContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [tipo, setTipo] = useState("CLUB / INSTITUCIÓN");

  useEffect(() => {
    const t = searchParams.get("tipo");
    if (t === "embajador") setTipo("DEPORTISTA / EMBAJADOR");
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    
    const dataToSend = {
      nombre: formData.get("nombre"),
      tipo: tipo, 
      contacto: formData.get("contacto"),
      mensaje: formData.get("mensaje"),
    };

    const result = await handleSubmitAction(dataToSend);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase pt-32 pb-40">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="border-b border-gray-900 pb-10 mb-12">
          <span className="text-[#D70000] font-black text-[10px] tracking-[0.5em] block mb-4 italic uppercase">
            // COMMUNICATION PROTOCOL
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase">
            SOLICITAR <span className="text-[#D70000]">DESPLIEGUE</span>
          </h1>
        </div>

        {status === "success" ? (
          <div className="bg-[#050505] border border-[#D70000] p-12 text-center animate-pulse">
            <h2 className="text-2xl font-black italic mb-4 text-white uppercase">MENSAJE TRANSMITIDO</h2>
            <p className="text-gray-400 normal-case mb-8 font-medium">
              Tu solicitud ha sido registrada en el sistema RAZA. Un oficial se pondrá en contacto pronto.
            </p>
            <button onClick={() => setStatus("idle")} className="text-[#D70000] font-black text-xs tracking-widest border-b border-[#D70000]">
              ENVIAR OTRA SOLICITUD
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black text-gray-500 tracking-[0.3em]">01. TIPO DE VÍNCULO</span>
              <div className="flex gap-4">
                {["CLUB / INSTITUCIÓN", "DEPORTISTA / EMBAJADOR"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipo(t)}
                    className={`flex-1 py-4 text-[10px] font-black tracking-widest border transition-all ${
                      tipo === t ? "bg-[#D70000] border-[#D70000] text-black" : "bg-black border-gray-800 text-gray-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input required name="nombre" placeholder="NOMBRE DEL CLUB O DEPORTISTA" className="bg-transparent border-b border-gray-800 p-4 text-sm focus:outline-none focus:border-[#D70000] font-bold tracking-widest" />
              <input required name="contacto" placeholder="WHATSAPP O EMAIL" className="bg-transparent border-b border-gray-800 p-4 text-sm focus:outline-none focus:border-[#D70000] font-bold tracking-widest" />
            </div>

            <textarea required name="mensaje" rows={5} placeholder="ESCRIBÍ TU PROPUESTA AQUÍ..." className="bg-[#050505] border border-gray-800 p-6 text-sm focus:outline-none focus:border-[#D70000] font-bold tracking-widest resize-none" />

            <button disabled={status === "loading"} className="mt-8 bg-[#D70000] text-black py-6 font-black text-xs tracking-[0.4em] hover:bg-white transition-colors disabled:opacity-50">
              {status === "loading" ? "TRANSMITIENDO..." : "INICIAR DESPLIEGUE ↓"}
            </button>
            
            {status === "error" && <p className="text-red-600 font-black text-[10px] text-center tracking-widest">ERROR DE CONEXIÓN. REINTENTE.</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactoForm() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] pt-32 text-center text-white font-black tracking-widest">CARGANDO...</div>}>
      <ContactoFormContent />
    </Suspense>
  );
}