// d:\raza\components\Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, toggleCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil
  const prevCartRef = useRef(cart);

  // Efecto para la animación del carrito y notificación
  useEffect(() => {
    if (cart.length > prevCartRef.current.length) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      const lastItem = cart[cart.length - 1];
      if (lastItem) {
        toast.success(`"${lastItem.name}" AÑADIDO AL CARRO`);
      }
      return () => clearTimeout(timer);
    }
    prevCartRef.current = cart;
  }, [cart]);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const dropdownItemClass = "block p-4 text-[10px] font-mono font-bold tracking-widest text-gray-400 hover:bg-[#D70000] hover:text-black transition-all border-b border-zinc-800 last:border-0 uppercase";

  return (
    <>
      <style jsx global>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes pop {
          50% { transform: scale(1.5); }
        }
        .animate-pop {
          animation: pop 0.3s ease-out;
        }
      `}</style>
      <nav className="w-full bg-[#050505] border-b border-zinc-900 z-50 sticky top-0 font-sans uppercase backdrop-blur-md bg-opacity-90">
      
      {/* TOP BAR TÉCNICA (Solo Desktop) */}
      <div className="w-full bg-black border-b border-zinc-900 py-1 px-6 flex justify-between items-center hidden md:flex">
         <div className="flex gap-4 text-[8px] font-mono text-zinc-600 tracking-widest">
            <span>SYSTEM_STATUS: ONLINE</span>
            <span>//</span>
            <span>SECURE_CONNECTION_V2</span>
         </div>
         <div className="text-[8px] font-mono text-[#D70000] tracking-widest animate-pulse">
            LIVE_OPERATIONS
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* BOTÓN HAMBURGUESA (Solo Móvil) */}
        <div className="flex-1 md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 -ml-2 hover:text-[#D70000] transition-colors"
              aria-label="Abrir menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
        </div>

        {/* IZQUIERDA: NAVEGACIÓN PRINCIPAL (Solo Desktop) */}
        <div className="flex-1 hidden md:flex items-center gap-8">
          
          {/* DROPDOWN TIENDA */}
          <div className="relative group h-full flex items-center">
            <button className="text-[10px] font-black tracking-[0.3em] text-gray-400 group-hover:text-[#D70000] transition-colors flex items-center gap-2">
              <span className="group-hover:translate-x-1 transition-transform duration-300">TIENDA</span>
              <span className="text-[8px] opacity-50 group-hover:rotate-180 transition-transform duration-300">▼</span>
            </button>
            
            {/* SUB-MENÚ */}
            <div className="absolute top-full left-0 w-64 bg-black border border-zinc-800 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              <div className="h-1 w-full bg-[#D70000]"></div>
              <Link href="/deportiva" className={dropdownItemClass}>
                [ TODAS LAS LÍNEAS ]
              </Link>
              <Link href="/deportiva" className={dropdownItemClass}>
                REPRESENTATIVO
              </Link>
              <Link href="/arqueros" className={dropdownItemClass}>
                ARQUEROS
              </Link>
            </div>
          </div>

          <Link 
            href="/streetwear" 
            className={`text-[10px] font-black tracking-[0.3em] transition-colors relative group ${pathname === "/streetwear" ? "text-[#D70000]" : "text-gray-400 hover:text-white"}`}
          >
            STREETWEAR
            <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#D70000] transition-all duration-300 ${pathname === "/streetwear" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </Link>
        </div>

        {/* CENTRO: LOGO RAZA */}
        <div className="flex-none absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="group flex flex-col items-center">
            <img 
              src="/LogoRaza.png" 
              alt="RAZA" 
              className="h-14 w-auto brightness-200 group-hover:brightness-100 transition-all duration-500" 
            />
          </Link>
        </div>

        {/* DERECHA: UTILIDADES */}
        <div className="flex-1 flex items-center justify-end gap-8">
          <Link 
            href="/adn" 
            className={`hidden md:block text-[10px] font-black tracking-[0.3em] transition-colors relative group ${pathname === "/adn" ? "text-[#D70000]" : "text-gray-400 hover:text-white"}`}
          >
            ADN
            <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#D70000] transition-all duration-300 ${pathname === "/adn" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </Link>
          <Link 
            href="/contacto" 
            className={`hidden md:block text-[10px] font-black tracking-[0.3em] transition-colors relative group ${pathname === "/contacto" ? "text-[#D70000]" : "text-gray-400 hover:text-white"}`}
          >
            CONTACTO
            <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#D70000] transition-all duration-300 ${pathname === "/contacto" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </Link>
          
          {/* CARRITO TÉCNICO */}
          <button 
            onClick={toggleCart}
            className={`relative group flex items-center gap-2 border border-transparent hover:border-zinc-800 px-3 py-2 transition-all bg-black/50 ${
              isAnimating ? 'animate-shake' : ''
            }`}
          >
            <span className="text-[9px] font-mono text-[#D70000] group-hover:text-white transition-colors">CART</span>
            <div className="relative">
               <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" height="16" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" 
                className="text-white group-hover:text-[#D70000] transition-colors"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cart.length > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-[#D70000] text-black text-[8px] font-black w-3 h-3 flex items-center justify-center ${
                    isAnimating ? 'animate-pop' : ''
                  }`}
                >
                  {cart.length}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE (Nuevo) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-zinc-800 animate-in slide-in-from-top-5 z-40 border-t border-zinc-900/50">
            <Link href="/deportiva" className={dropdownItemClass}>TIENDA DEPORTIVA</Link>
            <Link href="/streetwear" className={dropdownItemClass}>STREETWEAR</Link>
            <Link href="/adn" className={dropdownItemClass}>ADN</Link>
            <Link href="/contacto" className={dropdownItemClass}>CONTACTO</Link>
        </div>
      )}

      {/* DECORACIÓN DE ESQUINAS */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D70000]/50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D70000]/50"></div>
    </nav>
    </>
  );
}
