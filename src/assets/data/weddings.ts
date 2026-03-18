import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

export type WeddingPortfolio = {
  slug: string
  name: string
  caption: string
  coverImage: string
  images: string[]
}

const imageExtensionPattern = /\.(jpg|jpeg|png|webp)$/i
const fileNameCollator = new Intl.Collator('hu', { numeric: true, sensitivity: 'base' })

const getWeddingImages = (slug: string): string[] => {
  const weddingFolderPath = resolve(process.cwd(), 'public', 'wedding', slug)

  try {
    const folderImages = readdirSync(weddingFolderPath)
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

    return folderImages.map(fileName => `/wedding/${slug}/${fileName}`)
  } catch (error) {
    console.error(`[weddings] Unable to read image folder for "${slug}".`, error)

    return []
  }
}

export const weddingPortfolios: WeddingPortfolio[] = [
  {
    slug: 'dori-david',
    name: 'Dóri és Dávid',
    caption: 'Rusztikus stílusú, természetközeli dekor, az ősz színeivel.',
    coverImage: '/wedding/dori-david/dori-david-profile.jpg',
    images: getWeddingImages('dori-david')
  },
  {
    slug: 'reka-balint',
    name: 'Réka és Bálint',
    caption: 'Amilyen a pár, olyan a csokor. Vidám, sokszínű, élénk.',
    coverImage: '/wedding/reka-balint/reka-balint-profile.jpg',
    images: getWeddingImages('reka-balint')
  },
  {
    slug: 'adri-david',
    name: 'Adri és Dávid',
    caption:
      'Szárazvirágból készült teljes dekoráció, amely a végtelenségig megőrzi az esküvő napjának gyönyörű emlékét.',
    coverImage: '/wedding/adri-david/adri-david-profile.jpg',
    images: getWeddingImages('adri-david')
  },
  {
    slug: 'petra-mate',
    name: 'Petra és Máté',
    caption: 'Elegáns, romantikus dekoráció finom természetes részletekkel.',
    coverImage: '/wedding/petra-mate/petra-mate-profile.jpg',
    images: getWeddingImages('petra-mate')
  },
  {
    slug: 'anna-bence',
    name: 'Anna és Bence',
    caption: 'Méhlegelő ihletésű csokor, novemberi kivitelben.',
    coverImage: '/wedding/anna-bence/anna-bence-profile.jpg',
    images: getWeddingImages('anna-bence')
  }
]
