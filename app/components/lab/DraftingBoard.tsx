"use client";

import { useState, useId } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DraggableCard } from "@/app/components/lab/DraggableCard";
import { DroppableZone } from "@/app/components/lab/DroppableZone";
import { Search, Rocket, Loader2 } from "lucide-react"; 
import { createProject } from "@/app/lib/actions"; // Import Server Action
import { useRouter } from "next/navigation";

export default function DraftingBoard({ initialHeroes }: { initialHeroes: any[] }) {
  const [bench, setBench] = useState(initialHeroes);
  const [squad, setSquad] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false); // Loading state
  
  // Fix Hydration Error
  const dndContextId = useId(); 
  const router = useRouter();

  // Hitung Total Rate
  const totalRate = squad.reduce((acc, hero) => acc + hero.rate, 0);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && over.id === "squad-zone") {
      const heroId = active.id as string;
      const hero = bench.find((h) => h.id === heroId);
      if (hero) {
        setSquad((prev) => [...prev, hero]);
        setBench((prev) => prev.filter((h) => h.id !== heroId));
      }
    }
  }

  // Fungsi Save Project (Action Tombol)
  async function handleHireSquad() {
    if (squad.length === 0) return alert("Pilih minimal 1 hero!");
    
    setIsSaving(true);
    
    // Panggil Server Action
    const squadIds = squad.map(h => h.id);
    const result = await createProject(squadIds, totalRate);
    
    if (result.success) {
      // Redirect ke Dashboard Lab Utama (tempat list project berada)
      router.push("/lab");
    } else {
      alert("Gagal menyimpan project: " + result.message);
      setIsSaving(false);
    }
  }

  const filteredBench = bench.filter(hero => 
    hero.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hero.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DndContext id={dndContextId} onDragEnd={handleDragEnd}>
      <div className="h-[calc(100vh-64px)] md:h-screen flex flex-col md:flex-row bg-slate-950 text-slate-200 overflow-hidden">
        
        {/* LEFT PANEL: THE BENCH */}
        <aside className="w-full md:w-80 lg:w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-1/2 md:h-full transition-all">
          <div className="p-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
            <h3 className="font-bold text-white mb-2 flex justify-between">
              The Bench 
              <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-1 rounded-full">{bench.length}</span>
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find talent..." 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
             {filteredBench.length === 0 ? (
               <div className="text-center text-slate-600 mt-10"><p className="text-sm">No heroes found.</p></div>
             ) : (
               filteredBench.map((hero) => <DraggableCard key={hero.id} hero={hero} />)
             )}
          </div>
        </aside>

        {/* RIGHT PANEL: THE LAB */}
        <main className="flex-1 p-4 md:p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 h-1/2 md:h-full overflow-hidden flex flex-col relative">
           
           {/* HEADER AREA DENGAN TOMBOL ACTION */}
           <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Drafting Board</h1>
                <p className="text-slate-400 text-sm">Assemble your dream team.</p>
              </div>
              
              {/* TOMBOL HIRE / SAVE (Hanya muncul jika squad terisi) */}
              {squad.length > 0 && (
                <button 
                  onClick={handleHireSquad}
                  disabled={isSaving}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={20}/> : <Rocket size={20}/>}
                  {isSaving ? "Finalizing..." : `Hire Squad ($${totalRate}/mo)`}
                </button>
              )}
           </div>

           <DroppableZone squad={squad} />
        </main>

      </div>
    </DndContext>
  );
}