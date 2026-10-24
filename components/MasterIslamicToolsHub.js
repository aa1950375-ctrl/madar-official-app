"use client";
import React, { useState } from "react";
import {
  DAILY_AYAH,
  ASMA_ALLAH_HUSNA,
  HISN_ALMUSLIM,
  ISLAMIC_BABY_NAMES,
  HOW_TO_PRAY_STEPS,
  PLATFORM_INFO,
} from "@/lib/islamicData";

export default function MasterIslamicToolsHub() {
  const [activeTool, setActiveTool] = useState("radio"); // 'radio' | 'hisn' | 'topics' | 'prayer' | 'qibla' | 'hijri' | 'names_god' | 'baby_names' | 'daily' | 'pray_edu'
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const [selectedRadioStream, setSelectedRadioStream] = useState("https://stream.radioquran.net/quran");
  const [searchQuery, setSearchQuery] = useState("");

  // محطات إذاعة القرآن الكريم المباشرة
  const radioStations = [
    { name: "إذاعة القرآن الكريم من القاهرة (بث مباشر)", url: "https://stream.radioquran.net/quran" },
    { name: "إذاعة التلاوات الخاشعة", url: "https://qurango.net/radio/tarawih" },
    { name: "إذاعة الشيخ عبد الباسط عبد الصمد", url: "https://qurango.net/radio/abdulbasit_abdullsamad" },
    { name: "إذاعة الشيخ محمد صديق المنشاوي", url: "https://qurango.net/radio/minshawi" },
    { name: "إذاعة الشيخ محمود خليل الحصري", url: "https://qurango.net/radio/hussary" },
    { name: "إذاعة الشيخ مشاري العفاسي", url: "https://qurango.net/radio/afs" },
  ];

  // آيات بالموضوع (فهرس الموضوعات القرآنية)
  const topicAyahs = [
    { topic: "الصبر والاحتساب", count: "104 آيات", text: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ ۚ وَلَا تَحْزَنْ عَلَيْهِمْ", surah: "النحل: 127" },
    { topic: "البر والوالدين", count: "32 آية", text: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا", surah: "الإسراء: 23" },
    { topic: "الاستغفار والتوبة", count: "87 آية", text: "فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا", surah: "نوح: 10" },
    { topic: "الرزق والتوكل", count: "55 آية", text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ", surah: "الطلاق: 2-3" },
  ];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر التعريفي بالأدوات الإسلامية */}
      <div className="border-b border-amber-500/20 pb-4">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
          🛠️ قسم الأدوات الإسلامية والخدمات التفاعلية
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">
          إذاعة القرآن الكريم، مواقيت الصلاة، القبلة، الأذكار، وآية اليوم
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          بث صوتي مباشر وقراءة تفصيلية كاملة لجميع الخدمات التفاعلية المستقلة.
        </p>
      </div>

      {/* 2. شريط التبويبات للأدوات الإسلامية */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold custom-scrollbar">
        <button
          onClick={() => setActiveTool("radio")}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
            activeTool === "radio" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          📻 إذاعة القرآن الكريم (بث مباشر)
        </button>

        <button
          onClick={() => setActiveTool("hisn")}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
            activeTool === "hisn" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🛡️ حصن المسلم والأذكار
        </button>

        <button
          onClick={() => setActiveTool("daily")}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
            activeTool === "daily" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🌟 آية اليوم مع التفسير
        </button>

        <button
          onClick={() => setActiveTool("prayer")}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
            activeTool === "prayer" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🕌 مواقيت الصلاة والتاريخ الهجري
        </button>

        <button
          onClick={() => setActiveTool("topics")}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
            activeTool === "topics" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          📖 آيات بالموضوع
        </button>

        <button
          onClick={() => setActiveTool("names_god")}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
            activeTool === "names_god" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          ✨ أسماء الله الحسنى
        </button>

        <button
          onClick={() => setActiveTool("baby_names")}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
            activeTool === "baby_names" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          👶 أسماء المواليد ومعانيها
        </button>

        <button
          onClick={() => setActiveTool("pray_edu")}
          className={`px-4 py-2.5 rounded-xl shrink-0 transition border ${
            activeTool === "pray_edu" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
          }`}
        >
          🕌 تعليم صفة الصلاة
        </button>
      </div>

      {/* 3. الإذاعة المباشرة لقرآن الكريم */}
      {activeTool === "radio" && (
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full animate-pulse">
                LIVE • بث مباشر 24/7
              </span>
              <h3 className="text-xl font-bold text-white mt-2">إذاعة القرآن الكريم المباشرة</h3>
              <p className="text-xs text-slate-400 mt-1">استمع الآن لأجمل التلاوات والبرامج الإذاعية المباشرة عالية الجودة.</p>
            </div>

            {/* مشغل الإذاعة المباشر */}
            <div className="w-full md:w-auto bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
              <audio src={selectedRadioStream} controls autoPlay className="w-full md:w-80 h-10 accent-amber-500" />
            </div>
          </div>

          {/* محطات الإذاعة المتاحة */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400">📻 اختر محطة الإذاعة المباشرة:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {radioStations.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRadioStream(st.url)}
                  className={`p-3.5 rounded-xl border text-right text-xs transition flex items-center justify-between ${
                    selectedRadioStream === st.url
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  <span>{st.name}</span>
                  <span className="text-[10px] text-emerald-400">مباشر 🔊</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. حصن المسلم */}
      {activeTool === "hisn" && (
        <div className="space-y-4">
          {HISN_ALMUSLIM.map((cat, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-400 border-b border-slate-800 pb-2">{cat.category}</h3>
              <div className="space-y-2.5">
                {cat.items.map((item, i) => (
                  <div key={i} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <p className="text-white font-serif leading-loose">{item.zikr}</p>
                    <span className="bg-amber-500/10 text-amber-400 font-bold px-3 py-1 rounded-lg shrink-0">
                      التكرار: {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. آية اليوم */}
      {activeTool === "daily" && (
        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
            {DAILY_AYAH.surah}
          </span>
          <p className="text-2xl font-serif text-white leading-loose mt-2 font-semibold">
            "{DAILY_AYAH.ayah}"
          </p>
          <div className="border-t border-slate-800 pt-4 text-xs text-slate-300 text-justify bg-slate-900/60 p-4 rounded-xl">
            <strong className="text-amber-400 block mb-1">💡 التفسير الميسر:</strong>
            {DAILY_AYAH.tafsir}
          </div>
        </div>
      )}

      {/* 6. مواقيت الصلاة والتاريخ الهجري */}
      {activeTool === "prayer" && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-amber-400">🕌 مواقيت الصلاة لليوم والتاريخ الهجري</h3>
            <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full font-bold">
              التاريخ الهجري: 3 شعبان 1448 هـ
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400">الفجر</span>
              <p className="text-base font-bold text-white font-mono">05:12 AM</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400">الظهر</span>
              <p className="text-base font-bold text-white font-mono">12:08 PM</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400">العصر</span>
              <p className="text-base font-bold text-white font-mono">03:15 PM</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400">المغرب</span>
              <p className="text-base font-bold text-white font-mono">05:35 PM</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400">العشاء</span>
              <p className="text-base font-bold text-white font-mono">06:55 PM</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. آيات بالموضوع */}
      {activeTool === "topics" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {topicAyahs.map((t, idx) => (
            <div key={idx} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span>{t.topic}</span>
                <span className="text-[10px] bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800 text-slate-400">
                  {t.count}
                </span>
              </div>
              <p className="text-base font-serif text-white leading-relaxed text-right">"{t.text}"</p>
              <span className="text-[11px] text-slate-400 block text-left">-- {t.surah}</span>
            </div>
          ))}
        </div>
      )}

      {/* 8. أسماء الله الحسنى */}
      {activeTool === "names_god" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {ASMA_ALLAH_HUSNA.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-2">
              <h3 className="text-xl font-bold text-amber-500 font-serif">{item.name}</h3>
              <p className="text-slate-300 leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      )}

      {/* 9. أسماء المواليد ومعانيها */}
      {activeTool === "baby_names" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {ISLAMIC_BABY_NAMES.map((b, idx) => (
            <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{b.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    b.gender === "ذكر" ? "bg-blue-500/20 text-blue-400" : "bg-rose-500/20 text-rose-400"
                  }`}>
                    {b.gender}
                  </span>
                </div>
                <p className="text-slate-400 mt-1.5 leading-relaxed">{b.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 10. تعليم صفة الصلاة */}
      {activeTool === "pray_edu" && (
        <div className="space-y-3 text-xs">
          {HOW_TO_PRAY_STEPS.map((s) => (
            <div key={s.step} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-sm">
                {s.step}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-400">{s.title}</h4>
                <p className="text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 11. معلومات الخصوصية والتواصل المعتمدة */}
      <div className="border-t border-slate-800 pt-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl">
        <div>
          <strong className="text-amber-500">منصة وتطبيق مَدار | MADAR</strong>
          <p className="text-[11px] mt-0.5">منظومة إسلامية شاملة ومستقلة وقارئ مدمج وصانع ريلز وشورتس.</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <a href="/privacy" className="hover:text-amber-400 transition">سياسة الخصوصية</a>
          <a
            href={PLATFORM_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            واتساب: {PLATFORM_INFO.contact.whatsapp}
          </a>
          <span className="text-slate-500">الإيميل: {PLATFORM_INFO.contact.email}</span>
        </div>
      </div>

    </div>
  );
}