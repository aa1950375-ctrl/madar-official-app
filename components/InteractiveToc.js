"use client";
import React, { useState } from "react";

export default function InteractiveToc({ chapters, activeChapterIndex, onSelectChapter }) {
  const [filterQuery, setFilterQuery] = useState("");

  // تصفية أبواب الفهرس حسب البحث السريع داخل الفهرس
  const filteredChapters = chapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-80 bg-slate-900/90 border-l border-amber-500/20 p-4 flex flex-col h-full text-slate-100">
      {/* 1. عنوان الفهرس وعدد الفصول */}
      <div className="mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-amber-500 flex items-center gap-2">
            📚 فهرس المرجع ({chapters.length} باباً)
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">اختر الباب أو الفصل للتصفح المباشر والقراءة الكاملة</p>
      </div>

      {/* 2. حقل البحث السريع داخل الفهرس */}
      <div className="mb-3">
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="تصفية الأبواب..."
          className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-white rounded-lg px-3 py-2 outline-none transition"
        />
      </div>

      {/* 3. قائمة الأبواب والفصول القابلة للتنقل بضغطة زر */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pl-1 custom-scrollbar">
        {filteredChapters.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">لا توجد أبواب تطابق بحثك</p>
        ) : (
          filteredChapters.map((chapter, index) => {
            const originalIndex = chapters.findIndex((c) => c.title === chapter.title);
            const isActive = activeChapterIndex === originalIndex;

            return (
              <button
                key={chapter.id || index}
                onClick={() => onSelectChapter(originalIndex)}
                className={`w-full text-right p-3 rounded-xl text-xs transition duration-200 flex items-start gap-2.5 group border ${
                  isActive
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg"
                    : "bg-slate-950/60 hover:bg-slate-800/80 text-slate-300 border-slate-800/80 hover:border-amber-500/30"
                }`}
              >
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                    isActive
                      ? "bg-slate-950 text-amber-400 font-bold"
                      : "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950"
                  }`}
                >
                  {originalIndex + 1}
                </span>

                <div className="flex-1 line-clamp-2 leading-relaxed">
                  {chapter.title}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}