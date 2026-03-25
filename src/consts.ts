// Site Configuration
// Centralized configuration for site metadata, SEO, and branding

export const SITE_TITLE = 'Mimóza Design | Esküvői dekoráció'
export const SITE_DESCRIPTION =
  'Természetes, rusztikus és őszi hangulatú esküvői dekorációk, menyasszonyi csokrok és személyes virágkoncepciók.'

export const GITHUB_URL = 'https://github.com/shadcnstudio/shadcn-astro-bistro-landing-page-free'
export const SITE_URL = 'https://mimozaDesign.hu/'

export const SITE_METADATA = {
  title: {
    default: 'Mimóza Design | Esküvői dekoráció'
  },
  description:
    'Természetes, rusztikus és őszi hangulatú esküvői dekorációk, menyasszonyi csokrok és személyes virágkoncepciók.',
  keywords: [
    'esküvői dekoráció',
    'menyasszonyi csokor',
    'rusztikus esküvő',
    'virágkötészet',
    'őszi esküvő',
    'Mimóza Design'
  ],
  authors: [{ name: 'Mimóza Design', url: SITE_URL }],
  creator: 'Mimóza Design',
  publisher: 'Mimóza Design',
  robots: {
    index: true,
    follow: true
  },
  language: 'hu-HU',
  locale: 'hu_HU',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '48x48' }],
    apple: [{ url: '/favicon.ico', sizes: '180x180' }],
    shortcut: [{ url: '/favicon.ico' }]
  },
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Mimóza Design',
    title: 'Mimóza Design | Esküvői dekoráció',
    description:
      'Természetes, rusztikus és őszi hangulatú esküvői dekorációk, menyasszonyi csokrok és személyes virágkoncepciók.',
    images: [
      {
        url: '/weddings/dori-david/dori-david-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Mimóza Design esküvői dekoráció'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mimozaDesign',
    creator: '@mimozaDesign',
    title: 'Mimóza Design | Esküvői dekoráció',
    description:
      'Természetes, rusztikus és őszi hangulatú esküvői dekorációk, menyasszonyi csokrok és személyes virágkoncepciók.',
    images: ['/weddings/dori-david/dori-david-profile.jpg']
  },
  verification: {
    google: '',
    yandex: '',
    bing: ''
  }
}

// Social media links
export const SOCIAL_LINKS = {
  github: GITHUB_URL,
  twitter: 'https://www.instagram.com/mimozaDesign',
  linkedin: 'https://www.facebook.com/mimozadesign',
  discord: 'mailto:liza@mimozaDesign.hu'
}

// Company information for structured data
export const COMPANY_INFO = {
  name: 'Mimóza Design',
  legalName: 'Mimóza Design',
  url: SITE_URL,
  logo: `/favicon.ico`,
  foundingDate: '2021',
  address: {
    streetAddress: 'Budapest',
    addressLocality: 'Budapest',
    addressRegion: 'HU',
    postalCode: '1111',
    addressCountry: 'HU'
  },
  contactPoint: {
    telephone: '+36-20-123-4567',
    contactType: 'customer support',
    email: 'liza@mimozaDesign.hu'
  },
  sameAs: Object.values(SOCIAL_LINKS)
}
