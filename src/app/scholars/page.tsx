'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  ChevronLeft,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import scholarsData from '@/data/scholars';
import { ScholarsData } from 'src/types/scholars';
import { matchesSearchText } from '@/utils/textNormalization';

const data = scholarsData as ScholarsData;

export default function ScholarsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<'all' | 'quraa10' | 'companions' | 'classical' | 'modern'>('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const eraParam = params.get('era') || params.get('category');
      if (eraParam && ['all', 'quraa10', 'companions', 'classical', 'modern'].includes(eraParam)) {
        setSelectedEra(eraParam as any);
      }
    }
  }, []);

  const handleEraChange = (eraId: string) => {
    setSelectedEra(eraId as any);
    if (typeof window !== 'undefined') {
      const newUrl = eraId === 'all' ? '/scholars' : `/scholars?era=${encodeURIComponent(eraId)}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const filteredScholars = (data?.scholars || []).filter((sch) => {
    const matchesSearch =
      !searchQuery ||
      matchesSearchText(sch.name || '', searchQuery) ||
      matchesSearchText(sch.title || '', searchQuery) ||
      matchesSearchText(sch.bio || '', searchQuery);
    const matchesEra = selectedEra === 'all' || sch.era === selectedEra;
    return matchesSearch && matchesEra;
  });

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
        
        {/* 🌟 الخلفية الزخرفية الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-1/3 w-[700px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(216,177,92,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(231,198,130,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* رأس الصفحة مع الهوية */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary dark:text-[#E7C682] text-xs font-bold mb-4 border border-brand-secondary/15">
              <Users className="w-3.5 h-3.5" />
              <span>أئمة القراءات وسلاسل السند المتصل</span>
            </div>
            <h1 className="font-amiri text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              سير وتراجم أئمة القراءات والعلماء
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-3 font-tajawal font-medium leading-relaxed">
              استكشف تراجم وسير الصحابة الكرام والعلماء المتقدمين والمعاصرين الذين حفظ الله بهم كتابة وضبطاً وصوتاً روايات وسلاسل الإسناد للقرآن الكريم.
            </p>
          </div>

          {/* شريط البحث وفلاتر العصور */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 bg-card border border-border dark:border-[#212C2C] p-4 rounded-2xl shadow-premium">
            
            {/* العصور الفترات التاريخية */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {data.eras.map((era) => (
                <button
                  key={era.id}
                  onClick={() => handleEraChange(era.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                    selectedEra === era.id
                      ? 'bg-brand-primary text-white dark:text-white shadow-premium'
                      : 'text-muted hover:text-foreground hover:bg-border/20 border border-transparent'
                  }`}
                >
                  {era.label}
                </button>
              ))}
            </div>

            {/* حقل البحث */}
            <div className="relative w-full lg:w-80 shrink-0">
              <input
                type="text"
                placeholder="ابحث عن إمام، كتاب، أو بلد..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border dark:border-[#212C2C] focus:border-brand-primary dark:focus:border-brand-primary rounded-xl py-2.5 pr-10 pl-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
              <Search className="w-4 h-4 text-light-text absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>

          </div>

          {/* شبكة تراجم وسير العلماء - تصميم بطاقات غني يملأ العرض بالكامل */}
          {filteredScholars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholars.map((sch, idx) => (
                <ScrollReveal key={sch.id} variant="fade-up" delay={(idx % 6) * 50}>
                  <Link
                    href={`/scholars/${sch.id}`}
                    className="group bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary/50 rounded-[24px] p-6 shadow-premium hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full cursor-pointer hover:-translate-y-1"
                  >
                    <div className="flex flex-col gap-3">
                      {/* الهيدر: التصنيف والرقم والباج */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-brand-secondary dark:text-[#E7C682] bg-brand-secondary-light dark:bg-brand-secondary-light/10 border border-brand-secondary/20 px-3 py-1 rounded-full">
                          {eraLabel(sch.era || '')}
                        </span>
                        <span className="text-xs font-black text-light-text bg-border/20 dark:bg-[#212C2C]/50 px-2.5 py-0.5 rounded-lg">
                          #{idx + 1}
                        </span>
                      </div>

                      {/* اسم الإمام واللقب */}
                      <div className="mt-1">
                        <h2 className="font-amiri font-bold text-xl sm:text-2xl text-foreground group-hover:text-brand-primary transition-colors leading-snug">
                          {sch.name}
                        </h2>
                        {sch.title && (
                          <p className="text-xs sm:text-sm text-brand-primary dark:text-[#00B3B7] font-bold font-tajawal mt-1 line-clamp-1">
                            {sch.title}
                          </p>
                        )}
                      </div>

                      {/* النبذة الموجزة */}
                      <p className="text-xs sm:text-sm text-foreground/80 font-medium font-tajawal leading-relaxed line-clamp-3 mt-1">
                        {sch.bio || sch.achievement || 'ترجمة وافية ومعلومات موثقة عن سيرة الإمام وسنده في القراءات.'}
                      </p>

                      {/* معطيات الحياة والمكان */}
                      {(sch.lifespan || sch.location) && (
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-light-text font-bold pt-2">
                          {sch.lifespan && (
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                              <span>{sch.lifespan}</span>
                            </span>
                          )}
                          {sch.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                              <span>{sch.location}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* زر الذهاب للترجمة */}
                    <div className="pt-4 mt-4 border-t border-border/50 dark:border-[#212C2C]/50 flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                        <span>عرض السيرة والترجمة المفصلة</span>
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                      {sch.achievement && (
                        <span className="text-[10px] text-muted font-bold truncate max-w-[120px]">
                          {sch.achievement}
                        </span>
                      )}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center bg-card border border-border dark:border-[#212C2C] p-12 rounded-[24px] shadow-premium max-w-xl mx-auto mt-8">
              <Users className="w-12 h-12 text-light-text mx-auto mb-4" />
              <h3 className="font-amiri font-bold text-lg text-foreground mb-2">عذراً، لم نعثر على نتائج</h3>
              <p className="text-xs text-muted font-medium">
                جرب البحث بكلمات أخرى لتجد الإمام المطلوبة ترجمته وسيرته الذاتية.
              </p>
            </div>
          )}

          {/* مخطط زمني للمقررين التأسيسي والترقي */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-20 bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium text-center">
              <h3 className="font-amiri font-bold text-2xl text-foreground mb-4">
                سلسلة السند المتصل لكتاب الله عز وجل
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
                يمر إسناد القرآن الكريم من شيوخ العصر إلى التابعين ثم الصحابة الأجلاء (كأبي وزيد وعثمان وعلي) عن رسول الله ﷺ عن جبريل عليه السلام عن رب العزة جل جلاله.
              </p>
              
              {/* رسم تمثيلي مبسط للمخطط الزمني */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-border dark:bg-[#212C2C] -z-10 hidden md:block" />
                
                <div className="bg-background border border-border dark:border-[#212C2C] p-4 rounded-2xl shadow-sm text-center w-full md:w-auto">
                  <span className="text-[10px] text-brand-secondary font-black block">المرحلة الأولى</span>
                  <h4 className="font-bold text-sm text-foreground mt-1">الرعيل الأول (الصحابة)</h4>
                  <p className="text-[10px] text-light-text mt-0.5">تعليم شفهي مباشر وتأسيس الرسم</p>
                </div>
                <div className="bg-background border border-border dark:border-[#212C2C] p-4 rounded-2xl shadow-sm text-center w-full md:w-auto">
                  <span className="text-[10px] text-brand-secondary font-black block">المرحلة الثانية</span>
                  <h4 className="font-bold text-sm text-foreground mt-1">أئمة القراءات السبعة والعشرة</h4>
                  <p className="text-[10px] text-light-text mt-0.5">التقعيد النظري وكتابة التدوين</p>
                </div>
                <div className="bg-background border border-border dark:border-[#212C2C] p-4 rounded-2xl shadow-sm text-center w-full md:w-auto">
                  <span className="text-[10px] text-brand-secondary font-black block">المرحلة الثالثة</span>
                  <h4 className="font-bold text-sm text-foreground mt-1">عصر تحرير الأداء والمنظومات</h4>
                  <p className="text-[10px] text-light-text mt-0.5">ابن الجزري والشاطبي وغيرهم</p>
                </div>
                <div className="bg-background border border-border dark:border-[#212C2C] p-4 rounded-2xl shadow-sm text-center w-full md:w-auto">
                  <span className="text-[10px] text-brand-secondary font-black block">المرحلة المعاصرة</span>
                  <h4 className="font-bold text-sm text-foreground mt-1">التوثيق والتسجيل الصوتي</h4>
                  <p className="text-[10px] text-light-text mt-0.5">تسجيلات الاستوديوهات ونشر الأسانيد</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </main>
    </PageTransition>
  );
}

const eraLabel = (era: string) => {
  switch (era) {
    case 'quraa10': return 'القراء العشرة ورواتهم';
    case 'companions': return 'الصحابة والتابعون';
    case 'classical': return 'الأئمة المتقدمون';
    case 'modern': return 'القراء المعاصرون';
    default: return 'عام';
  }
};
