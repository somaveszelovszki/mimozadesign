import type { ComponentType } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

type ContactInfo = {
  title: string
  icon: ComponentType
  description: string
}[]

const ContactUs = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  return (
    <section id='contact-us' className='relative overflow-hidden py-12 sm:py-20 lg:py-28'>
      <div
        aria-hidden='true'
        className='bg-muted absolute inset-0 [clip-path:polygon(0_2.5rem,100%_0,100%_100%,0_100%)] sm:[clip-path:polygon(0_3rem,100%_0,100%_100%,0_100%)]'
      />
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <h2 className='font-serif text-2xl font-semibold md:text-3xl lg:text-4xl'>Lépj kapcsolatba velünk</h2>
          <p className='text-muted-foreground text-xl'>
            Írd meg az elképzeléseiteket, és egyeztetünk egy rövid beszélgetést, ahol közösen kialakítjuk a dekoráció
            irányát.
          </p>
        </div>

        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <img
            src='/wedding/reka-balint/reka-balint-4.jpg'
            alt='Kapcsolatfelvétel a Mimóza Memories csapatával'
            className='size-full object-cover max-lg:max-h-70'
            loading='lazy'
          />

          <div>
            <h3 className='font-serif mb-2 text-2xl'>Itt kezdődik a közös tervezés</h3>
            <p className='text-muted-foreground mb-10 text-lg'>
              Legyen szó teljes esküvői dekorációról vagy egyedi virágkötészetről, segítünk megtalálni a hozzátok illő
              megoldást.
            </p>

            {/* Contact Info Grid */}
            <div className='grid gap-6 sm:grid-cols-2'>
              {contactInfo.map((info, index) => (
                <Card
                  className='bg-background hover:border-primary shadow-none transition-colors duration-300'
                  key={index}
                >
                  <CardContent className='flex flex-col items-center gap-4 text-center'>
                    <Avatar className='size-9 border'>
                      <AvatarFallback className='bg-transparent [&>svg]:size-5'>
                        <info.icon />
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-3'>
                      <h4 className='font-serif text-lg font-semibold'>{info.title}</h4>
                      <div className='text-muted-foreground text-base font-medium'>
                        {info.description.split('\n').map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button asChild size='lg' className='mt-10 mx-auto flex w-fit rounded-full px-10 text-base'>
              <a href='/contact'>Írj nekünk</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
