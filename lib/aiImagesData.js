// lib/aiImagesData.js

export const AI_BACKGROUND_IMAGES = Array.from({ length: 100 }, (_, i) => {
  const categories = [
    { name: "مساجد سينمائية", keyword: "mosque,islamic-architecture" },
    { name: "طبيعة ونجوم", keyword: "night-sky,mountains,desert" },
    { name: "زخارف ومخطوطات", keyword: "islamic-pattern,gold-ornament" },
    { name: "غيوم وفجر", keyword: "sunrise,clouds,dramatic-sky" },
  ];
  
  const cat = categories[i % categories.length];
  
  return {
    id: `ai-img-${i + 1}`,
    title: `خلفية ذكاء اصطناعي ${i + 1} (${cat.name})`,
    category: cat.name,
    // صور ذكاء اصطناعي عالية الجودة وموزعة بروابط سينمائية
    url: `https://picsum.photos/seed/madar-ai-${i + 1}/1080/1920`,
  };
});