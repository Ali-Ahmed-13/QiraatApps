import fs from 'fs';
import path from 'path';
import { SoftwareResource } from 'src/types/software';
import SoftwareGrid from 'src/components/software/SoftwareGrid';
import AdBanner from 'src/components/layout/AdBanner';
import {
  ShieldCheck,
  Zap,
  ChevronDown,
  Volume2,
  WifiOff,
  Terminal,
  BookOpen,
  Mail,
  MessageSquare,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

// Server component helper to read data
function getSoftwareData(): SoftwareResource[] {
  const filePath = path.join(process.cwd(), 'src/data/softwareData.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default function Home() {
  const softwareList = getSoftwareData();

  return (
    <div className="flex flex-col gap-8 py-8 md:py-12">
      {/* Premium Glassmorphic Hero Section */}
      <section className="relative overflow-hidden text-center py-12 md:py-16 px-4">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-60 h-60 md:w-80 md:h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 dark:border-amber-600/25 bg-amber-500/5 dark:bg-amber-900/20 text-amber-800 dark:text-[#C9A84C] text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>✨ منصة إسلامية شاملة تجمع بين أصالة العلم ومعاصرة التقنية</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 leading-tight">
            منصة{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-700 dark:from-[#C9A84C] to-amber-500 dark:to-[#A07B30] font-black">
              تِيْجَان الإسلام
            </span>{' '}
            للعلوم الشرعية والتطبيقات الرقمية
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-650 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            بوابتك البرمجية المعرفية الموثوقة؛ نوفر لك وصولاً مباشراً لأحدث التطبيقات والأدوات
            الرقمية المتخصصة في علوم المصحف الشريف والقراءات العشر، بجانب مكتبة زاخرة
            بالمقالات والبحوث الشرعية مجاناً وبدون قيود.
          </p>

          {/* Feature Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
            <a
              href="/#catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E1E1E] hover:bg-black dark:bg-[#A07B30] dark:hover:bg-[#8a6926] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Zap className="w-4 h-4" />
              🚀 تصفح مكتبة التطبيقات
            </a>
            <a
              href="/articles"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-500/30 dark:border-amber-600/30 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-[#C9A84C] hover:bg-amber-100 dark:hover:bg-amber-900/35 hover:-translate-y-0.5 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              📖 ابدأ القراءة الآن
            </a>
          </div>
        </div>
      </section>

      {/* Top Banner Advertisement Slot */}
      <section className="container mx-auto px-4">
        <AdBanner position="top" />
      </section>

      {/* Interactive Catalog Component */}
      <SoftwareGrid softwareList={softwareList} />

      {/* ======================================================== */}
      {/* SECTION A: لماذا منصة البرمجيات القرآنية (About Platform) */}
      {/* ======================================================== */}
      <section
        id="about"
        className="container mx-auto px-4 py-12 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] dark:text-slate-200">
            لماذا منصة تِيجَان الرقمية؟
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            نهدف إلى تقديم حلول رقمية غير تجارية تدعم نشر وعلوم المصحف الشريف
            بأعلى كفاءة تقنية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Sound Processing */}
          <div className="p-6 rounded-3xl border border-border dark:border-[#1e2e1a] bg-card dark:bg-[#131a0f] hover:border-amber-500/40 dark:hover:border-amber-600/30 transition-all duration-300 shadow-sm flex flex-col gap-4 group">
            <div className="p-3.5 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-[#C9A84C] w-fit group-hover:scale-110 transition-transform duration-300">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200">
              معالجة الصوت الرقمية المتقدمة
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
              تعتمد تطبيقاتنا على خوارزميات معالجة صوتية متقدمة تضمن نقاءً
              استثنائياً للتلاوات القرآنية بمعدلات ترميز منخفضة لتوفير مساحة
              التخزين. نقوم بتنقية التسجيلات التاريخية والنادرة من الضوضاء
              الخلفية مع الحفاظ على دفء الصوت الأصلي للشيخ، مما يتيح للمستمع
              تجربة روحانية فريدة تعينه على التدبر والخشوع التام. كما تدعم
              التقنية ميزات تسريع وتبطيء الصوت دون التأثير على درجة النغمة
              لمساعدة الطلاب على حفظ ومراجعة الآيات بيسر.
            </p>
          </div>

          {/* Card 2: Offline Capability */}
          <div className="p-6 rounded-3xl border border-border dark:border-[#1e2e1a] bg-card dark:bg-[#131a0f] hover:border-amber-500/40 dark:hover:border-amber-600/30 transition-all duration-300 shadow-sm flex flex-col gap-4 group">
            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-amber-900/20 text-sky-600 dark:text-[#C9A84C] w-fit group-hover:scale-110 transition-transform duration-300">
              <WifiOff className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1E1E1E] dark:text-slate-200 text-base">
              التشغيل الذاتي الكامل دون إنترنت
            </h3>
            <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed text-justify">
              ندرك في منصة تِيجَان أن الوصول الدائم لكتاب الله أمر
              جوهري، لذلك صممنا تطبيقاتنا لتعمل بكفاءة كاملة دون الحاجة للاتصال
              بشبكة الإنترنت. يتم تحميل سور القرآن الكريم والأدوات المصاحبة
              محلياً على جهاز المستخدم بمجرد التثبيت الأول، مع إمكانية إدارة
              ملفات الصوت وتحميلها بشكل منفصل لتوفير سعة الإنترنت. يضمن هذا
              النهج بقاء المصحف الشريف والتلاوات في متناول يدك في أي وقت وفي أي
              مكان دون انقطاع.
            </p>
          </div>

          {/* Card 3: Flutter Architecture */}
          <div className="p-6 rounded-3xl border border-border dark:border-[#1e2e1a] bg-card dark:bg-[#131a0f] hover:border-amber-500/40 dark:hover:border-amber-600/30 transition-all duration-300 shadow-sm flex flex-col gap-4 group">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-900/25 text-amber-600 dark:text-[#C9A84C] w-fit group-hover:scale-110 transition-transform duration-300">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200">
              أداء رقمي مستقر وعالي الكفاءة
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
              نعتمد في تطوير برامجنا على بيئة عمل مستقرة ومدعومة، مما يتيح لنا تقديم واجهات منسقة تعمل بسلاسة تامة على مختلف الأنظمة (Android و iOS) وبأداء سريع، مع مرونة تامة في تحديث الواجهات وإطلاق الميزات الجديدة لجميع المستفيدين في وقت واحد.
            </p>
          </div>
        </div>
      </section>

      {/* Middle Banner Advertisement Slot */}
      <section className="container mx-auto px-4">
        <AdBanner position="content" />
      </section>

      {/* ======================================================== */}
      {/* SECTION B: التوثيق الرقمي للمصاحف المرتلة (Editorial / History) */}
      {/* ======================================================== */}
      <section
        id="blog"
        className="container mx-auto px-4 py-12 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto rounded-3xl border border-border dark:border-slate-800 bg-gradient-to-br from-card to-background dark:from-[#0d1222] dark:to-[#090d16] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 dark:bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-grow">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-[#C9A84C] text-xs font-bold mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                <span>التراث الصوتي القرآني</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                أهمية التوثيق الرقمي للمصاحف المرتلة
              </h2>
              <p className="mt-6 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                يعد التوثيق الرقمي للمصاحف المرتلة أحد أهم الإنجازات التقنية في
                العصر الحديث لحفظ التراث الصوتي الإسلامي وحمايته من التلف أو
                الفقدان. في منتصف القرن الماضي، شهد العالم الإسلامي ثورة في
                تسجيل المصاحف المرتلة بأصوات القراء العظام، وعلى رأسهم فضيلة
                الشيخ محمد صديق المنشاوي - رحمه الله - الذي تميزت تلاوته بالخشوع
                الآسر والعمق الإيماني الفريد.
              </p>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-650 dark:text-slate-300 leading-relaxed text-justify">
                إن تسجيلات الشيخ المنشاوي تمثل كنزاً علمياً وصوتياً نادراً،
                وتوثيقها رقمياً بأحدث تقنيات المعالجة يضمن بقاء هذه المدرسة
                القرآنية الفريدة حية وملهمة للأجيال القادمة. نقوم في منصتنا
                بالاعتناء بهذه التسجيلات، وتصنيفها برواية حفص عن عاصم، وتدقيق
                مطابقتها للرسم العثماني، مما يوفر مرجعاً رقمياً موثوقاً للباحثين
                والطلاب حول العالم للتعلم الصوتي الصحيح من نبع القراءة العذب
                والمنضبط.
              </p>
            </div>

            <div className="w-full lg:w-72 shrink-0 p-6 rounded-2xl bg-card dark:bg-[#12192c] border border-border dark:border-slate-800 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/25 text-amber-600 dark:text-[#C9A84C] flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                إحياء المدارس العتيقة
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                نهتم في مشاريعنا المعرفية بإعادة التلاوات النادرة للرعيل الأول من القراء بتسجيلات صوتية متطورة تلائم كافة المستخدمين وتعمل بشكل محلي كامل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION C: الأسئلة الشائعة حول التطبيقات (FAQ Accordion) */}
      {/* ======================================================== */}
      <section className="container mx-auto px-4 py-12 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-amber-900/25 text-sky-700 dark:text-[#C9A84C] text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>الأسئلة المتكررة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-200">
            الأسئلة الشائعة حول المنصة والتطبيقات
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            إجابات تفصيلية عن الأسئلة الأكثر شيوعاً حول عمليات التحميل والتوافق
            والمساحة التخزينية
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {/* FAQ Item 1 */}
          <details className="group border border-border dark:border-slate-800 bg-card dark:bg-[#0f1422] rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-850 dark:text-slate-200">
                كيف يمكنني تحميل التطبيقات وهل هي مجانية بالكامل؟
              </h3>
              <span className="shrink-0 transition duration-350 group-open:-rotate-180 p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/25 text-amber-800 dark:text-[#C9A84C]">
                <ChevronDown className="w-4 h-4" />
              </span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4 text-justify">
              نعم، كافة التطبيقات المتاحة على منصتنا مجانية بالكامل وخالية من أي
              إعلانات تجارية مزعجة. يمكنك تحميلها مباشرة عبر روابط APK الموثوقة
              المتاحة في صفحة تفاصيل كل تطبيق، أو من خلال المتاجر الرسمية مثل
              Google Play و App Store. نهدف من خلال هذا العمل إلى نشر كتاب الله
              وعلومه وتسهيل وصوله لكل مسلم دون أي عوائق مادية.
            </div>
          </details>

          {/* FAQ Item 2 */}
          <details className="group border border-border dark:border-slate-800 bg-card dark:bg-[#0f1422] rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-850 dark:text-slate-200">
                هل تدعم التطبيقات العمل على إصدارات أندرويد القديمة؟
              </h3>
              <span className="shrink-0 transition duration-350 group-open:-rotate-180 p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/25 text-amber-800 dark:text-[#C9A84C]">
                <ChevronDown className="w-4 h-4" />
              </span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4 text-justify">
              لقد قمنا بتحسين كود فلاتر وتوافق الحزم البرمجية لتشغيل التطبيقات
              على أوسع نطاق ممكن من الأجهزة. تدعم تطبيقاتنا العمل بدءاً من نظام
              Android 5.0 (Lollipop) فما فوق، مما يضمن تشغيلها بكفاءة ممتازة حتى
              على الهواتف ذات المواصفات المحدودة أو القديمة، وذلك بفضل المعالجة
              الخفيفة والذكية للملفات الصوتية والبيانات المحلية.
            </div>
          </details>

          {/* FAQ Item 3 */}
          <details className="group border border-border dark:border-slate-800 bg-card dark:bg-[#0f1422] rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-850 dark:text-slate-200">
                ما هي المساحة التخزينية المطلوبة لتثبيت التطبيقات وتشغيلها؟
              </h3>
              <span className="shrink-0 transition duration-350 group-open:-rotate-180 p-1.5 rounded-lg bg-amber-100 dark:bg-emerald-950/30 text-amber-800 dark:text-emerald-400">
                <ChevronDown className="w-4 h-4" />
              </span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4 text-justify">
              تتميز ملفات التثبيت (APK) بحجمها الصغير الذي يتراوح بين 15 إلى 35
              ميجابايت فقط، حيث تحتوي على الكود البرمجي والواجهات والنصوص
              الأساسية. بالنسبة للملفات الصوتية والتلاوات، تتيح تطبيقاتنا ميزة
              التحميل المرن؛ حيث يمكنك اختيار تحميل سور محددة أو تحميل المصحف
              كاملاً بجودات متعددة تناسب المساحة المتوفرة على هاتفك، مع إمكانية
              حذف الملفات الصوتية بعد الاستماع لتحرير المساحة.
            </div>
          </details>

          {/* FAQ Item 4 */}
          <details className="group border border-border dark:border-slate-800 bg-card dark:bg-[#0f1422] rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-850 dark:text-slate-200">
                كيف يتم التأكد من صحة النصوص القرآنية وتطابقها مع الرسم
                العثماني؟
              </h3>
              <span className="shrink-0 transition duration-350 group-open:-rotate-180 p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/25 text-amber-800 dark:text-[#C9A84C]">
                <ChevronDown className="w-4 h-4" />
              </span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4 text-justify">
              تخضع كافة النصوص والآيات القرآنية المعروضة في تطبيقاتنا لعملية
              تدقيق ومراجعة صارمة. نعتمد على قواعد البيانات المعتمدة والمدققة
              رسمياً الصادرة عن مجمع الملك فهد لطباعة المصحف الشريف بالمدينة
              المنورة. يتم عرض الآيات بالرسم العثماني المعتمد مع توفير خيارات
              لتغيير حجم الخط ونوعه لتسهيل القراءة وتلافي أي أخطاء مطبعية أو
              إملائية.
            </div>
          </details>

          {/* FAQ Item 5 */}
          <details className="group border border-border dark:border-slate-800 bg-card dark:bg-[#0f1422] rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-850 dark:text-slate-200">
                هل تصل تحديثات دورية للتطبيقات وكيف أحصل عليها؟
              </h3>
              <span className="shrink-0 transition duration-355 group-open:-rotate-180 p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/25 text-amber-800 dark:text-[#C9A84C]">
                <ChevronDown className="w-4 h-4" />
              </span>
            </summary>
            <div className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4 text-justify">
              نعم، نعمل بشكل مستمر على تطوير التطبيقات وتحسين أدائها وإضافة
              ميزات جديدة استناداً إلى ملاحظات المستخدمين وتحديثات بيئة فلاتر.
              بمجرد توفر إصدار جديد، ستتلقى تنبيهاً داخل التطبيق يدعوك لتنزيل
              التحديث، كما نقوم بتحديث الروابط مباشرة على المنصة لتنزيل أحدث
              نسخة APK بكل سهولة وأمان.
            </div>
          </details>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION D: اتصل بنا (Contact Section for Nav link) */}
      {/* ======================================================== */}
      <section
        id="contact"
        className="container mx-auto px-4 py-12 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] p-8 shadow-sm text-center flex flex-col items-center gap-6">
          <div className="p-4 rounded-full bg-amber-50 dark:bg-amber-900/25 text-amber-700 dark:text-[#C9A84C]">
            <Mail className="w-8 h-8" />
          </div>
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-850 dark:text-slate-100">
              تواصل مع فريق تطوير منصة تِيجَان
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              يسعدنا دائماً تواصلكم معنا وتلقي آرائكم، مقترحاتكم، أو أي تقارير
              حول الأخطاء البرمجية لمساعدتنا في تحسين التطبيقات وتوسيعها. نسعى
              لتقديم خدمة متميزة تدعم الحفاظ والباحثين في علوم القرآن الكريم حول
              العالم.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href="mailto:alio123alio1239o@gmail.com"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/10 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>alio123alio1239o@gmail.com</span>
            </a>
            <div className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>الاستجابة خلال 24 ساعة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Advertisement Slot */}
      <section className="container mx-auto px-4">
        <AdBanner position="content" />
      </section>
    </div>
  );
}
