export const translations = {
  en: {
    // Navigation
    home: "Home",
    quran: "Qur'an",
    sibha: "Tasbih Counter",
    qibla: "Qibla",
    live: "Live from Mecca",

    // Home page
    prayerTimes: "Prayer Times",
    todaysPrayerTimes: "Today's Prayer Times",
    prayerTracker: "Daily Prayer Tracker",
    nextPrayer: "Next",
    refresh: "Refresh",
    loading: "loading...",
    selectCity: "Select a city",
    usingGPS: "Using GPS",
    selectLocationMessage: "Please select a location to view prayer times",
    // Prayer names
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",

    // Location
    location: "Location",
    useGPS: "Use GPS",
    calculationMethod: "Calculation Method",

    // Other
    stayConnected: "Stay connected with your daily prayers",
    prayerTimesCalculated: "Prayer times calculated using the Aladhan API",
    timesInLocalTimezone: "Times are shown in your local timezone",
    language: "Language",

    // Days of week
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",

    // Gregorian months
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",

    // Hijri months
    muharram: "Muharram",
    safar: "Safar",
    rabiAlAwwal: "Rabi' al-awwal",
    rabiAlThani: "Rabi' al-thani",
    jumadaAlAwwal: "Jumada al-awwal",
    jumadaAlThani: "Jumada al-thani",
    rajab: "Rajab",
    shaban: "Sha'ban",
    ramadan: "Ramadan",
    shawwal: "Shawwal",
    dhuAlQadah: "Dhu al-Qi'dah",
    dhuAlHijjah: "Dhu al-Hijjah",
    // quran page
    quickAccess: "Quick access",
    surah: "Surah",
    juz: "Juz",
    ayat: "Ayat",
    noSurahsFound: "No sourahs found",
    loadingSurahs: "Loading Surahs",
    adhanFinished: "Adhan finished playing",
    adhanFinishedDescription: "May Allah accept good deeds from us and you",
    hidjriCalendar: "Hidjri Calendar",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    quran: "القرآن الكريم",
    sibha: "عداد التسبيح",
    qibla: "القبلة",
    live: "البث المباشر من مكة",

    // Home page
    prayerTimes: "أوقات الصلاة",
    todaysPrayerTimes: "أوقات صلاة اليوم",
    prayerTracker: "عداد الصلوات اليومية",
    nextPrayer: "التالية",
    refresh: "تحديث",
    loading: "تحميل...",
    selectCity: "إختر مدينة",
    usingGPS: "إستعمال GPS",
    selectLocationMessage:
      "الرجاء إستعمال إحداثيات الموقع لإظهار مواقيت الصلاة",
    // Prayer namess
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",

    // Location
    location: "الموقع",
    useGPS: "استخدام GPS",
    calculationMethod: "طريقة الحساب",

    // Other
    stayConnected: "ابق على تواصل مع صلواتك اليومية",
    prayerTimesCalculated: "أوقات الصلاة محسوبة باستخدام API الأذان",
    timesInLocalTimezone: "الأوقات معروضة بالتوقيت المحلي",
    language: "اللغة",

    // Days of week
    monday: "الاثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
    sunday: "الأحد",

    // Gregorian months
    january: "يناير",
    february: "فبراير",
    march: "مارس",
    april: "أبريل",
    may: "مايو",
    june: "يونيو",
    july: "يوليو",
    august: "أغسطس",
    september: "سبتمبر",
    october: "أكتوبر",
    november: "نوفمبر",
    december: "ديسمبر",

    // Hijri months
    muharram: "محرم",
    safar: "صفر",
    rabiAlAwwal: "ربيع الأول",
    rabiAlThani: "ربيع الثاني",
    jumadaAlAwwal: "جمادى الأولى",
    jumadaAlThani: "جمادى الثانية",
    rajab: "رجب",
    shaban: "شعبان",
    ramadan: "رمضان",
    shawwal: "شوال",
    dhuAlQadah: "ذو القعدة",
    dhuAlHijjah: "ذو الحجة",
    // quran page
    quickAccess: "الوصول السريع",
    surah: "سورة",
    juz: "جزء",
    ayat: "آية",
    noSurahsFound: "لا يوجد سورة",
    loadingSurahs: "تحميل السور",
    adhanFinished: "انتهى الأذان",
    adhanFinishedDescription: "تقبل الله منا ومنكم صالح الأعمال",
    hidjriCalendar: "التقويم الهجري",
  },
};
export const prayerNames = (isRTL: boolean) => {
  if (isRTL) return ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
  return ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
