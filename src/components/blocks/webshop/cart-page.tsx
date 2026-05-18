'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/assets/data/webshop'
import { removeFromCart, resolveCart, updateQuantity, useCart } from '@/lib/cart'

const CartPage = () => {
  const cart = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
                className='h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28'
              />
            </a>
            <div className='min-w-0 flex-1 space-y-1'>
              <h3 className='font-serif text-lg font-medium'>{item.product.title}</h3>
              {item.product.sizes.length > 1 && (
                <p className='text-muted-foreground text-sm'>Méret: {item.size.sizeLabel}</p>
              )}
              <p className='text-foreground text-sm font-medium'>{formatPrice(item.size.price)} / db</p>
            </div>
            <div className='flex items-center gap-3'>
              <label className='text-muted-foreground text-sm' htmlFor={`qty-${item.productSlug}-${item.sizeId}`}>
                Db
              </label>
              <input
                id={`qty-${item.productSlug}-${item.sizeId}`}
                type='number'
                min={1}
                value={item.quantity}
                onChange={e => updateQuantity(item.productSlug, item.sizeId, Math.max(1, Number(e.target.value) || 1))}
                className='border-border bg-background focus-visible:ring-ring w-20 rounded-md border px-3 py-1.5 text-base outline-none focus-visible:ring-2'
              />
            </div>
            <div className='flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center'>
              <p className='text-foreground font-medium'>{formatPrice(item.lineTotal)}</p>
              <button
                type='button'
                onClick={() => removeFromCart(item.productSlug, item.sizeId)}
                className='text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline'
              >
                Eltávolítás
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className='border-border flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-foreground text-xl font-semibold'>Összesen: {formatPrice(total)}</p>
        <Button asChild className='rounded-full px-6'>
          <a href='/penztar'>Tovább a pénztárhoz</a>
        </Button>
      </div>
    </div>
  )
}

export default CartPage
