"use client";

import React, { useState } from "react";
import { ArrowLeft, PlayCircle, X } from "lucide-react";

// Struktur Data Video
const VIDEOS = [
  {
    id: "EQGC5LRnlkU",
    title: "Custom HRIS & Recruitment System (Web-Based ERP) - Project Demo",
    channel: "Swakarsa Digital",
    description: `Watch a complete demonstration of the custom human resource management and recruitment system we developed.
    
    This video showcases the workflow, key features, and user interface of our ERP solution designed specifically for client needs.`,
    thumbnail: "https://img.youtube.com/vi/EQGC5LRnlkU/maxresdefault.jpg", 
  }
];

export default function CustomERPDemoPage() {
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header & Navigation */}
        <div className="mb-12">
          <a
            href="/custom-erp"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-medium mb-4"
          >
            <ArrowLeft size={18} />
            Back to Custom ERP
          </a>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Project Demo Gallery</h1>
          <p className="text-slate-400 mt-3 text-lg max-w-2xl">Explore our collection of custom ERP system demonstrations designed to streamline business operations.</p>
        </div>

        {/* Video Gallery Grid - Wider Cards (Max 3 Cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map((video) => (
            <div 
              key={video.id} 
              className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-900/20 hover:border-slate-700 transition-all cursor-pointer flex flex-col"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Play Button */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                   <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <PlayCircle size={32} fill="currentColor" />
                   </div>
                </div>
              </div>

              {/* Video Info - Only Title as requested */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal / Lightbox with Glass Background */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl transition-all duration-300" 
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="relative w-full max-w-2xl bg-slate-900/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform scale-100 transition-all" 
              onClick={e => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 z-20 p-2 bg-black/40 hover:bg-red-500/80 text-white rounded-full transition-colors backdrop-blur-md border border-white/10 group"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                {selectedVideo.id.length === 11 ? (
                   <iframe
                   width="100%"
                   height="100%"
                   src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                   title={selectedVideo.title}
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                   className="w-full h-full"
                 ></iframe>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                     <PlayCircle size={64} className="mb-6 opacity-30" />
                     <p className="text-lg font-medium">Demo coming soon</p>
                  </div>
                )}
              </div>

              {/* Video Details in Modal - Simplified */}
              <div className="p-6 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900">
                <h2 className="text-xl font-bold text-white mb-2 leading-tight">{selectedVideo.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line max-w-full">
                  {selectedVideo.description}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}