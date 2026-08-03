const fs = require('fs');
const path = require('path');

const booksRaw = [
    {
        "id": "tuhfah-matn",
        "title": "متن تحفة الأطفال",
        "author": "سليمان بن حسين بن محمد الجمزوري",
        "description": "متن منظومة تحفة الأطفال في علم التجويد، مخصص للقراءة والحفظ، ويُعد من أشهر المتون التعليمية للمبتدئين في أحكام التجويد.",
        "fileUrl": "/pdf/tuhfah-matn.pdf",
        "category": "تجويد",
        "pages": 12,
        "fileSize": "95.09 KB",
        "format": "PDF"
    },
    {
        "id": "tuhfah-jamzoori",
        "title": "تحفة الأطفال",
        "author": "سليمان بن حسين بن محمد الجمزوري",
        "description": "منظومة علمية مختصرة في أحكام التجويد، ألّفها الإمام سليمان الجمزوري، وتُعد من أشهر المتون التعليمية للمبتدئين في دراسة التجويد.",
        "fileUrl": "/pdf/tuhfah-jamzoori.pdf",
        "category": "تجويد",
        "pages": 23,
        "fileSize": "826.77 KB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-balousha",
        "title": "شرح الجزرية لابن بالوشه المسمى الفوائد المفهمة في شرح الجزرية المقدمة",
        "author": "محمد بن بالوشه الشريف",
        "description": "شرح مفصل للمقدمة الجزرية يوضح أحكام التجويد بأسلوب علمي مبسط، مع بيان معاني الأبيات وشرح مسائل المخارج والصفات وأحكام التلاوة.",
        "fileUrl": "/pdf/jazariyyah-balousha.pdf",
        "category": "تجويد",
        "pages": 163,
        "fileSize": "2.31 MB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-60qa",
        "title": "شرح الجزرية في 60 سؤال وجواب",
        "author": "محمد بن مغربي البيطار",
        "description": "شرح للمقدمة الجزرية بأسلوب السؤال والجواب، ييسر فهم أبيات المنظومة وأحكام التجويد، ويصلح للمبتدئين وطلاب حلقات القرآن.",
        "fileUrl": "/pdf/jazariyyah-60qa.pdf",
        "category": "تجويد",
        "pages": 92,
        "fileSize": "5.52 MB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-matn",
        "title": "متن الجزرية",
        "author": "ابن الجزري",
        "description": "منظومة المقدمة الجزرية للإمام ابن الجزري، من أشهر المتون في علم التجويد، تناولت أحكام التلاوة والمخارج والصفات بأسلوب منظوم، وتُعد أساسًا لدراسة التجويد العلمي.",
        "fileUrl": "/pdf/jazariyyah-matn.pdf",
        "category": "تجويد",
        "pages": 36,
        "fileSize": "2.09 MB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-maliki",
        "title": "الجزرية",
        "author": "علي بن أمير المالكي",
        "description": "نسخة من منظومة الجزرية في علم التجويد للإمام ابن الجزري، اعتنى بها علي بن أمير المالكي، وتناسب طلاب التجويد للحفظ والمراجعة ودراسة أحكام التلاوة.",
        "fileUrl": "/pdf/jazariyyah-maliki.pdf",
        "category": "تجويد",
        "pages": 39,
        "fileSize": "1.84 MB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-daqaiq",
        "title": "الدقائق المحكمة في شرح المقدمة الجزرية",
        "author": "زكريا الأنصاري بن محمد بن الجزري",
        "description": "شرح علمي للمقدمة الجزرية يبين معاني أبياتها وأحكام التجويد بأسلوب واضح، مع توضيح المخارج والصفات وأهم مسائل التلاوة، مناسب لطلاب العلم ودارسي التجويد.",
        "fileUrl": "/pdf/jazariyyah-daqaiq.pdf",
        "category": "تجويد",
        "pages": 47,
        "fileSize": "1.61 MB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-daqaiq-sharh",
        "title": "شرح الدقائق المحكمة في شرح المقدمة الجزرية",
        "author": "سيد لاشين أبو الفرح",
        "description": "شرح موسع لكتاب الدقائق المحكمة في شرح المقدمة الجزرية، يتناول مسائل التجويد وشرح أبيات الجزرية بأسلوب علمي يناسب طلاب العلم والمتخصصين.",
        "fileUrl": "/pdf/jazariyyah-daqaiq-sharh.pdf",
        "category": "تجويد",
        "pages": 230,
        "fileSize": "3.55 MB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-zuabi",
        "title": "المقدمة الجزرية",
        "author": "الإمام ابن الجزري",
        "description": "متن المقدمة الجزرية في علم التجويد للإمام ابن الجزري، ضبط وتصحيح محمد تميم الزعبي.",
        "fileUrl": "/pdf/jazariyyah-zuabi.pdf",
        "category": "تجويد",
        "pages": 12,
        "fileSize": "1.72 MB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-daqaiq-zakariya",
        "title": "الدقائق المحكمة في شرح المقدمة الجزرية ومعه دروس مهمة",
        "author": "شيخ الإسلام زكريا الأنصاري",
        "description": "شرح نفيس للمقدمة الجزرية للإمام ابن الجزري، يوضح معاني الأبيات وأحكام التجويد بأسلوب علمي، ويضم مجموعة من الدروس والفوائد المهمة لطلاب علم التجويد.",
        "fileUrl": "/pdf/jazariyyah-daqaiq-zakariya.pdf",
        "category": "تجويد",
        "pages": 423,
        "fileSize": "9.35 MB",
        "format": "PDF"
    },
    {
        "id": "jazariyyah-83",
        "title": "الجزرية",
        "author": "محمد الجزري",
        "description": "نسخة من المقدمة الجزرية في علم التجويد للإمام محمد بن محمد الجزري، تضم متن المنظومة كاملًا، وتناسب الحفظ والمراجعة ودراسة أحكام التلاوة.",
        "fileUrl": "/pdf/jazariyyah-83.pdf",
        "category": "تجويد",
        "pages": 42,
        "fileSize": "1.69 MB",
        "format": "PDF"
    },
    {
        "id": "salsabil-matn",
        "title": "السلسيل الشافي في علم التجويد",
        "author": "عثمان بن سليمان مراد",
        "description": "متن منظوم في علم التجويد، يضم أهم أحكام التلاوة بأسلوب شعري سهل، مناسب للحفظ والمراجعة وطلاب علم التجويد.",
        "fileUrl": "/pdf/salsabil-matn.pdf",
        "category": "تجويد",
        "pages": 13,
        "fileSize": "747.78 KB",
        "format": "PDF"
    },
    {
        "id": "salsabil-qasr",
        "title": "السلسيل الشافي ورسالة قصر المنفصل",
        "author": "عثمان بن سليمان مراد",
        "description": "يجمع هذا الكتاب متن السلسيل الشافي في علم التجويد مع رسالة مختصرة في بيان قصر المنفصل، ويعد مناسبًا للحفظ والمراجعة وطلاب علم التجويد.",
        "fileUrl": "/pdf/salsabil-qasr.pdf",
        "category": "تجويد",
        "pages": 22,
        "fileSize": "2.32 MB",
        "format": "PDF"
    },
    {
        "id": "salsabil-sharh",
        "title": "الوافي في شرح السلسيل الشافي في علم التجويد",
        "author": "محمد خالد منصور",
        "description": "شرح لكتاب السلسيل الشافي في علم التجويد، يوضح أبيات المتن ويبين أحكام التجويد بأسلوب سهل ومنظم، مناسب لطلاب العلم والراغبين في التوسع في دراسة التجويد.",
        "fileUrl": "/pdf/salsabil-sharh.pdf",
        "category": "تجويد",
        "pages": 149,
        "fileSize": "3.19 MB",
        "format": "PDF"
    },
    {
        "id": "salsabil-matn-2",
        "title": "متن السلسيل الشافي في علم التجويد",
        "author": "عثمان بن سليمان مراد",
        "description": "متن منظوم في علم التجويد يشتمل على أهم أحكام التلاوة بأسلوب سهل ومختصر، ضبط وتحقيق: حامد بن خيرالله سعيد.",
        "fileUrl": "/pdf/salsabil-matn-2.pdf",
        "category": "تجويد",
        "pages": 22,
        "fileSize": "5.28 MB",
        "format": "PDF"
    },
    {
        "id": "thamr-mufid",
        "title": "الثمر المفيد في علم التجويد",
        "author": "إبراهيم هاني المصري الباقي (أبو عبد الله)",
        "description": "كتاب يشرح أحكام التجويد بأسلوب ميسر، مع تدريبات وتطبيقات عملية تساعد على إتقان التلاوة.",
        "fileUrl": "/pdf/thamr-mufid.pdf",
        "category": "تجويد",
        "pages": 91,
        "fileSize": "7.21 MB",
        "format": "PDF"
    },
    {
        "id": "mufid-matn",
        "title": "متن المفيد في علم التجويد",
        "author": "محمد بن شامي شيبة",
        "description": "متن منظوم في علم التجويد يتناول أهم أحكام التلاوة بأسلوب مختصر وسهل.",
        "fileUrl": "/pdf/mufid-matn.pdf",
        "category": "تجويد",
        "pages": 14,
        "fileSize": "635.49 KB",
        "format": "PDF"
    },
    {
        "id": "tuhfah-fath-aqfal",
        "title": "فتح الأقفال شرح متن تحفة الأطفال",
        "author": "سليمان الجمزوري",
        "description": "شرح لكتاب متن تحفة الأطفال في علم التجويد، يوضح أبيات المنظومة وأحكام التجويد بأسلوب سهل وميسر، مناسب للمبتدئين وطلاب حلقات القرآن الكريم.",
        "fileUrl": "/pdf/tuhfah-fath-aqfal.pdf",
        "category": "تجويد",
        "pages": 87,
        "fileSize": "1.03 MB",
        "format": "PDF"
    },
    {
        "id": "tuhfah-fath-aqfal-jamzuri",
        "title": "فتح الأقفال شرح تحفة الأطفال",
        "author": "سليمان الجمزوري",
        "description": "شرح لكتاب تحفة الأطفال في علم التجويد، يوضح أبيات المنظومة وأحكامها بأسلوب سهل ومنظم، ويعد من الشروح المناسبة للمبتدئين وطلاب حلقات القرآن الكريم.",
        "fileUrl": "/pdf/tuhfah-fath-aqfal-jamzuri.pdf",
        "category": "تجويد",
        "pages": 117,
        "fileSize": "4.66 MB",
        "format": "PDF"
    },
    {
        "id": "tuhfah-bayan",
        "title": "البيان في شرح متن تحفة الأطفال في تجويد القرآن",
        "author": "خالد حسن جياش",
        "description": "شرح ميسر لمتن تحفة الأطفال، يوضح أحكام التجويد بأسلوب سهل مع الأمثلة والتطبيقات، مناسب للمبتدئين وطلاب حلقات القرآن الكريم.",
        "fileUrl": "/pdf/tuhfah-bayan.pdf",
        "category": "تجويد",
        "pages": 114,
        "fileSize": "20.97 MB",
        "format": "PDF"
    },
    {
        "id": "tamhid-jazari",
        "title": "التمهيد في علم التجويد",
        "author": "الإمام ابن الجزري",
        "description": "كتاب في علم التجويد للإمام ابن الجزري، يتناول قواعد التجويد وأحكام التلاوة بأسلوب علمي، ويعد من المراجع المهمة لطلاب هذا الفن.",
        "fileUrl": "/pdf/tamhid-jazari.pdf",
        "category": "تجويد",
        "pages": 255,
        "fileSize": "3.29 MB",
        "format": "PDF"
    },
    {
        "id": "ahkam-quran-husary",
        "title": "أحكام قراءة القرآن الكريم",
        "author": "الشيخ محمود خليل الحصري",
        "description": "من أشهر كتب التجويد للشيخ محمود خليل الحصري، يعرض أحكام تلاوة القرآن الكريم بأسلوب واضح ومتدرج، جامعًا بين التأصيل العلمي وسهولة العرض، ويعد مرجعًا مهمًا لطلاب علم التجويد.",
        "fileUrl": "/pdf/ahkam-quran-husary.pdf",
        "category": "تجويد",
        "pages": 375,
        "fileSize": "11.75 MB",
        "format": "PDF"
    },
    {
        "id": "taysir-rahman-tajweed",
        "title": "تيسير الرحمن في تجويد القرآن ملون",
        "author": "الدكتورة سعاد عبد الحميد",
        "description": "كتاب تعليمي في علم التجويد يجمع معظم مسائل التجويد بأسلوب واضح ومنهجي، مع ترتيب متدرج وعبارات ميسرة، ويعد مرجعًا مناسبًا للمبتدئين وطلاب حلقات القرآن الكريم، مع المحافظة على التأصيل العلمي لأحكام التلاوة.",
        "fileUrl": "/pdf/taysir-rahman-tajweed.pdf",
        "category": "تجويد",
        "pages": 352,
        "fileSize": "30.32 MB",
        "format": "PDF"
    },
    {
        "id": "aysar-maqal-tuhfah",
        "title": "أيسر المقال في شرح تحفة الأطفال",
        "author": "محمد رفيق مؤمن الشوبكي",
        "description": "شرح ميسر لمتن تحفة الأطفال، يتناول أبيات المنظومة بيتًا بيتًا مع بيان معانيها وأحكام التجويد المستفادة منها بأسلوب واضح ومنظم، مما يجعله مناسبًا للمبتدئين وطلاب حلقات القرآن الكريم.",
        "fileUrl": "/pdf/aysar-maqal-tuhfah.pdf",
        "category": "تجويد",
        "pages": 45,
        "fileSize": "4.82 MB",
        "format": "PDF"
    },
    {
        "id": "tajweed-musawwar-hafs",
        "title": "التجويد المصور برواية حفص",
        "author": "منير فتحي عطا الله",
        "description": "كتاب تعليمي مصور في علم التجويد برواية حفص عن عاصم، يعتمد على اللوحات التعليمية والرسوم التوضيحية لشرح أحكام التلاوة والمخارج والصفات، مما يسهل فهم المسائل وتطبيقها عمليًا.",
        "fileUrl": "/pdf/tajweed-musawwar-hafs.pdf",
        "category": "تجويد",
        "pages": 214,
        "fileSize": "19.19 MB",
        "format": "PDF"
    },
    {
        "id": "it-haf-bariyyah-tuhfah-samnudiyyah",
        "title": "إتحاف البرية بضبط متن التحفة السمنودية في تجويد الكلمات القرآنية",
        "author": "عبد الفتاح مدكور",
        "description": "كتاب يعتني بضبط متن التحفة السمنودية في تجويد الكلمات القرآنية، مع العناية بالشكل الصحيح لألفاظ المتن، مما يسهل قراءته وحفظه ويعين طلاب التجويد على إتقان ألفاظ المنظومة.",
        "fileUrl": "/pdf/it-haf-bariyyah-tuhfah-samnudiyyah.pdf",
        "category": "تجويد",
        "pages": 65,
        "fileSize": "4.64 MB",
        "format": "PDF"
    },
    {
        "id": "tuhfah-samnudiyyah",
        "title": "التحفة السمنودية",
        "author": "إبراهيم شحاتة السمنودي",
        "description": "متن مختصر في تجويد الكلمات القرآنية للإمام إبراهيم شحاتة السمنودي، يتناول أهم القواعد المتعلقة بضبط الكلمات وأوجه أدائها بأسلوب منظوم، ويعد مناسبًا للحفظ والمراجعة وطلاب علم التجويد.",
        "fileUrl": "/pdf/tuhfah-samnudiyyah.pdf",
        "category": "تجويد",
        "pages": 13,
        "fileSize": "452.69 KB",
        "format": "PDF"
    },
    {
        "id": "lula-bayan-tajweed",
        "title": "لؤلؤ البيان في تجويد القرآن",
        "author": "إبراهيم علي شحاتة السمنودي",
        "description": "رسالة مختصرة في علم التجويد تتناول أهم أحكام تلاوة القرآن الكريم بأسلوب موجز ومنظم.",
        "fileUrl": "/pdf/lula-bayan-tajweed.pdf",
        "category": "تجويد",
        "pages": 10,
        "fileSize": "665.45 KB",
        "format": "PDF"
    },
    {
        "id": "sharh-tuhfah-samnudiyyah",
        "title": "شرح منظومة التحفة السمنودية في تجويد الكلمات القرآنية",
        "author": "د. نمشة بنت عبد الله الطوالة",
        "description": "بحث علمي يتناول شرح منظومة التحفة السمنودية في تجويد الكلمات القرآنية، مع بيان ألفاظ المنظومة وشرح مسائلها المتعلقة بمخارج الحروف والحركات الأصلية وباب إقلاب الحروف، بأسلوب أكاديمي واضح يخدم دارسي علم التجويد.",
        "fileUrl": "/pdf/sharh-tuhfah-samnudiyyah.pdf",
        "category": "تجويد",
        "pages": 36,
        "fileSize": "446 KB",
        "format": "PDF"
    },
    {
        "id": "al-radiyyah-dabt-samnudiyyah",
        "title": "الرضية الندية في ضبط التحفة السمنودية في تجويد الكلمات القرآنية",
        "author": "محمود محمد محمود مرسي",
        "description": "كتاب يعتني بضبط متن التحفة السمنودية في تجويد الكلمات القرآنية، مع توثيق ألفاظ المنظومة بالشكل الصحيح وبيان مواضع الضبط، ليسهل حفظها وقراءتها على الوجه المتقن لطلاب علم التجويد.",
        "fileUrl": "/pdf/al-radiyyah-dabt-samnudiyyah.pdf",
        "category": "تجويد",
        "pages": 234,
        "fileSize": "5.88 MB",
        "format": "PDF"
    },
    {
        "id": "mudhakkirah-tajweed-hafs",
        "title": "المذكرة في التجويد برواية حفص عن عاصم من طريق الشاطبية",
        "author": "محمد نبهان بن حسين مصري",
        "description": "مذكرة تعليمية في أحكام التجويد برواية حفص عن عاصم من طريق الشاطبية، تعرض أهم قواعد التلاوة بأسلوب مختصر ومنظم، مع التركيز على المسائل العملية التي يحتاجها طالب القرآن أثناء الدراسة والمراجعة.",
        "fileUrl": "/pdf/mudhakkirah-tajweed-hafs.pdf",
        "category": "تجويد",
        "pages": 111,
        "fileSize": "1.85 MB",
        "format": "PDF"
    },
    {
        "id": "tajweed-musawwar-mutawar",
        "title": "التجويد المصور بأسلوب مطور",
        "author": "عفيفي سليمان",
        "description": "كتاب تعليمي يعتمد على أسلوب بصري حديث في شرح أحكام التجويد، حيث يوظف الألوان والرسوم والجداول لتبسيط القواعد وتقريبها للدارس، مما يساعد على سرعة الفهم وترسيخ الأحكام وتطبيقها أثناء تلاوة القرآن الكريم.",
        "fileUrl": "/pdf/tajweed-musawwar-mutawar.pdf",
        "category": "تجويد",
        "pages": 88,
        "fileSize": "26.05 MB",
        "format": "PDF"
    },
    {
        "id": "tajweed-musawwar-02",
        "title": "التجويد المصور 02",
        "author": "جمعة نشوان عياش",
        "description": "الجزء الثاني من سلسلة التجويد المصور، يقدم ملخصًا لأهم أحكام التجويد والمخارج والصفات بأسلوب بصري مبسط، مع الاعتماد على الجداول والرسوم التوضيحية لتسهيل المراجعة وتثبيت المعلومات لدى دارسي القرآن الكريم.",
        "fileUrl": "/pdf/tajweed-musawwar-02.pdf",
        "category": "تجويد",
        "pages": 19,
        "fileSize": "11.27 MB",
        "format": "PDF"
    },
    {
        "id": "tajweed-muyassar",
        "title": "التجويد الميسر",
        "author": "عبد العزيز بن عبد الفتاح القارئ",
        "description": "كتاب تعليمي يجمع بين التأصيل العلمي وسهولة العرض، حيث يشرح أحكام التجويد بأسلوب ميسر مدعوم بالأمثلة التطبيقية، مع ترتيب متدرج للموضوعات يساعد القارئ على تعلم قواعد التلاوة وإتقانها بصورة عملية.",
        "fileUrl": "/pdf/tajweed-muyassar.pdf",
        "category": "تجويد",
        "pages": 124,
        "fileSize": "9.94 MB",
        "format": "PDF"
    },
    {
        "id": "tajweed-muyassar-hudhaifi",
        "title": "التجويد الميسر",
        "author": "د. علي بن عبد الرحمن الحذيفي",
        "description": "كتاب يجمع بين التأصيل العلمي والتطبيق العملي لأحكام التجويد، حيث يعرض القواعد بأسلوب واضح مدعوم بالأمثلة والشواهد من القرآن الكريم، مع ترتيب منهجي يسهل على الدارس تعلم أحكام التلاوة وإتقانها.",
        "fileUrl": "/pdf/tajweed-muyassar-hudhaifi.pdf",
        "category": "تجويد",
        "pages": 189,
        "fileSize": "4.24 MB",
        "format": "PDF"
    },
    {
        "id": "tajweed-muyassar-qa",
        "title": "التجويد الميسر في سؤال وجواب",
        "author": "إسلام محمود درباله",
        "description": "يعرض الكتاب أحكام التجويد في صورة أسئلة وأجوبة، مما يسهل استيعاب القواعد ومراجعتها بطريقة تفاعلية، ويغطي أهم أبواب التجويد بأسلوب مختصر يناسب الطلاب والمعلمين وحلقات القرآن الكريم.",
        "fileUrl": "/pdf/tajweed-muyassar-qa.pdf",
        "category": "تجويد",
        "pages": 80,
        "fileSize": "6.61 MB",
        "format": "PDF"
    },
    {
        "id": "tajdid-itqan-tajweed",
        "title": "التجديد في الإتقان والتجويد",
        "author": "محمد محمود عبد السميع الشافعي الحنفي",
        "description": "كتاب في علم التجويد يعتني ببيان قواعد الأداء وأحكام التلاوة بأسلوب علمي، ويتناول مخارج الحروف وصفاتها وأبواب التجويد مع الاستشهاد بالأمثلة، مما يجعله مرجعًا نافعًا لطلاب علم التجويد والقراءات.",
        "fileUrl": "/pdf/tajdid-itqan-tajweed.pdf",
        "category": "تجويد",
        "pages": 248,
        "fileSize": "3.59 MB",
        "format": "PDF"
    },
    {
        "id": "tajweed-muyassar-murshidah",
        "title": "التجويد الميسر",
        "author": "مرشدة رزوق",
        "description": "كتاب تعليمي أُعد لتيسير تعلم أحكام التجويد بأسلوب مبسط ومنظم، ويعرض القواعد الأساسية مدعومة بالأمثلة التطبيقية والتمارين، مما يجعله مناسبًا للمبتدئين والمعلمين وطلاب حلقات القرآن الكريم.",
        "fileUrl": "/pdf/tajweed-muyassar-murshidah.pdf",
        "category": "تجويد",
        "pages": 116,
        "fileSize": "9.76 MB",
        "format": "PDF"
    },
    {
        "id": "mutun-tajweed-khaqaniyyah",
        "title": "متون التجويد (الخاقانية)",
        "author": "مكتبة الخضري",
        "description": "نسخة من منظومة الخاقانية، وهي أول منظومة مشهورة أُلِّفت في علم التجويد، تجمع أصول الأداء وأحكام التلاوة في أبيات يسهل حفظها، وتعد من المتون التراثية المهمة لدارسي التجويد والقراءات.",
        "fileUrl": "/pdf/mutun-tajweed-khaqaniyyah.pdf",
        "category": "تجويد",
        "pages": 10,
        "fileSize": "2.35 MB",
        "format": "PDF"
    },
    {
        "id": "fath-rabbani-khaqani",
        "title": "الفتح الرباني في شرح رائية الخاقاني",
        "author": "د. إسلام بن نصر الأزهري",
        "description": "شرح علمي لمنظومة رائية الخاقاني، يوضح أبيات المنظومة ويبين مقاصدها في علم التجويد، مع شرح المصطلحات وذكر الفوائد والأمثلة، مما يساعد الطالب على فهم هذا المتن التراثي وإتقان مسائله.",
        "fileUrl": "/pdf/fath-rabbani-khaqani.pdf",
        "category": "تجويد",
        "pages": 105,
        "fileSize": "3.90 MB",
        "format": "PDF"
    },
    {
        "id": "ghayat-murid-tajweed",
        "title": "غاية المريد في علم التجويد",
        "author": "عطية قابل نصر",
        "description": "يعد من المراجع المعاصرة في علم التجويد، حيث يجمع بين التأصيل العلمي والتطبيق العملي، فيتناول مخارج الحروف وصفاتها وأحكام النون والميم والمدود والوقف والابتداء وغيرها من أبواب التجويد، مع أمثلة من القرآن الكريم تسهل فهم الأحكام وتطبيقها.",
        "fileUrl": "/pdf/ghayat-murid-tajweed.pdf",
        "category": "تجويد",
        "pages": 304,
        "fileSize": "4.81 MB",
        "format": "PDF"
    },
    {
        "id": "sharh-jazariyyah-mubtadiin",
        "title": "شرح المقدمة الجزرية المبسط للمبتدئين",
        "author": "أمنية علي",
        "description": "شرح مختصر للمقدمة الجزرية يهدف إلى تبسيط أبيات المنظومة للمبتدئين، مع بيان معانيها وأهم أحكام التجويد الواردة فيها بأسلوب سهل ومنظم، مما يساعد على فهم المتن وحفظه وتطبيق قواعده.",
        "fileUrl": "/pdf/sharh-jazariyyah-mubtadiin.pdf",
        "category": "تجويد",
        "pages": 27,
        "fileSize": "3.92 MB",
        "format": "PDF"
    },
    {
        "id": "shatibiyyah-abu-hasan",
        "title": "الشاطبية مع التسهيل",
        "author": "أبو الحسن الدمشقي",
        "description": "يجمع هذا الكتاب متن الشاطبية مع متن التسهيل في طبعة واحدة، مما ييسر على طالب علم القراءات دراسة المنظومتين والرجوع إليهما، ويعد مناسبًا للحفظ والمراجعة في القراءات السبع.",
        "fileUrl": "/pdf/shatibiyyah-abu-hasan.pdf",
        "category": "قراءات",
        "pages": 125,
        "fileSize": "1.17 MB",
        "format": "PDF"
    },
    {
        "id": "matn-shatibiyyah-ahmad",
        "title": "متن الشاطبية",
        "author": "الشاطبي",
        "description": "متن الإمام الشاطبي في القراءات السبع، ويُعرف بمنظومة «حرز الأماني ووجه التهاني»، ويعد من أهم المتون المعتمدة في علم القراءات، إذ جمع أصول وفرش القراءات السبع في أبيات منظومة يسهل حفظها ودراستها.",
        "fileUrl": "/pdf/matn-shatibiyyah-ahmad.pdf",
        "category": "قراءات",
        "pages": 173,
        "fileSize": "1.73 MB",
        "format": "PDF"
    },
    {
        "id": "usul-shatibiyyah",
        "title": "أصول الشاطبية",
        "author": "كاتب غير محدد",
        "description": "ملخص مختصر يركز على الأصول العامة لمنظومة الشاطبية في القراءات السبع، مع ترتيب المسائل بأسلوب مبسط يساعد على سرعة المراجعة واستحضار قواعد الأصول لطلاب علم القراءات.",
        "fileUrl": "/pdf/usul-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 26,
        "fileSize": "194.43 KB",
        "format": "PDF"
    },
    {
        "id": "shatibiyyah-lawhat-usul",
        "title": "الشاطبية في لوحات الأصول",
        "author": "Anas Alhibri",
        "description": "يعرض الكتاب أصول الشاطبية في صورة لوحات تعليمية مرتبة، تلخص القواعد والأصول بأسلوب بصري يسهل فهمها واستحضارها، ويعد مرجعًا عمليًا للمراجعة السريعة لطلاب علم القراءات.",
        "fileUrl": "/pdf/shatibiyyah-lawhat-usul.pdf",
        "category": "قراءات",
        "pages": 97,
        "fileSize": "7.16 MB",
        "format": "PDF"
    },
    {
        "id": "intaf-albariyyah-shatibiyyah",
        "title": "إتحاف البرية بتحريرات الشاطبية",
        "author": "حسن خلف الحسيني",
        "description": "رسالة مختصرة في تحريرات الشاطبية، تعرض أهم أوجه الأداء والتحريرات المتعلقة بمنظومة الشاطبية بأسلوب موجز ومنظم، لتكون عونًا لطلاب القراءات في المراجعة وضبط الأوجه.",
        "fileUrl": "/pdf/intaf-albariyyah-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 13,
        "fileSize": "1.14 MB",
        "format": "PDF"
    },
    {
        "id": "al-wafi-sharh-shatibiyyah",
        "title": "الوافي في شرح الشاطبية في القراءات السبع",
        "author": "عبد الفتاح عبد الغني القاضي",
        "description": "شرح علمي لمنظومة الشاطبية في القراءات السبع، يوضح أبيات المنظومة ويبين أصولها وفرشها بأسلوب منهجي، مع ذكر الأوجه والضوابط التي تعين طالب القراءات على فهم المنظومة وإتقان مسائلها.",
        "fileUrl": "/pdf/al-wafi-sharh-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 400,
        "fileSize": "8.56 MB",
        "format": "PDF"
    },
    {
        "id": "al-idah-matn-durrah",
        "title": "الإيضاح لمتن الدرة",
        "author": "عبد الفتاح عبد الغني القاضي",
        "description": "شرح لكتاب الدرة المضية في القراءات الثلاث المتممة للعشر، يوضح ألفاظ المتن ومسائله بأسلوب علمي ومنهجي، مع بيان أوجه القراءات وتحريراتها، مما يجعله مرجعًا مناسبًا لطلاب علم القراءات.",
        "fileUrl": "/pdf/al-idah-matn-durrah.pdf",
        "category": "قراءات",
        "pages": 165,
        "fileSize": "5.11 MB",
        "format": "PDF"
    },
    {
        "id": "al-wasit-sharh-shatibiyyah",
        "title": "الوسيط في شرح الشاطبية",
        "author": "د. صبري سلامة",
        "description": "شرح تفصيلي لمنظومة الشاطبية في القراءات السبع، يتناول أبيات المنظومة بالتحليل والبيان، مع توضيح الأصول والفرش وذكر الأوجه والخلافات بين القراء، مما يجعله من الشروح الموسعة المناسبة للمتخصصين وطلاب الإجازات في القراءات.",
        "fileUrl": "/pdf/al-wasit-sharh-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 1350,
        "fileSize": "20.05 MB",
        "format": "PDF"
    },
    {
        "id": "al-lamasat-al-nadiyyah-sharh-al-durrah",
        "title": "اللمسات الندية في شرح الدرة المضية",
        "author": "د. صبري سلامة",
        "description": "شرح تفصيلي لمنظومة الدرة المضية في القراءات الثلاث المتممة للعشر، يشرح أبيات المنظومة شرحًا تحليليًا مع بيان الأصول والفرش، وذكر أوجه الأداء والخلاف بين القراء، مع تحرير المسائل وتوضيحها بأسلوب علمي يناسب طلاب القراءات والدراسات المتخصصة.",
        "fileUrl": "/pdf/al-lamasat-al-nadiyyah-sharh-al-durrah.pdf",
        "category": "قراءات",
        "pages": 699,
        "fileSize": "17.02 MB",
        "format": "PDF"
    },
    {
        "id": "matn-durrah-al-mudiyyah-tamim",
        "title": "متن الدرة المضية",
        "author": "الإمام ابن الجزري",
        "description": "منظومة الدرة المضية في القراءات الثلاث المتممة للعشر، نظمها الإمام ابن الجزري لتكملة القراءات العشر بعد الشاطبية، وتعد من أهم المتون المعتمدة في علم القراءات، وهذه النسخة محققة ومضبوطة ومصححة بعناية الشيخ محمد تميم الزعبي، مما يجعلها مناسبة للحفظ والدراسة والمراجعة.",
        "fileUrl": "/pdf/matn-durrah-al-mudiyyah-tamim.pdf",
        "category": "قراءات",
        "pages": 48,
        "fileSize": "3.14 MB",
        "format": "PDF"
    },
    {
        "id": "al-taysir-fi-al-qiraat-al-sab",
        "title": "التيسير في القراءات السبع",
        "author": "أبو عمرو عثمان بن سعيد الداني",
        "description": "كتاب من أهم أصول علم القراءات السبع، جمع فيه الإمام أبو عمرو الداني أصول القراءات وفرش الحروف، ورتبه بأسلوب مختصر ودقيق، واعتمد عليه الإمام الشاطبي في نظم الشاطبية، وتعد هذه الطبعة مرجعًا مهمًا لطلاب القراءات.",
        "fileUrl": "/pdf/al-taysir-fi-al-qiraat-al-sab.pdf",
        "category": "قراءات",
        "pages": 244,
        "fileSize": "3.39 MB",
        "format": "PDF"
    },
    {
        "id": "rufat-al-darajat-qiraat-hamzah",
        "title": "رفعة الدرجات في قراءة حمزة الزيات",
        "author": "توفيق إبراهيم ضمرة",
        "description": "كتاب تعليمي متخصص في قراءة الإمام حمزة الزيات، يشرح أصول الرواية وفرش الحروف وأوجه الأداء بأسلوب علمي منظم، مع بيان أهم المسائل والتطبيقات التي يحتاجها طالب القراءات.",
        "fileUrl": "/pdf/rufat-al-darajat-qiraat-hamzah.pdf",
        "category": "قراءات",
        "pages": 327,
        "fileSize": "4.93 MB",
        "format": "PDF"
    },
    {
        "id": "al-ikhtilaf-bayn-al-qiraat",
        "title": "الاختلاف بين القراءات",
        "author": "أحمد البيلي",
        "description": "كتاب يتناول أوجه الاختلاف بين القراءات القرآنية، ويبين أسبابها وأنواعها وأثرها في المعاني والأحكام، مع عرض المسائل المتعلقة بتوجيه القراءات وبيان منهج الأئمة فيها.",
        "fileUrl": "/pdf/al-ikhtilaf-bayn-al-qiraat.pdf",
        "category": "قراءات",
        "pages": 512,
        "fileSize": "6.67 MB",
        "format": "PDF"
    },
    {
        "id": "al-ifsah-amma-fi-al-jamanat-min-al-ahkam-al-sihah",
        "title": "الإفصاح عما في الجمانة من الأحكام الصحاح",
        "author": "أحمد البيلي",
        "description": "شرح لكتاب الجمانة في أحكام التلاوة والتجويد، يوضح مسائل الأحكام التجويدية ويشرحها بأسلوب علمي مع الأمثلة والتطبيقات، مما يجعله مناسبًا لطلاب التجويد والراغبين في إتقان أحكام التلاوة.",
        "fileUrl": "/pdf/al-ifsah-amma-fi-al-jamanat-min-al-ahkam-al-sihah.pdf",
        "category": "تجويد",
        "pages": 180,
        "fileSize": "3.59 MB",
        "format": "PDF"
    },
    {
        "id": "al-mikshaf-amma-bayn-al-qiraat-al-ashr-min-khilaf",
        "title": "المكشف عما بين القراءات العشر من خلاف",
        "author": "أحمد البيلي",
        "description": "كتاب يجمع مواضع الخلاف بين القراءات العشر، ويعرض أوجه الاختلاف بين القراء بأسلوب مرتب ومنهجي، مع بيان مسائل الأصول والفرش، مما يجعله مرجعًا عمليًا لطلاب علم القراءات والمشتغلين بها.",
        "fileUrl": "/pdf/al-mikshaf-amma-bayn-al-qiraat-al-ashr-min-khilaf.pdf",
        "category": "قراءات",
        "pages": 522,
        "fileSize": "8.02 MB",
        "format": "PDF"
    },
    {
        "id": "al-dalil-al-awfaq-ila-riwayat-warsh-min-tariq-al-azraq",
        "title": "الدليل الأوفق إلى رواية ورش عن نافع من طريق الأزرق",
        "author": "مصطفى البحياوي",
        "description": "كتاب تعليمي متخصص في رواية ورش عن نافع من طريق الأزرق، يعرض أصول الرواية وفرش الحروف وأحكام الأداء بأسلوب منهجي، مع توضيح الأوجه والتنبيهات التي يحتاجها طالب الإقراء والإتقان.",
        "fileUrl": "/pdf/al-dalil-al-awfaq-ila-riwayat-warsh-min-tariq-al-azraq.pdf",
        "category": "قراءات",
        "pages": 486,
        "fileSize": "13.63 MB",
        "format": "PDF"
    },
    {
        "id": "mukhtasar-al-azraq-an-warsh-min-al-tayyibah",
        "title": "مختصر الأزرق عن ورش من الطيبة",
        "author": "عبد العال أحمد الأزهري",
        "description": "مختصر تعليمي يجمع أهم مسائل رواية ورش عن نافع من طريق الأزرق كما وردت في طيبة النشر، مع ترتيب الأصول وأوجه الأداء بصورة موجزة، ليكون معينًا على المراجعة والحفظ لطلاب القراءات.",
        "fileUrl": "/pdf/mukhtasar-al-azraq-an-warsh-min-al-tayyibah.pdf",
        "category": "قراءات",
        "pages": 28,
        "fileSize": "4.07 MB",
        "format": "PDF"
    },
    {
        "id": "mukhtasar-usul-al-asbahani-an-warsh",
        "title": "مختصر أصول الأصبهاني عن ورش",
        "author": "عبد العال أحمد الأزهري",
        "description": "مختصر يضم أهم أصول رواية ورش عن نافع من طريق الأصبهاني، مرتبًا بصورة موجزة تسهل المراجعة والحفظ، مع التركيز على أبرز الأوجه والأحكام التي يحتاجها طالب القراءات.",
        "fileUrl": "/pdf/mukhtasar-usul-al-asbahani-an-warsh.pdf",
        "category": "قراءات",
        "pages": 6,
        "fileSize": "512.76 KB",
        "format": "PDF"
    },
    {
        "id": "al-shawahid-al-mutakarrirah-min-matn-al-tayyibah",
        "title": "الشواهد المتكررة (من متن الطيبة)",
        "author": "عبد العال أحمد الأزهري",
        "description": "كتيب يجمع الشواهد المتكررة في متن طيبة النشر، ويرتبها بصورة تسهل على طالب القراءات حفظها واستحضار مواضعها، مما يجعله معينًا على المراجعة وإتقان المتن.",
        "fileUrl": "/pdf/al-shawahid-al-mutakarrirah-min-matn-al-tayyibah.pdf",
        "category": "قراءات",
        "pages": 23,
        "fileSize": "1.75 MB",
        "format": "PDF"
    },
    {
        "id": "khatwah-wa-khatwah-fi-mabadi-al-tajweed",
        "title": "خطوة وخطوة في مبادئ التجويد لطلاب الحلقات",
        "author": "كمال بن سيد اليماني",
        "description": "كتاب تعليمي مبسط يشرح مبادئ علم التجويد لطلاب الحلقات والمبتدئين، ويعرض أحكام التلاوة الأساسية بأسلوب سهل مع أمثلة وتطبيقات تساعد على إتقان القراءة الصحيحة للقرآن الكريم.",
        "fileUrl": "/pdf/khatwah-wa-khatwah-fi-mabadi-al-tajweed.pdf",
        "category": "تجويد",
        "pages": 18,
        "fileSize": "530.12 KB",
        "format": "PDF"
    },
    {
        "id": "al-taqrib-al-muyassar-fi-al-shatibiyyah",
        "title": "التقريب الميسر في الشاطبية",
        "author": "نزيهة المدني",
        "description": "كتاب تعليمي في منظومة الشاطبية يهدف إلى تقريب مسائلها وتيسير فهمها، مع عرض أصول القراءات وفرش الحروف بأسلوب مبسط يناسب طلاب علم القراءات والمبتدئين في دراسة الشاطبية.",
        "fileUrl": "/pdf/al-taqrib-al-muyassar-fi-al-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 303,
        "fileSize": "12.42 MB",
        "format": "PDF"
    },
    {
        "id": "al-fath-al-rahmani-sharh-hirz-al-amani",
        "title": "الفتح الرحماني بشرح حرز الأماني في القراءات",
        "author": "سليمان بن حسين بن محمد الجمزوري",
        "description": "شرح لمنظومة حرز الأماني (الشاطبية)، يوضح أصول القراءات وفرش الحروف بأسلوب علمي ميسر، مع بيان أوجه الأداء والخلاف بين القراء، وقد اعتنى بهذه النسخة تحقيقًا ودراسةً شريف عبد العال العدوي.",
        "fileUrl": "/pdf/al-fath-al-rahmani-sharh-hirz-al-amani.pdf",
        "category": "قراءات",
        "pages": 193,
        "fileSize": "10.95 MB",
        "format": "PDF"
    },
    {
        "id": "al-fawaid-al-jaliyyah-fi-tahrir-masail-al-shatibiyyah",
        "title": "الفوائد الجلية في تحرير مسائل الشاطبية",
        "author": "محمد إبراهيم بن الحافظ",
        "description": "رسالة علمية في تحرير مسائل الشاطبية، تعالج أوجه الخلاف والتحريرات المتعلقة بمنظومة حرز الأماني، مع بيان الراجح في مواضع متعددة، مما يجعلها مرجعًا نافعًا لطلاب القراءات المتقدمين.",
        "fileUrl": "/pdf/al-fawaid-al-jaliyyah-fi-tahrir-masail-al-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 44,
        "fileSize": "10.04 MB",
        "format": "PDF"
    },
    {
        "id": "al-mana-al-qurani-fi-daw-ikhtilaf-al-qiraat",
        "title": "المعنى القرآني في ضوء اختلاف القراءات",
        "author": "أ. د. أحمد سعد الخطيب",
        "description": "كتاب يبرز أثر اختلاف القراءات القرآنية في توجيه المعاني وتوسيع الدلالات، مع بيان العلاقة بين أوجه القراءة والمعنى التفسيري واللغوي، وإظهار ما تضيفه القراءات المتواترة من ثراء في فهم القرآن الكريم.",
        "fileUrl": "/pdf/al-mana-al-qurani-fi-daw-ikhtilaf-al-qiraat.pdf",
        "category": "قراءات",
        "pages": 167,
        "fileSize": "977.25 KB",
        "format": "PDF"
    },
    {
        "id": "taqrib-al-shatibiyyah",
        "title": "تقريب الشاطبية",
        "author": "د. إيهاب فكري",
        "description": "كتاب تعليمي يهدف إلى تقريب منظومة الشاطبية وتيسير فهمها، مع شرح أصولها ومسائلها بأسلوب واضح ومنظم، مما يجعله مناسبًا لطلاب علم القراءات في مراحل الدراسة المختلفة.",
        "fileUrl": "/pdf/taqrib-al-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 586,
        "fileSize": "9.95 MB",
        "format": "PDF"
    },
    {
        "id": "tawjih-mushkil-al-qiraat-al-ashr-al-farshiyyah",
        "title": "توجيه مشكل القراءات العشر الفرشية",
        "author": "عبدالعزيز بن علي بن علي الحربي",
        "description": "كتاب يعنى بتوجيه المواضع المشكلة في فرش القراءات العشر، مع بيان أوجهها اللغوية والنحوية والتفسيرية، وذكر علل القراءات وأسباب اختلافها، بما يعين طالب القراءات على فهم هذه المواضع وإتقانها.",
        "fileUrl": "/pdf/tawjih-mushkil-al-qiraat-al-ashr-al-farshiyyah.pdf",
        "category": "قراءات",
        "pages": 524,
        "fileSize": "8.54 MB",
        "format": "PDF"
    },
    {
        "id": "sharh-aqilat-atrab-al-qasaid",
        "title": "شرح عقيلة أتراب القصائد",
        "author": "عبد الفتاح عبد الغني القاضي",
        "description": "شرح لمنظومة عقيلة أتراب القصائد في رسم المصاحف، يوضح أبيات المنظومة ويبين قواعد الرسم العثماني وأصوله، مع شرح المسائل بأسلوب علمي يناسب طلاب التجويد والرسم والقراءات.",
        "fileUrl": "/pdf/sharh-aqilat-atrab-al-qasaid.pdf",
        "category": "قراءات",
        "pages": 104,
        "fileSize": "3.35 MB",
        "format": "PDF"
    },
    {
        "id": "aqilat-atrab-al-qasaid",
        "title": "عقيلة أتراب القصائد",
        "author": "الإمام محمد بن القفال",
        "description": "منظومة علمية في رسم المصحف العثماني، تناول فيها الإمام الشاطبي قواعد الرسم وأصوله في أبيات شعرية أصبحت من أهم المتون المعتمدة في هذا الفن، ويعتني بها طلاب التجويد والقراءات والرسم العثماني.",
        "fileUrl": "/pdf/aqilat-atrab-al-qasaid.pdf",
        "category": "قراءات",
        "pages": 129,
        "fileSize": "17.82 MB",
        "format": "PDF"
    },
    {
        "id": "aqilat-atrab-al-qasaid-fi-asna-al-maqasid",
        "title": "عقيلة أتراب القصائد في أسنى المقاصد",
        "author": "الإمام القاسم بن فيرُّه الشاطبي",
        "description": "متن منظوم في علم رسم المصحف العثماني، نظم فيه الإمام الشاطبي كتاب «المقنع» للإمام أبي عمرو الداني في نحو ثلاثمائة بيت، ويعد من أهم المتون المعتمدة في علم الرسم، ويعتني به طلاب التجويد والقراءات والرسم العثماني حفظًا ودراسةً.",
        "fileUrl": "/pdf/aqilat-atrab-al-qasaid-fi-asna-al-maqasid.pdf",
        "category": "تجويد",
        "pages": 48,
        "fileSize": "601.4 KB",
        "format": "PDF"
    },
    {
        "id": "al-nashr-fi-al-qiraat-al-ashr",
        "title": "النشر في القراءات العشر",
        "author": "الإمام محمد بن محمد بن محمد ابن الجزري",
        "description": "يعد من أهم المراجع في علم القراءات، جمع فيه الإمام ابن الجزري أصول القراءات العشر الكبرى وفرشها، مع تحرير طرقها وأوجهها وذكر أسانيدها، وهو العمدة التي اعتمد عليها العلماء في هذا الفن، ويعد من أبرز كتب القراءات المتقدمة.",
        "fileUrl": "/pdf/al-nashr-fi-al-qiraat-al-ashr.pdf",
        "category": "قراءات",
        "pages": 851,
        "fileSize": "15.23 MB",
        "format": "PDF"
    },
    {
        "id": "mushaf-al-qiraat-al-ashr-al-mutawatirah-bi-alwan-al-jazariyyah",
        "title": "مصحف القراءات العشر المتواترة بالألوان الميسرة (من طريقي الشاطبية والدرة)",
        "author": "أبو العلا محمد نور الملا",
        "description": "مصحف تعليمي يبرز مواضع القراءات العشر المتواترة باستخدام الألوان لتيسير معرفة أوجه الخلاف بين القراء، وفق طريقي الشاطبية والدرة، مما يساعد طلاب القراءات على المراجعة والتطبيق العملي أثناء التلاوة.",
        "fileUrl": "/pdf/mushaf-al-qiraat-al-ashr-al-mutawatirah-bi-alwan-al-jazariyyah.pdf",
        "category": "قراءات",
        "pages": 612,
        "fileSize": "5.58 MB",
        "format": "PDF"
    },
    {
        "id": "maani-al-qiraat-j1",
        "title": "معاني القراءات - الجزء الأول",
        "author": "أبو منصور الأزهري محمد بن أحمد",
        "description": "الجزء الأول من كتاب «معاني القراءات»، ويعد من أمهات الكتب في توجيه القراءات وبيان معانيها من الناحية اللغوية والتفسيرية، مع بيان أوجه القراءات وأثرها في المعنى. تحقيق ودراسة: د. عيد مصطفى درويش، ود. عوض بن حمد الفوزي.",
        "fileUrl": "/pdf/maani-al-qiraat-j1.pdf",
        "category": "قراءات",
        "pages": 470,
        "fileSize": "7.07 MB",
        "format": "PDF"
    },
    {
        "id": "maani-al-qiraat-j2",
        "title": "معاني القراءات - الجزء الثاني",
        "author": "أبو منصور الأزهري محمد بن أحمد",
        "description": "الجزء الثاني من كتاب «معاني القراءات»، ويواصل عرض توجيه القراءات وبيان معانيها وأوجهها اللغوية والنحوية، مع تحقيق ودراسة: د. عيد مصطفى درويش، ود. عوض بن حمد الفوزي.",
        "fileUrl": "/pdf/maani-al-qiraat-j2.pdf",
        "category": "قراءات",
        "pages": 392,
        "fileSize": "6.16 MB",
        "format": "PDF"
    },
    {
        "id": "maani-al-qiraat-j3",
        "title": "معاني القراءات - الجزء الثالث",
        "author": "أبو منصور الأزهري محمد بن أحمد",
        "description": "الجزء الثالث من كتاب «معاني القراءات»، ويستكمل مباحث توجيه القراءات وبيان دلالاتها وأثرها في تفسير القرآن الكريم، مع تحقيق ودراسة: د. عيد مصطفى درويش، ود. عوض بن حمد الفوزي.",
        "fileUrl": "/pdf/maani-al-qiraat-j3.pdf",
        "category": "قراءات",
        "pages": 213,
        "fileSize": "3.46 MB",
        "format": "PDF"
    },
    {
        "id": "mulakhkhas-usul-al-shatibiyyah",
        "title": "ملخص أصول الشاطبية",
        "author": "د. إيهاب فكري",
        "description": "ملخص تعليمي لأصول الشاطبية يعتمد على الشجيرات والخرائط الذهنية لتوضيح تفرعات الأصول وعلاقاتها، مما يسهل على طالب القراءات فهم مسائل الشاطبية وحفظها واستحضارها أثناء الدراسة والمراجعة.",
        "fileUrl": "/pdf/mulakhkhas-usul-al-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 80,
        "fileSize": "738.16 KB",
        "format": "PDF"
    },
    {
        "id": "al-budur-al-zahirah-fi-al-qiraat-al-ashr-al-mutawatirah",
        "title": "البدور الزاهرة في القراءات العشر المتواترة من طريقي الشاطبية والدرة",
        "author": "عبد الفتاح القاضي",
        "description": "من أشهر الكتب التعليمية في القراءات العشر الصغرى، جمع فيه الشيخ عبد الفتاح القاضي أصول القراءات وفرش الحروف من طريقي الشاطبية والدرة، ورتب المسائل بأسلوب واضح وميسر، مما جعله مرجعًا أساسيًا لطلاب علم القراءات.",
        "fileUrl": "/pdf/al-budur-al-zahirah-fi-al-qiraat-al-ashr-al-mutawatirah.pdf",
        "category": "قراءات",
        "pages": 458,
        "fileSize": "8.94 MB",
        "format": "PDF"
    },
    {
        "id": "matn-mawrid-al-zaman",
        "title": "متن مورد الظمآن",
        "author": "محمد بن محمد الشهير بالخراز",
        "description": "منظومة علمية في رسم المصحف العثماني، نظمها الإمام محمد بن محمد الخراز، وتعد من أشهر المتون في هذا الفن، حيث جمعت قواعد الرسم وضوابطه بأسلوب شعري يسهل حفظه ودراسته، ويعتني بها طلاب التجويد والقراءات والرسم العثماني.",
        "fileUrl": "/pdf/matn-mawrid-al-zaman.pdf",
        "category": "قراءات",
        "pages": 59,
        "fileSize": "1.04 MB",
        "format": "PDF"
    },
    {
        "id": "sharh-mawrid-al-zaman-fi-al-rasm",
        "title": "شرح مورد الظمآن في الرسم",
        "author": "الشيخ حسين محمد محمد العشري",
        "description": "شرح لمنظومة «مورد الظمآن» في رسم المصحف العثماني، يوضح ألفاظ المتن ويبين قواعد الرسم وأصوله بأسلوب سهل ومنظم، مع ذكر الأمثلة والتطبيقات التي تعين طلاب التجويد والقراءات على فهم المنظومة وإتقانها.",
        "fileUrl": "/pdf/sharh-mawrid-al-zaman-fi-al-rasm.pdf",
        "category": "تجويد",
        "pages": 136,
        "fileSize": "2.36 MB",
        "format": "PDF"
    },
    {
        "id": "matn-nazimat-al-zuhr",
        "title": "متن ناظمة الزهر",
        "author": "الإمام القاسم بن فيرُّه الشاطبي",
        "description": "منظومة في علم عدِّ آي القرآن، نظمها الإمام الشاطبي، وتعد من أشهر المتون في هذا الفن، حيث جمعت مذاهب علماء العدد بأسلوب شعري يسهل حفظه ودراسته، ويعتني بها طلاب القراءات وعلوم القرآن.",
        "fileUrl": "/pdf/matn-nazimat-al-zuhr.pdf",
        "category": "قراءات",
        "pages": 39,
        "fileSize": "15.96 MB",
        "format": "PDF"
    },
    {
        "id": "sharh-nazimat-al-zuhr-fi-al-fawasil",
        "title": "شرح ناظمة الزهر في الفواصل",
        "author": "الشيخ حسين محمد محمد العشري",
        "description": "شرح لمنظومة «ناظمة الزهر» للإمام الشاطبي في علم عدِّ آي القرآن، يوضح ألفاظ المنظومة ويبين مذاهب علماء العدد والفواصل بأسلوب ميسر، مع أمثلة وتطبيقات تعين طلاب القراءات وعلوم القرآن على فهم هذا الفن.",
        "fileUrl": "/pdf/sharh-nazimat-al-zuhr-fi-al-fawasil.pdf",
        "category": "قراءات",
        "pages": 108,
        "fileSize": "1.9 MB",
        "format": "PDF"
    },
    {
        "id": "sharh-itaf-al-bariyah-bi-tahrirat-al-shatibiyyah",
        "title": "شرح إتحاف البرية بتحريرات الشاطبية",
        "author": "علي بن محمد الضباع",
        "description": "شرح لكتاب «إتحاف البرية» في تحريرات الشاطبية، يبين أوجه الأداء والتحريرات المتعلقة بطرق الشاطبية، مع توضيح مواضع الخلاف والترجيح بين الأوجه، مما يجعله مرجعًا مهمًا لطلاب القراءات المتقدمين.",
        "fileUrl": "/pdf/sharh-itaf-al-bariyah-bi-tahrirat-al-shatibiyyah.pdf",
        "category": "قراءات",
        "pages": 313,
        "fileSize": "6.36 MB",
        "format": "PDF"
    },
    {
        "id": "al-idaah-fi-bayan-usul-al-qiraah",
        "title": "الإضاءة في بيان أصول القراءة",
        "author": "علي بن محمد الضباع",
        "description": "كتاب تعليمي يوضح أصول القراءات بأسلوب مرتب وميسر، مع بيان قواعد الأصول وأوجه الأداء واختلاف الروايات، ويعد من الكتب النافعة لطلاب علم القراءات في دراسة أصول القراءة ومراجعتها.",
        "fileUrl": "/pdf/al-idaah-fi-bayan-usul-al-qiraah.pdf",
        "category": "قراءات",
        "pages": 177,
        "fileSize": "3.87 MB",
        "format": "PDF"
    },
    {
        "id": "irshad-al-murid-ila-maqsud-al-qasid-fi-al-qiraat-al-sab",
        "title": "إرشاد المريد إلى مقصود القصيد في القراءات السبع",
        "author": "علي بن محمد الضباع",
        "description": "شرح لمنظومة حرز الأماني (الشاطبية) في القراءات السبع، يوضح مقاصد أبياتها ويبين أصول القراءات وفرش الحروف بأسلوب علمي منظم، مع تحرير المسائل وذكر أوجه الأداء، مما يجعله من المراجع المهمة لطلاب الشاطبية.",
        "fileUrl": "/pdf/irshad-al-murid-ila-maqsud-al-qasid-fi-al-qiraat-al-sab.pdf",
        "category": "قراءات",
        "pages": 423,
        "fileSize": "8.91 MB",
        "format": "PDF"
    },
    {
        "id": "mukhtasar-bulugh-al-umniyyah",
        "title": "مختصر بلوغ الأمنية",
        "author": "علي بن محمد الضباع",
        "description": "شرح مختصر لمنظومة «بلوغ الأمنية» للشيخ حسن بن خلف الحسيني في تحرير مسائل الشاطبية، يبين أوجه التحريرات الصحيحة ويميز الطرق المعتمدة من غيرها بأسلوب واضح وموجز، ويعد من الكتب المهمة لطلاب تحريرات الشاطبية.",
        "fileUrl": "/pdf/mukhtasar-bulugh-al-umniyyah.pdf",
        "category": "قراءات",
        "pages": 106,
        "fileSize": "2.18 MB",
        "format": "PDF"
    },
    {
        "id": "al-faraid-al-rutbah-ala-al-fawaid-al-muhadhdhabah",
        "title": "الفرائد الرتبة على الفوائد المهذبة في بيان خلف حفص من طريق الطيبة",
        "author": "علي بن محمد الضباع",
        "description": "رسالة مختصرة في بيان أوجه خلاف رواية حفص من طريق طيبة النشر، رتبت الفوائد المتعلقة بالطرق والتحريرات بأسلوب موجز، لتكون عونًا لطلاب القراءات في مراجعة مسائل حفص من طريق الطيبة.",
        "fileUrl": "/pdf/al-faraid-al-rutbah-ala-al-fawaid-al-muhadhdhabah.pdf",
        "category": "قراءات",
        "pages": 13,
        "fileSize": "1.8 MB",
        "format": "PDF"
    },
    {
        "id": "hirz-al-amani-wa-wajh-al-tahani",
        "title": "حرز الأماني ووجه التهاني في القراءات السبع",
        "author": "الإمام القاسم بن فيرُّه الشاطبي",
        "description": "المتن المشهور بالشاطبية، وهو من أشهر منظومات القراءات السبع، جمع فيه الإمام الشاطبي أصول القراءات وفرش الحروف في أبيات شعرية محكمة، وأصبح عمدةً لطلاب علم القراءات حفظًا ودراسةً عبر القرون.",
        "fileUrl": "/pdf/hirz-al-amani-wa-wajh-al-tahani.pdf",
        "category": "قراءات",
        "pages": 111,
        "fileSize": "2.93 MB",
        "format": "PDF"
    },
    {
        "id": "tashil-ilm-al-qiraat",
        "title": "تسهيل علم القراءات",
        "author": "أيمن بقلة",
        "description": "كتاب تعليمي شامل يهدف إلى تيسير دراسة علم القراءات، ويعرض أصول القراءات وقواعدها وتاريخها وأبرز متونها، مع شرح المسائل بأسلوب منهجي يناسب المبتدئين وطلاب العلم، مع الاستفادة من كتب الأئمة المتقدمين والمعاصرين.",
        "fileUrl": "/pdf/tashil-ilm-al-qiraat.pdf",
        "category": "قراءات",
        "pages": 751,
        "fileSize": "6.4 MB",
        "format": "PDF"
    },
    {
        "id": "al-bushra-fi-taysir-al-qiraat-al-ashr-al-kubra",
        "title": "البشرى في تيسير القراءات العشر الكبرى",
        "author": "محمد نبهان حسين مصري",
        "description": "شرح تعليمي موسع في القراءات العشر الكبرى، ييسر دراسة طرق طيبة النشر ويعرض أصول القراءات وفرش الحروف بأسلوب واضح ومنظم، مع تحرير المسائل وبيان أوجه الأداء، مما يجعله مرجعًا نافعًا لطلاب القراءات المتقدمة.",
        "fileUrl": "/pdf/al-bushra-fi-taysir-al-qiraat-al-ashr-al-kubra.pdf",
        "category": "قراءات",
        "pages": 1028,
        "fileSize": "22.16 MB",
        "format": "PDF"
    }
];

// Ensure pagesCount is present for all items
const normalized = booksRaw.map(b => ({
  ...b,
  pagesCount: b.pages || b.pagesCount || 0
}));

const booksDirPath = path.join(process.cwd(), 'src', 'data', 'books');
if (!fs.existsSync(booksDirPath)) {
  fs.mkdirSync(booksDirPath, { recursive: true });
}

// 1. Group by category
const tajweed = normalized.filter(b => b.category === 'تجويد');
const qiraat = normalized.filter(b => b.category === 'قراءات');

fs.writeFileSync(
  path.join(booksDirPath, 'tajweed.json'),
  JSON.stringify(tajweed, null, 2),
  'utf8'
);

fs.writeFileSync(
  path.join(booksDirPath, 'qiraat.json'),
  JSON.stringify(qiraat, null, 2),
  'utf8'
);

// Write root booksData.json with all 73 books
fs.writeFileSync(
  path.join(process.cwd(), 'src', 'data', 'booksData.json'),
  JSON.stringify(normalized, null, 2),
  'utf8'
);

console.log(`Successfully written ${tajweed.length} tajweed books and ${qiraat.length} qiraat books.`);
