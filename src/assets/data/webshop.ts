export type ProductSize = {
  id: string
  cardTitle: string
  sizeLabel: string
  price: number
}

export type Product = {
  slug: string
  title: string
  profileImage: string
  images: string[]
  description: string[]
  sizes: ProductSize[]
}

export const products: Product[] = [
  {
    slug: 'viragbura',
    title: 'Virágbúra',
    profileImage: '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-profile.jpg',
    images: [
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-profile.jpg',
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-1.jpg',
      '/workshops/anyak-napi-viragbura-workshop/anyak-napi-viragbura-workshop-2.jpg'
    ],
    description: [
      'Elegáns, kézzel készített virágbúra szárazvirág kompozícióval, amely nemcsak dekoráció, hanem egy kedves emlék is.',
      'A finom színvilágú, lélekmelengető kompozíció bármely otthonba meleg, nőies hangulatot varázsol. Tökéletes ajándék Édesanyádnak, barátnődnek, vagy akár saját magadnak is.',
      'Minden darab egyedi, gondosan válogatott szárazvirágokból készül, így soha nem találkozhatsz két teljesen egyforma virágbúrával.'
    ],
    sizes: [
      {
        id: 'large',
        cardTitle: 'Nagy méretű virágbúra',
        sizeLabel: 'Nagy',
        price: 11900
      },
      {
        id: 'small',
        cardTitle: 'Kis méretű virágbúra',
        sizeLabel: 'Kicsi',
        price: 9900
      }
    ]
  },
  {
    slug: 'szarazvirag-hajkoszoru',
    title: 'Szárazvirág hajkoszorú',
    profileImage: '/workshops/hajkoszoru-keszito-workshop/hajkoszoru-keszito-workshop-2.jpg',
    images: [
      '/workshops/hajkoszoru-keszito-workshop/hajkoszoru-keszito-workshop-1.jpg',
      '/workshops/hajkoszoru-keszito-workshop/hajkoszoru-keszito-workshop-3.jpg',
      '/workshops/hajkoszoru-keszito-workshop/hajkoszoru-keszito-workshop-profile.jpg'
    ],
    description: [
      'Egyedi, kézzel készített szárazvirág hajkoszorú, mely megkoronázza a megjelenésedet.',
      'Akár esküvőre, fesztiválra vagy kismama fotózásra készülsz, ez az időtálló, szuper kényelmes fejdísz tökéletes választás. Akár ajándéknak is ideális – egy maradandó, különleges darab szeretteid számára.',
      'Minden hajkoszorú gondosan válogatott szárazvirágokból, kézi munkával készül, így minden darab egyedi és megismételhetetlen.'
    ],
    sizes: [
      {
        id: 'default',
        cardTitle: 'Szárazvirág hajkoszorú',
        sizeLabel: 'Egy méret',
        price: 10900
      }
    ]
  }
]

export type ProductCard = {
  slug: string
  sizeId: string
  title: string
  profileImage: string
  price: number
}

export const getProductCards = (): ProductCard[] =>
  products.flatMap(product =>
    product.sizes.map(size => ({
      slug: product.slug,
      sizeId: size.id,
      title: size.cardTitle,
      profileImage: product.profileImage,
      price: size.price
    }))
  )

export const formatPrice = (price: number): string => `${price.toLocaleString('hu-HU').replace(/,/g, ' ')} Ft`

export const findProduct = (slug: string): Product | undefined => products.find(p => p.slug === slug)

export const findSize = (product: Product, sizeId: string | undefined): ProductSize =>
  product.sizes.find(s => s.id === sizeId) ?? product.sizes[0]
