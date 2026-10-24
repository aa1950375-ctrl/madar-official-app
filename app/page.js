"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import IslamicToolsBar from "@/components/IslamicToolsBar";

// 1. الأقسام والمكتبات الإسلامية
import MasterQuranHub from "@/components/MasterQuranHub";
import HolyQuranRadioLive from "@/components/HolyQuranRadioLive";
import CompleteTafsirAndTranslationHub from "@/components/CompleteTafsirAndTranslationHub";
import ComprehensiveHadithDatabase from "@/components/ComprehensiveHadithDatabase";
import AudioDuasAndRuqyahHub from "@/components/AudioDuasAndRuqyahHub";
import DigitalEbooksLibraryHub from "@/components/DigitalEbooksLibraryHub";
import StoriesAndSeerahEncyclopediaHub from "@/components/StoriesAndSeerahEncyclopediaHub";

// 2. صانع الريلز القرآني والقصصي
import InteractiveReelsStudio from "@/components/InteractiveReelsStudio";
import AdvancedReelsMaker from "@/components/AdvancedReelsMaker";

// 3. الأدوات والخدمات الإسلامية التفاعلية
import PrayerTimesLiveTool from "@/components/PrayerTimesLiveTool";
import QiblaFinderTool from "@/components/QiblaFinderTool";
import IslamicCalendarEventsTool from "@/components/IslamicCalendarEventsTool";
import AdhkarDailyTool from "@/components/AdhkarDailyTool";
import DailyHadithHubTool from "@/components/DailyHadithHubTool";
import MasterIslamicToolsHub from "@/components/MasterIslamicToolsHub";

import LibrarySearchModal from "@/components/LibrarySearchModal";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("quran");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. الهيدر الموحد */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. المحتوى الرئيسي والتبويبات المباشرة */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        <IslamicToolsBar />

        {/* أ: المكتبة الصوتية والقراء (140+ قارئ أبجديّاً) */}
        {activeTab === "quran" && <MasterQuranHub />}

        {/* ب: إذاعة القرآن الكريم من القاهرة (بث مباشر 24/7) */}
        {activeTab === "radio_live" && <HolyQuranRadioLive />}

        {/* جـ: التفاسير السبعة والإعراب والترجمات */}
        {activeTab === "tafsir" && <CompleteTafsirAndTranslationHub />}

        {/* د: كتب الحديث الستة وحديث اليوم التفاعلي */}
        {activeTab === "hadith" && <DailyHadithHubTool />}

        {/* هـ: الصوتيات ودعاء الختمة والرقية الشرعية */}
        {activeTab === "audios" && <AudioDuasAndRuqyahHub />}

        {/* و: المكتبة الرقمية المستقلة (25 كتاباً) */}
        {activeTab === "digital_library" && <DigitalEbooksLibraryHub />}

        {/* ز: موسوعة قصص الأنبياء والسيرة والصحابة التفاعلية */}
        {activeTab === "stories_reading" && <StoriesAndSeerahEncyclopediaHub />}

        {/* حـ: صانع الريلز القرآني المطور */}
        {activeTab === "reels" && <InteractiveReelsStudio />}

        {/* ط: صانع الريلز القصصي والسير المطور */}
        {activeTab === "stories_reels" && <AdvancedReelsMaker />}

        {/* ي: أذكار الصباح والمساء التفاعلية */}
        {activeTab === "adhkar" && <AdhkarDailyTool />}

        {/* ك: مواقيت الصلاة اليوم بالـ GPS والتوقيت الفلكي */}
        {activeTab === "prayer_times" && <PrayerTimesLiveTool />}

        {/* ل: اتجاه القبلة التفاعلي والبوصلة الحية */}
        {activeTab === "qibla" && <QiblaFinderTool />}

        {/* م: التقويم الإسلامي وتنزيل المناسبات (ICS / Google) */}
        {activeTab === "calendar" && <IslamicCalendarEventsTool />}

        {/* ن: مجمع الأدوات والخدمات الإسلامية الموحد */}
        {activeTab === "islamic_tools" && <MasterIslamicToolsHub />}

      </main>

      <LibrarySearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* 3. الفووتر الموحد المشتمل على الخصوصية والواتساب والإيميل */}
      <footer className="mt-12 bg-slate-900/90 border-t border-slate-800 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          
          <div>
            <p className="font-bold text-amber-500 text-sm">منصة وتطبيق مَدار | MADAR</p>
            <p className="mt-1 leading-relaxed">
              منظومة إسلامية تفاعلية شاملة، قارئ مدمج، بث مباشر لإذاعة القرآن، وصانع ريلز وشورتس متطور.
            </p>
          </div>

          {/* وسائل التواصل وسياسة الخصوصية والبريد */}
          <div className="flex flex-col sm:flex-row items-center gap-4 font-semibold text-slate-300">
            <a href="/privacy" className="hover:text-amber-400 transition underline decoration-slate-700">
              🔒 سياسة الخصوصية
            </a>

            <span className="hidden sm:inline text-slate-700">•</span>

            <a
              href="mailto:contact@sana-madar.com"
              className="hover:text-amber-400 transition"
            >
              ✉️ البريد: contact@sana-madar.com
            </a>

            <span className="hidden sm:inline text-slate-700">•</span>

            <a
              href="https://wa.me/201099887766"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5"
            >
              <span>💬 واتساب الدعم: 201099887766+</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
          جميع الحقوق محفوظة لمنصة مَدار | MADAR © {currentYear} — صدقة جارية ونشر للقرآن والسنّة الشريفة.
        </div>
      </footer>

    </div>
  );
}