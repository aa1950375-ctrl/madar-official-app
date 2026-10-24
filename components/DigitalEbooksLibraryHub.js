"use client";
import React, { useState } from "react";

export default function DigitalEbooksLibraryHub() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const ebooks = [
    { id: "1", title: "تفسير السعدي (تيسير الكريم الرحمن)", author: "الشيخ عبد الرحمن السعدي", category: "التفسير", pages: "1140 ص", pdfUrl: "#" },
    { id: "2", title: "صحيح البخاري - الطبعة المعتمدة", author: "الإمام محمد بن إسماعيل البخاري", category: "الحديث", pages: "1650 ص", pdfUrl: "#" },
    { id: "3", title: "صحيح مسلم - المجلد الكامل", author: "الإمام مسلم بن الحجاج", category: "الحديث", pages: "1480 ص", pdfUrl: "#" },
    { id: "4", title: "الرحيق المختوم", author: "الشيخ صفي الرحمن المباركفوري", category: "السيرة", pages: "520 ص", pdfUrl: "#" },
    { id: "5", title: "رياض الصالحين", author: "الإمام يحيى بن شرف النووي", category: "الحديث", pages: "680 ص", pdfUrl: "#" },
    { id: "6", title: "زاد المعاد في هدي خير العباد", author: "ابن قيم الجوزية", category: "السيرة", pages: "1200 ص", pdfUrl: "#" },
    { id: "7", title: "الفقه الميسر في ضوء الكتاب والسنة", author: "نخبة من العلماء", category: "الفقه", pages: "450 ص", pdfUrl: "#" },
    { id: "8", title: "العقيدة الواسطية", author: "شيخ الإسلام ابن تيمية", category: "العقيدة", pages: "180 ص", pdfUrl: "#" }
  ];

  const categories = ["الكل", "التفسير", "الحديث", "السيرة", "الفقه", "العقيدة"];

  const filteredEbooks = selectedCategory === "الكل" 
    ? ebooks 
    : ebooks.filter(b => b.category === selectedCategory);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      <div className="border-b border-amber-500/20 pb-4 space-y-2">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full">
          📚 المكتبة الرقمية الكبرى
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mt-2">
          مكتبة الكتب والمراجع الإسلامية
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          تحميل وقراءة أهم أمهات الكتب الإسلامية والتفاسير وشروح الحديث والسيرة النبويّة الشريفة.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-bold transition shrink-0 ${
              selectedCategory === cat
                ? "bg-amber-500 text-slate-950"
                : "bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredEbooks.map((book) => (
          <div key={book.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-amber-500/40 transition">
            <div className="space-y-1">
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-bold">{book.category}</span>
              <h3 className="text-sm font-bold text-white font-serif line-clamp-2 mt-1">{book.title}</h3>
              <p className="text-xs text-slate-400">{book.author}</p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
              <span className="text-slate-500 font-mono text-[11px]">{book.pages}</span>
              <button onClick={() => alert(`جاري تحميل كتاب: ${book.title}`)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition">
                📥 تحميل PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}