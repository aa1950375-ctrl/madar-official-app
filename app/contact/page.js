"use client";
import React, { useState } from "react";
import { PLATFORM_INFO } from "@/lib/islamicData";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* العنوان الرئيسي */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            تواصل معنا
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500">اتصل بأسرة منصة مَدار</h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            نسعد بتلقي استفساراتكم، مقترحاتكم، أو أي ملاحظات لتطوير خدمات المنصة وصانع الريلز القرآني والقصصي.
          </p>
        </div>

        {/* بطاقات التواصل المباشر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الواتساب المباشر */}
          <a
            href={PLATFORM_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-slate-900 border border-emerald-500/30 hover:border-emerald-500 rounded-2xl flex items-center gap-4 transition shadow-xl group"
          >
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
              💬
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">التواصل عبر الواتساب</h3>
              <p className="text-xs text-slate-400 mt-1" dir="ltr">{PLATFORM_INFO.contact.whatsapp}</p>
              <span className="text-xs text-emerald-400 font-bold mt-2 inline-block">محادثة مباشرة الآن ←</span>
            </div>
          </a>

          {/* البريد الإلكتروني */}
          <a
            href={`mailto:${PLATFORM_INFO.contact.email}`}
            className="p-6 bg-slate-900 border border-amber-500/30 hover:border-amber-500 rounded-2xl flex items-center gap-4 transition shadow-xl group"
          >
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
              ✉️
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">البريد الإلكتروني</h3>
              <p className="text-xs text-slate-400 mt-1">{PLATFORM_INFO.contact.email}</p>
              <span className="text-xs text-amber-400 font-bold mt-2 inline-block">إرسال رسالة إلكترونية ←</span>
            </div>
          </a>
        </div>

        {/* نموذج المراسلة المباشر */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-2xl">
          <h2 className="text-xl font-bold text-amber-500 mb-2">أرسل لنا رسالة مباشرة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكريم</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ادخل اسمك"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-sm text-white rounded-xl p-3 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@mail.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-sm text-white rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">الرسالة أو الملاحظة</label>
            <textarea
              rows="4"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="اكتب رسالتك هنا..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-sm text-white rounded-xl p-3 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow-lg"
          >
            {sent ? "✓ تم إرسال رسالتك بنجاح!" : "إرسال الرسالة"}
          </button>
        </form>

      </div>
    </div>
  );
}