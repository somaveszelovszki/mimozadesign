'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [pathname, setPathname] = useState('/')
  const [scrollY, setScrollY] = useState(0)
  const [heroFadeDistance, setHeroFadeDistance] = useState(1)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isOverHero, setIsOverHero] = useState(false)

  const lastScrollYRef = useRef(0)
  const pathnameRef = useRef('/')
  const heroShadowThresholdRef = useRef(0)

  useEffect(() => {
    const HEADER_HEIGHT = 64
    const TOP_VISIBILITY_THRESHOLD = 24
    const HIDE_HEADER_SCROLL_THRESHOLD = 80

    const isHomepagePath = (path: string) => path === '/' || path === '/index.html'

    const syncHeroThreshold = (path: string) => {
      if (!isHomepagePath(path)) {
        heroShadowThresholdRef.current = 0
        return
      }

      const heroSection = document.querySelector<HTMLElement>('#home')
      if (!heroSection) {
        heroShadowThresholdRef.current = 0
        return
      }

      const heroRect = heroSection.getBoundingClientRect()
      const heroBottom = heroRect.top + window.scrollY + heroRect.height
      heroShadowThresholdRef.current = Math.max(heroBottom - HEADER_HEIGHT, 0)
    }

    const syncRouteAndViewport = () => {
      const nextPathname = window.location.pathname
      pathnameRef.current = nextPathname
      setPathname(nextPathname)
      setHeroFadeDistance(Math.max(window.innerHeight * 0.8, 1))
      syncHeroThreshold(nextPathname)
      setIsOverHero(isHomepagePath(nextPathname) && window.scrollY < heroShadowThresholdRef.current)
    }

    const syncScroll = () => {
      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollYRef.current

      setScrollY(currentScrollY)
      setIsOverHero(isHomepagePath(pathnameRef.current) && currentScrollY < heroShadowThresholdRef.current)

      if (currentScrollY <= TOP_VISIBILITY_THRESHOLD) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > previousScrollY && currentScrollY > HIDE_HEADER_SCROLL_THRESHOLD) {
        setIsHeaderVisible(false)
      } else if (currentScrollY < previousScrollY) {
        setIsHeaderVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', syncScroll)
    window.addEventListener('resize', syncRouteAndViewport)
    window.addEventListener('popstate', syncRouteAndViewport)
    document.addEventListener('astro:page-load', syncRouteAndViewport)
    syncRouteAndViewport()
    syncScroll()

    return () => {
      window.removeEventListener('scroll', syncScroll)
      window.removeEventListener('resize', syncRouteAndViewport)
      window.removeEventListener('popstate', syncRouteAndViewport)
      document.removeEventListener('astro:page-load', syncRouteAndViewport)
    }
  }, [])

  const isHomepage = pathname === '/' || pathname === '/index.html'
  const scrollProgress = Math.min(scrollY / heroFadeDistance, 1)
  const homeHeaderOpacity = 0.2 + scrollProgress * 0.8
  const homeHeaderTintPercent = homeHeaderOpacity * 100
  const shouldShowShadow = !isOverHero

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-16 w-full border-b transition-transform duration-300',
        {
          'border-white/35 backdrop-blur-md': isHomepage,
          'border-border bg-background': !isHomepage,
          'shadow-[0_10px_28px_rgba(15,15,15,0.22)]': shouldShowShadow,
          'translate-y-0': isHeaderVisible,
          '-translate-y-full': !isHeaderVisible
        },
        className
      )}
      style={
        isHomepage
          ? {
              backgroundColor: `color-mix(in srgb, var(--background) ${homeHeaderTintPercent}%, transparent)`
            }
          : undefined
      }
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
            className='rounded-full text-base has-[>svg]:px-6 max-sm:hidden'
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
