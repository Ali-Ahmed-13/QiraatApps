'use client';

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rotate-180" />
          <span>العودة لصفحة تفاصيل التطبيق</span>
        </Link>
      </div>

      {/* Google Policy-compliant high-visibility Ad slot */}
      <AdBanner position="content" />

      {/* Download Action Box Container */}
      <div className="mt-6 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs relative overflow-hidden transition-all duration-500">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-sky-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Identity Icon Fallback */}
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-extrabold text-2xl text-slate-800 dark:text-slate-500  shadow-inner mb-4">
            {software.name.trim().charAt(0)}
          </div>

          <h2 className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-slate-500  mb-2">
            رابط تنزيل {software.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
            حجم الملف: {software.size} • الإصدار الرسمي: {software.version}
          </p>

          {/* Countdown indicator */}
          {!isReady ? (
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Circular Countdown Loader */}
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                <span className="text-2xl font-black text-slate-800 dark:text-slate-500 ">
                  {timeLeft}
                </span>
              </div>

              <div className="mt-2 text-slate-600 dark:text-slate-300 font-bold text-sm sm:text-base flex items-center gap-2 justify-center">
                <Timer className="w-5 h-5 text-emerald-500 animate-pulse" />
                <span>
                  جاري تجهيز رابط التحميل المباشر من خوادم المنصة الرسمية...
                  يرجى الانتظار {timeLeft} ثوانٍ
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-xs h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            /* Active direct download CTA */
            <div className="w-full">
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>رابط التحميل المباشر جاهز الآن</span>
              </div>

              <a
                href={software.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl text-sm sm:text-base font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
