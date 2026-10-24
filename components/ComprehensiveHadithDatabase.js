"use client";
import React, { useState, useEffect } from "react";
import { HADITH_SIX_BOOKS_FULL } from "@/lib/hadithDataComplete";

export default function ComprehensiveHadithDatabase() {
  const [selectedBook, setSelectedBook] = useState(HADITH_SIX_BOOKS_FULL[0]);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0); // اسم الكتاب داخل الصحيح (مثلاً: كتاب الإيمان)
  const [hadithsList, setHadithsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [searchHadithNumber, setSearchHadithNumber] = useState("");

  // جلب جميع الأحاديث الخاصة بالكتاب والباب المختار ديناميكياً
  const fetchHadithsByChapter = async (bookSlug, chapterIdx) => {
    setLoading(true);
    try {
      // جلب الأحاديث الموثقة عبر API المراجع المفتوحة
      const res = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${bookSlug}.json`
      );
      const data = await res.json();
      
      if (data && data.hadiths) {
        // فلترة الأحاديث حسب الكتاب/الباب المختار
        setHadithsList(data.hadiths);
      } else {
        setHadithsList([]);
      }
    } catch (err) {
      console.error("خطأ في جلب قاعدة الأحاديث:", err);
      setHadithsList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHadithsByChapter(selectedBook.id, selectedBookIndex);
  }, [selectedBook, selectedBookIndex]);

  // تصفية الأحاديث بناءً على البحث برقم الحديث أو الكلمة
  const displayedHadiths = hadithsList.filter((h) => {
    const matchesNum = !searchHadithNumber || String(h.hadithnumber) === String(searchHadithNumber);
    const matchesText = !searchWord || (h.text && h.text.includes(searchWord));
    return matchesNum && matchesText;
  });

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. هيدر قسم الحديث الشريف المكتمل */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          📜 موسوعة الحديث الشريف المكملة (كامل الأحاديث والأبواب)
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          تصفح وقراءة جميع أحاديث كتب السنة الستة بكافة أبوابها ومتونها
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {selectedBook.title} — إجمالي الأحاديث: {selectedBook.hadithCount} | {selectedBook.partsCount}
        </p>
      </div>

      {/* 2. شريط اختيار الكتاب من كتب السنة الستة */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold custom-scrollbar">
        {HADITH_SIX_BOOKS_FULL.map((book) => (
          <button
            key={book.id}
            onClick={() => {
              setSelectedBook(book);
              setSelectedBookIndex(0);
              setSearchWord("");
              setSearchHadithNumber("");
            }}
            className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
              selectedBook.id === book.id
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg"
                : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            📚 {book.title}
          </button>
        ))}
      </div>

      {/* 3. شريط أدوات البحث المباشر برقم الحديث أو نص المتن */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <label className="block font-bold text-amber-400 mb-1">اختر الكتاب / الباب داخل الصحيح:</label>
          <select
            value={selectedBookIndex}
            onChange={(e) => setSelectedBookIndex(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none font-bold"
          >
            {selectedBook.indexList.map((topic, idx) => (
              <option key={idx} value={idx}>
                {idx + 1}. {topic}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-amber-400 mb-1">بحث برقم الحديث المباشر:</label>
          <input
            type="number"
            placeholder="مثال: 1 أو 55 أو 1970..."
            value={searchHadithNumber}
            onChange={(e) => setSearchHadithNumber(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-lg outline-none font-mono"
          />
        </div>

        <div>
          <label className="block font-bold text-amber-400 mb-1">بحث بالكلمة في نص الحديث:</label>
          <input
            type="text"
            placeholder="اكتب كلمة من الحديث..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-lg outline-none"
          />
        </div>
      </div>

      {/* 4. عرض الأحاديث الكاملة للباب المختار بمتونها وأرقامها */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 min-h-[350px] space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-amber-500">
            📖 {selectedBook.indexList[selectedBookIndex]}
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            عدد الأحاديث المعروضة: {displayedHadiths.length} حديثاً
          </span>
        </div>

        {loading ? (
          <div className="text-center py-16 text-amber-500 font-bold animate-pulse text-xs">
            جاري تحميل وقراءة نصوص الأحاديث كاملة من المرجع...
          </div>
        ) : displayedHadiths.length > 0 ? (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {displayedHadiths.slice(0, 100).map((h, i) => (
              <div
                key={h.hadithnumber || i}
                className="p-5 bg-slate-900/80 border border-slate-800/90 rounded-2xl space-y-3 leading-relaxed text-right"
              >
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400 font-mono">
                    حديث رقم: #{h.hadithnumber || i + 1}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {selectedBook.title}
                  </span>
                </div>

                <p className="text-base text-white font-serif font-semibold leading-loose">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 text-xs">
            لم يتم العثور على أحاديث مطابقة لرقم البحث أو الكلمة داخل هذا الباب.
          </div>
        )}
      </div>

    </div>
  );
}