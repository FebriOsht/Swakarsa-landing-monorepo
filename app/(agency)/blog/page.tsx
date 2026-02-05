import { getBlogPosts } from "@/app/lib/blog-actions";
import Link from "next/link";
import { BlogPost } from "@prisma/client";
import Navbar from "@/app/components/agency/Navbar"; // Changed from named to default import
import { Footer } from "@/app/components/agency/SectionComponents";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata = {
  title: "Wawasan & Artikel | Swakarsa Digital",
  description: "Artikel terbaru seputar teknologi, strategi bisnis, dan inovasi digital untuk pertumbuhan bisnis Anda.",
};

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts();

  // Helper untuk memformat tanggal
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30">
      
      {/* Gunakan Navbar yang sama dengan Landing Page */}
      <Navbar /> 

      <div className="relative pt-32 pb-20 overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
         </div>

         <div className="container mx-auto px-4 max-w-7xl relative z-10">
            {/* Header Section */}
            <div className="text-center mb-20 space-y-4 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm bg-cyan-500/10 border-cyan-500/30 text-cyan-300 mb-4">
                  Wawasan & Artikel
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital World</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Discover the latest strategies, technical guides and industry trends to help your business grow in the digital age.
              </p>
            </div>

            {/* Blog Grid */}
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <Link 
                    href={`/blog/${post.slug}`} 
                    key={post.id}
                    className="group flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative"
                  >
                    {/* Image Wrapper */}
                    <div className="relative h-60 w-full overflow-hidden">
                      {post.imageUrl ? (
                        <>
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 border-b border-slate-700">
                          <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      {post.category && (
                         <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full">
                               {post.category}
                            </span>
                         </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                         <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                            {formatDate(post.createdAt)}
                         </span>
                         {post.author && (
                             <span className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-cyan-500" />
                                {post.author}
                             </span>
                         )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {post.excerpt || "Klik untuk membaca selengkapnya..."}
                      </p>
                      
                      <div className="pt-4 border-t border-slate-800 flex items-center text-cyan-400 text-sm font-semibold group-hover:gap-2 transition-all">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Belum ada artikel</h3>
                <p className="text-slate-400">Nantikan update terbaru dari tim kami segera.</p>
              </div>
            )}
         </div>
      </div>

      <Footer />
    </div>
  );
}