'use client';

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // 1. استيراد مكون الصور من نكست
import softwareList from 'src/data/softwareData.json';
import AdBanner from 'src/components/layout/AdBanner';
import { ArrowLeft, Download, ShieldCheck, Timer } from 'lucide-react';

interface DownloadPageProps {
  params: Promise<{ id: string }>;
}

export default function DownloadPage({ params }: DownloadPageProps) {
  const resolvedParams = use(params);
  const software = softwareList.find((item) => item.id === resolvedParams.id);

  if (!software) {
    notFound();
  }

  const [timeLeft, setTimeLeft] = useState(15);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsReady(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
      {/* Navigation Breadcrumb */}
      <div className="mb-6 text-right">
        <Link
          href={`/software/${software.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-amber-800 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rotate-180" />
          <span>العودة لصفحة تفاصيل التطبيق</span>
        </Link>
      </div>

      {/* Google Policy-compliant high-visibility Ad slot */}
      <AdBanner position="content" />

      {/* Download Action Box Container */}
      <div className="mt-6 p-6 sm:p-8 rounded-3xl border border-border dark:border-slate-800 bg-card dark:bg-slate-900/90 shadow-xs relative overflow-hidden transition-all duration-500">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 dark:from-emerald-500/5 via-sky-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* 🛠️ تعديل عرض أيقونة التطبيق الرسمية أو الفولباك الحرفي */}
          <div className="w-16 h-16 rounded-2xl bg-card dark:bg-slate-800 border border-border dark:border-transparent flex items-center justify-center shadow-inner mb-4 relative overflow-hidden shrink-0">
            {software.iconUrl ? (
              <Image
                src={software.iconUrl}
                alt={software.name}
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            ) : (
              <span className="font-extrabold text-2xl text-[#1E1E1E] dark:text-[#f4f0e6]">
                {software.name.trim().charAt(0)}
              </span>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-extrabold text-[#1E1E1E] dark:text-[#f4f0e6] mb-2">
            رابط تنزيل {software.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
            حجم الملف: {software.size} • الإصدار الرسمي: {software.version}
          </p>

          {/* Countdown indicator */}
          {!isReady ? (
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Circular Countdown Loader */}
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-card dark:border-slate-800">
                <div className="absolute inset-0 rounded-full border-4 border-amber-600 dark:border-emerald-500 border-t-transparent animate-spin" />
                <span className="text-2xl font-black text-[#1E1E1E] dark:text-[#f4f0e6]">
                  {timeLeft}
                </span>
              </div>

              <div className="mt-2 text-slate-700 dark:text-slate-300 font-bold text-sm sm:text-base flex items-center gap-2 justify-center">
                <Timer className="w-5 h-5 text-amber-600 dark:text-emerald-500 animate-pulse" />
                <span>
                  جاري تجهيز رابط التحميل المباشر من خوادم المنصة الرسمية...
                  يرجى الانتظار {timeLeft} ثوانٍ
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-xs h-1.5 bg-card dark:bg-slate-800 rounded-full mt-2 overflow-hidden border border-border dark:border-transparent">
                <div
                  className="h-full bg-amber-600 dark:bg-emerald-500 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            /* Active direct download CTA */
            <div className="w-full">
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 dark:border-emerald-500/20 bg-amber-500/5 dark:bg-emerald-500/5 text-amber-800 dark:text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-emerald-405" />
                <span>رابط التحميل المباشر جاهز الآن</span>
              </div>

              <a
                href={software.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl text-sm sm:text-base font-extrabold bg-[#1E1E1E] hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-lg shadow-amber-550/10 dark:shadow-emerald-500/20 hover:shadow-amber-550/20 dark:hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="w-5.5 h-5.5 animate-bounce" />
                <span>تحميل البرنامج برابط مباشر</span>
              </a>

              <p className="mt-4 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium">
                سيتم تنزيل الملف مباشرة من خوادم المنصة الرسمية للبرمجيات.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}