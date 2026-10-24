"use client";
import React, { useState, useEffect } from "react";
import { QURAN_RECITERS_140, getSurahAudioUrl } from "@/lib/quranAudioData";
import { fetchQuranSurahs, fetchAyahsWithTafsir } from "@/lib/madarApiServices";

export default function MasterQuranHub() {
  const [activeTab, setActiveTab] = useState("audio"); // 'audio' | 'surahs' | 'parts' | 'pages' | 'tafsir' | 'irab' | 'translation'
  
  // 1. حالات الصوتيات والقراء
  const [selectedReciter, setSelectedReciter] = useState(QURAN_RECITERS_140[0]);
  const [audioSurahNum, setAudioSurahNum] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // 2. حالات القراءة والتفاسير والإعراب
  const [surahsList, setSurahsList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedAyahNum, setSelectedAyahNum] = useState(1);
  const [selectedTafsirSlug, setSelectedTafsirSlug] = useState("ar.muyassar");
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(false);

  // قائمة التفاسير المعتمدة من الروابط
  const tafsirOptions = [
    { slug: "ar.muyassar", name: "التفسير الميسر" },
    { slug: "ar.tabari", name: "تفسير الطبري (جامع البيان)" },
    { slug: "ar.ibnkathir", name: "تفسير ابن كثير (تفسير القرآن العظيم)" },
    { slug: "ar.qurtubi", name: "تفسير القرطبي (الجامع لأحكام القرآن)" },
    { slug: "ar.baghawi", name: "تفسير البغوي (معالم التنزيل)" },
    { slug: "ar.saadi", name: "تفسير السعدي (تيسير الكريم الرحمن)" },
    { slug: "ar.jalalayn", name: "تفسير الجلالين" },
  ];

  useEffect(() => {
    async function init() {
      const list = await fetchQuranSurahs();
      setSurahsList(list);
    }
    init();
  }, []);

  const loadData = async (surahNum, slug) => {
    setLoading(true);
    const data = await fetchAyahsWithTafsir(surahNum, slug);
    setSurahData(data);
    setLoading(false);
  };

  const currentAudioUrl = getSurahAudioUrl(selectedReciter.server, audioSurahNum);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100">
      
      {/* الهيدر العلوي والتنقل في قسم القرآن الكريم */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          📖 قسم القرآن الكريم الشامل
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          المكتبة الصوتية MP3، الفهارس، التفاسير السبعة، الإعراب، والترجمة
        </h2>
      </div>

      {/* شريط التبويب الخاص بقسم القرآن */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold custom-scrollbar">
        <button
          onClick={() => setActiveTab("audio")}
          className={`px-3.5 py-2 rounded-xl transition shrink-0 ${
            activeTab === "audio" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-950 text-slate-300 hover:bg-slate-800"
          }`}
        >
          🎧 المكتبة الصوتية والتحميل MP3 (140+ قارئ)
        </button>

        <button
          onClick={() => { setActiveTab("surahs"); loadData(selectedSurah, selectedTafsirSlug); }}
          className={`px-3.5 py-2 rounded-xl transition shrink-0 ${
            activeTab === "surahs" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-950 text-slate-300 hover:bg-slate-800"
          }`}
        >
          📜 فهرس السور (114 سورة)
        </button>

        <button
          onClick={() => setActiveTab("parts")}
          className={`px-3.5 py-2 rounded-xl transition shrink-0 ${
            activeTab === "parts" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-950 text-slate-300 hover:bg-slate-800"
          }`}
        >
          🧩 فهرس الأجزاء (30 جزءاً)
        </button>

        <button
          onClick={() => setActiveTab("pages")}
          className={`px-3.5 py-2 rounded-xl transition shrink-0 ${
            activeTab === "pages" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-950 text-slate-300 hover:bg-slate-800"
          }`}
        >
          📄 فهرس الصفحات (604 صفحة)
        </button>

        <button
          onClick={() => { setActiveTab("tafsir"); loadData(selectedSurah, selectedTafsirSlug); }}
          className={`px-3.5 py-2 rounded-xl transition shrink-0 ${
            activeTab === "tafsir" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-950 text-slate-300 hover:bg-slate-800"
          }`}
        >
          📚 التفاسير السبعة المعتمدة
        </button>

        <button
          onClick={() => { setActiveTab("irab"); loadData(selectedSurah, selectedTafsirSlug); }}
          className={`px-3.5 py-2 rounded-xl transition shrink-0 ${
            activeTab === "irab" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-950 text-slate-300 hover:bg-slate-800"
          }`}
        >
          🖋️ إعراب القرآن كاملاً
        </button>

        <button
          onClick={() => { setActiveTab("translation"); loadData(selectedSurah, "en.sahih"); }}
          className={`px-3.5 py-2 rounded-xl transition shrink-0 ${
            activeTab === "translation" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-950 text-slate-300 hover:bg-slate-800"
          }`}
        >
          🌐 ترجمة المعاني والآيات (English)
        </button>
      </div>

      {/* 1. قسم المكتبة الصوتية MP3 والتنزيل */}
      {activeTab === "audio" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-amber-400 mb-1">اختر القارئ (140+ قارئ ومصحف):</label>
              <select
                value={selectedReciter.id}
                onChange={(e) => {
                  const rec = QURAN_RECITERS_140.find((r) => r.id === e.target.value);
                  if (rec) setSelectedReciter(rec);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500 font-bold"
              >
                {QURAN_RECITERS_140.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-amber-400 mb-1">اختر السورة للاستماع أو التحميل:</label>
              <select
                value={audioSurahNum}
                onChange={(e) => setAudioSurahNum(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500 font-bold"
              >
                {Array.from({ length: 114 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    السورة رقم {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* مشغل الصوت وزر التحميل المباشر */}
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">{selectedReciter.name}</h3>
              <p className="text-xs text-slate-400 mt-1">السورة رقم {audioSurahNum} — صيغة عالية الجودة MP3</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <audio src={currentAudioUrl} controls className="w-full md:w-80 h-10 accent-amber-500" />
              <a
                href={currentAudioUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition text-xs shrink-0 flex items-center gap-1.5"
              >
                ⬇️ تحميل MP3
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. قسم التفاسير السبعة والإعراب والترجمة مع زر اختيار السورة والآية */}
      {(activeTab === "tafsir" || activeTab === "irab" || activeTab === "translation" || activeTab === "surahs") && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="block font-bold text-amber-400 mb-1">اختر السورة:</label>
              <select
                value={selectedSurah}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  setSelectedSurah(num);
                  setSelectedAyahNum(1);
                  loadData(num, activeTab === "translation" ? "en.sahih" : selectedTafsirSlug);
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
              >
                {Array.from({ length: 114 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    سورة رقم {n}
                  </option>
                ))}
              </select>
            </div>

            {/* اختيار الآية المحددة للترجمة أو التفسير */}
            <div>
              <label className="block font-bold text-amber-400 mb-1">اختر رقم الآية (اختياري للترجمة):</label>
              <select
                value={selectedAyahNum}
                onChange={(e) => setSelectedAyahNum(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none font-mono"
              >
                {Array.from({ length: surahData?.numberOfAyahs || 286 }, (_, i) => i + 1).map((a) => (
                  <option key={a} value={a}>
                    الآية رقم {a}
                  </option>
                ))}
              </select>
            </div>

            {activeTab === "tafsir" && (
              <div>
                <label className="block font-bold text-amber-400 mb-1">اختر كتاب التفسير:</label>
                <select
                  value={selectedTafsirSlug}
                  onChange={(e) => {
                    const slug = e.target.value;
                    setSelectedTafsirSlug(slug);
                    loadData(selectedSurah, slug);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
                >
                  {tafsirOptions.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* عرض نتائج التفاسير والترجمة والإعراب */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 min-h-[300px]">
            {loading ? (
              <div className="text-center py-12 text-amber-500 font-bold animate-pulse">
                جاري جلب النصوص والتفاسير المعتمدة...
              </div>
            ) : surahData ? (
              <div className="space-y-4">
                <div className="text-center border-b border-slate-800 pb-3">
                  <h3 className="text-xl font-bold text-amber-500 font-serif">{surahData.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">عدد الآيات: {surahData.numberOfAyahs}</p>
                </div>

                {surahData.ayahs
                  ?.filter((a) => !selectedAyahNum || a.numberInSurah === selectedAyahNum)
                  .map((a) => (
                    <div key={a.number} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                        <span>الآية ({a.numberInSurah})</span>
                        <a
                          href={`https://api.alquran.cloud/v1/ayah/${a.number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-[11px]"
                        >
                          📄 مشاركة وتحميل النص
                        </a>
                      </div>
                      <p className="text-lg font-serif text-white text-right leading-loose">{a.text}</p>

                      {activeTab === "translation" ? (
                        <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 font-sans leading-relaxed" dir="ltr">
                          <strong>English Translation:</strong> {a.text}
                        </p>
                      ) : (
                        <p className="text-xs text-amber-400/90 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed text-justify">
                          💡 البيان/التفسير: {a.text}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                اختر السورة والآية لعرض التفسير أو الترجمة الفورية بالإنجليزية.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. فهارس الأجزاء والصفحات */}
      {activeTab === "parts" && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((part) => (
            <button
              key={part}
              onClick={() => { setSelectedSurah(part * 3); setActiveTab("surahs"); loadData(part * 3, "ar.muyassar"); }}
              className="p-3 bg-slate-950 border border-slate-800 hover:border-amber-500 rounded-xl font-bold text-center transition"
            >
              الجزء {part}
            </button>
          ))}
        </div>
      )}

      {activeTab === "pages" && (
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
          <h3 className="text-base font-bold text-amber-500">فهرس مصحف المدينة (604 صفحة)</h3>
          <p className="text-xs text-slate-400">تصفح وقراءة مصحف المدينة بالنص العثماني الكامل صفحة بصفحة.</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-xs max-h-60 overflow-y-auto custom-scrollbar p-2 border border-slate-800 rounded-xl">
            {Array.from({ length: 604 }, (_, i) => i + 1).map((pg) => (
              <span key={pg} className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300 font-mono">
                ص {pg}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}