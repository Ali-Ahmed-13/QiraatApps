import Link from 'next/link';
import { Home, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md text-center flex flex-col items-center justify-center min-h-[60vh]">
      <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-500 mb-6">
        <ShieldAlert className="w-16 h-16 animate-pulse" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-500  mb-3">
        عذراً، الصفحة غير موجودة
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
        يبدو أن الرابط الذي حاولت الوصول إليه غير موجود أو تم نقله بشكل نهائي.
        يمكنك العودة إلى دليل البرمجيات الرئيسي لتصفح الحلول التقنية الآمنة
        المتاحة.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/15 transition-all cursor-pointer"
      >
        <Home className="w-4.5 h-4.5" />
        <span>العودة للرئيسية</span>
      </Link>
    </div>
  );
}
