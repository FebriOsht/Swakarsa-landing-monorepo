import { auth } from "@/auth";
import { updateProfile } from "@/app/lib/actions";
import { User, Shield, Key, Save } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login");

  // FIX: Casting 'as any' agar properti role bisa dibaca tanpa error TypeScript
  const userRole = (user as any).role || "GUEST";

  // Server Action Wrapper
  async function handleUpdate(formData: FormData) {
    "use server";
    await updateProfile(formData);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-500">Manage your profile preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_250px]">
        {/* Main Form */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <User className="text-indigo-500" /> Personal Information
          </h2>
          
          <form action={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                defaultValue={user.name || ""}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                disabled
                defaultValue={user.email || ""}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 mt-2">Email cannot be changed.</p>
            </div>

            <hr className="border-slate-100 my-6" />

            <div>
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Key size={18} className="text-slate-400"/> Change Password
               </h3>
               <div className="grid grid-cols-2 gap-4">
                 <input 
                    type="password" 
                    name="newPassword"
                    placeholder="New Password" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                 />
                 <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder="Confirm Password" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                 />
               </div>
               <p className="text-xs text-slate-500 mt-2">Leave blank if you don't want to change password.</p>
            </div>

            <div className="pt-4">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-slate-900 p-6 rounded-2xl text-white">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {user.name?.charAt(0) || "U"}
              </div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-indigo-300 text-sm mb-4">{user.email}</p>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono">
                {/* Gunakan variabel userRole yang sudah aman */}
                <Shield size={12} /> {userRole}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}