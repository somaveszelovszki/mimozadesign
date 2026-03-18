import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { WeddingCard } from '@/assets/data/featured-weddings'

type FeaturedWeddingsProps = {
  featuredWeddings: WeddingCard[]
  showAllWeddingsLink?: boolean
}

const FeaturedWeddings = ({ featuredWeddings, showAllWeddingsLink = true }: FeaturedWeddingsProps) => {
  return (
    <section id='featured-weddings' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <h2 className='font-serif text-2xl font-semibold md:text-3xl lg:text-4xl'>Esküvői munkáink</h2>
          <p className='text-muted-foreground text-xl'>
            Valódi párok valódi történetei, ahol a virágok, textíliák és részletek egy közös hangulattá álltak össze.
          </p>
          {showAllWeddingsLink ? (
            <a
              href='/weddings'
              className='text-primary hover:text-primary/80 focus-visible:ring-ring text-base font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
            >
              További esküvők megtekintése
            </a>
          ) : null}
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:gap-y-10 xl:grid-cols-4'>
          {featuredWeddings.map((wedding, index) => (
            <Card
              key={index}
              className='hover:border-primary group overflow-hidden p-0 shadow-none transition-colors duration-300'
            >
              <a
                href={`/weddings/${wedding.slug}`}
                aria-label={`${wedding.name} esküvői portfólió megnyitása`}
                className='focus-visible:ring-ring block h-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              >
                <CardContent className='px-0'>
                  <div className='bg-muted'>
                    <img
                      src={wedding.image}
                      alt={wedding.alt}
                      className='h-auto w-full transition-transform duration-300 group-hover:scale-105'
                      loading='lazy'
                    />
                  </div>
                  <div className='space-y-3 px-6 py-5'>
                    <CardTitle className='text-lg'>{wedding.name}</CardTitle>
                    <Separator />
                    <div className='text-muted-foreground'>
                      <p className='mb-1 text-base font-medium'>{wedding.subtitle}</p>
                      <p>{wedding.description}</p>
                    </div>
                    <p className='text-primary text-sm font-medium group-hover:underline'>Portfólió megtekintése</p>
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedWeddings
