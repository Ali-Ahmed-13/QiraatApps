import Link from 'next/link';
import { SoftwareResource } from 'src/types/software';
import { ArrowLeft, HardDrive, Info, Tag } from 'lucide-react';

interface SoftwareCardProps {
  software: SoftwareResource;
}

export default function SoftwareCard({ software }: SoftwareCardProps) {
  // Premium category color mappings for fallbacks
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

  // Visual text fallback (first letter of the software title)
  const fallbackLetter = software.name.trim().charAt(0);

  return (
    <Link
      href={`/software/${software.id}`}
      className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer"
    >
      {/* Visual Accent Top Bar */}
      <div className="h-1.5 w-full bg-gradient-to-l from-emerald-600 to-sky-500 opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Header Metadata */}
          <div className="flex items-start gap-4">
            {/* Visual Icon Container */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${fromBg} ${toBg} flex items-center justify-center font-bold text-xl border border-slate-100 dark:border-transparent shrink-0 shadow-inner`}
            >
              <span className={textCol}>{fallbackLetter}</span>
            </div>

            <div className="flex-grow min-w-0">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-500  group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                {software.name}
              </h3>

              {/* Category */}
              <div className="mt-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {software.category}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {software.description}
          </p>
        </div>

        {/* Footer Meta Details */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>الإصدار {software.version}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-slate-400" />
            <span>{software.size}</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="px-5 pb-5 mt-auto">
        <div className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 group-hover:text-white group-hover:bg-emerald-600 group-hover:border-emerald-600 dark:group-hover:bg-emerald-600 dark:group-hover:border-emerald-600 transition-all duration-200 group/btn">
          <span>عرض التفاصيل وآلية التنزيل</span>
          <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
