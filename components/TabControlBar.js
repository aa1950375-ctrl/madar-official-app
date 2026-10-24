"use client";
import React from "react";

export default function TabControlBar({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "quran",
      title: "📖 المصحف والقراءات",
      badge: "تلاوات واستماع",
      color: "from-emerald-500/20 to-emerald-900/10",
    },
    {
      id: "reels",
      title: "🎬 صانع الريلز القرآني",
      badge: "140+ قارئ",
      color: "from-amber-500/20 to-amber-900/10",
    },
    {
      id: "stories_reels",
      title: "📜 الريلز القصصي والسير",
      badge: "أنبياء وسيرة",
      color: "from-amber-600/20 to-amber-950/10",
    },
    {
      id: "library",
      title: "📚 المكتبة والمراجع الشاملة",
      badge: "تفاسير وفقه",
      color: "from-blue-500/20 to-blue-900/10",
    },
  ];

  return (
    <div className="w-full space-y-3 my-4">
      {/* 1. شريط البث الإخباري الإسلامي السريع */}
      <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-2.5 px-4 flex items-center justify-between text-xs text-slate-300 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] shrink-0 animate-pulse">
            📢 بث مباشر
          </span>
          <p className="truncate text-slate-200">
            أهلاً بكم في منصة مَدار — تصفح المصحف، استمع لأكثر من 140 قارئاً، واصنع مقاطع ريلز وشورتس سينمائية بسهولة!
          </p>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-amber-400 font-mono shrink-0 mr-2">
          تحديثات تفاعلية 2026
        </span>
      </div>

      {/* 2. أزرار التحكم بالتبويبات الرئيسية (Tab Control Buttons) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-right relative overflow-hidden group ${
                isActive
                  ? "bg-gradient-to-r " + tab.color + " border-amber-500 shadow-xl shadow-amber-500/10"
                  : "bg-slate-900/70 border-slate-800/80 hover:bg-slate-800/80 hover:border-amber-500/30"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-amber-400 group-hover:bg-amber-500/20"
                  }`}
                >
                  {tab.badge}
                </span>
                <span className={`text-xs ${isActive ? "text-amber-400" : "text-slate-500"}`}>
                  {isActive ? "● نشط" : "○"}
                </span>
              </div>

              <h3
                className={`text-sm font-bold mt-1 transition ${
                  isActive ? "text-amber-400" : "text-slate-200 group-hover:text-amber-300"
                }`}
              >
                {tab.title}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}