export type PastWorkshopHighlight = {
  title: string
  description: string
  images: string[]
}

export type WorkshopDate = {
  date: string
  time: string
  location: string
}

export type Workshop = {
  slug: string
  title: string
  description: string
  details?: string[]
  coverImage: string
  images: string[]
  dates: WorkshopDate[]
  past?: boolean
  price: string
  priceNote?: string
  discount?: string
  maxParticipants?: number
  facebookEventUrl?: string
  registrationUrl?: string
}

export const pastWorkshopHighlight: PastWorkshopHighlight = {
  title: 'Korábbi workshopjaink',
  description: 'Ízelítő a korábbi workshopjainkból, ahol közösen alkottunk, tanultunk és jól éreztük magunkat.',
  images: [
    '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-1.jpg',
    '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-2.jpg',
    '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-3.jpg',
    '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-4.jpg'
  ]
}

export const workshops: Workshop[] = [
  {
    slug: 'karacsonyi-kopogtato-workshop',
    title: 'Karácsonyi kopogtató workshop',
    description:
      'Hangolódjunk együtt az ünnepekre, és készítsünk egy gyönyörű kopogtatót, mely minden otthon éke lesz.',
    details: [
      '🎄 Hangolódjunk továbbra is együtt az ünnepekre, és készítsünk egy gyönyörű kopogtatót, mely minden otthon éke lesz. 🎄',
      'Közösen kötjük meg a sokféle örökzöld alapú koszorút, melyet sokféle ünnepi dísszel és terméssel díszítünk.'
    ],
    coverImage: '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-profile.jpg',
    images: [
      '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-profile.jpg',
      '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-1.jpg',
      '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-2.jpg',
      '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-3.jpg',
      '/workshops/karacsonyi-kopogtato-workshop/karacsonyi-kopogtato-workshop-4.jpg'
    ],
    past: true,
    dates: [
      {
        date: '2025. december 6. (szombat)',
        time: '13:00-17:00',
        location: 'LeonArt Stúdió - 2890 Tata, Egység utca 7.'
      }
    ],
    price: 'Becsületkasszás',
    priceNote:
      'Az alapanyagok, eszközök és a helyszín költsége összesen kb. 5000 Ft/fő. Támogatásoddal hozzájárulsz ahhoz, hogy a program olyanok számára is elérhető maradjon, akik anyagi okokból másként nem tudnának részt venni.'
  },
  {
    slug: 'anyak-napi-viragbura-workshop',
    title: 'Anyák napi virágbúra workshop',
    description:
      'Lepd meg Édesanyádat valami igazán különlegessel! Alkoss egy gyönyörű, elegáns virágbúrát, amely nemcsak dekoráció, hanem egy kedves emlék is marad.',
    details: [
      'Lepd meg Édesanyádat valami igazán különlegessel!',
      'Alkoss egy gyönyörű, elegáns virágbúrát, amely nemcsak dekoráció, hanem egy kedves emlék is marad – akár közös élményként, akár szívből készített ajándékként. 🌷✨',
      'Az eseményen kellemes hangulattal, lélekmelengető zenével és ropogtatnivalóval, teával várunk Titeket, hogy igazán maradandó élményben legyen részetek.'
    ],
    coverImage: '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-profile.jpg',
    images: [
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-profile.jpg',
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-1.jpg',
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-2.jpg'
    ],
    dates: [
      {
        date: '2026. május 2. (szombat)',
        time: '13:00-16:00',
        location: 'LeonArt Stúdió - 2890 Tata, Egység u. 7.'
      }
    ],
    price: '15 000 Ft / fő',
    priceNote: 'minden szükséges eszközt és kelléket tartalmaz',
    discount: '20% páros kedvezmény, ha Édesanyáddal ketten jöttök. Részvétel 14 év felett lehetséges.',
    maxParticipants: 8,
    facebookEventUrl: 'https://www.facebook.com/events/2549805432031408',
    registrationUrl: 'https://docs.google.com/forms/d/1DKptHzzEMpeI0xUHIoIyuWhZQP-Pqjsu54UcQMESP1g/edit'
  }
]
