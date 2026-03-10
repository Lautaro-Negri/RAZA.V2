"use client";

import { useState } from "react";
// Importamos la acción que definimos para manejar la base de datos
import { handleManifestAction } from "../app/deportiva/actions";

interface Player {
  id: string;
  name: string;
  number: string;
  sizes: Record<string, string>;
}

export default function TeamRoster({ selectedLine, selectedKit }: { selectedLine: string, selectedKit: string[] }) {
  const MIN_PLAYERS = 10;
  const SIZES = ["S", "M", "L", "XL", "XXL"];

  // 1. ESTADO DE DATOS DE CONTACTO (OBLIGATORIOS)
  const [contactInfo, setContactInfo] = useState({
    nombreResponsable: "",
    nombreClub: "",
    telefono: "",
    email: ""
  });

  // 2. ESTADO DE LA MATRIZ DE JUGADORES
  const [players, setPlayers] = useState<Player[]>([]);

  // 3. FUNCIONES DE GESTIÓN DE FILAS
  const addPlayer = () => {
    setPlayers([...players, { 
      id: crypto.randomUUID(), 
      name: "", 
      number: "", 
      sizes: {} 
    }]);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const updatePlayer = (id: string, field: "name" | "number", value: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updatePlayerSize = (id: string, garment: string, size: string) => {
    setPlayers(players.map(p => 
      p.id === id ? { ...p, sizes: { ...p.sizes, [garment]: size } } : p
    ));
  };

  // 4. LÓGICA DE VALIDACIÓN DEL MANIFIESTO
  const isFormValid = 
    contactInfo.nombreResponsable.trim() !== "" &&
    contactInfo.nombreClub.trim() !== "" &&
    contactInfo.telefono.trim() !== "" &&
    contactInfo.email.includes("@") &&
    players.length >= MIN_PLAYERS;

  // 5. ENVÍO A BASE DE DATOS MEDIANTE SERVER ACTION
  const handleSendManifest = async () => {
    if (!isFormValid) return;
    
    const payload = {
      fecha: new Date().toISOString(),
      linea: selectedLine,
      prendas: selectedKit,
      contacto: contactInfo,
      jugadores: players
    };

    // Llamamos a la función del servidor que interactúa con Supabase
    const result = await handleManifestAction(payload);

    if (result.success) {
      alert("✅ MANIFIESTO REGISTRADO: Los datos se han cargado en la tabla 'manifiestos'.");
      // Opcional: podrías resetear el estado aquí
    } else {
      alert("❌ ERROR TÉCNICO: " + result.error);
    }
  };

  // Renderizado condicional si no hay prendas seleccionadas
  if (selectedKit.length === 0) {
    return (
      <div className="bg-[#050505] border border-gray-900 p-8 text-center w-full">
        <span className="text-[#D70000] font-mono text-xs tracking-widest animate-pulse">
          [ SISTEMA EN ESPERA: SELECCIONE PRENDAS EN EL CATÁLOGO PARA HABILITAR MATRIZ ]
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-700">
      
      {/* --- FORMULARIO DE CONTACTO OBLIGATORIO --- */}
      <div className="bg-[#050505] border border-gray-900 p-6 md:p-8">
        <h3 className="text-white font-black text-xs tracking-[0.4em] uppercase italic mb-6 border-b border-gray-900 pb-4">
          // IDENTIFICACIÓN DEL <span className="text-[#D70000]">SOLICITANTE</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="NOMBRE DEL RESPONSABLE"
            value={contactInfo.nombreResponsable}
            onChange={(e) => setContactInfo({...contactInfo, nombreResponsable: e.target.value})}
            className="bg-black border border-gray-800 p-4 text-[10px] font-mono text-white focus:border-[#D70000] outline-none transition-all placeholder:text-gray-700"
          />
          <input 
            type="text" 
            placeholder="NOMBRE DEL CLUB / EQUIPO"
            value={contactInfo.nombreClub}
            onChange={(e) => setContactInfo({...contactInfo, nombreClub: e.target.value})}
            className="bg-black border border-gray-800 p-4 text-[10px] font-mono text-white focus:border-[#D70000] outline-none transition-all placeholder:text-gray-700"
          />
          <input 
            type="tel" 
            placeholder="TELÉFONO"
            value={contactInfo.telefono}
            onChange={(e) => setContactInfo({...contactInfo, telefono: e.target.value})}
            className="bg-black border border-gray-800 p-4 text-[10px] font-mono text-white focus:border-[#D70000] outline-none transition-all placeholder:text-gray-700"
          />
          <input 
            type="email" 
            placeholder="EMAIL@CONTACTO.COM"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
            className="bg-black border border-gray-800 p-4 text-[10px] font-mono text-white focus:border-[#D70000] outline-none transition-all placeholder:text-gray-700"
          />
        </div>
      </div>

      {/* --- MATRIZ DINÁMICA DE CARGA --- */}
      <div className="bg-[#050505] border border-gray-900 p-6 md:p-8 overflow-hidden">
        <div className="flex justify-between items-end mb-6 border-b border-gray-900 pb-4">
          <h3 className="text-white font-black text-xs tracking-[0.4em] uppercase italic">
            // LISTADO DE <span className="text-[#D70000]">UNIDADES</span>
          </h3>
          <div className="text-right">
            <span className="text-gray-500 font-mono text-[9px] tracking-widest block uppercase">Requerido: {MIN_PLAYERS} min.</span>
            <span className={`font-mono text-xs font-bold ${players.length >= MIN_PLAYERS ? "text-green-500" : "text-[#D70000]"}`}>
              STATUS: {players.length} UNIDADES DETECTADAS
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px] border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 tracking-widest uppercase">
                <th className="p-3 w-10">ID</th>
                <th className="p-3">NOMBRE (ESPALDA)</th>
                <th className="p-3 w-20 text-center">N°</th>
                {selectedKit.map(item => (
                  <th key={item} className="p-3 w-28 text-center text-[#D70000] border-l border-gray-900">{item}</th>
                ))}
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id} className="border-b border-gray-800/40 hover:bg-white/[0.02] transition-colors">
                  <td className="p-2 text-gray-700">{String(index + 1).padStart(2, '0')}</td>
                  <td className="p-2">
                    <input 
                      type="text" 
                      value={player.name}
                      onChange={(e) => updatePlayer(player.id, "name", e.target.value)}
                      placeholder="ESCRIBIR NOMBRE..."
                      className="bg-transparent border-b border-gray-900 w-full p-2 text-white focus:border-[#D70000] outline-none uppercase placeholder:text-gray-800"
                    />
                  </td>
                  <td className="p-2">
                    <input 
                      type="text" 
                      value={player.number}
                      onChange={(e) => updatePlayer(player.id, "number", e.target.value)}
                      placeholder="00"
                      className="bg-transparent border-b border-gray-900 w-full p-2 text-white text-center focus:border-[#D70000] outline-none"
                    />
                  </td>
                  {selectedKit.map(item => (
                    <td key={item} className="p-2 border-l border-gray-900/50">
                      <select 
                        value={player.sizes[item] || ""}
                        onChange={(e) => updatePlayerSize(player.id, item, e.target.value)}
                        className="bg-black border border-gray-800 w-full p-2 text-white text-center focus:border-[#D70000] outline-none cursor-pointer hover:bg-zinc-900 transition-colors"
                      >
                        <option value="" disabled>-</option>
                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  ))}
                  <td className="p-2">
                    <button 
                      onClick={() => removePlayer(player.id)}
                      className="text-gray-700 hover:text-[#D70000] transition-colors font-bold text-lg px-2"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          onClick={addPlayer}
          className="mt-8 w-full border border-dashed border-gray-800 py-4 text-gray-500 font-mono text-[9px] tracking-[0.5em] hover:border-[#D70000] hover:text-[#D70000] transition-all uppercase"
        >
          + AÑADIR UNIDAD AL MANIFIESTO
        </button>
      </div>

      {/* --- BOTÓN FINAL DE CIERRE --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#050505] border border-gray-900 p-6 md:p-8">
        <div className="font-mono text-[9px] tracking-widest text-left uppercase">
          {!isFormValid ? (
            <div className="flex flex-col gap-1">
              <span className="text-[#D70000] animate-pulse">[ ERROR: PROTOCOLO DE CARGA INCOMPLETO ]</span>
              <span className="text-gray-600">REQ: CONTACTO OK / MIN: {MIN_PLAYERS} JUGADORES</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="text-green-500">[ VALIDACIÓN COMPLETA ]</span>
              <span className="text-gray-400">SISTEMA LISTO PARA TRANSFERENCIA DE DATOS</span>
            </div>
          )}
        </div>
        
        <button 
          disabled={!isFormValid}
          onClick={handleSendManifest}
          className={`px-12 py-5 font-black text-xs tracking-[0.4em] uppercase transition-all duration-500
            ${isFormValid 
              ? "bg-[#D70000] text-black hover:bg-white cursor-pointer shadow-[0_0_20px_rgba(215,0,0,0.2)]" 
              : "bg-zinc-900 text-gray-700 cursor-not-allowed border border-gray-800"
            }`}
        >
          {isFormValid ? "REGISTRAR Y ENVIAR" : "SISTEMA BLOQUEADO"}
        </button>
      </div>

    </div>
  );
}