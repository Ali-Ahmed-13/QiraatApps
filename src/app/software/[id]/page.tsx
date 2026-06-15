import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SoftwareResource } from 'src/types/software';
import AdBanner from 'src/components/layout/AdBanner';
import { ArrowLeft, HardDrive, Info, ShieldCheck, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Helper to query local software dataset
function getSoftwareList(): SoftwareResource[] {
  const filePath = path.join(process.cwd(), 'src/data/softwareData.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

// Generate static routes at build time for optimal load speeds
export async function generateStaticParams() {
  const list = getSoftwareList();
  return list.map((item) => ({
    id: item.id,
  }));
}

// Dynamic Metadata generator for SEO optimization
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const list = getSoftwareList();
  const software = list.find((item) => item.id === resolvedParams.id);

  if (!software) {
    return {
      title: 'التطبيق غير موجود | دليل تطبيقات علوم القرآن',
    };
  }

  return {
    title: `تحميل تطبيق ${software.name} بأحدث إصدار | دليل تطبيقات علوم القرآن`,
    description: software.description.substring(0, 155),
    openGraph: {
      title: `تحميل تطبيق ${software.name} بأحدث إصدار | دليل تطبيقات علوم القرآن`,
      description: software.description.substring(0, 155),
      type: 'website',
    },
  };
}

export default async function SoftwareDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const list = getSoftwareList();
  const software = list.find((item) => item.id === resolvedParams.id);

  if (!software) {
    notFound();
  }

  // Theme category configurations
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'متصفحات الإنترنت':
        return 'from-sky-500/10 to-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'مراسلة وتواصل':
        return 'from-indigo-500/10 to-violet-600/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
      case 'مشغلات الصوت والفيديو':
        return 'from-amber-500/10 to-orange-600/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'برامج مكتبية':
        return 'from-emerald-500/10 to-teal-600/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'تصميم وجرافيك':
        return 'from-pink-500/10 to-rose-600/10 text-pink-600 dark:text-pink-400 border-pink-500/20';
      case 'أدوات المطورين':
        return 'from-violet-500/10 to-purple-600/10 text-violet-600 dark:text-violet-400 border-violet-500/20';
      default:
        return 'from-slate-500/10 to-slate-600/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  const styleClass = getCategoryColor(software.category);
  const classArray = styleClass.split(' ');
  const fromBg = classArray[0];
  const toBg = classArray[1];
  const textCol = classArray[2];
  const fallbackLetter = software.name.trim().charAt(0);

  // Schema.org structured data model
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: software.name,
    operatingSystem: 'Windows, macOS, Linux, Android, iOS',
    applicationCategory:
      software.category === 'متصفحات الإنترنت'
        ? 'BrowserApplication'
        : 'UtilityApplication',
    softwareVersion: software.version,
    fileSize: software.size,
    description: software.description,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      {/* Dynamic JSON-LD structured script injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>العودة للدليل الرئيسي</span>
          </Link>
        </div>

        {/* Top Banner Advertisement Slot */}
        <AdBanner position="top" />

        {/* Dynamic Details Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Column 1: App identity and actions (Desktop Right, Mobile Top) */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
              {/* Trust Badge */}
              <div className="absolute top-3 right-3 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>إصدار رسمي</span>
              </div>

              {/* Large Visual Icon Fallback */}
              <div
                className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${fromBg} ${toBg} flex items-center justify-center font-bold text-3xl border border-slate-100 dark:border-transparent shadow-inner mt-4`}
              >
                <span className={textCol}>{fallbackLetter}</span>
              </div>

              {/* Identity */}
              <h1 className="mt-5 text-xl font-extrabold text-slate-800 dark:text-slate-500 ">
                {software.name}
              </h1>

              {/* Category Badge */}
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/40 dark:border-slate-700/40 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <Tag className="w-3.5 h-3.5" />
                <span>{software.category}</span>
              </div>

              {/* Meta specifications */}
              <div className="w-full mt-6 space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-slate-400" /> الإصدار الرسمي
                  </span>
                  <strong className="text-slate-700 dark:text-slate-200">
                    {software.version}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-slate-400" /> الحجم
                    التقريبي
                  </span>
                  <strong className="text-slate-700 dark:text-slate-200">
                    {software.size}
                  </strong>
                </div>
              </div>

              {/* CTA link to download buffer screen */}
              <Link
                href={`/software/${software.id}/download`}
                className="w-full mt-8 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>الانتقال إلى صفحة التحميل</span>
                <ArrowLeft className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Details Description Block (Desktop Left, Mobile Bottom) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="p-6 md:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-500  mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
                تفاصيل ومميزات البرنامج
              </h2>
              <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>{software.description}</p>
                <p>
                  يعد هذا التطبيق من الخيارات المثالية والأكثر تميزاً في خدمة
                  كتاب الله وعلومه. تم تطويره بلغة Flutter لتقديم أداء مستقر
                  وتجربة مستخدم سلسة على مختلف منصات التشغيل.
                </p>
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4.5 mt-6 flex items-start gap-3 text-xs sm:text-sm text-emerald-800 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold mb-1">تنبيه وملاحظات</h4>
                    <p className="leading-relaxed opacity-90">
                      جميع الروابط والملفات المتوفرة على دليل تطبيقات علوم
                      القرآن يتم توفيرها بشكل مباشر وتدعم التنزيل السهل من
                      مصادرها الرسمية لضمان سلامة بياناتك وخصوصيتك.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Advertisement Slot */}
        <AdBanner position="content" />
      </div>
    </>
  );
}
