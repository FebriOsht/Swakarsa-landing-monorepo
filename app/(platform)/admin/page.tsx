import { 
  getContactMessages, 
  getJobApplications, 
  getAllProjects, 
  approveProject 
} from "@/app/lib/actions";
import { 
  Mail, 
  Briefcase, 
  FlaskConical, 
  Play, 
  Calendar, 
  CheckCircle, 
  XCircle,
  MapPin,
  User 
} from "lucide-react";
import { revalidatePath } from "next/cache";

// Format Tanggal Helper
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

// Helper format uang
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Server Action Wrapper untuk Button Activate
async function handleApprove(formData: FormData) {
  "use server";
  const projectId = formData.get("projectId") as string;
  await approveProject(projectId);
  // Revalidate dilakukan di dalam fungsi approveProject, tapi tidak ada salahnya memastikan
  revalidatePath('/admin');
}

export default async function AdminDashboard() {
  // Ambil semua data secara paralel untuk performa
  const [messages, applicants, projects] = await Promise.all([
    getContactMessages(),
    getJobApplications(),
    getAllProjects()
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen bg-slate-50/50">
      {/* --- HEADER STATS --- */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Command Center</h1>
        <p className="text-slate-500">Overview aktivitas terbaru dari website publik & The Lab.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Card 1: Pesan */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Inbox Pesan</p>
              <h3 className="text-2xl font-bold text-slate-800">{messages.length}</h3>
            </div>
          </div>
          
          {/* Card 2: Pelamar */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Pelamar Arise</p>
              <h3 className="text-2xl font-bold text-slate-800">{applicants.length}</h3>
            </div>
          </div>

          {/* Card 3: Project */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <FlaskConical size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Projects</p>
              <h3 className="text-2xl font-bold text-slate-800">{projects.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* --- SECTION 1: PROJECT REQUESTS (THE LAB) --- */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px] xl:col-span-2">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <FlaskConical size={18} className="text-purple-500"/> Project Requests
            </h2>
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-bold">
              {projects.length} Total
            </span>
          </div>
          <div className="overflow-y-auto flex-1 p-0">
             {projects.length === 0 ? <EmptyState text="Belum ada project dari Client." /> : (
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100 sticky top-0">
                   <tr>
                     <th className="px-6 py-3">Project Name</th>
                     <th className="px-6 py-3">Client</th>
                     <th className="px-6 py-3">Squad</th>
                     <th className="px-6 py-3">Value</th>
                     <th className="px-6 py-3">Status</th>
                     <th className="px-6 py-3 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {projects.map((p) => (
                     <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                       <td className="px-6 py-4 text-slate-600">
                         <div className="flex items-center gap-2">
                           <User size={14} className="text-slate-400"/>
                           {p.client.email}
                         </div>
                       </td>
                       <td className="px-6 py-4 text-slate-600">{p.members.length} Heroes</td>
                       <td className="px-6 py-4 font-mono text-emerald-600 font-bold">{formatCurrency(p.totalRate)}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                           p.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                           p.status === 'DRAFT' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                           'bg-amber-50 text-amber-600 border-amber-200'
                         }`}>
                           {p.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         {p.status === 'NEGOTIATION' || p.status === 'DRAFT' ? (
                           <form action={handleApprove}>
                             <input type="hidden" name="projectId" value={p.id} />
                             <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 ml-auto transition-all active:scale-95 shadow-sm">
                               <Play size={12} /> Activate
                             </button>
                           </form>
                         ) : (
                           <span className="text-xs text-slate-400 font-medium italic">No action</span>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             )}
          </div>
        </section>

        {/* --- SECTION 2: INBOX PESAN --- */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <Mail size={18} className="text-indigo-500"/> Inbox Pesan
            </h2>
            <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-bold">
              {messages.length}
            </span>
          </div>
          <div className="overflow-y-auto flex-1 p-0">
            {messages.length === 0 ? <EmptyState text="Belum ada pesan masuk." /> : (
              <div className="divide-y divide-slate-100">
                {messages.map((msg: any) => (
                  <div key={msg.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-800">{msg.name}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{formatDate(msg.createdAt)}</span>
                    </div>
                    <a href={`mailto:${msg.email}`} className="text-xs text-indigo-600 hover:underline block mb-3 font-medium">
                      {msg.email}
                    </a>
                    <div className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700 italic">
                      "{msg.message}"
                    </div>
                    <div className="mt-3 flex gap-2">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        msg.status === 'UNREAD' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
                       }`}>
                         {msg.status}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- SECTION 3: PELAMAR KERJA --- */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <Briefcase size={18} className="text-emerald-500"/> Pelamar Arise
            </h2>
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">
              {applicants.length}
            </span>
          </div>
          <div className="overflow-y-auto flex-1 p-0">
             {applicants.length === 0 ? <EmptyState text="Belum ada pelamar." /> : (
              <div className="divide-y divide-slate-100">
                {applicants.map((app: any) => (
                  <div key={app.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-800">{app.fullName}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{formatDate(app.createdAt)}</span>
                    </div>
                    
                    <div className="flex flex-col gap-1 text-xs text-slate-500 mb-3">
                       <div className="flex items-center gap-2">
                         <Mail size={12}/> {app.email}
                       </div>
                       <div className="flex items-center gap-2">
                         <MapPin size={12}/> {app.location}
                       </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                       {app.hasWorkspace ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200 font-medium">
                            <CheckCircle size={10} /> Workspace Ready
                          </span>
                       ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200 font-medium">
                            <XCircle size={10} /> No Workspace
                          </span>
                       )}
                    </div>

                    <a href={`mailto:${app.email}`} className="block w-full text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-xs transition-colors border border-slate-200">
                      Contact Candidate
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center opacity-60">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
        <Calendar size={20} className="text-slate-300"/>
      </div>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}