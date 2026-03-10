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

  const adjustStock = async (id: string, currentStock: number, amount: number) => {
    const nextStock = Math.max(0, currentStock + amount);
    const result = await updateStreetwearStock(id, nextStock);
    if (result.success) fetchProducts(); // Recargamos para ver el cambio
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
          <div key={p.id} className="bg-[#050505] border border-gray-900 p-6 relative group overflow-hidden transition-all hover:border-gray-700">
            <span className="text-gray-600 font-mono text-[8px] tracking-widest block mb-2">REF: {p.serial}</span>
            <h3 className="text-white font-black italic tracking-tighter text-lg leading-none mb-6 uppercase">{p.name}</h3>
            
            <div className="flex justify-between items-center border-t border-gray-900 pt-6">
              <div>
                <span className="text-gray-500 font-mono text-[9px] block mb-1 tracking-widest uppercase">DISPONIBLE</span>
                <span className={`text-3xl font-black tracking-tighter ${p.sold_out ? 'text-gray-800' : 'text-white'}`}>
                  {p.stock.toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => adjustStock(p.id, p.stock, -1)}
                  className="w-10 h-10 border border-gray-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all font-bold"
                > - </button>
                <button 
                  onClick={() => adjustStock(p.id, p.stock, 1)}
                  className="w-10 h-10 border border-gray-800 flex items-center justify-center text-white hover:bg-[#D70000] hover:border-[#D70000] hover:text-black transition-all font-bold"
                > + </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}