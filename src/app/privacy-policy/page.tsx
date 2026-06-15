import type { Metadata } from 'next';
import { ShieldCheck, Eye, Lock, Globe, Server, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية وسرية المعلومات | منصة البرمجيات القرآنية',
  description: 'تعرف على سياسة خصوصية منصة البرمجيات القرآنية وكيفية حماية بياناتك الشخصية واستخدام ملفات تعريف الارتباط وضمان أمان التطبيقات القرآنية.',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>وثيقة الأمان والثقة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-805 dark:text-slate-200">
          سياسة الخصوصية وسرية المعلومات
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          تاريخ آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Content Cards */}
      <div className="flex flex-col gap-8 bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm leading-relaxed text-justify">
        
        {/* Section 1 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <Eye className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">1. مقدمة وتمهيد</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed pr-7">
            مرحباً بكم في منصة البرمجيات القرآنية. نحن نولي خصوصية بياناتكم وسريتها أهمية قصوى. تهدف هذه الوثيقة إلى توضيح الممارسات والسياسات التي نتبعها لحماية بيانات مستخدمي المنصة وتطبيقاتها المتاحة للتحميل. إن استخدامكم للموقع أو للتطبيقات المرفقة يعني موافقتكم الضمنية على البنود والشروط الواردة في هذه السياسة.
          </p>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 2 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <Server className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">2. البيانات التي نقوم بجمعها</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed pr-7">
            تتميز تطبيقاتنا القرآنية بأنها تعمل بالكامل دون الحاجة لتسجيل حساب أو إدخال أي بيانات شخصية (مثل الاسم، رقم الهاتف، أو البريد الإلكتروني). نحن لا نقوم بجمع أو حفظ أو تداول أي بيانات خاصة بالمستخدمين. عند تصفح الموقع، قد يتم جمع بعض البيانات غير الشخصية تلقائياً من خلال خادم الويب (مثل عنوان IP، نوع المتصفح، والبلد) لأغراض إحصائية وتحسين أداء المنصة فقط.
          </p>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 3: Google AdSense Compliance */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <Globe className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">3. ملفات تعريف الارتباط (Cookies) وإعلانات الطرف الثالث</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed pr-7">
            يستخدم هذا الموقع خدمات إعلانية مقدمة من أطراف ثالثة، وتحديداً برنامج **Google AdSense**. تستخدم Google ملفات تعريف الارتباط (Cookies) لخدمة الإعلانات بناءً على زيارات المستخدم السابقة لموقعنا أو مواقع أخرى على الإنترنت.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 mr-7 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <p className="font-bold mb-2 text-slate-700 dark:text-slate-300">ملاحظات هامة حول ملفات تعريف الارتباط DART:</p>
            <ul className="list-disc pr-5 flex flex-col gap-1.5 leading-relaxed">
              <li>تستخدم Google ملف تعريف الارتباط DART لعرض الإعلانات للمستخدمين استناداً إلى تصفحهم لموقعنا ومواقع الويب الأخرى.</li>
              <li>يمكن للمستخدمين إلغاء استخدام ملف تعريف الارتباط DART عبر زيارة <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">سياسة الخصوصية الخاصة بالإعلانات وشبكة محتوى Google</a>.</li>
              <li>نحن لا نملك سلطة الوصول أو التحكم في ملفات تعريف الارتباط التي يستخدمها معلنو الطرف الثالث.</li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 4 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <Lock className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">4. خصوصية الملفات الصوتية والتنزيل</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed pr-7">
            تتيح تطبيقاتنا ميزة تحميل الملفات الصوتية (التلاوات) للتسميع والتشغيل دون إنترنت. يتم حفظ هذه الملفات بالكامل محلياً على جهازك الشخصي. لا نقوم برفع أو تتبع مسارات استماعك أو مشاركتها مع أي جهة خارجية. تتم كافة عمليات التنزيل عبر خوادم آمنة ومحمية تدعم اتصالات SSL المشفرة لضمان أمان جهازك وحمايته من الملفات الضارة.
          </p>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 5 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <FileText className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">5. التزاماتنا تجاه خصوصية الأطفال</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed pr-7">
            نظراً للطبيعة الدعوية والتعليمية لمنصتنا وتطبيقاتنا القرآنية، فإنها مناسبة لجميع الأعمار بما في ذلك الأطفال دون سن 13 عاماً. نحن لا نقوم بجمع أي بيانات من الأطفال على الإطلاق، كما أن تطبيقاتنا خالية تماماً من غرف الدردشة أو الميزات التفاعلية التي تتطلب الإفصاح عن معلومات شخصية، مما يوفر بيئة تعليمية آمنة وموثوقة بنسبة 100%.
          </p>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 6 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">6. التعديلات على سياسة الخصوصية</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed pr-7">
            نحتفظ بالحق في تعديل أو تحديث وثيقة سياسة الخصوصية هذه في أي وقت لمواكبة التحديثات التقنية والقانونية. سيتم نشر أي تغييرات تطرأ على هذه الصفحة مباشرة مع تغيير تاريخ التحديث في الأعلى. ننصحك بزيارة هذه الصفحة بشكل دوري للوقوف على آخر المستجدات. إذا كان لديك أي استفسار حول سياسة الخصوصية، يرجى التواصل معنا عبر البريد المعتمد للدعم.
          </p>
        </section>

      </div>
    </div>
  );
}
