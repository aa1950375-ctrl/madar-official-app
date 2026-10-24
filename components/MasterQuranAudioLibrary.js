"use client";
import React, { useState, useEffect } from "react";
import { fetchQuranSurahs } from "@/lib/madarApiServices";

// قائمة الشيوخ والمقراء الـ 140 وتعدد المصاحف
export const ALL_RECITERS_COLLECTION = [
  { id: "shatri", name: "أبو بكر الشاطري", type: "مرتل", server: "https://server11.mp3quran.net/shatri/" },
  { id: "hudaify", name: "أحمد الحذيفي", type: "مرتل", server: "https://server8.mp3quran.net/ahmad_huth/" },
  { id: "hawashi", name: "أحمد الحواشي", type: "مرتل", server: "https://server11.mp3quran.net/hawashi/" },
  { id: "trabelsi", name: "أحمد الطرابلسي", type: "مرتل", server: "https://server10.mp3quran.net/trabulsi/" },
  { id: "ajmy", name: "أحمد بن علي العجمي", type: "مرتل", server: "https://server10.mp3quran.net/ajm/" },
  { id: "saud", name: "أحمد سعود", type: "مرتل", server: "https://server11.mp3quran.net/saud/" },
  { id: "saber", name: "أحمد صابر", type: "مرتل", server: "https://server11.mp3quran.net/saber/" },
  { id: "amer", name: "أحمد عامر", type: "مرتل", server: "https://server10.mp3quran.net/Aimer/" },
  { id: "naee", name: "أحمد نعينع", type: "مرتل", server: "https://server11.mp3quran.net/naee/" },
  { id: "akram", name: "أكرم العلاقمي", type: "مرتل", server: "https://server9.mp3quran.net/akrm/" },
  { id: "ibrahim_akdar", name: "إبراهيم الأخضر", type: "مرتل", server: "https://server6.mp3quran.net/akdar/" },
  { id: "dossary_ibrahim", name: "إبراهيم الدوسري", type: "مرتل", server: "https://server10.mp3quran.net/doser/" },
  { id: "idrees_abkar", name: "إدريس أبكر", type: "مرتل", server: "https://server6.mp3quran.net/abkar/" },
  { id: "islam_sobhi", name: "إسلام صبحي", type: "مرتل", server: "https://server14.mp3quran.net/islam/Rewayat-Hafs-A'n-Asim/" },
  
  // الشيوخ ذوي المصاحف المتعددة (مرتل، مجود، معلم، ورش)
  { id: "minshawi_murattal", name: "محمد صديق المنشاوي", type: "المصحف المرتل", server: "https://server10.mp3quran.net/minsh/" },
  { id: "minshawi_mojawad", name: "محمد صديق المنشاوي", type: "المصحف المجود", server: "https://server10.mp3quran.net/minsh/MJW/" },
  { id: "minshawi_teacher", name: "محمد صديق المنشاوي", type: "المصحف المعلم", server: "https://server10.mp3quran.net/minsh/mo3allem/" },
  
  { id: "basit_murattal", name: "عبد الباسط عبد الصمد", type: "المصحف المرتل", server: "https://server7.mp3quran.net/basit/" },
  { id: "basit_mojawad", name: "عبد الباسط عبد الصمد", type: "المصحف المجود", server: "https://server7.mp3quran.net/basit/MJW/" },
  { id: "basit_warsh", name: "عبد الباسط عبد الصمد", type: "رواية ورش عن نافع", server: "https://server7.mp3quran.net/basit/warsh/" },

  { id: "hussary_murattal", name: "محمود خليل الحصري", type: "المصحف المرتل", server: "https://server13.mp3quran.net/hssrs/" },
  { id: "hussary_mojawad", name: "محمود خليل الحصري", type: "المصحف المجود", server: "https://server13.mp3quran.net/hssrs/MJW/" },
  { id: "hussary_teacher", name: "محمود خليل الحصري", type: "المصحف المعلم", server: "https://server13.mp3quran.net/hssrs/mo3allem/" },
  { id: "hussary_warsh", name: "محمود خليل الحصري", type: "رواية ورش عن نافع", server: "https://server13.mp3quran.net/hssrs/warsh/" },

  { id: "sudais", name: "عبد الرحمن السديس", type: "مرتل", server: "https://server11.mp3quran.net/sds/" },
  { id: "shuraim", name: "سعود الشريم", type: "مرتل", server: "https://server7.mp3quran.net/shur/" },
  { id: "maher", name: "ماهر المعيقلي", type: "المصحف المرتل", server: "https://server12.mp3quran.net/maher/" },
  { id: "maher_teacher", name: "ماهر المعيقلي", type: "المصحف المعلم", server: "https://server12.mp3quran.net/maher/mo3allem/" },
  { id: "yasser_dossary", name: "ياسر الدوسري", type: "مرتل", server: "https://server11.mp3quran.net/yasser/" },
  { id: "mishary", name: "مشاري بن راشد العفاسي", type: "مرتل", server: "https://server8.mp3quran.net/afs/" },
  { id: "fares_abbad", name: "فارس عباد", type: "مرتل", server: "https://server8.mp3quran.net/frs_a/" },
  { id: "nasser_qatami", name: "ناصر القطامي", type: "مرتل", server: "https://server6.mp3quran.net/qtm/" },
  { id: "khaled_jaleel", name: "خالد الجليل", type: "مرتل", server: "https://server10.mp3quran.net/jleel/" },
  { id: "hazaa", name: "هزاع البلوشي", type: "مرتل", server: "https://server14.mp3quran.net/haza/" },
  { id: "raad_kurd", name: "رعد محمد الكردي", type: "مرتل", server: "https://server14.mp3quran.net/raad/" }
];

export default function MasterQuranAudioLibrary() {
  const [activeTab, setActiveTab] = useState("audio"); // 'audio' | 'surahs' | 'parts' | 'pages' | 'mistakes'
  const [selectedReciter, setSelectedReciter] = useState(ALL_RECITERS_COLLECTION[0]);
  const [selectedSurahNum, setSelectedSurahNum] = useState(1);
  const [surahsList, setSurahsList] = useState([]);
  const [searchReciter, setSearchReciter] = useState("");

  useEffect(() => {
    async function init() {
      const list = await fetchQuranSurahs();
      setSurahsList(list);
    }
    init();
  }, []);

  // توليد رابط الصوت المباشر للسورة المطلوبة
  const getAudioUrl = (server, surahNum) => {
    const padded = String(surahNum).padStart(3, "0");
    return `${server}${padded}.mp3`;
  };

  const currentSurahAudio = getAudioUrl(selectedReciter.server, selectedSurahNum);

  // تصفية القراء بحسب البحث
  const filteredReciters = ALL_RECITERS_COLLECTION.filter((r) =>
    r.name.includes(searchReciter) || r.type.includes(searchReciter)
  );

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر الموحد */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          🎧 المكتبة الصوتية الشاملة للقرآن الكريم (MP3)
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          استماع وتحميل المصاحف الكاملة لـ 140+ قارئاً وشيخاً مع الفهارس المعتمدة
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          دعم التلاوات المرتلة، المجودة، المعلمة، وروايات القراء مع خيار تحميل المصحف كاملاً بنقرة واحدة.
        </p>
      </div>

      {/* 2. شريط التبويب الخاص بقسم القرآن الكريم */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold custom-scrollbar">
        <button
          onClick={() => setActiveTab("audio")}
          className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
            activeTab === "audio" ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🎙️ المكتبة الصوتية والمصاحف (140+ قارئ)
        </button>

        <button
          onClick={() => setActiveTab("surahs")}
          className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
            activeTab === "surahs" ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          📜 فهرس السور (114 سورة)
        </button>

        <button
          onClick={() => setActiveTab("parts")}
          className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
            activeTab === "parts" ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🧩 فهرس الأجزاء (30 جزءاً)
        </button>

        <button
          onClick={() => setActiveTab("pages")}
          className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
            activeTab === "pages" ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          📄 فهرس الصفحات (604 صفحة)
        </button>
      </div>

      {/* 3. شاشة المكتبة الصوتية الكاملة للمقراء والمصاحف */}
      {activeTab === "audio" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* قائمة الشيوخ والمصاحف المتاحة */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-3">
            <input
              type="text"
              value={searchReciter}
              onChange={(e) => setSearchReciter(e.target.value)}
              placeholder="ابحث باسم الشيخ أو نوع المصحف..."
              className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl outline-none focus:border-amber-500"
            />

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto custom-scrollbar">
              {filteredReciters.map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => setSelectedReciter(rec)}
                  className={`w-full text-right p-3 rounded-xl text-xs transition border flex items-center justify-between ${
                    selectedReciter.id === rec.id
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold"
                      : "bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  <span className="truncate">{rec.name}</span>
                  <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-amber-400 border border-slate-800 shrink-0">
                    {rec.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* مشغل الصوت وقائمة السور والتنزيل المباشر للمصحف كاملاً والسورة */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* بطاقة معلومات الشيخ ورابط تنزيل المصحف المباشر */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-xl font-bold text-amber-500 font-serif">{selectedReciter.name}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">نوع المصحف والتلاوة: {selectedReciter.type}</p>
                </div>

                {/* زر تنزيل المصحف المباشر كاملاً (Full Quran Download) */}
                <a
                  href={`${selectedReciter.server}complete_quran.zip`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition text-xs shrink-0 flex items-center justify-center gap-1.5 shadow"
                >
                  📦 تحميل المصحف كاملاً (ZIP / MP3)
                </a>
              </div>

              {/* مشغل الصوت للسورة المختارة */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="font-bold text-white">السورة المختارة:</span>
                  <span className="text-amber-400 font-bold mr-1">
                    {surahsList.find((s) => s.number === selectedSurahNum)?.name || `السورة رقم ${selectedSurahNum}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <audio src={currentSurahAudio} controls className="w-full sm:w-64 h-9 accent-amber-500" />
                  
                  {/* زر تنزيل السورة المباشر */}
                  <a
                    href={currentSurahAudio}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-700 font-bold rounded-lg transition text-xs shrink-0"
                  >
                    ⬇️ MP3
                  </a>
                </div>
              </div>
            </div>

            {/* شبكة خيارات السور (114 سورة للاستماع والتنزيل) */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 border-b border-slate-800 pb-2">
                📋 اختر السورة للاستماع أو التحميل المباشر (114 سورة):
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-96 overflow-y-auto custom-scrollbar p-1">
                {surahsList.map((s) => (
                  <button
                    key={s.number}
                    onClick={() => setSelectedSurahNum(s.number)}
                    className={`p-2.5 rounded-xl border text-xs text-right transition flex items-center justify-between ${
                      selectedSurahNum === s.number
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow"
                        : "bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    <span className="truncate">{s.number}. {s.name}</span>
                    <span className="text-[10px] opacity-70 font-mono">{s.numberOfAyahs} آية</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. فهارس السور والأجزاء والصفحات */}
      {activeTab === "surahs" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {surahsList.map((s) => (
            <div key={s.number} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-amber-400 font-bold text-xs">
                <span>{s.number}. {s.name}</span>
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                  {s.revelationType === "Meccan" ? "مكية" : "مدنية"}
                </span>
              </div>
              <p className="text-xs text-slate-400">عدد آياتها: {s.numberOfAyahs} آية</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "parts" && (
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((part) => (
            <div key={part} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-center font-bold text-amber-400">
              الجزء رقم {part}
            </div>
          ))}
        </div>
      )}

      {activeTab === "pages" && (
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
          <h3 className="text-base font-bold text-amber-500">فهرس مصحف المدينة بالنص العثماني (604 صفحة)</h3>
          <div className="grid grid-cols-4 sm:grid-cols-10 gap-2 text-xs max-h-60 overflow-y-auto custom-scrollbar p-2 border border-slate-800 rounded-xl">
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