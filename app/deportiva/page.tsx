"use client";

import { useState, useRef } from "react"; 
import TeamRoster from "../../components/TeamRoster";
import LineTechSpecs from "../../components/LineTechSpecs";

export default function DeportivaPage() {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedKit, setSelectedKit] = useState<string[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentGarmentIndex, setCurrentGarmentIndex] = useState(0);

  const performanceLines = [
    { id: "POTRERO", label: "GAME_01", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop" },
    { id: "CENIT", label: "GAME_02", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop" },
    { id: "INSIGNIA", label: "GAME_03", img: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=800&auto=format&fit=crop" },
  ];

  const staffLines = [
    { id: "INSTITUCIONAL", label: "STAFF_01", img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop" },
    { id: "REPRESENTATIVO", label: "STAFF_02", img: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=800&auto=format&fit=crop" },
    { id: "ACCESORIOS", label: "GEAR_01", img: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=800&auto=format&fit=crop" },
  ];

  const garmentData: Record<string, string> = {
    "CAMISETA": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
    "SHORT": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500&auto=format&fit=crop",
    "MEDIAS": "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=500&auto=format&fit=crop",
    "CHOMBA": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
    "BERMUDA": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500&auto=format&fit=crop",
    "JOGGING": "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=500&auto=format&fit=crop",
    "CAMPERA": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500&auto=format&fit=crop",
    "ROMPEVIENTO": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500&auto=format&fit=crop",
    "PANTALÓN MICROFIBRA": "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=500&auto=format&fit=crop",
    "REMERÓN": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop",
    "CAMISETA TÉRMICA": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500&auto=format&fit=crop",
    "CALZA TÉRMICA": "https://images.unsplash.com/photo-1539103371644-7729ee10774b?q=80&w=500&auto=format&fit=crop",
    "PECHERA": "https://images.unsplash.com/photo-1614632537190-23e4121ec040?q=80&w=500&auto=format&fit=crop",
  };

  const getAvailableGarments = (lineId: string) => {
    if (lineId === "INSTITUCIONAL") return ["CHOMBA", "BERMUDA", "JOGGING", "CAMPERA"];
    if (lineId === "REPRESENTATIVO") return ["ROMPEVIENTO", "PANTALÓN MICROFIBRA", "REMERÓN"];
    if (lineId === "ACCESORIOS") return ["CAMISETA TÉRMICA", "CALZA TÉRMICA", "PECHERA"];
    return ["CAMISETA", "SHORT", "MEDIAS"];
  };

  const toggleGarment = (garment: string) => {
    setSelectedKit((prev) => 
      prev.includes(garment) ? prev.filter((g) => g !== garment) : [...prev, garment] 
    );
  };

  const selectLine = (lineId: string) => {
    setSelectedLine(lineId);
    setCurrentGarmentIndex(0);
    if (lineId === "INSTITUCIONAL") setSelectedKit(["CHOMBA"]);
    else if (lineId === "REPRESENTATIVO") setSelectedKit(["ROMPEVIENTO"]);
    else if (lineId === "ACCESORIOS") setSelectedKit(["CAMISETA TÉRMICA"]);
    else setSelectedKit(["CAMISETA"]);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase p-6 md:p-10 pb-40 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="border-l-4 border-[#D70000] pl-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic">
            DIVISIÓN <span className="text-[#D70000]">CLUBES</span>
          </h1>
          <p className="text-gray-500 font-bold text-[10px] tracking-[0.3em] mt-2 italic uppercase">
            // MANIFIESTO DE CARGA INDUSTRIAL
          </p>
        </div>

        {/* PANEL SUPERIOR */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch mb-4">
          
          {/* TARJETAS DE LÍNEA */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 h-full min-h-[700px]">
            {[...performanceLines, ...staffLines].map(l => (
              <Card key={l.id} data={l} active={selectedLine === l.id} onClick={() => selectLine(l.id)} />
            ))}
          </div>

          {/* PANEL DE CATÁLOGO VISUAL */}
          <div className="lg:w-[400px] xl:w-[450px] flex-shrink-0 flex flex-col h-full">
            {selectedLine ? (
              <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col h-full bg-[#050505] border border-gray-900 pt-6">
                <div className="flex items-center justify-between mb-4 px-6">
                  <h3 className="text-sm font-black italic tracking-tighter text-white uppercase">
                    CATÁLOGO <span className="text-[#D70000]">VISUAL</span>
                  </h3>
                  
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => {
                        const garments = getAvailableGarments(selectedLine);
                        setCurrentGarmentIndex(prev => (prev - 1 + garments.length) % garments.length);
                      }} 
                      className="w-6 h-6 border border-gray-800 flex items-center justify-center hover:bg-[#D70000] transition-all group"
                    >
                      <span className="text-gray-500 group-hover:text-black font-black text-xs">←</span>
                    </button>
                    <button 
                      onClick={() => {
                        const garments = getAvailableGarments(selectedLine);
                        setCurrentGarmentIndex(prev => (prev + 1) % garments.length);
                      }} 
                      className="w-6 h-6 border border-gray-800 flex items-center justify-center hover:bg-[#D70000] transition-all group"
                    >
                      <span className="text-gray-500 group-hover:text-black font-black text-xs">→</span>
                    </button>
                  </div>
                </div>

                <div className="px-6 pb-6 flex-1 flex flex-col justify-center">
                  {(() => {
                    const garments = getAvailableGarments(selectedLine);
                    const currentGarment = garments[currentGarmentIndex];
                    const isAdded = selectedKit.includes(currentGarment);
                    const imgSrc = garmentData[currentGarment] || "/LogoRaza.png";
                    
                    return (
                      <div 
                        key={currentGarment} 
                        className={`aspect-[4/5] bg-black border relative group overflow-hidden w-full transition-all duration-500
                          ${isAdded ? 'border-[#D70000]' : 'border-gray-900'}
                        `}
                      >
                        <img 
                          src={imgSrc} 
                          alt={currentGarment} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                        />
                        
                        <div 
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-zoom-in pb-20"
                          onClick={() => setEnlargedImage(imgSrc)}
                        >
                           <span className="bg-black/80 text-white border border-gray-700 px-4 py-2 text-[10px] font-black tracking-widest backdrop-blur-sm">
                             [ + ] AMPLIAR
                           </span>
                        </div>

                        <div className={`absolute top-4 right-4 px-2 py-1 font-black text-[9px] transition-colors
                          ${isAdded ? 'bg-[#D70000] text-black' : 'bg-black text-gray-500 border border-gray-800'}
                        `}>
                          REF_{String(currentGarmentIndex + 1).padStart(2, '0')}
                        </div>

                        {/* CAMBIO: Fondo siempre oscuro y semi-transparente */}
                        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-800 bg-black/80 backdrop-blur-md z-10 flex justify-between items-end">
                          <div>
                            <span className="text-[8px] font-black tracking-widest block mb-1 uppercase text-gray-500">
                              {isAdded ? 'INCLUIDO' : 'STANDBY'}
                            </span>
                            <span className={`text-[10px] font-mono tracking-widest uppercase font-bold
                              ${isAdded ? 'text-white' : 'text-gray-400'}
                            `}>
                              {currentGarment}
                            </span>
                          </div>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleGarment(currentGarment); }}
                            className={`w-8 h-8 flex items-center justify-center font-mono text-base transition-all
                              ${isAdded ? 'bg-[#D70000] text-black hover:bg-white' : 'bg-zinc-800 text-white hover:bg-[#D70000] hover:text-black'}
                            `}
                          >
                            {isAdded ? '-' : '+'}
                          </button>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] border border-dashed border-gray-800 bg-[#050505] flex flex-col items-center justify-center p-8 text-center flex-1">
                <div className="w-12 h-12 border border-[#D70000]/30 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <span className="w-2 h-2 bg-[#D70000] rounded-full"></span>
                </div>
                <span className="text-gray-500 font-mono text-[9px] tracking-[0.4em] uppercase mb-2">
                  // STATUS: STANDBY
                </span>
                <span className="text-white font-black text-[10px] tracking-widest uppercase">
                  SELECCIONE UNA LÍNEA PARA INICIAR PROTOCOLO
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ESPECIFICACIÓN TÉCNICA */}
        {selectedLine && (
          <div className="animate-in slide-in-from-bottom-2 duration-500 w-full border-gray-900 mb-4 bg-[#050505]/60 backdrop-blur-md">
            <LineTechSpecs line={selectedLine as any} />
          </div>
        )}

        {/* MATRIZ DE CARGA */}
        {selectedLine && (
          <div className="animate-in fade-in duration-700 w-full">
            <div className="flex flex-col gap-8 w-full"> 
              
              <div className="bg-[#050505] border border-gray-900 p-6 md:p-8 w-full">
                <h3 className="text-white font-black text-sm tracking-[0.4em] uppercase italic mb-6 border-b border-gray-900 pb-4">
                  // CONFIGURACIÓN DEL <span className="text-[#D70000]">SET</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {getAvailableGarments(selectedLine).map((garment) => {
                    const isActive = selectedKit.includes(garment);
                    return (
                      <button 
                        key={garment}
                        onClick={() => toggleGarment(garment)} 
                        className={`flex items-center gap-2 px-5 py-4 border font-black text-[10px] md:text-xs tracking-widest transition-all duration-300
                          ${isActive ? 'bg-[#D70000] border-[#D70000] text-black' : 'bg-black border-gray-800 text-gray-500 hover:border-gray-500 hover:text-white'}
                        `}
                      >
                        <span className="font-mono text-[8px]">{isActive ? '[X]' : '[ ]'}</span>
                        {garment}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-full">
                <TeamRoster selectedLine={selectedLine} selectedKit={selectedKit} />
              </div>
              
            </div>
          </div>
        )}
      </div>

      {enlargedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md cursor-zoom-out" onClick={() => setEnlargedImage(null)}>
          <div className="relative w-full max-w-4xl max-h-screen flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setEnlargedImage(null)} className="absolute -top-12 right-0 text-gray-400 hover:text-[#D70000] font-mono tracking-[0.3em] text-[10px] font-black transition-colors flex items-center gap-2">
              [X] CERRAR VISOR
            </button>
            <img src={enlargedImage} alt="Prenda" className="w-auto max-h-[85vh] object-contain border border-gray-800 shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ data, active, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`group cursor-pointer border transition-all duration-500 relative overflow-hidden flex flex-col h-full min-h-[250px]
        ${active ? "border-[#D70000]" : "border-gray-900 hover:border-gray-600"}`}
    >
      <img 
        src={data.img} 
        alt={data.id} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-0
          ${active ? "opacity-100 scale-105" : "opacity-30 grayscale group-hover:opacity-50 group-hover:scale-105"}
        `} 
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity duration-500
        ${active ? 'opacity-80' : 'opacity-90'}
      `}></div>
      
      <div className={`relative z-20 mt-auto p-4 flex flex-col justify-end transition-all w-full
        ${active ? "bg-gradient-to-t from-[#D70000] via-[#D70000]/80 to-transparent pt-16" : "pt-8"}
      `}>
        <div className="flex justify-between items-end">
          <div>
            <span className={`text-[8px] md:text-[9px] font-bold tracking-[0.3em] block uppercase
              ${active ? "text-black opacity-80" : "text-gray-400"}
            `}>
              {data.label}
            </span>
            <h2 className={`text-lg md:text-xl font-black tracking-widest leading-none mt-1
              ${active ? "text-black" : "text-white"}
            `}>
              {data.id}
            </h2>
          </div>
          {active && (
            <span className="font-mono text-[9px] font-black tracking-tighter text-black">
              [ ACTIVE ]
            </span>
          )}
        </div>
      </div>
    </div>
  );
}