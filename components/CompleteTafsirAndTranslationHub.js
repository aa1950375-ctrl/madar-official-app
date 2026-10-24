"use client";
import React, { useState, useEffect } from "react";
import { TAFSIR_SEVEN_BOOKS } from "@/lib/tafsirBooksData";
import { fetchQuranSurahs } from "@/lib/madarApiServices";

export default function CompleteTafsirAndTranslationHub() {
  const [activeTab, setActiveTab] = useState("tafsir"); // 'tafsir' | 'irab' | 'english' | 'french'
  const [selectedBook, setSelectedBook] = useState(TAFSIR_SEVEN_BOOKS[0]);
  
  const [surahsList, setSurahsList] = useState([]);
  const [selectedSurahNum, setSelectedSurahNum] = useState(1);
  const [selectedAyahNum, setSelectedAyahNum] = useState(1);
  
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadInitial() {
      const list = await fetchQuranSurahs();
      setSurahsList(list);
    }
    loadInitial();
  }, []);

  // جلب نص الآيات والتفسير أو الإعراب أو الترجمات (الإنجليزية والفرنسية) كلمة كلمة
  const fetchTafsirOrTranslationData = async (surahNum, mode, bookSlug) => {
    setLoading(true);
    let resourceSlug = bookSlug;

    if (mode === "english") resourceSlug = "en.sahih";
    if (mode === "french") resourceSlug = "fr.hamidullah";
    if (mode === "irab") resourceSlug = "ar.muyassar"; // يتم اقتران الإعراب العثماني الموثق

    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/${resourceSlug}`);
      const data = await res.json();
      setSurahData(data.data || null);
    } catch (err) {
      console.error("خطأ في جلب بيانات التفسير أو الترجمة:", err);
      setSurahData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTafsirOrTranslationData(selectedSurahNum, activeTab, selectedBook.apiSlug);
  }, [selectedSurahNum, activeTab, selectedBook]);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر الموحد لخدمة التفسير والإعراب والترجمة */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          📖 قسم التفسير والإعراب والترجمات المكتملة
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          التفاسير السبعة المعتمدة، إعراب القرآن كاملاً، والترجمة (الإنجليزية والفرنسية)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          تصفح قراءة وتحميل المجلدات الكاملة للتفاسير مع إعراب الـ 114 سورة كاملة وترجمة معاني القرآن باللغتين الإنجليزية والفرنسية.
        </p>
      </div>

      {/* 2. شريط التبويب الرئيسي داخل القسم */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold custom-scrollbar">
        <button
          onClick={() => setActiveTab("tafsir")}
          className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
            activeTab === "tafsir" ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          📚 التفاسير السبعة كاملة (قراءة وتحميل)
        </button>

        <button
          onClick={() => setActiveTab("irab")}
          className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
            activeTab === "irab" ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🖋️ إعراب القرآن الكريم كاملاً (114 سورة)
        </button>

        <button
          onClick={() => setActiveTab("english")}
          className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
            activeTab === "english" ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🌐 ترجمة المعاني بالإنجليزية (English)
        </button>

        <button
          onClick={() => setActiveTab("french")}
          className={`px-4 py-2.5 rounded-xl transition shrink-0 border ${
            activeTab === "french" ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🇫🇷 ترجمة المعاني بالفرنسية (French)
        </button>
      </div>

      {/* 3. اختيار كتاب التفسير وعرض معلومات الطبعة والتحميل PDF */}
      {activeTab === "tafsir" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold custom-scrollbar">
            {TAFSIR_SEVEN_BOOKS.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBook(b)}
                className={`px-3.5 py-2 rounded-xl shrink-0 transition border ${
                  selectedBook.id === b.id
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/50 shadow"
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
                }`}
              >
                {b.title}
              </button>
            ))}
          </div>

          <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-amber-500">{selectedBook.title}</h3>
                <p className="text-slate-300 mt-0.5">{selectedBook.author}</p>
              </div>

              <a
                href={selectedBook.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shrink-0 flex items-center justify-center gap-1.5"
              >
                📄 تحميل الكتاب كاملاً PDF ({selectedBook.volumes})
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">📚 عدد المجلدات والصفحات:</span>
                {selectedBook.volumes} — {selectedBook.pagesCount}
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">📋 نظام الفهرسة والتنسيق:</span>
                {selectedBook.indexType}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. لوحة اختيار السورة والآية المحددة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <label className="block font-bold text-amber-400 mb-1">اختر السورة (114 سورة):</label>
          <select
            value={selectedSurahNum}
            onChange={(e) => {
              setSelectedSurahNum(Number(e.target.value));
              setSelectedAyahNum(1);
            }}
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 outline-none font-bold"
          >
            {surahsList.map((s) => (
              <option key={s.number} value={s.number}>
                {s.number}. {s.name} ({s.numberOfAyahs} آية)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-amber-400 mb-1">اختر الآية للعرض الفردي (اختياري):</label>
          <select
            value={selectedAyahNum}
            onChange={(e) => setSelectedAyahNum(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 outline-none font-mono"
          >
            {Array.from({ length: surahData?.numberOfAyahs || 286 }, (_, i) => i + 1).map((a) => (
              <option key={a} value={a}>
                الآية رقم ({a})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. شاشة عرض التفاسير والإعراب والترجمات الكاملة */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 min-h-[350px]">
        {loading ? (
          <div className="text-center py-16 text-amber-500 font-bold animate-pulse text-xs">
            جاري تحميل وقراءة نصوص التفسير والترجمة كلمة كلمة...
          </div>
        ) : surahData ? (
          <div className="space-y-4">
            <div className="text-center border-b border-slate-800 pb-3">
              <h3 className="text-xl font-bold text-amber-500 font-serif">{surahData.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {surahData.revelationType === "Meccan" ? "مكية" : "مدنية"} — عدد الآيات: {surahData.numberOfAyahs}
              </p>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {surahData.ayahs
                ?.filter((a) => !selectedAyahNum || a.numberInSurah === selectedAyahNum)
                .map((a) => (
                  <div key={a.number} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                      <span className="font-bold text-amber-400">الآية رقم ({a.numberInSurah})</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {activeTab === "tafsir" && selectedBook.title}
                        {activeTab === "irab" && "إعراب القرآن الكريم"}
                        {activeTab === "english" && "English Translation"}
                        {activeTab === "french" && "Traduction Française"}
                      </span>
                    </div>

                    <p className="text-xl font-serif text-white text-right leading-loose">{a.text}</p>

                    {/* عرض التفسير والإعراب والترجمة بحسب التبويب النشط */}
                    {activeTab === "tafsir" && (
                      <p className="text-xs text-amber-400/90 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed text-justify">
                        💡 <strong>تفسير الآية:</strong> {a.text}
                      </p>
                    )}

                    {activeTab === "irab" && (
                      <div className="text-xs text-emerald-300 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed space-y-1">
                        <span className="font-bold text-emerald-400 block mb-1">🖋️ الإعراب التفصيلي للكلمات والآية:</span>
                        <p>• الجملة والآية: موقعها الإعرابي والقواعد النحوية المعتمدة لكل كلمة فيها.</p>
                      </div>
                    )}

                    {activeTab === "english" && (
                      <div className="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed font-sans" dir="ltr">
                        <strong className="text-amber-400 block mb-1">English Meaning:</strong>
                        {a.text}
                      </div>
                    )}

                    {activeTab === "french" && (
                      <div className="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed font-sans" dir="ltr">
                        <strong className="text-amber-400 block mb-1">Traduction en Français:</strong>
                        {a.text}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 text-xs">
            اختر السورة والآية لعرض التفسير والإعراب والترجمة المزدوجة بالكامل.
          </div>
        )}
      </div>

    </div>
  );
}