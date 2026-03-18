'use client'

import { useEffect, useState } from 'react'

import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import MenuDropdown from '@/components/blocks/menu-dropdown'
import MenuNavigation from '@/components/blocks/menu-navigation'
import type { NavigationSection } from '@/components/blocks/menu-navigation'

import { cn } from '@/lib/utils'

type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-16 w-full border-b transition-all duration-300',
        {
          'bg-background shadow-md': isScrolled
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <a href='/' className='flex items-center'>
          <span
            className='h-14 shrink-0 overflow-hidden sm:h-16'
            style={{ aspectRatio: '1.846' }}
          >
            <img
              src='/mimoza-memories-logo.png'
              alt='Mimóza Memories'
              className='h-full w-auto max-w-none translate-y-1 transform-gpu'
              loading='eager'
              decoding='async'
            />
          </span>
        </a>

        {/* Navigation */}
        <MenuNavigation navigationData={navigationData} className='**:data-[slot=navigation-menu-list]:gap-1 max-lg:hidden' />

        {/* Actions */}
        <div className='flex items-center'>
          <Button
            className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 max-sm:hidden'
            asChild
          >
            <a href='/contact'>Ajánlatkérés</a>
          </Button>

          {/* Mobile book table button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='ml-4 rounded-full sm:hidden' asChild>
                  <a href='/contact'>Kapcsolat</a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Kapcsolat</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Mobile menu button */}
          <MenuDropdown
            align='end'
            navigationData={navigationData}
            trigger={
              <Button variant='outline' size='icon' className='ml-3 rounded-full lg:hidden'>
                <MenuIcon />
                <span className='sr-only'>Menu</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  )
}

export default Header
