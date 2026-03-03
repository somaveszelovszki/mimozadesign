'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type MenuData = {
  id: number
  img: string
  imgAlt: string
  userAvatar: string
  userComment: string
}

interface HeroSectionProps {
  menudata: MenuData[]
  className?: string
}

const kineticWords = [
  'szál virág',
  'mosoly',
  'közös élmény',
  'kis törődés',
  'kedves szó',
  'szép gondolat',
  'kis meglepetés',
  'finom süti'
]

const averageDynamicWordLength = Math.round(
  kineticWords.reduce((total, word) => total + Array.from(word).length, 0) / kineticWords.length
)

const HeroSection = ({ menudata, className }: HeroSectionProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTextIndex, setActiveTextIndex] = useState(0)

  useEffect(() => {
    if (menudata.length <= 1) {
      return
    }

    const imageIntervalId = window.setInterval(() => {
      setActiveImageIndex(previousIndex => (previousIndex + 1) % menudata.length)
    }, 8000)

    return () => {
      window.clearInterval(imageIntervalId)
    }
  }, [menudata.length])

  useEffect(() => {
    const textIntervalId = window.setInterval(() => {
      setActiveTextIndex(previousIndex => previousIndex + 1)
    }, 4500)

    return () => {
      window.clearInterval(textIntervalId)
    }
  }, [])

  const activeImage = menudata.length > 0 ? menudata[activeImageIndex % menudata.length] : null
  const dynamicWord = kineticWords[activeTextIndex % kineticWords.length]

  return (
    <section
      id='home'
      className={`relative min-h-[calc(100svh-4rem)] w-full bg-gradient-to-br from-background via-muted/55 to-secondary/45 py-8 sm:py-12 lg:py-16 ${className ?? ''}`}
    >
      <div className='mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8'>
        <p className='text-muted-foreground mb-5 text-xs tracking-[0.14em] uppercase'>Mimoza memories</p>
        <h1 className='text-foreground font-serif inline-flex whitespace-nowrap text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-6xl'>
          <span>...mert néha elég egy&nbsp;</span>
          <span
            className='text-accent inline-block text-left'
            style={{ width: `${averageDynamicWordLength}ch` }}
          >
            <AnimatePresence mode='wait'>
              <motion.span
                key={`kinetic-word-${activeTextIndex}`}
                className='inline-block'
                initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                {dynamicWord}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <p className='text-muted-foreground mt-8 max-w-2xl text-base sm:text-lg'>
          Természetes, személyes, időtálló virágdekorációkat tervezünk a ti történetetekhez, mindig szeretettel.
        </p>
        <div className='mt-10 flex flex-wrap justify-center gap-3'>
          <a href='#contact' className='bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90'>
            Kezdd el
          </a>
          <a href='#services' className='border-border bg-card text-foreground rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted'>
            Folyamat megnezese
          </a>
        </div>

        <div className='border-border mt-12 h-56 w-full max-w-2xl overflow-hidden rounded-2xl border shadow-lg'>
          <AnimatePresence mode='wait'>
            {activeImage && (
              <motion.img
                key={`kinetic-image-${activeImage.id}-${activeImageIndex}`}
                src={activeImage.img}
                alt={activeImage.imgAlt}
                className='h-full w-full object-cover'
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1.06 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                loading='lazy'
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
