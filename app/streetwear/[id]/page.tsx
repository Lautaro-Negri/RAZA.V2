// app/streetwear/[id]/page.tsx
"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import { products } from "../../../data/products";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("L");
  
  // Buscar producto
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-[#D70000] font-black uppercase tracking-widest">
        [ ERROR: PIEZA NO DETECTADA EN LA MATRIZ ]
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-8 font-sans uppercase">
      
      {/* CONTENEDOR MAESTRO HUD */}
      <div className="w-full max-w-[1200px] lg:h-[800px] bg-black border border-zinc-800 relative flex flex-col lg:flex-row overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">

        {/* --- SECCIÓN IZQUIERDA: VISUAL TÁCTICO --- */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-full relative border-b lg:border-b-0 lg:border-r border-zinc-800 flex items-center justify-center z-10 bg-[#030303] overflow-hidden">
          
          {/* AQUÍ ESTÁ LA SOLUCIÓN: GRILLA Y LÍNEAS CRUZADAS EN EL FONDO DE LA IMAGEN */}
          {/* 1. Malla de cuadros rojos */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(215, 0, 0, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(215, 0, 0, 0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>

          {/* 2. Líneas tácticas cruzadas (HUD) como en el diseño */}
          <div className="absolute left-12 top-0 w-px h-full bg-[#D70000]/30 z-0 pointer-events-none"></div>
          <div className="absolute left-0 top-[20%] w-full h-px bg-[#D70000]/30 z-0 pointer-events-none"></div>
          <div className="absolute left-0 bottom-[20%] w-full h-px bg-[#D70000]/30 z-0 pointer-events-none"></div>

          {/* Logo RAZA superior izquierdo */}
          <div className="absolute top-6 left-6 z-20">
            <h2 className="text-2xl font-black italic tracking-tighter text-[#D70000] leading-none">RAZA</h2>
          </div>

          {/* RAZZA Vertical Gigante */}
          <div 
            className="absolute left-6 bottom-10 z-20 rotate-180 select-none"
            style={{ writingMode: 'vertical-rl' }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter text-[#D70000]">
              RAZA
            </span>
          </div>

          {/* Serial Vertical Derecho */}
          <div 
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 font-mono text-[10px] text-[#D70000] tracking-[0.4em] font-bold"
            style={{ writingMode: 'vertical-rl' }}
          >
            #RZA{product.id.replace('prod-', '')}000703
          </div>

          {/* Imagen de Producto (Z-10 para estar por encima de la grilla) */}
          <div className="w-[70%] h-[80%] relative z-10">
            {product.category === "HOODIES" ? (
              <video 
                src="/images/hoodiemuestra.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                className={`w-full h-full object-cover drop-shadow-[0_0_30px_rgba(215,0,0,0.2)] 
                  ${product.soldOut ? 'grayscale opacity-30' : 'grayscale hover:grayscale-0 transition-all duration-700'}
                `}
              />
            ) : (
              <img 
                src={product.img || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"} 
                alt={product.name} 
                className={`w-full h-full object-contain drop-shadow-[0_0_30px_rgba(215,0,0,0.2)] 
                  ${product.soldOut ? 'grayscale opacity-30' : 'grayscale hover:grayscale-0 transition-all duration-700'}
                `}
              />
            )}
          </div>
        </div>

        {/* --- SECCIÓN DERECHA: DATOS Y ACCIÓN --- */}
        <div className="w-full lg:w-[45%] p-8 lg:p-14 flex flex-col justify-between relative z-10 bg-black/80 backdrop-blur-sm overflow-y-auto lg:overflow-hidden h-full">
          
          {/* Top Bar: Serial */}
          <div className="flex justify-end gap-6 font-mono text-[9px] text-gray-500 tracking-widest mb-10 items-center">
            <span>SERIAL</span>
            <span className="text-white">RAZA-ST-{product.id.replace('prod-', '')}</span>
            <div className="flex gap-1">
              <div className="w-6 h-1 bg-[#D70000]"></div>
              <div className="w-2 h-1 bg-[#D70000]"></div>
            </div>
          </div>

          {/* Bloque Central: Info Técnica y Precio */}
          <div className="flex-1 flex flex-col justify-center mb-10">
            
            {/* Especificaciones Tácticas */}
            <div className="mb-10">
              <span className="text-[#D70000] font-black text-[10px] tracking-[0.4em] block mb-4 italic">
                // ESPECIFICACIONES_TÉCNICAS
              </span>
              <div className="space-y-1">
                {product.specs?.map((spec: string, i: number) => (
                  <p key={i} className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                    {spec}
                  </p>
                ))}
              </div>
            </div>

            {/* Titulo y Precio */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black italic tracking-tighter leading-[0.85] text-white mb-4">
              {product.name}
            </h1>
            <p className="text-3xl lg:text-4xl font-black italic text-white/80">
              $ {product.price.toLocaleString("es-AR")}
            </p>
          </div>

          {/* Bloque Inferior: Selector y Botón */}
          <div className="space-y-8 mt-auto">
            
            {/* Talles */}
            <div>
              <span className="text-gray-600 font-black text-[9px] tracking-[0.3em] block mb-4">SELECCIONAR_ESPECIFICACIÓN</span>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 lg:w-14 lg:h-14 border font-black text-sm transition-all font-mono
                      ${selectedSize === size 
                        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                        : 'border-zinc-800 text-gray-500 hover:border-gray-400'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de Compra */}
            <button 
              disabled={product.soldOut}
              onClick={() => addToCart({ ...product, size: selectedSize })}
              className={`w-full py-6 font-black tracking-[0.4em] text-sm transition-all
                ${product.soldOut 
                  ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800' 
                  : 'bg-[#D70000] text-black hover:bg-white active:scale-95 shadow-[0_10px_30px_rgba(215,0,0,0.2)]'
                }`}
            >
              {product.soldOut ? "PIEZA_AGOTADA" : "RECLAMAR PIEZA ↓"}
            </button>

            {/* HUD Footer Decorativo */}
            <div className="pt-8 border-t border-zinc-900 flex justify-between items-end">
              <span className="text-zinc-700 font-mono text-[8px] tracking-[0.4em] hidden md:block">
                RAZA_STREET_SYSTEM_V1.0
              </span>
              <div className="text-right">
                <span className="text-zinc-600 font-mono text-[8px] block mb-1 tracking-widest uppercase">COUNTDOWN_STATUS</span>
                <span className="text-3xl font-black italic tracking-widest text-[#D70000] leading-none font-mono">
                  000:007
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ESQUINAS TÉCNICAS (Markers) */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D70000] z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D70000] z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D70000] z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D70000] z-20 pointer-events-none"></div>

      </div>
    </div>
  );
}