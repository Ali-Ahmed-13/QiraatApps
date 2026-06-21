import Link from 'next/link';
import Image from 'next/image';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-card dark:bg-[#0b0f19] transition-colors duration-300">
      {/* Upper Footer: Massive Content Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Detailed About (100+ words) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/fullIcon.png"
                alt="لوجو تِيجَان"
                width={28}
                height={28}
                className="object-contain"
              />
              <h3 className="font-bold text-[#1E1E1E] dark:text-slate-200 text-base">
                منصة تِيجَان
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
              تأسست منصة تِيجَان لتكون جسراً رقمياً يربط بين التقنيات الحديثة وكتاب الله عز وجل. نحن نؤمن بأن خدمة القرآن الكريم تتطلب توظيف أفضل وأحدث الأدوات الرقمية، ولهذا قمنا بالاعتماد على أحدث الوسائل الرقمية لتوظيفها في بناء المنظومة. رؤيتنا تمتد لبناء منظومة متكاملة من الأدوات الرقمية التي تخدم الدارسين، الحفاظ، والمستمعين لأدق تفاصيل القراءات العشر والروايات المتواترة، مع التركيز على نقاء الصوت وسهولة التصفح دون الحاجة لاتصال مستمر بالإنترنت، مساهمة منا في حفظ ونشر التراث القرآني الأصيل.
            </p>
          </div>

          {/* Column 2: App Categories Description */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[#1E1E1E] dark:text-slate-200 text-base border-r-2 border-amber-600 dark:border-emerald-500 pr-2">
              أقسام المنصة
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link href="/articles" className="group block">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors">
                    مقالات العلوم الشرعية
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-500 mt-0.5 leading-normal">
                    مقالات متخصصة في التجويد والعقيدة والفقه والحديث والقراءات العشر.
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sciences" className="group block">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors">
                    أقسام العلوم الشرعية
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-500 mt-0.5 leading-normal">
                    استكشف الأقسام الستة الرئيسية وتصفح المقالات المصنفة بحسب كل علم.
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="group block">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors">
                    تطبيقات المصاحف المرتلة
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-500 mt-0.5 leading-normal">
                    إصدارات حصرية ونقية بصوت كبار القراء بروايات متعددة ونقاء صوتي فائق.
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="group block">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors">
                    معاجم التلاوة والتجويد
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-500 mt-0.5 leading-normal">
                    أدوات تعليمية تفاعلية لشرح أحكام التجويد ومخارج الحروف والتجويد العملي.
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="group block">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors">
                    مصحف القراءات العشر
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-500 mt-0.5 leading-normal">
                    منصة متكاملة لعرض وتدقيق اختلافات القراءات والروايات المتواترة بالرسم العثماني.
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="group block">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors">
                    كتب وعلوم القرآن الرقمية
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-500 mt-0.5 leading-normal">
                    مكتبة متكاملة تجمع أمهات الكتب والتفاسير في قالب عصري مرن سهل الاستخدام.
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust Pages */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[#1E1E1E] dark:text-slate-200 text-base border-r-2 border-amber-600 dark:border-emerald-500 pr-2">
              صفحات الثقة والقوانين
            </h3>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-800 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-emerald-500"></span>
                  سياسة الخصوصية والاستخدام
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-800 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-emerald-500"></span>
                  شروط الخدمة والأمان
                </Link>
              </li>
              <li>
                <Link href="/terms#disclaimer" className="hover:text-amber-800 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-emerald-500"></span>
                  اتفاقية إخلاء المسؤولية القانونية
                </Link>
              </li>
              <li>
                <Link href="/terms#copyright" className="hover:text-amber-800 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-emerald-500"></span>
                  حقوق الملكية الفكرية والنشر
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-800 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-emerald-500"></span>
                  تواصل مع الفريق التقني
                </Link>
              </li>
            </ul>
            <div className="mt-2 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              تلتزم منصتنا بحفظ حقوق النشر والملكية الفكرية للمصاحف والتلاوات والكتب المدرجة، وجميع المحتويات البرمجية المرفقة مطورة لأغراض تعليمية ودعوية غير تجارية وخالية تماماً من الإعلانات المدفوعة داخل التطبيقات.
            </div>
          </div>

          {/* Column 4: Tech Stack Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#1E1E1E] dark:text-slate-200 text-base">
                الأصالة والمعاصرة والمعايير العلمية
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
              تم بناء هذه المنصة لضمان تجربة تصفح فائقة وسريعة للمستخدم. نعتمد على أدوات محسنة لمحركات البحث (SEO) وسريعة الاستجابة، بهدف تقديم محتوى قرآني موثوق، سهل الفهرسة، لضمان وصول هذه المواد المباركة إلى كل مسلم حول العالم بأعلى جودة ممكنة.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Footer: Copyright Bar */}
      <div className="border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#080c14]/40 transition-colors duration-300 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-medium">
            جميع الحقوق محفوظة © {new Date().getFullYear()} منصة تِيجَان لتطبيقات القرآن والقراءات
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            صنع بحب لخدمة كتاب الله الكريم | يمتثل هذا الموقع لسياسات محتوى Google AdSense بالكامل.
          </p>
        </div>
        <div className="border-t border-slate-200/40 dark:border-slate-800/40 mt-4 pt-3">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
            صنع بواسطة طالبي العلم: علي أحمد وعمر خالد، تحت إشراف: د. عمرو محمد و د. أحمد علي يونس
          </p>
        </div>
      </div>
    </footer>
  );
}
