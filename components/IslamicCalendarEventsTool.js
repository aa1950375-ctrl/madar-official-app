"use client";
import React, { useState, useEffect } from "react";

export default function IslamicCalendarEventsTool() {
  // السنة الهجرية الحالية (مثلاً 1448 هـ)
  const [hijriYear, setHijriYear] = useState(1448);
  const [today, setToday] = useState(new Date("2026-10-24"));

  useEffect(() => {
    setToday(new Date());
  }, []);

  // قائمة المناسبات الهجرية الكبرى مع مواعيدها التقريبية لعام 1448 هـ
  const baseEvents = [
    {
      id: "hijri_new_year",
      title: "رأس السنة الهجرية",
      icon: "🌙",
      hijriDate: "1 محرّم",
      dayName: "الثلاثاء",
      gregorianDateStr: "16 يونيو 2026",
      gregorianDate: new Date("2026-06-16"),
      description: "بداية العام الهجري الجديد",
    },
    {
      id: "ashura",
      title: "يوم عاشوراء",
      icon: "🔲",
      hijriDate: "10 محرّم",
      dayName: "الخميس",
      gregorianDateStr: "25 يونيو 2026",
      gregorianDate: new Date("2026-06-25"),
      description: "يُستحبّ صيامه، ويُسنّ صيام التاسع (تاسوعاء) معه",
    },
    {
      id: "mawlid",
      title: "المولد النبوي الشريف",
      icon: "🕌",
      hijriDate: "12 ربيع الأول",
      dayName: "الثلاثاء",
      gregorianDateStr: "25 أغسطس 2026",
      gregorianDate: new Date("2026-08-25"),
      description: "ذكرى مولد النبي محمد ﷺ",
    },
    {
      id: "isra_miraj",
      title: "الإسراء والمعراج",
      icon: "✨",
      hijriDate: "27 رجب",
      dayName: "الثلاثاء",
      gregorianDateStr: "5 يناير 2027",
      gregorianDate: new Date("2027-01-05"),
      description: "ذكرى رحلة الإسراء والمعراج",
    },
    {
      id: "nisf_shaaban",
      title: "ليلة النصف من شعبان",
      icon: "🌕",
      hijriDate: "15 شعبان",
      dayName: "السبت",
      gregorianDateStr: "23 يناير 2027",
      gregorianDate: new Date("2027-01-23"),
      description: "ليلة مباركة تُحول فيها القبلة وفضل العبادة فيها",
    },
    {
      id: "ramadan_first",
      title: "أول شهر رمضان",
      icon: "🌙",
      hijriDate: "1 رمضان",
      dayName: "الإثنين",
      gregorianDateStr: "8 فبراير 2027",
      gregorianDate: new Date("2027-02-08"),
      description: "بداية شهر الصيام (تُحدَّد بالرؤية)",
    },
    {
      id: "laylat_al_qadr",
      title: "ليلة القدر (أرجى ليلة)",
      icon: "⭐",
      hijriDate: "27 رمضان",
      dayName: "السبت",
      gregorianDateStr: "6 مارس 2027",
      gregorianDate: new Date("2027-03-06"),
      description: "تُلتمس في العشر الأواخر، وأرجاهَا ليلة 27",
    },
    {
      id: "eid_fitr",
      title: "عيد الفطر",
      icon: "🎉",
      hijriDate: "1 شوّال",
      dayName: "الثلاثاء",
      gregorianDateStr: "9 مارس 2027",
      gregorianDate: new Date("2027-03-09"),
      description: "الأول من شوّال - عيد الفطر المبارك",
    },
    {
      id: "dhul_hijjah_ten",
      title: "أول ذي الحجة (العشر)",
      icon: "🕋",
      hijriDate: "1 ذو الحجة",
      dayName: "الجمعة",
      gregorianDateStr: "7 مايو 2027",
      gregorianDate: new Date("2027-05-07"),
      description: "أفضل أيام السنة للعمل الصالح",
    },
    {
      id: "day_of_arafah",
      title: "يوم عرفة",
      icon: "🤲",
      hijriDate: "9 ذو الحجة",
      dayName: "السبت",
      gregorianDateStr: "15 مايو 2027",
      gregorianDate: new Date("2027-05-15"),
      description: "يُستحبّ صيامه لغير الحاجّ",
    },
    {
      id: "eid_adha",
      title: "عيد الأضحى",
      icon: "🐑",
      hijriDate: "10 ذو الحجة",
      dayName: "الأحد",
      gregorianDateStr: "16 مايو 2027",
      gregorianDate: new Date("2027-05-16"),
      description: "العاشر من ذي الحجة - يوم النحر",
    },
    {
      id: "tashreeq_days",
      title: "أيام التشريق",
      icon: "🍢",
      hijriDate: "11 ذو الحجة",
      dayName: "الإثنين",
      gregorianDateStr: "17 مايو 2027",
      gregorianDate: new Date("2027-05-17"),
      description: "11-13 ذو الحجة - أيام أكل وشرب وذكر لله",
    },
  ];

  // حساب فرق الأيام بين اليوم وتاريخ المناسبة
  const getDaysDiff = (targetDate) => {
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // توليد رابط إضافة الحدث لتقويم جوجل Google Calendar
  const getGoogleCalendarUrl = (ev) => {
    const dateStr = ev.gregorianDate.toISOString().replace(/-|:|\.\d\d\d/g, "").slice(0, 8);
    const title = encodeURIComponent(`${ev.title} (${ev.hijriDate} ${hijriYear} هـ)`);
    const details = encodeURIComponent(`${ev.description}\nالتقويم الإسلامي للمناسبات الهجرية.`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}`;
  };

  // تنزيل ملف ICS فردي لمناسبة محددة
  const downloadSingleICS = (ev) => {
    const dateStr = ev.gregorianDate.toISOString().replace(/-|:|\.\d\d\d/g, "").slice(0, 8);
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MADAR ISLAMIC PLATFORM//EN
BEGIN:VEVENT
SUMMARY:${ev.title} (${ev.hijriDate} ${hijriYear} هـ)
DESCRIPTION:${ev.description}
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${dateStr}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${ev.id}_${hijriYear}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // تنزيل كل المناسبات في ملف ICS واحد
  const downloadAllICS = () => {
    let eventsBlocks = baseEvents
      .map((ev) => {
        const dateStr = ev.gregorianDate.toISOString().replace(/-|:|\.\d\d\d/g, "").slice(0, 8);
        return `BEGIN:VEVENT
SUMMARY:${ev.title} (${ev.hijriDate} ${hijriYear} هـ)
DESCRIPTION:${ev.description}
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${dateStr}
END:VEVENT`;
      })
      .join("\n");

    const fullICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MADAR ISLAMIC PLATFORM//EN
${eventsBlocks}
END:VCALENDAR`;

    const blob = new Blob([fullICS], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Islamic_Calendar_${hijriYear}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. العنوان والوصف التعريفي للخدمة */}
      <div className="border-b border-amber-500/20 pb-4 space-y-2">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
          🗓️ المناسبات والأعياد الإسلامية
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">
          التقويم الإسلامي ومواعيد المناسبات الهجرية
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          اعرف مواعيد كل المناسبات الإسلامية (رمضان، العيدان، عاشوراء، عرفة، المولد النبوي، الإسراء والمعراج، ليلة القدر...) بالتاريخ الميلادي مع عدٍّ تنازليٍّ لكل مناسبة، وتنقّل بين السنوات الهجرية، وأضِف أيّ مناسبة إلى تقويم جوجل أو حمّلها ملف ICS لتذكيرك.
        </p>
      </div>

      {/* 2. حاوية التقويم الرئيسية */}
      <div className="bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800/80 space-y-6">
        
        {/* أ: شريط التحكم والتنقل بين السنوات والهيجري */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          
          <button
            onClick={() => setHijriYear((y) => y - 1)}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md"
          >
            <span>◀ السنة السابقة</span>
          </button>

          <div className="text-center space-y-1">
            <h3 className="text-lg md:text-xl font-bold text-amber-400 flex items-center justify-center gap-2">
              <span>📅 التقويم الإسلامي لعام {hijriYear} هـ</span>
            </h3>
            <button
              onClick={() => setHijriYear(1448)}
              className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-bold hover:bg-emerald-900/50 transition"
            >
              ↩ العودة للسنة الحالية (1448 هـ)
            </button>
          </div>

          <button
            onClick={() => setHijriYear((y) => y + 1)}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md"
          >
            <span>السنة التالية ▶</span>
          </button>

        </div>

        {/* ب: زر تنزيل كافة المناسبات لملف ICS تقويم */}
        <div className="flex justify-center">
          <button
            onClick={downloadAllICS}
            className="px-5 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition flex items-center gap-2"
          >
            <span>📥 تنزيل كل المناسبات (ICS)</span>
          </button>
        </div>

        {/* جـ: قائمة بطاقات المناسبات الهجرية الكبرى */}
        <div className="space-y-4">
          {baseEvents.map((ev) => {
            const daysDiff = getDaysDiff(ev.gregorianDate);
            const isPast = daysDiff < 0;

            return (
              <div
                key={ev.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 md:p-5 transition space-y-3 relative overflow-hidden"
              >
                {/* شارة العد التنازلي أو مضت */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{ev.icon}</span>
                    <h4 className="text-base md:text-lg font-bold text-white">{ev.title}</h4>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isPast
                        ? "bg-slate-800 text-slate-500 border border-slate-700"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {isPast ? "مضت" : `بعد ${daysDiff} يوم`}
                  </span>
                </div>

                {/* تفاصيل التاريخ والتاريخ الميلادي */}
                <div className="text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-amber-400/90">
                    {ev.hijriDate} {hijriYear} هـ • {ev.dayName}، {ev.gregorianDateStr}
                  </p>
                  <p className="text-slate-400 text-[11px]">{ev.description}</p>
                </div>

                {/* أزرار الإضافة لتقويم جوجل وتنزيل ملف ICS */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                  <a
                    href={getGoogleCalendarUrl(ev)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow"
                  >
                    <span>📅 تقويم جوجل</span>
                  </a>

                  <button
                    onClick={() => downloadSingleICS(ev)}
                    className="px-3.5 py-2 bg-emerald-950 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-500/30 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    <span>📥 أضف لتقويمك (ICS)</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* د: ملاحظة إفادة الختام المنسقة */}
        <p className="text-[11px] text-slate-400 leading-relaxed text-center border-t border-slate-800/80 pt-4">
          التواريخ محسوبة بتقويم أُمّ القرى المدمج في متصفحك (بلا إنترنت ولا إرسال بيانات)، وقد تختلف يوماً واحداً عن الرؤية الشرعية المحلية — خاصةً بدايات رمضان والعيدين التي تُحدَّد بالرؤية. زر «أضف لتقويمك» يصدّر ملف ICS يعمل مع جوجل وآبل وأوتلوك، أو يفتح تقويم جوجل مباشرة.
        </p>

      </div>

    </div>
  );
}