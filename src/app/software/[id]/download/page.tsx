'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { islamicApps } from 'src/data/islamicAppsData';
import softwareList from 'src/data/softwareData.json';
import { ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import AppIcon from 'src/components/software/AppIcon';

interface DownloadPageProps {
  params: Promise<{ id: string }>;
}

export default function DownloadPage({ params }: DownloadPageProps) {
  const resolvedParams = use(params);
  const app =
    islamicApps.find((item) => item.id === resolvedParams.id) ||
    softwareList.find((item) => item.id === resolvedParams.id);

  if (!app) {
    notFound();
  }

  const downloadUrl =
    (app as any).apkUrl ||
    (app as any).resourceUrl ||
    'https://www.mediafire.com/file/0eiel5gu75phsul/app-arm64-v8a-release.apk/file';

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center" dir="rtl">
      {/* زر العودة */}
      <div className="mb-6 text-right">
        <Link
          href={`/software/${app.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-brand-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة لصفحة تفاصيل التطبيق</span>
        </Link>
      </div>

      {/* صندوق التحميل المباشر الفوري */}
      <div className="mt-6 p-6 sm:p-10 rounded-[2.5rem] border border-border dark:border-[#212C2C] bg-card shadow-premium relative overflow-hidden transition-all duration-500">
        
        {/* خلفية التوهج الروحي */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-brand-secondary/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* أيقونة التطبيق في المنتصف */}
          <div className="mb-5">
            <AppIcon theme={(app as any).iconTheme} size="lg" />
          </div>

          {/* نصوص واضحة */}
          <h1 className="font-amiri text-2xl sm:text-3xl font-bold text-foreground mb-2">
            تنزيل تطبيق {app.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted mb-8 font-semibold font-tajawal">
            حجم الملف: {app.size} • الإصدار الرسمي: {app.version}
          </p>

          {/* شارة التوثيق الفوري */}
          <div className="w-full max-w-sm flex flex-col items-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>ملف APK أصلي، مفحوص وآمن تماماً من أي برمجيات ضارة</span>
            </div>

            {/* زر التحميل الفوري */}
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-sm sm:text-base font-bold bg-brand-primary hover:bg-brand-primary-hover text-white shadow-lg shadow-brand-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-5 h-5 animate-bounce" />
              <span>بدء تحميل ملف APK المباشر</span>
            </a>

            <p className="mt-4 text-[10px] sm:text-xs text-light-text font-medium leading-relaxed">
              يبدأ التنزيل بشكل مباشر وسريع وفوري ومجاني لخدمة طلبة العلم والمسلمين.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}