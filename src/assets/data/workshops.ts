export const workshops = [
  {
    img: '/weddings/reka-balint/reka-balint-6.jpg',
    alt: 'Asztaldísz workshop',
    title: 'Tavaszi asztaldísz workshop',
    description: 'Élő virágokkal és természetes anyagokkal készítünk szezonális asztaldíszt kezdőknek is.',
    links: [
      {
        label: 'Facebook esemény',
        href: 'https://www.facebook.com/events/2549805432031408'
      },
      {
        label: 'Jelentkezés',
        href: 'https://forms.gle/7MFQ8WJa2kL5wQ2g7',
        variant: 'outline'
      }
    ]
  },
  {
    img: '/weddings/dori-david/dori-david-4.jpg',
    alt: 'Koszorúkészítő workshop',
    title: 'Nyári koszorúkészítő workshop',
    description: 'Színes mezei virágokkal és tartós alapanyagokkal készítünk ajtó- vagy falidíszt.',
    links: [
      {
        label: 'Facebook esemény',
        href: 'https://www.facebook.com/events/899513102376120'
      },
      {
        label: 'Jelentkezés',
        href: 'https://forms.gle/ebQXfSQY8mRgT8P57',
        variant: 'outline'
      }
    ]
  },
  {
    img: '/weddings/anna-bence/anna-bence-3.jpg',
    alt: 'Őszi csokor workshop',
    title: 'Őszi csokorkötő workshop',
    description: 'Színelmélet, textúrák és csokorkötési technikák egy gyakorlatorientált délutánon.',
    links: [
      {
        label: 'Facebook esemény',
        href: 'https://www.facebook.com/events/3441097890311877'
      },
      {
        label: 'Jelentkezés',
        href: 'https://forms.gle/5bJ2pbMdE3QvY8PB9',
        variant: 'outline'
      }
    ]
  }
]

export type PastWorkshopHighlight = {
  title: string
  description: string
  images: string[]
}

export type WorkshopDate = {
  date: string
  time: string
}

export type UpcomingWorkshop = {
  slug: string
  title: string
  description: string
  coverImage: string
  images: string[]
  dates: WorkshopDate[]
  location: string
  price: string
  facebookEventUrl: string
  registrationUrl: string
}

export const pastWorkshopHighlight: PastWorkshopHighlight = {
  title: 'Korábbi workshopjaink',
  description: 'Ízelítő a korábbi workshopjainkból, ahol közösen alkottunk, tanultunk és jól éreztük magunkat.',
  images: [
    '/workshops/adventi-koszoru-workshop/adventi-koszoru-workshop-1.jpg',
    '/workshops/adventi-koszoru-workshop/adventi-koszoru-workshop-2.jpg',
    '/workshops/adventi-koszoru-workshop/adventi-koszoru-workshop-3.jpg',
    '/workshops/adventi-koszoru-workshop/adventi-koszoru-workshop-4.jpg'
  ]
}

export const upcomingWorkshops: UpcomingWorkshop[] = [
  {
    slug: 'anyak-napi-viragbura-workshop',
    title: 'Anyák napi virágbúra workshop',
    description: 'Készíts egyedi virágbúrát édesanyádnak vagy magadnak egy kreatív, inspiráló délutánon.',
    coverImage: '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-profile.jpg',
    images: [
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-profile.jpg',
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-1.jpg',
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-2.jpg'
    ],
    dates: [{ date: '2026. május 2.', time: '13:00-16:00' }],
    location: 'LeonArt Stúdió - 2890 Tata, Egység u. 7.',
    price: '15 000 Ft',
    facebookEventUrl: 'https://www.facebook.com/events/2549805432031408',
    registrationUrl: 'https://forms.gle/7MFQ8WJa2kL5wQ2g7'
  }
]
