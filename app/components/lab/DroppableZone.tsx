"use client";

import { useDroppable } from "@dnd-kit/core";
import { UserPlus, Wallet } from "lucide-react";
import { DraggableCard } from "./DraggableCard";

export function DroppableZone({ squad }: { squad: any[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "squad-zone",
  });

  // Hitung Total Burn Rate
  const totalBurnRate = squad.reduce((acc, hero) => acc + hero.rate, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header Area */}
      <div className="mb-4 flex items-center justify-between p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
        <div>
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
             <UserPlus className="text-indigo-400" /> Your Dream Team
           </h2>
           <p className="text-xs text-indigo-300">Drag consultants here to build your squad</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">Est. Monthly Burn</p>
          <div className="flex items-center gap-2 justify-end text-emerald-400">
            <Wallet size={18} />
            <span className="text-2xl font-mono font-bold">${totalBurnRate.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-2xl border-2 border-dashed transition-all p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start overflow-y-auto min-h-[400px]
          ${isOver 
            ? "border-emerald-500/50 bg-emerald-500/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]" 
            : "border-slate-700 bg-slate-900/50"
          }
        `}
      >
        {squad.length === 0 ? (
          <div className="col-span-full h-full flex flex-col items-center justify-center text-slate-600 space-y-3 opacity-50">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
               <UserPlus size={32} />
            </div>
            <p className="font-medium">Squad is empty. Drop heroes here!</p>
          </div>
        ) : (
          squad.map((hero) => (
             // Kita render ulang card di sini (tanpa fitur drag agar terkunci, atau tetap draggable untuk remove)
             // Untuk MVP, kita pakai tampilan card statis dulu di squad
             <div key={hero.id} className="relative group">
                <DraggableCard hero={hero} />
             </div>
          ))
        )}
      </div>
    </div>
  );
}