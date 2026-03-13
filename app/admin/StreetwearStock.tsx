// app/admin/StreetwearStock.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { updateStreetwearStock } from "../deportiva/actions";

export default function StreetwearStock() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from('streetwear_products').select('*').order('created_at', { ascending: true });
    if (data) setProducts(data);
    setLoading(false);
  }

  const toggleStatus = async (id: string, currentSoldOut: boolean) => {
    const result = await updateStreetwearStock(id, !currentSoldOut);
    if (result.success) fetchProducts();
  };

  if (loading) return <div className="p-10 text-gray-500 font-mono text-[9px] uppercase tracking-[0.5em]">// CARGANDO_INVENTARIO...</div>;

  return (
    <div className="mt-20 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-l-4 border-[#D70000] pl-4 uppercase">
        <div>
          <span className="text-[#D70000] font-black text-[10px] tracking-[0.4em] block mb-1">// LIVE_STOCK_SYSTEM</span>
          <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-white">CONTROL DE INVENTARIO <span className="text-[#D70000]">REAL-TIME</span></h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className={`bg-[#050505] border p-6 relative group overflow-hidden transition-all ${p.sold_out ? 'border-red-900/30' : 'border-gray-900 hover:border-gray-700'}`}>
            <span className="text-gray-600 font-mono text-[8px] tracking-widest block mb-2">REF: {p.serial}</span>
            <h3 className="text-white font-black italic tracking-tighter text-lg leading-none mb-6 uppercase">{p.name}</h3>
            
            <div className="flex justify-between items-center border-t border-gray-900 pt-6">
              <div>
                <span className="text-gray-500 font-mono text-[9px] block mb-1 tracking-widest uppercase">ESTADO</span>
                <span className={`text-lg font-black tracking-tighter ${p.sold_out ? 'text-[#D70000]' : 'text-green-500'}`}>
                  {p.sold_out ? 'AGOTADO' : 'EN STOCK'}
                </span>
              </div>

              <button 
                onClick={() => toggleStatus(p.id, p.sold_out)}
                className={`px-4 py-2 text-[9px] font-black tracking-widest border transition-all uppercase
                  ${p.sold_out 
                    ? 'border-green-900 text-green-600 hover:bg-green-900 hover:text-white' 
                    : 'border-red-900 text-red-600 hover:bg-red-900 hover:text-white'}
                `}
              >
                {p.sold_out ? "REPONER" : "AGOTAR"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}