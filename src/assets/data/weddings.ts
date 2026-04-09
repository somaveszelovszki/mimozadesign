import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

export type Wedding = {
  slug: string
  name: string
  caption: string
  coverImage: string
  coverImagePosition?: string
  location: string
  weddingDate: string
  card: {
    alt: string
    subtitle: string
    description: string
    isFeatured: boolean
  }
}

export type WeddingPortfolio = Wedding & {
  images: string[]
}

export type WeddingCard = {
  slug: string
  image: string
  imagePosition?: string
  alt: string
  name: string
  subtitle: string
  description: string
  location: string
  weddingDate: string
  isFeatured: boolean
}

const imageExtensionPattern = /\.(jpg|jpeg|png|webp)$/i
const fileNameCollator = new Intl.Collator('hu', { numeric: true, sensitivity: 'base' })

const getWeddingImages = (slug: string): string[] => {
  const weddingsFolderPath = resolve(process.cwd(), 'public', 'weddings', slug)

  try {
    const folderImages = readdirSync(weddingsFolderPath)
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

    return folderImages.map(fileName => `/weddings/${slug}/${fileName}`)
  } catch (error) {
    console.error(`[weddings] Unable to read image folder for "${slug}".`, error)

    return []
  }
}

export const weddings: Wedding[] = [
  {
    slug: 'petra-mate',
    name: 'Petra és Máté',
    caption: 'Elegáns, romantikus dekoráció finom természetes részletekkel.',
    coverImage: '/weddings/petra-mate/petra-mate-profile.jpg',
    coverImagePosition: 'center',
    location: 'Tata, Grill Étterem',
    weddingDate: '2025. március 29.',
    card: {
      alt: 'Petra és Máté esküvője',
      subtitle: 'Romantikus elegancia',
      description: 'Légies, harmonikus kompozíciók természetes tónusokkal és finom részletekkel.',
      isFeatured: true
    }
  },
  {
    slug: 'adri-david',
    name: 'Adri és Dávid',
    caption:
      'Szárazvirágból készült teljes dekoráció, amely a végtelenségig megőrzi az esküvő napjának gyönyörű emlékét.',
    coverImage: '/weddings/adri-david/adri-david-profile.jpg',
    coverImagePosition: 'center',
    location: 'Dabas, Jakab Lovasudvar',
    weddingDate: '2025. július 5.',
    card: {
      alt: 'Adri és Dávid esküvője',
      subtitle: 'Szárazvirágos koncepció',
      description: 'Időtálló, bézs-barna tónusú dekoráció természetes textúrákkal.',
      isFeatured: true
    }
  },
  {
    slug: 'reka-balint',
    name: 'Réka és Bálint',
    caption: 'Amilyen a pár, olyan a csokor. Vidám, sokszínű, élénk.',
    coverImage: '/weddings/reka-balint/reka-balint-profile.jpg',
    coverImagePosition: 'center',
    location: 'Szomód, Pikant Pajta',
    weddingDate: '2024. május 17.',
    card: {
      alt: 'Réka és Bálint esküvője',
      subtitle: 'Vadvirágos hangulat',
      description: 'Élénk, játékos színvilág, amely a pár energikus stílusát emeli ki.',
      isFeatured: true
    }
  },
  {
    slug: 'dori-david',
    name: 'Dóri és Dávid',
    caption: 'Rusztikus stílusú, természetközeli dekor, az ősz színeivel.',
    coverImage: '/weddings/dori-david/dori-david-profile.jpg',
    coverImagePosition: 'top',
    location: 'Verőce, Lósi Major',
    weddingDate: '2023. szeptember 2.',
    card: {
      alt: 'Dóri és Dávid esküvője',
      subtitle: 'Őszi rusztikus dekor',
      description: 'Erdei ihletésű kompozíciók mély terrakotta és moha zöld árnyalatokkal.',
      isFeatured: true
    }
  },
  {
    slug: 'anna-bence',
    name: 'Anna és Bence',
    caption: 'Méhlegelő ihletésű csokor, novemberi kivitelben.',
    coverImage: '/weddings/anna-bence/anna-bence-profile.jpg',
    coverImagePosition: 'center',
    location: 'Budapest szívében',
    weddingDate: '2025. november 8.',
    card: {
      alt: 'Anna és Bence esküvője',
      subtitle: 'Méhlegelő inspiráció',
      description: 'Finom, késő őszi virágvilág letisztult, romantikus részletekkel.',
      isFeatured: false
    }
  }
]

export const weddingPortfolios: WeddingPortfolio[] = weddings.map(wedding => ({
  ...wedding,
  images: getWeddingImages(wedding.slug)
}))

export const allWeddingCards: WeddingCard[] = weddings.map(wedding => ({
  slug: wedding.slug,
  image: wedding.coverImage,
  imagePosition: wedding.coverImagePosition,
  alt: wedding.card.alt,
  name: wedding.name,
  subtitle: wedding.card.subtitle,
  description: wedding.card.description,
  location: wedding.location,
  weddingDate: wedding.weddingDate,
  isFeatured: wedding.card.isFeatured
}))

export const featuredWeddings: WeddingCard[] = allWeddingCards.filter(wedding => wedding.isFeatured)
