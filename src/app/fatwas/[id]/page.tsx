import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  HelpCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { getFatwaById, getCategoryLabel, getSmartRelatedFatwas } from 'src/utils/fatwaHelper';
import FatwaActions from 'src/components/fatwas/FatwaActions';

interface FatwaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: FatwaPageProps): Promise<Metadata> {
  const { id } = await params;
  const fatwa = getFatwaById(id);

  if (!fatwa) {
    return {
      title: 'الفتوى غير موجودة | تِيجَان',
    };
  }

  const answerText = fatwa.answer || '';
  const questionText = fatwa.question || 'فتوى شرعية';
  const snippet = answerText.length > 160 ? `${answerText.substring(0, 157)}...` : answerText;

  return {
    title: `فتوى: ${questionText} | منصة تِيجَان`,
    description: snippet,
    openGraph: {
      title: questionText,
      description: snippet,
      type: 'article',
      url: `https://tijan.app/fatwas/${fatwa.id}`,
    },
    twitter: {
      card: 'summary',
      title: questionText,
      description: snippet,
    },
  };
}

export default async function FatwaDetailPage({ params }: FatwaPageProps) {
  const { id } = await params;
  const fatwa = getFatwaById(id);

  if (!fatwa) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(fatwa.category);
  const relatedFatwas = getSmartRelatedFatwas(fatwa, 3);
  const questionText = fatwa.question || 'مسألة شرعية';
  const answerText = fatwa.answer || '';
  const referenceText = fatwa.reference || 'لجنة الإشراف العلمي';

  // البيانات المنظمة (JSON-LD Structured Data QAPage / FAQPage) لنتائج جوجل الغنية
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: questionText,
      text: questionText,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answerText,
        author: {
          '@type': 'Organization',
          name: referenceText,
        },
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
      {/* سكريبت البيانات المنظمة محقونة للـ SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* خلفية زخرفية ناعمة */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[700px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* 🌟 1. مسار التنقل العلوي (Breadcrumbs) والعودة */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link href="/fatwas" className="hover:text-brand-primary transition-colors">
              أرشيف الفتاوى والمسائل
            </Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-bold truncate max-w-[200px] sm:max-w-xs">
              مسألة {fatwa.id}
            </span>
          </nav>

          <Link
            href="/fatwas"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border dark:border-[#212C2C] hover:bg-border/20 text-foreground text-xs font-bold transition-all shadow-xs"
          >
            <ArrowRight className="w-4 h-4 text-brand-primary" />
            <span>العودة لأرشيف الفتاوى</span>
          </Link>
        </div>

        {/* 🌟 2. بطاقة الفتوى الرئيسية الفاخرة */}
        <article className="bg-card border border-border dark:border-[#212C2C] rounded-[28px] p-6 sm:p-10 shadow-premium mb-12">
          
          {/* شارات الهوية والتصنيف */}
          <div className="flex items-center justify-between gap-4 mb-6 border-b border-border/50 dark:border-[#212C2C]/50 pb-5">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold border border-brand-primary/10 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                <span>{categoryLabel}</span>
              </span>
              <span className="text-[11px] font-bold text-light-text bg-border/20 dark:bg-[#212C2C]/50 px-2.5 py-1 rounded-lg">
                مسألة {fatwa.id}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>فتوى محررة ومراجعة</span>
            </div>
          </div>

          {/* نص السؤال */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary-light dark:bg-brand-primary-light/10 text-brand-primary flex items-center justify-center shrink-0 mt-1 shadow-sm">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-primary dark:text-[#00B3B7] block mb-1">
                السؤال والمسألة الشرعية:
              </span>
              <h1 className="font-amiri text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                {fatwa.question}
              </h1>
            </div>
          </div>

          {/* نص الجواب المحرر */}
          <div className="bg-background/50 dark:bg-[#0B0E0E]/40 border border-border/80 dark:border-[#212C2C]/80 rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-brand-primary rounded-r-2xl" />
            
            <h2 className="text-xs font-bold text-muted mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-secondary" />
              <span>الجواب والتحقيق العلمي:</span>
            </h2>

            <p className="font-tajawal font-medium text-base sm:text-lg text-foreground leading-relaxed whitespace-pre-line">
              {fatwa.answer}
            </p>

            {/* المصدر والتوثيق */}
            <div className="mt-8 pt-4 border-t border-border/40 dark:border-[#212C2C]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted font-bold">
              <div className="flex items-center gap-2 text-brand-secondary font-bold">
                <BookOpen className="w-4 h-4" />
                <span>المصدر العلمي: {fatwa.reference}</span>
              </div>
              <span className="text-[11px] text-light-text font-medium">
                تم التحرير بواسطة لجنة الإشراف العلمي
              </span>
            </div>
          </div>

          {/* أفعال المشاركة والنسخ */}
          <FatwaActions fatwa={fatwa} />
        </article>

        {/* 🌟 3. قسم الفتاوى ذات الصلة الذكية (Smart Related Fatwas) */}
        {relatedFatwas.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-brand-secondary" />
              <h2 className="font-amiri font-bold text-xl sm:text-2xl text-foreground">
                مسائل وفتاوى ذات صلة
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedFatwas.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/fatwas/${rel.id}`}
                  className="group bg-card border border-border dark:border-[#212C2C] hover:border-brand-primary/40 rounded-2xl p-5 shadow-xs hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/40 dark:bg-brand-primary-light/10 px-2.5 py-1 rounded-md mb-3 inline-block">
                      {getCategoryLabel(rel.category)}
                    </span>
                    <h3 className="font-amiri font-bold text-base text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug mb-3">
                      {rel.question}
                    </h3>
                    <p className="text-xs text-muted line-clamp-2 font-medium leading-relaxed mb-4">
                      {rel.answer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-brand-primary dark:text-[#00B3B7] pt-3 border-t border-border/40 dark:border-[#212C2C]/40">
                    <span>عرض التحقيق</span>
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 🌟 4. بطاقة السؤال المباشر والتواصل */}
        <div className="bg-brand-primary-light/30 dark:bg-brand-primary-light/5 border border-brand-primary/10 rounded-[28px] p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-sm">
          <HelpCircle className="w-8 h-8 text-brand-primary mx-auto mb-3" />
          <h3 className="font-amiri font-bold text-xl text-foreground mb-2">
            لم تجد إجابة مسألتك الفقهية؟
          </h3>
          <p className="text-xs sm:text-sm text-muted mb-6 leading-relaxed font-medium">
            يمكنك تدوين سؤالك وإرساله مباشرة إلى لجنة التدقيق العلمي بمنصة تِيجَان للحصول على جواب محرّر بالدليل والمصدر.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs sm:text-sm font-bold shadow-premium transition-all"
          >
            <span>أرسل مسألتك الآن</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Link>
        </div>

      </div>
    </main>
  );
}
