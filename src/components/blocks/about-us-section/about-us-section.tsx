import { ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const AboutUs = () => {
  return (
    <section id='about-us' className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8'>
        {/* Header */}
        <div className='mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4 text-center lg:mx-0 lg:items-start lg:text-left'>
          <h2 className='font-serif text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl'>
            A Mimóza története
          </h2>
          <p className='text-muted-foreground text-xl'>
            Liza építészeti szemléletét és virágkötészeti tapasztalatát ötvözve alkotunk olyan tereket, amelyek
            egyszerre elegánsak, természetesek és személyesek.
          </p>
          <Button size='lg' asChild className='rounded-full text-base has-[>svg]:px-6'>
            <a href='/about-us'>
              Többet rólunk
              <ArrowRightIcon className='transition-transform duration-200' />
            </a>
          </Button>
        </div>

        {/* About image */}
        <div className='relative mx-auto w-full max-w-sm lg:ml-auto lg:max-w-md'>
          <img
            src='/about-us/liza-profile.jpg'
            alt='Liza, a Mimóza alapítója'
            className='aspect-[4/5] w-full object-cover'
            loading='lazy'
          />
        </div>
      </div>
    </section>
  )
}

export default AboutUs
