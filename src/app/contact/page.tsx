import type { Metadata } from 'next';
import React from 'react';
import { Mail, MessageSquare, Clock, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'اتصل بنا وتواصل مع فريق التطوير | منصة البرمجيات القرآنية',
  description:
    'تواصل مع فريق تطوير منصة البرمجيات القرآنية لاقتراح تطبيقات قرآنية جديدة، التبليغ عن أخطاء صوتية في التلاوات، أو أي استفسار تقني وتعاون برمجي.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl" dir="rtl">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4">
          <Mail className="w-4 h-4" />
          <span>تواصل مباشر ودعم فني</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-200">
          اتصل بنا وقدم مقترحاتك
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          يسعدنا تواصلكم معنا. سواء كنت ترغب في اقتراح تطبيق قرآني جديد، التبليغ
          عن خطأ صوتي في التلاوات، أو التعاون معنا لتطوير المنصة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Card 1: WhatsApp */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] flex flex-col gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 w-fit">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
              تواصل عبر الواتساب
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal mt-1">
              يمكنك مراسلتنا مباشرة عبر الواتساب لإرسال المقترحات والاستفسارات
              بشكل أسرع.
            </p>
          </div>
          <a
            href="https://wa.me/201148437458"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all mt-auto"
          >
            مراسلة عبر الواتساب
          </a>
        </div>

        {/* Card 2: Email */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] flex flex-col gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 w-fit">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
              البريد الإلكتروني المباشر
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal mt-1">
              ارسل لنا رسالة إلكترونية وسيقوم فريق الدعم الفني بالرد عليك في
              أقرب وقت.
            </p>
          </div>
          <a
            href="mailto:alio123alio1239o@gmail.com"
            className="w-full text-center px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all mt-auto break-all"
          >
            alio123alio1239o@gmail.com
          </a>
        </div>
      </div>

      {/* Notice & Work Time Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mt-8">
        {/* Notice */}
        <div className="p-5 rounded-2xl border border-dashed border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/10 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <h4 className="font-bold text-xs sm:text-sm">
              ملاحظة هامة للمرسلين:
            </h4>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
            عند التبليغ عن خطأ صوتي، يرجى ذكر: اسم التطبيق، اسم القارئ، اسم
            السورة، ورقم الآية بدقة لتمكين لجنة التدقيق من مراجعة التسجيل
            وتصحيحه.
          </p>
        </div>

        {/* Work Time */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] flex flex-col justify-center gap-1.5">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mb-1">
            <Clock className="w-4 h-4" />
            <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              ساعات العمل والدعم
            </h4>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            نعمل على مدار أيام الأسبوع لمراجعة اقتراحاتكم وتدقيق التحديثات.
          </p>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            السبت - الخميس (8:00 ص - 6:00 م)
          </span>
        </div>
      </div>
    </div>
  );
}
