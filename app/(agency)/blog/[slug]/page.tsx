import { getBlogPostBySlug } from "@/app/lib/blog-actions";
import { notFound } from "next/navigation";
import Link from "next/link";
// Pastikan path import ini sesuai dengan struktur project Anda
import Navbar from "@/app/components/agency/Navbar"; 
import { Footer } from "@/app/components/agency/SectionComponents";
import { Calendar, User, ArrowLeft, Share2, Tag, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: `${post.title} | Swakarsa Digital`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fungsi cerdas untuk menangani konten Manual vs HTML Code
  const renderContent = () => {
    let content = post.content || "";

    // CEK 1: Apakah ini konten HTML murni (dari Import JSON/Code)?
    // Indikator: adanya tag block seperti <p>, <div>, <h1>, <pre>
    const isHtml = /<[a-z][\s\S]*>/i.test(content);

    if (!isHtml) {
        // JIKA KONTEN MANUAL (Teks biasa dari textarea):
        // 1. Ubah baris baru menjadi <br/> agar paragraf tidak menyatu
        content = content.replace(/\n/g, "<br/>");
        
        // 2. Dukungan Bold & Italic sederhana (**teks**, __teks__)
        content = content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/__(.*?)__/g, '<em>$1</em>');
    } 
    // JIKA KONTEN HTML (dari Import): Biarkan apa adanya, browser akan merender tag-nya.

    return { __html: content };
  };

  // Format tanggal
  const formattedDate = new Date(post.createdAt).toLocaleDateString("id-ID", {
    weekday: 'long',
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30">
      <Navbar />

      <div className="relative pt-32 pb-20 overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-60">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px]"></div>
         </div>

         <article className="container mx-auto px-4 max-w-4xl relative z-10">
            {/* Breadcrumb & Back */}
            <div className="mb-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Blog
              </Link>
            </div>

            {/* Header Section */}
            <header className="text-center mb-12 border-b border-slate-800/60 pb-12">
               <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-sm text-slate-400">
                  {post.category && (
                    <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                       <Tag className="w-3 h-3" /> {post.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                     <Calendar className="w-4 h-4 text-slate-500" /> {formattedDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                     <User className="w-4 h-4 text-slate-500" /> {post.author || "Tim Swakarsa"}
                  </span>
               </div>

               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-sm">
                 {post.title}
               </h1>
            </header>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-cyan-900/10 border border-slate-800 group">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-30"></div>
              </div>
            )}

            {/* Content Container */}
            <div className="relative bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-6 md:p-10 shadow-2xl">
                
                {/* Content Body dengan Tailwind Typography (Prose) */}
                <div className="prose prose-lg prose-invert mx-auto max-w-none
                  
                  /* RESET GAYA BAWAAN */
                  [&_*]:!bg-transparent 
                  [&_*]:!font-sans
                  
                  /* WARNA TEKS UTAMA */
                  [&_p]:!text-slate-300 [&_p>span]:!text-slate-300
                  [&_li]:!text-slate-300 [&_li>span]:!text-slate-300
                  [&_strong]:!text-white [&_strong>span]:!text-white
                  [&_b]:!text-white [&_b>span]:!text-white

                  /* HEADING STYLES */
                  [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-cyan-100
                  prose-headings:!font-bold 
                  prose-h2:!text-2xl prose-h2:md:!text-3xl prose-h2:!mt-12 prose-h2:!mb-6
                  prose-h3:!text-xl prose-h3:md:!text-2xl prose-h3:!mt-10 prose-h3:!mb-4
                  
                  /* PARAGRAPH & LIST SPACING */
                  [&_p]:!text-lg [&_p]:md:!text-xl [&_p]:!leading-8 [&_p]:!mb-8       
                  [&_li]:!text-lg [&_li]:md:!text-xl [&_li]:!mb-2
                  prose-ul:!list-disc prose-ul:!pl-6 
                  prose-ol:!list-decimal prose-ol:!pl-6 
                  
                  /* LINK */
                  prose-a:!text-cyan-400 prose-a:no-underline hover:prose-a:underline
                  
                  /* BLOCKQUOTE */
                  prose-blockquote:!border-l-4 prose-blockquote:!border-cyan-500 
                  prose-blockquote:!bg-slate-800/50 prose-blockquote:!px-8 prose-blockquote:!py-6 
                  prose-blockquote:!rounded-r-lg prose-blockquote:!text-slate-200 
                  prose-blockquote:!not-italic prose-blockquote:!text-xl
                  
                  /* CODE BLOCKS (UNTUK ARTIKEL TEKNIS) - Penambahan Baru */
                  prose-pre:!bg-[#0d1117] prose-pre:!border prose-pre:!border-slate-700 
                  prose-pre:!text-slate-200 prose-pre:!shadow-lg prose-pre:!rounded-xl
                  prose-code:!text-cyan-300 prose-code:!font-mono prose-code:!text-sm
                  /* Inline code styling */
                  [&_:not(pre)>code]:!bg-slate-800 [&_:not(pre)>code]:!px-1.5 [&_:not(pre)>code]:!py-0.5 
                  [&_:not(pre)>code]:!rounded-md [&_:not(pre)>code]:!text-cyan-300
                  prose-code:before:!content-none prose-code:after:!content-none
                  
                  /* GAMBAR & HR */
                  prose-img:!rounded-xl prose-img:!border prose-img:!border-slate-700 prose-img:!shadow-lg prose-img:!my-10
                  prose-hr:!border-slate-800
                ">
                    <div dangerouslySetInnerHTML={renderContent()} />
                </div>

            </div>

            {/* Tags & Share */}
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
               <div className="text-slate-500 text-sm">
                  Bagikan artikel ini:
               </div>
               <div className="flex gap-4">
                  <button className="p-2 rounded-full bg-slate-900 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-colors">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>
            </div>

            {/* Call To Action */}
            {(post.ctaText && post.ctaLink) && (
              <div className="max-w-4xl mx-auto mt-12">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8 md:p-12 text-center shadow-xl">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                    
                    <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-white mb-4">Tertarik dengan topik ini?</h3>
                    <p className="relative z-10 text-slate-400 mb-8 max-w-xl mx-auto text-lg">
                      Pelajari lebih lanjut atau hubungi tim ahli kami untuk solusi digital bisnis Anda.
                    </p>
                    <a 
                      href={post.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-900/20 transition-all transform hover:-translate-y-1"
                    >
                      {post.ctaText}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
              </div>
            )}

         </article>
      </div>

      <Footer />
    </div>
  );
}