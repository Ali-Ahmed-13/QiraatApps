'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  BookOpen,
  Calendar,
  Clock,
  User,
  ChevronLeft,
  Sparkles,
  Bookmark
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import articlesData from '@/data/articlesData.json';
import { ArticlesData } from 'src/types/articles';
import { searchAndRank } from '@/utils/searchEngine';

const data = articlesData as ArticlesData;

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tajweed' | 'arabic' | 'aqeedah' | 'fiqh'>('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('cat');
      if (catParam && ['all', 'tajweed', 'arabic', 'aqeedah', 'fiqh'].includes(catParam)) {
        setSelectedCategory(catParam as any);
      }
    }
  }, []);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId as any);
    if (typeof window !== 'undefined') {
      const newUrl = catId === 'all' ? '/articles' : `/articles?category=${encodeURIComponent(catId)}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const searchResults = useMemo(() => {
    return searchAndRank(data?.articles || [], searchQuery, (art) => {
      const rawId = art.id || '';
      const numOnly = rawId.replace(/[^0-9]/g, '');
      return [
        rawId,
        numOnly,
        `ART${numOnly}`,
        `مقال ${rawId}`,
        `مقال ${numOnly}`,
        art.title || '',
        art.excerpt || '',
        art.author || '',
        (art.tags || []).join(' '),
      ];
    });
  }, [searchQuery]);

  const filteredArticles = useMemo(() => {
    const isSearchActive = searchQuery.trim().length > 0;
    return searchResults.filter((art) => {
      return isSearchActive || selectedCategory === 'all' || art.category === selectedCategory;
    });
  }, [searchResults, selectedCategory, searchQuery]);

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
        
        {/* 🌟 الخلفية الزخرفية الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* رأس الصفحة مع الهوية */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold mb-4 border border-brand-primary/10">
              <FileText className="w-3.5 h-3.5" />
              <span>مستودع المعرفة والبحوث الشرعية</span>
            </div>
            <h1 className="font-amiri text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              مقالات وبحوث تِيجَان العلمية
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-3 font-tajawal font-medium leading-relaxed">
              تصفح مقالات تأصيلية وبحوثاً محققة كتبها شيوخ وعلماء المنصة لتبسيط دراسة العلوم الشرعية والقرآن الكريم واللغة العربية لطلبة العلم.
            </p>
          </div>

          {/* شريط البحث وتصنيف المقالات */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 bg-card border border-border dark:border-[#212C2C] p-4 rounded-2xl shadow-premium">
            
            {/* أزرار الفئات الفاخرة */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {data.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brand-primary text-white dark:text-white shadow-premium'
                      : 'text-muted hover:text-foreground hover:bg-border/20 border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* حقل البحث */}
            <div className="relative w-full lg:w-80 shrink-0">
              <input
                type="text"
                placeholder="ابحث في المقالات أو العلماء..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border dark:border-[#212C2C] focus:border-brand-primary dark:focus:border-brand-primary rounded-xl py-2.5 pr-10 pl-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
              <Search className="w-4 h-4 text-light-text absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>

          </div>

          {/* المقالات المميّزة (Featured Article) */}
          {searchQuery === '' && selectedCategory === 'all' && data.articles.find((art) => art.featured) && (
            <ScrollReveal variant="fade-up">
              {(() => {
                const featuredArt = data.articles.find((art) => art.featured)!;
                return (
                  <div className="bg-card border border-border dark:border-[#212C2C] rounded-[28px] overflow-hidden p-6 sm:p-8 shadow-premium mb-12 group hover:shadow-premium-hover transition-all duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="relative h-60 lg:h-80 bg-brand-primary-light/50 dark:bg-brand-primary-light/5 rounded-[22px] overflow-hidden flex items-center justify-center border border-brand-primary/10">
                        {/* Simulated calligraphic design in background */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.06),transparent_60%)] blur-2xl" />
                        <div className="z-10 text-center px-6">
                          <BookOpen className="w-16 h-16 text-brand-primary/20 dark:text-brand-primary/40 mx-auto mb-4" />
                          <span className="font-amiri font-bold text-lg text-brand-primary/80 dark:text-[#E7C682]">تأصيل شرعي متين</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-6 text-right">
                        <div className="flex flex-col gap-3">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary dark:text-[#E7C682] text-[10px] font-black border border-brand-secondary/15 w-fit">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>مقال مميز وموثق</span>
                          </div>
                          <h2 className="font-amiri font-bold text-2xl sm:text-3xl text-foreground group-hover:text-brand-primary transition-colors">
                            {featuredArt.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-muted leading-relaxed font-tajawal font-medium">
                            {featuredArt.excerpt}
                          </p>
                        </div>
                        <div className="flex flex-col gap-4 border-t border-border/60 dark:border-[#212C2C]/60 pt-4">
                          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted font-bold">
                            <span className="flex items-center gap-1"><User className="w-4 h-4 text-brand-primary" /> {featuredArt.author}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-brand-secondary" /> {featuredArt.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-light-text" /> {featuredArt.readTime}</span>
                          </div>
                          <Link href={`/articles/${featuredArt.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-primary-hover w-fit cursor-pointer">
                            <span>اقرأ المقال كاملاً</span>
                            <ChevronLeft className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </ScrollReveal>
          )}

          {/* شبكة المقالات */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.filter((art) => !art.featured || searchQuery !== '' || selectedCategory !== 'all').map((art, idx) => (
                <ScrollReveal key={art.id} variant="fade-up" delay={idx * 100}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 rounded-[24px] shadow-premium flex flex-col justify-between h-full group hover:-translate-y-1 hover:shadow-premium-hover transition-all duration-300">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-brand-primary dark:text-[#00B3B7] font-black bg-brand-primary-light/50 dark:bg-brand-primary-light/10 px-2.5 py-1 rounded-full border border-brand-primary/10">
                            {catLabel(art.category)}
                          </span>
                          <span className="text-[10px] text-light-text font-bold">
                            مقال {art.id}
                          </span>
                        </div>
                        <Bookmark className="w-4 h-4 text-light-text hover:text-brand-primary cursor-pointer transition-colors" />
                      </div>
                      <h3 className="font-amiri font-bold text-lg sm:text-xl text-foreground group-hover:text-brand-primary transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed font-tajawal font-medium line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                    
                    <div className="border-t border-border/60 dark:border-[#212C2C]/60 mt-6 pt-4 flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5 text-[11px] text-light-text font-bold">
                        <span className="flex items-center gap-1 text-muted"><User className="w-3.5 h-3.5 text-brand-primary shrink-0" /> {art.author}</span>
                        <div className="flex items-center justify-between text-[10px] mt-1">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 shrink-0" /> {art.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 shrink-0" /> {art.readTime}</span>
                        </div>
                      </div>
                      <Link href={`/articles/${art.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-primary-hover w-fit cursor-pointer">
                        <span>اقرأ المقال</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center bg-card border border-border dark:border-[#212C2C] p-12 rounded-[24px] shadow-premium max-w-xl mx-auto mt-8">
              <FileText className="w-12 h-12 text-light-text mx-auto mb-4" />
              <h3 className="font-amiri font-bold text-lg text-foreground mb-2">عذراً، لم نعثر على نتائج</h3>
              <p className="text-xs text-muted font-medium">
                جرب البحث بكلمات أخرى أو اختر فئة تصنيف مغايرة لتصفح المقالات المتاحة.
              </p>
            </div>
          )}

        </div>
      </main>
    </PageTransition>
  );
}

const catLabel = (cat?: string) => {
  switch (cat) {
    case 'tajweed': return 'تجويد وقراءات';
    case 'arabic': return 'لغة عربية';
    case 'aqeedah': return 'عقيدة وتوحيد';
    case 'fiqh': return 'فقه وأصول';
    default: return 'عام';
  }
};
