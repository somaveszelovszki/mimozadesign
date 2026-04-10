import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { UpcomingWorkshop } from '@/assets/data/workshops'

const Workshops = ({ workshops }: { workshops: UpcomingWorkshop[] }) => {
  return (
    <section id='workshops' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <h2 className='font-serif text-2xl font-semibold md:text-3xl lg:text-4xl'>Workshopjaink</h2>
          <p className='text-muted-foreground text-xl'>
            Több tematikus workshopot szervezünk, mindegyikhez Google Forms jelentkezéssel.
          </p>
          <a href='/workshop' className='text-primary text-sm font-medium underline-offset-4 hover:underline'>
            Összes workshop és naptár megtekintése
          </a>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {workshops.map((workshop, index) => (
            <Card
              key={index}
              className='hover:border-primary group overflow-hidden p-0 shadow-none transition-colors duration-300'
            >
              <a
                href={`/workshop/${workshop.slug}`}
                aria-label={`${workshop.title} megtekintése`}
                className='focus-visible:ring-ring block h-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              >
                <CardContent className='px-0'>
                  <div className='bg-muted relative aspect-square overflow-hidden'>
                    <img
                      src={workshop.coverImage}
                      alt={workshop.title}
                      className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${workshop.past ? 'opacity-50' : ''}`}
                      loading='lazy'
                    />
                    {workshop.past && (
                      <span className='bg-muted text-muted-foreground absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium'>
                        Korábbi workshop
                      </span>
                    )}
                  </div>
                  <div className={`space-y-3 px-6 py-5 ${workshop.past ? 'opacity-50' : ''}`}>
                    <CardTitle className='text-lg'>{workshop.title}</CardTitle>
                    <Separator />
                    <p className='text-muted-foreground'>{workshop.description}</p>
                    <p className='text-primary text-sm font-medium group-hover:underline'>Olvass tovább</p>
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

export default Workshops
