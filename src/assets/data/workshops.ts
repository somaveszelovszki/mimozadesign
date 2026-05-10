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

const workshopData: Omit<Workshop, 'coverImage' | 'images' | 'past'>[] = [
  {
    slug: 'karacsonyi-kopogtato-workshop',
    title: 'Karácsonyi kopogtató workshop',
    summary: 'Hangolódjunk együtt az ünnepekre, és készítsünk egy gyönyörű kopogtatót, mely minden otthon éke lesz.',
    description: [
      '🎄 Hangolódjunk együtt az ünnepekre, és készítsünk egy gyönyörű kopogtatót, mely minden otthon éke lesz. 🎄',
      'Közösen kötjük meg a sokféle örökzöld alapú koszorút, melyet sokféle ünnepi dísszel és terméssel díszítünk.'
    ],
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
      '<strong>Részvételi díj:</strong> 12 000 Ft / fő (minden szükséges eszközt és kelléket tartalmaz)',
      '<strong>Kedvezmény:</strong> 20% páros kedvezmény, ha Édesanyáddal ketten jöttök.',
      'A résztvevők létszáma korlátozott, legfeljebb 8 fő. Részvétel 14 év felett lehetséges.'
    ],
    facebookEventUrl: 'https://fb.me/e/6DrEiRSOo'
  },
  {
    slug: 'hajkoszoru-keszito-workshop',
    title: 'Hajkoszorú készítő workshop',
    summary:
      'Esküvő, fesztivál, kismama fotózás - készítsd el saját, egyedi hajdíszedet, ami megkoronázza a megjelenésedet.',
    description: [
      '🌸 Esküvő, fesztivál, kismama fotózás… 🌸',
      'Bármelyikről is legyen szó, a megjelenésedet megkoronázza a saját magad által készített hajdísz. De akár ajándékba is adhatod – gyere barátnőddel, anyukáddal, hogy egy maradandó közös élményt szerezzetek.',
      'Az alkalmon minden szükséges eszközt és segítséget megkapsz tőlem ahhoz, hogy az elképzeléseid megvalósuljanak. Egy csodás, időtálló, szuper kényelmes fejdísszel és egy feltöltődős élménnyel távozhatsz. (Az esemény plakátján megjelenő filigrán hajkoszorúnál nagyobb és karakteresebb méretű fejdísz is készíthető.)',
      'Az eseményen kellemes hangulattal, lélekmelengető zenével és ropogtatnivalóval, teával várlak Titeket, hogy igazán maradandó élményben legyen részetek. 🌻'
    ],
    dates: [
      {
        date: '2026. május 16. (szombat)',
        time: '13:00-16:00',
        location: 'LeonArt Stúdió - 2890 Tata, Egység u. 7.',
        registrationUrl: 'https://forms.gle/kHjSmoyTreyXHUKq9'
      }
    ],
    details: [
      '<strong>Részvételi díj:</strong> 12 000 Ft / fő (minden szükséges eszközt és kelléket tartalmaz)',
      'A résztvevők létszáma korlátozott, legfeljebb 8 fő.'
    ],
    facebookEventUrl: 'https://fb.me/e/5UP2j8Zc9'
  }
]

const hungarianMonths: Record<string, number> = {
  január: 0,
  február: 1,
  március: 2,
  április: 3,
  május: 4,
  június: 5,
  július: 6,
  augusztus: 7,
  szeptember: 8,
  október: 9,
  november: 10,
  december: 11
}

const parseWorkshopDate = (dateString: string): Date | null => {
  const match = dateString.match(/(\d{4})\.\s+([a-záéíóöőúüű]+)\s+(\d{1,2})\./i)

  if (!match) {
    return null
  }

  const [, yearStr, monthName, dayStr] = match
  const month = hungarianMonths[monthName.toLowerCase()]

  if (month === undefined) {
    return null
  }

  return new Date(Number(yearStr), month, Number(dayStr))
}

const getWorkshopDateExtremes = (dates: WorkshopDate[]): { earliest: number; latest: number } | null => {
  const timestamps = dates
    .map(d => parseWorkshopDate(d.date))
    .filter((d): d is Date => d !== null)
    .map(d => d.getTime())

  if (timestamps.length === 0) {
    return null
  }

  return { earliest: Math.min(...timestamps), latest: Math.max(...timestamps) }
}

const startOfToday = new Date()

startOfToday.setHours(0, 0, 0, 0)
const todayTimestamp = startOfToday.getTime()

export const workshops: Workshop[] = workshopData
  .map(workshop => {
    const images = getWorkshopImages(workshop.slug)
    const coverImage = images.find(img => img.includes('-profile.')) ?? ''
    const extremes = getWorkshopDateExtremes(workshop.dates)
    const past = extremes !== null && extremes.latest < todayTimestamp

    return { ...workshop, coverImage, images, past }
  })
  .sort((first, second) => {
    if (first.past !== second.past) {
      return first.past ? 1 : -1
    }

    const firstExtremes = getWorkshopDateExtremes(first.dates)
    const secondExtremes = getWorkshopDateExtremes(second.dates)

    if (!firstExtremes || !secondExtremes) {
      return 0
    }

    if (first.past) {
      return secondExtremes.latest - firstExtremes.latest
    }

    return firstExtremes.earliest - secondExtremes.earliest
  })

export const pastWorkshopHighlight: PastWorkshopHighlight = {
  title: 'Korábbi workshopok',
  description: 'Ízelítő a korábbi workshopokból, ahol közösen alkottunk, tanultunk és jól éreztük magunkat.',
  images: workshops.filter(workshop => workshop.past).flatMap(workshop => workshop.images)
}
