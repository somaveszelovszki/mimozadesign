'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  className?: string
}

const HeroSection = ({ className }: HeroSectionProps) => {
  return (
    <section id='home' className={`relative min-h-[100svh] w-full overflow-hidden ${className ?? ''}`}>
      <motion.img
        src='/weddings/reka-balint/reka-balint-8.jpg'
        alt='Mimóza Design hero kép'
        className='absolute left-0 h-[115%] w-full object-cover object-center'
        style={{ top: '-15%' }}
        initial={{ scale: 1, x: '0%', y: '0%' }}
        animate={{ scale: 1.08, x: '-2%', y: '-1%' }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        loading='eager'
        decoding='async'
      />

      <div className='absolute inset-0 bg-black/20' />

      <div className='relative mx-auto flex min-h-[100svh] w-full max-w-7xl items-center justify-center px-4'>
        <div className='text-center text-white'>
          <h1 className='font-sans text-4xl font-light tracking-[0.22em] uppercase sm:text-5xl'>MIMÓZA DESIGN</h1>
          <p className='font-sans mt-4 text-sm font-light tracking-[0.04em] sm:text-base'>
            ...mert minden szép történet egy szál virággal kezdődik
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
