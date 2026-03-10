import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importamos los componentes globales
import { CartProvider } from "../context/CartContext";
import CartModal from "../components/CartModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "../components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RAZA | Technical Gear",
  description: "Equipamiento Técnico y Streetwear Industrial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0A]`}>
        {/* El Provider envuelve todo para que el carrito funcione en cualquier página */}
        <CartProvider>
          {/* Contenedor para las notificaciones emergentes (toasts) */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#050505",
                color: "#fff",
                border: "1px solid #D70000",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "12px",
              },
              success: {
                iconTheme: {
                  primary: "#D70000",
                  secondary: "black",
                },
              },
            }}
          />
          
          {/* La Navegación global aparece al principio de cada página */}
          <Navbar />

          {/* El contenido específico de cada página se renderiza aquí */}
          {children}

          {/* El Pie de página aparece al final de todo el contenido */}
          <Footer />

          {/* El Modal del carrito vive aquí, oculto hasta que se lo llame */}
          <CartModal />

          {/* Botón flotante de WhatsApp */}
          <WhatsAppButton />

        </CartProvider>
      </body>
    </html>
  );
}