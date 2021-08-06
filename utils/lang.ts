interface LanguageConfig {
  lang: string;
  menuUrl: string;
  searchUrl: string;
  otherSizes: string;
  caloriesPrefix: string;
  measurementRegex: {
    carb: RegExp,
    protein: RegExp,
    fat: RegExp,
    calories: RegExp
  }
}

export const languanges: LanguageConfig[] = [
  {
    lang: 'en',
    menuUrl: 'https://www.fatsecret.com/calories-nutrition/',
    searchUrl: 'https://www.fatsecret.com/calories-nutrition/search',
    otherSizes: 'Other sizes:',
    caloriesPrefix: 'kcal',
    measurementRegex: {
      carb: /Carbs:|g/g,
      protein: /Protein:|g/g,
      fat: /Fat:|g/g,
      calories: /Calories:|kcal/g
    }
  },
  {
    lang: 'id',
    menuUrl: 'https://www.fatsecret.co.id/kalori-gizi/',
    searchUrl: 'https://www.fatsecret.co.id/kalori-gizi/search',
    otherSizes: 'Ukuran Lainnya:',
    caloriesPrefix: 'kkal',
    measurementRegex: {
      carb: /Karb:|g/g,
      protein: /Prot:|g/g,
      fat: /Lemak:|g/g,
      calories: /Kalori:|kkal/g
    }
  }
]

export function getLang (langCode: string): LanguageConfig | null {
  const lang = languanges.filter((lg) => lg.lang === langCode)[0]
  return lang || null
}
