import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Rating } from '@/components/ui/rating'

export type TestimonialItem = {
  name: string
  slug: string
  avatar: string
  rating: number
  content: string
}

type TestimonialsComponentProps = {
  testimonials: TestimonialItem[]
}

const TestimonialsComponent = ({ testimonials }: TestimonialsComponentProps) => {
  return (
    <section id='testimonials' className='scroll-reveal-exempt relative py-14 sm:py-28 lg:py-36'>
      <Carousel
        className='mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'
        opts={{
          align: 'start',
          slidesToScroll: 1
        }}
      >
        {/* Left Content */}
        <div data-scroll-reveal className='space-y-4 sm:w-1/2 lg:w-1/3'>
          <h2 className='font-serif text-2xl font-semibold sm:text-3xl lg:text-4xl'>
            Párok <br />
            tapasztalatai
          </h2>

          <p className='text-muted-foreground text-xl'>
            Így élték meg a közös tervezést és az általunk megalkotott esküvői dekorációkat.
          </p>
        </div>

        {/* Right Testimonial Carousel */}
        <div data-scroll-reveal className='relative max-w-196 sm:w-1/2 sm:px-10 lg:w-2/3 lg:px-12'>
          <CarouselPrevious
            variant='default'
            className='disabled:bg-primary/10 disabled:text-primary absolute top-1/2 left-0 z-10 size-9 -translate-y-1/2 rounded-full disabled:opacity-100 max-sm:hidden'
          />
          <CarouselContent className='sm:-ml-6'>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className='sm:pl-6 lg:basis-1/2'>
                <Card className='hover:border-primary group h-full p-0 transition-colors duration-300'>
                  <a
                    href={`/eskuvo/${testimonial.slug}`}
                    aria-label={`${testimonial.name} esküvői portfólió megnyitása`}
                    className='focus-visible:ring-ring block h-full p-6 outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                  >
                    <CardContent className='space-y-5 px-0'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='size-10 rounded-full'>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} loading='lazy' />
                          <AvatarFallback className='rounded-full text-sm'>
                            {testimonial.name
                              .split(' ', 2)
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className='flex-1'>
                          <h4 className='font-serif font-medium'>{testimonial.name}</h4>
                        </div>
                      </div>

                      <Rating readOnly variant='yellow' size={24} value={testimonial.rating} precision={0.5} />
                      <p>{testimonial.content}</p>
                      <p className='text-primary text-sm font-medium group-hover:underline'>Portfólió megtekintése</p>
                    </CardContent>
                  </a>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            variant='default'
            className='disabled:bg-primary/10 disabled:text-primary absolute top-1/2 right-0 z-10 size-9 -translate-y-1/2 rounded-full disabled:opacity-100 max-sm:hidden'
          />

          <div className='mt-6 flex items-center justify-center gap-4 sm:hidden'>
            <CarouselPrevious
              variant='default'
              className='disabled:bg-primary/10 disabled:text-primary static size-9 translate-y-0 rounded-full disabled:opacity-100'
            />
            <CarouselNext
              variant='default'
              className='disabled:bg-primary/10 disabled:text-primary static size-9 translate-y-0 rounded-full disabled:opacity-100'
            />
          </div>
        </div>
      </Carousel>
    </section>
  )
}

export default TestimonialsComponent
