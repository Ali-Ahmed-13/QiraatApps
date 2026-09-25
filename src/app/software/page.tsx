'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Filter, X } from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import { islamicApps, categoriesList } from 'src/data/islamicAppsData';
import { IslamicApp } from 'src/types/software';
import AppFilters from 'src/components/software/AppFilters';
import AppSearch from 'src/components/software/AppSearch';
import AppGrid from 'src/components/software/AppGrid';
import { matchesSearchText } from '@/utils/textNormalization';
import { getStudentData, toggleFavoriteBook } from '@/utils/studentSync';

export default function SoftwarePage() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedSourceType, setSelectedSourceType] = useState<'all' | 'google_play' | 'apk'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'downloads' | 'name'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync favorites with Clerk student sync
  useEffect(() => {
    if (user) {
      const studentData = getStudentData(user);
      setFavorites(studentData.favorites || []);
    }
  }, [user]);

  // URL Query handling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('cat');
      if (catParam) {
        const decoded = decodeURIComponent(catParam);
        setSelectedCategory(decoded === 'all' ? 'الكل' : decoded);
      }
    }
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setMobileFiltersOpen(false);
    if (typeof window !== 'undefined') {
      const newUrl = category === 'الكل' ? '/software' : `/software?category=${encodeURIComponent(category)}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const handleToggleFavorite = (appId: string) => {
    const updated = favorites.includes(appId)
      ? favorites.filter((id) => id !== appId)
      : [...favorites, appId];

    setFavorites(updated);
    if (user) {
      toggleFavoriteBook(user, appId);
    }
  };

  // Compute categories with item counts
  const categoriesWithCounts = useMemo(() => {
    return categoriesList.map((cat) => {
      if (cat.label === 'الكل') {
        return { ...cat, count: islamicApps.length };
      }
      const count = islamicApps.filter(
        (app) => app.category === cat.label || app.secondaryCategory === cat.label || app.tags?.includes(cat.label)
      ).length;
      return { ...cat, count };
    });
  }, []);

  // Filter and Sort Apps
  const filteredAndSortedApps = useMemo(() => {
    let result = islamicApps.filter((app) => {
      // 1. Search filter
      const matchesSearch =
        !searchQuery.trim() ||
        matchesSearchText(app.name, searchQuery) ||
        matchesSearchText(app.description, searchQuery) ||
        matchesSearchText(app.fullDescription, searchQuery) ||
        matchesSearchText(app.subtitle || '', searchQuery) ||
        matchesSearchText(app.sheikh || '', searchQuery) ||
        (app.tags && app.tags.some((t) => matchesSearchText(t, searchQuery)));

      // 2. Category filter
      const matchesCategory =
        selectedCategory === 'الكل' ||
        app.category === selectedCategory ||
        app.secondaryCategory === selectedCategory ||
        app.tags?.includes(selectedCategory);

      // 3. Source Type filter
      const matchesSource =
        selectedSourceType === 'all' ||
        app.sourceType === 'both' ||
        app.sourceType === selectedSourceType;

      return matchesSearch && matchesCategory && matchesSource;
    });

    // 4. Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'downloads') {
        const getNum = (str: string) => parseInt(str.replace(/[^0-9]/g, '')) || 0;
        return getNum(b.downloads) - getNum(a.downloads);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'ar');
      }
      // 'newest' default: keep featured first or order
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedSourceType, sortBy]);

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-24 pt-8" dir="rtl">
        {/* Subtle Background glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-1/3 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 2-Column Responsive Layout (RTL: Main area on the right, Sidebar on the left) */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* 🌟 MAIN CONTENT AREA (On the right in RTL) */}
            <div className="flex-1 w-full order-1">
              
              {/* Header Title & Subtitle */}
              <div className="text-right mb-8">
                <h1 className="font-amiri font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
                  التطبيقات الإسلامية
                </h1>
                <p className="text-xs sm:text-sm text-muted mt-2 font-tajawal font-medium leading-relaxed">
                  مجموعة من التطبيقات المختارة بعناية لخدمة طلاب العلم والمهتمين بالعلوم الشرعية.
                </p>
              </div>

              {/* Mobile Filter Toggle Button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-card border border-border dark:border-[#212C2C] text-sm font-bold text-foreground shadow-xs cursor-pointer"
                >
                  <Filter className="w-4 h-4 text-brand-primary" />
                  <span>تصفية التصنيفات ونوع التطبيق ({selectedCategory})</span>
                </button>
              </div>

              {/* Search and Sorting Controls */}
              <AppSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                totalCount={filteredAndSortedApps.length}
              />

              {/* Applications Grid / List */}
              <ScrollReveal variant="fade-up">
                <AppGrid
                  apps={filteredAndSortedApps}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  viewMode={viewMode}
                />
              </ScrollReveal>
            </div>

            {/* 🌟 SIDEBAR (On the left in RTL, width 280px) */}
            <div className="hidden lg:block w-[280px] shrink-0 bg-card border border-border dark:border-[#212C2C] p-6 rounded-[28px] shadow-premium sticky top-28 order-2">
              <AppFilters
                categories={categoriesWithCounts}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
                selectedSourceType={selectedSourceType}
                onSelectSourceType={setSelectedSourceType}
              />
            </div>

          </div>

        </div>

        {/* 🌟 Mobile Drawer for Filters */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="w-[300px] h-full bg-card p-6 overflow-y-auto shadow-2xl flex flex-col justify-between text-right">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
                  <h3 className="font-amiri font-bold text-xl text-foreground">
                    التصنيفات والفلاتر
                  </h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="إغلاق الفلتر"
                    className="p-1.5 rounded-xl hover:bg-border/30 text-muted"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <AppFilters
                  categories={categoriesWithCounts}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                  selectedSourceType={selectedSourceType}
                  onSelectSourceType={setSelectedSourceType}
                />
              </div>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-8 w-full py-3 rounded-xl bg-brand-primary text-white font-bold text-sm shadow-md"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </div>
        )}
      </main>
    </PageTransition>
  );
}