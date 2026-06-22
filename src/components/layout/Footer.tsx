import Link from 'next/link';
import Image from 'next/image';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-amber-900/10 dark:border-amber-400/10 bg-white dark:bg-[#0c111d] transition-colors duration-300" dir="rtl">
      {/* الجزء العلوي: شبكة المحتوى المبسطة */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
          
          {/* العمود الأول: عن منصة تيجان */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/fullIcon.png"
                alt="لوجو تِيجَان"
                width={26}
                height={26}
                className="object-contain"
              />
              <h3 className="font-black text-slate-950 dark:text-[#f8f4ea] text-base">
                منصة تِيجَان
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
              جسر رقمي يربط بين التقنيات الحديثة وكتاب الله عز وجل. نهدف لبناء منظومة متكاملة من الأدوات والتطبيقات الرقمية لخدمة دارسي القراءات العشر والروايات المتواترة، مع التركيز على نقاء الصوت وسهولة التصفح دون الحاجة لاتصال مستمر بالإنترنت.
            </p>
          </div>

          {/* العمود الثاني: أقسام المنصة */}
          <div className="flex flex-col gap-3">
            <h3 className="font-black text-slate-950 dark:text-[#f8f4ea] text-base border-r-2 border-amber-500 pr-2">
              أقسام المنصة
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-bold">
              <li>
                <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/software" className="text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                  دليل التطبيقات والبرمجيات
                </Link>
              </li>
              <li>
                <Link href="/sciences" className="text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                  ركن طالب العلم
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                  التواصل والدعم
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: الثقة والقوانين */}
          <div className="flex flex-col gap-3">
            <h3 className="font-black text-slate-950 dark:text-[#f8f4ea] text-base border-r-2 border-amber-500 pr-2">
              قوانين وأمان
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  سياسة الخصوصية والاستخدام
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  شروط الخدمة والأمان
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  تواصل مع الفريق التقني
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: المعايير العلمية */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-950 dark:text-[#f8f4ea] text-base">
                المعايير العلمية والتقنية
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
              نلتزم بحفظ حقوق الملكية الفكرية للمصاحف والكتب المدرجة. جميع المواد متوفرة لأغراض تعليمية ودعوية غير تجارية، وخالية تماماً من الإعلانات لضمان تجربة تصفح سريعة وفائقة الاستجابة متوافقة مع معايير الأداء العالمية.
            </p>
          </div>

        </div>
      </div>

      {/* الجزء السفلي: الحقوق والملكية */}
      <div className="border-t border-amber-900/5 dark:border-slate-800/60 bg-amber-500/[0.01] dark:bg-black/10 py-6 text-center text-xs text-slate-500 dark:text-slate-400 font-bold">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} منصة تِيجَان لتطبيقات القرآن والقراءات
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">
            امتثال كامل لسياسات المحتوى | خالي من الإعلانات المدفوعة.
          </p>
        </div>
        <div className="border-t border-amber-900/5 dark:border-slate-800/40 mt-4 pt-3">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center font-bold">
            صنع بواسطة طالبي العلم: علي أحمد وعمر خالد • تحت إشراف: د. عمرو محمد و د. أحمد علي يونس
          </p>
        </div>
      </div>
    </footer>
  );
}
