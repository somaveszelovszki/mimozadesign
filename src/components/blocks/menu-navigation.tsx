import { useEffect, useState, type ReactNode } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import { cn } from '@/lib/utils'

export type NavigationItem = {
  title: string
  href: string
}

export type NavigationSection = {
  title: string
  icon?: ReactNode
} & (
  | {
      items: NavigationItem[]
      href?: never
    }
  | {
      items?: never
      href: string
    }
)

type MenuNavigationProps = {
  navigationData: NavigationSection[]
  className?: string
}

const isRouteActive = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`)

const MenuNavigation = ({ navigationData, className }: MenuNavigationProps) => {
  const [pathname, setPathname] = useState('/')

  useEffect(() => {
    const syncPathname = () => {
      setPathname(window.location.pathname)
    }

    syncPathname()
    window.addEventListener('popstate', syncPathname)
    document.addEventListener('astro:page-load', syncPathname)

    return () => {
      window.removeEventListener('popstate', syncPathname)
      document.removeEventListener('astro:page-load', syncPathname)
    }
  }, [])

  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className='flex-wrap justify-start gap-0'>
        {navigationData.map(navItem => {
          if (navItem.href) {
            const isActive = pathname !== '/' && isRouteActive(pathname, navItem.href)

            // Root link item
            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "relative rounded-full bg-transparent px-3 py-1.5 text-base! font-normal transition-colors duration-200 after:absolute after:bottom-1.5 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:content-[''] after:transition-[width] after:duration-[400ms]",
                    'hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10',
                    'hover:after:w-[calc(100%+0.375rem)]',
                    'focus:text-primary focus:bg-primary/5 dark:focus:bg-primary/10',
                    'text-black',
                    isActive && 'text-black after:w-[calc(100%+0.375rem)]'
                  )}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          // Section with dropdown
          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className='text-black hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 focus:text-primary focus:bg-primary/5 dark:focus:bg-primary/10 data-[state=open]:text-primary data-[state=open]:bg-primary/5 dark:data-[state=open]:bg-primary/10 data-[state=open]:hover:bg-primary/5 dark:data-[state=open]:hover:bg-primary/10 bg-transparent px-3 py-1.5 text-base [&>svg]:size-4'>
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
                <ul className='grid w-38 gap-4'>
                  <li>
                    {navItem.items?.map(item => (
                      <NavigationMenuLink key={item.title} href={item.href}>
                        {item.title}
                      </NavigationMenuLink>
                    ))}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuNavigation
