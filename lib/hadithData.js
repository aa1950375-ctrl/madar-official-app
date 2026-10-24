// lib/hadithData.js

export const HADITH_SIX_BOOKS = [
  {
    id: "bukhari",
    title: "صحيح البخاري",
    author: "الإمام محمد بن إسماعيل البخاري (ت: 256هـ)",
    desc: "أصح كتاب بعد كتاب الله تعالى، جمع فيه الإمام البخاري أصح الأحاديث المرفوعة عن النبي ﷺ.",
    pdfUrl: "https://archive.org/download/Sahih-Bukhari-Ar/Sahih-Bukhari.pdf",
    chapters: [
      { id: "b1", title: "كتاب بدء الوحي", totalHadiths: 7 },
      { id: "b2", title: "كتاب الإيمان", totalHadiths: 50 },
      { id: "b3", title: "كتاب العلم", totalHadiths: 83 },
      { id: "b4", title: "كتاب الوضوء", totalHadiths: 110 },
      { id: "b5", title: "كتاب الصلاة", totalHadiths: 145 },
    ],
  },
  {
    id: "muslim",
    title: "صحيح مسلم",
    author: "الإمام مسلم بن الحجاج النيسابوري (ت: 261هـ)",
    desc: "ثاني أصح الكتب الحديثية، تميز بحسن السياق وترتيب الطرق والأسانيد.",
    pdfUrl: "https://archive.org/download/Sahih-Muslim-Ar/Sahih-Muslim.pdf",
    chapters: [
      { id: "m1", title: "كتاب الإيمان", totalHadiths: 380 },
      { id: "m2", title: "كتاب الطهارة", totalHadiths: 130 },
      { id: "m3", title: "كتاب الحيض", totalHadiths: 95 },
      { id: "m4", title: "كتاب الصلاة", totalHadiths: 320 },
    ],
  },
  {
    id: "abu-dawood",
    title: "سنن أبي داود",
    author: "الإمام أبو داود سليمان بن الأشعث السجستاني (ت: 275هـ)",
    desc: "من أمهات كتب السنن، ركّز فيه مؤلفه على أحاديث الأحكام والفقه.",
    pdfUrl: "https://archive.org/download/Sunan-Abu-Dawood/Sunan-Abu-Dawood.pdf",
    chapters: [
      { id: "ad1", title: "كتاب الطهارة", totalHadiths: 390 },
      { id: "ad2", title: "كتاب الصلاة", totalHadiths: 450 },
      { id: "ad3", title: "كتاب الزكاة", totalHadiths: 180 },
    ],
  },
  {
    id: "tirmidhi",
    title: "جامع الترمذي (سنن الترمذي)",
    author: "الإمام أبو عيسى محمد بن عيسى الترمذي (ت: 279هـ)",
    desc: "اشتهر ببيان درجات الحديث (صحيح، حسن، غريب) وذكر مذاهب الفقهاء.",
    pdfUrl: "https://archive.org/download/Sunan-Tirmidhi/Sunan-Tirmidhi.pdf",
    chapters: [
      { id: "t1", title: "أبواب الطهارة", totalHadiths: 150 },
      { id: "t2", title: "أبواب الصلاة", totalHadiths: 300 },
      { id: "t3", title: "أبواب الزكاة", totalHadiths: 120 },
    ],
  },
  {
    id: "nasai",
    title: "سنن النسائي (المجتبى)",
    author: "الإمام أحمد بن شعيب النسائي (ت: 303هـ)",
    desc: "أقل كتب السنن الحديثية حديثاً ضعيفاً بعد الصحيحين، واعتنى بالعلل.",
    pdfUrl: "https://archive.org/download/Sunan-Nasai/Sunan-Nasai.pdf",
    chapters: [
      { id: "n1", title: "كتاب الطهارة", totalHadiths: 320 },
      { id: "n2", title: "كتاب المياه", totalHadiths: 80 },
      { id: "n3", title: "كتاب الحيض والاستحاضة", totalHadiths: 110 },
    ],
  },
  {
    id: "ibn-majah",
    title: "سنن ابن ماجه",
    author: "الإمام محمد بن يزيد بن ماجه القزويني (ت: 273هـ)",
    desc: "سادس كتب الحديث الستة المعتمدة، تميز بحسن الترتيب واختصار الأبواب.",
    pdfUrl: "https://archive.org/download/Sunan-Ibn-Majah/Sunan-Ibn-Majah.pdf",
    chapters: [
      { id: "im1", title: "افتتاح الكتاب في الإيمان والسنّة", totalHadiths: 266 },
      { id: "im2", title: "كتاب الطهارة وسننها", totalHadiths: 350 },
      { id: "im3", title: "كتاب الصلاة والإقامة فيها", totalHadiths: 400 },
    ],
  },
];

// نماذج أحاديث مشهورة وموثقة للبحث والتصفح السريع
export const SAMPLE_HADITHS = [
  {
    bookId: "bukhari",
    bookTitle: "صحيح البخاري",
    chapterTitle: "كتاب بدء الوحي",
    number: 1,
    sanad: "عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ:",
    text: "«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ».",
    grade: "صحيح متفق عليه",
  },
  {
    bookId: "bukhari",
    bookTitle: "صحيح البخاري",
    chapterTitle: "كتاب الإيمان",
    number: 13,
    sanad: "عَنْ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ عَنِ النَّبِيِّ ﷺ قَالَ:",
    text: "«لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ».",
    grade: "صحيح البخاري",
  },
  {
    bookId: "muslim",
    bookTitle: "صحيح مسلم",
    chapterTitle: "كتاب الإيمان",
    number: 55,
    sanad: "عَنْ أَبِي رُقَيَّةَ تَمِيمِ بْنِ أَوْسٍ الدَّارِيِّ رَضِيَ اللَّهُ عَنْهُ أَنَّ النَّبِيَّ ﷺ قَالَ:",
    text: "«الدِّينُ النَّصِيحَةُ» قُلْنَا: لِمَنْ؟ قَالَ: «لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ».",
    grade: "صحيح مسلم",
  },
  {
    bookId: "tirmidhi",
    bookTitle: "جامع الترمذي",
    chapterTitle: "أبواب البر والصلة",
    number: 1970,
    sanad: "عَنْ أَبِي ذَرٍّ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ لِيَ النَّبِيُّ ﷺ:",
    text: "«اتَّقِ اللَّهِ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ».",
    grade: "حديث حسن صحيح",
  },
];