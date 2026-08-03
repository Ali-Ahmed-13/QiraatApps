'use client';

import Link from 'next/link';
import {
  BookOpen,
  Compass,
  GraduationCap,
  Award,
  Layers,
  Sprout,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BookMarked,
  Milestone,
  FileText,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';

export default function Home() {
  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground font-tajawal pb-24 transition-colors duration-500">
        
        {/* 🌟 الخلفيات الهندسية والزخارف الإسلامية العائمة بتأثير بارالكس هادئ */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* التوهجات اللونية الفاخرة */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.04),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.08),transparent_60%)] blur-3xl" />
          <div className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle_at_center,rgba(216,177,92,0.03),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(231,198,130,0.06),transparent_60%)] blur-3xl animate-float-slow" />
          
          {/* خطوط شبكية ناعمة للغاية */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 dark:opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
        </div>

        {/* 1. قسم البطل (Hero Section) */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* شارة الترحيب اللطيفة */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold mb-8 border border-brand-primary/10 animate-pulse-soft">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
              <span>بوابتك للتأصيل الشرعي الرصين وتيسير العلم</span>
            </div>

            {/* العنوان الرئيسي بخط أميري كاليجرافي */}
            <h1 className="font-amiri text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight max-w-5xl mx-auto">
              تِيجَان <span className="text-brand-primary font-normal">•</span> مَنَارَةُ الطَّالِبِ فِي مَرَاقِي العِلْمِ الشَّرْعِيِّ
            </h1>

            {/* الوصف المنهجي الشيق والعميق */}
            <p className="max-w-3xl mx-auto mt-8 text-base sm:text-lg lg:text-xl text-muted leading-relaxed font-tajawal font-medium">
              إنَّ العِلْمَ الشَّرْعِيَّ عَقَبَةٌ كَأُودٌ، لَا يُرْتَقَى إِلَى ذُرْوَتِهَا إِلَّا بِالسَّيْرِ عَلَى سَنَنِ التَّدَرُّجِ المَنْهَجِيِّ الأَصِيلِ؛ يُبْدَأُ فِيهِ بِغَرْسِ أُصُولِ المُتُونِ المُخْتَصَرَةِ لِتَكُونَ رَاسِخَةً فِي الأَذْهَانِ، ثُمَّ التَّرَقِّي إِلَى شُرُوحِهَا المُتَوَسِّطَةِ، انْتِهَاءً بِالغَوْصِ فِي المَطْوَلَاتِ المَبْسُوطَةِ. نُمَهِّدُ لَكَ هَذِهِ المَرَاقِي بِأَدَوَاتٍ حَدِيثَةٍ تَجْمَعُ بَيْنَ أَصَالَةِ المَنْهَجِ وَسَلاسَةِ التَّحْصِيلِ.
            </p>

            {/* أزرار الإجراء السريعة (CTAs) */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link
                href="/sciences"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white dark:text-white font-bold shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              >
                <GraduationCap className="w-5 h-5" />
                <span>ابدأ رحلتك التعليمية</span>
              </Link>
              
              <Link
                href="/books"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-border hover:border-brand-primary bg-card hover:bg-brand-primary-light/35 text-brand-primary dark:text-foreground font-bold hover:-translate-y-0.5 transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
              >
                <BookOpen className="w-5 h-5" />
                <span>تصفح خزانة الكتب</span>
              </Link>
            </div>

          </div>
        </section>

        {/* 2. قسم فلسفة التدرج المنهجي (Learning Philosophy) */}
        <section className="relative py-20 border-t border-border bg-[#FCFBF8]/60 dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="font-amiri text-3xl sm:text-4xl font-bold text-foreground">
                فَلْسَفَةُ التَّدَرُّجِ المَنْهَجِيِّ فِي تِيجَان
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-muted max-w-xl mx-auto font-tajawal font-bold">
                طريق العلم يبدأ بغرس النواةِ، ويرتقي في مدارج الفهمِ والتفصيلِ، وينتهي بتمكين الملكةِ الراسخةِ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              
              {/* خط التوصيل بين المراحل */}
              <div className="hidden md:block absolute top-[28%] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent -z-10" />

              {/* المرحلة 1: التأسيس */}
              <ScrollReveal variant="fade-up" delay={0}>
                <div className="group bg-card border border-border rounded-[24px] p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 hover:border-brand-primary/20 transition-all duration-500 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-primary-light dark:bg-brand-primary-light/10 flex items-center justify-center text-brand-primary mb-6 group-hover:rotate-6 transition-transform duration-300">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <h3 className="font-amiri text-xl font-bold text-foreground mb-2">مرحلة التأسيس</h3>
                    <p className="text-xs text-brand-secondary dark:text-[#E7C682] font-black mb-4">غرس الأصول وحفظ المتون المختصرة</p>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed font-medium">
                      البداية المنهجية التي لا غنى عنها؛ تركز على حفظ المتون الصغرى المعتمدة وفهم كليات العلم إجمالاً، لترسيخ القواعد الأساسية في صدر الطالب كالأرضية الصلبة.
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2.5 border-t border-border/80 dark:border-[#212C2C] pt-4">
                    <li className="flex items-center gap-2 text-xs text-muted font-bold">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>تلقي المتون الأولية كـ (تحفة الأطفال)</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted font-bold">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>التركيز على صحة القراءة والضبط إجمالاً</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* المرحلة 2: الترقية */}
              <ScrollReveal variant="fade-up" delay={100}>
                <div className="group bg-card border border-border rounded-[24px] p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 hover:border-brand-primary/20 transition-all duration-500 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-primary-light dark:bg-brand-primary-light/10 flex items-center justify-center text-brand-primary mb-6 group-hover:rotate-6 transition-transform duration-300">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="font-amiri text-xl font-bold text-foreground mb-2">مرحلة الترقية</h3>
                    <p className="text-xs text-brand-secondary dark:text-[#E7C682] font-black mb-4">توسيع المدارك وفهم الشروح المتوسطة</p>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed font-medium">
                      الارتقاء بالطالب نحو تفصيل المسائل والتعليلات العلمية، من خلال دراسة الشروح المتوسطة التي تجمع الأدلة وتبين الوجوه، ليتجاوز الطالب عتبة التلقي المجرد إلى الاستدلال.
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2.5 border-t border-border/80 dark:border-[#212C2C] pt-4">
                    <li className="flex items-center gap-2 text-xs text-muted font-bold">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>دراسة شروح المنظومات كـ (الجزرية)</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted font-bold">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>فهم علل المسائل وحججها التفصيلية</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* المرحلة 3: التمكين */}
              <ScrollReveal variant="fade-up" delay={200}>
                <div className="group bg-card border border-border rounded-[24px] p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 hover:border-brand-primary/20 transition-all duration-500 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-primary-light dark:bg-brand-primary-light/10 flex items-center justify-center text-brand-primary mb-6 group-hover:rotate-6 transition-transform duration-300">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-amiri text-xl font-bold text-foreground mb-2">مرحلة التمكين</h3>
                    <p className="text-xs text-brand-secondary dark:text-[#E7C682] font-black mb-4">بناء الملكة الشرعية والمطولات</p>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed font-medium">
                      الغوص في لجج المطولات الشرعية ومقارنة الوجوه والمذاهب، ومناقشة الدقائق والحواشي والمنظومات الكبرى كـ (الشاطبية)، لتهيئة طالب علم راسخ ذي ملكة نقدية مستقلة.
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2.5 border-t border-border/80 dark:border-[#212C2C] pt-4">
                    <li className="flex items-center gap-2 text-xs text-muted font-bold">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>التمكن من المذاهب الكبرى والمنظومات الطوال</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted font-bold">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>بناء القدرة على الترجيح والتحقيق العلمي</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* 3. أركان المنصة الأساسية (Core Platform Pillars) */}
        <section className="relative py-20 border-t border-border/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="font-amiri text-3xl sm:text-4xl font-bold text-foreground">
                أَرْكَانُ مَنَصَّتِنَا الأَسَاسِيَّةُ
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-muted max-w-xl mx-auto font-tajawal font-bold">
                نجمع لك بين بصرية المنهج وتسهيله، وبين هدوء المطالعة وتحقيق الكتب
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* الركن الأول: خرائط التعلم */}
              <ScrollReveal variant="fade-left">
                <div className="group relative bg-card border border-border rounded-[28px] p-8 md:p-10 shadow-premium hover:shadow-premium-hover transition-all duration-500 flex flex-col justify-between h-full hover:border-brand-primary/10">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary-light dark:bg-brand-primary-light/10 flex items-center justify-center text-brand-primary mb-8 group-hover:scale-105 transition-transform duration-300">
                      <Compass className="w-8 h-8" />
                    </div>
                    <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      خرائط التعلم والعلوم الإسلامية
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 font-medium">
                      مسارات منهجية بصرية مصممة لتبسيط طريق التحصيل. نمضي معك خطوة بخطوة في دراسة العلوم الإسلامية واللغوية كالتجويد والعقيدة والعربية، عبر مستويات مبرمجة، ودروس مساندة، وتدريبات واختبارات لتقييم الحفظ والاستيعاب.
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-primary mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-muted font-semibold">خطط دراسية مقسمة حسب التدرج العلمي للمتون</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-primary mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-muted font-semibold">اختبارات ذاتية لقياس مدى استيعاب المتن إلكترونياً</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      href="/sciences"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-primary-hover transition-all border-b border-brand-primary/20 pb-0.5 cursor-pointer"
                    >
                      <span>ابدأ استكشاف مسارات العلوم</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* الركن الثاني: خزانة الكتب */}
              <ScrollReveal variant="fade-right">
                <div className="group relative bg-card border border-border rounded-[28px] p-8 md:p-10 shadow-premium hover:shadow-premium-hover transition-all duration-500 flex flex-col justify-between h-full hover:border-brand-primary/10">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary-light dark:bg-brand-primary-light/10 flex items-center justify-center text-brand-primary mb-8 group-hover:scale-105 transition-transform duration-300">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      خزانة الكتب والمنظومات المحققة
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 font-medium">
                      محيط قراءة هادئ مخصص لطالب العلم المحقق. نقدم مكتبة رقمية تضم المتون العلمية المحققة والشروحات والمقررات الأساسية مع قارئ PDF مدمج ومتطور ومحسّن للقراءة الطويلة دون مشتتات أو إعلانات، مع إمكانية حفظ علامات القراءة.
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-primary mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-muted font-semibold">نصوص محققة ومقابلة على أمهات النسخ والخطوط</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-primary mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-muted font-semibold">حفظ ذكي لموضع القراءة للعودة والمتابعة لاحقاً</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-primary-hover transition-all border-b border-brand-primary/20 pb-0.5 cursor-pointer"
                    >
                      <span>ادخل خزانة الكتب الرقمية</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* 4. كيف تدرس في تيجَان؟ (How to Study Step-by-Step) */}
        <section className="relative py-20 border-t border-border bg-[#FCFBF8]/60 dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="font-amiri text-3xl sm:text-4xl font-bold text-foreground">
                كَيْفَ تَدْرُسُ فِي مَنَصَّةِ تِيجَان؟
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-muted max-w-xl mx-auto font-tajawal font-bold">
                ثلاثة معالم واضحة تسلكها لتبلغ الغاية وتكلل رحلتك بالتاج
              </p>
            </div>

            <div className="relative">
              {/* خط التوصيل للمخطط الزمني */}
              <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent -translate-y-1/2 -z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* الخطوة 1 */}
                <ScrollReveal variant="fade-up" delay={0}>
                  <div className="bg-card border border-border rounded-[24px] p-8 relative shadow-premium text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shadow-premium">
                      ١
                    </div>
                    <div className="pt-4 flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center mx-auto">
                        <Milestone className="w-5 h-5" />
                      </div>
                      <h3 className="font-amiri text-lg font-bold text-foreground">اختر مسارك وتخصصك</h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed font-medium">
                        تصفح خرائط العلوم الشرعية واللغوية المتاحة، وحدد الفن الذي ترغب في البدء به وتأصيله كعلم التجويد أو العربية، وتعرف على خطته التفصيلية.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* الخطوة 2 */}
                <ScrollReveal variant="fade-up" delay={100}>
                  <div className="bg-card border border-border rounded-[24px] p-8 relative shadow-premium text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shadow-premium">
                      ٢
                    </div>
                    <div className="pt-4 flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center mx-auto">
                        <BookMarked className="w-5 h-5" />
                      </div>
                      <h3 className="font-amiri text-lg font-bold text-foreground">افتح المتن والمقرر</h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed font-medium">
                        ادخل إلى المكتبة المنهجية الموثقة، واقرأ المتن العلمي المعتمد أو شرحه المقرر مباشرة وبكل سكينة وهدوء عبر قارئ الكتب المدمج والخاص بنا.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* الخطوة 3 */}
                <ScrollReveal variant="fade-up" delay={200}>
                  <div className="bg-card border border-border rounded-[24px] p-8 relative shadow-premium text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shadow-premium">
                      ٣
                    </div>
                    <div className="pt-4 flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center mx-auto">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <h3 className="font-amiri text-lg font-bold text-foreground">تابع تقدّمك التحصيلي</h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed font-medium">
                        تابع تقدمك خطوة بخطوة في المستويات المرتبة، واستمع إلى الدروس المرافقة لكل باب علمي، واجتاز الاختبارات لتظفر بالشهادة والوسام التمكيني.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

              </div>
            </div>

            {/* تذييل تشجيعي مع اقتباس رصين */}
            <div className="mt-16 text-center max-w-2xl mx-auto border-t border-border pt-8">
              <p className="font-amiri text-lg sm:text-xl italic text-brand-secondary dark:text-[#E7C682] leading-relaxed">
                &quot;العِلْمُ صَيْدٌ وَالكِتَابَةُ قَيْدُهُ، فَقَيِّدْ صُيُودَكَ بِالحِبَالِ الوَاثِقَةِ&quot;
              </p>
              <p className="text-[10px] text-light-text mt-2 font-bold">— الإمام الشافعي رحمه الله</p>
            </div>

          </div>
        </section>

      </main>
    </PageTransition>
  );
}
