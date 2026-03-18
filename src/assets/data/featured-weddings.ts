export type WeddingCard = {
  slug: string
  image: string
  alt: string
  name: string
  type: string
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
    type: 'Szárazvirágos koncepció',
    description: 'Időtálló, bézs-barna tónusú dekoráció természetes textúrákkal.',
    location: 'Szentendre',
    weddingDate: '2024. augusztus 24.',
    isFeatured: true
  },
  {
    slug: 'reka-balint',
    image: '/wedding/reka-balint/reka-balint-profile.jpg',
    alt: 'Réka és Bálint esküvője',
    name: 'Réka és Bálint',
    type: 'Vadvirágos hangulat',
    description: 'Élénk, játékos színvilág, amely a pár energikus stílusát emeli ki.',
    location: 'Tata',
    weddingDate: '2024. szeptember 7.',
    isFeatured: true
  },
  {
    slug: 'dori-david',
    image: '/wedding/dori-david/dori-david-profile.jpg',
    alt: 'Dóri és Dávid esküvője',
    name: 'Dóri és Dávid',
    type: 'Őszi rusztikus dekor',
    description: 'Erdei ihletésű kompozíciók mély terrakotta és moha zöld árnyalatokkal.',
    location: 'Etyek',
    weddingDate: '2023. október 14.',
    isFeatured: true
  },
  {
    slug: 'anna-bence',
    image: '/wedding/anna-bence/anna-bence-profile.jpg',
    alt: 'Anna és Bence esküvője',
    name: 'Anna és Bence',
    type: 'Méhlegelő inspiráció',
    description: 'Finom, késő őszi virágvilág letisztult, romantikus részletekkel.',
    location: 'Balatonfüred',
    weddingDate: '2023. november 11.',
    isFeatured: false
  },
  {
    slug: 'petra-mate',
    image: '/wedding/petra-mate/petra-mate-profile.jpg',
    alt: 'Petra és Máté esküvője',
    name: 'Petra és Máté',
    type: 'Romantikus elegancia',
    description: 'Légies, harmonikus kompozíciók természetes tónusokkal és finom részletekkel.',
    location: 'Szeged',
    weddingDate: '2025. május 17.',
    isFeatured: true
  }
]

export const featuredWeddings: WeddingCard[] = allWeddingCards.filter(wedding => wedding.isFeatured)
