"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcional: Registrar el error en un servicio de monitoreo
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase flex flex-col items-center justify-center text-center p-6 relative">
      {/* CAPA DE TEXTURA INDUSTRIAL */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[#D70000] font-black text-sm tracking-[0.5em] mb-4 italic">
          // SYSTEM_FAILURE
        </span>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-8 text-white">
          FALLA INESPERADA <span className="text-[#D70000]">DEL SISTEMA</span>
        </h2>
        <p className="text-gray-400 font-medium tracking-wide leading-relaxed text-sm md:text-base normal-case max-w-md mb-12">
          Algo no salió como se esperaba. Nuestro equipo técnico ha sido notificado.
        </p>

        <button
          onClick={() => reset()}
          className="group/btn relative inline-block px-10 py-5 font-black tracking-[0.3em] overflow-hidden border-2 border-white transition-all hover:text-black text-xs md:text-base"
        >
          <span className="relative z-10">INTENTAR DE NUEVO</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
}