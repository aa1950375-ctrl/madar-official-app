"use client";
import React from "react";
import { PLATFORM_INFO, ISLAMIC_DATA } from "@/lib/islamicData";

export default function MasterIslamicToolsHub({ onSelectTool }) {
  const tools = ISLAMIC_DATA?.tools || [];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      <div className="border-b border-amber-500/20 pb-4 space-y-2">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full">
          🛠️ الخدمات والأدوات الإسلامية الشاملة
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mt-2">
          مجمع الأدوات والخدمات الإسلامية
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          جميع الخدمات الإسلامية التفاعلية المباشرة المجهزة لتيسير الورد اليومي والعبادات.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool && onSelectTool(tool.id)}
            className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition cursor-pointer space-y-2 group shadow-md"
          >
            <div className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-200">
              {tool.icon}
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition">
              {tool.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {tool.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}