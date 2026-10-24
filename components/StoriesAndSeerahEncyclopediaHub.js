"use client";
import React, { useState } from "react";
import { PROPHETS_STORIES_DATA } from "@/lib/prophetsStoriesData";
import { PROPHET_SEERAH_FULL_DATA } from "@/lib/prophetSeerahFullData";
import { SAHABA_AND_WIVES_DATA } from "@/lib/sahabaAndWivesData";

export default function StoriesAndSeerahEncyclopediaHub() {
  const [mainTab, setMainTab] = useState("prophets"); // 'prophets' | 'seerah' | 'sahaba'
  const [searchQuery, setSearchQuery] = useState("");

  // حالات الاختيار للقصة المفتوحة
  const [selectedProphet, setSelectedProphet] = useState(PROPHETS_STORIES_DATA[0]);
  const [selectedSeerahSection, setSelectedSeerahSection] = useState(PROPHET_SEERAH_FULL_DATA[0]);
  const [selectedSahabiOrWife, setSelectedSahabiOrWife] = useState(SAHABA_AND_WIVES_DATA[0]);

  // خصائص القراءة والتصفح
  const [fontSize, setFontSize] = useState(18);
  const [themeMode, setThemeMode] = useState("dark"); // 'dark' | 'sepia' | 'light'

  // التصفية والفلترة للبحث
  const filteredProphets = PROPHETS_STORIES_DATA.filter((p) =>
    p.title.includes(searchQuery) || p.content.includes(searchQuery)
  );

  const filteredSeerah = PROPHET_SEERAH_FULL_DATA.filter((s) =>
    s.title.includes(searchQuery) || s.content.includes(searchQuery)
  );

  const filteredSahaba = SAHABA_AND_WIVES_DATA.filter((item) =>
    item.title.includes(searchQuery) || item.content.includes(searchQuery)
  );

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر الموحد لموسوعة القصص والسيرة */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          📜 موسوعة القصص والسيرة النبوية الشاملة
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          قصص الأنبياء والمرسلين، السيرة النبوية الغزوات والأخلاق، سير الصحابة وأمهات المؤمنين
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          قراءة متكاملة تفاعلية موثقة من كتاب الله والسنة النبوية دون حذف أو اختصار.
        </p>
      </div>

      {/* 2. الأقسام الثلاثة الرئيسية */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold custom-scrollbar">
        <button
          onClick={() => setMainTab("prophets")}
          className={`px-5 py-3 rounded-xl transition shrink-0 border flex items-center gap-2 ${
            mainTab === "prophets"
              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg font-bold"
              : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          <span>👑 أولاً: الأنبياء والمرسلين (من آدم إلى عيسى)</span>
        </button>

        <button
          onClick={() => setMainTab("seerah")}
          className={`px-5 py-3 rounded-xl transition shrink-0 border flex items-center gap-2 ${
            mainTab === "seerah"
              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg font-bold"
              : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          <span>🕌 ثانياً: السيرة النبوية والأخلاق والغزوات</span>
        </button>

        <button
          onClick={() => setMainTab("sahaba")}
          className={`px-5 py-3 rounded-xl transition shrink-0 border flex items-center gap-2 ${
            mainTab === "sahaba"
              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg font-bold"
              : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          <span>⭐️ ثالثاً: قصص الصحابة وأمهات المؤمنين</span>
        </button>
      </div>

      {/* 3. شريط البحث وأدوات تكبير الخط والمظهر */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الموسوعة الشاملة..."
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 pr-8 outline-none focus:border-amber-500"
          />
          <span className="absolute left-2.5 top-2.5 text-slate-500">🔍</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">حجم الخط:</span>
            <button
              onClick={() => setFontSize((s) => Math.min(s + 2, 30))}
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
              دافئ
            </button>
          </div>
        </div>
      </div>

      {/* 4. شاشة التصفح والقراءة التفاعلية المستقلة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* قائمة الموضوعات والقصص المرتبة */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
          
          {mainTab === "prophets" && (
            <>
              <h3 className="text-xs font-bold text-amber-400 p-2 border-b border-slate-800">
                فهرس الأنبياء والرسل (25 نبياً ورسولاً):
              </h3>
              {filteredProphets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProphet(p)}
                  className={`w-full text-right p-3 rounded-xl text-xs transition border flex items-center justify-between ${
                    selectedProphet.id === p.id
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold"
                      : "bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  <span className="truncate">{p.title}</span>
                  <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-amber-400 shrink-0">
                    رقم #{p.order}
                  </span>
                </button>
              ))}
            </>
          )}

          {mainTab === "seerah" && (
            <>
              <h3 className="text-xs font-bold text-amber-400 p-2 border-b border-slate-800">
                فهرس فصول السيرة والغزوات والأخلاق:
              </h3>
              {filteredSeerah.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSeerahSection(s)}
                  className={`w-full text-right p-3 rounded-xl text-xs transition border flex items-center justify-between ${
                    selectedSeerahSection.id === s.id
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold"
                      : "bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </>
          )}

          {mainTab === "sahaba" && (
            <>
              <h3 className="text-xs font-bold text-amber-400 p-2 border-b border-slate-800">
                فهرس سير الصحابة وأمهات المؤمنين:
              </h3>
              {filteredSahaba.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSahabiOrWife(item)}
                  className={`w-full text-right p-3 rounded-xl text-xs transition border flex items-center justify-between ${
                    selectedSahabiOrWife.id === item.id
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold"
                      : "bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-amber-400 shrink-0">
                    {item.category}
                  </span>
                </button>
              ))}
            </>
          )}

        </div>

        {/* شاشة القارئ التفاعلي الممتد لنص القصة الكاملة */}
        <div className="lg:col-span-8">
          <div
            className={`p-6 rounded-2xl border min-h-[500px] transition space-y-4 leading-loose font-serif ${
              themeMode === "dark"
                ? "bg-slate-950 border-slate-800 text-slate-100"
                : "bg-[#fbf0d9] border-[#e8d5b5] text-[#433422]"
            }`}
          >
            {/* عنوان القصة النشطة */}
            <div className="border-b border-amber-500/20 pb-3 flex items-center justify-between text-xs font-sans">
              <h3 className="font-bold text-amber-500 text-lg">
                {mainTab === "prophets" && selectedProphet.title}
                {mainTab === "seerah" && selectedSeerahSection.title}
                {mainTab === "sahaba" && selectedSahabiOrWife.title}
              </h3>
              <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full font-bold">
                المصدر: موسوعة القصص والسيرة المعتمدة
              </span>
            </div>

            {/* عرض النص كاملاً تفاعلياً */}
            <div style={{ fontSize: `${fontSize}px` }} className="text-justify pt-2 leading-loose space-y-4">
              {mainTab === "prophets" && (
                <div className="space-y-4 whitespace-pre-line">
                  {selectedProphet.content}
                </div>
              )}

              {mainTab === "seerah" && (
                <div className="space-y-4 whitespace-pre-line">
                  {selectedSeerahSection.content}
                </div>
              )}

              {mainTab === "sahaba" && (
                <div className="space-y-4 whitespace-pre-line">
                  {selectedSahabiOrWife.content}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}