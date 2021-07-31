interface LanguageConfig {
  lang: string;
  menuUrl: string;
  searchUrl: string;
  otherSizes: string;
}

export const languanges: LanguageConfig[] = [
  {
    lang: 'en',
    menuUrl: 'https://www.fatsecret.com/calories-nutrition/',
    searchUrl: 'https://www.fatsecret.com/calories-nutrition/search',
    otherSizes: 'Other sizes:'
  },
  {
    lang: 'id',
    menuUrl: 'https://www.fatsecret.co.id/kalori-gizi/',
    searchUrl: 'https://www.fatsecret.co.id/kalori-gizi/search',
    otherSizes: 'Ukuran Lainnya:'
  }
]

export function getLang (langCode: string): LanguageConfig | null {
  const lang = languanges.filter((lg) => lg.lang === langCode)[0]
  return lang || null
}
