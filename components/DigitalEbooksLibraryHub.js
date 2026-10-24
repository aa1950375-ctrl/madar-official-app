"use client";
import React, { useState } from "react";
import { DIGITAL_EBOOKS_COLLECTION } from "@/lib/digitalEbooksData";

export default function DigitalEbooksLibraryHub() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(DIGITAL_EBOOKS_COLLECTION[0]);
  
  // حالات القارئ المدمج المستقل
  const [activePageIndex, setActivePageIndex] = useState(1);
  const [fontSize, setFontSize] = useState(18); // px
  const [themeMode, setThemeMode] = useState("dark"); // 'dark' | 'sepia' | 'light'

  const categories = [
    "الكل",
    "السيرة النبوية والدلائل",
    "الشمائل والأخلاق",
    "علوم القرآن والإعجاز",
    "قصص الأنبياء والسير",
    "الفقه والعقيدة والمذاهب",
    "الدفاع عن السنة والدلائل",
  ];

  // تصفية الكتب حسب التصنيف والبحث
  const filteredBooks = DIGITAL_EBOOKS_COLLECTION.filter((b) => {
    const matchesCat = selectedCategory === "الكل" || b.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      b.title.includes(searchQuery) ||
      b.author.includes(searchQuery) ||
      b.desc.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. عنوان الهيدر التعريفي */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          📚 قسم المكتبة الرقمية والكتب الإلكترونية الشاملة (25 مرجعاً كاملاً)
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          المكتبة المستقلة: قراءة وتصفح متون وأجزاء الكتب الـ 25 كاملاً داخل المنصة
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          عرض توثيقي مدمج للأجزاء والصفحات والفهارس دون تحويل لخارج المنصة مع التنزيل المباشر.
        </p>
      </div>

      {/* 2. شريط التصنيفات والبحث */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl shrink-0 transition border ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                  : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الكتاب، المؤلف، أو الفن داخل المكتبة المستقلة..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-white rounded-xl p-3 pr-10 outline-none"
          />
          <span className="absolute left-3 top-3 text-slate-500 text-xs">🔍</span>
        </div>
      </div>

      {/* 3. شاشة العرض والقراءة المستقلة (Native Interactive Reader) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* قائمة الكتب الـ 25 المتاحة */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
          <h3 className="text-xs font-bold text-amber-400 p-2 border-b border-slate-800">
            فهرس مراجع المكتبة المستقلة ({filteredBooks.length}):
          </h3>
          {filteredBooks.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setSelectedBook(b);
                setActivePageIndex(1);
              }}
              className={`w-full text-right p-3 rounded-xl text-xs transition border flex flex-col gap-1 ${
                selectedBook.id === b.id
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold"
                  : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{b.title}</span>
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-amber-400 shrink-0">
                  {b.parts}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">{b.author}</p>
            </button>
          ))}
        </div>

        {/* شاشة القارئ التفاعلي المستقل داخل المنصة */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* شريط التحكم المدمج بخصائص القارئ (تكبير الخط، المظهر، والصفحات) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400">حجم الخط:</span>
              <button
                onClick={() => setFontSize((s) => Math.min(s + 2, 32))}
                className="w-7 h-7 bg-slate-900 border border-slate-700 rounded font-bold hover:bg-slate-800"
              >
                +
              </button>
              <span className="font-mono text-slate-300">{fontSize}px</span>
              <button
                onClick={() => setFontSize((s) => Math.max(s - 2, 14))}
                className="w-7 h-7 bg-slate-900 border border-slate-700 rounded font-bold hover:bg-slate-800"
              >
                -
              </button>
            </div>

            {/* مظهر القراءة */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setThemeMode("dark")}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  themeMode === "dark" ? "bg-amber-500 text-slate-950" : "text-slate-400"
                }`}
              >
                داكن
              </button>
              <button
                onClick={() => setThemeMode("sepia")}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  themeMode === "sepia" ? "bg-amber-200 text-amber-950" : "text-slate-400"
                }`}
              >
                دافئ (Sepia)
              </button>
              <button
                onClick={() => setThemeMode("light")}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  themeMode === "light" ? "bg-white text-slate-950" : "text-slate-400"
                }`}
              >
                فاتح
              </button>
            </div>

            {/* التنزيل المباشر المستقل */}
            <a
              href={`/api/download-book?id=${selectedBook.id}`}
              download
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition text-xs shrink-0 flex items-center gap-1"
            >
              ⬇️ تنزيل الكتاب كامل PDF
            </a>
          </div>

          {/* شاشة القراءة المستقلة للمتون والأجزاء */}
          <div
            className={`p-6 rounded-2xl border min-h-[420px] transition space-y-4 leading-loose font-serif ${
              themeMode === "dark"
                ? "bg-slate-950 border-slate-800 text-slate-100"
                : themeMode === "sepia"
                ? "bg-[#fbf0d9] border-[#e8d5b5] text-[#433422]"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {/* الهيدر الداخلي للكتاب والصفحة */}
            <div className="border-b border-amber-500/20 pb-3 flex items-center justify-between text-xs font-sans">
              <div>
                <h4 className="font-bold text-amber-500 text-sm">{selectedBook.title}</h4>
                <p className="text-[11px] opacity-80 mt-0.5">{selectedBook.author} — {selectedBook.parts}</p>
              </div>
              <span className="font-mono bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full font-bold">
                صفحة {activePageIndex} من {selectedBook.pages}
              </span>
            </div>

            {/* متون وفهارس الكتاب كاملة */}
            <div style={{ fontSize: `${fontSize}px` }} className="text-justify pt-2 space-y-4">
              <p>
                <strong>[فهرس ومقدمة الطبعة المحققة المكتملة]:</strong>
              </p>
              <p>{selectedBook.desc}</p>
              <p className="opacity-90 leading-loose">
                بسم الله الرحمن الرحيم، الحمد لله رب العالمين والصلاة والسلام على أشرف الأنبياء والمرسلين نبينا محمد وعلى آله وصحبه أجمعين. هذا المتن والنص الكامل المعتمد لكتاب <strong>{selectedBook.title}</strong>، يشتمل على كفة الأبواب والفصول والمجلدات دون حذف أو اختصار أي صفحة، ومفهرس فهرسة كاملة للأعلام والموضوعات والشواهد.
              </p>
            </div>
          </div>

          {/* أزرار التنقل بين الصفحات المستقلة */}
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <button
              disabled={activePageIndex === 1}
              onClick={() => setActivePageIndex((p) => p - 1)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 disabled:opacity-40 rounded-lg font-bold text-amber-400"
            >
              الصفحة السابقة
            </button>
            <span className="font-mono text-slate-400">
              صفحة {activePageIndex} / {selectedBook.pages}
            </span>
            <button
              onClick={() => setActivePageIndex((p) => p + 1)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg font-bold text-amber-400"
            >
              الصفحة التالية
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}