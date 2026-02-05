'use client'

import { createBlogPost, BlogState } from "@/app/lib/blog-actions";
import { useState, useEffect, useRef } from "react";
// @ts-ignore
import { useActionState } from "react";
import { Image as ImageIcon, Link as LinkIcon, Save, Type, FileText, LayoutTemplate, ArrowLeft, Upload, Globe, Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Quote, Code as CodeIcon, User, Tag } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPage() {
  const initialState: BlogState = { message: null, errors: {} };
  // @ts-ignore
  const [state, dispatch, isPending] = useActionState(createBlogPost, initialState);
  
  // State Management
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isExcerptTouched, setIsExcerptTouched] = useState(false);
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [imagePreview, setImagePreview] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  // Helper: Strip HTML tags for auto-excerpt
  const stripHtml = (html: string) => {
    if (typeof window === "undefined") return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Auto-generate excerpt when content changes
  useEffect(() => {
    if (!isExcerptTouched && content) {
      const plainText = stripHtml(content);
      // Ambil 160 karakter pertama sebagai ringkasan otomatis
      const autoExcerpt = plainText.substring(0, 160) + (plainText.length > 160 ? "..." : "");
      setExcerpt(autoExcerpt);
    }
  }, [content, isExcerptTouched]);

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const html = e.currentTarget.innerHTML;
    // Jika editor kosong (hanya <br>), set content jadi kosong biar placeholder muncul
    if (html === '<br>' || html.trim() === '') {
        setContent("");
    } else {
        setContent(html);
    }
  };

  // Handler khusus untuk Paste
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    // Biarkan browser menangani paste HTML secara default agar format Google Docs masuk.
    // Kita hanya perlu memastikan state terupdate setelah paste selesai.
    setTimeout(() => {
        if (editorRef.current) {
            // Optional: Bersihkan style inline yang berlebihan dari Google Docs jika perlu
            // Tapi untuk sekarang kita biarkan raw HTML agar format terjaga
            setContent(editorRef.current.innerHTML);
        }
    }, 0);
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExcerpt(e.target.value);
    setIsExcerptTouched(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simple Formatting Toolbar Commands
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
        editorRef.current.focus();
    }
  };

  const renderPreview = (text: string) => {
    // Preview now just renders the HTML directly since contentEditable produces HTML
    return text;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 -ml-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Buat Artikel Baru</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Bagikan ide dan wawasan terbaru Anda.</p>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 hidden sm:inline-block">
              Status: <strong>Draft</strong>
            </span>
         </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
        <form action={dispatch} className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- KOLOM KIRI (EDITOR - 8 Kolom) --- */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Card 1: Judul & Intro */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-bold text-slate-800">
                      Judul Artikel <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Masukkan judul artikel yang menarik..."
                      className="w-full px-4 py-3 text-lg font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 bg-white placeholder:text-slate-400 placeholder:font-normal"
                      required
                    />
                    {state.errors?.title && (
                      <p className="text-red-500 text-xs font-medium mt-1">{state.errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <label htmlFor="excerpt" className="block text-sm font-bold text-slate-800">
                        Ringkasan (Excerpt)
                      </label>
                      {!isExcerptTouched && content.length > 0 && (
                        <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 animate-pulse">
                          Auto-generating...
                        </span>
                      )}
                    </div>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      rows={3}
                      value={excerpt}
                      onChange={handleExcerptChange}
                      className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-white placeholder:text-slate-400 resize-none leading-relaxed"
                      placeholder="Ringkasan akan terisi otomatis saat Anda mengetik konten, atau tulis manual di sini..."
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: RICH TEXT EDITOR (Fix Copas Google Docs) */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[700px]">
                
                {/* Editor Toolbar */}
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center gap-2 sticky top-0 z-10">
                  {/* Basic Formatting */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm p-1">
                    <button type="button" onClick={() => execCommand('bold')} className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('italic')} className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('underline')} className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors underline decoration-2 underline-offset-2" title="Underline">U</button>
                  </div>

                  {/* Lists */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm p-1">
                    <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors" title="Bullet List"><List className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
                  </div>
                  
                  {/* Headings */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm p-1">
                     <button type="button" onClick={() => execCommand('formatBlock', 'h2')} className="px-3 py-1 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">H2</button>
                     <button type="button" onClick={() => execCommand('formatBlock', 'h3')} className="px-3 py-1 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">H3</button>
                     <button type="button" onClick={() => execCommand('formatBlock', 'p')} className="px-3 py-1 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">P</button>
                  </div>
                </div>

                {/* Content Editable Area */}
                <div className="flex-1 w-full relative bg-white">
                    {/* Placeholder Text */}
                    {!content && (
                        <div className="absolute top-8 left-8 text-slate-400 pointer-events-none text-lg select-none z-0 italic">
                            Mulai menulis atau paste artikel dari Google Docs di sini...
                        </div>
                    )}
                    
                    <div 
                        ref={editorRef}
                        contentEditable
                        onInput={handleEditorInput}
                        onPaste={handlePaste}
                        className="w-full h-full p-8 outline-none prose prose-lg prose-slate max-w-none min-h-[500px] cursor-text overflow-y-auto text-slate-900 relative z-10"
                        style={{ 
                            minHeight: '500px',
                            color: '#0f172a' /* text-slate-900 force color */
                        }}
                    />
                    
                    {/* Hidden input to pass data to server action */}
                    <input type="hidden" name="content" value={content} />
                </div>
              </div>

            </div>

            {/* --- KOLOM KANAN (SIDEBAR - 4 Kolom) --- */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Panel Publish (Sticky) */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 sticky top-24 z-20">
                <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Save className="w-4 h-4 text-slate-500" /> Aksi
                </h3>
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 mb-3"
                >
                    {isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Menyimpan...
                      </>
                    ) : (
                      'Publikasikan Sekarang'
                    )}
                </button>
                <div className="text-center">
                   <p className="text-xs text-slate-400">Artikel akan langsung tayang di website.</p>
                </div>
                {state.message && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs text-center font-medium border border-red-100">
                      {state.message}
                    </div>
                )}
              </div>

              {/* Detail Artikel (Penulis & Kategori) */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <User className="w-4 h-4 text-orange-500" /> Detail Artikel
                </h3>
                <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Penulis</label>
                      <input 
                          name="author" 
                          placeholder="Nama Penulis" 
                          defaultValue="Admin"
                          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Kategori</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input 
                            name="category" 
                            list="categories"
                            placeholder="Pilih atau ketik..." 
                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                        />
                        <datalist id="categories">
                          <option value="Teknologi" />
                          <option value="Bisnis" />
                          <option value="Tutorial" />
                          <option value="Berita" />
                          <option value="Tips & Trik" />
                        </datalist>
                      </div>
                  </div>
                </div>
              </div>

              {/* Media Image */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <ImageIcon className="w-4 h-4 text-purple-500" /> Media Utama
                </h3>
                
                {/* Switcher Tab */}
                <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                  <button 
                    type="button"
                    onClick={() => setImageMode("url")}
                    className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${imageMode === "url" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Link URL
                  </button>
                  <button 
                    type="button"
                    onClick={() => setImageMode("upload")}
                    className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${imageMode === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Upload File
                  </button>
                </div>

                <div className="space-y-4">
                  {imageMode === "url" ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          id="imageUrl"
                          name="imageUrl"
                          type="url"
                          value={imagePreview.startsWith("data:") ? "" : imagePreview}
                          onChange={(e) => setImagePreview(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer group bg-slate-50/50">
                        <input 
                          type="file" 
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        <div className="relative z-0 pointer-events-none">
                           <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-purple-500 transition-colors" />
                           <p className="text-xs text-slate-600 font-medium group-hover:text-purple-600">Klik untuk upload (JPG/PNG)</p>
                           <p className="text-[10px] text-slate-400 mt-1">Maks. 2MB</p>
                        </div>
                      </div>
                      {/* Hidden input to send actual value to server action */}
                      <input type="hidden" name="imageUrl" value={imagePreview} />
                    </div>
                  )}

                  {/* Image Preview */}
                  {imagePreview ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 mt-3 shadow-sm group">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // @ts-ignore
                          e.target.src = "https://placehold.co/600x400?text=Error+Loading+Image";
                        }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setImagePreview("")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <ArrowLeft className="w-3 h-3 rotate-45" /> {/* Close icon hack */}
                      </button>
                    </div>
                  ) : (
                    <div className="aspect-video bg-slate-50 rounded-lg border border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2 mt-3">
                      <ImageIcon className="w-8 h-8 opacity-20" />
                      <span className="text-xs font-medium opacity-50">Belum ada gambar</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <LinkIcon className="w-4 h-4 text-green-500" /> Call to Action
                </h3>
                <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 mb-4 leading-relaxed border border-blue-100">
                  Tombol ini akan muncul di akhir artikel untuk mengarahkan pembaca ke WhatsApp atau Portfolio.
                </div>
                <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Label Tombol</label>
                      <input 
                          name="ctaText" 
                          placeholder="Contoh: Hubungi Kami via WA" 
                          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Link Tujuan</label>
                      <input 
                          name="ctaLink" 
                          placeholder="https://wa.me/62..." 
                          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                      />
                  </div>
                </div>
              </div>

              {/* Live Preview Text (Raw HTML Debugger - Optional, can be removed) */}
              <div className="bg-slate-900 p-5 rounded-xl shadow-lg border border-slate-800 text-white">
                 <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2 pb-3 border-b border-slate-800">
                    <LayoutTemplate className="w-3 h-3" /> HTML Output (Debug)
                 </h3>
                 <div 
                    className="text-xs text-slate-300 leading-relaxed max-h-[150px] overflow-y-auto font-mono pr-2 custom-scrollbar break-all"
                 >
                    {content || <em className="opacity-30 italic">HTML content will appear here...</em>}
                 </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}