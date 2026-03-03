import { ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card'

type NewItem = {
  img: string
  alt: string
  title: string
  description: string
  links: {
    label: string
    href: string
    variant?: 'default' | 'outline'
  }[]
}[]

const NewItems = ({ newItems }: { newItems: NewItem }) => {
  return (
    <section id='new-items' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <h2 className='font-serif text-2xl font-semibold md:text-3xl lg:text-4xl'>Workshopjaink</h2>
          <p className='text-muted-foreground text-xl'>
            Több tematikus workshopot szervezünk, mindegyikhez külön Facebook eseménnyel és Google Forms
            jelentkezéssel.
          </p>
          <a href='/workshops' className='text-primary text-sm font-medium underline-offset-4 hover:underline'>
            Összes workshop és naptár megtekintése
          </a>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {newItems.map((item, index) => (
            <Card
              className='hover:border-primary rounded-none pt-0 shadow-none transition-colors duration-300 max-lg:last:col-span-full'
              key={index}
            >
              <CardContent className='px-0'>
                <img src={item.img} alt={item.alt} className='aspect-video h-60 w-full object-cover' loading='lazy' />
              </CardContent>
              <CardHeader className='mb-2 gap-3'>
                <CardTitle className='text-xl'>
                  <a href='#'>{item.title}</a>
                </CardTitle>
                <CardDescription className='text-base'>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className='flex flex-wrap gap-3'>
                  {item.links.map(link => (
                    <Button
                      key={link.label}
                      className='group rounded-full text-sm has-[>svg]:px-6'
                      size='lg'
                      variant={link.variant ?? 'default'}
                      asChild
                    >
                      <a href={link.href}>
                        {link.label}
                        <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewItems
