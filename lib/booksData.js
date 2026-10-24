// lib/booksData.js

export const MADAR_LIBRARY_BOOKS = [
  {
    id: "seerah-ibn-hisham",
    title: "سيرة ابن هشام",
    author: "الإمام عبد الملك بن هشام",
    category: "السيرة النبوية",
    description: "المرجع العمدة والأشمل في سيرة النبي ﷺ، تهذيب وتلخيص سيرة ابن إسحاق.",
    chapters: [
      {
        id: "ch-1",
        title: "نسب النبي ﷺ وزواجه من السيدة خديجة",
        content: "هو محمد بن عبد الله بن عبد المطلب بن هاشم بن عبد مناف... ولما بلغ رسول الله صلى الله عليه وسلم خمساً وعشرين سنة تزوج خديجة بنت خويلد..."
      },
      {
        id: "ch-2",
        title: "نزول الوحي وبداية الدعوة بمكة",
        content: "بدأ الوحي لرسول الله صلى الله عليه وسلم بالرؤيا الصالحة في النوم، ثم حبب إليه الخلاء فكان يخلو بغار حراء..."
      }
    ]
  },
  {
    id: "shamail-tirmidhi",
    title: "الشمائل المحمدية",
    author: "الإمام أبو عيسى الترمذي",
    category: "الشمائل والأخلاق",
    description: "كتاب شامل يصف خلق وخُلق وصفات ونعوت النبي ﷺ الظاهرة والباطنة.",
    chapters: [
      {
        id: "ch-1",
        title: "باب ما جاء في خلق رسول الله ﷺ",
        content: "عن أنس بن مالك رضي الله عنه قال: كان رسول الله صلى الله عليه وسلم ليس بالطويل البائن ولا بالقصيرة، ولا بالأبيض الأمهق ولا بالأدم..."
      },
      {
        id: "ch-2",
        title: "باب ما جاء في خاتم النبوة",
        content: "عن السائب بن يزيد قال: ذهبت بي خالتي إلى النبي صلى الله عليه وسلم فقالت: يا رسول الله إن ابن أختي وجع، فمسح رأسي ودعا لي بالبركة ورأيت خاتم النبوة بين كتفيه..."
      }
    ]
  },
  {
    id: "qisas-al-anbiya",
    title: "قصص الأنبياء من البداية والنهاية",
    author: "الحافظ ابن كثير",
    category: "قصص الأنبياء",
    description: "عرض شامل وتوثيقي لقصص الأنبياء والرسل المذكورين في القرآن والسنة.",
    chapters: [
      {
        id: "ch-1",
        title: "قصة آدم عليه السلام واستخلافه في الأرض",
        content: "قال الله تعالى: ﴿وَإِذْ قَالَ رَبُّكَ لِلْمَلائِكَةِ إِنِّي جَاعِلٌ فِي الأَرْضِ خَلِيفَةً﴾... خلق الله آدم من قبضة قبضها من جميع الأرض..."
      }
    ]
  },
  {
    id: "irab-al-quran",
    title: "إعراب القرآن للنحاس",
    author: "الإمام أبو جعفر النحاس",
    category: "علوم القرآن والإعراب",
    description: "مرجع فريد في القواعد والتوجيه الإعرابي للآيات والسور القرآنية.",
    chapters: [
      {
        id: "ch-1",
        title: "إعراب سورة الفاتحة",
        content: "﴿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ﴾: الباء حرف جر، واسم مجرور بالباء وعلامة جره الكسرة، وهو مضاف، واللّه اسم الجلالة مضاف إليه..."
      }
    ]
  }
];

export function getBookById(bookId) {
  return MADAR_LIBRARY_BOOKS.find((b) => b.id === bookId) || null;
}

export function searchLibraryBooks(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  const results = [];

  MADAR_LIBRARY_BOOKS.forEach((book) => {
    book.chapters.forEach((chapter) => {
      if (chapter.title.includes(q) || chapter.content.includes(q)) {
        results.push({
          bookId: book.id,
          bookTitle: book.title,
          chapterTitle: chapter.title,
          snippet: chapter.content.substring(0, 150) + "...",
        });
      }
    });
  });

  return results;
}