"use client";

import { useState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Llamamos a la acción de servidor que maneja las cookies con @supabase/ssr
    const result = await loginAction(email, password);

    if (result && !result.success) {
      setErrorMsg("ACCESO DENEGADO: CREDENCIALES INVÁLIDAS O ERROR DE RED");
      setLoading(false);
    }
    // Si el resultado es exitoso, Next.js ejecutará el redirect('/') desde el servidor
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 uppercase font-sans selection:bg-[#D70000] selection:text-white">
      <div className="w-full max-w-md border border-gray-900 bg-[#050505] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* ENCABEZADO TÉCNICO */}
        <div className="border-l-4 border-[#D70000] pl-6 mb-10">
          <h1 className="text-3xl font-black tracking-tighter italic text-white uppercase leading-none">
            AUTH <span className="text-[#D70000]">RAZA</span>
          </h1>
          <p className="text-gray-600 text-[9px] font-mono tracking-widest mt-2">
            // ACCESO RESTRINGIDO A PERSONAL AUTORIZADO
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* CAMPO: EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-mono text-gray-500 tracking-[0.3em] uppercase">
              USER_IDENTIFICATION
            </label>
            <input 
              type="email" 
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border border-gray-800 p-4 text-xs text-white focus:border-[#D70000] outline-none font-mono transition-all disabled:opacity-50"
              placeholder="admin@razasport.com"
            />
          </div>

          {/* CAMPO: PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-mono text-gray-500 tracking-[0.3em] uppercase">
              SECURITY_PASSCODE
            </label>
            <input 
              type="password" 
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border border-gray-800 p-4 text-xs text-white focus:border-[#D70000] outline-none font-mono transition-all disabled:opacity-50"
              placeholder="********"
            />
          </div>

          {/* MENSAJE DE ERROR */}
          {errorMsg && (
            <div className="text-[#D70000] font-mono text-[9px] tracking-widest bg-[#D70000]/5 border border-[#D70000]/20 p-3 animate-pulse">
              [!] {errorMsg}
            </div>
          )}

          {/* BOTÓN DE ACCIÓN */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full font-black py-5 text-xs tracking-[0.5em] transition-all duration-500 uppercase
              ${loading 
                ? "bg-zinc-800 text-gray-500 cursor-wait border border-zinc-700" 
                : "bg-[#D70000] text-black hover:bg-white cursor-pointer active:scale-95"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin text-lg">↻</span>
                VERIFICANDO_SISTEMA...
              </span>
            ) : "CONECTAR CON TERMINAL"}
          </button>
        </form>

        {/* FOOTER DECORATIVO */}
        <div className="mt-10 pt-6 border-t border-gray-900 text-center">
          <span className="text-gray-800 font-mono text-[8px] tracking-[0.5em]">
            RAZA_SPORT_GLOBAL_SECURITY_V2.0
          </span>
        </div>
      </div>
    </div>
  );
}