import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-zinc-900 text-white pt-24 pb-12 relative overflow-hidden font-sans uppercase">
      
      {/* TEXTURA DE FONDO */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* DECORACIÓN TÉCNICA DE FONDO */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECCIÓN SUPERIOR: MARCA Y NEWSLETTER */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 border-b border-zinc-900 pb-16">
          
          {/* Columna Marca */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-2 h-2 bg-[#D70000] animate-pulse"></div>
               <span className="text-[#D70000] font-mono text-[10px] tracking-[0.3em]">SYSTEM_ONLINE</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 leading-none text-white">
              RAZA<span className="text-[#D70000]">.</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm normal-case leading-relaxed mb-10 max-w-sm">
              Equipamiento técnico de alto rendimiento. Diseñado para la competencia, fabricado con estándares industriales.
            </p>
            
            {/* Newsletter Input Técnico */}
            <div className="flex flex-col gap-2 w-full max-w-sm">
               <label className="text-[9px] font-mono text-gray-600 tracking-widest">SUSCRIPCIÓN A NOVEDADES</label>
               <div className="flex w-full border border-zinc-800 bg-black p-1 group focus-within:border-[#D70000] transition-colors">
                <input 
                  type="email" 
                  placeholder="INGRESA TU EMAIL" 
                  className="bg-transparent w-full px-4 py-3 text-xs font-mono text-white placeholder-zinc-700 outline-none uppercase"
                />
                <button className="bg-[#D70000] text-black px-6 py-2 font-black text-xs tracking-widest hover:bg-white transition-colors">
                  [+]
                </button>
              </div>
            </div>
          </div>

          {/* Grilla de Navegación */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10 w-full lg:w-auto">
            
            {/* Columna 1 */}
            <div className="flex flex-col gap-6">
              <span className="text-[#D70000] font-black text-[10px] tracking-[0.2em] border-b border-zinc-900 pb-2 block w-fit">
                // EXPLORAR
              </span>
              <ul className="flex flex-col gap-3">
                <li><Link href="/streetwear" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#D70000] transition-all"></span>STREETWEAR</Link></li>
                <li><Link href="/deportiva" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#D70000] transition-all"></span>DEPORTIVA</Link></li>
                <li><Link href="/alianzas" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#D70000] transition-all"></span>ALIANZAS</Link></li>
              </ul>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col gap-6">
              <span className="text-[#D70000] font-black text-[10px] tracking-[0.2em] border-b border-zinc-900 pb-2 block w-fit">
                // SOPORTE
              </span>
              <ul className="flex flex-col gap-3">
                <li><Link href="/faq" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#D70000] transition-all"></span>FAQ</Link></li>
                <li><Link href="/garantia" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#D70000] transition-all"></span>GARANTÍA</Link></li>
                <li><Link href="/contacto" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#D70000] transition-all"></span>CONTACTO</Link></li>
              </ul>
            </div>

             {/* Columna 3 */}
             <div className="flex flex-col gap-6">
              <span className="text-[#D70000] font-black text-[10px] tracking-[0.2em] border-b border-zinc-900 pb-2 block w-fit">
                // SOCIAL
              </span>
              <ul className="flex flex-col gap-3">
                <li><a href="https://www.instagram.com/raza_indumentaria.ok/?hl=es" target="_blank" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#D70000] transition-all"></span>INSTAGRAM</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#D70000] transition-all"></span>FACEBOOK</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* SECCIÓN INFERIOR: DATOS TÉCNICOS */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          
          <div className="flex flex-col gap-2">
             <span className="text-zinc-500 font-mono text-[9px] tracking-widest">
               © 2024 RAZA TECHNICAL GEAR.
             </span>
             <div className="flex gap-4 text-zinc-600 font-mono text-[9px] tracking-widest">
                <Link href="#" className="hover:text-white transition-colors">PRIVACIDAD</Link>
                <span>|</span>
                <Link href="#" className="hover:text-white transition-colors">TÉRMINOS</Link>
             </div>
          </div>

          <div className="text-right">
             <span className="text-zinc-700 font-mono text-[8px] tracking-[0.4em] block mb-1">
               DESIGNED_FOR_PERFORMANCE
             </span>
             <span className="text-[#D70000] font-black text-lg tracking-tighter italic">
               RAZA.
             </span>
          </div>

        </div>

      </div>
      
      {/* Esquinas Decorativas */}
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-zinc-800"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-zinc-800"></div>
    </footer>
  );
}