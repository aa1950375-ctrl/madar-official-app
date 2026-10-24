"use client";
import React, { useRef, useEffect, useState } from "react";
import { AI_BACKGROUND_IMAGES } from "@/lib/aiImagesData";

export default function ReelsPreviewCanvas({
  text = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  subTitle = "سورة الفاتحة",
  reciterName = "الشيخ مشاري العفاسي",
  audioUrl = "",
  textColor = "#ffffff",
  accentColor = "#d4af37",
  fontSize = 42,
  fontFamily = "Amiri",
  showOrnament = true,
  overlayOpacity = 0.4,
}) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  // 1. تحديد نمط الأبعاد للربط المرئي
  const [aspectRatio, setAspectRatio] = useState("shorts_high"); // 'shorts_high' | 'shorts_std' | 'vertical' | 'horizontal'
  const [bgType, setBgType] = useState("color"); // 'color' | 'image'
  const [bgValue, setBgValue] = useState("#0f172a");
  const [customImage, setCustomImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // أبعاد الشاشة بناءً على اختيار نوع المقطع
  const getCanvasDimensions = () => {
    switch (aspectRatio) {
      case "shorts_high": return { width: 1080, height: 1920, ratio: "9/16" };
      case "shorts_std":  return { width: 1080, height: 1440, ratio: "3/4" };
      case "vertical":    return { width: 1080, height: 1350, ratio: "4/5" };
      case "horizontal":  return { width: 1920, height: 1080, ratio: "16/9" };
      default:            return { width: 1080, height: 1920, ratio: "9/16" };
    }
  };

  const dimensions = getCanvasDimensions();

  // 2. معالجة رفع صورة شخصية من الجهاز
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setBgType("image");
        setBgValue(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const renderCanvas = () => {
      // رسم الخلفية
      if (bgType === "color") {
        ctx.fillStyle = bgValue || "#0f172a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawContent();
      } else if (bgType === "image") {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = bgValue;
        img.onload = () => {
          // محاذاة وتغطية كامل الشاشة (Object-fit: Cover)
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width / 2) - (img.width / 2) * scale;
          const y = (canvas.height / 2) - (img.height / 2) * scale;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          drawContent();
        };
        img.onerror = () => {
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          drawContent();
        };
      }
    };

    const drawContent = () => {
      // طبقة التعتيم السينمائية
      if (overlayOpacity > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${overlayOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // الإطار الإسلامي الزخرفي
      if (showOrnament) {
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 8;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      }

      // العناوين القارئ والسورة/القصة
      ctx.textAlign = "center";
      ctx.fillStyle = accentColor;
      ctx.font = `bold ${Math.round(dimensions.width * 0.042)}px ${fontFamily}, serif`;
      ctx.fillText(subTitle, canvas.width / 2, canvas.height * 0.12);

      if (reciterName) {
        ctx.fillStyle = "#e2e8f0";
        ctx.font = `${Math.round(dimensions.width * 0.032)}px ${fontFamily}, serif`;
        ctx.fillText(reciterName, canvas.width / 2, canvas.height * 0.16);
      }

      // النص القرآني/القصصي الرئيسي
      ctx.fillStyle = textColor;
      ctx.font = `${fontSize * (dimensions.width / 1080)}px ${fontFamily}, serif`;

      const words = text.split(" ");
      let line = "";
      let y = canvas.height / 2 - 40;
      const lineHeight = fontSize * 2.1;
      const maxWidth = canvas.width - 180;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, canvas.width / 2, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, y);

      // توقيع المنصة
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "24px sans-serif";
      ctx.fillText("منصة مَدار | MADAR", canvas.width / 2, canvas.height - 70);
    };

    renderCanvas();
  }, [
    text,
    subTitle,
    reciterName,
    bgType,
    bgValue,
    textColor,
    accentColor,
    fontSize,
    fontFamily,
    showOrnament,
    overlayOpacity,
    aspectRatio,
  ]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
      
      {/* 1. أزرار اختيار الأبعاد والاتجاهات للمقطع */}
      <div className="w-full space-y-2">
        <label className="block text-xs font-bold text-amber-500">اختر أبعاد واتجاه الفيديو:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
          <button
            onClick={() => setAspectRatio("shorts_high")}
            className={`p-2.5 rounded-xl border transition ${
              aspectRatio === "shorts_high"
                ? "bg-amber-500 text-slate-950 border-amber-400"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            📱 شورتس عالي (9:16)
          </button>

          <button
            onClick={() => setAspectRatio("shorts_std")}
            className={`p-2.5 rounded-xl border transition ${
              aspectRatio === "shorts_std"
                ? "bg-amber-500 text-slate-950 border-amber-400"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            📐 شورتس عادي (3:4)
          </button>

          <button
            onClick={() => setAspectRatio("vertical")}
            className={`p-2.5 rounded-xl border transition ${
              aspectRatio === "vertical"
                ? "bg-amber-500 text-slate-950 border-amber-400"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            🖼️ فيديو عمودي (4:5)
          </button>

          <button
            onClick={() => setAspectRatio("horizontal")}
            className={`p-2.5 rounded-xl border transition ${
              aspectRatio === "horizontal"
                ? "bg-amber-500 text-slate-950 border-amber-400"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            💻 فيديو أفقي (16:9)
          </button>
        </div>
      </div>

      {/* 2. خيارات اختيار صورة الخلفية (من الجهاز أو الذكاء الاصطناعي للموقع) */}
      <div className="w-full space-y-2 border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-amber-500">اختر خلفية الفيديو:</label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1"
          >
            📁 رفع صورة من جهازك
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* معرض صور الذكاء الاصطناعي بالموقع (أكثر من 100 صورة) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <button
            onClick={() => { setBgType("color"); setBgValue("#0f172a"); }}
            className={`w-14 h-14 rounded-xl shrink-0 border-2 font-bold text-[10px] bg-slate-900 flex items-center justify-center ${
              bgType === "color" ? "border-amber-500 text-amber-400" : "border-slate-800 text-slate-400"
            }`}
          >
            لون داكن
          </button>

          {AI_BACKGROUND_IMAGES.map((img) => (
            <button
              key={img.id}
              onClick={() => { setBgType("image"); setBgValue(img.url); }}
              className={`w-14 h-14 rounded-xl shrink-0 border-2 overflow-hidden relative transition ${
                bgValue === img.url ? "border-amber-500 scale-105 shadow-lg" : "border-slate-800 opacity-80 hover:opacity-100"
              }`}
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. شاشة المعاينة الحية للفيديو قبل الإنتاج والتصدير */}
      <div className="w-full flex flex-col items-center border-t border-slate-800 pt-4">
        <span className="text-xs font-semibold text-slate-400 mb-3">
          شاشة المعاينة الحية المباشرة (أبعاد: {dimensions.ratio})
        </span>

        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/50 bg-black max-w-full"
          style={{ width: aspectRatio === "horizontal" ? "420px" : "280px" }}
        >
          <canvas ref={canvasRef} className="w-full h-auto block" />
        </div>

        {/* أدوات المعاينة الصوتية والمرئية والتصدير */}
        <div className="flex items-center gap-3 mt-5 flex-wrap justify-center">
          {audioUrl && (
            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
          )}

          <button
            onClick={toggleAudio}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow-lg flex items-center gap-2 text-xs"
          >
            {isPlaying ? "⏸️ إيقاف المعاينة الحية" : "▶️ تشغيل المعاينة المباشرة للصوت والصورة"}
          </button>

          <button
            onClick={() => alert("جاري تجهيز واستخراج المقطع بأعلى دقة وفق الأبعاد المختارة...")}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow-lg text-xs flex items-center gap-2"
          >
            🎬 تصدير وإنتاج الفيديو النهائي
          </button>
        </div>
      </div>

    </div>
  );
}