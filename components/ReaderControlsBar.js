"use client";
import React from "react";

export default function ReaderControlsBar({
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  theme,
  setTheme,
  lineHeight,
  setLineHeight,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between p-3 bg-slate-900/90 border border-slate-800 rounded-xl shadow-lg gap-3 mb-4 backdrop-blur-md">
      {/* 1. التحكم بحجم الخط (تكبير / تصغير) */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-amber-500">حجم الخط:</span>
        <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950 overflow-hidden">
          <button
            onClick={() => setFontSize((prev) => Math.max(16, prev - 2))}
            className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold transition"
            title="تصغير الخط"
          >
            A-
          </button>
          <span className="px-3 text-xs font-mono text-amber-400 font-bold">
            {fontSize}px
          </span>
          <button
            onClick={() => setFontSize((prev) => Math.min(40, prev + 2))}
            className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold transition"
            title="تكبير الخط"
          >
            A+
          </button>
        </div>
      </div>

      {/* 2. اختيار نوع الخط العربي (خط أميري، خط القاهرة، خط النسخ، الخط الكوفي) */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-amber-500">نوع الخط:</span>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-amber-500 transition cursor-pointer"
        >
          <option value="Amiri">📜 خط أميري (موصى به للمراجع)</option>
          <option value="Cairo">📱 خط القاهرة (حديث)</option>
          <option value="Traditional Arabic">🖋️ خط النسخ التقليدي</option>
          <option value="Kufi">🕌 الخط الكوفي</option>
        </select>
      </div>

      {/* 3. التحكم في تباعد الأسطر (Line Height) لراحة العين */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-amber-500">تباعد الأسطر:</span>
        <select
          value={lineHeight}
          onChange={(e) => setLineHeight(Number(e.target.value))}
          className="bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-amber-500 transition cursor-pointer"
        >
          <option value={1.8}>مضغوط (1.8)</option>
          <option value={2.2}>متوسط مريح (2.2)</option>
          <option value={2.6}>متسع جداً (2.6)</option>
        </select>
      </div>

      {/* 4. التبديل بين الأوضاع البصرية (الليلي / الورقي Sepia / النهاري) */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-amber-500">المظهر:</span>
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-1 text-xs rounded-md font-medium transition ${
              theme === "dark"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🌙 ليلي
          </button>

          <button
            onClick={() => setTheme("sepia")}
            className={`px-3 py-1 text-xs rounded-md font-medium transition ${
              theme === "sepia"
                ? "bg-[#e2d5ba] text-[#2c221e] font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📜 دافئ (Sepia)
          </button>

          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-1 text-xs rounded-md font-medium transition ${
              theme === "light"
                ? "bg-white text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ☀️ نهاري
          </button>
        </div>
      </div>
    </div>
  );
}