"use client";
import React, { useState, useRef } from "react";
import { STORIES_ENCYCLOPEDIA } from "@/lib/storiesEncyclopediaData";

export default function AdvancedReelsMaker() {
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [bgType, setBgType] = useState("ai");
  const [customBgUrl, setCustomBgUrl] = useState(null);
  const [selectedAiBg, setSelectedAiBg] = useState("https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1080&q=80");
  const fileInputRef = useRef(null);

  // اختيار القصة والتجزئة المباشرة من الـ PDF
  const [selectedStory, setSelectedStory] = useState(STORIES_ENCYCLOPEDIA[0]);
  const [selectedPartIndex, setSelectedPartIndex] = useState(0);
  const [videoDuration, setVideoDuration] = useState(120); // مدة مفتوحة
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // صور الـ 300 AI المخصصة للقصص
  const storyAiBackgrounds = Array.from({ length: 300 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/story_pdf_bg_${i + 1}/1080/1920`
  }));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomBgUrl(URL.createObjectURL(file));
      setBgType("upload");
    }
  };

  const activeBg = bgType === "upload" && customBgUrl ? customBgUrl : selectedAiBg;
  const currentPartText = selectedStory.parts[selectedPartIndex] || selectedStory.fullContent;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر المطور للريلز القصصي */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          📜 صانع الريلز القصصي والسير السينمائي (مربوط بالموسوعة المعتمدة)
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          تحويل قصص الأنبياء، السيرة النبوية، والصحابة إلى فيديو ريلز وشورتس
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          اختر أي قصة من الموسوعة، وحدد الجزء المراد إنتاجه مع زر التجزئة التفاعلي والرفع المباشر للخلفيات.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 2. لوحة التحكم والخيارات */}
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-5 text-xs">
          
          {/* أ: اختيار القصة والشخصية من الموسوعة */}
          <div className="space-y-2">
            <label className="font-bold text-amber-400 block">📖 اختر القصة من الموسوعة الشاملة:</label>
            <select
              value={selectedStory.id}
              onChange={(e) => {
                const found = STORIES_ENCYCLOPEDIA.find((s) => s.id === e.target.value);
                if (found) {
                  setSelectedStory(found);
                  setSelectedPartIndex(0);
                }
              }}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-3 outline-none font-bold"
            >
              {STORIES_ENCYCLOPEDIA.map((s) => (
                <option key={s.id} value={s.id}>
                  [{s.category}] {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* ب: زر تجزئة النص التفاعلي (مُجزئ النصوص للريلز) */}
          <div className="space-y-2">
            <label className="font-bold text-amber-400 block">✂️ اختر الجزء المراد تحويله إلى فيديو (مُجزئ القصة):</label>
            <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
              {selectedStory.parts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPartIndex(idx)}
                  className={`px-3.5 py-2.5 rounded-xl shrink-0 border transition font-bold text-[11px] ${
                    selectedPartIndex === idx
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  الجزء {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* جـ: مصدر خلفية الفيديو (رفع من الجهاز أو من الـ 300 صورة AI) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-amber-400">🖼️ خلفية المقطع القصصي:</label>
              <div className="flex gap-2 text-[11px]">
                <button
                  onClick={() => setBgType("ai")}
                  className={`px-3 py-1 rounded-lg border font-bold ${
                    bgType === "ai" ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  معرض 300 صورة AI
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-3 py-1 rounded-lg border font-bold ${
                    bgType === "upload" ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  📁 رفع صورة من جهازك
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
            </div>

            {bgType === "ai" && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-900 rounded-xl border border-slate-800 custom-scrollbar">
                {storyAiBackgrounds.slice(0, 30).map((bg) => (
                  <img
                    key={bg.id}
                    src={bg.url}
                    alt="AI BG"
                    onClick={() => setSelectedAiBg(bg.url)}
                    className={`w-full h-14 object-cover rounded-lg cursor-pointer border-2 transition ${
                      selectedAiBg === bg.url ? "border-amber-400 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* د: أبعاد ومقاسات الفيديو والمدة المفتوحة */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-amber-400 block mb-1">📐 المقاس والنسبة:</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl font-bold"
              >
                <option value="9:16">شورتس / ريلز عالي (9:16)</option>
                <option value="4:5">شورتس منخفض (4:5)</option>
                <option value="16:9">يوتيوب أفقي HD (16:9)</option>
                <option value="1:1">مربع موحد (1:1)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1">⏱️ مدة المقطع (ثواني - غير محدود):</label>
              <input
                type="number"
                min={10}
                max={7200}
                value={videoDuration}
                onChange={(e) => setVideoDuration(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl font-mono outline-none"
              />
            </div>
          </div>

          {/* هـ: أزرار المعاينة والتصدير */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 font-bold rounded-xl transition text-xs flex items-center justify-center gap-1.5"
            >
              👁️ معاينة الفيديو قبل الإنتاج
            </button>
            <button
              onClick={() => alert(`جاري تصدير فيديو القصة! المقاس: ${aspectRatio} | المدة: ${videoDuration} ثانية`)}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition text-xs shadow-lg flex items-center justify-center gap-1.5"
            >
              🚀 إنتاج وتصدير فيديو القصة
            </button>
          </div>

        </div>

        {/* 3. الشاشة الحية للمعاينة (Live Preview) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-amber-400">📱 المعاينة الحية المباشرة ({aspectRatio})</span>
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col items-center justify-center p-6 text-center transition-all duration-300"
            style={{
              width: aspectRatio === "16:9" ? "100%" : aspectRatio === "1:1" ? "280px" : "240px",
              height: aspectRatio === "16:9" ? "180px" : aspectRatio === "1:1" ? "280px" : "420px",
              backgroundImage: `url(${activeBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-bold text-amber-300 bg-black/50 px-2.5 py-1 rounded-full border border-amber-500/30">
                {selectedStory.title} — الجزء {selectedPartIndex + 1}
              </span>
              <p className="font-serif text-white text-xs leading-loose text-justify line-clamp-6">
                {currentPartText}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 4. مودال المعاينة الشامل قبل الإنتاج النهائي */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 text-center">
            <h3 className="text-lg font-bold text-amber-400">👁️ معاينة الفيديو القصصي قبل التصدير النهائي</h3>
            <div className="flex justify-center">
              <div
                className="relative rounded-2xl overflow-hidden border border-amber-500/40 flex items-center justify-center p-6"
                style={{
                  width: "260px",
                  height: "440px",
                  backgroundImage: `url(${activeBg})`,
                  backgroundSize: "cover"
                }}
              >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 space-y-2">
                  <span className="text-xs text-amber-300 font-bold block">{selectedStory.title}</span>
                  <p className="font-serif text-white text-xs leading-relaxed text-justify">{currentPartText}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setShowPreviewModal(false)} className="px-6 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs">
              إغلاق المعاينة
            </button>
          </div>
        </div>
      )}

    </div>
  );
}