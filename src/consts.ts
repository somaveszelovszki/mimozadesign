// Site Configuration
// Centralized configuration for site metadata, SEO, and branding

export const SITE_TITLE = 'Mimóza Design | Esküvői dekoráció'
export const SITE_DESCRIPTION =
  'Esküvői dekoráció, kreatív workshopok, szárazvirág kompozíciók és egyedi virágcsokrok a Mimóza Design-tól.'

export const GITHUB_URL = 'https://github.com/shadcnstudio/shadcn-astro-bistro-landing-page-free'
export const SITE_URL = 'https://mimozaDesign.hu/'

export const SITE_METADATA = {
  title: {
    default: 'Mimóza Design | Esküvői dekoráció'
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'esküvői dekoráció',
    'kreatív workshop',
    'szárazvirág kompozíció',
    'virágcsokor',
    'esküvői dekoráció',
    'menyasszonyi csokor',
    'rusztikus esküvő',
    'virágkötészet',
    'őszi esküvő',
    'Mimóza',
    'Mimóza Design',
    'Veszelovszki-Petró Liza',
    'Petró Liza'
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/weddings/reka-balint/reka-balint-8.jpg']
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
  discord: 'mailto:petroliza11@gmail.com'
}

// Company information for structured data
export const COMPANY_INFO = {
  name: 'Mimóza Design',
  legalName: 'Mimóza Design',
  url: SITE_URL,
  logo: `/favicon.ico`,
  foundingDate: '2026',
  address: {
    streetAddress: 'Vértesszőlős',
    addressLocality: 'Vértesszőlős',
    addressRegion: 'HU',
    postalCode: '2837',
    addressCountry: 'HU'
  },
  contactPoint: {
    telephone: '+36 30 2866 471',
    contactType: 'customer support',
    email: 'petroliza11@gmail.com'
  },
  sameAs: Object.values(SOCIAL_LINKS)
}
