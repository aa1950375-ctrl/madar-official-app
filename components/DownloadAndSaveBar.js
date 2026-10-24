"use client";
import React, { useState } from "react";

export default function DownloadAndSaveBar({ book, currentChapter, onConvertToReel }) {
  const [isSaved, setIsSaved] = useState(false);

  // 1. تنزيل الباب الحالي كملف نصي
  const handleDownloadChapter = () => {
    if (!book || !currentChapter) return;
    const content = `========================================\n${book.title} - ${book.author}\nالباب: ${currentChapter.title}\nالمصدر: منصة مدار | MADAR\n========================================\n\n${currentChapter.content}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${book.title}_${currentChapter.title}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 2. تنزيل الكتاب الكامل
  const handleDownloadFullBook = () => {
    if (!book) return;
    let fullText = `========================================\n${book.title}\nالمؤلف: ${book.author}\nالتصنيف: ${book.category}\nالمصدر: منصة مدار | MADAR\n========================================\n\n`;
    book.chapters.forEach((ch, idx) => {
      fullText += `\n\n--- [ الباب ${idx + 1}: ${ch.title} ] ---\n\n${ch.content}\n`;
    });
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${book.title}_الكتاب_الكامل.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 3. حفظ موضع القراءة
  const handleSaveBookmark = () => {
    if (!book || !currentChapter) return;
    const bookmarkData = {
      bookId: book.id,
      bookTitle: book.title,
      chapterTitle: currentChapter.title,
      savedAt: new Date().toLocaleDateString("ar-EG"),
    };
    localStorage.setItem("madar_last_read", JSON.stringify(bookmarkData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 gap-3">
      {/* أدوات التحويل والتنزيل */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* زر التحويل التلقائي للريلز السينمائي */}
        {onConvertToReel && (
          <button
            onClick={() => onConvertToReel(book, currentChapter)}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition shadow-md flex items-center gap-1.5"
          >
            🎬 تحويل الباب إلى ريلز سينمائي
          </button>
        )}

        <button
          onClick={handleDownloadChapter}
          className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/40 text-amber-400 font-bold rounded-lg transition flex items-center gap-1.5"
        >
          📥 تنزيل الباب (.txt)
        </button>

        <button
          onClick={handleDownloadFullBook}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition border border-slate-700 flex items-center gap-1.5"
        >
          📚 تنزيل الكتاب الكامل
        </button>
      </div>

      {/* حفظ العلامة */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSaveBookmark}
          className={`px-3 py-1.5 rounded-lg border transition font-bold flex items-center gap-1.5 ${
            isSaved
              ? "bg-emerald-600 text-white border-emerald-500"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
          }`}
        >
          {isSaved ? "✓ تم حفظ موضع القراءة" : "🔖 حفظ علامة القراءة"}
        </button>
      </div>
    </div>
  );
}