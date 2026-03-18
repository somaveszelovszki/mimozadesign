export type WeddingCard = {
  slug: string
  image: string
  alt: string
  name: string
  subtitle: string
  description: string
  location: string
  weddingDate: string
  isFeatured: boolean
}

export const allWeddingCards: WeddingCard[] = [
  {
    slug: 'adri-david',
    image: '/wedding/adri-david/adri-david-profile.jpg',
    alt: 'Adri és Dávid esküvője',
    name: 'Adri és Dávid',
    subtitle: 'Szárazvirágos koncepció',
    description: 'Időtálló, bézs-barna tónusú dekoráció természetes textúrákkal.',
    location: 'Dabas, Jakab Lovasudvar',
    weddingDate: '2025. július 5.',
    isFeatured: true
  },
  {
    slug: 'reka-balint',
    image: '/wedding/reka-balint/reka-balint-profile.jpg',
    alt: 'Réka és Bálint esküvője',
    name: 'Réka és Bálint',
    subtitle: 'Vadvirágos hangulat',
    description: 'Élénk, játékos színvilág, amely a pár energikus stílusát emeli ki.',
    location: 'Szomód, Pikant Pajta',
    weddingDate: '2024. május 17.',
    isFeatured: true
  },
  {
    slug: 'dori-david',
    image: '/wedding/dori-david/dori-david-profile.jpg',
    alt: 'Dóri és Dávid esküvője',
    name: 'Dóri és Dávid',
    subtitle: 'Őszi rusztikus dekor',
    description: 'Erdei ihletésű kompozíciók mély terrakotta és moha zöld árnyalatokkal.',
    location: 'Verőce, Lósi Major',
    weddingDate: '2023. szeptember 2.',
    isFeatured: true
  },
  {
    slug: 'anna-bence',
    image: '/wedding/anna-bence/anna-bence-profile.jpg',
    alt: 'Anna és Bence esküvője',
    name: 'Anna és Bence',
    subtitle: 'Méhlegelő inspiráció',
    description: 'Finom, késő őszi virágvilág letisztult, romantikus részletekkel.',
    location: 'Budapest szívében',
    weddingDate: '2025. november 8.',
    isFeatured: false
  },
  {
    slug: 'petra-mate',
    image: '/wedding/petra-mate/petra-mate-profile.jpg',
    alt: 'Petra és Máté esküvője',
    name: 'Petra és Máté',
    subtitle: 'Romantikus elegancia',
    description: 'Légies, harmonikus kompozíciók természetes tónusokkal és finom részletekkel.',
    location: 'Tata, Grill Étterem',
    weddingDate: '2025. március 29.',
    isFeatured: true
  }
]

export const featuredWeddings: WeddingCard[] = allWeddingCards.filter(wedding => wedding.isFeatured)
