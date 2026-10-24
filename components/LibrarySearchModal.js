"use client";
import React, { useState, useMemo } from "react";
import { MADAR_LIBRARY_BOOKS } from "@/lib/booksData";

export default function LibrarySearchModal({ isOpen, onClose, onSelectChapter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // تصفية نتائج البحث فورياً في جميع الكتب والأبواب
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];

    const query = searchQuery.toLowerCase().trim();
    const results = [];

    MADAR_LIBRARY_BOOKS.forEach((book) => {
      // تصفية بحسب التصنيف إذا تم تحديده
      if (selectedCategory !== "all" && book.category !== selectedCategory) return;

      book.chapters.forEach((chapter, chapterIndex) => {
        const titleMatch = chapter.title.toLowerCase().includes(query);
        const contentMatch = chapter.content.toLowerCase().includes(query);

        if (titleMatch || contentMatch) {
          // استخراج سياق النص المحيط بالكلمة المبحوث عنها (Snippet)
          let snippet = "";
          if (contentMatch) {
            const index = chapter.content.toLowerCase().indexOf(query);
            const start = Math.max(0, index - 60);
            const end = Math.min(chapter.content.length, index + 100);
            snippet = "..." + chapter.content.substring(start, end) + "...";
          } else {
            snippet = chapter.content.substring(0, 140) + "...";
          }

          results.push({
            book,
            chapter,
            chapterIndex,
            snippet,
          });
        }
      });
    });

    return results;
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  // استخراج قائمة كافة التصنيفات المتاحة
  const categories = [
    "all",
    ...new Set(MADAR_LIBRARY_BOOKS.map((b) => b.category)),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-4xl h-[85vh] flex flex-col bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* 1. الشريط العلوي ومربع البحث الفوري */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-500 flex items-center gap-2">
              🔍 محرك البحث الشامل في المكتبة والمراجع
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-3 py-1 rounded-lg border border-slate-800 hover:bg-slate-800 text-sm font-bold"
            >
              إغلاق ✕
            </button>
          </div>

          {/* حقل ادخال كلمة البحث */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="اكتب كلمة أو حديث أو مسألة للبحث في كافة الكتب والمراجع..."
              className="w-full bg-slate-900 border-2 border-amber-500/40 focus:border-amber-500 text-white rounded-xl px-4 py-3 pl-12 text-base outline-none shadow-inner transition"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* تصفية بحسب تصنيفات الكتب */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 text-xs">
            <span className="text-amber-500 font-semibold shrink-0">التصنيف:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg shrink-0 transition ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat === "all" ? "📚 جميع المراجع" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2. شاشة عرض نتائج البحث الفورية */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {!searchQuery.trim() ? (
            <div className="text-center py-16 text-slate-400">
              <span className="text-4xl block mb-3">📖</span>
              <p className="text-base font-semibold">ابدأ الكتابة للبحث الحقيقي في كافة متون وأبواب المكتبة الشاملة.</p>
              <p className="text-xs text-slate-500 mt-1">يمكنك البحث عن: "غار حراء"، "المصطفى"، "إعراب الفاتحة"، "أحكام أهل الذمة"...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="text-4xl block mb-3">🚫</span>
              <p className="text-base font-semibold">لم يتم العثور على نتائج تطابق "{searchQuery}"</p>
              <p className="text-xs text-slate-500 mt-1">تأكد من صحة الكلمات أو جرب كلمة بحث أخرى.</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-amber-400 font-semibold mb-3">
                تم العثور على ({searchResults.length}) نتيجة مطابقة:
              </p>
              
              <div className="space-y-3">
                {searchResults.map((res, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelectChapter(res.book, res.chapterIndex);
                      onClose();
                    }}
                    className="p-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl cursor-pointer transition shadow-md group"
                  >
                    <div className="flex items-center justify-between text-xs text-amber-500 mb-1">
                      <span className="font-bold">{res.book.title} — {res.book.author}</span>
                      <span className="bg-amber-500/10 px-2 py-0.5 rounded text-amber-400 font-mono">
                        {res.book.category}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition mb-1">
                      {res.chapter.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-serif">
                      {res.snippet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}