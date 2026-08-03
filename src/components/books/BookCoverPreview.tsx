'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, RefreshCw, ZoomIn, X, AlertCircle, FileText } from 'lucide-react';

interface BookCoverPreviewProps {
  pdfUrl?: string;
  title: string;
  author?: string;
  className?: string;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function BookCoverPreview({
  pdfUrl,
  title,
  author,
  className = '',
}: BookCoverPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!pdfUrl || pdfUrl === '#' || pdfUrl.trim() === '') {
      setLoading(false);
      setError(true);
      return;
    }

    const loadPdfPage = async () => {
      try {
        setLoading(true);
        setError(false);

        // تحميل مكتبة PDF.js ديناميكياً من CDN في حال عدم تحميلها مسبقاً
        if (!window.pdfjsLib) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('فشل تحميل مكتبة PDF.js'));
            document.body.appendChild(script);
          });
        }

        if (!window.pdfjsLib) {
          throw new Error('PDF.js غير متوفرة');
        }

        // ضبط الـ Worker الخاص بالمكتبة
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        // جلب وثيقة الـ PDF
        const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;

        // جلب الصفحة الأولى فقط من الكتاب
        const page = await pdf.getPage(1);

        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // رسم الصفحة بدقة عالية (Scale 2.0)
        const scale = 2.0;
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        if (isMounted) {
          setLoading(false);
        }
      } catch (err) {
        console.error('خطأ في استخراج الصفحة الأولى من الـ PDF:', err);
        if (isMounted) {
          setLoading(false);
          setError(true);
        }
      }
    };

    loadPdfPage();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  return (
    <div className={`relative group flex flex-col items-center justify-center ${className}`}>
      
      {/* 🌟 الإطار الخارجي وتأثير تصميم الكتاب ثلاثي الأبعاد */}
      <div 
        onClick={() => !loading && !error && setIsPreviewOpen(true)}
        className={`relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700/80 transition-all duration-300 transform group-hover:-translate-y-1.5 group-hover:shadow-2xl ${
          !loading && !error ? 'cursor-pointer' : ''
        }`}
      >
        
        {/* 📖 حافة كعب الكتاب العريضة ليعطي شكل كتاب واقعي */}
        <div className="absolute top-0 right-0 bottom-0 w-3.5 bg-gradient-to-l from-black/20 via-black/10 to-transparent z-20 pointer-events-none border-l border-white/10" />

        {/* 🔄 حالة التحميل (Loading Skeleton) */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/90 p-4 text-center z-10 animate-pulse">
            <RefreshCw className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-spin mb-3" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              جاري استخراج الغلاف من الصفحة الأولى للـ PDF...
            </span>
          </div>
        )}

        {/* ⚠️ حالة الخطأ أو عدم توفر ملف PDF */}
        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-amber-900/90 to-amber-950 text-white text-center">
            <div className="w-full flex justify-center pt-2">
              <div className="p-3 bg-amber-500/20 rounded-full border border-amber-400/30">
                <BookOpen className="w-8 h-8 text-amber-300" />
              </div>
            </div>
            
            <div className="my-auto space-y-2">
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-400/30">
                غلاف الكتاب الرقمي
              </span>
              <h3 className="font-amiri text-lg font-bold leading-snug line-clamp-3 text-amber-100">
                {title}
              </h3>
              {author && (
                <p className="text-xs text-amber-300/80 font-medium">
                  {author}
                </p>
              )}
            </div>

            <div className="text-[11px] text-amber-300/60 font-semibold border-t border-amber-500/20 pt-3 w-full">
              تِيجَان - المكتبة الإسلامية
            </div>
          </div>
        )}

        {/* 🎨 الرسم الحي للصفحة الأولى عبر Canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            loading || error ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* 🔍 طبقة التظليل والتكبير عند التمرير */}
        {!loading && !error && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold shadow-lg transform group-hover:scale-105 transition-transform">
              <ZoomIn className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>معاينة غلاف الكتاب</span>
            </span>
          </div>
        )}

        {/* 🏷️ شارة توضيحية أسفل الغلاف */}
        {!loading && !error && (
          <div className="absolute bottom-2 left-2 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-amber-300 backdrop-blur-xs border border-amber-500/30">
              <FileText className="w-3 h-3" />
              <span>الصفحة الأولى من الـ PDF</span>
            </span>
          </div>
        )}

      </div>

      {/* 🔍 نافذة التكبير والملاحظة عند النقر */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div 
            className="relative bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between w-full border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  غلاف الكتاب (الصفحة الأولى من الـ PDF)
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* نسخة الغلاف الكبيرة */}
            <div className="relative w-full aspect-[3/4] max-h-[65vh] flex justify-center items-center overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <iframe
                src={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-none"
                title={title}
              />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium">
              {title} - تأليف: {author || 'غير محدد'}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
