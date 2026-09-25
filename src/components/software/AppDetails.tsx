'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Share2,
  Heart,
  Star,
  Download,
  Database,
  ChevronLeft,
  Check
} from 'lucide-react';
import { IslamicApp } from 'src/types/software';
import AppIcon from './AppIcon';
import DownloadButton from './DownloadButton';
import ScreenshotGallery from './ScreenshotGallery';
import AppFeatures from './AppFeatures';
import AppInfo from './AppInfo';

interface AppDetailsProps {
  app: IslamicApp;
}

export default function AppDetails({ app }: AppDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: app.name,
          text: app.description,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2500);
      }
    }
  };

  return (
    <div className="w-full text-right" dir="rtl">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-brand-primary text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-2xl shadow-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-brand-secondary" />
            <span>تم نسخ رابط التطبيق بنجاح! 📋</span>
          </div>
        </div>
      )}

      {/* 🌟 1. شريط المسار والعودة */}
      <div className="flex items-center justify-between mb-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <Link href="/software" className="hover:text-brand-primary transition-colors">
            التطبيقات الإسلامية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-foreground font-bold truncate max-w-[200px]">
            {app.name}
          </span>
        </nav>

        {/* Back Button */}
        <Link
          href="/software"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary text-xs sm:text-sm font-bold text-foreground hover:text-brand-primary transition-all shadow-xs"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للتطبيقات</span>
        </Link>
      </div>

      {/* 🌟 2. بطاقة معلومات التطبيق الرئيسية (Hero Card) */}
      <div className="bg-card border border-border dark:border-[#212C2C] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-premium mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border/50 dark:border-[#212C2C]/50">
          
          {/* الأيقونة + الاسم والتصنيف */}
          <div className="flex items-start sm:items-center gap-5 sm:gap-7">
            <AppIcon theme={app.iconTheme} size="lg" className="shrink-0" />
            
            <div className="text-right">
              <h1 className="font-amiri font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
                {app.name}
              </h1>

              {app.subtitle && (
                <p className="text-sm sm:text-base text-muted font-bold font-tajawal mt-1">
                  {app.subtitle}
                </p>
              )}

              {/* Badges */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/60 dark:bg-brand-primary-light/15 border border-brand-primary/10 px-3.5 py-1 rounded-full">
                  {app.category}
                </span>

                {app.secondaryCategory && (
                  <span className="text-xs font-bold text-brand-secondary dark:text-[#E7C682] bg-brand-secondary-light dark:bg-brand-secondary-light/10 border border-brand-secondary/20 px-3.5 py-1 rounded-full">
                    {app.secondaryCategory}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* أزرار المشاركة والمفضلة */}
          <div className="flex items-center gap-2 self-end md:self-start">
            <button
              onClick={handleShare}
              aria-label="مشاركة التطبيق"
              className="p-3 rounded-2xl border border-border dark:border-[#212C2C] hover:bg-border/20 text-muted hover:text-brand-primary transition-colors cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
              className="p-3 rounded-2xl border border-border dark:border-[#212C2C] hover:bg-border/20 text-muted hover:text-rose-500 transition-colors cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 transition-transform ${
                  isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'stroke-current'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 🌟 3. صف الإحصائيات (Rating / Downloads / Size) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-b border-border/50 dark:border-[#212C2C]/50 text-center">
          {/* التقييم */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/50 dark:bg-[#0E1313] border border-border/40 dark:border-[#212C2C]/40">
            <div className="flex items-center gap-1.5 text-amber-500 mb-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-xl sm:text-2xl font-black text-foreground">{app.rating}</span>
            </div>
            <span className="text-xs text-muted font-bold">
              {app.reviewsCount || 'تقييمات المستخدمين'}
            </span>
          </div>

          {/* التحميلات */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/50 dark:bg-[#0E1313] border border-border/40 dark:border-[#212C2C]/40">
            <div className="flex items-center gap-1.5 text-brand-primary dark:text-[#00B3B7] mb-1">
              <Download className="w-5 h-5" />
              <span className="text-xl sm:text-2xl font-black text-foreground">{app.downloads}</span>
            </div>
            <span className="text-xs text-muted font-bold">عدد التحميلات</span>
          </div>

          {/* الحجم */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/50 dark:bg-[#0E1313] border border-border/40 dark:border-[#212C2C]/40">
            <div className="flex items-center gap-1.5 text-brand-secondary dark:text-[#E7C682] mb-1">
              <Database className="w-5 h-5" />
              <span className="text-xl sm:text-2xl font-black text-foreground">{app.size}</span>
            </div>
            <span className="text-xs text-muted font-bold">حجم التطبيق</span>
          </div>
        </div>

        {/* 🌟 4. أزرار التحميل المزدوجة (Google Play & APK) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
          <DownloadButton
            sourceType="google_play"
            googlePlayUrl={app.googlePlayUrl || 'https://play.google.com'}
            variant="details-primary"
          />

          <DownloadButton
            sourceType="apk"
            apkUrl={app.apkUrl || `/software/${app.id}/download`}
            variant="details-secondary"
          />
        </div>
      </div>

      {/* 🌟 5. معرض لقطات الشاشة (Screenshot Gallery) */}
      <div className="mb-12">
        <ScreenshotGallery screenshots={app.screenshots} appName={app.name} />
      </div>

      {/* 🌟 6. عن التطبيق (About) */}
      <div className="bg-card border border-border dark:border-[#212C2C] rounded-[32px] p-6 sm:p-10 shadow-premium mb-8">
        <h2 className="font-amiri font-bold text-2xl sm:text-3xl text-foreground mb-4">
          عن التطبيق
        </h2>
        <p className="font-tajawal text-base sm:text-lg text-foreground/85 leading-[2.3] text-justify whitespace-pre-line">
          {app.fullDescription || app.description}
        </p>

        {/* 🌟 7. مميزات التطبيق (Features) */}
        <AppFeatures features={app.features} />

        {/* 🌟 8. معلومات التطبيق (Info Footer Bar) */}
        <AppInfo
          version={app.version}
          size={app.size}
          lastUpdated={app.lastUpdated}
        />
      </div>
    </div>
  );
}
