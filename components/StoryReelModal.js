"use client";
import React, { useState } from "react";
import ReelsPreviewCanvas from "./ReelsPreviewCanvas";

export default function StoryReelModal({ isOpen, onClose, bookData, chapterData }) {
  if (!isOpen || !chapterData) return null;

  // إعدادات التنسيق البصري للريلز القصصي
  const [bgType, setBgType] = useState("color");
  const [bgValue, setBgValue] = useState("#0f172a");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("Amiri");
  const [fontSize, setFontSize] = useState(36);
  const [showOrnament, setShowOrnament] = useState(true);

  // خلفيات سينمائية إسلامية جاهزة للاختيار السريع
  const presetBgColors = [
    { name: "كحلي داكن", val: "#0f172a" },
    { name: "زيتي ملكي", val: "#062c19" },
    { name: "عنابي سينمائي", val: "#2a0813" },
    { name: "أسود فاخر", val: "#050505" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-5xl bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-slate-100 my-auto">
        
        {/* شاشة المعاينة الحية مرئياً بنسبة 9:16 */}
        <div className="w-full md:w-1/2 p-6 bg-slate-900/60 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-slate-800">
          <h3 className="text-sm font-bold text-amber-500 mb-4 flex items-center gap-2">
            🎬 معاينة الفيديو السينمائي الحية (9:16)
          </h3>
          <ReelsPreviewCanvas
            text={chapterData.content}
            subTitle={chapterData.title}
            reciterName={bookData?.title || "السيرة والقصص"}
            bgType={bgType}
            bgValue={bgValue}
            textColor={textColor}
            fontFamily={fontFamily}
            fontSize={fontSize}
            showOrnament={showOrnament}
          />
        </div>

        {/* لوحة تحكم الخصائص والخلفيات والخطوط */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h2 className="text-lg font-bold text-amber-500">
                تخصيص الريلز القصصي
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                إغلاق ✕
              </button>
            </div>

            {/* تفاصيل النص المقتبس */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 mb-4 text-xs space-y-1">
              <p className="text-amber-400 font-bold">{bookData?.title}</p>
              <p className="text-white font-semibold">{chapterData.title}</p>
            </div>

            {/* اختيار لون الخلفية السينمائية */}
            <div className="space-y-2 mb-4">
              <label className="text-xs font-bold text-amber-500 block">
                الخلفية السينمائية:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {presetBgColors.map((bg) => (
                  <button
                    key={bg.val}
                    onClick={() => {
                      setBgType("color");
                      setBgValue(bg.val);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      bgValue === bg.val
                        ? "border-amber-500 text-amber-400 bg-amber-500/10"
                        : "border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* اختيار الخط العربي والإطار */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-amber-500 block mb-1">
                  الخط العربي:
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-amber-500"
                >
                  <option value="Amiri">خط أميري</option>
                  <option value="Cairo">خط القاهرة</option>
                  <option value="Traditional Arabic">خط النسخ</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-500 block mb-1">
                  لون النص:
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-8 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer p-1"
                />
              </div>
            </div>

            {/* تفعيل الإطار الزخرفي الإسلامي */}
            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <input
                type="checkbox"
                id="ornamentToggle"
                checked={showOrnament}
                onChange={(e) => setShowOrnament(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
              <label htmlFor="ornamentToggle" className="text-xs font-semibold text-slate-200 cursor-pointer">
                إظهار الإطار والزخرفة الإسلامية الذهبية
              </label>
            </div>
          </div>

          {/* زر التصدير النهائي */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => alert("جاري تجهيز مقطع الفيديو واستخراجه بأعلى دقة HD...")}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow-lg text-sm text-center"
            >
              📥 تصدير وتحميل الفيديو (Export Reel HD)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}