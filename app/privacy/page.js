"use client";
import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto space-y-6 bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-2xl shadow-2xl">
        
        <div className="border-b border-amber-500/20 pb-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-500">سياسة الخصوصية وحماية البيانات</h1>
          <p className="text-xs text-slate-400 mt-2">منصة وتطبيق مَدار | MADAR</p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-slate-300 text-justify">
          <section>
            <h2 className="text-base font-bold text-amber-400 mb-1">1. مقدمة والتزام</h2>
            <p>
              نحترم خصوصية كل زائر ومستخدم لمنصة "مدار". تهدف هذه السياسة إلى توضيح كيفية تعاملنا مع البيانات، مع التأكيد المباشر على أن استخدامك للمنصة والتطبيق لا يتطلب جمع أي بيانات شخصية حساسة.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-amber-400 mb-1">2. البيانات والملفات المخزنة محلياً</h2>
            <p>
              تعتمد منصة "مدار" على التخزين المحلي في متصفحك (LocalStorage) فقط لحفظ تفضيلات القراءة، المظهر الليلي/النهاري، وأحدث موضع توقفت عنده في تصفح الكتب والمراجع، دون نقل هذه البيانات إلى أي سيرفرات خارجية.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-amber-400 mb-1">3. صانع الريلز والتصدير</h2>
            <p>
              جميع العمليات الخاصة بمعاينة وتوليد مقاطع الريلز القرآني والقصصي تتم محلياً داخل متصفحك عبر تقنيات HTML5 Canvas دون احتفاظ المنصة بملفات الميديا الخاصة بك.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-amber-400 mb-1">4. التواصل والتحديثات</h2>
            <p>
              في حال تواصلك معنا عبر البريد الإلكتروني أو الواتساب، يُستخدم عنوانك ورسالتك فقط للرد على استفسارك ومساعدتك ولا يتم مشاركته مع أي طرف ثالث.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}