"use client";
import React, { useState } from "react";
import ReaderControlsBar from "./ReaderControlsBar";
import DownloadAndSaveBar from "./DownloadAndSaveBar";

export default function InteractiveReaderView({ book, activeChapterIndex, onSelectChapter }) {
  // حالات تخصيص القراءة والتجربة البصرية
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Amiri");
  const [lineHeight, setLineHeight] = useState(2.2);
  const [theme, setTheme] = useState("dark"); // 'dark' | 'sepia' | 'light'

  if (!book || !book.chapters || book.chapters.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-500">
        لم يتم اختيار كتاب أو مرجع للتصفح
      </div>
    );
  }

  const currentChapter = book.chapters[activeChapterIndex] || book.chapters[0];

  // ألوان المظاهر البصرية المتنوعة لراحة العين
  const themeClasses = {
    dark: "bg-slate-950 text-slate-100 border-slate-800",
    sepia: "bg-[#fbf0d9] text-[#2c221e] border-[#e2d5ba]",
    light: "bg-white text-slate-900 border-slate-200",
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden transition-colors duration-300 ${themeClasses[theme]}`}>
      {/* 1. شريط إعدادات القراءة والتخصيص البصري اللحظي */}
      <div className="p-3 border-b border-amber-500/20 bg-black/10">
        <ReaderControlsBar
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          theme={theme}
          setTheme={setTheme}
        />
      </div>

      {/* 2. مساحة قراءة النص والمعاينة الحية المريحة */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* رأس الفصل والباب */}
          <div className="text-center border-b border-amber-500/20 pb-6">
            <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
              {book.category} — {book.title}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-amber-500 mt-3 font-serif">
              {currentChapter.title}
            </h1>
            <p className="text-xs opacity-70 mt-2">تأليف: {book.author}</p>
          </div>

          {/* النص المنسق الكامل مع التخصيص الحركي والتفاعلي */}
          <article
            className="text-justify whitespace-pre-line tracking-normal select-text transition-all duration-200"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: `${fontFamily}, serif`,
              lineHeight: lineHeight,
            }}
          >
            {currentChapter.content}
          </article>

          {/* أزرار التنقل السريع بين الأبواب في أسفل المقال */}
          <div className="flex items-center justify-between pt-8 border-t border-amber-500/20 text-xs font-bold">
            <button
              disabled={activeChapterIndex === 0}
              onClick={() => onSelectChapter(activeChapterIndex - 1)}
              className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 rounded-xl transition border border-amber-500/30 disabled:opacity-30 disabled:pointer-events-none"
            >
              ← الباب السابق
            </button>

            <span className="opacity-75">
              الباب {activeChapterIndex + 1} من {book.chapters.length}
            </span>

            <button
              disabled={activeChapterIndex === book.chapters.length - 1}
              onClick={() => onSelectChapter(activeChapterIndex + 1)}
              className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 rounded-xl transition border border-amber-500/30 disabled:opacity-30 disabled:pointer-events-none"
            >
              الباب التالي →
            </button>
          </div>
        </div>
      </div>

      {/* 3. شريط أدوات التنزيل أوفلاين وحفظ العلامة في أسفل الشاشة */}
      <DownloadAndSaveBar book={book} currentChapter={currentChapter} />
    </div>
  );
}