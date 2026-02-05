import { getBlogPosts, deleteBlogPost } from "@/app/lib/blog-actions";
import Link from "next/link";
import { FileText, Eye, CheckCircle, PlusCircle, Edit, Trash2 } from "lucide-react";

export default async function AdminDashboard() {
  const posts = await getBlogPosts();
  const publishedCount = posts.filter(p => p.published).length;
  // Simulasi views (tetap dipertahankan sesuai kode asli)
  const totalViews = posts.length * 124; 

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="flex flex-col w-full transition-all duration-300">
        
        {/* Main Content Container */}
        <div className="p-6 lg:p-10 space-y-8 w-full max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_20px_-4px_rgba(6,11,40,0.08)]">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-500 font-medium">Selamat datang kembali! Berikut ringkasan performa blog Anda.</p>
            </div>
            <Link 
              href="/admin/blog/create"
              className="group inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5"
            >
              <PlusCircle className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Tulis Artikel Baru
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Total Artikel */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start mb-6 relative">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">Total</span>
              </div>
              <div className="relative">
                <h3 className="text-4xl font-bold text-slate-900 mb-1">{posts.length}</h3>
                <p className="text-sm font-medium text-slate-400">Artikel Dibuat</p>
              </div>
            </div>

            {/* Card 2: Status */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-200 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start mb-6 relative">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">Status</span>
              </div>
              <div className="relative">
                <h3 className="text-4xl font-bold text-slate-900 mb-1">
                  {publishedCount} <span className="text-xl text-slate-300 font-normal">/ {posts.length}</span>
                </h3>
                <p className="text-sm font-medium text-slate-400">Artikel Tayang</p>
              </div>
            </div>

            {/* Card 3: Views */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-violet-200 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start mb-6 relative">
                <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">Estimasi</span>
              </div>
              <div className="relative">
                <h3 className="text-4xl font-bold text-slate-900 mb-1">{totalViews.toLocaleString()}</h3>
                <p className="text-sm font-medium text-slate-400">Total Pembaca</p>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-200/40 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 className="font-bold text-lg text-slate-900">Daftar Artikel Terbaru</h3>
            </div>
            
            {posts.length === 0 ? (
              <div className="py-24 px-6 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300 border border-slate-100">
                  <FileText className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Belum ada artikel</h3>
                <p className="text-slate-500 mb-8 text-sm max-w-sm mx-auto leading-relaxed">
                  Artikel yang kamu buat akan muncul di sini. Mulai tulis artikel pertamamu sekarang untuk menjangkau pembaca.
                </p>
                <Link href="/admin/blog/create" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold shadow-md shadow-blue-200">
                  Buat Artikel Pertama
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/80 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider w-[40%]">Artikel</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/60 transition-colors duration-200 group">
                        <td className="px-8 py-5 align-top">
                          <p className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors text-base mb-1.5">{post.title}</p>
                          <span className="inline-block text-xs text-slate-500 font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md truncate max-w-[280px]">
                            {post.slug}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-500 whitespace-nowrap align-middle font-medium">
                          {new Date(post.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-5 align-middle">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                            post.published 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${post.published ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right align-middle">
                          <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                            <Link 
                                href={`/blog/${post.slug}`} 
                                target="_blank" 
                                className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                                title="Preview"
                            >
                                <Eye className="w-4 h-4" />
                            </Link>
                            <Link 
                                href={`/admin/blog/edit/${post.id}`} 
                                className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all border border-transparent hover:border-amber-100"
                                title="Edit"
                            >
                                <Edit className="w-4 h-4" />
                            </Link>
                            <form action={async () => {
                                'use server';
                                await deleteBlogPost(post.id);
                            }}>
                                <button 
                                    type="submit"
                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}