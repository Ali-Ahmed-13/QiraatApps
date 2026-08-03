'use client';

import React, { useState } from 'react';
import {
  PenTool,
  Clock,
  BookMarked,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import arabicLanguageData from '@/data/arabicLanguageData.json';
import { ArabicLanguageData } from 'src/types/arabicLanguage';

const data = arabicLanguageData as ArabicLanguageData;

export default function ArabicLanguagePage() {
  const [activeTab, setActiveTab] = useState<'nahw' | 'sarf' | 'balaghah'>('nahw');

  const activeTrack = data[activeTab];

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
        
        {/* 🌟 الخلفيات الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[700px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* رأس الصفحة مع الهوية */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold mb-4 border border-brand-primary/10">
              <PenTool className="w-3.5 h-3.5" />
              <span>لسان عربي مبين • بوابة اللغة العربية</span>
            </div>
            <h1 className="font-amiri text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              بوابة علوم اللغة العربية وآدابها
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-3 font-tajawal font-medium leading-relaxed">
              إن فهم كتاب الله وسنة رسوله ﷺ يرتكز أساساً على التمكن من لسان العرب. نقدم مسارات تعليمية متكاملة لعلوم النحو والصرف والبلاغة لتيسير بناء الملكة اللغوية.
            </p>
          </div>

          {/* تبويبات التخصصات اللغوية */}
          <div className="flex justify-center gap-3 mb-12">
            <div className="bg-card border border-border dark:border-[#212C2C] p-1.5 rounded-2xl shadow-premium flex items-center gap-2">
              <button
                onClick={() => setActiveTab('nahw')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'nahw' ? 'bg-brand-primary text-white shadow-premium' : 'text-muted hover:text-foreground'
                }`}
              >
                علم النحو (Syntax)
              </button>
              <button
                onClick={() => setActiveTab('sarf')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'sarf' ? 'bg-brand-primary text-white shadow-premium' : 'text-muted hover:text-foreground'
                }`}
              >
                علم الصرف (Morphology)
              </button>
              <button
                onClick={() => setActiveTab('balaghah')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'balaghah' ? 'bg-brand-primary text-white shadow-premium' : 'text-muted hover:text-foreground'
                }`}
              >
                علم البلاغة (Rhetoric)
              </button>
            </div>
          </div>

          {/* تفاصيل التخصص والمسار الحالي */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-16">
            
            {/* الشرح التأسيسي */}
            <div className="lg:col-span-1 bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center shrink-0 border border-brand-primary/10">
                <BookMarked className="w-6 h-6" />
              </div>
              <div className="text-right">
                <h3 className="font-amiri font-bold text-xl sm:text-2xl text-foreground mb-3">
                  {activeTrack.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed font-tajawal font-medium">
                  {activeTrack.description}
                </p>
              </div>
              
              <div className="border-t border-border/60 dark:border-[#212C2C]/60 pt-4 flex flex-col gap-2.5 text-xs text-muted font-semibold">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-primary" /> التدرج من الصفر للمستويات الكبرى</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-primary" /> ربط القواعد اللغوية بشواهد القرآن الكريم</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-primary" /> تدريبات عملية وتطبيقات إعرابية تفاعلية</div>
              </div>
            </div>

            {/* المستويات الثلاثة للمسار */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {activeTrack.levels.map((level, idx) => (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 100}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 rounded-[22px] shadow-premium flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group hover:-translate-y-0.5 transition-all duration-300">
                    <div className="text-right flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary flex items-center justify-center shrink-0 border border-brand-secondary/15 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-amiri font-bold text-lg text-foreground group-hover:text-brand-primary transition-colors">
                            {level.name}
                          </h4>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                            level.status === 'تأسيسي'
                              ? 'bg-emerald-100/50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-500/25'
                              : level.status === 'ترقية'
                              ? 'bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary border-brand-primary/10'
                              : 'bg-brand-secondary-light dark:bg-brand-secondary-light/10 text-brand-secondary border-brand-secondary/15'
                          }`}>
                            {level.status}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted mt-2 font-tajawal font-medium leading-relaxed">
                          {level.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full sm:w-auto border-t sm:border-t-0 border-border/40 dark:border-[#212C2C]/40 pt-4 sm:pt-0 gap-6">
                      <span className="text-[11px] text-light-text font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {level.duration}</span>
                      <button className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all cursor-pointer">
                        تصفح المسار
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>

          {/* قسم الأهمية الشرعية للغة العربية */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="bg-brand-secondary-light/35 dark:bg-brand-secondary-light/5 border border-brand-secondary/15 rounded-[28px] p-8 sm:p-10 text-center max-w-4xl mx-auto shadow-sm">
              <Sparkles className="w-8 h-8 text-brand-secondary mx-auto mb-4" />
              <h3 className="font-amiri font-bold text-2xl text-foreground mb-4">أهمية تعلم لغة الضاد في دراسة القرآن</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-tajawal font-medium max-w-3xl mx-auto mb-6 text-justify sm:text-center">
                يقول الإمام الشافعي رحمه الله: &quot;ما جَهِلَ الناسُ ولا اختلفوا إلا لِتركِهِم لسانَ العربِ وميلِهِم إلى لسانِ أرسطاطاليس&quot;. إن إتقان النحو وفقه اللغة يجنب القارئ اللحن الجلي والخفي، ويفتح له أبواب تدبر الإعجاز القرآني وفهم مقاصد كلام رب العالمين.
              </p>
              <div className="inline-flex items-center gap-2 text-brand-primary text-xs font-bold font-sans">
                <Award className="w-4 h-4" />
                <span>جميع المتون والشروح متوفرة صوتياً ومقروءاً بالمكتبة</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </PageTransition>
  );
}
