// lib/islamicData.js

// 1. أسماء الله الحسنى الـ 99 كاملة مع المعاني والفضائل
export const ASMAA_ALLAH_ALHUSNA = [
  { id: 1, name: "اللَّهُ", meaning: "العلَمُ على الذَّاتِ الإلَهيَّةِ الجامِعُ لصفاتِ الأُلوهيَّةِ" },
  { id: 2, name: "الرَّحْمَنُ", meaning: "كثيرُ الرَّحمةِ الَّتي وَسِعَتْ كُلَّ شَيءٍ في الدُّنيا والآخِرَةِ" },
  { id: 3, name: "الرَّحِيمُ", meaning: "المُنعِمُ على العِبادِ المِلحاحينَ بالرَّحمةِ الخاصَّةِ بالمؤمِنينَ" },
  { id: 4, name: "الْمَلِكُ", meaning: "الشَّديدُ المُلْكِ الَّذي لا يُعْجِزُهُ شَيءٌ والمُتصرِّفُ في خَلْقِهِ" },
  { id: 5, name: "الْقُدُّوسُ", meaning: "المُنَزَّهُ عن كُلِّ نَقْصٍ وعَيْبٍ والمُقَدَّسُ المُطَهَّرُ" },
  // ... يتم استكمال بقية الأسماء الـ 99 بنفس النسق
];

// 2. أسماء المواليد الإسلامية (بنين وبنات) مع المعاني والتصنيف
export const ISLAMIC_BABY_NAMES = [
  { name: "محمد", gender: "boy", meaning: "الكثير الخصال الحميدة، والمحمود بين الناس", origin: "عربي إسلامي" },
  { name: "أحمد", gender: "boy", meaning: "من يحمده الناس على ما فيه من صفات طيبة", origin: "عربي إسلامي" },
  { name: "إبراهيم", gender: "boy", meaning: "أبو الأنبياء، وتعني أب خليل أو أمير الجمهور", origin: "عربي إسلامي" },
  { name: "خديجة", gender: "girl", meaning: "التي وُلِدَت قبل تمام أوانها، وهي أم المؤمنين الأولى", origin: "عربي إسلامي" },
  { name: "عائشة", gender: "girl", meaning: "ذات الحياة الكريمة، والمرأة الحية المرتجى طول عمرها", origin: "عربي إسلامي" },
  { name: "مريم", gender: "girl", meaning: "العابدة الخادمة لربها، وهو اسم العذراء البتول أم المسيح", origin: "عربي إسلامي" },
  { name: "فاطمة", gender: "girl", meaning: "التي فطمت ولدها عن الرضاع، وهي بنت النبي ﷺ", origin: "عربي إسلامي" },
];

// 3. خدمة جلب "آية اليوم" التفاعلية المتغيرة ديناميكياً يومياً
export async function getDailyAyah() {
  try {
    // حساب رقم اليوم في السنة للحصول على آية مختلفة ومحددة يومياً
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // ربط اليوم برقم آية عشوائي ثابت طوال ذلك اليوم (من أصل 6236 آية)
    const ayahNumber = (dayOfYear * 17) % 6236 + 1;

    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/editions/quran-uthmani,ar.muyassar`);
    const data = await res.json();
    return {
      text: data.data[0].text,
      surah: data.data[0].surah.name,
      numberInSurah: data.data[0].numberInSurah,
      tafsir: data.data[1].text,
    };
  } catch (error) {
    console.error("خطأ في جلب آية اليوم:", error);
    return null;
  }
}

// أضيفي هذا الكائن إلى أسفل ملف lib/islamicData.js

export const PLATFORM_INFO = {
  name: "مَدار | MADAR",
  description: "المنصة الإسلامية التفاعلية المدمجة وقارئ المراجع وصانع الريلز",
  contact: {
    email: "aa1950375@gmail.com",
    whatsapp: "01154371081",
    whatsappLink: "https://wa.me/201154371081",
  },
};