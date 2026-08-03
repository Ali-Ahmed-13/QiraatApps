'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Heart, ChevronLeft, Award } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'أقسام المنصة الرئيسية',
      links: [
        { label: 'الصفحة الرئيسية', href: '/' },
        { label: 'خرائط العلوم الشرعية', href: '/sciences' },
        { label: 'اللغة العربية وآدابها', href: '/arabic-language' },
        { label: 'خريطة التعلم التفاعلية', href: '/roadmap' },
      ]
    },
    {
      title: 'المعرفة والمصادر',
      links: [
        { label: 'المكتبة وخزانة الكتب', href: '/books' },
        { label: 'بوابة مقالات العلوم', href: '/articles' },
        { label: 'سير العلماء والمسندين', href: '/scholars' },
        { label: 'أرشيف الفتاوى والمسائل', href: '/fatwas' },
      ]
    },
    {
      title: 'التقنية والسياسات',
      links: [
        { label: 'دليل البرمجيات والتطبيقات', href: '/software' },
        { label: 'تواصل مع الدعم الفني', href: '/contact' },
        { label: 'سياسة الخصوصية والاستخدام', href: '/privacy-policy' },
        { label: 'شروط الخدمة والأمان', href: '/terms' },
      ]
    }
  ];

  return (
    <footer className="bg-card dark:bg-card border-t border-border dark:border-[#212C2C] theme-transition select-none" dir="rtl">
      
      {/* 🌟 الجزء العلوي: شبكة المحتوى التفاعلية */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-right">
          
          {/* العمود التعريفي العريض */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-primary-light dark:bg-brand-primary-light/10 rounded-xl flex items-center justify-center border border-brand-primary/10 dark:border-brand-primary/20">
                <Image
                  src="/fullIcon.png"
                  alt="لوجو تِيجَان"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-amiri font-bold text-lg text-foreground">
                منصة <span className="text-brand-primary">تِيجَان</span> الإسلامية
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-tajawal font-medium">
              جسر رقمي أصيل يربط بين تقنيات العصر الحديث وكتاب الله عز وجل وعلومه الشرعية. نهدف لبناء منظومة متكاملة لخدمة حفاظ القرآن الكريم والقراءات العشر وطلبة العلم الشرعي، مع الالتزام التام بالمنهجية العلمية والتحقيق الرصين والخلو من الإعلانات.
            </p>
            <div className="inline-flex items-center gap-2 text-brand-secondary dark:text-[#E7C682] text-xs font-bold mt-2">
              <Award className="w-4 h-4 shrink-0" />
              <span>تحت إشراف علمي وتدقيق متواصل من المتخصصين</span>
            </div>
          </div>

          {/* أعمدة الروابط السريعة */}
          {sections.map((sec, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h3 className="font-amiri font-bold text-base text-brand-primary border-r-2 border-brand-secondary pr-2.5">
                {sec.title}
              </h3>
              <ul className="flex flex-col gap-3 text-xs sm:text-sm font-tajawal font-bold">
                {sec.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-brand-primary flex items-center gap-1 transition-all duration-300 hover:translate-x-[-4px]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-brand-secondary/70 shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* خط فاصل */}
        <div className="h-[1px] bg-border dark:bg-[#212C2C] my-10" />

        {/* قسم الضمان العلمي والتقني */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="flex items-start gap-3 bg-background dark:bg-background/20 p-4 rounded-2xl border border-border dark:border-[#212C2C]">
            <div className="p-2 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/5 text-brand-primary mt-0.5 shrink-0">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div className="text-right">
              <h4 className="text-xs sm:text-sm font-bold text-foreground mb-1">الالتزام بالحقوق الفكرية والنزاهة</h4>
              <p className="text-[11px] sm:text-xs text-muted leading-relaxed font-medium">
                جميع المواد والكتب والمنظومات المدرجة متوفرة مجاناً لطلبة العلم لأغراض دعوية وتأصيلية غير تجارية. نضمن خلو المنصة تماماً من الإعلانات التجارية لراحتكم وهدوء المطالعة.
              </p>
            </div>
          </div>
          <div className="text-right lg:text-left text-xs font-tajawal font-bold text-muted flex flex-col justify-center h-full">
            <p className="flex items-center gap-1.5 justify-start lg:justify-end">
              <span>صنع بحب وإخلاص لخدمة طلبة العلم</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </p>
            <p className="text-[11px] text-light-text mt-1">
              إعداد طالبي العلم: علي أحمد وعمر خالد • إشراف: د. عمرو محمد و د. أحمد علي يونس
            </p>
          </div>
        </div>

      </div>

      {/* 🌟 الجزء السفلي: الملكية الفكرية والحقوق */}
      <div className="bg-background dark:bg-[#0B0E0E] py-6 border-t border-border dark:border-[#212C2C] text-xs text-light-text font-tajawal font-semibold text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            جميع الحقوق محفوظة © {currentYear} منصة تِيجَان لعلوم القرآن والقراءات العشر
          </p>
          <p className="text-[10px] text-brand-primary/80 bg-brand-primary-light/35 dark:bg-brand-primary-light/5 px-3 py-1 rounded-full border border-brand-primary/10">
            امتثال كامل لسياسات المحتوى الإسلامي والأمان الرقمي
          </p>
        </div>
      </div>

    </footer>
  );
}
