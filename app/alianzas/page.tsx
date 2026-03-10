import Link from "next/link";

export default function AlianzasPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase pt-32 pb-32 relative">
      
      {/* TEXTURA DE FONDO */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ========================================= */}
        {/* ENCABEZADO: FORMATO PANEL TÉCNICO */}
        {/* ========================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-end mb-16">
          
          {/* Columna Izquierda: Título */}
          <div className="flex-1 w-full">
            <span className="text-[#D70000] font-black text-[10px] md:text-xs tracking-[0.4em] block mb-4 italic border-b border-gray-900 pb-4">
              // B2B & BRAND PARTNERSHIPS
            </span>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 text-white leading-none">
              ALIANZAS & <br/><span className="text-[#D70000]">REPRESENTACIÓN</span>
            </h1>
            <p className="text-gray-300 font-medium tracking-wide leading-relaxed text-sm md:text-base normal-case max-w-xl">
              En RAZA buscamos construir acuerdos serios con clubes, instituciones deportivas y deportistas que compartan nuestros valores: identidad, compromiso y crecimiento mutuo.
            </p>
          </div>

          {/* Columna Derecha: La Regla de Oro */}
          <div className="flex-1 w-full lg:border-l-2 border-[#D70000] lg:pl-10">
            <blockquote className="py-2">
              <p className="text-xl md:text-2xl font-black italic tracking-tight text-white leading-snug uppercase">
                "NO REGALAMOS CAMISETAS: INVERTIMOS DONDE HAY PROYECTO, PERTENENCIA Y VISIBILIDAD REAL."
              </p>
            </blockquote>
            <p className="text-gray-500 font-bold tracking-[0.2em] text-[10px] md:text-xs mt-6 uppercase">
              SI CREÉS QUE TU CLUB O TU NOMBRE PUEDE VESTIR Y REPRESENTAR NUESTRA RAZA, QUEREMOS ESCUCHARTE.
            </p>
          </div>

        </div>

        {/* ========================================= */}
        {/* BLOQUE UNIFICADO: EL DOSSIER */}
        {/* ========================================= */}
        <div className="w-full bg-[#050505] border border-gray-900 relative">
          
          {/* Acento superior rojo continuo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#D70000]"></div>

          {/* PARTE SUPERIOR: LAS DOS VÍAS (Grid sin separación exterior, divididas por un borde interno) */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* VÍA 1: CLUBES */}
            <div className="p-8 md:p-12 lg:border-r border-b lg:border-b-0 border-gray-900 flex flex-col justify-between group">
              <div>
                <div className="flex items-center gap-4 mb-8 border-b border-gray-900 pb-4">
                  <span className="text-[#D70000] font-black text-2xl md:text-3xl italic">01</span>
                  <h2 className="text-lg md:text-xl font-black italic tracking-tighter leading-none uppercase text-white group-hover:text-[#D70000] transition-colors">
                    PARA CLUBES E INSTITUCIONES
                  </h2>
                </div>
                
                <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-8 font-medium normal-case">
                  Ofrecemos convenios de proveeduría oficial de indumentaria, con beneficios para el club y un marco claro para todos:
                </p>
                
                <ul className="space-y-5 mb-10">
                  {[
                    "Diseño exclusivo de camiseta y línea completa del club.",
                    "Condiciones preferenciales en precios y reposiciones.",
                    "Priorización en tiempos de producción.",
                    "Opciones de co-branding y activaciones en redes, eventos y torneos.",
                    "Posibilidad de acuerdos de exclusividad por temporada."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm font-medium text-gray-300 normal-case">
                      <span className="text-[#D70000] font-black mt-1">■</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-gray-500 text-xs leading-relaxed font-bold mb-10 uppercase tracking-wide">
                  <p className="mb-4">Buscamos instituciones organizadas, con proyección y verdadero sentido de pertenencia.</p>
                  <p>Si tu club quiere dar un salto de identidad y trabajar con un solo proveedor de confianza, hablá con nosotros.</p>
                </div>
              </div>
              
              <Link href="/contacto?tipo=club" className="w-full bg-[#D70000] text-black py-5 flex items-center justify-center font-black text-xs tracking-[0.2em] hover:bg-white transition-colors border border-[#D70000] hover:border-white uppercase">
                QUIERO QUE RAZA SEA PROVEEDOR
              </Link>
            </div>

            {/* VÍA 2: EMBAJADORES */}
            <div className="p-8 md:p-12 flex flex-col justify-between group">
              <div>
                <div className="flex items-center gap-4 mb-8 border-b border-gray-900 pb-4">
                  <span className="text-white font-black text-2xl md:text-3xl italic opacity-50">02</span>
                  <h2 className="text-lg md:text-xl font-black italic tracking-tighter leading-none uppercase text-white group-hover:opacity-70 transition-opacity">
                    PARA DEPORTISTAS & EMBAJADORES
                  </h2>
                </div>
                
                <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-8 font-medium normal-case">
                  También generamos acuerdos con deportistas y creadores de contenido con llegada real a su comunidad:
                </p>
                
                <ul className="space-y-5 mb-10">
                  {[
                    "Proveeduría de indumentaria RAZA seleccionada.",
                    "Lanzamiento de cápsulas personalizadas (cuando el proyecto lo justifique).",
                    "Contenido en conjunto en redes y acciones en torneos, clínicas o eventos."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm font-medium text-gray-300 normal-case">
                      <span className="text-white font-black mt-1">■</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-gray-500 text-xs leading-relaxed font-bold mb-10 uppercase tracking-wide">
                  <p>Buscamos perfiles que sumen valor a la marca, no sólo números: actitud, autenticidad y coherencia con lo que representamos.</p>
                </div>
              </div>
              
              <Link href="/contacto?tipo=embajador" className="w-full bg-transparent text-white py-5 flex items-center justify-center font-black text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors border border-gray-700 hover:border-white uppercase">
                QUIERO SER EMBAJADOR/A
              </Link>
            </div>

          </div>

          {/* PARTE INFERIOR: ¿CÓMO AVANZAR? (Conectado estructuralmente mediante un borde superior) */}
          <div className="border-t border-gray-900 p-8 md:p-12 bg-[#080808] flex flex-col md:flex-row gap-10 md:gap-20">
            
            {/* Título de la sección inferior */}
            <div className="md:w-1/3">
              <h3 className="text-2xl font-black italic tracking-tighter mb-4 text-white uppercase">
                ¿CÓMO AVANZAR?
              </h3>
              <p className="text-gray-400 text-sm tracking-wide leading-relaxed font-medium normal-case">
                Cada alianza se evalúa caso por caso. Prepará esta información antes de contactarnos.
              </p>
            </div>
            
            {/* Contenido técnico de la sección inferior */}
            <div className="md:w-2/3">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mb-8">
                {[
                  "Quiénes son.",
                  "Alcance (club, categoría, seguidores, torneos).",
                  "Qué esperan del acuerdo.",
                  "Qué le ofrecen a la marca a cambio."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm font-medium text-gray-300 normal-case">
                    <span className="text-gray-700 font-black mt-1">■</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-gray-900 pt-6">
                <p className="text-white text-sm leading-relaxed font-bold uppercase tracking-wide mb-2">
                  A PARTIR DE ESO, ARMAMOS UNA PROPUESTA CONCRETA Y <span className="text-[#D70000]">SIEMPRE RENTABLE PARA AMBAS PARTES.</span>
                </p>
                <p className="text-gray-500 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
                  SELECCIONÁ UNA OPCIÓN ARRIBA PARA INICIAR LA CONVERSACIÓN.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}