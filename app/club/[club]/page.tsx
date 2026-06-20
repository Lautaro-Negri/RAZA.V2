import Image from "next/image";
import Link from "next/link";

type ClubPageData = {
  title: string;
  description: string;
  image: string;
};

const clubPages: Record<string, ClubPageData> = {
  "buzo-algodon": {
    title: "Buzo Algodón",
    description: "Explorá la colección premium de buzos técnicos con estilo industrial y performance de alto impacto.",
    image: "/images/buzoAlgodon.webp",
  },
  "camiseta-termica": {
    title: "Camiseta Térmica",
    description: "Descubrí la camiseta térmica diseñada para mantener el rendimiento en condiciones frías sin perder movilidad.",
    image: "/images/CAMISETATÉRMICA.webp",
  },
  conjunto: {
    title: "Conjunto",
    description: "Un set completo para entrenar y competir con una estética robusta y duradera.",
    image: "/images/conjunto.webp",
  },
  "hoodie-r": {
    title: "Hoodie R",
    description: "El hoodie de streetwear que combina actitud urbana con materiales técnicos de primera calidad.",
    image: "/images/hoodieR.webp",
  },
  "medias-potrero": {
    title: "Medias Potrero",
    description: "Media deportiva con tracción y soporte para cada jugada, pensada para el rendimiento en cancha.",
    image: "/images/mediasPotrero.webp",
  },
  "remera-algodon": {
    title: "Remera Algodón",
    description: "Remera de uso diario que mantiene la identidad técnica de la línea con una caída premium.",
    image: "/images/remeraalgodon.webp",
  },
  "remera-potrero": {
    title: "Remera Potrero",
    description: "Remera deportiva con diseño de alta resistencia para entrenamientos intensos.",
    image: "/images/remeraPotrero.webp",
  },
  "short-potrero": {
    title: "Short Potrero",
    description: "Short táctico con fit atlético y acabados pensados para la cancha.",
    image: "/images/shortPotrero.webp",
  },
};

export default function ClubPage({ params }: { params: { club: string } }) {
  const page = clubPages[params.club];

  if (!page) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-black mb-6">Página no encontrada</h1>
          <p className="text-gray-400 mb-8">No existe una página para ese logo. Volvé al inicio y seleccioná otro club.</p>
          <Link href="/" className="inline-block px-8 py-4 border border-white text-white font-black hover:bg-white hover:text-black transition">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <span className="text-[#D70000] font-black tracking-[0.4em] text-xs uppercase">Club / Perfil</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">{page.title}</h1>
          <p className="text-gray-300 max-w-2xl text-sm md:text-base leading-7">{page.description}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/" className="px-6 py-3 border border-white text-white font-black uppercase text-[10px] tracking-[0.35em] hover:bg-white hover:text-black transition">
              Volver al inicio
            </Link>
            <Link href="/deportiva" className="px-6 py-3 border border-[#D70000] text-[#D70000] font-black uppercase text-[10px] tracking-[0.35em] hover:bg-[#D70000] hover:text-black transition">
              Ver línea deportiva
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[12px] border border-white/10 bg-[#101010] p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,0,0,0.15),transparent_45%)] pointer-events-none" />
          <div className="relative aspect-square w-full min-h-[360px] bg-[#151515]">
            <Image
              src={page.image}
              alt={page.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
