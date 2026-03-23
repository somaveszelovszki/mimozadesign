'use client'

import { AnimatePresence, motion } from 'framer-motion'

import type { HeroVariantKey } from '@/assets/data/hero-variants'

export type HeroVisualSlide = {
  id: number
  img: string
  imgAlt: string
}

type HeroVariantSceneProps = {
  variantKey: HeroVariantKey
  currentSlide: HeroVisualSlide | null
  nextSlide: HeroVisualSlide | null
  previousSlide: HeroVisualSlide | null
}

const SceneImage = ({
  slide,
  className
}: {
  slide: HeroVisualSlide | null
  className?: string
}) => {
  if (!slide) {
    return null
  }

  return <img src={slide.img} alt={slide.imgAlt} className={className} loading='eager' decoding='async' />
}

const GalleryWallHero = ({ previousSlide, currentSlide, nextSlide }: HeroVariantSceneProps) => (
  <div className='absolute inset-0 overflow-hidden'>
    <motion.div
      className='absolute top-0 left-[-8%] h-full w-[36%] overflow-hidden'
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    >
      <SceneImage slide={previousSlide} className='h-full w-full object-cover opacity-70' />
    </motion.div>
    <div className='absolute top-0 left-[20%] h-full w-[60%] overflow-hidden border-x border-white/25'>
      <SceneImage slide={currentSlide} className='h-full w-full object-cover' />
    </div>
    <motion.div
      className='absolute top-0 right-[-7%] h-full w-[34%] overflow-hidden'
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
    >
      <SceneImage slide={nextSlide} className='h-full w-full object-cover opacity-70' />
    </motion.div>
  </div>
)

const PaperTexturePhotograph = ({ currentSlide }: HeroVariantSceneProps) => (
  <>
    <SceneImage slide={currentSlide} className='absolute inset-0 h-full w-full object-cover' />
    <motion.div
      className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,247,234,0.22),rgba(255,247,234,0.05)_40%,rgba(0,0,0,0.1)_80%)]'
      animate={{ opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className='absolute top-[8%] left-[6%] h-[72%] w-[44%] rounded-[1.5rem] border border-[#e8d9c7]/70 bg-[#f4ecdf]/70 shadow-xl'
      animate={{ rotate: [-0.4, 0.2, -0.4] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
    />
  </>
)

const HorizontalFilmstrip = ({ previousSlide, currentSlide, nextSlide }: HeroVariantSceneProps) => (
  <div className='absolute inset-0 overflow-hidden'>
    <motion.div
      className='absolute top-1/2 left-0 flex h-[72%] w-[150%] -translate-y-1/2 gap-4 px-4'
      animate={{ x: ['0%', '-6%'] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
    >
      {[previousSlide, currentSlide, nextSlide, previousSlide].map((slide, index) => (
        <div
          key={slide?.id ? `${slide.id}-${index}` : `film-${index}`}
          className='relative min-w-[36%] overflow-hidden rounded-2xl border border-white/25 bg-black/20'
        >
          <SceneImage slide={slide} className='h-full w-full object-cover' />
          <div className='absolute inset-0 bg-black/20' />
        </div>
      ))}
    </motion.div>
  </div>
)

const TopDownFloralTable = ({ currentSlide }: HeroVariantSceneProps) => (
  <>
    <SceneImage slide={currentSlide} className='absolute inset-0 h-full w-full object-cover' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.25),transparent_45%)]' />
    <motion.div
      className='absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),rgba(0,0,0,0.12)_65%)]'
      animate={{ opacity: [0.58, 0.72, 0.58] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
  </>
)

const NegativeSpacePortrait = ({ currentSlide }: HeroVariantSceneProps) => (
  <AnimatePresence mode='wait'>
    {currentSlide && (
      <motion.img
        key={`hero-negative-space-${currentSlide.id}`}
        src={currentSlide.img}
        alt={currentSlide.imgAlt}
        className='absolute inset-0 h-full w-full object-cover object-right'
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 8.5, ease: 'easeOut' }}
        loading='eager'
        decoding='async'
      />
    )}
  </AnimatePresence>
)

const DiptychDivider = ({ currentSlide, nextSlide }: HeroVariantSceneProps) => (
  <div className='absolute inset-0 grid grid-cols-[1fr_2px_1fr]'>
    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}>
      <SceneImage slide={currentSlide} className='h-full w-full object-cover' />
    </motion.div>
    <div className='h-full w-full bg-[#dcc8a6]/90' />
    <motion.div
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
    >
      <SceneImage slide={nextSlide} className='h-full w-full object-cover' />
    </motion.div>
  </div>
)

const EditorialMasthead = ({ currentSlide }: HeroVariantSceneProps) => (
  <AnimatePresence mode='wait'>
    {currentSlide && (
      <motion.img
        key={`hero-editorial-${currentSlide.id}`}
        src={currentSlide.img}
        alt={currentSlide.imgAlt}
        className='absolute inset-0 h-full w-full object-cover'
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        loading='eager'
        decoding='async'
      />
    )}
  </AnimatePresence>
)

const WindowLightHero = ({ currentSlide }: HeroVariantSceneProps) => (
  <>
    <SceneImage slide={currentSlide} className='absolute inset-0 h-full w-full object-cover' />
    <motion.div
      className='absolute top-0 left-0 h-full w-[52%] bg-[radial-gradient(circle_at_20%_25%,rgba(252,246,235,0.52),rgba(252,246,235,0.22)_42%,transparent_72%)]'
      animate={{ x: [0, 8, 0], opacity: [0.78, 0.9, 0.78] }}
      transition={{ duration: 10.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  </>
)

const SoftMosaic = ({ previousSlide, currentSlide, nextSlide }: HeroVariantSceneProps) => (
  <div className='absolute inset-0 grid grid-cols-6 grid-rows-5 gap-2 p-2 md:gap-3 md:p-3'>
    <div className='relative col-span-4 row-span-5 overflow-hidden rounded-2xl'>
      <SceneImage slide={currentSlide} className='h-full w-full object-cover' />
    </div>
    <motion.div
      className='relative col-span-2 row-span-2 overflow-hidden rounded-2xl'
      animate={{ opacity: [0.82, 1, 0.82] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    >
      <SceneImage slide={nextSlide} className='h-full w-full object-cover' />
    </motion.div>
    <div className='relative col-span-2 row-span-3 overflow-hidden rounded-2xl'>
      <SceneImage slide={previousSlide} className='h-full w-full object-cover' />
    </div>
  </div>
)

const SignatureObjectFocus = ({ currentSlide }: HeroVariantSceneProps) => (
  <>
    <SceneImage slide={currentSlide} className='absolute inset-0 h-full w-full scale-105 object-cover' />
    <motion.div
      className='absolute inset-0'
      animate={{ backdropFilter: ['blur(1px)', 'blur(3px)', 'blur(1px)'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className='h-full w-full' />
    </motion.div>
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.34)_75%)]' />
  </>
)

const HeroVariantScene = (props: HeroVariantSceneProps) => {
  switch (props.variantKey) {
    case 'gallery-wall':
      return <GalleryWallHero {...props} />
    case 'paper-texture':
      return <PaperTexturePhotograph {...props} />
    case 'horizontal-filmstrip':
      return <HorizontalFilmstrip {...props} />
    case 'top-down-floral':
      return <TopDownFloralTable {...props} />
    case 'negative-space-portrait':
      return <NegativeSpacePortrait {...props} />
    case 'diptych-divider':
      return <DiptychDivider {...props} />
    case 'editorial-masthead':
      return <EditorialMasthead {...props} />
    case 'window-light':
      return <WindowLightHero {...props} />
    case 'soft-mosaic':
      return <SoftMosaic {...props} />
    case 'signature-object':
      return <SignatureObjectFocus {...props} />
    default:
      return <GalleryWallHero {...props} />
  }
}

export default HeroVariantScene
