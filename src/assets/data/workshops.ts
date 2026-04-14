import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

export type PastWorkshopHighlight = {
  title: string
  description: string
  images: string[]
}

export type WorkshopDate = {
  date: string
  time: string
  location: string
  registrationUrl?: string
}

export type Workshop = {
  slug: string
  title: string
  summary: string
  description: string[]
  coverImage: string
  images: string[]
  dates: WorkshopDate[]
  past?: boolean
  details?: string[]
  facebookEventUrl?: string
}

const imageExtensionPattern = /\.(jpg|jpeg|png|webp)$/i
const fileNameCollator = new Intl.Collator('hu', { numeric: true, sensitivity: 'base' })

const getWorkshopImages = (slug: string): string[] => {
  const workshopsFolderPath = resolve(process.cwd(), 'public', 'workshops', slug)

  try {
    const folderImages = readdirSync(workshopsFolderPath)
      .filter(fileName => imageExtensionPattern.test(fileName))
      .sort((firstImage, secondImage) => {
        const firstIsProfile = firstImage.includes('-profile.')
        const secondIsProfile = secondImage.includes('-profile.')

        if (firstIsProfile && !secondIsProfile) {
          return -1
        }

        if (!firstIsProfile && secondIsProfile) {
          return 1
        }

        return fileNameCollator.compare(firstImage, secondImage)
      })

    return folderImages.map(fileName => `/workshops/${slug}/${fileName}`)
  } catch (error) {
    console.error(`[workshops] Unable to read image folder for "${slug}".`, error)

    return []
  }
}

const workshopData: Omit<Workshop, 'coverImage' | 'images'>[] = [
  {
    slug: 'karacsonyi-kopogtato-workshop',
    title: 'Karácsonyi kopogtató workshop',
    summary: 'Hangolódjunk együtt az ünnepekre, és készítsünk egy gyönyörű kopogtatót, mely minden otthon éke lesz.',
    description: [
      '🎄 Hangolódjunk együtt az ünnepekre, és készítsünk egy gyönyörű kopogtatót, mely minden otthon éke lesz. 🎄',
      'Közösen kötjük meg a sokféle örökzöld alapú koszorút, melyet sokféle ünnepi dísszel és terméssel díszítünk.'
    ],
    past: true,
    dates: [
      {
        date: '2025. december 6. (szombat)',
        time: '13:00-17:00',
        location: 'LeonArt Stúdió - 2890 Tata, Egység utca 7.'
      }
    ],
    details: [
      '<strong>Részvételi díj:</strong> Becsületkasszás',
      'Az alapanyagok, eszközök és a helyszín költsége összesen kb. 5000 Ft/fő. Támogatásoddal hozzájárulsz ahhoz, hogy a program olyanok számára is elérhető maradjon, akik anyagi okokból másként nem tudnának részt venni.'
    ]
  },
  {
    slug: 'anyak-napi-viragbura-workshop',
    title: 'Anyák napi virágbúra workshop',
    summary:
      'Lepd meg Édesanyádat valami igazán különlegessel! Alkoss egy gyönyörű, elegáns virágbúrát, amely nemcsak dekoráció, hanem egy kedves emlék is marad.',
    description: [
      'Lepd meg Édesanyádat valami igazán különlegessel!',
      'Alkoss egy gyönyörű, elegáns virágbúrát, amely nemcsak dekoráció, hanem egy kedves emlék is marad – akár közös élményként, akár szívből készített ajándékként. 🌷✨',
      'Az eseményen kellemes hangulattal, lélekmelengető zenével és ropogtatnivalóval, teával várunk Titeket, hogy igazán maradandó élményben legyen részetek.'
    ],
    dates: [
      {
        date: '2026. május 2. (szombat)',
        time: '13:00-16:00',
        location: 'LeonArt Stúdió - 2890 Tata, Egység u. 7.',
        registrationUrl: 'https://forms.gle/49muU5wFgRKPaZMa6'
      }
    ],
    details: [
      '<strong>Részvételi díj:</strong> 15 000 Ft / fő (minden szükséges eszközt és kelléket tartalmaz)',
      '<strong>Kedvezmény:</strong> 20% páros kedvezmény, ha Édesanyáddal ketten jöttök.',
      'A résztvevők létszáma korlátozott, legfeljebb 8 fő. Részvétel 14 év felett lehetséges.'
    ],
    facebookEventUrl: 'https://fb.me/e/6DrEiRSOo'
  }
]

export const workshops: Workshop[] = workshopData.map(workshop => {
  const images = getWorkshopImages(workshop.slug)
  const coverImage = images.find(img => img.includes('-profile.')) ?? ''

  return { ...workshop, coverImage, images }
})

export const pastWorkshopHighlight: PastWorkshopHighlight = {
  title: 'Korábbi workshopok',
  description: 'Ízelítő a korábbi workshopokból, ahol közösen alkottunk, tanultunk és jól éreztük magunkat.',
  images: workshops.filter(workshop => workshop.past).flatMap(workshop => workshop.images)
}
