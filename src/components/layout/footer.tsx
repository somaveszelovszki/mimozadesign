import { FacebookIcon, InstagramIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type FooterProps = {
  className?: string
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn('bg-background', className)}>
      <div className='mx-auto mb-8 w-full max-w-7xl px-4 pt-8 pb-12 sm:px-6'>
        <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-between'>
          <div className='hidden sm:block sm:flex-1' />
          <p className='text-muted-foreground text-center text-sm'>
            {`©${new Date().getFullYear()}`}{' '}
            <a href='/' className='hover:underline'>
              Mimóza Design
            </a>
            , természetes és személyes esküvői dekoráció.
          </p>
          <div className='flex sm:flex-1 sm:justify-end'>
            <div className='inline-flex items-center gap-4'>
              <a
                href='https://www.facebook.com/mimozadesign'
                className='hover:text-primary'
                target='_blank'
                rel='noreferrer'
              >
                <FacebookIcon className='size-5' />
              </a>
              <a
                href='https://www.instagram.com/mimozaDesign'
                className='hover:text-primary hidden'
                target='_blank'
                rel='noreferrer'
              >
                <InstagramIcon className='size-5' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
