'use client';

import React from 'react';
import {
  Layers,
  BookOpen,
  MessageCircle,
  Scale,
  Compass,
  Landmark,
  Feather,
  Library,
  Wrench,
  ChevronDown
} from 'lucide-react';

interface AppFiltersProps {
  categories: { id: string; label: string; count: number }[];
  selectedCategory: string;
  onSelectCategory: (catLabel: string) => void;
  selectedSourceType: 'all' | 'google_play' | 'apk';
  onSelectSourceType: (type: 'all' | 'google_play' | 'apk') => void;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  الكل: Layers,
  'القرآن الكريم': BookOpen,
  'الحديث الشريف': MessageCircle,
  'الفقه وأصوله': Scale,
  العقيدة: Compass,
  'السيرة والتاريخ': Landmark,
  'اللغة العربية': Feather,
  'الكتب والشروح': Library,
  'أدوات ومساعدة': Wrench,
};

export default function AppFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedSourceType,
  onSelectSourceType,
  className = '',
}: AppFiltersProps) {
  return (
    <aside className={`flex flex-col gap-8 text-right ${className}`}>
      {/* 1. قسم التصنيفات */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-amiri font-bold text-lg text-foreground flex items-center gap-1.5">
            <span>التصنيفات</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted" />
          </h3>
        </div>

        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            const Icon = iconMap[cat.label] || Layers;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.label)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-xs sm:text-sm font-bold w-full ${
                  isSelected
                    ? 'bg-brand-primary-light/80 dark:bg-brand-primary-light/15 text-brand-primary dark:text-[#00B3B7] shadow-xs'
                    : 'text-muted hover:text-foreground hover:bg-border/30 dark:hover:bg-border/10'
                }`}
              >
                {/* Count Badge */}
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isSelected
                      ? 'bg-brand-primary text-white dark:bg-[#00B3B7] dark:text-slate-950'
                      : 'bg-border/50 dark:bg-border/20 text-muted'
                  }`}
                >
                  {cat.count}
                </span>

                {/* Name & Icon */}
                <div className="flex items-center gap-2.5">
                  <span>{cat.label}</span>
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isSelected
                        ? 'text-brand-primary dark:text-[#00B3B7]'
                        : 'text-light-text'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. قسم نوع التطبيق */}
      <div className="border-t border-border/50 dark:border-[#212C2C]/50 pt-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-amiri font-bold text-lg text-foreground flex items-center gap-1.5">
            <span>نوع التطبيق</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted" />
          </h3>
        </div>

        <div className="flex flex-col gap-3 px-1 text-xs sm:text-sm font-semibold text-muted">
          {/* Radio option: الكل */}
          <label className="flex items-center justify-between cursor-pointer group hover:text-foreground">
            <span className={selectedSourceType === 'all' ? 'text-brand-primary dark:text-[#00B3B7] font-bold' : ''}>
              الكل
            </span>
            <input
              type="radio"
              name="sourceType"
              checked={selectedSourceType === 'all'}
              onChange={() => onSelectSourceType('all')}
              className="accent-brand-primary w-4 h-4 cursor-pointer"
            />
          </label>

          {/* Radio option: متوفر على جوجل بلاي */}
          <label className="flex items-center justify-between cursor-pointer group hover:text-foreground">
            <span className={selectedSourceType === 'google_play' ? 'text-brand-primary dark:text-[#00B3B7] font-bold' : ''}>
              متوفر على جوجل بلاي
            </span>
            <input
              type="radio"
              name="sourceType"
              checked={selectedSourceType === 'google_play'}
              onChange={() => onSelectSourceType('google_play')}
              className="accent-brand-primary w-4 h-4 cursor-pointer"
            />
          </label>

          {/* Radio option: ملف APK مباشر */}
          <label className="flex items-center justify-between cursor-pointer group hover:text-foreground">
            <span className={selectedSourceType === 'apk' ? 'text-brand-primary dark:text-[#00B3B7] font-bold' : ''}>
              ملف APK مباشر
            </span>
            <input
              type="radio"
              name="sourceType"
              checked={selectedSourceType === 'apk'}
              onChange={() => onSelectSourceType('apk')}
              className="accent-brand-primary w-4 h-4 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </aside>
  );
}
