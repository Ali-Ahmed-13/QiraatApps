'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import softwareList from 'src/data/softwareData.json';
import { ArrowLeft, Download, ShieldCheck } from 'lucide-react';

interface DownloadPageProps {
  params: Promise<{ id: string }>;
}

export default function DownloadPage({ params }: DownloadPageProps) {
  const resolvedParams = use(params);
  const software = softwareList.find((item) => item.id === resolvedParams.id);

  if (!software) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center" dir="rtl">
      {/* زر العودة التفاعلي الفخم */}
      <div className="mb-6 text-right">
        <Link
          href={`/software/${software.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة لصفحة تفاصيل التطبيق</span>
        </Link>
      </div>

      {/* صندوق التحميل المباشر الفوري */}
      <div className="mt-6 p-6 sm:p-10 rounded-[2rem] border border-amber-900/10 dark:border-amber-400/10 bg-white/80 dark:bg-[#0c111d] shadow-xl shadow-amber-900/5 dark:shadow-black/25 relative overflow-hidden transition-all duration-500">
        
        {/* خلفية التوهج الذهبي الفخم الخاص بتيجان */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/0 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* أيقونة التطبيق في المنتصف مع توهج ناعم */}
          <div className="w-20 h-20 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-500/10 dark:border-transparent flex items-center justify-center shadow-md mb-5 relative overflow-hidden shrink-0">
            {software.iconUrl ? (
              <Image
                src={software.iconUrl}
                alt={software.name}
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            ) : (
              <span className="font-black text-3xl text-amber-800 dark:text-amber-400">
                {software.name.trim().charAt(0)}
              </span>
            )}
          </div>

          {/* نصوص فخمة وواضحة */}
          <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-[#f8f4ea] mb-2">
            تنزيل تطبيق {software.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 font-semibold">
            حجم الملف: {software.size} • الإصدار الرسمي الحالي: {software.version}
          </p>

          {/* شارة التوثيق الفوري - بلون كهرماني ذهبي بالكامل */}
          <div className="w-full max-w-sm flex flex-col items-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-800 dark:text-amber-400 text-xs font-black">
              <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-500" />
              <span>رابط التنزيل المباشر جاهز وآمن تماماً</span>
            </div>

            {/* زر التحميل الفوري بنقرة واحدة - ألوان ملكية Amber و Slate بدون أي تداخل للأخضر */}
            <a
              href={software.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-sm sm:text-base font-black bg-slate-950 hover:bg-black dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 text-white shadow-lg shadow-amber-900/10 dark:shadow-amber-500/10 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-5 h-5 animate-bounce" />
              <span>بدء تحميل البرنامج فوراً برابط مباشر</span>
            </a>

            <p className="mt-4 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold leading-relaxed">
              سيتم تحميل الملف بشكل آمن ومباشر من خوادم المنصة الرسمية دون فترات انتظار مكررة.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}