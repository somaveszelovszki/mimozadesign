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
export type WorkshopPortfolio = {
  slug: string
  title: string
  caption: string
  date: string
  location: string
  coverImage: string
  images: string[]
  facebookEventUrl: string
  registrationUrl: string
}

export type UpcomingWorkshop = {
  title: string
  date: string
  time: string
  location: string
  description: string
  facebookEventUrl: string
  registrationUrl: string
}

export const workshopPortfolios: WorkshopPortfolio[] = [
  {
    slug: 'adventi-koszoru-2025',
    title: 'Adventi koszorú workshop',
    caption: 'Közösen készítettünk természetes adventi koszorúkat gyertyafényes, meghitt hangulatban.',
    date: '2025. november 30.',
    location: 'Budapest, Mimoza Studio',
    coverImage: '/weddings/dori-david/dori-david-3.jpg',
    images: [
      '/weddings/dori-david/dori-david-1.jpg',
      '/weddings/dori-david/dori-david-2.jpg',
      '/weddings/dori-david/dori-david-3.jpg',
      '/weddings/dori-david/dori-david-4.jpg'
    ],
    facebookEventUrl: 'https://www.facebook.com/events/1196509952087690',
    registrationUrl: 'https://forms.gle/cMcf8fE8gG9ztX9o6'
  },
  {
    slug: 'mezei-csokor-2025',
    title: 'Mezei csokorkötő workshop',
    caption: 'Vadvirágos, laza kötésű csokrokat készítettünk szezonális alapanyagokból.',
    date: '2025. június 15.',
    location: 'Pécs, KertMűhely',
    coverImage: '/weddings/reka-balint/reka-balint-5.jpg',
    images: [
      '/weddings/reka-balint/reka-balint-1.jpg',
      '/weddings/reka-balint/reka-balint-3.jpg',
      '/weddings/reka-balint/reka-balint-5.jpg',
      '/weddings/reka-balint/reka-balint-6.jpg'
    ],
    facebookEventUrl: 'https://www.facebook.com/events/887430266928277',
    registrationUrl: 'https://forms.gle/nrYCHu68baxF6KLd8'
  },
  {
    slug: 'asztaldisz-2025',
    title: 'Szezonális asztaldísz workshop',
    caption: 'Textúrák, színpaletta és kompozíció: mindenki saját asztaldísszel távozott.',
    date: '2025. március 9.',
    location: 'Győr, Közösségi Ház',
    coverImage: '/weddings/anna-bence/anna-bence-2.jpg',
    images: [
      '/weddings/anna-bence/anna-bence-1.jpg',
      '/weddings/anna-bence/anna-bence-2.jpg',
      '/weddings/anna-bence/anna-bence-3.jpg',
      '/weddings/anna-bence/anna-bence-4.jpg'
    ],
    facebookEventUrl: 'https://www.facebook.com/events/1043388351226501',
    registrationUrl: 'https://forms.gle/SHYDPomUUm8n3uZt8'
  }
]

export const upcomingWorkshops: UpcomingWorkshop[] = [
  {
    title: 'Tavaszi virágkoszorú workshop',
    date: '2026. április 18.',
    time: '10:00-13:00',
    location: 'Budapest, Mimoza Studio',
    description: 'Alap technikák, színpárosítás és egy kész koszorú, amit haza is vihetsz.',
    facebookEventUrl: 'https://www.facebook.com/events/2549805432031408',
    registrationUrl: 'https://forms.gle/7MFQ8WJa2kL5wQ2g7'
  },
  {
    title: 'Nyári csokorkötő alapok',
    date: '2026. június 6.',
    time: '14:00-17:00',
    location: 'Pécs, KertMűhely',
    description: 'Kezdőbarát csokorkötés mezei virágokkal, gyakorlati mini feladatokkal.',
    facebookEventUrl: 'https://www.facebook.com/events/899513102376120',
    registrationUrl: 'https://forms.gle/ebQXfSQY8mRgT8P57'
  },
  {
    title: 'Őszi asztaldísz és gyertyakompozíció',
    date: '2026. szeptember 20.',
    time: '11:00-14:00',
    location: 'Győr, Közösségi Ház',
    description: 'Rétegezés, arányok és tartósabb megoldások az őszi enteriőrökhöz.',
    facebookEventUrl: 'https://www.facebook.com/events/3441097890311877',
    registrationUrl: 'https://forms.gle/5bJ2pbMdE3QvY8PB9'
  }
]

