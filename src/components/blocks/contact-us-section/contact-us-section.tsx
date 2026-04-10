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
      <div aria-hidden='true' className='bg-muted absolute inset-0' />
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <h2 className='font-serif text-2xl font-semibold md:text-3xl lg:text-4xl'>Lépj kapcsolatba velünk</h2>
          <p className='text-muted-foreground text-xl'>
            Írd meg az elképzeléseiteket, és egyeztetünk egy rövid beszélgetést, ahol közösen kialakítjuk a dekoráció
            irányát.
          </p>
        </div>

        <div className='grid items-start gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-12'>
          <img
            src='/contact/kedves-mimoza.jpg'
            alt='Kapcsolatfelvétel a Mimóza Design csapatával'
            className='aspect-square w-full max-w-md justify-self-center object-cover lg:justify-self-end'
            loading='lazy'
          />

          <div className='flex h-full max-w-[24rem] flex-col justify-between'>
            {/* Contact Info Grid */}
            <div className='grid grid-cols-2 gap-4'>
              {contactInfo.map((info, index) => (
                <Card
                  className='bg-background hover:border-primary aspect-square overflow-hidden shadow-none transition-colors duration-300'
                  key={index}
                >
                  <CardContent className='flex h-full min-h-0 flex-col items-center justify-center gap-2.5 p-3 text-center sm:p-4'>
                    <Avatar className='size-8 border'>
                      <AvatarFallback className='bg-transparent [&>svg]:size-4.5'>
                        <info.icon />
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-1.5'>
                      <h4 className='font-serif text-sm font-semibold sm:text-base'>{info.title}</h4>
                      <div className='text-muted-foreground text-sm font-medium'>
                        {info.description.split('\n').map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button asChild size='lg' className='mx-auto mt-2 flex w-fit rounded-full px-10 text-base'>
              <a href='/kapcsolat'>Írj nekünk</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
