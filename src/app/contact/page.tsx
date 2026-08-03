'use client';

import React from 'react';
import { Mail, MessageSquare, Clock, AlertCircle, Send, Sparkles } from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background text-foreground pb-20 pt-8" dir="rtl">
        
        {/* 🌟 الخلفيات الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[750px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.02),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.05),transparent_60%)]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* رأس الصفحة مع الهوية */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/10 bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold mb-4">
              <Mail className="w-4 h-4 text-brand-secondary" />
              <span>تواصل مباشر ودعم علمي وفني</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-amiri leading-tight">
              اتصل بنا وقدم مقترحاتك
            </h1>
            <p className="mt-4 text-xs sm:text-sm text-muted max-w-xl mx-auto leading-relaxed font-tajawal font-medium">
              يسعدنا تواصلكم معنا. سواء كنت ترغب في اقتراح تطبيق قرآني جديد، التبليغ عن خطأ صوتي في التلاوات، أو التعاون العلمي معنا لتطوير المنصة.
            </p>
          </div>

          {/* الكروت التفاعلية للتواصل */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-10">
            
            {/* بطاقة واتساب */}
            <ScrollReveal variant="fade-left" delay={100}>
              <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-5 h-full">
                <div className="p-3.5 rounded-2xl bg-emerald-100/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 w-fit shrink-0">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-foreground text-base sm:text-lg">
                    تواصل عبر الواتساب السريع
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mt-2 font-medium">
                    يمكنك مراسلتنا مباشرة عبر الواتساب لإرسال الملاحظات الصوتية والمقترحات الفنية بشكل أسرع لغرفة المراجعة.
                  </p>
                </div>
                <a
                  href="https://wa.me/201148437458"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs sm:text-sm font-bold shadow-premium transition-all mt-auto cursor-pointer"
                >
                  مراسلة فورية عبر الواتساب
                </a>
              </div>
            </ScrollReveal>

            {/* بطاقة البريد الإلكتروني */}
            <ScrollReveal variant="fade-right" delay={150}>
              <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-5 h-full">
                <div className="p-3.5 rounded-2xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary w-fit shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-foreground text-base sm:text-lg">
                    البريد الإلكتروني المباشر
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mt-2 font-medium">
                    ارسل لنا رسالة إلكترونية رسمية وسيقوم فريق التنسيق العلمي والدعم بالرد عليك في غضون 24 ساعة عمل.
                  </p>
                </div>
                <a
                  href="mailto:alio123alio1239o@gmail.com"
                  className="w-full text-center py-3 rounded-xl border border-border hover:border-brand-primary hover:bg-brand-primary-light/35 text-foreground text-xs sm:text-sm font-bold transition-all mt-auto break-all cursor-pointer"
                >
                  alio123alio1239o@gmail.com
                </a>
              </div>
            </ScrollReveal>

          </div>

          {/* التنبيه العلمي وساعات الدعم */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            
            {/* التنبيه الهام */}
            <ScrollReveal variant="fade-up" delay={200}>
              <div className="p-5 rounded-2xl border border-dashed border-brand-secondary/30 bg-brand-secondary-light/35 dark:bg-brand-secondary-light/5 flex flex-col gap-3 h-full">
                <div className="flex items-center gap-2 text-brand-secondary">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  <h4 className="font-bold text-xs sm:text-sm">ملاحظة هامة للمدققين والمرسلين:</h4>
                </div>
                <p className="text-[11px] sm:text-xs text-muted leading-relaxed text-justify font-medium">
                  عند التبليغ عن خطأ صوتي في تلاوات المصاحف، يرجى تزويدنا باسم التطبيق، اسم القارئ، اسم السورة، ورقم الآية بدقة لتمكين لجنة التدقيق العلمي من مراجعة التسجيل ومعالجته بسرعة.
                </p>
              </div>
            </ScrollReveal>

            {/* ساعات الدعم */}
            <ScrollReveal variant="fade-up" delay={250}>
              <div className="p-5 rounded-2xl border border-border bg-card shadow-premium flex flex-col justify-center gap-2 h-full text-right">
                <div className="flex items-center gap-2 text-brand-primary mb-1">
                  <Clock className="w-4.5 h-4.5" />
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">ساعات المراجعة والدعم</h4>
                </div>
                <p className="text-[11px] sm:text-xs text-muted font-medium">
                  نعمل على مدار أيام الأسبوع لمراجعة اقتراحاتكم العلمية وتدقيق البرمجيات لضمان مطابقتها لأعلى معايير الإتقان.
                </p>
                <span className="text-[11px] font-black text-brand-secondary dark:text-[#E7C682] mt-1">
                  السبت - الخميس (8:00 صباحاً - 6:00 مساءً)
                </span>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </main>
    </PageTransition>
  );
}
