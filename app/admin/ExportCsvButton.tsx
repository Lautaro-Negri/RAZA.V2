// app/admin/ExportCsvButton.tsx
"use client";

export default function ExportCsvButton({ pedido }: { pedido: any }) {
  const handleExport = () => {
    // 1. Cambiamos el separador a punto y coma para el Excel en español
    const separator = ";"; 
    
    // 2. Armamos las columnas principales + las prendas dinámicas
    const headers = ["ID", "NOMBRE_ESPALDA", "DORSAL", ...pedido.prendas];
    
    // 3. Iniciamos el archivo con la fila de encabezados
    const csvRows = [headers.join(separator)];

    // 4. Recorremos los jugadores para armar las filas de datos
    pedido.jugadores.forEach((j: any, index: number) => {
      const row = [
        index + 1,
        `"${j.name || 'S/N'}"`, // Mantenemos las comillas por seguridad
        `"${j.number || '-'}"`,
        ...pedido.prendas.map((p: string) => `"${j.sizes[p] || '-'}"`)
      ];
      csvRows.push(row.join(separator));
    });

    // 5. Unimos todo y agregamos el BOM (\uFEFF) para que Excel lea bien los acentos
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    
    // 6. Descarga del archivo
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Manifiesto_${pedido.nombre_club.replace(/\s+/g, '_')}_${pedido.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="border border-gray-800 bg-black text-gray-500 hover:text-white hover:border-white hover:bg-white/5 px-4 py-2 font-mono text-[9px] tracking-widest transition-all flex items-center gap-2 uppercase"
      title="Descargar lista de talles"
    >
      <span>[↓]</span> EXPORTAR EXCEL
    </button>
  );
}