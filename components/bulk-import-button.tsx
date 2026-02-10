'use client';

import { useState } from 'react';
import { UploadCloud, X, Code, Check, AlertCircle, Loader2 } from 'lucide-react';
import { bulkImportPosts } from '@/app/lib/bulk-import-action';

export default function BulkImportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleImport = async () => {
    if (!jsonInput.trim()) return;
    
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await bulkImportPosts(jsonInput);
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setJsonInput('');
        setTimeout(() => setIsOpen(false), 2000); // Tutup otomatis setelah sukses
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Terjadi kesalahan sistem." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-all border border-slate-200 shadow-sm hover:shadow-md"
      >
        <UploadCloud className="w-5 h-5 mr-2 text-slate-500 group-hover:text-blue-600 transition-colors" />
        Import JSON
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800">Import Artikel (JSON)</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="p-4 bg-blue-50 text-blue-800 text-xs rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Paste array JSON di bawah ini. Format wajib: <br />
                  <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono mt-1 block">
                    [{`{"title": "Judul", "slug": "judul-seo", "content": "...", "published": true}`}, ...]
                  </code>
                </p>
              </div>

              <textarea 
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Tempel kode JSON di sini...'
                className="w-full h-64 p-4 font-mono text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-slate-800 placeholder:text-slate-400"
              />

              {status.message && (
                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {status.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {status.message}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors text-sm"
              >
                Batal
              </button>
              <button 
                onClick={handleImport}
                disabled={isLoading || !jsonInput}
                className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-lg transition-all shadow-md shadow-blue-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Import Data'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}