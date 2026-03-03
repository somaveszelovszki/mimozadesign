import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type PopularDish = {
  slug: string
  image: string
  alt: string
  name: string
  type: string
  description: string
}[]

const PopularDishes = ({ popularDishes }: { popularDishes: PopularDish }) => {
  return (
    <section id='popular-dishes' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <h2 className='font-serif text-2xl font-semibold md:text-3xl lg:text-4xl'>Kiemelt munkáink</h2>
          <p className='text-muted-foreground text-xl'>
            Valódi párok valódi történetei, ahol a virágok, textíliák és részletek egy közös hangulattá álltak össze.
          </p>
        </div>

        {/* Dishes */}
        <div className='grid gap-6 md:grid-cols-2 lg:gap-y-10 xl:grid-cols-4'>
          {popularDishes.map((member, index) => (
            <Card
              key={index}
              className='hover:border-primary group overflow-hidden rounded-none p-0 shadow-none transition-colors duration-300'
            >
              <a
                href={`/weddings/${member.slug}`}
                aria-label={`${member.name} esküvői portfólió megnyitása`}
                className='focus-visible:ring-ring block h-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              >
                <CardContent className='px-0'>
                  <div className='bg-muted'>
                    <img src={member.image} alt={member.alt} className='h-auto w-full' loading='lazy' />
                  </div>
                  <div className='space-y-3 px-6 py-5'>
                    <CardTitle className='text-lg'>{member.name}</CardTitle>
                    <Separator />
                    <div className='text-muted-foreground'>
                      <p className='mb-1 text-base font-medium'>{member.type}</p>
                      <p>{member.description}</p>
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

export default PopularDishes
