"use client";
import React, { useState } from "react";
import ReelsPreviewCanvas from "./ReelsPreviewCanvas";

export default function StoryToReelsConverter({ bookTitle, chapterTitle, rawText, onClose }) {
  // 1. تقسيم النص التلقائي إلى مقاطع سينمائية قصيرة تناسب مدة الريلز (Short Scenes)
  const autoSplitScenes = (text) => {
    if (!text) return [];
    // تقسيم النص بناءً على الفواصل والنقاط لإنشاء مشاهد سريعة الجريان
    const sentences = text.split(/(?<=[.،؛\n])/).filter((s) => s.trim().length > 10);
    return sentences.map((sentence, idx) => ({
      id: idx + 1,
      text: sentence.trim(),
    }));
  };

  const scenes = autoSplitScenes(rawText);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // إعدادات المظهر والتصميم السينمائي للريلز
  const [bgType, setBgType] = useState("color");
  const [bgValue, setBgValue] = useState("#090d16");
  const [textColor, setTextColor] = useState("#ffffff");
  const [accentColor, setAccentColor] = useState("#d4af37"); // ذهبي إسلامي
  const [fontFamily, setFontFamily] = useState("Amiri");
  const [fontSize, setFontSize] = useState(38);
  const [showOrnament, setShowOrnament] = useState(true);

  const currentScene = scenes[activeSceneIndex] || { text: rawText };

  // قائمة الخلفيات السينمائية المجهزة للمقتبسات والسير
  const presetBackgrounds = [
    { label: "كحلي سينمائي", value: "#0f172a", type: "color" },
    { label: "أسود فاخر", value: "#050505", type: "color" },
    { label: "زيتي داكن", value: "#062319", type: "color" },
    { label: "عنابي ملكي", value: "#2a0813", type: "color" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-6xl h-[90vh] bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden text-slate-100">
        
        {/* شريط التحكم في التخصيص والمشاهد (الجانب الأيمن) */}
        <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-l border-slate-800 flex flex-col overflow-y-auto custom-scrollbar">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                🎬 محول المراجع إلى ريلز سينمائي
              </span>
              <h2 className="text-lg font-bold text-white mt-2">{chapterTitle}</h2>
              <p className="text-xs text-slate-400">المصدر: {bookTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-3 py-1 rounded-lg border border-slate-800 text-xs font-bold"
            >
              إغلاق ✕
            </button>
          </div>

          {/* اختيار المشهد المقتطع */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-amber-500 mb-2">
              اختر المشهد / الفقرة لإنشاء المقطع ({scenes.length} مشهداً):
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
              {scenes.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`w-full text-right p-2.5 rounded-xl text-xs transition line-clamp-2 border ${
                    activeSceneIndex === idx
                      ? "bg-amber-500 text-slate-950 font-bold border-amber-400"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/30"
                  }`}
                >
                  مشهد {idx + 1}: {scene.text}
                </button>
              ))}
            </div>
          </div>

          {/* أدوات تنسيق الفيديو والتأثيرات البصرية */}
          <div className="space-y-4 border-t border-slate-800 pt-4 text-xs">
            
            {/* اختيار الخلفية السينمائية */}
            <div>
              <label className="block font-bold text-amber-500 mb-2">النمط البصري والخلفية:</label>
              <div className="grid grid-cols-2 gap-2">
                {presetBackgrounds.map((bg, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setBgType(bg.type);
                      setBgValue(bg.value);
                    }}
                    className={`p-2.5 rounded-lg border text-right transition flex items-center gap-2 ${
                      bgValue === bg.value
                        ? "border-amber-500 bg-amber-500/20 text-amber-400 font-bold"
                        : "border-slate-800 bg-slate-900 text-slate-300"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: bg.value }} />
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* تخصيص الخط والألوان */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">نوع الخط العربي:</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-amber-500"
                >
                  <option value="Amiri">📜 خط أميري</option>
                  <option value="Cairo">📱 خط القاهرة</option>
                  <option value="Traditional Arabic">🖋️ خط النسخ</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">حجم النص بالريلز:</label>
                <input
                  type="range"
                  min="28"
                  max="52"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-amber-500 mt-2"
                />
              </div>
            </div>

            {/* إظهار الإطار الإسلامي */}
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-slate-200">إظهار الإطار الإسلاِمي الذهبي:</span>
              <input
                type="checkbox"
                checked={showOrnament}
                onChange={(e) => setShowOrnament(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* شاشة المعاينة الحية للفيديو السينمائي العمودي (الجانب الأيسر) */}
        <div className="w-full md:w-1/2 p-6 bg-slate-900/50 flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold text-amber-500 mb-3">شاشة المعاينة الحية لربط المراجع بالريلز (9:16)</h3>
          
          <ReelsPreviewCanvas
            text={currentScene.text}
            subTitle={chapterTitle}
            reciterName={bookTitle}
            bgType={bgType}
            bgValue={bgValue}
            textColor={textColor}
            accentColor={accentColor}
            fontSize={fontSize}
            fontFamily={fontFamily}
            showOrnament={showOrnament}
            overlayOpacity={0.4}
          />
        </div>

      </div>
    </div>
  );
}