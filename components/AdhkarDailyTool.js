"use client";
import React, { useState } from "react";

export default function AdhkarDailyTool() {
  const [activeTab, setActiveTab] = useState("sabah"); // 'sabah' | 'massa'
  const [showFadlId, setShowFadlId] = useState(null);

  // أذكار الصباح والمساء بالكامل مع العداد والفضل
  const adhkarData = {
    sabah: [
      {
        id: "s1",
        text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ.",
        count: 1,
        fadl: "من قالها أصبح شاكراً ليومه ومستعيذاً بالله من شره."
      },
      {
        id: "s2",
        text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.",
        count: 1,
        fadl: "من أذكار الصباح المأثورة عن النبي صلى الله عليه وسلم."
      },
      {
        id: "s3",
        text: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.",
        count: 1,
        fadl: "سيد الاستغفار: من قالها موقناً بها حين يصبح فمات من يومه دخل الجنة."
      },
      {
        id: "s4",
        text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ.",
        count: 3,
        fadl: "تكرر 3 مرات في الصباح والمساء للسلامة والعافية."
      },
      {
        id: "s5",
        text: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.",
        count: 7,
        fadl: "من قالها 7 مرات حين يصبح وحين يمسي كفاه الله ما أهمه من أمر الدنيا والآخرة."
      }
    ],
    massa: [
      {
        id: "m1",
        text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا.",
        count: 1,
        fadl: "من قالها حين يمسي كفاه الله شر ليلته."
      },
      {
        id: "m2",
        text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.",
        count: 1,
        fadl: "من أذكار المساء العظيمة."
      },
      {
        id: "m3",
        text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.",
        count: 3,
        fadl: "من قالها حين يمسي لم تضره حُمَة ولا شيء في تلك الليلة."
      },
      {
        id: "m4",
        text: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ...",
        count: 1,
        fadl: "آية الكرسي: من قرأها حين يمسي أُجير من الجن حتى يصبح."
      }
    ]
  };

  // حالة العدادات التفاعلية لكل ذكر
  const [counts, setCounts] = useState(() => {
    const initialCounts = {};
    [...adhkarData.sabah, ...adhkarData.massa].forEach((item) => {
      initialCounts[item.id] = item.count;
    });
    return initialCounts;
  });

  // تقليل العداد عند ضغط زر تسبيح
  const handleDecrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0
    }));
  };

  // إعادة ضبط العدادات
  const handleReset = () => {
    const resetCounts = {};
    [...adhkarData.sabah, ...adhkarData.massa].forEach((item) => {
      resetCounts[item.id] = item.count;
    });
    setCounts(resetCounts);
  };

  const currentList = adhkarData[activeTab];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 space-y-6 shadow-2xl text-slate-100 font-sans">
      
      {/* 1. الهيدر التعريفي */}
      <div className="border-b border-amber-500/20 pb-4 space-y-2 text-center sm:text-right">
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3.5 py-1 rounded-full">
          📿 حصن المسلم والذكر اليومي
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mt-2">
          أذكار الصباح والمساء
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          احرص على حصنك اليومي: أذكار الصباح والمساء الصحيحة كاملةً مع عدّاد لكل ذكر يتذكّر أين وصلت، حتى تُكمل وردك بخشوع وبلا تشتيت.
        </p>
      </div>

      {/* 2. شريط التبديل وإعادة الضبط */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("sabah")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs transition border flex items-center justify-center gap-2 ${
              activeTab === "sabah"
                ? "bg-emerald-600 text-white border-emerald-500 shadow-lg"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
            }`}
          >
            <span>🌅 أذكار الصباح</span>
          </button>

          <button
            onClick={() => setActiveTab("massa")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs transition border flex items-center justify-center gap-2 ${
              activeTab === "massa"
                ? "bg-emerald-600 text-white border-emerald-500 shadow-lg"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
            }`}
          >
            <span>🌙 أذكار المساء</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded-xl text-xs font-bold transition"
        >
          🔄 إعادة ضبط العدادات
        </button>

      </div>

      {/* 3. قائمة بطاقات الأذكار */}
      <div className="space-y-4">
        {currentList.map((item) => {
          const currentVal = counts[item.id];
          const isFinished = currentVal === 0;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition space-y-4 ${
                isFinished
                  ? "bg-slate-950/40 border-slate-800/50 opacity-60"
                  : "bg-slate-950 border-slate-800 hover:border-amber-500/30"
              }`}
            >
              {/* نص الذكر الشريف */}
              <p className="font-serif text-base md:text-lg text-white leading-loose text-center sm:text-right">
                {item.text}
              </p>

              {/* الفضل والنص الفقهي إن وجد */}
              {showFadlId === item.id && (
                <div className="bg-slate-900 p-3 rounded-xl border border-amber-500/20 text-xs text-amber-300 animate-fadeIn">
                  💡 <strong>الفضل والأثر:</strong> {item.fadl}
                </div>
              )}

              {/* أزرار التسبيح والتدبر */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-900">
                
                <button
                  onClick={() => setShowFadlId(showFadlId === item.id ? null : item.id)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <span>📖 تدبّر والفضل</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-bold">
                    التكرار المتبقي: <strong className="text-amber-400 font-mono text-sm">{currentVal}</strong>
                  </span>

                  <button
                    onClick={() => handleDecrement(item.id)}
                    disabled={isFinished}
                    className={`px-5 py-2 rounded-xl font-bold text-xs transition shadow-md flex items-center gap-1.5 ${
                      isFinished
                        ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400"
                    }`}
                  >
                    {isFinished ? "تم بنجاح ✓" : "تسبيح 📿"}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}