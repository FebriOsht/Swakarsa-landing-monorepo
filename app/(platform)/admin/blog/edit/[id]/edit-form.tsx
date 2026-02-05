'use client'

import { updateBlogPost, BlogState } from "@/app/lib/blog-actions";
import { useState, useEffect, useRef } from "react";
// @ts-ignore
import { useActionState } from "react";
import { Image as ImageIcon, Link as LinkIcon, Save, Type, FileText, LayoutTemplate, ArrowLeft, Upload, Globe, Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Quote, Code as CodeIcon, User, Tag } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@prisma/client";

export default function EditBlogForm({ post }: { post: BlogPost }) {
  const initialState: BlogState = { message: null, errors: {} };
  const updateBlogPostWithId = updateBlogPost.bind(null, post.id); // Bind ID ke server action
  // @ts-ignore
  const [state, dispatch, isPending] = useActionState(updateBlogPostWithId, initialState);
  
  // State Management - Init with post data
  const [content, setContent] = useState(post.content || "");
  const [excerpt, setExcerpt] = useState(post.excerpt || "");
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [imagePreview, setImagePreview] = useState(post.imageUrl || "");
  const editorRef = useRef<HTMLDivElement>(null);

  // Load initial content into editable div
  useEffect(() => {
    if (editorRef.current) {
        editorRef.current.innerHTML = post.content || "";
    }
  }, []);

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const html = e.currentTarget.innerHTML;
    if (html === '<br>' || html.trim() === '') {
        setContent("");
    } else {
        setContent(html);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    setTimeout(() => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    }, 0);
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

  return (
      <div className="flex flex-col transition-all duration-300">
        
        {/* HEADER */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
           <div>
              <Link href="/admin" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-1 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Batal & Kembali
              </Link>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Edit Artikel</h1>
           </div>
           
           <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 hidden sm:inline-block">
                Mode: <strong>Edit</strong>
              </span>
           </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="flex-1 p-6 lg:p-8">
          <form action={dispatch} className="w-full max-w-7xl mx-auto space-y-8">
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* --- KOLOM KIRI (UTAMA) --- */}
              <div className="xl:col-span-2 space-y-6">
                
                {/* Card 1: Judul & Intro */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" /> Informasi Dasar
                    </h2>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div className="space-y-1.5">
                      <label htmlFor="title" className="block text-sm font-bold text-slate-700">
                        Judul Artikel <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={post.title}
                        className="w-full px-4 py-3 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 bg-white placeholder:text-slate-400 placeholder:font-normal"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="excerpt" className="block text-sm font-bold text-slate-700">
                        Ringkasan (Excerpt)
                      </label>
                      <textarea
                        id="excerpt"
                        name="excerpt"
                        rows={3}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-white placeholder:text-slate-400 resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2: Editor */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[700px]">
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

                  <div className="flex-1 w-full relative bg-white">
                      <div 
                          ref={editorRef}
                          contentEditable
                          onInput={handleEditorInput}
                          onPaste={handlePaste}
                          className="w-full h-full p-8 outline-none prose prose-lg prose-slate max-w-none min-h-[500px] cursor-text overflow-y-auto text-slate-900 relative z-10"
                          style={{ minHeight: '500px' }}
                      />
                      <input type="hidden" name="content" value={content} />
                  </div>
                </div>

              </div>

              {/* --- KOLOM KANAN (SIDEBAR) --- */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Panel Publish */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 sticky top-24 z-20">
                  <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Save className="w-4 h-4 text-slate-500" /> Simpan Perubahan
                  </h3>
                  <button
                      type="submit"
                      disabled={isPending}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 mb-3"
                  >
                      {isPending ? 'Menyimpan...' : 'Update Artikel'}
                  </button>
                  {state.message && (
                      <div className="mt-3 p-3 bg-red-50 text-red-600 rounded-lg text-xs text-center font-medium border border-red-100">
                        {state.message}
                      </div>
                  )}
                </div>

                {/* Detail Artikel */}
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
                            defaultValue={post.author || "Admin"}
                            className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Kategori</label>
                        <input 
                            name="category" 
                            list="categories"
                            defaultValue={post.category || ""}
                            placeholder="Pilih atau ketik..." 
                            className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                        />
                        <datalist id="categories">
                            <option value="Teknologi" />
                            <option value="Bisnis" />
                            <option value="Tutorial" />
                            <option value="Berita" />
                        </datalist>
                    </div>
                    </div>
                </div>

                {/* Media Image */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2 pb-3 border-b border-slate-100">
                    <ImageIcon className="w-4 h-4 text-purple-500" /> Media Utama
                  </h3>
                  
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
                            value={imagePreview}
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
                             <p className="text-xs text-slate-600 font-medium group-hover:text-purple-600">Klik untuk upload</p>
                          </div>
                        </div>
                        <input type="hidden" name="imageUrl" value={imagePreview} />
                      </div>
                    )}

                    {imagePreview ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 mt-3 shadow-sm group">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => setImagePreview("")}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <ArrowLeft className="w-3 h-3 rotate-45" />
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
                  <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Label Tombol</label>
                        <input 
                            name="ctaText" 
                            defaultValue={post.ctaText || ""}
                            placeholder="Contoh: Hubungi Kami via WA" 
                            className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Link Tujuan</label>
                        <input 
                            name="ctaLink" 
                            defaultValue={post.ctaLink || ""}
                            placeholder="https://wa.me/62..." 
                            className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900 bg-white placeholder:text-slate-400"
                        />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
  );
}