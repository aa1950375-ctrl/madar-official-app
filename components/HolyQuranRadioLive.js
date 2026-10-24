"use client";
import React, { useState, useRef } from "react";

export default function HolyQuranRadioLive() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // سيرفرات البث الحي المباشر لإذاعة القرآن الكريم من القاهرة 24/7
  const liveRadioStreamUrl = "https://stream.radioquran.net/quran";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl text-slate-100 text-center font-sans">
      
      {/* 1. هيدر إذاعة القرآن الكريم */}
      <div className="space-y-2 border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-3.5 py-1 rounded-full border border-rose-500/20 animate-pulse">
          LIVE • بث حي ومباشر 24 ساعة
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mt-2">
          «إذاعة القرآن الكريم من القاهرة - بث مباشر»
        </h2>
        <p className="text-xs text-slate-400">
          استمع الآن إلى البث المباشر المعتمد لإذاعة القرآن الكريم دون مغادرة المنصة أو التحويل لأي مواقع أخرى.
        </p>
      </div>

      {/* 2. المشغل الصوتي المدمج والتفاعلي */}
      <div className="max-w-2xl mx-auto bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-inner">
        
        {/* عنصر الصوت المتصل بالبث المباشر */}
        <audio ref={audioRef} src={liveRadioStreamUrl} preload="none" />

        {/* موجات الصوت التفاعلية */}
        <div className="flex items-center justify-center gap-1.5 h-16 bg-slate-900/80 rounded-xl p-4 border border-slate-800/80">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 bg-amber-500 rounded-full transition-all duration-300 ${
                isPlaying ? "animate-pulse h-full" : "h-2 bg-slate-700"
              }`}
              style={{
                animationDelay: `${(i % 5) * 0.15}s`,
                height: isPlaying ? `${Math.floor(Math.random() * 32) + 12}px` : "8px"
              }}
            />
          ))}
        </div>

        {/* زر التشغيل والإيقاف المباشر */}
        <button
          onClick={togglePlay}
          className={`w-full py-4 rounded-xl font-bold transition flex items-center justify-center gap-3 text-sm shadow-xl ${
            isPlaying
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-amber-500 hover:bg-amber-600 text-slate-950"
          }`}
        >
          {isPlaying ? (
            <>
              <span className="text-base">⏸️</span>
              <span>إيقاف البث الحي المؤقت</span>
            </>
          ) : (
            <>
              <span className="text-base">🔊</span>
              <span>تشغيل إذاعة القرآن الكريم المباشرة الآن</span>
            </>
          )}
        </button>

      </div>

      {/* 3. شريط مشاركة الحسنة والمتابعة */}
      <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
        <span className="font-bold text-amber-400">❤️ شارك المنصة واغتنم جبالاً من الحسنات:</span>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
        >
          نسخ رابط الإذاعة المباشرة 📋
        </button>
      </div>

    </div>
  );
}