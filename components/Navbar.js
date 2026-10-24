"use client";
import React from "react";

export default function Navbar({ activeTab, setActiveTab, onOpenSearch }) {
  const navItems = [
    { id: "quran", label: "🎧 المكتبة الصوتية والقراء (140+)" },
    { id: "radio_live", label: "📻 إذاعة القرآن الكريم المباشرة 24/7" },
    { id: "tafsir", label: "📚 التفاسير السبعة والإعراب والترجمات" },
    { id: "hadith", label: "📖 كتب الحديث الستة المعتمدة" },
    { id: "audios", label: "🎙️ الصوتيات ودعاء الختمة والرقية" },
    { id: "digital_library", label: "🏛️ المكتبة الرقمية (25 كتاباً)" },
    { id: "stories_reading", label: "📜 موسوعة قصص الأنبياء والسيرة" },
    { id: "reels", label: "🎬 صانع الريلز القرآني" },
    { id: "stories_reels", label: "📽️ صانع الريلز القصصي والسير" },
    { id: "islamic_tools", label: "🛠️ الأدوات الإسلامية" },
  ];

  return (
    <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xl shadow-lg">
            مَ
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-500 tracking-wide">مَدار | MADAR</h1>
            <p className="text-[10px] text-slate-400">المنظومة الإسلامية الشاملة والمستقلة وصانع المحتوى</p>
          </div>
        </div>

        {/* قائمة التبويبات الشاملة */}
        <nav className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-2 rounded-xl shrink-0 transition font-bold border ${
                activeTab === item.id
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                  : "bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onOpenSearch}
          className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-amber-400 text-xs font-bold transition shrink-0"
        >
          🔍 البحث الشامل
        </button>
      </div>
    </header>
  );
}