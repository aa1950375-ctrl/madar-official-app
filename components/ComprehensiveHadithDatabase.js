"use client";
import React, { useState } from "react";

export default function ComprehensiveHadithDatabase() {
  const [selectedBook, setSelectedBook] = useState("صحيح البخاري");

  const hadithBooks = [
    {
      name: "صحيح البخاري",
      author: "الإمام البخاري",
      count: "7,563 حديث",
      sampleHadith: "عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى...»"
    },
    {
      name: "صحيح مسلم",
      author: "الإمام مسلم",
      count: "7,500 حديث",
      sampleHadith: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ»"
    },
    {
      name: "الأربعون النووية",
      author: "الإمام النووي",
      count: "42 حديث",
      sampleHadith: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ»"
    }
  ];

  const activeData = hadithBooks.find(b => b.name === selectedBook) || hadithBooks[0];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      <div className="border-b border-amber-500/20 pb-4 space-y-2">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full">
          📜 موسوعة كتب الحديث السُنّية
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mt-2">
          قواعد الأحاديث الشريفة وكتب السُنّة
        </h2>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs">
        {hadithBooks.map((b) => (
          <button
            key={b.name}
            onClick={() => setSelectedBook(b.name)}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              selectedBook === b.name
                ? "bg-amber-500 text-slate-950"
                : "bg-slate-950 text-slate-300 border border-slate-800"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-amber-400 font-serif">{activeData.name}</h3>
          <span className="text-xs text-slate-400 font-mono">{activeData.count}</span>
        </div>
        <p className="font-serif text-base md:text-lg text-white leading-loose bg-slate-900 p-4 rounded-xl border border-slate-800">
          {activeData.sampleHadith}
        </p>
      </div>
    </div>
  );
}