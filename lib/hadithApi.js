// lib/hadithApi.js

const HADITH_BASE_URL = "https://hadith-api-321307.web.app/v1";
const HISN_BASE_URL = "https://a3qar.com/api/hisn"; // API مجاني ومباشر لأذكار حصن المسلم

// 1. كتب الحديث الستة المتاحة في الخدمة:
export const HADITH_BOOKS = [
  { id: "bukhari", name: "صحيح البخاري", author: "الإمام البخاري" },
  { id: "muslim", name: "صحيح مسلم", author: "الإمام مسلم" },
  { id: "abudawud", name: "سنن أبي داود", author: "الإمام أبو داود" },
  { id: "tirmidhi", name: "جامع الترمذي", author: "الإمام الترمذي" },
  { id: "nasai", name: "سنن النسائي", author: "الإمام النسائي" },
  { id: "ibnmajah", name: "سنن ابن ماجه", author: "الإمام ابن ماجه" },
];

// 2. جلب الأحاديث بحسب الكتاب والرقم
export async function getHadithsByBook(bookId = "bukhari", page = 1, limit = 20) {
  try {
    const res = await fetch(`${HADITH_BASE_URL}/books/${bookId}?page=${page}&limit=${limit}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ في جلب أحاديث الكتاب:", error);
    return null;
  }
}

// 3. البحث الديناميكي في كتب الحديث
export async function searchHadith(query, bookId = "") {
  try {
    const url = bookId
      ? `${HADITH_BASE_URL}/search?q=${encodeURIComponent(query)}&book=${bookId}`
      : `${HADITH_BASE_URL}/search?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("خطأ في البحث عن الحديث:", error);
    return [];
  }
}

// 4. جلب أقسام وأذكار حصن المسلم الكاملة
export async function getHisnMuslimCategories() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/osamamelhem/HisnElmuslim-json/master/hisnjson/ar/husn_ar.json");
    const data = await res.json();
    return data; // يحتوي على قائمة أبواب حصن المسلم مع نصوص الأذكار والأدلة والتكرار
  } catch (error) {
    console.error("خطأ في جلب أذكار حصن المسلم:", error);
    return [];
  }
}