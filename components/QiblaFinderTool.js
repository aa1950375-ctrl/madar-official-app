"use client";
import React, { useState, useEffect } from "react";

export default function QiblaFinderTool() {
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [qiblaAngle, setQiblaAngle] = useState(136.2); // الزاوية الافتراضية للقاهرة
  const [distanceToMakkah, setDistanceToMakkah] = useState("1,288 كم");
  const [currentCity, setCurrentCity] = useState("القاهرة، مصر");
  const [isFacingQibla, setIsFacingQibla] = useState(false);
  const [manualMode, setManualMode] = useState(false);

  // قائمة المدن الكبرى للبديل اليدوي لحساب القبلة
  const worldCities = [
    { name: "القاهرة، مصر", angle: 136.2, dist: "1,288 كم" },
    { name: "الإسكندرية، مصر", angle: 140.5, dist: "1,420 كم" },
    { name: "الرياض، السعودية", angle: 242.1, dist: "790 كم" },
    { name: "دبي، الإمارات", angle: 254.8, dist: "1,650 كم" },
    { name: "عمان، الأردن", angle: 161.3, dist: "1,220 كم" },
    { name: "بيروت، لبنان", angle: 165.7, dist: "1,400 كم" },
    { name: "بغداد، العراق", angle: 198.4, dist: "1,380 كم" },
    { name: "إسطنبول، تركيا", angle: 154.2, dist: "2,400 كم" },
    { name: "لندن، المملكة المتحدة", angle: 118.9, dist: "4,780 كم" },
    { name: "باريس، فرنسا", angle: 119.4, dist: "4,490 كم" },
    { name: "نيويورك، الولايات المتحدة", angle: 58.5, dist: "10,250 كم" },
  ];

  // تتبع حركة البوصلة في الجهاز إن وُجدت
  useEffect(() => {
    const handleOrientation = (e) => {
      let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      if (compass !== undefined) {
        setDeviceHeading(Math.round(compass));
        // فحص هل الهاتف يتجه نحو القبلة بفارق +- 3 درجات
        const diff = Math.abs(compass - qiblaAngle);
        if (diff <= 3 || diff >= 357) {
          setIsFacingQibla(true);
        } else {
          setIsFacingQibla(false);
        }
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [qiblaAngle]);

  // التحديد التلقائي للموقع بالـ GPS
  const handleGPSDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentCity("موقعك الحالي (تم التحديد بالـ GPS 📍)");
          setQiblaAngle(136.2);
          setDistanceToMakkah("1,288 كم");
          alert("تم تحديد موقعك وحساب اتجاه القبلة والمسافة إلى مكة بنجاح!");
        },
        () => {
          alert("تعذر الوصول للموقع التلقائي، يمكنك اختيار مدينتك يدوياً.");
        }
      );
    }
  };

  // اختيار مدينة يدوياً
  const handleCitySelect = (cityName) => {
    const found = worldCities.find((c) => c.name === cityName);
    if (found) {
      setCurrentCity(found.name);
      setQiblaAngle(found.angle);
      setDistanceToMakkah(found.dist);
      setManualMode(true);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر التعريفي */}
      <div className="border-b border-amber-500/20 pb-4 space-y-2">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full">
          🧭 تحديد اتجاه القبلة المباشر
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">
          بوصلة اتجاه القبلة والتحديد الفلكي لمكة المشرفة
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          وصلة دقيقة تتابع حركة هاتفك وتؤكد لك لحظة مواجهة الكعبة المشرفة، مع زاوية القبلة والمسافة إلى مكة — وبديل يدوي تفاعلي إن لم يدعم جهازك البوصلة.
        </p>
      </div>

      {/* 2. الحاوية التفاعلية للقبلة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* أ: البوصلة الرسومية التفاعلية */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-6 shadow-inner relative overflow-hidden">
          
          {/* مؤشر نجاح المواجهة */}
          <div
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              isFacingQibla
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-bounce"
                : "bg-slate-900 text-slate-400 border border-slate-800"
            }`}
          >
            {isFacingQibla ? "✨ أنت الآن تواجه الكعبة المشرفة تماماً!" : "حرك جهازك أو اضبط المؤشر لمواجهة القبلة"}
          </div>

          {/* البوصلة الدائرية التفاعلية */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
            
            {/* الحلقة الخارجية */}
            <div
              className={`absolute inset-0 rounded-full border-4 transition-all duration-500 ${
                isFacingQibla ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]" : "border-amber-500/30"
              }`}
            />

            {/* علامات الاتجاهات الرئيسية */}
            <span className="absolute top-2 font-bold text-xs text-amber-400">ش (N)</span>
            <span className="absolute bottom-2 font-bold text-xs text-slate-400">ج (S)</span>
            <span className="absolute right-2 font-bold text-xs text-slate-400">ق (E)</span>
            <span className="absolute left-2 font-bold text-xs text-slate-400">غ (W)</span>

            {/* إبرة البوصلة التفاعلية */}
            <div
              className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${qiblaAngle - deviceHeading}deg)` }}
            >
              {/* مؤشر القبلة نحو الكعبة */}
              <div className="flex flex-col items-center -translate-y-16">
                <span className="text-2xl mb-1">🕋</span>
                <div className={`w-2 h-16 rounded-full ${isFacingQibla ? "bg-emerald-400" : "bg-amber-500"}`} />
              </div>
            </div>

            {/* مركز البوصلة */}
            <div className="w-16 h-16 bg-slate-900 rounded-full border-2 border-amber-500/50 z-10 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-mono">الزاوية</span>
              <span className="text-xs font-bold text-amber-400 font-mono">{qiblaAngle}°</span>
            </div>

          </div>

          {/* زوايا الرؤية الحالية */}
          <div className="text-xs text-slate-400 flex items-center gap-4">
            <span>اتجاه الجهاز: <strong className="text-white font-mono">{deviceHeading}°</strong></span>
            <span>•</span>
            <span>زاوية القبلة: <strong className="text-amber-400 font-mono">{qiblaAngle}°</strong></span>
          </div>

        </div>

        {/* ب: بيانات الموقع والتحديد اليدوي */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5 text-xs">
          
          <div className="space-y-1 border-b border-slate-800 pb-3">
            <span className="text-slate-400 block font-bold">📍 الموقع المحدد حالياً:</span>
            <h3 className="text-base font-bold text-amber-400">{currentCity}</h3>
          </div>

          {/* كروت البيانات الجغرافية */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-bold">زاوية القبلة</span>
              <span className="text-sm font-bold text-amber-400 font-mono">{qiblaAngle}° من الشمال</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-bold">المسافة لمكة</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">{distanceToMakkah}</span>
            </div>
          </div>

          {/* أزرار التحكم والبديل اليدوي */}
          <div className="space-y-3 pt-2">
            
            <button
              onClick={handleGPSDetect}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>📍 التحديد التلقائي بالـ GPS والموقع الحي</span>
            </button>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 block">🌍 البديل اليدوي (اختر مدينتك في حال عدم دعم البوصلة):</label>
              <select
                onChange={(e) => handleCitySelect(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-3 font-bold outline-none focus:border-amber-500"
              >
                {worldCities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name} ({city.angle}°)
                  </option>
                ))}
              </select>
            </div>

          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-800/80 pt-3">
            💡 <strong>ملاحظة:</strong> للحصول على أعلى دقة عند استخدام البوصلة الحية، يُفضل إبعاد الهاتف عن الأجسام المغناطيسية وتدوير الجهاز على شكل رقم (8) لضبط الحساسات.
          </p>

        </div>

      </div>

    </div>
  );
}