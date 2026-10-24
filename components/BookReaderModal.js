"use client";
import React, { useState } from "react";

export default function BookReaderModal({ book, isOpen, onClose }) {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState(22); // حجم الخط الأولي
  const [fontFamily, setFontFamily] = useState("Amiri"); // الخط العربي القياسي
  const [theme, setTheme] = useState("dark"); // الوضع المظلم القابل للتغيير

  if (!isOpen || !book) return null;

  const currentChapter = book.chapters[selectedChapterIndex] || book.chapters[0];

  // أنماط المظاهر (Themes) لراحة العين أثناء القراءة
  const themeStyles = {
    dark: "bg-slate-950 text-slate-100 border-slate-800",
    sepia: "bg-[#fbf0d9] text-[#2c221e] border-[#e2d5ba]",
    light: "bg-white text-slate-900 border-slate-200",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className={`w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl border shadow-2xl transition-all overflow-hidden ${themeStyles[theme]}`}>
        
        {/* 1. الشريط العلوي: عنوان الكتاب ولائحة أدوات التحكم */}
        <div className="flex flex-wrap items-center justify-between p-4 border-b border-amber-500/20 bg-black/20 gap-3">
          <div>
            <h2 className="text-xl font-bold text-amber-500">{book.title}</h2>
            <p className="text-xs opacity-75">{book.author} — <span className="text-amber-400">{book.category}</span></p>
          </div>

          {/* أدوات التحكم بالقراءة (حجم الخط، نوع الخط، والمظهر) */}
          <div className="flex items-center gap-2 flex-wrap text-sm">
            {/* التحكم بحجم الخط */}
            <div className="flex items-center border border-slate-700/50 rounded-lg p-1 bg-black/20">
              <button
                onClick={() => setFontSize((f) => Math.max(16, f - 2))}
                className="px-2.5 py-1 hover:bg-amber-500/20 rounded font-bold"
                title="تصغير الخط"
              >
                A-
              </button>
              <span className="px-2 font-mono text-xs opacity-80">{fontSize}px</span>
              <button
                onClick={() => setFontSize((f) => Math.min(38, f + 2))}
                className="px-2.5 py-1 hover:bg-amber-500/20 rounded font-bold"
                title="تكبير الخط"
              >
                A+
              </button>
            </div>

            {/* اختيار الخط العربي */}
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="bg-black/30 border border-slate-700/50 rounded-lg px-2 py-1 text-xs outline-none focus:border-amber-500"
            >
              <option value="Amiri">خط أميري</option>
              <option value="Cairo">خط القاهرة</option>
              <option value="serif">خط النسخ القياسي</option>
            </select>

            {/* اختيار مظهر القراءة */}
            <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-slate-700/50">
              <button
                onClick={() => setTheme("dark")}
                className={`w-6 h-6 rounded-full bg-slate-900 border ${theme === "dark" ? "border-amber-500" : "border-transparent"}`}
                title="الوضع الداكن"
              />
              <button
                onClick={() => setTheme("sepia")}
                className={`w-6 h-6 rounded-full bg-[#fbf0d9] border ${theme === "sepia" ? "border-amber-500" : "border-transparent"}`}
                title="وضع القراءة الدافئ (Sepia)"
              />
              <button
                onClick={() => setTheme("light")}
                className={`w-6 h-6 rounded-full bg-white border ${theme === "light" ? "border-amber-500" : "border-transparent"}`}
                title="الوضع الفاتح"
              />
            </div>

            {/* زر الإغلاق */}
            <button
              onClick={onClose}
              className="px-3 py-1 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg transition font-bold"
            >
              إغلاق ✕
            </button>
          </div>
        </div>

        {/* 2. جسم القارئ: الفهرس الجانبي والنص الممتد */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* فهرس أبواب وفصول الكتاب الجانبي */}
          <div className="w-full md:w-72 border-b md:border-b-0 md:border-l border-amber-500/20 bg-black/10 overflow-y-auto p-3">
            <h3 className="text-sm font-bold text-amber-500 mb-3 px-2">فهرس الأبواب والفصول ({book.chapters.length})</h3>
            <div className="space-y-1">
              {book.chapters.map((ch, idx) => (
                <button
                  key={ch.id || idx}
                  onClick={() => setSelectedChapterIndex(idx)}
                  className={`w-full text-right px-3 py-2.5 rounded-xl text-sm transition line-clamp-2 ${
                    selectedChapterIndex === idx
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                      : "hover:bg-amber-500/10 opacity-80"
                  }`}
                >
                  {idx + 1}. {ch.title}
                </button>
              ))}
            </div>
          </div>

          {/* مساحة القراءة الكاملة للباب المحدد */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="max-w-3xl mx-auto">
              {/* عنوان الباب */}
              <h1 className="text-2xl md:text-3xl font-bold text-amber-500 mb-6 text-center border-b border-amber-500/20 pb-4">
                {currentChapter.title}
              </h1>

              {/* النص الكامل الموزون والمسترسل بوضوح بدون اختصار */}
              <div
                className="leading-relaxed text-justify whitespace-pre-line"
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: `${fontFamily}, serif`,
                  lineHeight: "2.2",
                }}
              >
                {currentChapter.content}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}