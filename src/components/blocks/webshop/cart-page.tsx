'use client'

import { useEffect, useState } from 'react'
import { Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/assets/data/webshop'
import { removeFromCart, resolveCart, updateQuantity, useCart } from '@/lib/cart'

type PendingRemoval = { productSlug: string; sizeId: string; title: string }

const CartPage = () => {
  const cart = useCart()
  const [mounted, setMounted] = useState(false)
  const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!pendingRemoval) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPendingRemoval(null)
    }
    window.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [pendingRemoval])

  const confirmRemoval = () => {
    if (!pendingRemoval) return
    removeFromCart(pendingRemoval.productSlug, pendingRemoval.sizeId)
    setPendingRemoval(null)
  }

  if (!mounted) {
    return <div className='text-muted-foreground'>Kosár betöltése...</div>
  }

  const items = resolveCart(cart)
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0)

  if (items.length === 0) {
    return (
      <div className='space-y-4'>
        <p className='text-muted-foreground text-lg'>A kosarad jelenleg üres.</p>
        <Button asChild className='rounded-full px-6'>
          <a href='/webshop'>Tovább a webshopba</a>
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <div className='space-y-4'>
        {items.map(item => (
          <article
            key={`${item.productSlug}-${item.sizeId}`}
            className='border-border bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:p-5'
          >
            <a href={`/webshop/${item.productSlug}?size=${item.sizeId}`} className='shrink-0'>
              <img
                src={item.product.profileImage}
                alt={item.product.title}
                className='h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28'
              />
            </a>
            <div className='min-w-0 flex-1 space-y-1'>
              <h3 className='font-serif text-lg font-medium'>{item.product.title}</h3>
              {item.product.sizes.length > 1 && (
                <p className='text-muted-foreground text-sm'>Méret: {item.size.sizeLabel}</p>
              )}
              <p className='text-foreground text-sm font-medium'>{formatPrice(item.size.price)} / db</p>
            </div>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-3'>
                <label className='text-muted-foreground text-sm' htmlFor={`qty-${item.productSlug}-${item.sizeId}`}>
                  Darabszám
                </label>
                <input
                  id={`qty-${item.productSlug}-${item.sizeId}`}
                  type='number'
                  min={1}
                  value={item.quantity}
                  onChange={e =>
                    updateQuantity(item.productSlug, item.sizeId, Math.max(1, Number(e.target.value) || 1))
                  }
                  className='border-border bg-background focus-visible:ring-ring w-20 rounded-md border px-3 py-1.5 text-base outline-none focus-visible:ring-2'
                />
              </div>
              <p className='text-foreground min-w-24 text-right font-medium sm:min-w-28'>
                {formatPrice(item.lineTotal)}
              </p>
            </div>
            <div className='border-border hidden h-16 self-center border-l sm:ml-6 sm:block' aria-hidden='true' />
            <button
              type='button'
              onClick={() =>
                setPendingRemoval({
                  productSlug: item.productSlug,
                  sizeId: item.sizeId,
                  title: item.product.title
                })
              }
              aria-label='Eltávolítás'
              title='Eltávolítás'
              className='text-muted-foreground hover:text-foreground hover:bg-muted ml-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors sm:ml-2'
            >
              <Trash2Icon className='h-4 w-4' />
            </button>
          </article>
        ))}
      </div>

      <div className='border-border flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-foreground text-xl font-semibold'>Összesen: {formatPrice(total)}</p>
        <Button asChild className='rounded-full px-6'>
          <a href='/penztar'>Tovább a pénztárhoz</a>
        </Button>
      </div>

      {pendingRemoval && (
        <div
          role='dialog'
          aria-modal='true'
          aria-labelledby='remove-dialog-title'
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
        >
          <button
            type='button'
            aria-label='Bezárás'
            onClick={() => setPendingRemoval(null)}
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
          />
          <div className='border-border bg-card relative z-10 w-full max-w-md rounded-2xl border p-6 shadow-xl sm:p-8'>
            <h2 id='remove-dialog-title' className='font-serif text-2xl font-medium'>
              Termék eltávolítása
            </h2>
            <p className='text-muted-foreground mt-3 text-base'>
              Biztosan eltávolítod {/^[aeiouáéíóöőúüű]/i.test(pendingRemoval.title) ? 'az' : 'a'}{' '}
              <span className='text-foreground font-medium'>{pendingRemoval.title}</span> terméket a kosárból?
            </p>
            <div className='mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setPendingRemoval(null)}
                className='rounded-full px-6'
              >
                Mégse
              </Button>
              <Button type='button' onClick={confirmRemoval} className='rounded-full px-6'>
                Eltávolítás
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
