// lib/islamicToolsApi.js

const ALADHAN_BASE_URL = "https://api.aladhan.com/v1";

// 1. جلب مواقيت الصلاة والتاريخ الهجري بناءً على الإحداثيات (GPS) أو اسم المدينة
export async function getPrayerTimesAndHijri(latitude, longitude) {
  try {
    // method 5: العيئة العامة المصرية للمساحة (يمكن تغيير طريقة الحساب)
    const res = await fetch(
      `${ALADHAN_BASE_URL}/timings?latitude=${latitude}&longitude=${longitude}&method=5`
    );
    const data = await res.json();
    return {
      timings: data.data.timings, // الفجر، الشروق، الظهر، العصر، المغرب، العشاء
      date: data.data.date,       // التاريخ الهجري والميلادي التفصيلي
      meta: data.data.meta,       // المنطقة الزمنية والتوقيت
    };
  } catch (error) {
    console.error("خطأ في جلب مواقيت الصلاة والتاريخ الهجري:", error);
    return null;
  }
}

// 2. حساب اتجاه القبلة (درجة الزاوية بالنسبة للشمال)
export async function getQiblaDirection(latitude, longitude) {
  try {
    const res = await fetch(`${ALADHAN_BASE_URL}/qibla/${latitude}/${longitude}`);
    const data = await res.json();
    return data.data.direction; // الزاوية بالدرجات (مثال: 136.5°)
  } catch (error) {
    console.error("خطأ في تحديد اتجاه القبلة:", error);
    return null;
  }
}

// 3. جلب التقويم الهجري الكامل لشهر معين
export async function getHijriCalendar(month, year) {
  try {
    const res = await fetch(`${ALADHAN_BASE_URL}/gregorianToHijriCalendar/${month}/${year}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("خطأ في جلب التقويم الهجري:", error);
    return [];
  }
}

// 4. جلب قائمة إذاعات القرآن الكريم الحية (إذاعة القاهرة، مكة، وتلاوات المشايخ)
export async function getQuranRadios() {
  try {
    const res = await fetch("https://mp3quran.net/api/v3/radios?language=ar");
    const data = await res.json();
    return data.radios; // تحتوي على اسم الإذاعة والرابط الحي المباشر (URL)
  } catch (error) {
    console.error("خطأ في جلب قائمة الإذاعات الحية:", error);
    return [];
  }
}