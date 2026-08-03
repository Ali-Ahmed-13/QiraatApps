'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  Video,
  Download,
  ChevronDown,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import PageTransition from 'src/components/ui/PageTransition';
import ScrollReveal from 'src/components/ui/ScrollReveal';
import booksData from '@/data/books';
import { Book } from 'src/utils/bookHelper';
import type { SoftwareResource } from 'src/types/software';

interface PdfFile {
  label: string;
  url: string;
}

interface Level {
  name: string;
  book: string;
  bookId: string | null;
  desc: string;
  highlights: string[];
  youtubeUrl?: string;
  pdfUrl?: string | PdfFile[];
  companionAppId?: string | null;
  hasCompanionApp?: 'yes' | 'no';
}

interface ScienceData {
  name: string;
  motto: string;
  desc: string;
  levels: Level[];
}

const isPlaceholderHref = (href?: string) => !href || href.trim() === '#';

// ─── موسوعة العلوم الشرعية (محددة بدقة وحسب اختيار المستخدم) ──────────────────────────
const sciencesData: Record<string, ScienceData> = {
  aqeedah: {
    name: 'علم العقيدة والمذاهب والفرق',
    motto: 'فَاعْلَمْ أَنَّهُ لَا إِلَهَ إِلَّا اللَّهُ',
    desc: 'تقرير مسائل الإيمان، وإفراد الله تعالى بالعبودية، وتأصيل عقيدة التوحيد ودفع شبهات المذاهب والفرق المنحرفة.',
    levels: [
      {
        name: 'المستوى الأول: التوحيد الأساسي والاعتقاد',
        book: 'الخريدة البهية في علم التوحيد للإمام أحمد الدردير',
        bookId: null,
        desc: 'منظومة موجزة في بيان قواعد التوحيد وإثبات الصفات الإلهية والنبوية.',
        highlights: [
          'معرفة الصفات الواجبة والمستحيلة والجائزة في حق المولى عز وجل',
          'مباحث الإلهيات والنبوات والسمعيات واليوم الآخر',
          'تأسيس العقيدة الإسلامية الصحيحة على أدلة العقل والنقل'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثاني: نظم العقيدة والمذاهب',
        book: 'منظومة جوهرة التوحيد للإمام إبراهيم اللقاني',
        bookId: null,
        desc: 'المنظومة المشهورة الجامعة لمسائل الاعتقاد ودفع الشبهات ونواقض الإيمان.',
        highlights: [
          'تقسيم مسائل العقيدة إلى الإلهيات والنبوات والسمعيات بالتفصيل',
          'دراسة القدر والقضاء والوعيد ومباحث الصحابة والإمامة',
          'الرد على الفرق المنحرفة وتقرير عقيدة أهل السنة والجماعة'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثالث: التحقيق العقدي والتأصيل المبسوط',
        book: 'العقيدة الكبرى (عمدة أهل التوفيق والتسديد) للإمام محمد بن يوسف السنوسي',
        bookId: null,
        desc: 'المتن الاعتقادي المبسوط المحرر بالأدلة العقلية والنقلية القاطعة.',
        highlights: [
          'البراهين العقلية والنقلية المبسوطة لإثبات وجود الصانع وحدانيته',
          'نقض مقالات الملاحدة والفرق والتوسع في دقائق علم الكلام الشرعي',
          'ترسيخ الملكة الاعتقادية وتأهيل الطالب لدفع الشبهات المعاصرة'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  },

  tafseer: {
    name: 'علم التفسير وعلومه',
    motto: 'كِتَابٌ أَنْزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِيَدَّبَّرُوا آيَاتِهِ',
    desc: 'علم يُعنى بفهم كلام الله تعالى واستخراج معانيه وأحكامه وفق قواعد النزول وغريب الألفاظ والتأصيل التفسيري.',
    levels: [
      {
        name: 'المستوى الأول: قواعد وأصول التفسير',
        book: 'منظومة الزمزمية في أصول التفسير للإمام عبد العزيز الزمزمي',
        bookId: null,
        desc: 'منظومة عذبة تقع في 160 بيتاً حوت أصول التفسير وقواعد نزول القرآن المكي والمدني وأسباب النزول.',
        highlights: [
          'أقسام نزول القرآن الكريم: المكي والمدني، الحضري والسفري، الصيفي والشتائي',
          'دراسة أسباب النزول وأول ما نزل وآخر ما نزل وحفاظ الصحابة والتابعين',
          'قواعد التفسير وضوابط التأويل والتفسير بالمأثور والتفسير بالرأي'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثاني: بيان غريب ألفاظ القرآن',
        book: 'كلمات القرآن تفسير وبيان للشيخ حسنين محمد مخلوف',
        bookId: null,
        desc: 'تفسير محرر وميسر للمفردات والألفاظ القرآنية الغريبة في كامل المصحف الشريف.',
        highlights: [
          'بيان معاني المفردات القرآنية الغريبة والمهمة بترتيب آيات السور',
          'تيسير فهم الألفاظ وتجنيب القارئ الفهم الخاطئ للمشترك اللغوي',
          'مرجع سريع وعملي لحافظ القرآن الكريم وطالب علم التفسير'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  },

  tajweed: {
    name: 'علم التجويد والقراءات',
    motto: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
    desc: 'أشرف العلوم الشرعية غاية، يتعلق بكلام رب العالمين ضبطاً لمخارج الحروف، وتحقيقاً لصفاتها، وتجويداً للألفاظ كما تلقاها الرواة الأثبات بسند متصل.',
    levels: [
      {
        name: 'المستوى الأول: مرحلة التأسيس وتصحيح الحروف',
        book: 'تحفة الأطفال والغلمان في تجويد القرآن',
        bookId: null,
        desc: 'دراسة أساسيات التجويد التي تضبط قراءة العامي وتصحح اللحن الجلي والفي في أحكام النون والميم والمدود.',
        highlights: [
          'أحكام النون الساكنة والتنوين والميم الساكنة والمشددتين',
          'أحكام المدود الطبيعية والفرعية وتفصيل مراتبها العلية',
          'تطبيق عملي وتصحيح التلاوة لجزء عم مع الضبط الصوتي'
        ],
        youtubeUrl: 'https://youtube.com/playlist?list=PLJN0i5WJcTaxqJY-uTcGDJIEkI_NVJ_Ev',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثاني: مرحلة الترقية والضبط الصفاتي',
        book: 'المقدمة الجزرية (متن الجزرية)',
        bookId: 'jazariyyah-book-1',
        desc: 'الغوص في تفاصيل مخارج الحروف وصفاتها الذاتية والعارضية لمعرفة دقيق الأحكام والتفخيم والوقف.',
        highlights: [
          'مخارج الحروف السبعة عشر وصفاتها السبع عشرة المتضادة والمفردة',
          'أحكام التفخيم والترقيق والوقف والابتداء والتقاء الساكنين',
          'معرفة المقطوع والموصول وتاءات التأنيث المرسومة في المصحف'
        ],
        youtubeUrl: 'https://youtube.com/playlist?list=PLJN0i5WJcTaxqJY-uTcGDJIEkI_NVJ_Ev&si=WgRgSB1Js_-qQJYX',
        pdfUrl: [
          { label: 'فتح رب البرية شرح المقدمة الجزرية (مبسط)', url: '/pdf/eljazereyyyah-sharh-1.pdf' },
          { label: 'المنح الفكرية في شرح المقدمة الجزرية (مفصل)', url: '/pdf/eljazereyyyah-sharh-2.pdf' }
        ]
      },
      {
        name: 'المستوى الثالث: مرحلة التمكين والسلسبيل الشافي',
        book: 'متن السلسبيل الشافي',
        bookId: 'salsabil-book',
        desc: 'دراسة جامعة محاطة بالدقة والتحرير في مسائل الأحكام المتقدمة في تجويد القرآن الكريم.',
        highlights: [
          'مباحث الاستعاذة والبسملة وتفصيل ألقاب الحروف وعرائس التلاوة',
          'تحريرات الراءات واللامات وحكم الإدغام المتجانس والمتقارب',
          'التطبيق الصوتي الدقيق والتأهيل لتحصيل الإجازة بالسند المتصل'
        ],
        youtubeUrl: 'https://youtube.com/playlist?list=PLNKQ26Ct6MKKywUNCn1tY6Rf_xnwqWkiJ&si=VvCJyNXGUaItWXzU',
        pdfUrl: [
          { label: 'الوافي في شرح السلسبيل الشافي', url: '/pdf/salsabil-shar7-1.pdf' }
        ],
        companionAppId: 'salsabil-app',
        hasCompanionApp: 'yes'
      }
    ]
  },

  hadith: {
    name: 'علم الحديث وعلومه',
    motto: 'نَضَّرَ اللَّهُ امْرَأً سَمِعَ مَقَالَتِي فَوَعَاهَا',
    desc: 'دراسة سنة النبي ﷺ دراية ورواية، ومعرفة قواعد قبول الأحاديث وردها ورجال الإسناد وشروح المتون النبوية الشريفة.',
    levels: [
      {
        name: 'المستوى الأول: مصطلح الحديث المختصر',
        book: 'المنظومة البيقونية في مصطلح الحديث للإمام عمر بن محمد البيقوني',
        bookId: null,
        desc: 'منظومة عذبة مختصرة تقع في 34 بيتاً جامعة لأهم أقسام الحديث النبوي الشريف.',
        highlights: [
          'معرفة الحديث الصحيح والحسن والضعيف والمرفوع والموقوف والمقطوع',
          'مباحث المنقطع والمعضل والشاذ والمُعَلّل والحديث الموضوع',
          'ضبط مصطلحات المحدثين والقواعد الأولية لنقد الأسانيد'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثاني: نظم مصطلح الأثر',
        book: 'منظومة قصب السكر في مصطلح الأثر للإمام محمد بن إسماعيل الصنعاني',
        bookId: null,
        desc: 'نظم سلس ومتقن لكتاب (نخبة الفكر) للإمام ابن حجر العسقلاني في علوم الحديث.',
        highlights: [
          'التقسيم الرباعي للخبر المتواتر والآحاد والعزيز والغريب والمعنعن',
          'تفصيل أحوال الراوي والجرح والتعديل والضبط والعدالة',
          'شروط قبول الأثر وتحرير المسائل الدقيقة في علم دراية الحديث'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثالث: شروح جوامع الكلم والعلل',
        book: 'جامع العلوم والحكم في شرح خمسين حديثاً من جوامع الكلم للإمام ابن رجب الحنبلي',
        bookId: null,
        desc: 'شرح موسوعي رصين يجمع بين الأحكام الفقهية والتزكية والعلل الحديثية.',
        highlights: [
          'استيعاب جوامع كلم النبي ﷺ الشارحة لأصول الشريعة ومقاصد الدين',
          'تخريج الأحاديث وبيان العلل وفقه المقاصد والحكم الشرعية',
          'الجمع الفريد بين دراية الحديث والعمل وتزكية النفوس بخلق النبوة'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  },

  fiqh: {
    name: 'علم الفقه وأصوله',
    motto: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ',
    desc: 'فهم الأحكام الشرعية العملية واستنباطها من أدلتها التفصيلية وفق القواعد الأصولية المرعية لبناء الفهم الفقهي السليم.',
    levels: [
      {
        name: 'المستوى الأول: مرحلة التأسيس والفقه العملي',
        book: 'متن أبي شجاع (غاية الاختصار)',
        bookId: null,
        desc: 'حصر المسائل الفقهية الأساسية في الطهارة والصلاة والزكاة والصيام والحج والبيوع.',
        highlights: [
          'ضبط شروط الصلاة وأركانها ومبطلاتها وتفاصيل فقه الطهارة',
          'أحكام زكاة الأموال وفريضة الصيام ومناسك الحج والعمرة',
          'المعاملات المالية الأساسية والبيوع المحرمة والأنكحة'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثاني: مرحلة الترقية والأصول الأولى',
        book: 'الورقات في أصول الفقه لإمام الحرمين',
        bookId: null,
        desc: 'معرفة طرق الاستدلال وكيفية إفادة الأحكام من الأدلة الشرعية الإجمالية.',
        highlights: [
          'أقسام الكلام والأمر والنهي والعام والخاص والمجمل والمبين',
          'دراسة أفعال النبي ﷺ والإجماع والقياس والحظر والإباحة',
          'صفات المفتي والمستفتي وشروط الإجتهاد والتقليد'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثالث: مرحلة التمكين والتحقيق الأصولي',
        book: 'منظومة مراقي السعود في أصول الفقه',
        bookId: null,
        desc: 'منظومة حافلة مطولة في أصول الفقه والجامع لمقاصد الشريعة والاستدلال.',
        highlights: [
          'دراسة الأدلة المتفق عليها والمختلف فيها كاستحسان والاستصحاب',
          'مباحث العلة ومسالكها والدلالات والترجيح بين الأقوال',
          'تطبيقات مقاصد الشريعة وتأهيل الطالب لممارسة الاجتهاد'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  },

  arabic: {
    name: 'علم اللغة العربية والبلاغة',
    motto: 'إِنَّا أَنْزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَعَلَّكُمْ تَعْقِلُونَ',
    desc: 'مفتاح فهم الكتاب والسنة، يُعنى بضبط قواعد النحو والصرف وتذوق أسرار البلاغة والبيان العربي.',
    levels: [
      {
        name: 'المستوى الأول: مرحلة النحو الأساسي',
        book: 'نظم الآجرومية في علم النحو',
        bookId: null,
        desc: 'ضبط أبواب الإعراب والبناء وعلامات الأسماء والأفعال والحروف في كلام العرب.',
        highlights: [
          'معرفة كلام العرب وأقسام الكلمة وعلامات الإعراب الأصلية والفرعية',
          'المرفوعات من الأسماء: الفاعل، المبتدأ، الخبر، اسم كان وخبر إن',
          'المنصوبات والمجرورات وحروف الخفض وتطبيقات إعرابية سريعة'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثاني: مرحلة النحو المتقدم والتأصيل',
        book: 'متن ألفية ابن مالك في النحو والصرف',
        bookId: null,
        desc: 'المنظومة النحوية الكبرى الجامعة لقواعد اللسان العربي وشواهد العرب.',
        highlights: [
          'حفظ الاستشهاد النحوي وشواهد لغة العرب وأبواب الصرف والإبدال',
          'دراسة التنازع والإعمال والترخيم والإمالة والتصغير والنسب',
          'امتلاك الملكة اللغوية الكاملة لقراءة وأداء أمات الكتب الشرعية'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      },
      {
        name: 'المستوى الثالث: مرحلة البلاغة والبيان',
        book: 'الجوهر المكنون في الصدف في الثلاثة فنون للإمام الأخضري',
        bookId: null,
        desc: 'المنظومة البلاغية المحررة في علوم البلاغة الثلاثة: المعاني والبيان والبديع.',
        highlights: [
          'علم المعاني: أحوال المسند والمسند إليه والإيجاز والإطناب والمساواة',
          'علم البيان: التشبيه وأنواعه والاستعارة التصريحية والمكنية والتمثيلية',
          'علم البديع: المحسنات اللفظية والمعنوية كالجناس والمطابقة والسجع'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  },

  seerah: {
    name: 'علم السيرة النبوية والتاريخ',
    motto: 'لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ',
    desc: 'دراسة أحداث السيرة النبوية العطرة وتتبع وقائع التاريخ الإسلامي للاقتداء بالنبي ﷺ واستبصار دروس السيرة.',
    levels: [
      {
        name: 'المتن المعتمد: السيرة النبوية المنظومة',
        book: 'الأرجوزة المئية في ذكر حال أشرف البرية لابن أبي العز الحنفي',
        bookId: null,
        desc: 'منظومة لطيفة مئية البيت في ترتيب أحداث السيرة النبوية الشريفة من الميلاد إلى الوفاة.',
        highlights: [
          'نسب النبي ﷺ وميلاده ورضاعه ونشأته الشريفة بمكة المكرمة',
          'بعثته ﷺ والهجرة المباركة إلى المدينة المنورة والغزوات الكبرى',
          'حجة الوداع ووفاته ﷺ وأخلاقه وشمائله العطرة'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  },

  logic: {
    name: 'علم المنطق وصيانة التفكير',
    motto: 'آلَةٌ قَانُونِيَّةٌ تَعْصِمُ ذِهْنَ مُرَاعِيهَا عَنِ الْخَطَأِ',
    desc: 'علم معياري يضبط آلات التفكير والاستدلال العقلي والتعاريف والتقاسيم، ويمنع وقوع الذهن في المغالطات.',
    levels: [
      {
        name: 'المتن المعتمد: المنطق المعياري',
        book: 'متن السلم المنورق في علم المنطق للإمام الأخضري',
        bookId: null,
        desc: 'المنظومة المنطقية العذبة الجامعة لمباحث التصورات والتصديقات والقياس.',
        highlights: [
          'دراسة الألفاظ والدلالات الوضعية والكليات الخمس والتصورات',
          'أنواع القضايا الحملية الشرطية والعكوس والأشكال الأربعة للقياس',
          'مباحث البرهان والخطابة والجدل والمغالطة'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  },

  debate: {
    name: 'علم أدب البحث والمناظرة',
    motto: 'مُحَاوَرَةٌ لِإِظْهَارِ الْحَقِّ وَدَفْعِ الشُّبَهَاتِ',
    desc: 'قواعد الحوار والمناظرة العلمية الرصينة، وضبط آداب البحث وتفنيد الاعتراضات بالبرهان الشرعي والعقلي.',
    levels: [
      {
        name: 'المتن المعتمد: آداب البحث والمناظرة',
        book: 'الرسالة السمرقندية في آداب البحث والمناظرة للإمام السمرقندي',
        bookId: null,
        desc: 'الرسالة الجامعة في ضبط الوظائف الثلاث للمناظر: المنع، المعارضة، والمطالبة.',
        highlights: [
          'تعريف المناظرة ووظائف السائل والمعلل والمانع',
          'دراسة أنواع الاعتراضات: المنع والمناقضة والمعارضة والنقض',
          'الآداب الأخلاقية والشرعية للمناظر والمستدل'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  },

  tazkiyah: {
    name: 'علم التصوف والتزكية',
    motto: 'قَدْ أَفْلَحَ مَنْ زَكَّاهَا',
    desc: 'تصفية القلوب من أمراض النفوس وتزكيتها بفضائل الأخلاق، ومحبة الله ورسوله ﷺ والتخلق بالآداب الشرعية.',
    levels: [
      {
        name: 'المتن المعتمد: محبة النبي ﷺ والتزكية',
        book: 'قصيدة البردة (الكواكب الدريّة في مدح خير البرية) للإمام البوصيري',
        bookId: null,
        desc: 'القصيدة السيارة الخالدة في الشمائل والمداح النبوية وتزكية النفس بمحبة الحبيب ﷺ.',
        highlights: [
          'مباحث التزكية والتحذير من دواعي النفس والهوى',
          'مدح النبي ﷺ والحديث عن مولده ومعجزاته والإسراء والمعراج',
          'التوسل والمناجاة والاستغفار والتخلق بالآداب النبوية العلية'
        ],
        youtubeUrl: '#',
        pdfUrl: '#'
      }
    ]
  }
};

// خريطة التناظر مع المعرفات المختلفة
const aliasMap: Record<string, string> = {
  'tajweed': 'tajweed',
  'tajwid': 'tajweed',
  'quranic-sciences': 'tajweed',
  'qiraat': 'tajweed',

  'tafseer': 'tafseer',
  'tafsir': 'tafseer',

  'aqeedah': 'aqeedah',
  'aqeedah-sciences': 'aqeedah',

  'hadith': 'hadith',
  'hadith-sciences': 'hadith',

  'fiqh': 'fiqh',
  'fiqh-sciences': 'fiqh',

  'arabic': 'arabic',
  'arabic-language': 'arabic',
  'nahw': 'arabic',
  'balagha': 'arabic',
  'rhetoric': 'arabic',

  'seerah': 'seerah',
  'seerah-history': 'seerah',

  'logic': 'logic',
  'mantiq': 'logic',

  'debate': 'debate',
  'munadhara': 'debate',

  'tazkiyah': 'tazkiyah',
  'tasawwuf': 'tazkiyah'
};

export default function DynamicSciencePage({ params }: { params: Promise<{ scienceId: string }> }) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.scienceId;
  const targetKey = aliasMap[rawId] || rawId;
  const science = sciencesData[targetKey];

  const [softwareCatalog, setSoftwareCatalog] = useState<SoftwareResource[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    import('@/data/softwareData.json')
      .then((m) => {
        if (isMounted) setSoftwareCatalog(m.default as SoftwareResource[]);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  if (!science) {
    notFound();
  }

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-8" dir="rtl">
        {/* 🌟 الخلفيات الروحية الراقية */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[750px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,109,111,0.03),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(0,179,183,0.06),transparent_60%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* زر الرجوع لقائمة العلوم */}
          <div className="mb-6">
            <Link
              href="/sciences"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-border bg-card text-xs font-bold text-muted hover:text-foreground hover:bg-border/20 transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لكافة العلوم الشرعية</span>
            </Link>
          </div>

          {/* ترويسة العلم الفاخرة */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] text-xs font-bold mb-4 border border-brand-primary/10">
              <GraduationCap className="w-4 h-4" />
              <span>المسار التعليمي المنهجي</span>
            </div>
            <h1 className="font-amiri text-3xl sm:text-5xl font-bold text-foreground leading-tight">
              {science.name}
            </h1>
            <p className="text-sm font-amiri font-bold text-brand-secondary dark:text-[#E7C682] mt-2">
              «{science.motto}»
            </p>
            <p className="text-xs sm:text-sm text-muted mt-4 font-tajawal font-medium leading-relaxed">
              {science.desc}
            </p>
          </div>

          {/* قائمة المستويات المنهجية التفاعلية */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {science.levels.map((level, idx) => {
              const hasYoutube = !isPlaceholderHref(level.youtubeUrl);
              const hasMultiplePdfs = Array.isArray(level.pdfUrl) && level.pdfUrl.length > 0;
              const hasSinglePdf = typeof level.pdfUrl === 'string' && !isPlaceholderHref(level.pdfUrl);
              const isDropdownOpen = openDropdownId === idx;

              // مطابقة التطبيق المساند إذا وجد
              const matchedApp = level.companionAppId
                ? softwareCatalog.find((a) => a.id === level.companionAppId)
                : null;

              // مطابقة الكتاب بالمكتبة الرقمية إذا وجد
              const matchedBook = level.bookId
                ? (booksData as Book[]).find((b) => b.id === level.bookId)
                : null;

              return (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 80}>
                  <div className="bg-card border border-border dark:border-[#212C2C] p-6 sm:p-8 rounded-[28px] shadow-premium hover:shadow-premium-hover transition-all duration-300 relative overflow-hidden">
                    {/* شريط تمييز جانبي للمستوى */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-border/60 dark:border-[#212C2C]/60">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-brand-primary dark:text-[#00B3B7] bg-brand-primary-light/50 dark:bg-brand-primary-light/10 border border-brand-primary/10 px-3 py-1 rounded-full">
                          {level.name}
                        </span>
                        {matchedBook && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                            متوفر بالمكتبة الرقمية
                          </span>
                        )}
                        {matchedApp && (
                          <span className="text-[10px] font-bold text-brand-secondary dark:text-[#E7C682] bg-brand-secondary-light/40 dark:bg-brand-secondary-light/10 border border-brand-secondary/20 px-2.5 py-0.5 rounded-md">
                            مصحوب بتطبيق مساند 📱
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="font-amiri font-bold text-2xl text-foreground mb-2">
                      {level.book}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted font-tajawal font-medium leading-relaxed mb-6">
                      {level.desc}
                    </p>

                    {/* أهداف وأبرز محاور المستوى */}
                    <div className="bg-background/60 dark:bg-background/20 p-4 sm:p-5 rounded-2xl border border-border/50 dark:border-[#212C2C]/50 mb-6">
                      <span className="text-xs font-bold text-foreground block mb-3">أبرز المحاور والغايات المنهجية:</span>
                      <ul className="space-y-2">
                        {level.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs font-bold text-muted">
                            <Sparkles className="w-3.5 h-3.5 text-brand-secondary shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* زر الإجراءات التفاعلية للمستوى (الشرح الصوتي، كتاب الشرح، تحميل التطبيق / المتن) */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {/* 1. رابط الشرح الصوتي والمرئي (YouTube) */}
                      {hasYoutube ? (
                        <a
                          href={level.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          <Video className="w-4 h-4" />
                          <span>الشرح الصوتي والمرئي</span>
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-border/20 text-light-text text-xs font-bold cursor-not-allowed">
                          <Video className="w-4 h-4 opacity-50" />
                          <span>الشرح الصوتي (قريباً)</span>
                        </div>
                      )}

                      {/* 2. تحميل كتاب الشرح (PDF مفرد أو قائمة شروحات) */}
                      {hasMultiplePdfs ? (
                        <div className="relative">
                          <button
                            onClick={() => setOpenDropdownId(isDropdownOpen ? null : idx)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] border border-brand-primary/10 hover:bg-brand-primary/10 text-xs font-bold transition-all cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>تحميل كتب الشرح (PDF)</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-card border border-border dark:border-[#212C2C] rounded-2xl shadow-2xl p-2 z-30 animate-fade-in flex flex-col gap-1">
                              {(level.pdfUrl as PdfFile[]).map((pdf, pIdx) => (
                                <a
                                  key={pIdx}
                                  href={pdf.url}
                                  download
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-background/80 text-xs font-bold text-foreground transition-all group"
                                >
                                  <span className="truncate">{pdf.label}</span>
                                  <Download className="w-3.5 h-3.5 text-brand-primary group-hover:scale-110 transition-transform shrink-0" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : hasSinglePdf ? (
                        <a
                          href={level.pdfUrl as string}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary-light/50 dark:bg-brand-primary-light/10 text-brand-primary dark:text-[#00B3B7] border border-brand-primary/10 hover:bg-brand-primary/10 text-xs font-bold transition-all cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>تحميل كتاب الشرح (PDF)</span>
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-border/20 text-light-text text-xs font-bold cursor-not-allowed">
                          <Download className="w-4 h-4 opacity-50" />
                          <span>كتاب الشرح (قريباً)</span>
                        </div>
                      )}

                      {/* 3. تحميل التطبيق (إن وجد) أو تحميل المتن */}
                      {matchedApp ? (
                        <Link
                          href={`/software/${matchedApp.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-secondary-light/40 dark:bg-brand-secondary-light/10 text-brand-secondary dark:text-[#E7C682] border border-brand-secondary/20 hover:bg-brand-secondary hover:text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          <Smartphone className="w-4 h-4" />
                          <span>تحميل التطبيق ({matchedApp.name})</span>
                        </Link>
                      ) : matchedBook ? (
                        <Link
                          href={`/books/${matchedBook.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>تحميل وتصفح المتن</span>
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-border/20 text-light-text text-xs font-bold cursor-not-allowed">
                          <BookOpen className="w-4 h-4 opacity-50" />
                          <span>تحميل المتن (قريباً)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
