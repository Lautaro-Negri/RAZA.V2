import Link from "next/link";
import Image from "next/image";

export default function AdnPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase pt-32 pb-40 relative overflow-hidden">
      
      {/* EFECTOS DE FONDO */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="pointer-events-none fixed inset-0 z-50 opacity-10 mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,4px_100%]"></div>

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D70000]/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D70000]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      {/* LOGO GIGANTE DE FONDO */}
      <div className="absolute -bottom-20 -right-20 md:-bottom-40 md:-right-40 z-0 opacity-[0.04] pointer-events-none mix-blend-screen animate-in fade-in slide-in-from-bottom-48 slide-in-from-right-48 duration-[1500ms] ease-out">
        <Image 
          src="/LogoRaza.png" 
          width={1000} 
          height={1000} 
          alt="Raza Background" 
          className="w-[800px] md:w-[1200px] -rotate-45 blur-[2px]"
        />
      </div>


      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* ESQUINAS TÉCNICAS (Markers) */}
        <div className="absolute -top-10 -left-6 md:-left-16 w-16 h-16 border-t-2 border-l-2 border-[#D70000]/30 pointer-events-none"></div>
        <div className="absolute -top-10 -right-6 md:-right-16 w-16 h-16 border-t-2 border-r-2 border-[#D70000]/30 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-6 md:-left-16 w-16 h-16 border-b-2 border-l-2 border-[#D70000]/30 pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-6 md:-right-16 w-16 h-16 border-b-2 border-r-2 border-[#D70000]/30 pointer-events-none"></div>

        {/* ENCABEZADO */}
        <div className="mb-16 border-b border-gray-900 pb-10">
          <span className="text-[#D70000] font-black text-[10px] md:text-xs tracking-[0.4em] block mb-4 italic">
            // CORE_MANIFESTO
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white">
            ADN <span className="text-[#D70000]">RAZA</span>
          </h1>
        </div>

        {/* CONTENIDO */}
        <div className="space-y-8 text-lg text-gray-300 font-medium normal-case leading-relaxed">
          <p className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            RAZA surge de una idea simple: la camiseta no es ropa, es <strong className="text-white font-black uppercase tracking-wider">sentido de pertenencia</strong>. Sabemos lo que se siente defender un escudo, unos colores, un barrio, una historia.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Por eso diseñamos y fabricamos prendas que representan quiénes son dentro y fuera de la cancha, con el respeto que se merece cada club, cada equipo y cada jugador.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            No hacemos modelos genéricos: escuchamos, interpretamos y transformamos su esencia en una piel propia.
          </p>
          <blockquote className="border-l-4 border-[#D70000] pl-6 py-2 my-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <p className="text-2xl font-black italic !uppercase text-white !tracking-tight !leading-snug">
              Somos la marca que convierte sus colores en pertenencia. Esa es nuestra RAZA.
            </p>
          </blockquote>
        </div>

      </div>
    </div>
  );
}
