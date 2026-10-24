// lib/reelsAudioApi.js

const EVERYAYAH_BASE_URL = "https://everyayah.com/data";
const MP3QURAN_BASE_URL = "https://mp3quran.net/api/v3";

// 1. قائمة القراء المعتمدة لصانع الريلز (تضم أكثر من 140 قارئاً بمختلف الروايات)
export async function getReelsReciters() {
  try {
    const res = await fetch(`${MP3QURAN_BASE_URL}/reciters?language=ar`);
    const data = await res.json();
    
    // تحويل القائمة وتنسيقها لتناسب شريط الاختيار في صانع الريلز
    return data.reciters.map((reciter) => ({
      id: reciter.id,
      name: reciter.name,
      letter: reciter.letter,
      moshaf: reciter.moshaf.map((m) => ({
        id: m.id,
        name: m.name, // مثل: حفص عن عاصم (مرتل)، ورش عن نافع، قالون، مجود...
        server: m.server,
        surahList: m.surah_list ? m.surah_list.split(",") : [],
      })),
    }));
  } catch (error) {
    console.error("خطأ في جلب قائمة قراء صانع الريلز:", error);
    return [];
  }
}

// 2. بناء رابط الصوت المقسم آية بآية (Verse-by-Verse) للتزامن في الريلز
// يتيح تشغيل المقطع الصوتي للآية المختارة بدقة عالية
export function getAyahAudioUrl(everyAyahFolder, surahNumber, ayahNumber) {
  const padSurah = String(surahNumber).padStart(3, "0");
  const padAyah = String(ayahNumber).padStart(3, "0");
  return `${EVERYAYAH_BASE_URL}/${everyAyahFolder}/${padSurah}${padAyah}.mp3`;
}

// 3. جلب النطاق المحدد من الآيات (من آية كذا إلى عدد آيات معين) للنص والصوت
export async function getSelectedAyahsRange(surahNumber, startAyah, ayahsCount = 1) {
  try {
    const endAyah = Number(startAyah) + Number(ayahsCount) - 1;
    
    // جلب النص العثماني والترجمة/التفسير للنطاق المحدد
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ar.muyassar`
    );
    const data = await res.json();
    
    const allAyahsText = data.data[0].ayahs;
    const allAyahsTafsir = data.data[1].ayahs;
    
    // تصفية الآيات بناءً على بداية الآية وعدد الآيات
    const selectedAyahs = allAyahsText.filter(
      (a) => a.numberInSurah >= startAyah && a.numberInSurah <= endAyah
    ).map((ayah, index) => ({
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      tafsir: allAyahsTafsir.find(t => t.numberInSurah === ayah.numberInSurah)?.text || "",
    }));

    return {
      surahName: data.data[0].name,
      englishName: data.data[0].englishName,
      totalAyahsInSurah: data.data[0].numberOfAyahs,
      startAyah: Number(startAyah),
      endAyah: endAyah,
      ayahs: selectedAyahs,
      combinedText: selectedAyahs.map(a => `${a.text} ﴿${a.numberInSurah}﴾`).join(" "),
    };
  } catch (error) {
    console.error("خطأ في جلب آيات صانع الريلز:", error);
    return null;
  }
}