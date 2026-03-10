"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; 

// =========================================
// COMPONENTE: RELOJ COMPACTO (Rediseñado para el nuevo Header Central)
// =========================================
function DropCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0"),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0"),
          seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0"),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    // Diseño más plano y bordered para encajar en la grilla central
    <div className="flex gap-1 border border-zinc-800 bg-[#050505] p-3 items-center justify-center w-full">
      {Object.entries(timeLeft).map(([label, value], index) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col text-center px-1">
            <span className="text-2xl md:text-3xl font-black font-mono tracking-widest text-white leading-none">{value}</span>
            <span className="text-[6px] font-black text-[#D70000] tracking-[0.3em] uppercase opacity-70 mt-1">{label}</span>
          </div>
          {index < 3 && <span className="text-[#D70000]/30 font-black text-xl mx-0.5 animate-pulse mb-2">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function StreetwearPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const categories = ["ALL", "REMERAS", "HOODIES", "PANTALONES", "ACCESORIOS"];

  // 1. CARGA DE PRODUCTOS DESDE SUPABASE
  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('streetwear_products')
        .select('*')
        .order('created_at', { ascending: true });

      if (data) {
        setProducts(data);
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  // 2. FILTRADO POR CATEGORÍA
  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#D70000] font-mono tracking-[1em] animate-pulse uppercase z-50 relative">
        // S_Y_S__I_N_I_T...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans uppercase p-4 md:p-8 flex items-center justify-center py-24">
      
      {/* CONTENEDOR MAESTRO HUD (Mantenemos el marco global) */}
      <div className="w-full max-w-[1400px] bg-black border border-zinc-800 relative flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* GRILLA ROJA DE FONDO (Technical Overlay) */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(215, 0, 0, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(215, 0, 0, 0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* ESQUINAS TÉCNICAS (Markers Maestros) */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D70000] z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D70000] z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D70000] z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D70000] z-20 pointer-events-none"></div>

        {/* ========================================= */}
        {/* --- NUEVO HEADER TÁCTICO CENTRAL (REDiseñado) --- */}
        {/* ========================================= */}
        <div className="relative z-10 bg-[#030303]/95 backdrop-blur-sm border-b border-zinc-800 flex flex-col items-center">
          
          {/* Top Bar (Decorativa) */}
          <div className="w-full flex justify-between border-b border-zinc-800/50 p-2 px-8 font-mono text-[8px] text-gray-700 tracking-[0.5em]">
            <span>[ TRANSMISIÓN_ACTIVA // MATRIZ::STREET ]</span>
            <div className="flex gap-2 items-center">
              <div className="w-1.5 h-1.5 bg-[#D70000] rounded-full animate-pulse"></div>
              <span>LIVE_STATUS</span>
            </div>
          </div>

          {/* Grilla Central Simétrica */}
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full items-center p-8 md:p-12 gap-8 lg:gap-0">
            
            {/* Columna 1: Info Drop (Izquierda) */}
            <div className="flex flex-col gap-2 font-mono text-[9px] text-gray-500 tracking-[0.4em] lg:border-r lg:border-zinc-800 lg:pr-12 h-full lg:justify-center">
              <span className="text-white font-black">// DROP_REFERENCE::</span>
              <span className="text-[#D70000] text-sm font-black italic font-sans tracking-tight leading-none mb-3">RZA_DROP_001_2026</span>
              <span>// TOTAL_PIECES_COUNTED::{String(products.length).padStart(2, '0')}</span>
              <span>// SYSTEM_VERSION::2.1</span>
            </div>

            {/* Columna 2: Título Central (Grande) */}
            <div className="flex flex-col items-center text-center lg:px-12">
              <span className="text-[#D70000] font-black font-mono text-[10px] tracking-[0.5em] mb-3 opacity-60">GEAR_SUPPLY::</span>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase">
                STREET<br/>
              </h2>
            </div>

            {/* Columna 3: Countdown (Derecha) */}
            <div className="lg:border-l lg:border-zinc-800 lg:pl-12 h-full flex flex-col lg:items-end lg:justify-center gap-3">
              <span className="text-gray-600 font-mono text-[9px] tracking-[0.4em] uppercase flex items-center gap-2">
                TACTICAL_COUNTDOWN
              </span>
              <div className="w-full xl:w-[350px]">
                <DropCountdown targetDate="2026-04-01T00:00:00" />
              </div>
            </div>
          </div>
        </div>
        {/* ========================================= */}

        {/* --- BARRA DE FILTROS --- */}
        <div className="relative z-10 bg-black border-b border-zinc-800 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 text-[10px] font-mono font-black tracking-[0.3em] border transition-all ${
                  activeCategory === cat 
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                  : "bg-[#050505] text-gray-500 border-zinc-800 hover:border-gray-500 hover:text-white"
                }`}
              >
                {cat === "ALL" ? "[ VER_TODO ]" : cat}
              </button>
            ))}
          </div>
          <div className="font-mono text-[10px] text-gray-600 tracking-[0.5em] flex items-center gap-4">
            <span>// MÁX_PIEZAS: {String(filteredProducts.length).padStart(2, '0')}</span>
            <div className="flex gap-1">
              <div className="w-4 h-1 bg-[#D70000]"></div>
              <div className="w-1 h-1 bg-[#D70000]"></div>
            </div>
          </div>
        </div>

        {/* --- GRILLA DE PRODUCTOS (Mantenemos el diseño que te gustó) --- */}
        <div className="relative z-10 bg-[#020202]/80 backdrop-blur-sm p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                href={product.sold_out ? "#" : `/streetwear/${product.id}`}
                className={`group relative flex flex-col border border-zinc-800 bg-black overflow-hidden transition-all duration-500
                  ${product.sold_out ? 'cursor-not-allowed opacity-60 grayscale' : 'hover:border-[#D70000] hover:shadow-[0_0_30px_rgba(215,0,0,0.2)] cursor-pointer'}
                `}
              >
                {/* Visual del Producto */}
                <div className="aspect-[4/5] relative flex items-center justify-center p-8 bg-[#030303] overflow-hidden">
                  <div className="absolute left-1/2 top-0 w-px h-full bg-[#D70000]/20 pointer-events-none"></div>
                  <div className="absolute left-0 top-1/2 w-full h-px bg-[#D70000]/20 pointer-events-none"></div>

                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className={`w-full h-full object-contain relative z-10 transition-all duration-700 
                      ${product.sold_out ? 'opacity-20' : 'grayscale group-hover:grayscale-0 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(215,0,0,0.1)]'}
                    `} 
                  />
                  
                  <div className={`absolute top-0 left-0 px-3 py-1.5 font-black text-[8px] tracking-widest z-20 border-b border-r border-zinc-800
                    ${product.sold_out ? 'bg-zinc-900 text-gray-600' : 'bg-[#D70000] text-black'}
                  `}>
                    {product.sold_out ? "STOCK_EMPTY" : product.tag}
                  </div>

                  {product.sold_out && (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <span className="border-2 border-[#D70000] text-[#D70000] px-4 py-2 font-black text-[10px] tracking-[0.4em] -rotate-12 bg-black/90 backdrop-blur-sm shadow-[0_0_20px_rgba(215,0,0,0.5)]">
                        PIEZA_AGOTADA
                      </span>
                    </div>
                  )}

                  {!product.sold_out && (
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 z-30 backdrop-blur-sm">
                       <span className="border border-[#D70000] text-[#D70000] px-6 py-3 font-black text-[10px] tracking-[0.4em] uppercase bg-black/50">
                         VER_PRENDA
                       </span>
                    </div>
                  )}

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 font-mono text-[8px] text-gray-600 tracking-[0.4em] font-bold" style={{ writingMode: 'vertical-rl' }}>
                    #RZA{product.id}
                  </div>
                </div>

                {/* Bloque de Datos */}
                <div className="p-6 border-t border-zinc-800 flex flex-col justify-between flex-1 bg-black z-10 relative">
                  <div className="mb-6">
                    <span className="text-[8px] text-gray-500 font-mono tracking-widest uppercase block mb-2">
                      // CAT: {product.category}
                    </span>
                    <h3 className="text-2xl font-black italic tracking-tighter leading-none uppercase group-hover:text-[#D70000] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-zinc-900 pt-4 mt-auto">
                    <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase block">
                      REF::{product.serial}
                    </span>
                    <span className={`text-xl font-black italic tracking-tighter ${product.sold_out ? "text-gray-700" : "text-white"}`}>
                      $ {product.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D70000] z-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D70000] z-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* --- FOOTER DEL MÓDULO HUD --- */}
        <div className="relative z-10 bg-black border-t border-zinc-800 px-8 py-4 flex justify-between items-center">
           <span className="text-zinc-700 font-mono text-[8px] tracking-[0.5em]">RAZA_STREET_SYSTEM_V2.0 // EST_2026</span>
           <span className="text-zinc-600 font-mono text-[8px] tracking-widest uppercase flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-green-600 animate-pulse"></div> SECURE_CONNECTION
           </span>
        </div>

      </div>
    </div>
  );
}