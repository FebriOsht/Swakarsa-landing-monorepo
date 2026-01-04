import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import LoginForm from "../components/platform/LoginForm";

export const metadata: Metadata = {
  title: "Platform Login | Swakarsa Digital",
  description: "Access The Lab or The Guild.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Kiri: Visual / Branding */}
      <div className="hidden md:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden border-r border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black opacity-50" />
        <div className="relative z-10 text-center px-12">
           <div className="mb-6 inline-flex p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Shield size={48} className="text-indigo-400" />
           </div>
           <h2 className="text-4xl font-extrabold mb-4">Secure Access</h2>
           <p className="text-slate-400 text-lg">
             Monitor your project progress in <b>The Lab</b> or complete quests in <b>The Guild</b>.
           </p>
        </div>
      </div>

      {/* Kanan: Form Login */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium">
           <ArrowLeft size={16} /> Back to Agency
        </Link>

        <div className="w-full max-w-md space-y-8">
           <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-slate-400 mt-2">Sign in to your dashboard.</p>
           </div>

           {/* PANGGIL KOMPONEN FORM DISINI */}
           <LoginForm />

           <div className="pt-6 text-center border-t border-slate-800">
              <p className="text-slate-500 text-sm">
                 Don't have an account? <br />
                 <Link href="/jobs" className="text-indigo-400 hover:underline">Apply as Partner</Link> or contact admin.
              </p>
           </div>
        </div>
      </div>
    </main>
  );
}