"use client";
import React, { useState } from "react";

export default function StoriesAndSeerahEncyclopediaHub() {
  const [activeTab, setActiveTab] = useState("prophets");

  const prophets = [
    { name: "آدم عليه السلام", desc: "أبو البشرية وأول الأنبياء والمرسلين" },
    { name: "نوح عليه السلام", desc: "شيخ المرسلين وصاحب السفينة" },
    { name: "إبراهيم عليه السلام", desc: "خليل الرحمن وأبو الأنبياء" },
    { name: "موسى عليه السلام", desc: "كليم الله وصاحب المعجزات التسع" },
    { name: "عيسى عليه السلام", desc: "روح الله وكلمته ألقاها إلى مريم" },
    { name: "محمد ﷺ", desc: "خاتم الأنبياء والمرسلين ورحمة الله للعالمين" }
  ];

  const seerahTimeline = [
    { year: "المولد الشريف", event: "ولد النبي ﷺ في عام الفيل بمكة المكرمة" },
    { year: "البعثة النبوية", event: "نزول الوحي بغار حراء وهو في سن الأربعين" },
    { year: "الهجرة النبوية", event: "الهجرة إلى المدينة المنورة وتأسيس الدولة الإسلامية" },
    { year: "غزوة بدر الكبرى", event: "أول انتصار حاسم للمسلمين في رمضان السنة 2 هـ" },
    { year: "فتح مكة", event: "دخول مكة فاتحين وتطهير الكعبة من الأصنام 8 هـ" }
  ];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      <div className="border-b border-amber-500/20 pb-4 space-y-2">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full">
          📖 موسوعة القصص والسيرة النبوية
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mt-2">
          قصص الأنبياء والسيرة العطرة
        </h2>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab("prophets")}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeTab === "prophets" ? "bg-amber-500 text-slate-950" : "bg-slate-950 text-slate-300 border border-slate-800"
          }`}
        >
          🌴 قصص الأنبياء
        </button>
        <button
          onClick={() => setActiveTab("seerah")}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeTab === "seerah" ? "bg-amber-500 text-slate-950" : "bg-slate-950 text-slate-300 border border-slate-800"
          }`}
        >
          🕌 أحداث السيرة النبوية
        </button>
      </div>

      {activeTab === "prophets" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prophets.map((p, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <h3 className="text-base font-bold text-amber-400 font-serif">{p.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {seerahTimeline.map((item, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">{item.year}</span>
              <p className="text-xs text-slate-300 flex-1">{item.event}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}