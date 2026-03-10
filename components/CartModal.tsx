"use client";

import { useState, useMemo, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function CartModal() {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useCart();
  const [isRendered, setIsRendered] = useState(false); // Controla si el componente está en el DOM
  const [isActive, setIsActive] = useState(false);     // Controla las clases de la animación

  useEffect(() => {
    if (isCartOpen) {
      setIsRendered(true);
      // Pequeño delay para permitir que el componente se monte antes de animar la entrada
      const timer = setTimeout(() => setIsActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      // Para cerrar, primero se ejecuta la animación de salida
      setIsActive(false);
    }
  }, [isCartOpen]);

  const handleAnimationEnd = () => {
    if (!isCartOpen) {
      setIsRendered(false);
    }
  };

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  // Calcula el total del carrito. UseMemo evita que se recalcule en cada render.
  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // Función para enviar el pedido por WhatsApp
  const enviarPedidoWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "5491123456789"; // IMPORTANTE: Reemplazar con tu número de ventas
    const orderId = "RZ-ST-" + Math.floor(1000 + Math.random() * 9000);

    let message = `⚡ *PROTOCOLO DE SOLICITUD - RAZA* ⚡\n\n`;
    message += `*ORDEN:* #${orderId}\n`;
    message += `----------------------------\n`;
    message += `*DATOS DE CONTACTO:*\n`;
    message += `*CLIENTE:* ${customerInfo.nombre}\n`;
    message += `*WHATSAPP:* ${customerInfo.telefono}\n`;
    message += `*ENTREGA:* ${customerInfo.direccion}\n`;
    message += `----------------------------\n`;
    message += `*DETALLE DE CARGA:*\n\n`;

    cart.forEach((item) => {
      message += `• ${item.name}\n`;
      message += `  TALLE: ${item.size} | CANT: ${item.quantity}\n\n`;
    });

    message += `----------------------------\n`;
    message += `*TOTAL (Ref.):* $${total.toLocaleString("es-AR")}\n`;
    message += `----------------------------\n`;
    message += `Solicito verificación de stock y link de pago para procesar el despacho.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

    setIsContactModalOpen(false);
    // Opcional: podrías cerrar el carrito también
    // toggleCart(); 
  };

  if (!isRendered) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 cursor-pointer transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
        onClick={toggleCart}
      />

      <div onTransitionEnd={handleAnimationEnd}
           className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0A0A0A] border-l-2 border-[#D70000] z-50 flex flex-col font-sans uppercase transition-transform duration-500 ease-in-out ${isActive ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-black/50 shrink-0">
          <h2 className="text-xl font-black tracking-[0.2em] text-white">
            CARGA <span className="text-[#D70000]">[{cart.length}]</span>
          </h2>
          <button
            onClick={toggleCart}
            className="text-zinc-500 hover:text-[#D70000] font-mono text-sm px-2 py-1 border border-transparent hover:border-zinc-800 transition-all"
          >
            [ CERRAR ]
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <p className="font-mono text-xs tracking-[0.3em]">SISTEMA DE CARGA VACÍO</p>
              <p className="text-[10px] text-zinc-700 tracking-widest mt-1">// STATUS: STANDBY</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-zinc-900 pb-5 last:border-0">
                <div className="flex-1">
                  <h3 className="text-white font-black tracking-widest text-base mb-2">{item.name}</h3>
                  <div className="flex gap-2 items-center">
                    <span className="bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-0.5 font-mono">TALLE: {item.size}</span>
                    <span className="bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-0.5 font-mono">CANT: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end justify-between">
                  <p className="text-white font-black text-lg font-mono">${(item.price * item.quantity).toLocaleString("es-AR")}</p>
                  <button onClick={() => removeFromCart(`${item.id}-${item.size}`)} className="text-zinc-600 hover:text-[#D70000] text-[9px] font-black tracking-widest mt-2 transition-colors">
                    [ ELIMINAR ]
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-900 bg-black/50 shrink-0">
            <div className="flex justify-between items-center mb-5 font-mono">
              <span className="text-zinc-400 text-xs tracking-widest">// TOTAL DE TRANSMISIÓN</span>
              <span className="text-white font-black text-2xl">${total.toLocaleString("es-AR")}</span>
            </div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full bg-[#D70000] text-black font-black py-5 hover:bg-white transition-all tracking-[0.2em] text-base active:scale-[0.98]"
            >
              INICIAR PROTOCOLO DE COMPRA
            </button>
          </div>
        )}
      </div>

      {/* MODAL DE DATOS DE ENVÍO */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#050505] border-2 border-[#D70000] p-8 max-w-lg w-full relative shadow-[0_0_40px_rgba(215,0,0,0.3)]">
            <button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white font-mono text-sm">[ CERRAR ]</button>
            <h3 className="text-2xl font-black mb-2 text-white tracking-[0.2em]">DATOS DE</h3>
            <h3 className="text-4xl font-black mb-8 text-[#D70000] tracking-widest italic">DESPACHO</h3>

            <form onSubmit={enviarPedidoWhatsApp} className="space-y-6 font-mono">
              <input required type="text" placeholder=">> NOMBRE COMPLETO" value={customerInfo.nombre} onChange={(e) => setCustomerInfo({ ...customerInfo, nombre: e.target.value })} className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-white text-white p-3 outline-none font-bold text-sm tracking-widest placeholder:text-zinc-600 transition-colors" />
              <input required type="tel" placeholder=">> WHATSAPP DE CONTACTO" value={customerInfo.telefono} onChange={(e) => setCustomerInfo({ ...customerInfo, telefono: e.target.value })} className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-white text-white p-3 outline-none font-bold text-sm tracking-widest placeholder:text-zinc-600 transition-colors" />
              <input required type="text" placeholder=">> DIRECCIÓN DE ENVÍO" value={customerInfo.direccion} onChange={(e) => setCustomerInfo({ ...customerInfo, direccion: e.target.value })} className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-white text-white p-3 outline-none font-bold text-sm tracking-widest placeholder:text-zinc-600 transition-colors" />

              <button type="submit" className="w-full bg-white text-black font-black py-4 mt-6 hover:bg-[#D70000] hover:text-white transition-colors tracking-[0.2em] text-base">
                CONFIRMAR Y ENVIAR PEDIDO
              </button>
              <p className="text-zinc-600 text-[10px] text-center tracking-widest pt-2">
                // SERÁS REDIRIGIDO A WHATSAPP PARA FINALIZAR
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}