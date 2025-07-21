export const translations = {
    en: {
        // Navigation
        home: "Home",
        quran: "Qur'an Reading",
        sibha: "Sibha",
        qibla: "Qibla Direction",
        live: "Makkah Live",

        // Home page
        prayerTimes: "Prayer Times",
        todaysPrayerTimes: "Today's Prayer Times",
        prayerCounter: "Daily Prayer Counter",
        nextPrayer: "Next",
        refresh: "Refresh",

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
    },
    ar: {
        // Navigation
        home: "الرئيسية",
        quran: "قراءة القرآن",
        sibha: "السبحة",
        qibla: "اتجاه القبلة",
        live: "بث مكة المباشر",

        // Home page
        prayerTimes: "أوقات الصلاة",
        todaysPrayerTimes: "أوقات صلاة اليوم",
        prayerCounter: "عداد الصلوات اليومية",
        nextPrayer: "التالية",
        refresh: "تحديث",

        // Prayer names
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
    },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
