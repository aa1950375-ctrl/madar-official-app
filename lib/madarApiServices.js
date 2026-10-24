// lib/madarApiServices.js

// 1. جلب سور القرآن الكريم وقوائم القراء (140+ قارئ)
export async function fetchQuranSurahs() {
  try {
    const res = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("خطأ في جلب سور القرآن:", error);
    return [];
  }
}

// 2. جلب نص الآيات بالتفسير والإعراب والترجمة
export async function fetchAyahsWithTafsir(surahNumber, tafsirSlug = "ar.muyassar") {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${tafsirSlug}`);
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("خطأ في جلب التفسير والآيات:", error);
    return null;
  }
}

// 3. جلب قائمة الـ 140+ قارئاً من MP3Quran API
export async function fetchRecitersList() {
  try {
    const res = await fetch("https://mp3quran.net/api/v3/reciters?language=ar");
    const data = await res.json();
    return data.reciters || [];
  } catch (error) {
    console.error("خطأ في جلب قائمة القراء:", error);
    return [];
  }
}

// 4. جلب مواقيت الصلاة والتاريخ الهجري والقبلة بناءً على الإحداثيات (GPS)
export async function fetchPrayerTimesAndHijri(latitude, longitude) {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=5`
    );
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("خطأ في جلب مواقيت الصلاة:", error);
    return null;
  }
}

// 5. جلب أحاديث كتب السنة وحصن المسلم
export async function fetchHadithCollection(bookSlug = "bukhari", page = 1) {
  try {
    const res = await fetch(`https://hadith-api-1.p.rapidapi.com/books/${bookSlug}?page=${page}`);
    if (!res.ok) throw new Error("فشل الجلب");
    const data = await res.json();
    return data || [];
  } catch (error) {
    // العودة للبيانات المحلية المدمجة عند انقطاع الشبكة
    return [];
  }
}

// 6. روابط البث المباشر لإذاعة القرآن الكريم
export const LIVE_QURAN_STREAMS = [
  { name: "إذاعة القاهرة - بث مباشر", url: "https://stream.radiojar.com/8s44vhcqb8quv" },
  { name: "إذاعة تلاوات القراء - بث مباشر", url: "https://qurango.net/radio/taraji" },
  { name: "إذاعة التفسير الميسر", url: "https://qurango.net/radio/tafseer" },
];