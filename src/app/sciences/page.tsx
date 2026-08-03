'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Shield,
  Award,
  Layers,
  Compass,
  Sprout,
  GraduationCap,
  Search,
  Heart,
  MessageSquare,
  Cpu,
  BookMarked
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';

type ScienceCategory = {
  id: string;
  name: string;
  motto: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  badgeColor: string;
  levelsCount: number;
  featuredMatns: string[];
  href: string;
};

const sciencesList: ScienceCategory[] = [
  {
    id: 'tajweed',
    name: 'علم التجويد والقراءات',
    motto: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
    description: 'أشرف العلوم الشرعية غاية، يتعلق بكلام رب العالمين ضبطاً لمخارج الحروف، وتحقيقاً لصفاتها، وتجويداً للألفاظ كما تلقاها الرواة الأثبات بسند متصل.',
    icon: BookOpen,
    accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    badgeColor: 'bg-emerald-100/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    levelsCount: 3,
    featuredMatns: ['تحفة الأطفال', 'المقدمة الجزرية', 'متن السلسبيل الشافي'],
    href: '/sciences/tajweed',
  },
  {
    id: 'tafseer',
    name: 'علم التفسير وعلومه',
    motto: 'كِتَابٌ أَنْزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِيَدَّبَّرُوا آيَاتِهِ',
    description: 'علم يُعنى بفهم كلام الله تعالى واستخراج معانيه وأحكامه وفق قواعد النزول وغريب الألفاظ والتأصيل التفسيري.',
    icon: BookMarked,
    accentColor: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
    badgeColor: 'bg-amber-100/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-500/20',
    levelsCount: 2,
    featuredMatns: ['منظومة الزمزمية', 'كلمات القرآن تفسير وبيان'],
    href: '/sciences/tafseer',
  },
  {
    id: 'hadith',
    name: 'علم الحديث وعلومه',
    motto: 'نَضَّرَ اللَّهُ امْرَأً سَمِعَ مَقَالَتِي فَوَعَاهَا',
    description: 'دراسة سنة النبي ﷺ دراية ورواية، ومعرفة قواعد قبول الأحاديث وردها ورجال الإسناد وشروح المتون النبوية الشريفة.',
    icon: Award,
    accentColor: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
    badgeColor: 'bg-cyan-100/80 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
    levelsCount: 3,
    featuredMatns: ['المنظومة البيقونية', 'منظومة قصب السكر', 'جامع العلوم والحكم'],
    href: '/sciences/hadith-sciences',
  },
  {
    id: 'aqeedah',
    name: 'علم العقيدة والمذاهب والفرق',
    motto: 'فَاعْلَمْ أَنَّهُ لَا إِلَهَ إِلَّا اللَّهُ',
    description: 'تقرير مسائل الإيمان، وإفراد الله تعالى بالعبودية، وتأصيل عقيدة التوحيد ودفع شبهات المذاهب والفرق المنحرفة.',
    icon: Shield,
    accentColor: 'from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400',
    badgeColor: 'bg-orange-100/80 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-500/20',
    levelsCount: 3,
    featuredMatns: ['الخريدة البهية', 'جوهرة التوحيد', 'العقيدة الكبرى للسنوسي'],
    href: '/sciences/aqeedah',
  },
  {
    id: 'fiqh',
    name: 'علم الفقه وأصوله',
    motto: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ',
    description: 'فهم الأحكام الشرعية العملية واستنباطها من أدلتها التفصيلية وفق القواعد الأصولية المرعية لبناء الفهم الفقهي السليم.',
    icon: Layers,
    accentColor: 'from-brand-primary/20 to-emerald-500/10 border-brand-primary/30 text-brand-primary dark:text-[#00B3B7]',
    badgeColor: 'bg-brand-primary-light/80 dark:bg-brand-primary-light/10 text-brand-primary border-brand-primary/20',
    levelsCount: 3,
    featuredMatns: ['متن أبي شجاع', 'الورقات في أصول الفقه', 'مراقي السعود'],
    href: '/sciences/fiqh-sciences',
  },
  {
    id: 'arabic',
    name: 'علم اللغة العربية والبلاغة',
    motto: 'إِنَّا أَنْزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَعَلَّكُمْ تَعْقِلُونَ',
    description: 'مفتاح فهم الكتاب والسنة، يُعنى بضبط قواعد النحو والصرف وتذوق أسرار البلاغة والبيان العربي.',
    icon: Compass,
    accentColor: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400',
    badgeColor: 'bg-purple-100/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-500/20',
    levelsCount: 3,
    featuredMatns: ['نظم الآجرومية', 'ألفية ابن مالك', 'الجوهر المكنون في الثلاثة فنون'],
    href: '/sciences/arabic-language',
  },
  {
    id: 'seerah',
    name: 'علم السيرة النبوية والتاريخ',
    motto: 'لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ',
    description: 'دراسة أحداث السيرة النبوية العطرة وتتبع وقائع التاريخ الإسلامي للاقتداء بالنبي ﷺ واستبصار دروس السيرة.',
    icon: Sprout,
    accentColor: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400',
    badgeColor: 'bg-rose-100/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-500/20',
    levelsCount: 1,
    featuredMatns: ['الأرجوزة المئية في ذكر حال أشرف البرية'],
    href: '/sciences/seerah-history',
  },
  {
    id: 'logic',
    name: 'علم المنطق وصيانة التفكير',
    motto: 'آلَةٌ قَانُونِيَّةٌ تَعْصِمُ ذِهْنَ مُرَاعِيهَا عَنِ الْخَطَأِ',
    description: 'علم معياري يضبط آلات التفكير والاستدلال العقلي والتعاريف والتقاسيم، ويمنع وقوع الذهن في المغالطات.',
    icon: Cpu,
    accentColor: 'from-blue-500/20 to-sky-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
    badgeColor: 'bg-blue-100/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-500/20',
    levelsCount: 1,
    featuredMatns: ['متن السلم المنورق للإمام الأخضري'],
    href: '/sciences/logic',
  },
  {
    id: 'debate',
    name: 'علم أدب البحث والمناظرة',
    motto: 'مُحَاوَرَةٌ لِإِظْهَارِ الْحَقِّ وَدَفْعِ الشُّبَهَاتِ',
    description: 'قواعد الحوار والمناظرة العلمية الرصينة، وضبط آداب البحث وتفنيد الاعتراضات بالبرهان الشرعي والعقلي.',
    icon: MessageSquare,
    accentColor: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400',
    badgeColor: 'bg-teal-100/80 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-500/20',
    levelsCount: 1,
    featuredMatns: ['الرسالة السمرقندية في آداب البحث والمناظرة'],
    href: '/sciences/debate',
  },
  {
    id: 'tazkiyah',
    name: 'علم التصوف والتزكية',
    motto: 'قَدْ أَفْلَحَ مَنْ زَكَّاهَا',
    description: 'تصفية القلوب من أمراض النفوس وتزكيتها بفضائل الأخلاق ومحبة الله ورسوله ﷺ والتخلق بالآداب الشرعية.',
    icon: Heart,
    accentColor: 'from-red-500/20 to-amber-500/10 border-red-500/30 text-red-600 dark:text-red-400',
    badgeColor: 'bg-red-100/80 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-500/20',
    levelsCount: 1,
    featuredMatns: ['قصيدة البردة للإمام البوصيري'],
    href: '/sciences/tazkiyah',
  },
];

export default function SciencesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSciences = sciencesList.filter((sc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sc.name.toLowerCase().includes(q) ||
      sc.description.toLowerCase().includes(q) ||
      sc.featuredMatns.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
        {/* 🌟 الخلفيات الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[750px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* رأس الصفحة مع الهوية */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold mb-4 border border-brand-primary/10">
              <GraduationCap className="w-4 h-4" />
              <span>موسوعة التدرج المنهجي الأصيل</span>
            </div>
            <h1 className="font-amiri text-3xl sm:text-5xl font-bold text-foreground leading-tight">
              دليل العلوم الشرعية ومتون التأسيس
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-3 font-tajawal font-medium leading-relaxed">
              اختر العلم الشرعي الذي ترغب بالارتقاء فيه، واستكشف متونه المنهجية المحددة بدقة دون زيادة.
            </p>

            {/* شريط البحث المباشر */}
            <div className="mt-8 relative max-w-lg mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute right-4 w-4 h-4 text-muted pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن علم، أو متن (مثال: البردة، الزمزمية، البيقونية، الخريدة)..."
                  className="w-full pl-4 pr-11 py-3 bg-card border border-border dark:border-[#212C2C] rounded-2xl text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 text-xs text-muted hover:text-foreground font-bold px-2 py-1"
                  >
                    مسح
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* شبكة العلوم الشرعية الأنيقة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredSciences.map((science, idx) => {
              const Icon = science.icon;
              return (
                <ScrollReveal key={science.id} variant="fade-up" delay={idx * 50}>
                  <div className="group h-full bg-card border border-border dark:border-[#212C2C] p-6 sm:p-7 rounded-[28px] shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                    {/* زخرفة خفيفة في الخلفية */}
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-brand-primary-light/20 dark:bg-brand-primary-light/5 pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                    <div>
                      {/* الترويسة والرمز */}
                      <div className="flex items-center justify-between mb-5">
                        <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${science.accentColor} border shrink-0 transition-transform group-hover:scale-110 duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[11px] font-black px-3 py-1 rounded-full border ${science.badgeColor}`}>
                          {science.levelsCount} {science.levelsCount === 1 ? 'متن معتمد' : 'متون معتمدة'}
                        </span>
                      </div>

                      <h3 className="font-amiri font-bold text-xl text-foreground mb-1 group-hover:text-brand-primary transition-colors">
                        {science.name}
                      </h3>
                      <p className="text-xs font-amiri font-bold text-brand-secondary dark:text-[#E7C682] mb-3">
                        «{science.motto}»
                      </p>
                      <p className="text-xs text-muted leading-relaxed font-tajawal font-medium line-clamp-3 mb-6">
                        {science.description}
                      </p>

                      {/* قائمة المتون المبرزة */}
                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] font-bold text-light-text block">أبرز المتون المقررة:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {science.featuredMatns.map((matn, mIdx) => (
                            <span
                              key={mIdx}
                              className="text-[10px] font-bold text-foreground bg-background border border-border/70 dark:border-[#212C2C] px-2.5 py-1 rounded-lg"
                            >
                              {matn}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* زر الانتقال لمسار العلم */}
                    <Link
                      href={science.href}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary hover:bg-brand-primary hover:text-white border border-brand-primary/10 hover:border-brand-primary text-xs font-bold transition-all duration-300 cursor-pointer shadow-xs group-hover:shadow-premium"
                    >
                      <span>تصفح مسار العلم والمتون</span>
                      <BookOpen className="w-4 h-4" />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}