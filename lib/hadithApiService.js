// lib/hadithApiService.js

// خريطة أسماء كتب الحديث الستة لربطها بالـ API المجاني المفتوح
export const HADITH_BOOKS_MAP = {
  bukhari: {
    id: "bukhari",
    apiKey: "ara-bukhari",
    title: "صحيح البخاري - ط السلطانية",
    author: "الإمام محمد بن إسماعيل البخاري (ت: 256هـ)",
    partsCount: "٩ أجزاء",
    hadithCount: "7,275 حديثاً بالمكرر | ~2,602 بدون تكرار",
  },
  muslim: {
    id: "muslim",
    apiKey: "ara-muslim",
    title: "صحيح مسلم - ت عبد الباقي",
    author: "الإمام مسلم بن الحجاج النيسابوري (ت: 261هـ)",
    partsCount: "٥ أجزاء",
    hadithCount: "7,397 حديثاً بالمكرر | ~3,033 بدون تكرار",
  },
  abudawood: {
    id: "abudawood",
    apiKey: "ara-abudawud",
    title: "سنن أبي داود - ت محيي الدين",
    author: "الإمام أبو داود السجستاني (ت: 275هـ)",
    partsCount: "٤ أجزاء",
    hadithCount: "5,274 حديثاً",
  },
  tirmidhi: {
    id: "tirmidhi",
    apiKey: "ara-tirmidhi",
    title: "سنن الترمذي - ت بشار عواد",
    author: "الإمام أبو عيسى الترمذي (ت: 279هـ)",
    partsCount: "٦ أجزاء",
    hadithCount: "3,956 حديثاً",
  },
  nasai: {
    id: "nasai",
    apiKey: "ara-nasai",
    title: "سنن النسائي - ط الرسالة",
    author: "الإمام أحمد بن شعيب النسائي (ت: 303هـ)",
    partsCount: "٩ أجزاء",
    hadithCount: "5,774 حديثاً",
  },
  ibnmajah: {
    id: "ibnmajah",
    apiKey: "ara-ibnmajah",
    title: "سنن ابن ماجه - ت عبد الباقي",
    author: "الإمام محمد بن يزيد بن ماجه (ت: 273هـ)",
    partsCount: "٢ أجزاء",
    hadithCount: "4,341 حديثاً",
  },
};

// 1. جلب بيانات الكتاب بالكامل والأبواب المتاحة
export async function fetchFullHadithBook(bookSlug = "bukhari") {
  const bookConfig = HADITH_BOOKS_MAP[bookSlug] || HADITH_BOOKS_MAP.bukhari;
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${bookConfig.apiKey}.json`
    );
    if (!response.ok) {
      throw new Error(`فشل الجلب من الخادم: ${response.status}`);
    }
    const data = await response.json();
    return {
      metadata: data.metadata || {},
      hadiths: data.hadiths || [],
    };
  } catch (error) {
    console.error("خطأ في جلب كتاب الحديث المباشر:", error);
    return { metadata: {}, hadiths: [] };
  }
}

// 2. البحث المباشر برقم الحديث المحدد داخل الكتاب
export async function fetchHadithByNumber(bookSlug, hadithNumber) {
  const bookConfig = HADITH_BOOKS_MAP[bookSlug] || HADITH_BOOKS_MAP.bukhari;
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${bookConfig.apiKey}/${hadithNumber}.json`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.hadiths ? data.hadiths[0] : data;
  } catch (error) {
    console.error("خطأ في جلب الحديث برقم محدد:", error);
    return null;
  }
}