'use client';

import React, { useState, useEffect } from 'react';
import {
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  AlignRight,
  BookOpen,
  Printer,
  Share2,
  Check,
  Sun,
  Moon,
  Coffee,
  Sliders,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export type FontSizeKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type FontFamilyKey = 'tajawal' | 'amiri' | 'cairo';
export type LineHeightKey = 'normal' | 'loose' | 'extra-loose';
export type ReadingThemeKey = 'default' | 'sepia';

export interface ReadingPreferences {
  fontSize: FontSizeKey;
  fontFamily: FontFamilyKey;
  lineHeight: LineHeightKey;
  readingTheme: ReadingThemeKey;
}

const STORAGE_KEY = 'tijan_reading_preferences';

export const defaultPreferences: ReadingPreferences = {
  fontSize: 'md',
  fontFamily: 'tajawal',
  lineHeight: 'loose',
  readingTheme: 'default',
};

export const fontSizeClasses: Record<FontSizeKey, string> = {
  sm: 'text-base sm:text-lg',
  md: 'text-lg sm:text-xl lg:text-[21px]',
  lg: 'text-xl sm:text-2xl lg:text-[24px]',
  xl: 'text-2xl sm:text-3xl lg:text-[27px]',
  '2xl': 'text-3xl sm:text-4xl lg:text-[32px]',
};

export const fontFamilyClasses: Record<FontFamilyKey, string> = {
  tajawal: 'font-tajawal',
  amiri: 'font-amiri',
  cairo: 'font-cairo',
};

export const lineHeightClasses: Record<LineHeightKey, string> = {
  normal: 'leading-[2.0] sm:leading-[2.2]',
  loose: 'leading-[2.4] sm:leading-[2.6]',
  'extra-loose': 'leading-[2.8] sm:leading-[3.1]',
};

export const themeClasses: Record<ReadingThemeKey, string> = {
  default: '',
  sepia: 'bg-[#FAF6EE] dark:bg-[#1A1611] text-[#2C2417] dark:text-[#EAE1D0] border-[#EADFC8] dark:border-[#382F22]',
};

interface ReadingSidebarProps {
  preferences: ReadingPreferences;
  onUpdatePreferences: (prefs: Partial<ReadingPreferences>) => void;
  onReset: () => void;
  title?: string;
  readTime?: string;
  className?: string;
}

export function ReadingSidebar({
  preferences,
  onUpdatePreferences,
  onReset,
  title,
  readTime,
  className = '',
}: ReadingSidebarProps) {
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const stepFontSize = (direction: 'up' | 'down') => {
    const sizes: FontSizeKey[] = ['sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = sizes.indexOf(preferences.fontSize);
    if (direction === 'up' && currentIndex < sizes.length - 1) {
      onUpdatePreferences({ fontSize: sizes[currentIndex + 1] });
    } else if (direction === 'down' && currentIndex > 0) {
      onUpdatePreferences({ fontSize: sizes[currentIndex - 1] });
    }
  };

  return (
    <aside
      className={`bg-card border border-border dark:border-[#212C2C] p-5 sm:p-6 rounded-[28px] shadow-premium lg:sticky lg:top-24 text-right transition-all flex flex-col gap-5 no-print print:hidden ${className}`}
      dir="rtl"
    >
      {/* 🌟 1. هيدر اللوحة مع أيقونة الإعدادات وأزرار سريعة للموبايل */}
      <div className="flex items-center justify-between pb-3.5 border-b border-border/60 dark:border-[#212C2C]/60">
        <div className="flex items-center gap-2.5 text-foreground">
          <div className="w-8 h-8 rounded-xl bg-brand-primary-light/60 dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-amiri font-bold text-base text-foreground leading-snug">
              تخصيص القراءة
            </h4>
            <span className="text-[10px] text-muted font-bold block">إعدادات الخط والمظهر</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* زر تكبير وتصغير سريع يظهر دائماً في الموبايل */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => stepFontSize('down')}
              title="تصغير الخط"
              className="w-7 h-7 rounded-lg bg-background border border-border/70 text-xs font-black flex items-center justify-center text-foreground hover:bg-border/30 cursor-pointer"
            >
              A-
            </button>
            <button
              onClick={() => stepFontSize('up')}
              title="تكبير الخط"
              className="w-7 h-7 rounded-lg bg-background border border-border/70 text-xs font-black flex items-center justify-center text-foreground hover:bg-border/30 cursor-pointer"
            >
              A+
            </button>
          </div>

          <button
            onClick={onReset}
            title="إعادة ضبط الخط للوضع الافتراضي"
            className="text-xs text-muted hover:text-brand-primary p-1.5 rounded-lg hover:bg-border/30 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold hidden sm:inline">استعادة</span>
          </button>

          {/* زر التوسيع في الموبايل */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-background border border-border/70 text-foreground cursor-pointer"
            title="عرض المزيد من الإعدادات"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* المحتوى الكامل (يظهر دائماً على الشاشات الكبيرة lg، ويتوسع في الموبايل عند النقر) */}
      <div className={`flex flex-col gap-5 ${mobileOpen ? 'block' : 'hidden lg:flex'}`}>

      {/* 🌟 2. التحكم بحجم الخط (Font Size) */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-foreground mb-3">
          <span>حجم الخط</span>
          <span className="text-xs font-black text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 px-2 py-0.5 rounded-md">
            {preferences.fontSize === 'sm' && 'صغير (16px)'}
            {preferences.fontSize === 'md' && 'افتراضي (18px)'}
            {preferences.fontSize === 'lg' && 'كبير (21px)'}
            {preferences.fontSize === 'xl' && 'كبير جداً (24px)'}
            {preferences.fontSize === '2xl' && 'ضخم (28px)'}
          </span>
        </div>

        {/* أزرار التكبير والتصغير */}
        <div className="grid grid-cols-5 gap-1.5 p-1 bg-background/60 border border-border/50 dark:border-[#212C2C]/50 rounded-2xl">
          {(['sm', 'md', 'lg', 'xl', '2xl'] as FontSizeKey[]).map((sizeKey, idx) => (
            <button
              key={sizeKey}
              onClick={() => onUpdatePreferences({ fontSize: sizeKey })}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                preferences.fontSize === sizeKey
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-muted hover:text-foreground hover:bg-border/30'
              }`}
            >
              {idx === 0 ? 'A-' : idx === 4 ? 'A+' : `A${idx}`}
            </button>
          ))}
        </div>
      </div>

      {/* 🌟 4. اختيار نوع الخط (Font Family) */}
      <div>
        <span className="text-xs font-bold text-foreground block mb-2.5">نوع الخط العربي</span>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onUpdatePreferences({ fontFamily: 'tajawal' })}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              preferences.fontFamily === 'tajawal'
                ? 'bg-brand-primary-light/80 dark:bg-brand-primary-light/15 border-brand-primary text-brand-primary'
                : 'border-border/50 hover:bg-border/20 text-muted'
            }`}
          >
            <span className="font-tajawal">خط تجوال (عصري مريح)</span>
            {preferences.fontFamily === 'tajawal' && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onUpdatePreferences({ fontFamily: 'amiri' })}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              preferences.fontFamily === 'amiri'
                ? 'bg-brand-primary-light/80 dark:bg-brand-primary-light/15 border-brand-primary text-brand-primary'
                : 'border-border/50 hover:bg-border/20 text-muted'
            }`}
          >
            <span className="font-amiri text-sm">خط أميري (أصيل ومشكول)</span>
            {preferences.fontFamily === 'amiri' && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onUpdatePreferences({ fontFamily: 'cairo' })}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              preferences.fontFamily === 'cairo'
                ? 'bg-brand-primary-light/80 dark:bg-brand-primary-light/15 border-brand-primary text-brand-primary'
                : 'border-border/50 hover:bg-border/20 text-muted'
            }`}
          >
            <span className="font-cairo">خط كايرو (واضح وبارز)</span>
            {preferences.fontFamily === 'cairo' && <Check className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 🌟 5. تباعد الأسطر (Line Height) */}
      <div>
        <span className="text-xs font-bold text-foreground block mb-2.5">ارتفاع الأسطر</span>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-background/60 border border-border/50 dark:border-[#212C2C]/50 rounded-2xl">
          <button
            onClick={() => onUpdatePreferences({ lineHeight: 'normal' })}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
              preferences.lineHeight === 'normal'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-muted hover:text-foreground hover:bg-border/30'
            }`}
          >
            عادي
          </button>

          <button
            onClick={() => onUpdatePreferences({ lineHeight: 'loose' })}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
              preferences.lineHeight === 'loose'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-muted hover:text-foreground hover:bg-border/30'
            }`}
          >
            مريح
          </button>

          <button
            onClick={() => onUpdatePreferences({ lineHeight: 'extra-loose' })}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
              preferences.lineHeight === 'extra-loose'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-muted hover:text-foreground hover:bg-border/30'
            }`}
          >
            واسع
          </button>
        </div>
      </div>

      {/* 🌟 6. خلفية القراءة (ورق كلاسيكي دافئ) */}
      <div>
        <span className="text-xs font-bold text-foreground block mb-2.5">وضع الورق المريح</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdatePreferences({ readingTheme: 'default' })}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              preferences.readingTheme === 'default'
                ? 'border-brand-primary bg-brand-primary-light/50 text-brand-primary'
                : 'border-border/60 hover:bg-border/20 text-muted'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>الوضع الافتراضي</span>
          </button>

          <button
            onClick={() => onUpdatePreferences({ readingTheme: 'sepia' })}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              preferences.readingTheme === 'sepia'
                ? 'border-[#C49D49] bg-[#FAF6EE] text-[#4A3510] shadow-xs'
                : 'border-border/60 hover:bg-[#FAF6EE]/50 text-muted'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span>ورق دافئ (Sepia)</span>
          </button>
        </div>
      </div>

      {/* 🌟 7. أدوات سريعة (مشاركة، طباعة، نسخ رابط) */}
      <div className="pt-4 border-t border-border/50 dark:border-[#212C2C]/50 flex items-center justify-between gap-2">
        <button
          onClick={handleCopyLink}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-background hover:bg-border/30 text-xs font-bold text-foreground border border-border/60 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-brand-primary" />}
          <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
        </button>

        <button
          onClick={handlePrint}
          title="طباعة"
          className="p-2.5 rounded-xl bg-background hover:bg-border/30 text-muted hover:text-brand-primary border border-border/60 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>
      </div>
    </aside>
  );
}

// Hook to manage and persist reading preferences
export function useReadingPreferences() {
  const [preferences, setPreferences] = useState<ReadingPreferences>(defaultPreferences);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setPreferences((prev) => ({ ...prev, ...JSON.parse(saved) }));
        }
      } catch (e) {
        console.error('Error loading reading preferences:', e);
      }
    }
  }, []);

  const updatePreferences = (newPrefs: Partial<ReadingPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error('Error saving reading preferences:', e);
        }
      }
      return updated;
    });
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    fontSizeClass: fontSizeClasses[preferences.fontSize],
    fontFamilyClass: fontFamilyClasses[preferences.fontFamily],
    lineHeightClass: lineHeightClasses[preferences.lineHeight],
    themeClass: themeClasses[preferences.readingTheme],
  };
}
