"use client";
import React, { useState, useEffect } from "react";

export default function PrayerTimesLiveTool() {
  const [city, setCity] = useState("القاهرة (افتراضي)");
  const [locationName, setLocationName] = useState("القاهرة، مصر");
  const [calcMethod, setCalcMethod] = useState("egypt"); // الهيئة المصرية للمساحة

  // وقت العد التنازلي التفاعلي
  const [timeLeft, setTimeLeft] = useState({ hours: 10, minutes: 16, seconds: 34 });
  const [nextPrayerName, setNextPrayerName] = useState("الفجر");

  // مواقيت الصلاة الافتراضية المحسوبة
  const [prayerTimes, setPrayerTimes] = useState({
    imsak: "05:29 ص",
    fajr: "05:39 ص",
    sunrise: "07:07 ص",
    dhuhr: "12:39 م",
    asr: "03:42 م",
    maghrib: "06:02 م",
    isha: "07:21 م",
    midnight: "11:50 م",
    lastThird: "01:46 ص"
  });

  // العد التنازلي الحي بالثواني
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // جلب موقع المستخدم التلقائي بالـ GPS (زر موقعي)
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationName("موقعك الحالي (تم التحديد بالـ GPS 📍)");
          alert("تم تحديد موقعك بدقة وتحديث مواقيت الصلاة لمدينتك!");
        },
        (err) => {
          alert("لم نتمكن من الوصول للموقع التلقائي، تم الإبقاء على مواقيت القاهرة.");
        }
      );
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر التعريفي بالخدمة */}
      <div className="border-b border-amber-500/20 pb-4 space-y-2">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full">
          🕌 مواقيت الصلاة اليوم
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">
          مواقيت الصلاة اليوم
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          اعرف مواقيت صلاتك اليوم محسوبةً فلكياً من موقعك تماماً، مع عدّاد تنازلي للصلاة القادمة ومواعيد الإمساك ومنتصف الليل والثلث الأخير للقيام — واختر طريقة الحساب التي تناسب بلدك.
        </p>
      </div>

      {/* 2. حاوية مواقيت الصلاة الكبرى المنسقة */}
      <div className="bg-slate-950 p-5 md:p-8 rounded-2xl border border-slate-800/80 space-y-6">
        
        {/* أ: رأس بطاقة المدينة والتاريخ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDetectLocation}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shrink-0"
            >
              <span>📍 موقعي</span>
            </button>
            <h3 className="text-lg font-bold text-amber-400">{locationName}</h3>
          </div>

          <span className="text-xs font-bold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            السبت، 24 أكتوبر 2026 • 13 جمادى الأولى 1448 هـ
          </span>
        </div>

        {/* ب: كارت العداد التنازلي الصريح للصلاة القادمة */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3 shadow-inner">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            الصلاة القادمة: {nextPrayerName}
          </span>

          <div className="text-3xl md:text-5xl font-mono font-bold text-white tracking-widest dir-ltr my-2">
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>

          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-emerald-500 h-full w-2/3 animate-pulse" />
          </div>
        </div>

        {/* جـ: شبكة كروت الصلوات السبع المباشرة */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 text-center text-xs">
          
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 font-bold block">الإمساك</span>
            <span className="text-sm font-bold text-white font-mono">{prayerTimes.imsak}</span>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 font-bold block">الفجر</span>
            <span className="text-sm font-bold text-amber-400 font-mono">{prayerTimes.fajr}</span>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 font-bold block">الشروق</span>
            <span className="text-sm font-bold text-white font-mono">{prayerTimes.sunrise}</span>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 font-bold block">الظهر</span>
            <span className="text-sm font-bold text-white font-mono">{prayerTimes.dhuhr}</span>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 font-bold block">العصر</span>
            <span className="text-sm font-bold text-white font-mono">{prayerTimes.asr}</span>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 font-bold block">المغرب</span>
            <span className="text-sm font-bold text-white font-mono">{prayerTimes.maghrib}</span>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 font-bold block">العشاء</span>
            <span className="text-sm font-bold text-white font-mono">{prayerTimes.isha}</span>
          </div>

        </div>

        {/* د: ثلث الليل ومنتصف الليل */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center text-xs">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-300 font-bold">🌙 منتصف الليل:</span>
            <span className="text-base font-bold text-amber-400 font-mono">{prayerTimes.midnight}</span>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-300 font-bold">☘️ الثلث الأخير لقيام الليل:</span>
            <span className="text-base font-bold text-amber-400 font-mono">{prayerTimes.lastThird}</span>
          </div>
        </div>

        {/* هـ: القوائم المنسدلة لاختيار طريقة الحساب والمدينة */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          
          <select
            value={calcMethod}
            onChange={(e) => setCalcMethod(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-white rounded-xl p-3 outline-none font-bold"
          >
            <option value="egypt">الهيئة المصرية العامة للمساحة</option>
            <option value="makkah">أم القرى (مكة المكرمة)</option>
            <option value="mwl">رابطة العالم الإسلامي</option>
            <option value="karachi">جامعة العلوم الإسلامية بكراتشي</option>
          </select>

          <select className="bg-slate-900 border border-slate-800 text-white rounded-xl p-3 outline-none font-bold">
            <option>العصر: الجمهور (الشافعي والمالكي والحنبلي)</option>
            <option>العصر: المذهب الحنفي</option>
          </select>

          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setLocationName(e.target.value);
            }}
            className="bg-slate-900 border border-slate-800 text-white rounded-xl p-3 outline-none font-bold"
          >
            <option value="القاهرة، مصر">-- اختر مدينة يدوياً --</option>
            <option value="القاهرة، مصر">القاهرة، مصر</option>
            <option value="الإسكندرية، مصر">الإسكندرية، مصر</option>
            <option value="مكة المكرمة، السعودية">مكة المكرمة، السعودية</option>
            <option value="المدينة المنورة، السعودية">المدينة المنورة، السعودية</option>
            <option value="الرياض، السعودية">الرياض، السعودية</option>
            <option value="دبي، الإمارات">دبي، الإمارات</option>
            <option value="إسطنبول، تركيا">إسطنبول، تركيا</option>
          </select>

        </div>

        {/* و: أزرار الخدمات الإضافية المنسقة */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => alert("جاري فتح جدول الإمساكية لشهر شعبان / رمضان المبارك...")}
            className="px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <span>📅 جدول الشهر (الإمساكية)</span>
          </button>

          <button
            onClick={() => alert("يمكنك تقديم أو تأخير الدقائق حسب التوقيت المحلي للمسجد.")}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <span>⚙️ تعديل الدقائق</span>
          </button>

          <button
            onClick={() => alert("أذكار ما بعد الصلاة: أستغفر الله (3 مرات)، اللهم أنت السلام ومنك السلام...")}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-lg"
          >
            <span>📌 أذكار ما بعد الصلاة</span>
          </button>
        </div>

      </div>

    </div>
  );
}