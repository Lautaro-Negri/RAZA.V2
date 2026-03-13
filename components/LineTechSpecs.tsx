"use client";

type TechSpecsProps = {
  line: "POTRERO" | "CENIT" | "INSIGNIA" | "INSTITUCIONAL" | "REPRESENTATIVO" | "ACCESORIOS";
};

export default function LineTechSpecs({ line }: TechSpecsProps) {
  const specs = {
    POTRERO: {
      titulo: "UNIDAD DE ENTRENAMIENTO / AMATEUR",
      desc: "Liviana, fresca y versátil.",
      items: ["TEXTURA CLÁSICA TRANSPIRABLE", "CONSTRUCCIÓN ECONÓMICA", "APTO ENTRENAMIENTO INTENSIVO", "SECADO RÁPIDO"]
    },
    CENIT: {
      titulo: "COMPETICIÓN / BALANCE PROFESIONAL",
      desc: "El equilibrio exacto entre peso y durabilidad para el uso frecuente.",
      items: ["DISEÑO 100% PERSONALIZADO", "EXCELENTE RESPIRABILIDAD", "CORTE ANATÓMICO", "RESISTENCIA AL DESGASTE"]
    },
    INSIGNIA: {
      titulo: "ARMADURA ÉLITE / GRADO PRO",
      desc: "Nuestra máxima tecnología. Ingeniería textil aplicada al campo de juego.",
      items: ["TELA ELÁSTICA EXTRA REBOTE", "COMPOSICIÓN ULTRA-LIVIANA", "PANELES FUSIONADOS", "COSTURA REFORZADA BLINDADA"]
    },
    INSTITUCIONAL: {
      titulo: "LINEA STAFF / IDENTIDAD CORPORATIVA",
      desc: "La imagen de tu club fuera de la cancha.",
      items: ["PIQUÉ PREMIUM DENSIDAD", "ALGODÓN PEINADO SOFT-TOUCH", "CALCE RELAJADO", "RESISTENCIA AL LAVADO"]
    },
    REPRESENTATIVO: {
      titulo: "EQUIPAMIENTO DE VIAJE / PRE-MATCH",
      desc: "Indumentaria para staff y cuerpo técnico.Diseño sobrio y profesional.",
      items: ["TELAS RESISTENTES", "REPELENTE AL AGUA", "CORTE ERGONÓMICO", "RETENCIÓN DE CALOR"]
    },
    ACCESORIOS: {
      titulo: "GEAR TÉCNICO / CAPA BASE",
      desc: "Complementos de alto rendimiento para optimizar la respuesta muscular.",
      items: ["COMPRESIÓN TÉCNICA 360", "COSTURAS PLANAS ANTI-ROCE", "HIDROFILIDAD ACELERADA", "PANELES DE VENTILACIÓN"]
    }
  };

  const current = specs[line];

  return (
    <div className="mt-8 bg-[#111] border-2 border-[#D70000] p-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <span className="text-[#D70000] font-black text-[10px] tracking-[0.4em]">ESPECIFICACIÓN TÉCNICA</span>
          <h3 className="text-2xl font-black text-white tracking-tighter">{current.titulo}</h3>
        </div>
        <div className="bg-[#D70000] text-black px-3 py-1 font-black text-xs tracking-widest">{line}</div>
      </div>
      <p className="text-gray-400 font-bold text-sm mb-8 leading-relaxed max-w-2xl">{current.desc}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {current.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 border-l-2 border-gray-800 pl-4 py-2">
            <div className="w-2 h-2 bg-[#D70000]"></div>
            <span className="text-white font-black text-[11px] tracking-widest">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}