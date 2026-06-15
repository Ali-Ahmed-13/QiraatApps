import fs from 'fs';
import path from 'path';
import { SoftwareResource } from 'src/types/software';
import SoftwareGrid from 'src/components/software/SoftwareGrid';
import AdBanner from 'src/components/layout/AdBanner';
import { ShieldCheck, Zap } from 'lucide-react';

// Server component helper to read data
function getSoftwareData(): SoftwareResource[] {
  const filePath = path.join(process.cwd(), 'src/data/softwareData.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default function Home() {
  const softwareList = getSoftwareData();

  return (
    <div className="flex flex-col gap-2 py-8 md:py-12">
      {/* Premium Glassmorphic Hero Section */}
      <section className="relative overflow-hidden text-center py-12 md:py-16 px-4">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-60 h-60 md:w-80 md:h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-6">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>تتضمن تطبيقات رسمية مطورة بلغة فلاتر 100%</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-500  leading-tight">
            دليل تطبيقات{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-600 to-sky-500 dark:from-emerald-400 dark:to-sky-400">
              علوم القرآن والقراءات
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            منصة برمجية متكاملة توفر لك وصولاً مباشراً لأحدث التطبيقات والأدوات
            الرقمية المتخصصة في علوم المصحف الشريف والقراءات العشر مجاناً.
          </p>

          {/* Feature Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>تحميل مباشر وسريع</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>مطورة بالكامل بلغة Flutter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Advertisement Slot */}
      <section className="container mx-auto px-4">
        <AdBanner position="top" />
      </section>

      {/* Interactive Catalog Component */}
      <SoftwareGrid softwareList={softwareList} />
    </div>
  );
}
