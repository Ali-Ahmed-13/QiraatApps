import type { Metadata } from 'next';
import { FileText, Award, AlertTriangle, ShieldCheck, Scale, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'شروط الخدمة واتفاقية إخلاء المسؤولية | منصة البرمجيات القرآنية',
  description: 'اطلع على شروط استخدام منصة البرمجيات القرآنية وتراخيص التطبيقات وحقوق الملكية الفكرية واتفاقية إخلاء المسؤولية القانونية الخاصة بالتطبيقات والتلاوات الصوتية.',
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4">
          <FileText className="w-4 h-4" />
          <span>اتفاقية الاستخدام والترخيص</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-805 dark:text-slate-200">
          شروط الخدمة واتفاقية الاستخدام
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
            <CheckCircle className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">1. قبول الشروط والأحكام</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-605 dark:text-slate-350 leading-relaxed pr-7">
            باستخدامكم لمنصة البرمجيات القرآنية أو تنزيل أي من التطبيقات المتاحة عليها، فإنكم تقرون بقبولكم التام وغير المشروط لكافة البنود والشروط الواردة في هذه الاتفاقية. إذا كنتم لا توافقون على أي جزء من هذه الشروط، يرجى التوقف فوراً عن استخدام المنصة وتنزيل تطبيقاتها.
          </p>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 2 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">2. ترخيص استخدام البرمجيات</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-605 dark:text-slate-350 leading-relaxed pr-7">
            تُقدم كافة التطبيقات والملفات البرمجية المتوفرة على منصتنا مجاناً بالكامل وتحت تراخيص البرمجيات مفتوحة المصدر أو التراخيص العامة المخصصة للاستخدام الشخصي والدعوي غير التجاري. يُسمح للمستخدمين بتحميل وتثبيت وتشغيل التطبيقات على أجهزتهم الشخصية والتعليمية.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 mr-7 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <p className="font-bold mb-2 text-slate-700 dark:text-slate-300">يُمنع منعاً باتاً القيام بالآتي:</p>
            <ul className="list-disc pr-5 flex flex-col gap-1.5 leading-relaxed">
              <li>استخدام ملفات الـ APK أو الكود البرمجي للتطبيقات في أي نشاط تجاري يهدف للربح المالي المباشر أو غير المباشر.</li>
              <li>إعادة نشر التطبيقات على متاجر أخرى باسم مستعار أو تحت حقوق ملكية مزيفة دون أخذ إذن خطي مسبق من إدارة المنصة.</li>
              <li>تعديل النصوص القرآنية أو التلاعب بالرسم العثماني المرفق بداخل التطبيقات لأي سبب كان.</li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 3: Legal Disclaimer */}
        <section id="disclaimer" className="flex flex-col gap-3 scroll-mt-24">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">3. اتفاقية إخلاء المسؤولية القانونية</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed pr-7">
            تُقدم البرمجيات والتطبيقات والأدوات على هذه المنصة **"كما هي" (As Is)** دون أي ضمانات صريحة أو ضمنية بالصلاحية لغرض معين أو الاستمرارية اللانهائية. نحن نبذل قصارى جهدنا لضمان دقة البيانات الصوتية والنصوص والرموز البرمجية وخلوها من الأخطاء والملفات الضارة، ولكننا لا نضمن عدم حدوث انقطاعات تقنية أو توافق كامل بنسبة 100% مع كافة موديلات الهواتف القديمة أو الجديدة.
          </p>
          <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed pr-7">
            المنصة ومطوروها غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة، مادية أو معنوية، قد تنجم عن استخدام أو عدم القدرة على استخدام هذه البرمجيات، بما في ذلك على سبيل المثال لا الحصر فقدان البيانات الصوتية المحملة محلياً أو تأثر كفاءة الجهاز. يتحمل المستخدم كامل المسؤولية عند تثبيت ملفات الـ APK خارج المتاجر الرسمية.
          </p>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 4: Copyright & Intellectual Property */}
        <section id="copyright" className="flex flex-col gap-3 scroll-mt-24">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <Scale className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">4. حقوق الملكية الفكرية والنشر</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed pr-7">
            جميع النصوص والآيات القرآنية المعروضة في تطبيقاتنا هي نصوص مستخرجة من المصادر الرسمية المعتمدة (مثل مجمع الملك فهد لطباعة المصحف الشريف)، وتخضع لتدقيق صارم، وتعتبر ملكاً للأمة الإسلامية جمعاء ولا يجوز احتكارها.
          </p>
          <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed pr-7">
            الملفات الصوتية والتلاوات المسجلة المدرجة تعود ملكيتها الفكرية لقرائها أو للجهات الرسمية التي قامت بتسجيلها ونشرها للعموم. تلتزم منصتنا بعدم استغلال هذه التسجيلات تجارياً، وفي حال وجود أي محتوى يعتقد صاحب الحقوق أنه ينتهك ملكيته الفكرية، يرجى مراسلتنا فوراً عبر البريد المعتمد وسنقوم بمراجعة الأمر واتخاذ الإجراء اللازم في غضون 24 ساعة.
          </p>
        </section>

        <hr className="border-slate-100 dark:border-slate-800/60" />

        {/* Section 5 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">5. التحديثات والتعديلات على الاتفاقية</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-605 dark:text-slate-350 leading-relaxed pr-7">
            تتم مراجعة هذه الاتفاقية دورياً وتحديث بنودها بما يتناسب مع تطور المنصة وإطلاق حزم فلاتر جديدة. تقع على عاتق المستخدم مسؤولية مراجعة هذه الصفحة بشكل مستمر للتعرف على التعديلات. استمرار استخدامك للموقع وتطبيقاته بعد إجراء التعديلات يعد قبولاً صريحاً منك بتلك الشروط المعدلة.
          </p>
        </section>

      </div>
    </div>
  );
}
