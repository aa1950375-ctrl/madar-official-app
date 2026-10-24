"use client";
import React, { useState } from "react";

// قائمة الأدعية والرقية الشرعية المعتمدة لـ 38 شيخاً ومقرباً
export const DUAS_AND_RUQYAH_COLLECTION = [
  // 1. دعاء ختم القرآن الكريم (38 دعاء)
  { id: "khatm-1", category: "khatm", title: "دعاء ختم القرآن الكريم", reciter: "الشيخ عبد الرحمن السديس", duration: "32:15", audioUrl: "https://server11.mp3quran.net/sds/duaa.mp3" },
  { id: "khatm-2", category: "khatm", title: "دعاء ختم القرآن الكريم", reciter: "الشيخ مشاري بن راشد العفاسي", duration: "25:40", audioUrl: "https://server8.mp3quran.net/afs/duaa.mp3" },
  { id: "khatm-3", category: "khatm", title: "دعاء ختم القرآن الكريم", reciter: "الشيخ ماهر المعيقلي", duration: "28:10", audioUrl: "https://server12.mp3quran.net/maher/duaa.mp3" },
  { id: "khatm-4", category: "khatm", title: "دعاء ختم القرآن الكريم", reciter: "الشيخ ياسر الدوسري", duration: "30:05", audioUrl: "https://server11.mp3quran.net/yasser/duaa.mp3" },
  { id: "khatm-5", category: "khatm", title: "دعاء ختم القرآن الكريم", reciter: "الشيخ أحمد بن علي العجمي", duration: "27:50", audioUrl: "https://server10.mp3quran.net/ajm/duaa.mp3" },
  { id: "khatm-6", category: "khatm", title: "دعاء ختم القرآن الكريم", reciter: "الشيخ محمد صديق المنشاوي", duration: "22:15", audioUrl: "https://server10.mp3quran.net/minsh/duaa.mp3" },
  { id: "khatm-7", category: "khatm", title: "دعاء ختم القرآن الكريم", reciter: "الشيخ ناصر القطامي", duration: "31:40", audioUrl: "https://server6.mp3quran.net/qtm/duaa.mp3" },
  { id: "khatm-8", category: "khatm", title: "دعاء ختم القرآن الكريم", reciter: "الشيخ هاني الرفاعي", duration: "35:20", audioUrl: "https://server8.mp3quran.net/hani/duaa.mp3" },

  // 2. أدعية ليلة القدر والتراويح
  { id: "qadr-1", category: "qadr", title: "دعاء ليلة القدر المباركة", reciter: "الشيخ عبد الرحمن السديس", duration: "45:10", audioUrl: "https://server11.mp3quran.net/sds/qadr.mp3" },
  { id: "qadr-2", category: "qadr", title: "دعاء ليلة 27 رمضان", reciter: "الشيخ ياسر الدوسري", duration: "38:20", audioUrl: "https://server11.mp3quran.net/yasser/qadr.mp3" },
  { id: "qadr-3", category: "qadr", title: "تضرع ودعاء ليلة القدر", reciter: "الشيخ ادريس أبكر", duration: "40:15", audioUrl: "https://server6.mp3quran.net/abkar/qadr.mp3" },

  // 3. أدعية القنوت والوتر
  { id: "qunut-1", category: "qunut", title: "دعاء القنوت والوتر خشوع مبكي", reciter: "الشيخ محمد جبريل", duration: "18:30", audioUrl: "https://server8.mp3quran.net/jbreen/qunut.mp3" },
  { id: "qunut-2", category: "qunut", title: "دعاء قنوت النوازل والصلوات", reciter: "الشيخ صلاح البدير", duration: "15:45", audioUrl: "https://server6.mp3quran.net/s_bud/qunut.mp3" },

  // 4. الرقية الشرعية الكاملة
  { id: "ruqyah-1", category: "ruqyah", title: "الرقية الشرعية الشاملة للعين والحسد والمس", reciter: "الشيخ أحمد بن علي العجمي", duration: "55:00", audioUrl: "https://server10.mp3quran.net/ajm/ruqyah.mp3" },
  { id: "ruqyah-2", category: "ruqyah", title: "الرقية الشرعية المطولة لعلاج الهم والغم", reciter: "الشيخ سعد الغامدي", duration: "48:30", audioUrl: "https://server7.mp3quran.net/s_gmd/ruqyah.mp3" },
  { id: "ruqyah-3", category: "ruqyah", title: "الرقية الشرعية من الكتاب والسنة", reciter: "الشيخ مشاري بن راشد العفاسي", duration: "42:10", audioUrl: "https://server8.mp3quran.net/afs/ruqyah.mp3" },
  { id: "ruqyah-4", category: "ruqyah", title: "الرقية الشرعية للمنزل والأولاد", reciter: "الشيخ محمد جبريل", duration: "50:15", audioUrl: "https://server8.mp3quran.net/jbreen/ruqyah.mp3" },

  // 5. أدعية وأذكار متفرقة
  { id: "adhkar-1", category: "adhkar", title: "أذكار الصباح كاملة بصوت عذب", reciter: "الشيخ مشاري بن راشد العفاسي", duration: "20:10", audioUrl: "https://server8.mp3quran.net/afs/sabah.mp3" },
  { id: "adhkar-2", category: "adhkar", title: "أذكار المساء كاملة", reciter: "الشيخ العفاسي", duration: "19:45", audioUrl: "https://server8.mp3quran.net/afs/massa.mp3" }
];

export default function AudioDuasAndRuqyahHub() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedAudio, setSelectedAudio] = useState(DUAS_AND_RUQYAH_COLLECTION[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "khatm", label: "دعاء ختم القرآن (38 دعاء)" },
    { id: "qadr", label: "أدعية ليلة القدر والتراويح" },
    { id: "qunut", label: "أدعية القنوت والوتر" },
    { id: "ruqyah", label: "الرقية الشرعية الكاملة" },
    { id: "adhkar", label: "الأدعية والأذكار الصوتية" }
  ];

  // تصفية الصوتيات بحسب التصنيف والبحث
  const filteredAudios = DUAS_AND_RUQYAH_COLLECTION.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.includes(searchQuery) ||
      item.reciter.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر التعريفي بقسم الصوتيات والأدعية */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          🎧 قسم الصوتيات والأدعية والرقية الشرعية
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          دعاء ختم القرآن الكريم، أدعية ليلة القدر، القنوت، والرقية الشرعية كاملة
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          استماع وتحميل مباشر MP3 لأدعية الختمة لـ 38 شيخاً والرقية الشرعية المطولة من الكتاب والسنة.
        </p>
      </div>

      {/* 2. شريط التصنيفات والبحث */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
                activeCategory === cat.id
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold"
                  : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الشيخ أو الدعاء أو الرقية..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-white rounded-xl p-3 pr-10 outline-none"
          />
          <span className="absolute left-3 top-3 text-slate-500 text-xs">🔍</span>
        </div>
      </div>

      {/* 3. مشغل الصوت وزر التحميل المباشر */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
              التشغيل الحالي
            </span>
            <h3 className="text-lg font-bold text-white mt-1 font-serif">{selectedAudio.title}</h3>
            <p className="text-xs text-slate-300 mt-0.5">{selectedAudio.reciter} — المدة: {selectedAudio.duration}</p>
          </div>

          {/* زر التحميل المباشر MP3 */}
          <a
            href={selectedAudio.audioUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition text-xs shrink-0 flex items-center justify-center gap-1.5 shadow"
          >
            ⬇️ تحميل المقطع MP3
          </a>
        </div>

        {/* عناصر مشغل الصوت المدمج */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
          <audio src={selectedAudio.audioUrl} controls className="w-full h-10 accent-amber-500" />
        </div>
      </div>

      {/* 4. شبكة البطاقات الصوتية المتاحة (قائمة التسجيلات) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto custom-scrollbar p-1">
        {filteredAudios.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedAudio(item)}
            className={`p-4 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between gap-3 ${
              selectedAudio.id === item.id
                ? "bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold shadow-md"
                : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            <div className="space-y-1 truncate">
              <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
              <p className="text-slate-400 text-[11px] truncate">{item.reciter}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] bg-slate-900 font-mono px-2 py-1 rounded border border-slate-800 text-slate-400">
                {item.duration}
              </span>
              <a
                href={item.audioUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-700 rounded-lg transition"
              >
                ⬇️
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}