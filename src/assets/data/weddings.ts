export type WeddingPortfolio = {
  slug: string
  name: string
  caption: string
  coverImage: string
  images: string[]
}

export const weddingPortfolios: WeddingPortfolio[] = [
  {
    slug: 'dori-david',
    name: 'Dóri és Dávid',
    caption: 'Rusztikus stílusú, természetközeli dekor, az ősz színeivel.',
    coverImage: '/wedding/dori-david/dori-david-profile.jpg',
    images: [
      '/wedding/dori-david/dori-david-1.jpg',
      '/wedding/dori-david/dori-david-2.jpg',
      '/wedding/dori-david/dori-david-3.jpg',
      '/wedding/dori-david/dori-david-4.jpg',
      '/wedding/dori-david/dori-david-5.jpg',
      '/wedding/dori-david/dori-david-6.jpg'
    ]
  },
  {
    slug: 'reka-balint',
    name: 'Réka és Bálint',
    caption: 'Amilyen a pár, olyan a csokor. Vidám, sokszínű, élénk.',
    coverImage: '/wedding/reka-balint/reka-balint-profile.jpg',
    images: [
      '/wedding/reka-balint/reka-balint-1.jpg',
      '/wedding/reka-balint/reka-balint-2.jpg',
      '/wedding/reka-balint/reka-balint-3.jpg',
      '/wedding/reka-balint/reka-balint-4.jpg',
      '/wedding/reka-balint/reka-balint-5.jpg',
      '/wedding/reka-balint/reka-balint-6.jpg',
      '/wedding/reka-balint/reka-balint-7.jpg'
    ]
  },
  {
    slug: 'adri-david',
    name: 'Adri és Dávid',
    caption:
      'Szárazvirágból készült teljes dekoráció, amely a végtelenségig megőrzi az esküvő napjának gyönyörű emlékét.',
    coverImage: '/wedding/adri-david/adri-david-profile.jpg',
    images: ['/wedding/adri-david/adri-david.jpg']
  },
  {
    slug: 'petra-mate',
    name: 'Petra és Máté',
    caption: 'Elegáns, romantikus dekoráció finom természetes részletekkel.',
    coverImage: '/wedding/petra-mate/petra-mate-profile.jpg',
    images: [
      '/wedding/petra-mate/petra-mate-1.jpg',
      '/wedding/petra-mate/petra-mate-2.jpg',
      '/wedding/petra-mate/petra-mate-3.jpg',
      '/wedding/petra-mate/petra-mate-4.jpg'
    ]
  },
  {
    slug: 'anna-bence',
    name: 'Anna és Bence',
    caption: 'Méhlegelő ihletésű csokor, novemberi kivitelben.',
    coverImage: '/wedding/anna-bence/anna-bence-profile.jpg',
    images: [
      '/wedding/anna-bence/anna-bence-profile.jpg',
      '/wedding/anna-bence/anna-bence-1.jpg',
      '/wedding/anna-bence/anna-bence-2.jpg',
      '/wedding/anna-bence/anna-bence-3.jpg',
      '/wedding/anna-bence/anna-bence-4.jpg'
    ]
  }
]
