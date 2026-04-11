'use client'

import { useRef } from 'react'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface HeroSectionProps {
  className?: string
}

const HeroSection = ({ className }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section
      id='home'
      ref={sectionRef}
      className={`scroll-reveal-exempt relative min-h-[100svh] w-full overflow-hidden ${className ?? ''}`}
    >
      <motion.img
        src='/hero.jpg'
        alt='Mimóza Design hero kép'
        className='absolute left-0 h-[115%] w-full object-cover object-center will-change-transform'
        style={{
          top: '-15%',
          y: shouldReduceMotion ? 0 : imageParallaxY
        }}
        loading='eager'
        decoding='async'
      />

      <div className='absolute inset-0 bg-black/20' />

      <div className='relative mx-auto flex min-h-[100svh] w-full max-w-7xl items-center justify-center px-4'>
        <div className='text-center text-white'>
          <h1 className='font-sans text-[2.25rem] leading-none font-light tracking-[0.22em] uppercase sm:text-[3.25rem] md:text-[4.25rem]'>
            MIMÓZA DESIGN
          </h1>
          <p className='mt-5 font-sans text-lg font-light tracking-[0.04em] sm:text-xl md:text-2xl'>
            ...mert minden szép történet egy szál virággal kezdődik
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
