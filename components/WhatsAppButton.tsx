import Link from 'next/link';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className="w-8 h-8"
    fill="currentColor"
  >
    <path d="M380.9 97.1C339.4 55.6 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115.2-67.1-157.1zM223.9 439.6c-38.2 0-73.9-14.9-100.6-41.2l-7.1-7.1-74.9 19.6 19.9-72.9-7.7-7.4c-24.1-23.4-38.9-55.9-38.9-90.8 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export default function WhatsAppButton() {
  // IMPORTANTE: Reemplazá este número con el de tu tienda.
  // El formato es: código de país (sin +) + código de área + número.
  // Ejemplo para Argentina (Buenos Aires): 5491123456789
  const phoneNumber = "5491123456789";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-black/40 backdrop-blur-sm border border-white/20 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:border-[#D70000] hover:text-[#D70000] transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon />
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        ¿Hablamos?
      </div>
    </Link>
  );
}