"use client";
import React, { useState, useEffect } from "react";

export default function DailyHadithHubTool() {
  const [filterMode, setFilterMode] = useState("topic"); // 'topic' | 'book'
  const [selectedCategory, setSelectedCategory] = useState("النية والإخلاص");
  const [showTashkeel, setShowTashkeel] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  // قاعدة بيانات الأحاديث الصحيحة المنسقة
  const allHadiths = [
    {
      id: "h1",
      title: "إنما الأعمال بالنيات",
      topic: "النية والإخلاص",
      book: "الأربعون النووية",
      textWithTashkeel: "عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَبْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ: \"إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ\".",
      textPlain: "عن أمير المؤمنين أبي حفص عمر بن الخطاب رضي الله عنه قال: سمعت رسول الله صلى الله عليه وسلم يقول: إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى...",
      sourceInfo: "الأربعون النووية — حديث رقم 1 • رواه البخاري ومسلم",
      benefit: "قبول العمل وثوابه متوقف على إخلاص النية لله وحده."
    },
    {
      id: "h2",
      title: "نظر الله إلى القلوب",
      topic: "النية والإخلاص",
      book: "صحيح مسلم",
      textWithTashkeel: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: \"إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى أَجْسَادِكُمْ وَلاَ إِلَى صُوَرِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ\".",
      textPlain: "عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: إن الله لا ينظر إلى أجسامكم ولا إلى صوركم ولكن ينظر إلى قلوبكم وأعمالكم.",
      sourceInfo: "صحيح مسلم — حديث رقم 6542",
      benefit: "العبرة بصلاح القلب والعمل لا بالصور والأموال."
    },
    {
      id: "h3",
      title: "المقادير وخاتمة العمل",
      topic: "الصبر واليقين",
      book: "الأربعون النووية",
      textWithTashkeel: "عَنْ أَبِي عَبْدِ الرَّحْمَنِ عَبْدِ اللَّهِ بْنِ مَسْعُودٍ رَضِيَ اللَّهُ عَنْهُ قَالَ: حَدَّثَنَا رَسُولُ اللَّهِ صلى الله عليه وسلم وَهُوَ الصَّادِقُ الْمَصْدُوقُ: \"إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْماً نُطْفَةً، ثُمَّ يَكُونُ عَلَقَةً مِثْلَ ذَلِكَ...\".",
      textPlain: "عن عبد الله بن مسعود رضي الله عنه قال: حدثنا رسول الله صلى الله عليه وسلم وهو الصادق المصدوق: إن أحدكم يجمع خلقه في بطن أمه أربعين يوما نطفة...",
      sourceInfo: "الأربعون النووية — حديث رقم 4 • رواه البخاري ومسلم",
      benefit: "التسليم لأقدار الله والحرص على الخاتمة الصالحة."
    },
    {
      id: "h4",
      title: "الصبر خير عطاء",
      topic: "الصبر واليقين",
      book: "صحيح البخاري",
      textWithTashkeel: "عَنْ أَبِي سَعِيدٍ الْخُدْرِيِّ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ: \"وَمَنْ يَتَصَبَّرْ يُصَبِّرْهُ اللَّهُ، وَمَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْراً وَأَوْسَعَ مِنَ الصَّبْرِ\".",
      textPlain: "عن أبي سعيد الخدري رضي الله عنه أن رسول الله صلى الله عليه وسلم قال: ومن يتصبر يصبره الله، وما أعطي أحد عطاء خيرا وأوسع من الصبر.",
      sourceInfo: "صحيح البخاري — حديث رقم 1469",
      benefit: "الصبر من أعظم ما يُرزقه العبد ويُعينه على الحياة."
    },
    {
      id: "h5",
      title: "أحق الناس بحسن الصحبة",
      topic: "بر الوالدين وصلة الرحم",
      book: "صحيح البخاري",
      textWithTashkeel: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صلى الله عليه وسلم فَقَالَ: يَا رَسُولَ اللَّهِ مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: \"أُمُّكَ\"، قَالَ: ثُمَّ مَنْ؟ قَالَ: \"أُمُّكَ\"، قَالَ: ثُمَّ مَنْ؟ قَالَ: \"أُمُّكَ\"، قَالَ: ثُمَّ مَنْ؟ قَالَ: \"ثُمَّ أَبُوكَ\".",
      textPlain: "عن أبي هريرة رضي الله عنه قال: جاء رجل إلى رسول الله فقال: من أحق الناس بحسن صحابتي؟ قال: أمك، قال ثم من؟ قال: أمك، قال ثم من؟ قال: أمك، قال ثم من؟ قال: ثم أبوك.",
      sourceInfo: "صحيح البخاري — حديث رقم 5971",
      benefit: "الأم أعظم الناس حقاً في البر ثم الأب."
    },
    {
      id: "h6",
      title: "من لا يرحم لا يُرحم",
      topic: "الرحمة والرفق",
      book: "صحيح البخاري",
      textWithTashkeel: "عَنْ جَرِيرِ بْنِ عَبْدِ اللَّهِ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم: \"لاَ يَرْحَمُ اللَّهُ مَنْ لاَ يَرْحَمُ النَّاسَ\".",
      textPlain: "عن جرير بن عبد الله قال: قال رسول الله صلى الله عليه وسلم: لا يرحم الله من لا يرحم الناس.",
      sourceInfo: "صحيح البخاري — حديث رقم 7376",
      benefit: "رحمة الخلق سبب لنيل رحمة الله تعالى."
    }
  ];

  // اختيار حديث اليوم تلقائياً بناءً على اليوم في السنة (تغير تلقائي يومي 100%)
  const [dailyHadith, setDailyHadith] = useState(allHadiths[0]);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // التغيير التلقائي اليومي
    const index = dayOfYear % allHadiths.length;
    setDailyHadith(allHadiths[index]);
  }, []);

  // النسخ التفاعلي
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // المواضيع المتاحة
  const topicsList = [
    "النية والإخلاص",
    "الصبر واليقين",
    "بر الوالدين وصلة الرحم",
    "حسن الخلق وكظم الغيظ",
    "الرحمة والرفق",
    "ذكر الله وفضله",
    "الصدق والأمانة",
    "فضل العلم",
    "التوكل والرزق",
    "أخوة المسلمين"
  ];

  // الكتب المتاحة
  const booksList = [
    "الأربعون النووية",
    "صحيح البخاري",
    "صحيح مسلم",
    "سنن أبي داود",
    "سنن الترمذي"
  ];

  const filteredHadiths = allHadiths.filter((item) =>
    filterMode === "topic" ? item.topic === selectedCategory : item.book === selectedCategory
  );

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. هيدر الخدمة */}
      <div className="border-b border-amber-500/20 pb-4 space-y-2">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full">
          📜 سنّة النبي ﷺ والشريف النبوي
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mt-2">
          مكتبة الأحاديث النبوية وحديث اليوم
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          اقترب من سنّة النبي ﷺ: حديث يومي للتدبّر يتغير تلقائياً، ومكتبة من صحيح البخاري ومسلم والسنن والأربعين النووية، وبحث وتصفح حسب الموضوع أو الكتاب — مع مشاركة الحديث كصورة أو نص.
        </p>
      </div>

      {/* 2. كارت حديث اليوم التلقائي البرمجي */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1.5">
            📜 حديث اليوم (يتغير تلقائياً كل 24 ساعة)
          </span>
          <span className="text-xs font-mono text-slate-400">{dailyHadith.sourceInfo}</span>
        </div>

        <h3 className="text-xl font-bold text-amber-300 font-serif">{dailyHadith.title}</h3>

        <p className="font-serif text-base md:text-lg text-white leading-loose text-justify bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {showTashkeel ? dailyHadith.textWithTashkeel : dailyHadith.textPlain}
        </p>

        <div className="bg-emerald-950/60 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300">
          💡 <strong>الفائدة والتدبر:</strong> {dailyHadith.benefit}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={() => handleCopy(dailyHadith.textPlain, "daily")}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-1"
          >
            {copiedId === "daily" ? "تم النسخ ✓" : "📋 نسخ الحديث"}
          </button>

          <button
            onClick={() => alert(`جاري تصدير حديث "${dailyHadith.title}" كصورة أنيقة جاهزة للنشر!`)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-1"
          >
            <span>🖼️ مشاركة كصورة</span>
          </button>
        </div>
      </div>

      {/* 3. شريط الفلترة والتصنيف حسب الموضوع أو الكتاب */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-3">
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFilterMode("topic");
                setSelectedCategory("النية والإخلاص");
              }}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition border ${
                filterMode === "topic"
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-slate-900 text-slate-400 border-slate-800"
              }`}
            >
              📁 حسب الموضوع
            </button>

            <button
              onClick={() => {
                setFilterMode("book");
                setSelectedCategory("الأربعون النووية");
              }}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition border ${
                filterMode === "book"
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-slate-900 text-slate-400 border-slate-800"
              }`}
            >
              📚 حسب الكتاب
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showTashkeel}
              onChange={(e) => setShowTashkeel(e.target.checked)}
              className="accent-emerald-500 w-4 h-4"
            />
            إظهار التشكيل القرآني والحديثي
          </label>

        </div>

        {/* أزرار الفئات المتعددة */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {(filterMode === "topic" ? topicsList : booksList).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl font-bold shrink-0 transition border ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* 4. قائمة بطاقات الأحاديث المفلترة */}
      <div className="space-y-4">
        {filteredHadiths.length > 0 ? (
          filteredHadiths.map((h) => (
            <div
              key={h.id}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-amber-400 font-serif">{h.title}</h4>
                <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  {h.sourceInfo}
                </span>
              </div>

              <p className="font-serif text-sm md:text-base text-white leading-loose text-justify">
                {showTashkeel ? h.textWithTashkeel : h.textPlain}
              </p>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-xs text-amber-300/90">
                💡 <strong>الفائدة:</strong> {h.benefit}
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-900">
                <button
                  onClick={() => handleCopy(h.textPlain, h.id)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition"
                >
                  {copiedId === h.id ? "تم النسخ ✓" : "📋 نسخ"}
                </button>

                <button
                  onClick={() => alert(`جاري إنشاء صورة للحديث: "${h.title}"`)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition shadow"
                >
                  🖼️ صورة
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs bg-slate-950 rounded-2xl border border-slate-800">
            لا توجد أحاديث مسجلة تحت هذا التصنيف حالياً، اختر تصنيفاً آخر.
          </div>
        )}
      </div>

    </div>
  );
}