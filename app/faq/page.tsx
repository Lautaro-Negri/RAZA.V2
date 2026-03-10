"use client";

import { useState } from "react";
import Link from "next/link";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "¿Cómo empiezo mi pedido con RAZA?",
      a: "Nos hablas por WhatsApp o completas el formulario con nombre del club, cantidad aproximada y idea de diseño. Te respondemos con propuesta y mockup sin compromiso."
    },
    {
      q: "¿RAZA me diseña la camiseta o tengo que enviar el diseño?",
      a: "Podemos trabajar de las dos formas: partimos de tu escudo e idea, o diseñamos desde cero la camiseta de tu RAZA con nuestro equipo de diseño."
    },
    {
      q: "¿Qué diferencia hay entre las líneas POTRERO, CENIT, INSIGNIA, REPRESENTATIVO e INSTITUCIONAL?",
      a: "Cada línea está pensada para un nivel distinto de uso, tela y detalle. En nuestra web vas a encontrar explicado qué tela usamos, para qué tipo de equipo es cada set y qué incluye."
    },
    {
      q: "¿Qué tipo de telas usan para las camisetas y conjuntos?",
      a: "Trabajamos con telas deportivas técnicas (Polyfit, Dryfit, microfibra, frizados) para juego y representación, y algodón de primera línea con DTF para la línea institucional. Siempre priorizamos comodidad, respirabilidad y durabilidad."
    },
    {
      q: "¿Puedo agregar nombres, números y logos de sponsor?",
      a: "Sí. Sumamos nombres, números, escudo y sponsors sin complicarte el proceso. Te mostramos la maqueta antes de producir para que veas cómo queda todo. Y NO sumamos costos extras por detalles."
    },
    {
      q: "¿Hay un pedido mínimo?",
      a: "Sí, manejamos un mínimo por modelo/línea para que el costo cierre para el club. Consultá el mínimo actualizado según la línea que elijas."
    },
    {
      q: "¿Puedo repetir un diseño más adelante con menos cantidad?",
      a: "Sí. Guardamos tu diseño y podés reponer camisetas o conjuntos sin volver a arrancar de cero (sujeto al mínimo de reposición que maneje cada línea)."
    },
    {
      q: "¿Qué talles manejan? ¿Tienen infantiles y femeninos?",
      a: "Sí, trabajamos talles infantiles, juveniles, unisex y opciones femeninas según línea. Podés mezclar talles dentro del mismo pedido. Pero no se puede mezclar molderías."
    },
    {
      q: "¿Cómo sé qué talles pedir para mi equipo?",
      a: "Disponemos de guía de talles y te asesoramos según el tipo de prenda. Contamos con talles hasta el XXL."
    },
    {
      q: "¿Cuál es el tiempo de producción?",
      a: "El plazo corre desde la aprobación final del diseño y listado de talles y el pago de la seña correspondiente. Varía según la línea y cantidad, pero siempre te informamos una fecha estimada antes de confirmar el pedido."
    },
    {
      q: "¿Hacen pedidos urgentes?",
      a: "En algunos casos sí, según agenda de producción. Si tenés una fecha límite, contanos así vemos si podemos llegar."
    },
    {
      q: "¿A qué zonas hacen envíos?",
      a: "Enviamos a todo el país mediante transporte o correo. El costo de envío se calcula según destino y se coordina al confirmar el pedido."
    },
    {
      q: "¿El diseño tiene costo adicional?",
      a: "El diseño está incluido en nuestras líneas personalizadas mientras el pedido se concrete con RAZA."
    },
    {
      q: "¿Qué formas de pago aceptan?",
      a: "Trabajamos con seña del 50% para iniciar producción y saldo previo a la entrega. Podés consultar medios de pago disponibles al momento de cotizar."
    },
    {
      q: "¿Qué pasa si una prenda llega con falla o error?",
      a: "Si hay un defecto de fabricación o error nuestro en diseño, reemplazamos la prenda según nuestra política de garantía."
    },
    {
      q: "¿Aceptan cambios de talle una vez entregado el pedido?",
      a: "En producciones personalizadas no es posible cambiar talles ya usados o personalizados con nombre/número. Te ayudamos a definir bien los talles antes para evitar problemas."
    },
    {
      q: "¿Cómo debo cuidar las camisetas para que duren más?",
      a: "Recomendamos lavar del revés, con agua fría, sin cloro ni secadora, y no planchar directamente sobre estampas o DTF."
    },
    {
      q: "¿Puedo usar cualquier logo o imagen?",
      a: "Podés usar escudo propio y sponsors autorizados. No trabajamos con logos sin permiso o material con derechos de autor de terceros."
    },
    {
      q: "¿Quién conserva el diseño final?",
      a: "El diseño se asocia a tu club/equipo y queda registrado en RAZA para futuras reposiciones, respetando tu identidad."
    },
    {
      q: "¿Me asesoran para elegir la mejor línea para mi club?",
      a: "Siempre. Nos contás quiénes son, cómo compiten y qué presupuesto manejan, y te guiamos hacia el set que mejor represente su RAZA."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans uppercase pt-32 flex flex-col relative">
      
      {/* TEXTURA DE FONDO */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex-1 w-full pb-32">
        
        {/* ========================================= */}
        {/* ENCABEZADO TÉCNICO */}
        {/* ========================================= */}
        <div className="mb-16 border-b border-gray-900 pb-10">
          <span className="text-[#D70000] font-black text-[10px] md:text-xs tracking-[0.4em] block mb-4 italic">
            // DATA BASE & SUPPORT
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4 text-white">
            PREGUNTAS <span className="text-[#D70000]">FRECUENTES</span>
          </h1>
          <p className="text-gray-400 font-medium tracking-wide leading-relaxed text-sm md:text-base normal-case">
            Resolvé tus dudas más comunes sobre nuestros pedidos y productos.
          </p>
        </div>

        {/* ========================================= */}
        {/* ACORDEÓN DE PREGUNTAS (SISTEMA INTERACTIVO) */}
        {/* ========================================= */}
        <div className="flex flex-col border-t border-gray-900">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const number = String(index + 1).padStart(2, '0');

            return (
              <div key={index} className="border-b border-gray-900 bg-[#050505] hover:bg-[#080808] transition-colors">
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group focus:outline-none"
                >
                  <div className="flex items-center gap-6 md:gap-8 pr-4">
                    <span className={`font-black italic text-lg transition-colors duration-300 ${isOpen ? "text-[#D70000]" : "text-gray-700"}`}>
                      {number}
                    </span>
                    <h3 className={`font-black text-xs md:text-sm tracking-wide transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                      {faq.q}
                    </h3>
                  </div>
                  
                  {/* Icono Técnico [+] / [-] */}
                  <div className="flex-none text-gray-600 font-mono text-xs md:text-sm font-black tracking-tighter">
                    {isOpen ? (
                      <span className="text-[#D70000]">[ - ]</span>
                    ) : (
                      <span className="group-hover:text-white transition-colors">[ + ]</span>
                    )}
                  </div>
                </button>

                {/* Respuesta Desplegable (Animación fluida con Grid) */}
                <div 
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 md:p-8 pt-0 pl-20 md:pl-24">
                      <div className="border-l-2 border-[#D70000] pl-6">
                        <p className="text-gray-400 text-sm md:text-base normal-case leading-relaxed font-medium">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>



      </div>



    </div>
  );
}