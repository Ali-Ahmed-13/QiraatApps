'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  MessageSquare,
  Sparkles,
  BookOpen,
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import fatwasData from '@/data/fatwasData.json';
import { FatwasData } from 'src/types/fatwas';
import { searchAndRank } from '@/utils/searchEngine';
import { getCategoryLabel } from '@/utils/fatwaHelper';

const data = fatwasData as FatwasData;

export default function FatwasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<'all' | 'qiraat' | 'quran' | 'fiqh'>('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('cat');
      if (catParam && ['all', 'qiraat', 'quran', 'fiqh'].includes(catParam)) {
        setSelectedCat(catParam as any);
      }
    }
  }, []);

  const handleCatChange = (catId: string) => {
    setSelectedCat(catId as any);
    if (typeof window !== 'undefined') {
      const newUrl = catId === 'all' ? '/fatwas' : `/fatwas?category=${encodeURIComponent(catId)}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  // التصفية بواسطة محرك البحث المتقدم المرتب بالنوايا والنقاط (Score Ranking + ID Code Search)
  const searchResults = searchAndRank(data?.fatwas || [], searchQuery, (fat) => {
    const rawId = fat.id || '';
    const numericPart = rawId.replace(/[^0-9]/g, '');
    return [
      fat.question || '',
      fat.answer || '',
      fat.reference || '',
      rawId,                          // e.g. FTW101
      `#${rawId}`,                    // e.g. #FTW101
      numericPart,                    // e.g. 101
      `مسألة ${rawId}`,
      `مسألة #${rawId}`,
      `مسألة ${numericPart}`,
      `فتوى ${rawId}`,
      `فتوى ${numericPart}`,
    ];
  });

  const filteredFatwas = searchResults.filter((fat) => {
    const isSearchActive = searchQuery.trim().length > 0;
    return isSearchActive || selectedCat === 'all' || fat.category === selectedCat;
  });

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
        
        {/* 🌟 الخلفية الزخرفية الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[800px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.02),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.05),transparent_60%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* رأس الصفحة مع الهوية */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs sm:text-sm font-bold mb-4 border border-brand-primary/10">
              <HelpCircle className="w-4 h-4" />
              <span>إجابات المسائل الشرعية الدقيقة</span>
            </div>
            <h1 className="font-amiri text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              أرشيف الفتاوى والمسائل الشرعية
            </h1>
            <p className="text-sm sm:text-base text-muted mt-3 font-tajawal font-medium leading-relaxed max-w-2xl mx-auto">
              أجوبة فقهية محررة تهم قارئ القرآن الكريم وطالب علم القراءات، تم جمعها ومراجعتها بواسطة لجنة الإشراف العلمي للمنصة ومراجعي الأثر المسند.
            </p>
          </div>

          {/* فلاتر البحث والتبويب */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-card border border-border dark:border-[#212C2C] p-4 rounded-2xl shadow-premium">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {data.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCatChange(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCat === cat.id
                      ? 'bg-brand-primary text-white dark:text-white shadow-premium'
                      : 'text-muted hover:text-foreground hover:bg-border/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-88 shrink-0">
              <input
                type="text"
                placeholder="ابحث بالنص أو كود الفتوى (مثل: FTW101، 101...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border dark:border-[#212C2C] focus:border-brand-primary dark:focus:border-brand-primary rounded-xl py-2.5 pr-10 pl-4 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
              <Search className="w-4 h-4 text-light-text absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* شبكة الفتاوى في عمودين لملء الصفحة بالكامل */}
          {filteredFatwas.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFatwas.map((fat, idx) => (
                <ScrollReveal key={fat.id} variant="fade-up" delay={(idx % 6) * 60}>
                  <Link
                    href={`/fatwas/${fat.id}`}
                    className="group bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary/50 rounded-[26px] p-6 sm:p-7 shadow-premium hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full cursor-pointer hover:-translate-y-1"
                  >
                    <div>
                      {/* رأس البطاقة */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/15 px-3 py-1 rounded-full">
                            {getCategoryLabel(fat.category)}
                          </span>
                          <span className="text-xs text-light-text font-bold bg-border/20 dark:bg-[#212C2C]/50 px-2.5 py-0.5 rounded-lg">
                            مسألة {fat.id}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <MessageSquare className="w-4.5 h-4.5" />
                        </div>
                      </div>

                      {/* السؤال الشرعي */}
                      <h2 className="font-amiri font-bold text-xl sm:text-2xl text-foreground group-hover:text-brand-primary transition-colors leading-snug">
                        {fat.question || 'مسألة شرعية'}
                      </h2>

                      {/* إيجاز الجواب */}
                      <p className="text-sm sm:text-base text-foreground/80 font-medium font-tajawal line-clamp-3 mt-3 leading-relaxed">
                        {fat.answer || ''}
                      </p>
                    </div>

                    {/* التذييل والمصدر */}
                    <div className="mt-6 pt-4 border-t border-border/50 dark:border-[#212C2C]/50 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70 font-semibold truncate">
                        <BookOpen className="w-4 h-4 text-brand-secondary shrink-0" />
                        <span className="truncate">المصدر: {fat.reference || 'لجنة الإشراف العلمي'}</span>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-brand-primary dark:text-[#00B3B7] flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform shrink-0">
                        <span>عرض الفتوى بالكامل</span>
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center bg-card border border-border dark:border-[#212C2C] p-12 rounded-[24px] shadow-premium max-w-xl mx-auto">
              <HelpCircle className="w-12 h-12 text-light-text mx-auto mb-4" />
              <h3 className="font-amiri font-bold text-lg text-foreground mb-2">لم نعثر على فتاوى مطابقة</h3>
              <p className="text-xs text-muted font-medium mb-6">
                جرب صياغة كلمة البحث بشكل آخر أو تواصل مع الدعم الفني لإرسال مسألتك الخاصة.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-premium"
              >
                <span>مراسلة لجنة الفتوى</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* بطاقة السؤال المباشر */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-16 bg-brand-primary-light/40 dark:bg-brand-primary-light/5 border border-brand-primary/10 rounded-[28px] p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-sm">
              <Sparkles className="w-8 h-8 text-brand-secondary mx-auto mb-4" />
              <h3 className="font-amiri font-bold text-xl text-foreground mb-2">لديك مسألة علمية تحتاج لجواب؟</h3>
              <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed font-medium">
                إذا كان لديك إشكال أو سؤال حول الرسم العثماني، التجويد العملي، أو وجوه القراءات، يمكنك مراسلة لجنة التدقيق العلمي بالمنصة مباشرة.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs sm:text-sm font-bold shadow-premium"
              >
                <span>اتصل بنا وأرسل سؤالك</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </PageTransition>
  );
}
