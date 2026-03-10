// app/admin/page.tsx
import { supabase } from "@/lib/supabase";
import StatusSelector from "./StatusSelector";
import ExportCsvButton from "./ExportCsvButton";
import StreetwearStock from "./StreetwearStock"; // Módulo de stock de productos urbanos
import InternalNotes from "./InternalNotes";
import { logoutAction } from "../login/actions";
import Link from "next/link";

// Configuración para asegurar datos frescos en cada carga
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentFilter = params.status;
  const searchQuery = params.q?.toLowerCase() || "";

  // 1. DATA FETCHING: Traemos manifiestos y las líneas del catálogo
  const { data: allManifests, error: manifestError } = await supabase
    .from('manifiestos')
    .select('*')
    .order('created_at', { ascending: false });

  // 1.b. DATA FETCHING: Traemos solicitudes de contacto / alianzas
  const { data: allContacts } = await supabase
    .from('alianzas')
    .select('*')
    .order('created_at', { ascending: false });

  if (manifestError) {
    return (
      <div className="p-10 bg-black min-h-screen text-[#D70000] font-mono">
        [ ERROR_SISTEMA: {manifestError?.message} ]
      </div>
    );
  }

  // 2. CÁLCULO DE MÉTRICAS GLOBALES
  let totalUnidades = 0;
  const lineasCount: Record<string, number> = {};
  const prendasCount: Record<string, number> = {};
  const statusCount: Record<string, number> = {
    'RECIBIDO': 0,
    'EN_DISEÑO': 0,
    'PRODUCCION': 0,
    'DESPACHADO': 0
  };

  allManifests?.forEach(pedido => {
    const cantidadJugadores = pedido.jugadores?.length || 0;
    totalUnidades += cantidadJugadores;

    if (pedido.linea) {
      lineasCount[pedido.linea] = (lineasCount[pedido.linea] || 0) + 1;
    }

    if (pedido.prendas && Array.isArray(pedido.prendas)) {
      pedido.prendas.forEach((prenda: string) => {
        prendasCount[prenda] = (prendasCount[prenda] || 0) + cantidadJugadores;
      });
    }

    // FIX: Si no tiene estado (pedidos viejos), asumimos 'RECIBIDO' para las métricas
    const estadoNormalizado = pedido.estado || 'RECIBIDO';
    if (statusCount[estadoNormalizado] !== undefined) {
      statusCount[estadoNormalizado]++;
    }
  });

  // Calcular el máximo para escalar el gráfico
  const maxCount = Math.max(...Object.values(statusCount), 1);

  const lineaLider = Object.keys(lineasCount).length > 0 
    ? Object.keys(lineasCount).reduce((a, b) => lineasCount[a] > lineasCount[b] ? a : b) 
    : "S/D";
    
  const prendaMasPedida = Object.keys(prendasCount).length > 0
    ? Object.keys(prendasCount).reduce((a, b) => prendasCount[a] > prendasCount[b] ? a : b)
    : "S/D";

  // 3. FILTRADO DE LA LISTA VISUAL
  let displayManifests = allManifests || [];
  if (currentFilter && currentFilter !== 'TODOS') {
    // FIX: También normalizamos aquí para que los filtros encuentren los pedidos viejos
    displayManifests = displayManifests.filter(m => (m.estado || 'RECIBIDO') === currentFilter);
  }
  
  if (searchQuery) {
    displayManifests = displayManifests.filter(m => 
      m.nombre_club?.toLowerCase().includes(searchQuery) ||
      m.nombre_responsable?.toLowerCase().includes(searchQuery) ||
      m.email?.toLowerCase().includes(searchQuery) ||
      String(m.id).includes(searchQuery)
    );
  }

  const filters = [
    { label: "VER TODOS", value: "TODOS", color: "border-gray-800 text-gray-400" },
    { label: "RECIBIDOS", value: "RECIBIDO", color: "border-blue-900 text-blue-400" },
    { label: "EN DISEÑO", value: "EN_DISEÑO", color: "border-purple-900 text-purple-400" },
    { label: "PRODUCCIÓN", value: "PRODUCCION", color: "border-yellow-900 text-yellow-400" },
    { label: "DESPACHADOS", value: "DESPACHADO", color: "border-green-900 text-green-400" },
  ];

  return (
    <div className="p-6 md:p-10 bg-[#0A0A0A] min-h-screen text-white font-sans uppercase">
      <div className="max-w-7xl mx-auto">
        
        {/* CABECERA CON LOGOUT */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="border-l-4 border-[#D70000] pl-6">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-none">
              PANEL DE <span className="text-[#D70000]">LOGÍSTICA RAZA</span>
            </h1>
            <p className="text-gray-500 font-bold text-[10px] tracking-[0.3em] mt-3 italic uppercase">
              // TERMINAL DE CONTROL CENTRAL v1.5
            </p>
          </div>

          <form action={logoutAction}>
            <button className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-gray-400 hover:text-[#D70000] hover:border-[#D70000] font-mono text-[9px] tracking-widest transition-all uppercase">
              [ LOGOUT_SISTEMA ]
            </button>
          </form>
        </div>

        {/* SECCIÓN SUPERIOR: PIPELINE Y MÉTRICAS */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          
          {/* COLUMNA IZQUIERDA: PIPELINE (50%) */}
          <div className="w-full lg:w-1/2 border border-gray-900 bg-[#050505] p-6 md:p-8 flex flex-col">
             {/* Pipeline Header */}
             <div className="flex justify-between items-end mb-8 border-b border-gray-900 pb-4">
                 <h3 className="text-white font-black italic tracking-tighter uppercase">
                   PIPELINE DE <span className="text-[#D70000]">VENTAS</span>
                 </h3>
                 <span className="text-[9px] font-mono text-gray-500 tracking-widest hidden md:block">
                   ESTADOS ACTIVOS
                 </span>
              </div>
              
              {/* Pipeline Chart */}
              <div className="flex items-end justify-around h-64 w-full gap-2 md:gap-4 px-2 relative flex-1">
                {/* Grid lines background */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-2 md:px-8 opacity-20">
                   <div className="w-full h-px bg-gray-800 border-t border-dashed border-gray-600"></div>
                   <div className="w-full h-px bg-gray-800 border-t border-dashed border-gray-600"></div>
                   <div className="w-full h-px bg-gray-800 border-t border-dashed border-gray-600"></div>
                   <div className="w-full h-px bg-gray-800 border-t border-dashed border-gray-600"></div>
                   <div className="w-full h-px bg-gray-800 border-t border-dashed border-gray-600"></div>
                </div>

                {Object.entries(statusCount).map(([status, count]) => {
                  const heightPercentage = (count / maxCount) * 100;
                  
                  let colorClass = "bg-gray-600";
                  let textClass = "text-gray-500";
                  let shadowClass = "shadow-[0_0_15px_rgba(100,100,100,0.3)]";

                  if (status === 'RECIBIDO') { colorClass = "bg-blue-600"; textClass = "text-blue-500"; shadowClass = "shadow-[0_0_20px_rgba(37,99,235,0.3)]"; }
                  if (status === 'EN_DISEÑO') { colorClass = "bg-purple-600"; textClass = "text-purple-500"; shadowClass = "shadow-[0_0_20px_rgba(147,51,234,0.3)]"; }
                  if (status === 'PRODUCCION') { colorClass = "bg-yellow-500"; textClass = "text-yellow-500"; shadowClass = "shadow-[0_0_20px_rgba(234,179,8,0.3)]"; }
                  if (status === 'DESPACHADO') { colorClass = "bg-green-600"; textClass = "text-green-500"; shadowClass = "shadow-[0_0_20px_rgba(22,163,74,0.3)]"; }

                  return (
                    <div key={status} className="flex flex-col items-center justify-end h-full flex-1 group relative z-10">
                      
                      {/* Value Label */}
                      <span className={`text-xl md:text-3xl font-black mb-3 transition-all duration-500 ${count > 0 ? 'text-white' : 'text-gray-800'}`}>
                        {count}
                      </span>

                      {/* Bar */}
                      <div 
                        className={`w-full max-w-[60px] md:max-w-[80px] ${colorClass} transition-all duration-1000 ease-out relative group-hover:brightness-110 group-hover:-translate-y-1 ${count > 0 ? shadowClass : ''}`}
                        style={{ height: `${Math.max(heightPercentage, 2)}%` }}
                      >
                        {/* Top highlight for 3D effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                      </div>
                      
                      {/* Label */}
                      <div className="h-10 flex items-start justify-center mt-4">
                        <span className={`text-[8px] md:text-[10px] font-black tracking-widest uppercase text-center leading-tight ${textClass}`}>
                            {status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>

          {/* COLUMNA DERECHA: MÉTRICAS (50%) */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-[#050505] border border-gray-900 p-6 flex flex-col justify-between">
                <span className="text-gray-500 font-mono text-[9px] tracking-widest mb-4 uppercase">// MANIFIESTOS</span>
                <span className="text-4xl font-black text-white tracking-tighter">{allManifests?.length || 0}</span>
              </div>
              {/* Card 2 */}
              <div className="bg-[#050505] border border-gray-900 p-6 flex flex-col justify-between">
                <span className="text-gray-500 font-mono text-[9px] tracking-widest mb-4 uppercase">// UNIDADES_TOT</span>
                <span className="text-4xl font-black text-[#D70000] tracking-tighter">{totalUnidades}</span>
              </div>
              {/* Card 3 */}
              <div className="bg-[#050505] border border-gray-900 p-6 flex flex-col justify-between">
                <span className="text-gray-500 font-mono text-[9px] tracking-widest mb-4 uppercase">// LÍNEA_LÍDER</span>
                <span className="text-xl md:text-2xl font-black text-white tracking-tighter break-words">{lineaLider}</span>
              </div>
              {/* Card 4 */}
              <div className="bg-[#050505] border border-gray-900 p-6 flex flex-col justify-between">
                <span className="text-gray-500 font-mono text-[9px] tracking-widest mb-4 uppercase">// TOP_PRENDA</span>
                <span className="text-xl md:text-2xl font-black text-white tracking-tighter break-words">{prendaMasPedida}</span>
              </div>
          </div>

        </div>

        {/* FILTROS DE ESTADO */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-900 pb-6 gap-4">
          
          {/* BUSCADOR */}
          <form className="flex w-full md:w-auto order-2 md:order-1">
            {currentFilter && <input type="hidden" name="status" value={currentFilter} />}
            <input 
              type="text" 
              name="q" 
              placeholder="BUSCAR (CLUB, REF, EMAIL...)" 
              defaultValue={params.q}
              className="bg-black border border-gray-800 p-3 text-xs text-white w-full md:w-80 focus:border-[#D70000] outline-none font-mono placeholder:text-gray-700 uppercase tracking-widest"
            />
            <button type="submit" className="bg-zinc-900 border-y border-r border-gray-800 text-gray-400 px-4 font-black text-xs hover:text-[#D70000] transition-colors">
              BUSCAR
            </button>
          </form>

          {/* FILTROS */}
          <div className="flex flex-wrap gap-2 order-1 md:order-2">
          {filters.map((f) => (
            <Link
              key={f.value}
              href={f.value === "TODOS" ? "/admin" : `/admin?status=${f.value}`}
              className={`px-4 py-2 border font-mono text-[9px] tracking-widest transition-all
                ${(currentFilter === f.value || (!currentFilter && f.value === "TODOS"))
                  ? `bg-white text-black border-white`
                  : `${f.color} hover:bg-white/5`
                }
              `}
            >
              {f.label}
            </Link>
          ))}
          </div>
        </div>

        {/* LISTADO DE MANIFIESTOS */}
        <div className="grid grid-cols-1 gap-6 mb-20">
          {!displayManifests || displayManifests.length === 0 ? (
            <div className="border border-dashed border-gray-800 p-20 text-center">
              <span className="text-gray-600 font-mono text-xs tracking-[0.5em]">
                // NO SE DETECTAN CARGAS EN ESTADO: {currentFilter || 'TODOS'} //
              </span>
            </div>
          ) : (
            displayManifests.map((pedido) => {
              const estadoVisual = pedido.estado || 'RECIBIDO';
              return (
              <div key={pedido.id} className="border border-gray-800 bg-[#050505] relative overflow-hidden">
                <div className={`absolute left-0 top-0 w-1 h-full
                  ${estadoVisual === 'RECIBIDO' ? 'bg-blue-500' : ''}
                  ${estadoVisual === 'EN_DISEÑO' ? 'bg-purple-500' : ''}
                  ${estadoVisual === 'PRODUCCION' ? 'bg-yellow-500' : ''}
                  ${estadoVisual === 'DESPACHADO' ? 'bg-green-500' : ''}
                `}></div>

                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b border-gray-900 pb-4">
                    <div>
                      <h2 className="text-2xl font-black italic tracking-tighter uppercase">{pedido.nombre_club}</h2>
                      <div className="text-[10px] text-gray-500 font-mono mt-1 flex flex-col gap-1">
                        <span className="text-gray-400">REF_{pedido.id} <span className="text-gray-600 mx-2">//</span> {new Date(pedido.created_at).toLocaleDateString()}</span>
                        <span>RESP: <span className="text-white">{pedido.nombre_responsable}</span></span>
                        <span>CONTACTO: {pedido.telefono} <span className="text-gray-600 mx-1">|</span> <span className="text-[#D70000]">{pedido.email}</span></span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
                      <ExportCsvButton pedido={pedido} />
                      <StatusSelector pedidoId={pedido.id} estadoActual={estadoVisual} />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[10px] font-mono whitespace-nowrap">
                      <thead>
                        <tr className="text-gray-600 border-b border-gray-900 uppercase">
                          <th className="pb-2 w-12 text-center">N°</th>
                          <th className="pb-2 uppercase">IDENTIDAD</th>
                          {pedido.prendas.map((p: string) => (
                            <th key={p} className="pb-2 text-center text-[#D70000] border-l border-gray-900/50 uppercase">{p}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900/40">
                        {pedido.jugadores.map((j: any, idx: number) => (
                          <tr key={idx} className="hover:bg-white/[0.01]">
                            <td className="py-2 text-center text-gray-600">{j.number || "--"}</td>
                            <td className="py-2 font-bold text-gray-300 uppercase">{j.name || "S/N"}</td>
                            {pedido.prendas.map((p: string) => (
                              <td key={p} className="py-2 text-center text-gray-500 italic border-l border-gray-900/30 uppercase">
                                {j.sizes[p] || "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <InternalNotes pedidoId={pedido.id} currentNotes={pedido.notas_internas} />
                </div>
              </div>
            )})
          )}
        </div>

        {/* SECCIÓN: SOLICITUDES DE CONTACTO & ALIANZAS */}
        <div className="mb-20 border-t border-gray-900 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div className="border-l-4 border-white pl-6">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
                SOLICITUDES DE <span className="text-[#D70000]">ASOCIACIÓN</span>
              </h2>
              <p className="text-gray-500 font-bold text-[10px] tracking-[0.3em] mt-2 italic uppercase">
                // INBOX DE CONTACTO & PARTNERSHIPS
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContacts?.map((contact) => (
              <div key={contact.id} className="bg-[#050505] border border-gray-900 p-8 flex flex-col gap-6 relative group hover:border-gray-700 transition-all">
                <div className="flex justify-between items-center border-b border-gray-900 pb-4">
                  <span className="text-[9px] font-mono text-gray-500 tracking-widest">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-[9px] font-mono text-[#D70000] tracking-widest">
                    REQ_{contact.id}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-white font-black text-lg uppercase mb-2 tracking-tight">{contact.nombre}</h3>
                  <div className="text-[10px] text-gray-400 font-mono flex flex-col gap-1">
                    <span className="text-[#D70000] font-black tracking-widest uppercase mb-1">TIPO: {contact.tipo}</span>
                    <span className="text-white border-b border-gray-900 pb-1 w-fit">WA: {contact.contacto}</span>
                  </div>
                </div>

                <div className="bg-zinc-900/20 p-4 border-l-2 border-gray-800">
                   <p className="text-gray-300 text-xs leading-relaxed font-medium normal-case italic">
                     "{contact.mensaje}"
                   </p>
                </div>
                
                <div className="mt-auto pt-2">
                  <a href={`https://wa.me/${contact.contacto}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[9px] font-black tracking-[0.2em] text-gray-500 hover:text-[#D70000] uppercase transition-colors group/link">
                    <span>RESPONDER POR WHATSAPP</span>
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            ))}
            
            {(!allContacts || allContacts.length === 0) && (
              <div className="col-span-full text-center py-16 border border-dashed border-gray-800 text-gray-600 font-mono text-xs tracking-widest">
                [ BANDEJA DE ENTRADA VACÍA: SIN NUEVAS SOLICITUDES ]
              </div>
            )}
          </div>
        </div>

        {/* MÓDULO DE STOCK STREETWEAR */}
        <StreetwearStock />

      </div>
    </div>
  );
}