import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FileText,
  ArrowRight,
  User,
  Calendar,
  Clock,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Bookmark,
  Share2
} from 'lucide-react';
import { getArticleById, getCategoryLabel, getRelatedArticles } from 'src/utils/articleHelper';
import ArticleReader from 'src/components/articles/ArticleReader';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: 'المقال غير موجود | تِيجَان',
    };
  }

  const titleText = article.title || 'مقال علمي';
  const snippet = article.excerpt || article.content?.substring(0, 150) || 'مقال تأصيلي في العلوم الشرعية والقرآن الكريم.';

  return {
    title: `${titleText} | منصة تِيجَان`,
    description: snippet,
    openGraph: {
      title: titleText,
      description: snippet,
      type: 'article',
      url: `https://tijan.app/articles/${article.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: snippet,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(article.category);
  const relatedArticles = getRelatedArticles(article, 3);
  const titleText = article.title || 'مقال علمي';
  const authorText = article.author || 'لجنة الإشراف العلمي';
  const dateText = article.date || 'شوال 1447 هـ';
  const readTimeText = article.readTime || '5 دقائق';
  const contentText = article.content || article.excerpt || '';

  // البيانات المنظمة (JSON-LD Article Schema) لنتائج جوجل الغنية
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titleText,
    description: article.excerpt || snippetText(contentText),
    author: {
      '@type': 'Person',
      name: authorText,
    },
    publisher: {
      '@type': 'Organization',
      name: 'منصة تِيجَان للعلوم الشرعية',
    },
    datePublished: dateText,
  };

  return (
    <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
      {/* سكريبت SEO المحقون */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* خلفية زخرفية راقية */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[750px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
      </div>

      {/* محتوى المقال مع لوحة إعدادات القراءة الجانبية */}
      <ArticleReader
        article={article}
        categoryLabel={categoryLabel}
        relatedArticles={relatedArticles}
      />
    </main>
  );
}

function snippetText(text: string): string {
  if (!text) return '';
  return text.length > 150 ? `${text.substring(0, 147)}...` : text;
}
