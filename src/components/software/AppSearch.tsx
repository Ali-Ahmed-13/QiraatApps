'use client';

import React from 'react';
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

interface AppSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'newest' | 'rating' | 'downloads' | 'name';
  onSortChange: (sort: 'newest' | 'rating' | 'downloads' | 'name') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalCount: number;
}

export default function AppSearch({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalCount,
}: AppSearchProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* حقل البحث الرئيسي */}
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث عن تطبيق (مثل: قرآن، حديث، فقه...)"
          className="w-full bg-card border border-border dark:border-[#212C2C] focus:border-brand-primary dark:focus:border-brand-primary rounded-2xl py-3.5 pr-5 pl-12 text-sm font-semibold text-foreground placeholder:text-light-text focus:outline-none focus:ring-1 focus:ring-brand-primary shadow-xs transition-all"
        />
        <Search className="w-5 h-5 text-light-text absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* شريط أدوات التحكم والفرز */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* اليمين: القائمة المنسدلة للفرز */}
        <div className="relative flex items-center">
          <div className="flex items-center gap-2 bg-card border border-border dark:border-[#212C2C] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-foreground shadow-xs">
            <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-foreground font-bold focus:outline-none cursor-pointer pr-1"
            >
              <option value="newest" className="bg-card text-foreground">الأحدث أولاً</option>
              <option value="rating" className="bg-card text-foreground">الأعلى تقييماً</option>
              <option value="downloads" className="bg-card text-foreground">الأكثر تحميلاً</option>
              <option value="name" className="bg-card text-foreground">الأبجدية (أ - ي)</option>
            </select>
          </div>
        </div>

        {/* اليسار: عدد التطبيقات وتبديل شبكة/قائمة */}
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-bold text-muted">
            {totalCount} تطبيق
          </span>

          <div className="flex items-center gap-1 bg-card border border-border dark:border-[#212C2C] p-1 rounded-xl shadow-xs">
            {/* List button */}
            <button
              onClick={() => onViewModeChange('list')}
              aria-label="عرض قائمة"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-light-text hover:text-foreground'
              }`}
            >
              <List className="w-4 h-4" />
            </button>

            {/* Grid button */}
            <button
              onClick={() => onViewModeChange('grid')}
              aria-label="عرض شبكة"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-light-text hover:text-foreground'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
