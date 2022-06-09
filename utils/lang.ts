interface LanguageConfig {
  lang: string;
  baseUrl: string;
  menuUrl: string;
  searchUrl: string;
  otherSizes: string;
  caloriesPrefix: string;
  measurementRegex: {
    carb: RegExp;
    protein: RegExp;
    fat: RegExp;
    calories: RegExp;
  };
  detailRegex?: {
    carb: RegExp;
    kcal: RegExp;
    kj: RegExp;
    fat: RegExp;
    protein: RegExp;
    saturated_fat: RegExp;
    colestrol: RegExp;
    sugar: RegExp;
    lif: RegExp;
    sodyum: RegExp;
  };
}

export const languanges: LanguageConfig[] = [
  {
    lang: "en",
    baseUrl: "https://www.fatsecret.com",
    menuUrl: "https://www.fatsecret.com/calories-nutrition",
    searchUrl: "https://www.fatsecret.com/calories-nutrition/search",
    otherSizes: "Other sizes:",
    caloriesPrefix: "kcal",
    measurementRegex: {
      carb: /Carbs:|g/g,
      protein: /Protein:|g/g,
      fat: /Fat:|g/g,
      calories: /Calories:|kcal/g,
    },
  },
  {
    lang: "id",
    baseUrl: "https://www.fatsecret.co.id",
    menuUrl: "https://www.fatsecret.co.id/kalori-gizi",
    searchUrl: "https://www.fatsecret.co.id/kalori-gizi/search",
    otherSizes: "Ukuran Lainnya:",
    caloriesPrefix: "kkal",
    measurementRegex: {
      carb: /Karb:|g/g,
      protein: /Prot:|g/g,
      fat: /Lemak:|g/g,
      calories: /Kalori:|kkal/g,
    },
  },
  {
    lang: "tr",
    baseUrl: "https://www.fatsecret.com.tr",
    menuUrl: "https://www.fatsecret.com.tr/kaloriler-beslenme",
    searchUrl: "https://www.fatsecret.com.tr/kaloriler-beslenme/search",
    otherSizes: "Diğer Boyutlar:",
    caloriesPrefix: "kcal",
    measurementRegex: {
      carb: /Karb:|g/g,
      protein: /Prot:|g/g,
      fat: /Yağ:|g/g,
      calories: /Kaloriler:|kcal/g,
    },
    detailRegex: {
      carb: /Karbonhidratlar|g/g,
      protein: /Protein|g/g,
      fat: /Yağ|g/g,
      kcal: /kcal/g,
      kj: /Enerji|kj/g,
      saturated_fat: /Doymuş Yağ|g/g,
      colestrol: /Kolesterol|mg/g,
      sugar: /Şeker|g/g,
      lif: /Fiber|g/g,
      sodyum: /Sodyum|mg/g,
    },
  },
];

export function getLang(langCode: string): LanguageConfig | null {
  const lang = languanges.filter((lg) => lg.lang === langCode)[0];
  return lang || null;
}
