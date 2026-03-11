import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Datos de las tarjetas verticales
  const featuredKits = [
    {
      id: "POTRERO",
      tag: "UNIT_01",
      title: "SET POTRERO",
      desc: "RESISTENCIA PURA PARA EL BARRO.",
      img: "/images/kit-potrero.png",
    },
    {
      id: "CENIT",
      tag: "UNIT_02",
      title: "SET CENIT",
      desc: "EL EQUILIBRIO TÉCNICO DEFINITIVO.",
      img: "/images/kit-cenit.png",
    },
    {
      id: "INSIGNIA",
      tag: "UNIT_03",
      title: "SET INSIGNIA",
      desc: "INGENIERÍA ÉLITE DE COMPETICIÓN.",
      img: "/images/kit-insignia.png",
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col font-sans uppercase relative bg-black">
      {/* CAPA DE TEXTURA INDUSTRIAL (GLOBAL) */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* EFECTOS DE PANTALLA GLOBAL (CRT/Scanlines & Vignette) */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-20 mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
      <div className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.2)_100%)]"></div>

      {/* ========================================= */}
      {/* CONTENEDOR HERO */}
      {/* ========================================= */}
      <div className="h-screen w-full flex flex-col relative overflow-hidden">

        {/* MARQUESINA SUPERIOR */}
        <div className="w-full bg-[#0A0A0A] text-[#FFFFFF] py-2 z-40 overflow-hidden border-b border-[#D70000]/20 shrink-0">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-xs font-black tracking-[0.2em]">
                RAZA TECHNICAL GEAR • ACCESO TEMPORAL • NO REPOSICIÓN • CALIDAD
                INDUSTRIAL • RAZA TECHNICAL GEAR •
              </span>
            ))}
          </div>
        </div>

        {/* CONTENEDOR DE SECCIONES DIVIDIDO */}
        <div className="flex-1 flex flex-col md:flex-row relative">
          {/* LOGO CENTRAL */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden md:block pointer-events-none">
            <Image
              src="/LogoRaza.png"
              alt="RAZA"
              width={192}
              height={192}
              className="w-48 h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            />
          </div>

          {/* SECCIÓN STREETWEAR */}
          <div className="flex-1 bg-[#0A0A0A] text-white flex flex-col justify-center items-center p-10 relative group transition-all duration-700 ease-in-out md:hover:flex-[1.1] border-b md:border-b-0 md:border-r border-[#D70000]/20 overflow-hidden">
            
            {/* VIDEO BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <video
                src="/images/hoodiemuestra.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* FONDO CYBERPUNK (Grilla & Glow) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
               {/* Grilla Técnica */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>
            {/* Glow rojo ambiental superior */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D70000]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 text-center flex flex-col items-center">
              <span className="text-[#D70000] font-black tracking-[0.4em] mb-4 text-xs">
                DIVISIÓN / DROPS
              </span>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.8] tracking-tighter italic">
                STREET
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px white" }}
                >
                  WEAR
                </span>
              </h1>
              <Link
                href="/streetwear"
                className="group/btn relative inline-block px-10 py-5 font-black tracking-[0.3em] overflow-hidden border-2 border-white transition-all hover:text-black text-xs md:text-base"
              >
                <span className="relative z-10">VER CATÁLOGO</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>

          {/* SECCIÓN DEPORTIVA */}
          <div className="flex-1 bg-[#D70000] text-black flex flex-col justify-center items-center p-10 relative group transition-all duration-700 ease-in-out md:hover:flex-[1.1] overflow-hidden">
            
            {/* VIDEO BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <video
                src="/images/running.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#D70000]/50"></div>
            </div>

            {/* TEXTURA TÁCTICA DE FONDO */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>
            {/* Logo Gigante de Fondo */}
            <div className="absolute -bottom-24 -right-24 z-0 opacity-10 rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:rotate-0">
               <Image src="/LogoRaza.png" width={600} height={600} alt="Background Logo" className="w-[500px] h-auto brightness-0" />
            </div>

            <div className="relative z-10 text-center flex flex-col items-center">
              <span className="text-white font-black tracking-[0.4em] mb-4 text-xs">
                DIVISIÓN / EQUIPOS
              </span>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.8] tracking-tighter">
                LÍNEA
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  CLUBES
                </span>
              </h1>
              <Link
                href="/deportiva"
                className="group/btn relative inline-block px-10 py-5 font-black tracking-[0.3em] overflow-hidden border-2 border-black transition-all hover:text-white text-xs md:text-base"
              >
                <span className="relative z-10">ARMAR EQUIPO</span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* SECCIÓN: LÍNEAS DESTACADAS */}
      {/* ========================================= */}
      <section className="w-full mx-auto px-6 md:px-10 py-32 text-white relative z-10 overflow-hidden bg-black/20">
        
        {/* FONDO CYBERPUNK (Grilla & Glow) */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
        
        {/* Glow rojo lateral */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D70000]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D70000]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

        {/* LÍNEAS TÁCTICAS VERTICALES */}
        <div className="absolute left-6 md:left-10 top-0 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50 pointer-events-none"></div>
        <div className="absolute right-6 md:right-10 top-0 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="border-l-4 border-[#D70000] pl-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none">
              LÍNEAS DE <span className="text-[#D70000]">JUEGO</span>
            </h2>
            <p className="text-gray-500 font-bold text-[10px] tracking-[0.5em] mt-4 italic">
              // PERFORMANCE KITS INDUSTRIAL COLLECTION
            </p>
          </div>
          <Link
            href="/deportiva"
            className="text-[10px] font-black tracking-[0.3em] text-gray-500 hover:text-[#D70000] transition-colors underline underline-offset-8 decoration-[#D70000]/40"
          >
            EXPLORAR TODAS LAS LÍNEAS
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredKits.map((kit) => (
            <Link
              key={kit.id}
              href="/deportiva"
              className="group relative flex flex-col bg-[#050505] border border-gray-900 overflow-hidden hover:border-[#D70000] transition-all duration-500"
            >
              {/* Header técnico */}
              <div className="p-4 flex justify-between items-center border-b border-gray-900 bg-black/50 z-20 relative">
                <span className="text-[9px] font-mono text-gray-500 group-hover:text-[#D70000] transition-colors tracking-widest">
                  // {kit.tag}
                </span>
                <span className="text-[9px] font-mono text-gray-700 group-hover:text-white transition-colors">
                  [ + ]
                </span>
              </div>

              {/* Imagen Vertical */}
              <div className="aspect-[4/4] relative flex items-center justify-center overflow-hidden bg-black">
                {/* Grid background for tech feel */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20"></div>
                
                <Image
                  src={kit.img}
                  alt={kit.id}
                  fill
                  className="object-contain opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Content positioning */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
                  <h3 className="text-5xl font-black italic tracking-tighter leading-none mb-3 text-white group-hover:text-[#D70000] transition-colors duration-300">
                    {kit.id}
                  </h3>
                  <div className="h-px w-12 bg-gray-800 group-hover:w-full group-hover:bg-[#D70000] transition-all duration-700 mb-4"></div>
                  <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {kit.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================= */}
      {/* SECCIÓN: ALIANZAS & REPRESENTACIÓN */}
      {/* ========================================= */}
      <section className="w-full border-t border-b border-[#D70000]/30 bg-[#050505] py-20 relative overflow-hidden z-10">
        
        {/* TEXTURA TÁCTICA DE FONDO */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#333_10px,#333_12px)]"></div>
        
        {/* Detalle técnico de borde rojo superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#D70000]"></div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Textos */}
          <div className="flex-1 text-center lg:text-left">
            <span className="text-[#D70000] font-black text-[10px] tracking-[0.5em] block mb-4 italic">
              // B2B & PARTNERSHIPS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter italic mb-4 text-white">
              ALIANZAS &{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
              >
                REPRESENTACIÓN
              </span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-bold tracking-widest max-w-2xl leading-relaxed mx-auto lg:mx-0">
              BUSCAMOS ACUERDOS SERIOS CON CLUBES, INSTITUCIONES Y DEPORTISTAS
              QUE COMPARTAN NUESTROS VALORES.
            </p>
          </div>

          {/* Botón Call to Action - AHORA SIN SOMBRAS, CORTE LIMPIO */}
          <div className="flex-none w-full lg:w-auto">
            <Link
              href="/alianzas"
              className="group relative w-full lg:w-auto flex items-center justify-center px-10 py-6 bg-[#D70000] text-black font-black text-xs md:text-sm tracking-[0.4em] hover:bg-white transition-all duration-300 border border-[#D70000]"
            >
              <span>QUIERO SER PARTNER RAZA</span>
            </Link>
          </div>
        </div>
      </section>
      {/* ========================================= */}
      {/* NUEVA SECCIÓN: SOPORTE Y DUDAS (FAQ & POLÍTICAS) */}
      {/* ========================================= */}
      <section className="w-full bg-[#0A0A0A] py-24 md:py-32 relative z-10 border-t border-gray-900 overflow-hidden">
        
        {/* FONDO CYBERPUNK (Grilla Fina) */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          {/* Encabezado */}
          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="border-l-4 border-[#D70000] pl-6 text-left">
              <span className="text-[#D70000] font-black text-[10px] tracking-[0.5em] block mb-4 italic uppercase">
                // KNOWLEDGE BASE & SUPPORT
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic text-white mb-4 uppercase">
                ¿TENÉS <span className="text-[#D70000]">DUDAS?</span>
              </h2>
              <p className="text-gray-400 font-medium tracking-wide text-sm md:text-base max-w-xl normal-case">
                Te dejamos todo claro para que trabajemos juntos con confianza.
              </p>
            </div>
          </div>

          {/* Grilla de Tarjetas de Soporte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tarjeta 1: FAQ */}
            <Link
              href="/faq"
              className="group bg-[#050505] border border-gray-900 p-8 md:p-12 hover:border-[#D70000]/60 transition-all duration-500 relative flex flex-col justify-between min-h-[250px]"
            >
              {/* Indicador lateral */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gray-900 group-hover:bg-[#D70000] transition-colors duration-500"></div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white mb-4 uppercase">
                  PREGUNTAS FRECUENTES
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed normal-case font-medium mb-8">
                  Respondemos las dudas más comunes sobre pedidos, talles, telas
                  y envíos.
                </p>
              </div>

              <div className="flex items-center text-[#D70000] font-black text-xs md:text-sm tracking-[0.2em] group-hover:text-white transition-colors uppercase border-t border-gray-900 pt-6">
                VER RESPUESTAS
                <span className="ml-3 text-lg leading-none group-hover:translate-x-3 transition-transform duration-300">
                  →
                </span>
              </div>
            </Link>

            {/* Tarjeta 2: Políticas */}
            <Link
              href="/garantia"
              className="group bg-[#050505] border border-gray-900 p-8 md:p-12 hover:border-[#D70000]/60 transition-all duration-500 relative flex flex-col justify-between min-h-[250px]"
            >
              {/* Indicador lateral */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gray-900 group-hover:bg-[#D70000] transition-colors duration-500"></div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white mb-4 uppercase">
                  GARANTÍA Y POLÍTICAS
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed normal-case font-medium mb-8">
                  Nuestro compromiso con la calidad y las condiciones claras
                  para cambios y reposiciones.
                </p>
              </div>

              <div className="flex items-center text-[#D70000] font-black text-xs md:text-sm tracking-[0.2em] group-hover:text-white transition-colors uppercase border-t border-gray-900 pt-6">
                LEER POLÍTICAS
                <span className="ml-3 text-lg leading-none group-hover:translate-x-3 transition-transform duration-300">
                  →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
