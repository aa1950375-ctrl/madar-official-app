"use client";
import React, { useState, useEffect } from "react";

export default function PdfDownloadAndBookmarkBar({ book, currentChapter, activeChapterIndex }) {
  const [isSaved, setIsSaved] = useState(false);
  const [savedBookmark, setSavedBookmark] = useState(null);

  // التحقق عند التحميل من وجود موضع حفظ سابق لهذا الكتاب
  useEffect(() => {
    if (!book) return;
    const stored = localStorage.getItem(`madar_bookmark_${book.id}`);
    if (stored) {
      setSavedBookmark(JSON.parse(stored));
    }
  }, [book]);

  // 1. توليد وتحميل الباب الحالي بصيغة PDF منسقة ومطبوعة تلقائياً
  const handleDownloadChapterPdf = () => {
    if (!book || !currentChapter) return;

    // إنشاء نافذة طباعة مخصصة تحول النص إلى تصميم PDF أنيق بأسلوب "مدار"
    const printWindow = window.open("", "_blank");
    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <title>${book.title} - ${currentChapter.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
          body {
            font-family: 'Amiri', serif;
            padding: 40px;
            color: #1e293b;
            line-height: 2.2;
            background-color: #fff;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #d4af37;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .title { font-size: 26px; color: #9a7b1c; font-weight: bold; margin-bottom: 5px; }
          .subtitle { font-size: 16px; color: #64748b; }
          .chapter-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; color: #0f172a; text-align: center; }
          .content { font-size: 18px; text-align: justify; white-space: pre-line; }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${book.title}</div>
          <div class="subtitle">تأليف: ${book.author} — المرجع من منصة مَدار | MADAR</div>
        </div>
        <div class="chapter-title">${currentChapter.title}</div>
        <div class="content">${currentChapter.content}</div>
        <div class="footer">تم طباعة وتحميل هذا المستند عبر تطبيق وموقع مدار الإسلامي التفاعلي</div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // 2. حفظ الموضع التفاعلي للرجوع إليه لاحقاً (Bookmark in LocalStorage)
  const handleSaveBookmark = () => {
    if (!book || !currentChapter) return;

    const bookmarkData = {
      bookId: book.id,
      bookTitle: book.title,
      chapterIndex: activeChapterIndex,
      chapterTitle: currentChapter.title,
      savedAt: new Date().toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    localStorage.setItem(`madar_bookmark_${book.id}`, JSON.stringify(bookmarkData));
    setSavedBookmark(bookmarkData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-3.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-200 gap-3">
      {/* خيارات تحميل ملفات PDF */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={handleDownloadChapterPdf}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow flex items-center gap-2"
        >
          📄 تحميل الباب بصيغة PDF
        </button>
      </div>

      {/* زر حفظ واسترجاع الموضع التفاعلي */}
      <div className="flex items-center gap-3">
        {savedBookmark && (
          <span className="text-[11px] text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 hidden sm:inline-block">
            🔖 الموضع المحفوظ: {savedBookmark.chapterTitle} ({savedBookmark.savedAt})
          </span>
        )}

        <button
          onClick={handleSaveBookmark}
          className={`px-4 py-2 rounded-xl border transition font-bold flex items-center gap-2 ${
            isSaved
              ? "bg-emerald-600 text-white border-emerald-500 shadow-lg"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
          }`}
        >
          {isSaved ? "✓ تم حفظ موضع القراءة" : "🔖 حفظ الموضع الحالي"}
        </button>
      </div>
    </div>
  );
}