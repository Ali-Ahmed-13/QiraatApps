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
import FatwaReader from 'src/components/fatwas/FatwaReader';

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

      {/* محتوى الفتوى مع لوحة إعدادات القراءة الجانبية */}
      <FatwaReader
        fatwa={fatwa}
        categoryLabel={categoryLabel}
        relatedFatwas={relatedFatwas}
      />
    </main>
  );
}
