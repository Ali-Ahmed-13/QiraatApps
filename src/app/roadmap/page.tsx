'use client';

import React from 'react';
import {
  Milestone,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ChevronLeft,
  Sprout,
  Layers,
  Award,
  LucideIcon
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import roadmapPageData from '@/data/roadmapPageData.json';
import { RoadmapStep } from 'src/types/roadmapPage';

const iconMap: Record<string, LucideIcon> = {
  Sprout,
  Layers,
  Award,
};

const steps = roadmapPageData as RoadmapStep[];

export default function RoadmapPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
        
        {/* 🌟 الخلفيات الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[750px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* رأس الصفحة مع الهوية */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold mb-4 border border-brand-primary/10">
              <Milestone className="w-3.5 h-3.5" />
              <span>طريق الارتقاء في مراقي العلم الشرعي</span>
            </div>
            <h1 className="font-amiri text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              خريطة التدرّج العلمي المنهجية
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-3 font-tajawal font-medium leading-relaxed">
              إن العلم عقبة كأود لا يرتقى إليها دفعة واحدة، وإنما يبلغ مرامه بالتدرج المبرمج والأخذ بـ أصول المتون خطوة بخطوة. استكشف معالم رحلتك الدراسية عبر المنصة.
            </p>
          </div>

          {/* المسار المنهجي بالتخطيط الرأسي الفاخر */}
          <div className="relative border-r-2 border-border dark:border-[#212C2C] mr-4 sm:mr-8 pr-6 sm:pr-10 py-4 flex flex-col gap-16 max-w-4xl mx-auto">
            
            {steps.map((step, idx) => {
              const Icon = iconMap[step.iconName] || Milestone;
              return (
                <div key={step.id} id={step.id} className="relative text-right">
                  
                  {/* نقطة الدائرة على المخطط الزمني */}
                  <div className={`absolute right-[-37px] sm:right-[-53px] top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 bg-card flex items-center justify-center ${step.color} shadow-sm z-10 transition-transform duration-500 hover:scale-110`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <ScrollReveal variant={idx % 2 === 0 ? 'fade-left' : 'fade-right'} delay={100}>
                    <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium hover:shadow-premium-hover transition-all duration-300">
                      
                      {/* ترويسة المرحلة */}
                      <div className="flex flex-col gap-2.5 mb-5 pb-4 border-b border-border/60 dark:border-[#212C2C]/60">
                        <span className="text-[10px] text-brand-secondary dark:text-[#E7C682] font-black">{step.tag}</span>
                        <h3 className="font-amiri font-bold text-xl sm:text-2xl text-foreground">
                          {step.title}
                        </h3>
                      </div>

                      {/* الوصف المنهجي */}
                      <p className="text-xs sm:text-sm text-muted leading-relaxed font-tajawal font-medium mb-6 text-justify">
                        {step.description}
                      </p>

                      {/* نقاط التحصيل الأساسية */}
                      <div className="flex flex-col gap-3 mb-6">
                        <h4 className="text-xs sm:text-sm font-bold text-brand-primary dark:text-[#00B3B7]">أبرز معالم التحصيل في هذه المرحلة:</h4>
                        <ul className="flex flex-col gap-2.5">
                          {step.points.map((pt, ptIdx) => (
                            <li key={ptIdx} className="flex items-start gap-2 text-xs sm:text-sm text-muted font-semibold">
                              <CheckCircle2 className="w-4.5 h-4.5 text-brand-primary shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* كتب ومقررات المرحلة الموصى بها */}
                      <div className="border-t border-border/40 dark:border-[#212C2C]/40 pt-5">
                        <span className="text-[11px] text-light-text font-bold block mb-3">أهم المقررات المتوفرة بالمنصة:</span>
                        <div className="flex flex-wrap gap-2">
                          {step.books.map((bk, bkIdx) => (
                            <span key={bkIdx} className="inline-flex items-center gap-1 text-[11px] font-bold text-foreground bg-background border border-border/80 dark:border-[#212C2C]/80 px-3 py-1.5 rounded-xl">
                              <Bookmark className="w-3.5 h-3.5 text-brand-secondary" />
                              <span>{bk}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* زر البدء في هذه المرحلة */}
                      <div className="mt-8 flex justify-end">
                        <a
                          href="/sciences"
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all shadow-premium"
                        >
                          <span>ابدأ الدراسة في هذه المرحلة</span>
                          <ArrowLeft className="w-4 h-4" />
                        </a>
                      </div>

                    </div>
                  </ScrollReveal>

                </div>
              );
            })}

          </div>

          {/* قسم الدعم والتوجيه الشخصي */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-20 bg-brand-primary-light/40 dark:bg-brand-primary-light/5 border border-brand-primary/10 rounded-[28px] p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-sm">
              <Sparkles className="w-8 h-8 text-brand-secondary mx-auto mb-4" />
              <h3 className="font-amiri font-bold text-xl text-foreground mb-2">هل تحتاج لمساعدة في تحديد مستواك؟</h3>
              <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed font-medium">
                إذا كنت طالباً جديداً وتائهًا في تحديد الفن أو المرحلة المناسبة للبدء، يمكنك التواصل مع المشرفين المنهجيين للمنصة للحصول على توجيه مخصص ومجاني.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs sm:text-sm font-bold shadow-premium"
              >
                <span>تواصل مع المشرف المنهجي</span>
                <ChevronLeft className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </PageTransition>
  );
}
