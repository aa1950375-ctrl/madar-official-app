"use client";
import React, { useState, useRef } from "react";
import { STORIES_ENCYCLOPEDIA } from "@/lib/storiesEncyclopediaData";

export default function AdvancedReelsMaker() {
  // 1. تحديد مقاس وأبعاد الفيديو (عمودي شورتس عالي/منخفض، أفقي، مربع)
  const [aspectRatio, setAspectRatio] = useState("9:16"); // '9:16' | '4:5' | '16:9' | '1:1'

  // 2. خلفية الفيديو (من الجهاز أو من معارض الذكاء الاصطناعي الـ 300)
  const [bgType, setBgType] = useState("ai");
  const [customBgUrl, setCustomBgUrl] = useState(null);
  const [selectedAiBg, setSelectedAiBg] = useState(
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1080&q=80"
  );
  const fileInputRef = useRef(null);

  // 3. اختيار القصة من موسوعة الـ PDF بالكامل
  const [selectedStory, setSelectedStory] = useState(STORIES_ENCYCLOPEDIA[0]);
  
  // خيار وضع النص: 'full' للقصة كاملة، أو رقم فهرس الجزء للمُجزئ (0, 1, 2...)
  const [selectedPartMode, setSelectedPartMode] = useState("full");

  // 4. مدة الفيديو (مفتوحة وغير محدودة بثوانٍ معينة)
  const [videoDuration, setVideoDuration] = useState(120);

  // 5. المعاينة الحية المباشرة قبل الإنتاج
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // إنشاء معرض الـ 300 صورة المخصصة بالذكاء الاصطناعي
  const storyAiBackgrounds = Array.from({ length: 300 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/story_pdf_bg_${i + 1}/1080/1920`,
  }));

  // رفع صورة شخصية من الجهاز
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomBgUrl(URL.createObjectURL(file));
      setBgType("upload");
    }
  };

  const activeBg = bgType === "upload" && customBgUrl ? customBgUrl : selectedAiBg;

  // تحديد النص المعروض: القصة كاملة أم الجزء المحدد
  const displayedText =
    selectedPartMode === "full"
      ? selectedStory.fullContent
      : selectedStory.parts[selectedPartMode] || selectedStory.fullContent;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر المطور */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          📽️ صانع الريلز القصصي والسير السينمائي (مربوط بالموسوعة المعتمدة كاملاً)
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          تحويل موسوعة الأنبياء، السيرة النبوية، الصحابة، وأمهات المؤمنين إلى فيديو
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          اختر أي قصة كاملة أو جزءاً منها، مع مدة مفتوحة، وخيارات الأبعاد الأربعة، ومعاينة حية مباشرة قبل الإنتاج.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 2. لوحة التحكم والإعدادات */}
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
          
          {/* أ: اختيار القصة أو الشخصية من الموسوعة بالكامل */}
          <div className="space-y-1.5">
            <label className="font-bold text-amber-400 block">📖 اختر القصة من موسوعة الـ PDF المعتمدة:</label>
            <select
              value={selectedStory.id}
              onChange={(e) => {
                const found = STORIES_ENCYCLOPEDIA.find((s) => s.id === e.target.value);
                if (found) {
                  setSelectedStory(found);
                  setSelectedPartMode("full"); // العودة للقصة كاملة تلقائياً عند تغيير القصة
                }
              }}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-3 font-bold outline-none focus:border-amber-500"
            >
              {STORIES_ENCYCLOPEDIA.map((s) => (
                <option key={s.id} value={s.id}>
                  [{s.category}] {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* ب: زر اختيار القصة كاملة أو التجزئة إلى أجزاء */}
          <div className="space-y-1.5">
            <label className="font-bold text-amber-400 block">✂️ اختر النص المراد تحويله للفيديو (كامل القصة أو جزء محدد):</label>
            <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
              
              {/* زر القصة كاملة */}
              <button
                onClick={() => setSelectedPartMode("full")}
                className={`px-4 py-2.5 rounded-xl shrink-0 border transition font-bold text-[11px] ${
                  selectedPartMode === "full"
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                }`}
              >
                📜 القصة كاملة
              </button>

              {/* أزرار الأجزاء المجزأة */}
              {selectedStory.parts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPartMode(idx)}
                  className={`px-4 py-2.5 rounded-xl shrink-0 border transition font-bold text-[11px] ${
                    selectedPartMode === idx
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  الجزء {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* جـ: تحديد الأبعاد والمقاسات الـ 4 المتاحة */}
          <div className="space-y-1.5">
            <label className="font-bold text-amber-400 block">📐 تحديد أبعاد الشاشة والمقاس المطلوب:</label>
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

          {/* د: مدة الفيديو (مفتوحة بغير حدود) */}
          <div className="space-y-1.5">
            <label className="font-bold text-amber-400 block">⏱️ مدة الفيديو (ثواني - غير محدود بمدة معينة):</label>
            <input
              type="number"
              min={10}
              max={10800} // متاح حتى 3 ساعات
              value={videoDuration}
              onChange={(e) => setVideoDuration(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 text-white p-3 rounded-xl font-mono text-sm outline-none focus:border-amber-500"
            />
          </div>

          {/* هـ: اختيار خلفية الفيديو (رفع من الجهاز أو معرض 300 صورة AI) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="font-bold text-amber-400">🖼️ مصدر خلفية الفيديو:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setBgType("ai")}
                  className={`px-3 py-1 rounded-lg border font-bold text-[11px] ${
                    bgType === "ai"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  300 خلفية AI
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-3 py-1 rounded-lg border font-bold text-[11px] ${
                    bgType === "upload"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  📁 اختيار صورة من جهازك
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {bgType === "ai" && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-32 overflow-y-auto p-2 bg-slate-900 rounded-xl border border-slate-800 custom-scrollbar">
                {storyAiBackgrounds.slice(0, 36).map((bg) => (
                  <img
                    key={bg.id}
                    src={bg.url}
                    alt="AI Story BG"
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
              onClick={() =>
                alert(
                  `جاري إنتاج وتصدير فيديو القصة!\nالمقاس: ${aspectRatio}\nالمدة: ${videoDuration} ثانية\nالنمط: ${
                    selectedPartMode === "full" ? "القصة كاملة" : `الجزء ${selectedPartMode + 1}`
                  }`
                )
              }
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
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 space-y-3 p-2">
              <span className="text-[10px] font-bold text-amber-300 bg-black/50 px-2.5 py-1 rounded-full border border-amber-500/30">
                {selectedStory.title} — {selectedPartMode === "full" ? "القصة كاملة" : `الجزء ${selectedPartMode + 1}`}
              </span>
              <p className="font-serif text-white text-xs leading-loose text-justify line-clamp-6">
                {displayedText}
              </p>
              <span className="text-[10px] text-slate-300 block font-sans opacity-80">
                ⏱️ المدة المحددة: {videoDuration} ثانية
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. مودال المعاينة الحية المباشرة قبل التصدير */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <h3 className="text-base font-bold text-amber-400">👁️ المعاينة الحية المباشرة للفيديو القصصي</h3>
            <div className="flex justify-center">
              <div
                className="relative rounded-2xl overflow-hidden border border-amber-500/40 flex items-center justify-center p-5"
                style={{
                  width: "240px",
                  height: "400px",
                  backgroundImage: `url(${activeBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 space-y-2">
                  <span className="text-xs text-amber-300 font-bold block">{selectedStory.title}</span>
                  <p className="font-serif text-white text-xs leading-relaxed text-justify max-h-72 overflow-y-auto custom-scrollbar p-1">
                    {displayedText}
                  </p>
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