"use client";
import React, { useState, useEffect } from "react";
import { fetchPrayerTimesAndHijri, LIVE_QURAN_STREAMS } from "@/lib/madarApiServices";

export default function IslamicToolsBar() {
  const [prayerData, setPrayerData] = useState(null);
  const [activeStream, setActiveStream] = useState(LIVE_QURAN_STREAMS[0].url);
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);

  useEffect(() => {
    // تحديد موقع المستخدم الجغرافي للحصول على المواقيت المباشرة
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const data = await fetchPrayerTimesAndHijri(
            position.coords.latitude,
            position.coords.longitude
          );
          setPrayerData(data);
        },
        async () => {
          // إحداثيات افتراضية (القاهرة) عند تعذر تحديد الموقع
          const data = await fetchPrayerTimesAndHijri(30.0444, 31.2357);
          setPrayerData(data);
        }
      );
    }
  }, []);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl space-y-4 text-xs text-slate-100">
      
      {/* 1. التاريخ الهجري والمواقيت المباشرة */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full">
            🕌 مواقيت الصلاة والتقويم الهجري
          </span>
          {prayerData?.date?.hijri && (
            <h3 className="text-sm font-bold text-white mt-2">
              تاريخ اليوم: {prayerData.date.hijri.day} {prayerData.date.hijri.month.ar} {prayerData.date.hijri.year} هـ
            </h3>
          )}
        </div>

        {/* أوقات الصلوات الخمس */}
        {prayerData?.timings && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] font-bold">
            <span className="bg-slate-950 p-2 rounded-lg border border-slate-800">الفجر: {prayerData.timings.Fajr}</span>
            <span className="bg-slate-950 p-2 rounded-lg border border-slate-800">الظهر: {prayerData.timings.Dhuhr}</span>
            <span className="bg-slate-950 p-2 rounded-lg border border-slate-800">العصر: {prayerData.timings.Asr}</span>
            <span className="bg-slate-950 p-2 rounded-lg border border-slate-800">المغرب: {prayerData.timings.Maghrib}</span>
            <span className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-amber-400">العشاء: {prayerData.timings.Isha}</span>
          </div>
        )}
      </div>

      {/* 2. إذاعة القرآن الكريم - بث مباشر */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          <span className="font-bold text-white">إذاعة القرآن الكريم (بث مباشر):</span>
          <select
            value={activeStream}
            onChange={(e) => setActiveStream(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-slate-200 outline-none"
          >
            {LIVE_QURAN_STREAMS.map((s, idx) => (
              <option key={idx} value={s.url}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <audio src={activeStream} controls className="h-8 max-w-xs rounded-lg accent-amber-500" />
      </div>

    </div>
  );
}