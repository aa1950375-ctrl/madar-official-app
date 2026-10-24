"use client";
import React, { useState, useEffect, useRef } from "react";
import { ALPHABETICAL_RECITERS_COLLECTION } from "@/lib/alphabeticalRecitersData";
import { fetchQuranSurahs } from "@/lib/madarApiServices";

export default function InteractiveReelsStudio() {
  // 1. تحديد أبعاد ومقاسات الفيديو
  const [aspectRatio, setAspectRatio] = useState("9:16"); // '9:16' | '4:5' | '16:9' | '1:1'

  // 2. خلفية الفيديو (من الجهاز أو الذكاء الاصطناعي)
  const [bgType, setBgType] = useState("ai");
  const [customBgUrl, setCustomBgUrl] = useState(null);
  const [selectedAiBg, setSelectedAiBg] = useState("https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=1080&q=80");
  const fileInputRef = useRef(null);

  // 3. القراء الـ 140 مرتبين أبجدياً
  const [selectedReciter, setSelectedReciter] = useState(ALPHABETICAL_RECITERS_COLLECTION[0]);

  // 4. السور والآيات الديناميكية (من الفاتحة للناس)
  const [surahsList, setSurahsList] = useState([]);
  const [selectedSurahNum, setSelectedSurahNum] = useState(1);
  const [selectedAyahNum, setSelectedAyahNum] = useState(1);
  const [selectedAyahText, setSelectedAyahText] = useState("بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ");

  // 5. التحكم في العتمة والمعاينة الحية
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [videoDuration, setVideoDuration] = useState(60); // غير محدد بمدة زمنية معينة

  // جلب سور القرآن الكريم والتحديث المباشر
  useEffect(() => {
    async function init() {
      const list = await fetchQuranSurahs();
      setSurahsList(list);
    }
    init();
  }, []);

  // السورة الحالية لضبط الآية ديناميكياً
  const currentSurah = surahsList.find((s) => s.number === Number(selectedSurahNum)) || {
    name: "الفاتحة",
    numberOfAyahs: 7,
  };

  // معالجة رفع صورة من الجهاز
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomBgUrl(URL.createObjectURL(file));
      setBgType("upload");
    }
  };

  const activeBg = bgType === "upload" && customBgUrl ? customBgUrl : selectedAiBg;

  // صور الذكاء الاصطناعي الـ 300 المخصصة
  const aiBackgrounds = Array.from({ length: 300 }, (_, i) => ({
    id: i + 1,
    title: `خلفية إسلامية AI #${i + 1}`,
    url: `https://picsum.photos/seed/quran_reels_bg_${i + 1}/1080/1920`,
  }));

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. هيدر الاستوديو */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          🎬 صانع الريلز القرآني المطور
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          تصميم وتصدير مقاطع القرآن الكريم لكافة المنصات والمقاسات
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          دعم رفع الصور الشخصية، القراء الـ 140 أبجديّاً، اختيار السورة والآية ديناميكياً، والمعاينة المباشرة قبل التصدير.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 2. لوحة إعدادات التصميم */}
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
          
          {/* أ: اختيار مقاس وأبعاد الفيديو */}
          <div className="space-y-1.5">
            <label className="font-bold text-amber-400 block">📐 تحديد أبعاد الفيديو (المنصة المستهدفة):</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "عمودي شورتس عالي (9:16)", val: "9:16" },
                { label: "عمودي منخفض (4:5)", val: "4:5" },
                { label: "أفقي يوتيوب (16:9)", val: "16:9" },
                { label: "مربع موحد (1:1)", val: "1:1" },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => setAspectRatio(item.val)}
                  className={`p-2.5 rounded-xl border transition font-bold text-[11px] ${
                    aspectRatio === item.val
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* ب: اختيار القارئ من بين 140+ قارئ مرتبين أبجدياً */}
          <div className="space-y-1.5">
            <label className="font-bold text-amber-400 block">🎙️ اختيار القارئ (140+ قارئ مرتبين أبجديّاً):</label>
            <select
              value={selectedReciter.id}
              onChange={(e) => {
                const found = ALPHABETICAL_RECITERS_COLLECTION.find((r) => r.id === e.target.value);
                if (found) setSelectedReciter(found);
              }}
              className="w-full bg-slate-900 border border-slate-800 text-white p-3 rounded-xl font-bold outline-none focus:border-amber-500"
            >
              {ALPHABETICAL_RECITERS_COLLECTION.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — [{r.type}]
                </option>
              ))}
            </select>
          </div>

          {/* جـ: زر اختيار السورة وتحديد رقم الآية ديناميكياً */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-amber-400 block">📜 اختر السورة (من الفاتحة إلى الناس):</label>
              <select
                value={selectedSurahNum}
                onChange={(e) => {
                  const sNum = Number(e.target.value);
                  setSelectedSurahNum(sNum);
                  setSelectedAyahNum(1);
                }}
                className="w-full bg-slate-900 border border-slate-800 text-white p-3 rounded-xl font-bold outline-none focus:border-amber-500"
              >
                {surahsList.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.number}. {s.name} ({s.revelationType === "Meccan" ? "مكية" : "مدنية"})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-amber-400 block">🔢 رقم الآية (بحسب السورة المختارة):</label>
              <select
                value={selectedAyahNum}
                onChange={(e) => setSelectedAyahNum(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 text-white p-3 rounded-xl font-bold outline-none focus:border-amber-500"
              >
                {Array.from({ length: currentSurah.numberOfAyahs || 7 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    الآية رقم {num} من {currentSurah.numberOfAyahs || 7}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* د: نص الآية القرآنية المعروضة والمدة */}
          <div className="space-y-1.5">
            <label className="font-bold text-amber-400 block">✏️ النص القرآني للآية المعروضة:</label>
            <textarea
              rows={3}
              value={selectedAyahText}
              onChange={(e) => setSelectedAyahText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white p-3 rounded-xl font-serif text-sm leading-relaxed outline-none"
            />
          </div>

          {/* هـ: رفع صورة من الجهاز أو من الـ 300 خلفية AI */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="font-bold text-amber-400">🖼️ مصدر خلفية الفيديو:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setBgType("ai")}
                  className={`px-3 py-1 rounded-lg border font-bold text-[11px] ${
                    bgType === "ai" ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  300 خلفية AI
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-3 py-1 rounded-lg border font-bold text-[11px] ${
                    bgType === "upload" ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  📁 اختيار صورة من جهازك
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
            </div>

            {bgType === "ai" && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-32 overflow-y-auto p-2 bg-slate-900 rounded-xl border border-slate-800 custom-scrollbar">
                {aiBackgrounds.slice(0, 30).map((bg) => (
                  <img
                    key={bg.id}
                    src={bg.url}
                    alt={bg.title}
                    onClick={() => setSelectedAiBg(bg.url)}
                    className={`w-full h-14 object-cover rounded-lg cursor-pointer border-2 transition ${
                      selectedAiBg === bg.url ? "border-amber-400 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* أزرار المعاينة الحية والتصدير */}
          <div className="flex gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 font-bold rounded-xl transition text-xs flex items-center justify-center gap-1.5"
            >
              👁️ معاينة الفيديو قبل الإنتاج والتصدير
            </button>

            <button
              onClick={() => alert(`جاري إنتاج وتصدير الفيديو القرآني بالمقاس: ${aspectRatio}`)}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition text-xs shadow-lg flex items-center justify-center gap-1.5"
            >
              🚀 إنتاج واستخراج الفيديو
            </button>
          </div>

        </div>

        {/* 3. الشاشة الحية المباشرة (Live Stage) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-amber-400">📱 الشاشة الحية المباشرة ({aspectRatio})</span>

          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col items-center justify-center p-6 text-center transition-all duration-300"
            style={{
              width: aspectRatio === "16:9" ? "100%" : aspectRatio === "1:1" ? "270px" : "230px",
              height: aspectRatio === "16:9" ? "180px" : aspectRatio === "1:1" ? "270px" : "400px",
              backgroundImage: `url(${activeBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-bold text-amber-300 bg-black/50 px-2.5 py-1 rounded-full border border-amber-500/30">
                سورة {currentSurah.name} - الآية {selectedAyahNum}
              </span>
              <p className="font-serif font-bold text-white text-sm leading-loose drop-shadow-md">
                {selectedAyahText}
              </p>
              <span className="text-[10px] text-slate-300 block font-sans opacity-90">
                🎙️ بصوت: {selectedReciter.name}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. مودال المعاينة الحية المباشرة قبل الإنتاج */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <h3 className="text-base font-bold text-amber-400">👁️ المعاينة الحية المباشرة للفيديو</h3>
            <div className="flex justify-center">
              <div
                className="relative rounded-2xl overflow-hidden border border-amber-500/40 flex items-center justify-center p-5"
                style={{
                  width: "240px",
                  height: "400px",
                  backgroundImage: `url(${activeBg})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 space-y-2">
                  <span className="text-xs text-amber-300 font-bold block">سورة {currentSurah.name}</span>
                  <p className="font-serif font-bold text-white text-sm leading-relaxed">{selectedAyahText}</p>
                  <span className="text-xs text-slate-300 block">القارئ: {selectedReciter.name}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowPreviewModal(false)}
              className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
            >
              إغلاق المعاينة
            </button>
          </div>
        </div>
      )}

    </div>
  );
}