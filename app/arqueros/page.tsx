"use client";

import { useState } from "react";

export default function ArquerosPage() {
  const [gloveColors, setGloveColors] = useState({ AVALON: "RED", KING_IMPERIAL: "ST.25" });
  const [gloveSizes, setGloveSizes] = useState({ AVALON: "9", KING_IMPERIAL: "9" });
  const [showSizeGuide, setShowSizeGuide] = useState(false); // Estado para el modal de la guía

  const guantes = [
    { 
      id: "AVALON", 
      label: "GK_UNIT_01",
      titulo_comercial: "LÍNEA AVALON",
      subtitulo: "LÍNEA PROFESIONAL",
      intro: "Diseñados para el arquero moderno. Combinan un agarre de élite con la palma de Látex Alemán CGP de 4mm y un ajuste anatómico perfecto.",
      colores: ["RED", "WHITE", "GREEN", "BLUE", "BLACK"],
      specs: [
        "PALMA DE LÁTEX CGP (CONTACT GERMAN LATEX) DE 4MM",
        "CORTE HÍBRIDO NEGATIVO",
        "SISTEMA 3D FEEL, APLIQUES DE SILICONA INTERNOS",
        "DORSO NEOPREN TRATADO EN ALTA FRECUENCIA",
        "ALTO RENDIMIENTO EN CONDICIONES SECAS Y HÚMEDAS",
        "MUÑEQUERA ELÁSTICA DOBLE ANCLAJE (LADO PALMA)"
      ]
    },
    { 
      id: "KING_IMPERIAL", 
      label: "GK_UNIT_02",
      titulo_comercial: "LÍNEA KING IMPERIAL",
      subtitulo: "LÍNEA PROFESIONAL",
      intro: "Autoridad absoluta. Diseñado para el arquero que gobierna su área. Construcción robusta para soportar los impactos más duros.",
      colores: ["ST.25", "BLACK", "WHITE"],
      specs: [
        "PALMA DE LÁTEX CGP DE 4MM",
        "SISTEMA 3D FEEL, APLIQUES DE SILICONA INTERNOS",
        "DORSO EN TEJIDO ELÁSTICO LIGERO Y TRANSPIRABLE",
        "ZONA DE GOLPEO EN LÁTEX ALTA FRECUENCIA",
        "MUÑEQUERA ELÁSTICA DE DOBLE GIRO OPCIONAL",
        "ALTO RENDIMIENTO EN CONDICIONES SECAS Y HÚMEDAS"
      ]
    }
  ];

  // Rango de talles actualizado del 5 al 11
  const talles = ["5", "6", "7", "8", "9", "10", "11"];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase p-6 md:p-10 pb-40 pt-32 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="border-l-4 border-[#D70000] pl-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">
              DIVISIÓN <span className="text-[#D70000]">ARQUEROS</span>
            </h1>
            <p className="text-gray-500 font-bold text-[10px] tracking-[0.5em] mt-2 italic">
              // EQUIPMENT SPECIALIZED STOCK
            </p>
          </div>

          {/* BOTÓN GUÍA DE TALLES */}
          <button 
            onClick={() => setShowSizeGuide(true)}
            className="group flex items-center gap-4 bg-[#111] border border-gray-800 p-4 hover:border-[#D70000] transition-all"
          >
            <div className="text-right">
              <span className="block text-[8px] font-black text-gray-500 tracking-widest">TECHNICAL DATA</span>
              <span className="block text-[10px] font-black text-white tracking-widest">VER GUÍA DE TALLES</span>
            </div>
            <div className="w-10 h-10 bg-gray-900 flex items-center justify-center group-hover:bg-[#D70000] transition-colors">
              <span className="text-black font-black">?</span>
            </div>
          </button>
        </div>

        {/* LISTADO DE GUANTES */}
        <div className="flex flex-col gap-24">
          {guantes.map((guante) => (
            <div key={guante.id} className="group bg-[#050505] border border-gray-900 flex flex-col lg:flex-row hover:border-[#D70000]/40 transition-all duration-700 shadow-2xl">
              
              {/* IMAGEN PRODUCTO */}
              <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto bg-black flex items-center justify-center p-20 relative border-b lg:border-b-0 lg:border-r border-gray-900 overflow-hidden">
                <img src="/LogoRaza.png" alt={guante.id} className="w-48 md:w-64 opacity-5 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute top-6 left-6 text-gray-800 font-mono text-[10px] tracking-[0.3em]">{guante.label}</div>
              </div>

              {/* DETALLE Y COMPRA */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-[#080808]">
                <div>
                  <div className="mb-6">
                    <span className="text-[#D70000] font-black text-[10px] tracking-[0.4em] mb-1 block">{guante.subtitulo}</span>
                    <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-4">{guante.titulo_comercial}</h2>
                    <p className="text-xs text-gray-400 font-bold tracking-widest leading-relaxed max-w-lg">{guante.intro}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-10 border-t border-gray-900 pt-8">
                    {guante.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-3 text-[9px] font-black text-gray-500">
                        <span className="text-[#D70000] mt-0.5">■</span>
                        <span className="leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    <div>
                      <span className="text-gray-600 font-black text-[9px] tracking-[0.3em] block mb-4 italic">COLORWAY</span>
                      <div className="flex flex-wrap gap-2">
                        {guante.colores.map(color => (
                          <button key={color} onClick={() => setGloveColors({...gloveColors, [guante.id as "AVALON" | "KING_IMPERIAL"]: color})}
                            className={`px-4 py-2.5 text-[9px] font-black border transition-all ${gloveColors[guante.id as keyof typeof gloveColors] === color ? "bg-[#D70000] border-[#D70000] text-black" : "border-gray-800 text-gray-500 hover:border-gray-400"}`}>
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-600 font-black text-[9px] tracking-[0.3em] block mb-4 italic">SIZE SELECTOR (USA)</span>
                      <div className="flex flex-wrap gap-2">
                        {talles.map(talle => (
                          <button key={talle} onClick={() => setGloveSizes({...gloveSizes, [guante.id as "AVALON" | "KING_IMPERIAL"]: talle})}
                            className={`w-10 h-10 flex items-center justify-center text-[10px] font-black border transition-all ${gloveSizes[guante.id as keyof typeof gloveSizes] === talle ? "bg-white text-black border-white" : "border-gray-800 text-gray-500 hover:border-gray-400"}`}>
                            {talle}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-white text-black py-5 font-black text-xs tracking-[0.5em] hover:bg-[#D70000] hover:text-white transition-all shadow-2xl">
                  AÑADIR AL PEDIDO
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL DE LA GUÍA DE TALLES --- */}
        {showSizeGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative max-w-4xl w-full bg-[#050505] border border-gray-800 p-2 shadow-2xl">
              <button 
                onClick={() => setShowSizeGuide(false)}
                className="absolute -top-12 right-0 text-white font-black text-xs tracking-widest hover:text-[#D70000] transition-colors"
              >
                [ CERRAR GUÍA ]
              </button>
              
              <div className="border border-gray-900 p-4 md:p-8">
                <span className="text-[#D70000] font-black text-[10px] tracking-[0.5em] block mb-6 italic text-center">
                  // RAZA TECHNICAL GLOVE SIZING CHART
                </span>
                
                {/* AQUÍ VA TU IMAGEN DE GUÍA DE TALLES */}
                <div className="aspect-video bg-black border border-gray-800 flex items-center justify-center overflow-hidden">
                   <img 
                    src="/GuiaTallesArqueros.png" 
                    alt="Guía de talles" 
                    className="max-w-full max-h-full object-contain"
                   />
                   {/* Mensaje de placeholder si la imagen no carga */}
                   <p className="absolute text-[10px] text-gray-800 font-black tracking-[0.2em] pointer-events-none">
                     CARGANDO ESQUEMA DE MEDIDAS...
                   </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-500 font-bold text-[9px] tracking-widest leading-relaxed border-t border-gray-900 pt-8">
                  <p>1. MIDA LA CIRCUNFERENCIA DE SU PALMA JUSTO DEBAJO DE LOS NUDILLOS (SIN INCLUIR EL PULGAR).</p>
                  <p>2. SI ESTÁ ENTRE DOS TALLES, RECOMENDAMOS ELEGIR EL MÁS GRANDE PARA EL CORTE HÍBRIDO-NEGATIVO.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}