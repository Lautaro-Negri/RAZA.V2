import Link from "next/link";

export default function PoliticasPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase pt-32 pb-20 relative">
      
      {/* TEXTURA DE FONDO */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* ========================================= */}
        {/* ENCABEZADO OFICIAL */}
        {/* ========================================= */}
        <div className="mb-16 border-b border-gray-900 pb-10">
          <span className="text-[#D70000] font-black text-[10px] md:text-xs tracking-[0.4em] block mb-4 italic">
            // LEGAL & WARRANTY FRAMEWORK
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter mb-6 text-white leading-none">
            POLÍTICA DE CAMBIOS, GARANTÍA & <span className="text-[#D70000]">REPOSICIONES</span>
          </h1>
          <p className="text-gray-400 font-medium tracking-wide leading-relaxed text-sm md:text-base normal-case border-l-2 border-[#D70000] pl-6 max-w-3xl">
            Queremos cuidar a tu club y también la salud de nuestra marca. Por eso dejamos claras las condiciones operativas desde el primer momento.
          </p>
        </div>

        {/* ========================================= */}
        {/* EXPEDIENTE TÉCNICO (LISTA DE POLÍTICAS) */}
        {/* ========================================= */}
        <div className="flex flex-col gap-8 mb-20">

          {/* 1. APROBACIÓN DE DISEÑO */}
          <div className="bg-[#050505] border border-gray-900 p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gray-800"></div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-black text-2xl italic">01.</span>
              <h2 className="text-xl font-black italic tracking-tighter text-white">APROBACIÓN DE DISEÑO</h2>
            </div>
            <div className="pl-0 md:pl-10">
              <p className="text-gray-400 text-sm leading-relaxed mb-4 normal-case font-medium">
                Antes de producir, enviamos <strong>mockup/diseño final</strong> para revisión. Con la <strong>aprobación escrita</strong> (WhatsApp, mail, firma digital o similar) del diseño:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3 text-sm text-gray-300 normal-case">
                  <span className="text-[#D70000] font-black mt-1">■</span>
                  No se realizan cambios de diseño sin costo.
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300 normal-case">
                  <span className="text-[#D70000] font-black mt-1">■</span>
                  Cualquier modificación posterior se toma como nuevo pedido.
                </li>
              </ul>
              <p className="text-[#D70000] font-bold text-xs tracking-widest uppercase mt-6">
                ATENCIÓN: TE PEDIMOS REVISAR BIEN COLORES, ESCUDO, SPONSORS, NOMBRES, NÚMEROS Y DETALLES ANTES DE APROBAR.
              </p>
            </div>
          </div>

          {/* 2. APROBACIÓN DE TALLES */}
          <div className="bg-[#050505] border border-gray-900 p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gray-800"></div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-black text-2xl italic">02.</span>
              <h2 className="text-xl font-black italic tracking-tighter text-white">APROBACIÓN DE TALLES</h2>
            </div>
            <div className="pl-0 md:pl-10">
              <p className="text-gray-400 text-sm leading-relaxed mb-4 normal-case font-medium">
                El club/equipo envía la <strong>planilla de talles</strong> definitiva. Una vez aprobada:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3 text-sm text-gray-300 normal-case">
                  <span className="text-[#D70000] font-black mt-1">■</span>
                  No se aceptan cambios de talles sin costo, ya que es producción personalizada.
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300 normal-case">
                  <span className="text-[#D70000] font-black mt-1">■</span>
                  Si necesitan prendas adicionales o reposiciones, se cotizan aparte según la línea elegida.
                </li>
              </ul>
              <p className="text-gray-500 font-bold text-xs tracking-widest uppercase mt-6">
                RECOMENDAMOS PROBAR TALLES DE REFERENCIA Y USAR NUESTRA GUÍA ANTES DE CONFIRMAR.
              </p>
            </div>
          </div>

          {/* 3. ERRORES DE PRODUCCIÓN */}
          <div className="bg-[#050505] border border-[#D70000]/30 p-8 md:p-10 relative shadow-2xl">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#D70000]"></div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#D70000] font-black text-2xl italic">03.</span>
              <h2 className="text-xl font-black italic tracking-tighter text-white">ERRORES DE PRODUCCIÓN (RESPONSABILIDAD RAZA)</h2>
            </div>
            <div className="pl-0 md:pl-10">
              <p className="text-gray-400 text-sm leading-relaxed mb-4 normal-case font-medium">
                Si alguna prenda presenta fallas claras de confección, errores de impresión/sublimación distintos al diseño aprobado, o defectos visibles de fabricación, <strong>RAZA se hace cargo de la reposición sin costo</strong>, siempre que se cumpla:
              </p>
              <ul className="space-y-3 mb-6 bg-[#0A0A0A] border border-gray-900 p-6">
                <li className="flex items-start gap-3 text-sm text-white normal-case font-bold">
                  <span className="text-[#D70000] font-black mt-1">■</span>
                  El reclamo se realice dentro de las 72 horas posteriores a la entrega.
                </li>
                <li className="flex items-start gap-3 text-sm text-white normal-case font-bold">
                  <span className="text-[#D70000] font-black mt-1">■</span>
                  Las prendas estén sin uso, sin lavado y en buen estado (como fueron entregadas).
                </li>
                <li className="flex items-start gap-3 text-sm text-white normal-case font-bold">
                  <span className="text-[#D70000] font-black mt-1">■</span>
                  Se envíe foto y descripción del problema para evaluación.
                </li>
              </ul>
              <p className="text-gray-500 font-bold text-[10px] tracking-widest uppercase">
                * Podemos solicitar la devolución de la prenda fallada para control de calidad interno.
              </p>
            </div>
          </div>

          {/* 4. DETALLES IMPORTANTES */}
          <div className="bg-[#050505] border border-gray-900 p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gray-800"></div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-black text-2xl italic">04.</span>
              <h2 className="text-xl font-black italic tracking-tighter text-white">DETALLES IMPORTANTES PARA EVITAR MALOS ENTENDIDOS</h2>
            </div>
            <div className="pl-0 md:pl-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-white font-black text-xs tracking-widest block mb-2">COLORES</span>
                <p className="text-gray-400 text-sm normal-case leading-relaxed">Puede haber una leve variación entre lo visto en pantalla y el resultado final físico, dentro de rangos normales de impresión textil. Esto no se considera falla.</p>
              </div>
              <div>
                <span className="text-white font-black text-xs tracking-widest block mb-2">TOLERANCIA DE MEDIDAS</span>
                <p className="text-gray-400 text-sm normal-case leading-relaxed">Las prendas pueden tener una tolerancia de fabricación de aprox. ±2 cm, lo cual es estándar en la industria.</p>
              </div>
              <div>
                <span className="text-white font-black text-xs tracking-widest block mb-2">USO & CUIDADO</span>
                <p className="text-gray-400 text-sm normal-case leading-relaxed">Daños por uso intensivo, enganches, lavados inadecuados, plancha sobre estampas, cloro, etc., no aplican como falla de fabricación.</p>
              </div>
              <div>
                <span className="text-[#D70000] font-black text-xs tracking-widest block mb-2">NOMBRES Y NÚMEROS</span>
                <p className="text-gray-400 text-sm normal-case leading-relaxed">Si fueron enviados con error por el cliente y aprobados así, la responsabilidad es del club/equipo. La reposición se cotiza aparte.</p>
              </div>
            </div>
          </div>

          {/* 5. PROPIEDAD DE LOGOS */}
          <div className="bg-[#050505] border border-gray-900 p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gray-800"></div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-black text-2xl italic">05.</span>
              <h2 className="text-xl font-black italic tracking-tighter text-white">PROPIEDAD DE LOGOS & SPONSORS</h2>
            </div>
            <div className="pl-0 md:pl-10">
              <p className="text-gray-400 text-sm leading-relaxed mb-2 normal-case font-medium">
                El cliente es responsable de contar con los <strong>derechos de uso</strong> de escudos, sponsors y marcas enviadas.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed normal-case font-medium">
                RAZA no se hace responsable por el uso indebido de logos o imágenes sin autorización.
              </p>
            </div>
          </div>

          {/* 6. CÓMO HACER UN RECLAMO */}
          <div className="bg-[#0A0A0A] border border-gray-800 p-8 md:p-12 mt-8 text-center">
            <span className="text-[#D70000] font-black text-3xl italic block mb-4">06.</span>
            <h2 className="text-2xl font-black italic tracking-tighter text-white mb-6 uppercase">¿CÓMO HACER UN RECLAMO?</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 normal-case font-medium max-w-2xl mx-auto">
              Para ayudarnos a responder rápido y bien, por favor prepará la siguiente información:
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-10">
              <div className="bg-[#050505] px-6 py-4 border border-gray-900 flex items-center gap-3">
                <span className="text-[#D70000] font-black">1.</span>
                <span className="text-xs font-bold tracking-widest text-gray-300">N° DE PEDIDO + CLUB</span>
              </div>
              <div className="bg-[#050505] px-6 py-4 border border-gray-900 flex items-center gap-3">
                <span className="text-[#D70000] font-black">2.</span>
                <span className="text-xs font-bold tracking-widest text-gray-300">DESCRIPCIÓN BREVE</span>
              </div>
              <div className="bg-[#050505] px-6 py-4 border border-gray-900 flex items-center gap-3">
                <span className="text-[#D70000] font-black">3.</span>
                <span className="text-xs font-bold tracking-widest text-gray-300">FOTOS CLARAS</span>
              </div>
            </div>

            <p className="text-gray-500 font-bold text-xs tracking-widest uppercase mb-10">
              NUESTRO EQUIPO REVISA EL CASO Y PROPONE LA SOLUCIÓN CORRESPONDIENTE (REPOSICIÓN, CORRECCIÓN O ALTERNATIVAS).
            </p>

            <Link href="/contacto" className="inline-block bg-[#D70000] text-black px-10 py-5 font-black text-xs tracking-[0.3em] hover:bg-white transition-colors border border-[#D70000] hover:border-white">
              INICIAR GESTIÓN DE SOPORTE
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}