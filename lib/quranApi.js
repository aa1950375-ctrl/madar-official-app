// lib/quranApi.js

const ALQURAN_BASE_URL = "https://api.alquran.cloud/v1";
const QURAN_COM_BASE_URL = "https://api.quran.com/api/v4";

// 1. جلب فهرس السور (114 سورة)
export async function getSurahList() {
  try {
    const res = await fetch(`${ALQURAN_BASE_URL}/surah`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("خطأ في جلب قائمة السور:", error);
    return [];
  }
}

// 2. جلب آيات السورة بالنص العثماني والتفسير المختار
export async function getSurahDetails(surahNumber, tafsirEdition = "ar.muyassar") {
  try {
    const res = await fetch(
      `${ALQURAN_BASE_URL}/surah/${surahNumber}/editions/quran-uthmani,${tafsirEdition}`
    );
    const data = await res.json();
    return {
      arabicText: data.data[0].ayahs,
      tafsirText: data.data[1].ayahs,
    };
  } catch (error) {
    console.error("خطأ في جلب تفاصيل السورة والتفسير:", error);
    return null;
  }
}

// 3. جلب الآيات حسب الجزء (30 جزء)
export async function getJuzDetails(juzNumber, edition = "quran-uthmani") {
  try {
    const res = await fetch(`${ALQURAN_BASE_URL}/juz/${juzNumber}/${edition}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("خطأ في جلب آيات الجزء:", error);
    return null;
  }
}

// 4. جلب الآيات حسب الصفحة (604 صفحة)
export async function getPageDetails(pageNumber, edition = "quran-uthmani") {
  try {
    const res = await fetch(`${ALQURAN_BASE_URL}/page/${pageNumber}/${edition}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("خطأ في جلب آيات الصفحة:", error);
    return null;
  }
}

// 5. جلب مفردات وإعراب الآية وتفاصيلها عبر Quran.com API v4
export async function getAyahDetails(surahNumber, ayahNumber) {
  try {
    const verseKey = `${surahNumber}:${ayahNumber}`;
    const res = await fetch(
      `${QURAN_COM_BASE_URL}/verses/by_key/${verseKey}?language=ar&words=true&word_fields=text_uthmani,location`
    );
    const data = await res.json();
    return data.verse;
  } catch (error) {
    console.error("خطأ في جلب إعراب وتفاصيل الآية:", error);
    return null;
  }
}