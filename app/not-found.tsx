import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase flex flex-col items-center justify-center text-center p-6 relative">
      {/* CAPA DE TEXTURA INDUSTRIAL */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[#D70000] font-black text-sm tracking-[0.5em] mb-4 italic">
          // ERROR_CODE: 404
        </span>
        <h1 className="text-8xl md:text-9xl font-black mb-2 leading-none tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter mb-8 text-white">
          RECURSO NO <span className="text-[#D70000]">LOCALIZADO</span>
        </h2>
        <p className="text-gray-400 font-medium tracking-wide leading-relaxed text-sm md:text-base normal-case max-w-md mb-12">
          La página que estás buscando fue movida, eliminada o nunca existió en
          este plano.
        </p>

        <Link
          href="/"
          className="group/btn relative inline-block px-10 py-5 font-black tracking-[0.3em] overflow-hidden border-2 border-white transition-all hover:text-black text-xs md:text-base"
        >
          <span className="relative z-10">VOLVER AL INICIO</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>
    </div>
  );
}