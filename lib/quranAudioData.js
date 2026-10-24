// lib/quranAudioData.js

export const QURAN_RECITERS_140 = [
  { id: "shatri", name: "أبو بكر الشاطري", server: "https://server11.mp3quran.net/shatri/" },
  { id: "hudaify", name: "أحمد الحذيفي", server: "https://server8.mp3quran.net/ahmad_huth/" },
  { id: "hawashi", name: "أحمد الحواشي", server: "https://server11.mp3quran.net/hawashi/" },
  { id: "trabelsi", name: "أحمد الطرابلسي", server: "https://server10.mp3quran.net/trabulsi/" },
  { id: "ajmy", name: "أحمد بن علي العجمي", server: "https://server10.mp3quran.net/ajm/" },
  { id: "saud", name: "أحمد سعود", server: "https://server11.mp3quran.net/saud/" },
  { id: "saber", name: "أحمد صابر", server: "https://server11.mp3quran.net/saber/" },
  { id: "amer", name: "أحمد عامر", server: "https://server10.mp3quran.net/Aimer/" },
  { id: "naee", name: "أحمد نعينع", server: "https://server11.mp3quran.net/naee/" },
  { id: "akram", name: "أكرم العلاقمي", server: "https://server9.mp3quran.net/akrm/" },
  { id: "ibrahim_akdar", name: "إبراهيم الأخضر", server: "https://server6.mp3quran.net/akdar/" },
  { id: "dossary_ibrahim", name: "إبراهيم الدوسري", server: "https://server10.mp3quran.net/doser/" },
  { id: "idrees_abkar", name: "إدريس أبكر", server: "https://server6.mp3quran.net/abkar/" },
  { id: "islam_sobhi", name: "إسلام صبحي", server: "https://server14.mp3quran.net/islam/Rewayat-Hafs-A'n-Asim/" },
  { id: "sudais", name: "عبد الرحمن السديس", server: "https://server11.mp3quran.net/sds/" },
  { id: "shuraim", name: "سعود الشريم", server: "https://server7.mp3quran.net/shur/" },
  { id: "maher", name: "ماهر المعيقلي", server: "https://server12.mp3quran.net/maher/" },
  { id: "minshawi_murattal", name: "محمد صديق المنشاوي (المرتل)", server: "https://server10.mp3quran.net/minsh/" },
  { id: "minshawi_mojawad", name: "محمد صديق المنشاوي (المجود)", server: "https://server10.mp3quran.net/minsh/MJW/" },
  { id: "abdulbasit_murattal", name: "عبد الباسط عبد الصمد (المرتل)", server: "https://server7.mp3quran.net/basit/" },
  { id: "abdulbasit_mojawad", name: "عبد الباسط عبد الصمد (المجود)", server: "https://server7.mp3quran.net/basit/MJW/" },
  { id: "hussary", name: "محمود خليل الحصري", server: "https://server13.mp3quran.net/hssrs/" },
  { id: "mishary", name: "مشاري بن راشد العفاسي", server: "https://server8.mp3quran.net/afs/" },
  { id: "yasser_dossary", name: "ياسر الدوسري", server: "https://server11.mp3quran.net/yasser/" },
  { id: "fares_abbad", name: "فارس عباد", server: "https://server8.mp3quran.net/frs_a/" },
  { id: "nasser_qatami", name: "ناصر القطامي", server: "https://server6.mp3quran.net/qtm/" },
  { id: "khaled_jaleel", name: "خالد الجليل", server: "https://server10.mp3quran.net/jleel/" },
  { id: "hazaa", name: "هزاع البلوشي", server: "https://server14.mp3quran.net/haza/" },
  { id: "raad_kurd", name: "رعد محمد الكردي", server: "https://server14.mp3quran.net/raad/" },
  { id: "mou3allim_hussary", name: "المصحف المعلم (الحصري)", server: "https://server13.mp3quran.net/hssrs/mo3allem/" }
];

// دالة لتوليد رابط الصوت المباشر أو التحميل للسورة المطلوبة
export function getSurahAudioUrl(serverUrl, surahNumber) {
  const paddedNumber = String(surahNumber).padStart(3, "0");
  return `${serverUrl}${paddedNumber}.mp3`;
}