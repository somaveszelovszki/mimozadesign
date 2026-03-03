import { ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
const AboutUs = () => {
  return (
    <section
      id='about-us'
      className='before:bg-muted relative py-8 before:absolute before:inset-0 before:-z-10 before:skew-y-3 sm:py-16 lg:py-24'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center space-y-4 text-center md:mb-16 lg:mb-24'>
          <h2 className='font-serif text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl'>A Mimóza története</h2>
          <p className='text-muted-foreground text-xl'>
            Liza építészeti szemléletét és virágkötészeti tapasztalatát ötvözve alkotunk olyan tereket, amelyek
            egyszerre elegánsak, természetesek és személyesek.
          </p>
          <Button
            size='lg'
            asChild
            className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
          >
            <a href='/about-us'>
              Többet rólunk
              <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
            </a>
          </Button>
        </div>

        {/* About image */}
        <div className='relative mb-8 h-full w-full sm:mb-16 lg:mb-24'>
          <img
            src='/about-me/liza-working.jpg'
            alt='Mimóza Memories dekoráció'
            className='h-full w-full object-cover'
            loading='lazy'
          />
        </div>
      </div>
    </section>
  )
}

export default AboutUs
