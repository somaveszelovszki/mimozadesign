'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { addToCart } from '@/lib/cart'
import { formatPrice, type Product } from '@/assets/data/webshop'

type ProductPurchaseProps = {
  product: Product
  initialSizeId: string
}

const ProductPurchase = ({ product, initialSizeId }: ProductPurchaseProps) => {
  const [sizeId, setSizeId] = useState(
    product.sizes.some(s => s.id === initialSizeId) ? initialSizeId : product.sizes[0].id
  )

  const [quantity, setQuantity] = useState(1)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showCartLink, setShowCartLink] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const querySize = params.get('size')

    if (querySize && product.sizes.some(s => s.id === querySize)) {
      setSizeId(querySize)
    }
  }, [product])

  const size = product.sizes.find(s => s.id === sizeId) ?? product.sizes[0]
  const hasMultipleSizes = product.sizes.length > 1

  const handleAdd = () => {
    if (quantity < 1) return
    addToCart(product.slug, size.id, quantity)
    setFeedback(`${quantity} db hozzáadva a kosárhoz.`)
    setShowCartLink(true)
    window.setTimeout(() => setFeedback(null), 3000)
  }

  return (
    <div className='space-y-5'>
      {hasMultipleSizes && (
        <div className='space-y-2'>
          <label htmlFor='size-select' className='text-foreground text-sm font-medium'>
            Méret
          </label>
          <select
            id='size-select'
            value={sizeId}
            onChange={e => setSizeId(e.target.value)}
            className='border-border bg-background focus-visible:ring-ring w-full appearance-none rounded-md border bg-[length:1rem_1rem] bg-[right_0.75rem_center] bg-no-repeat py-2 pr-10 pl-3 text-base outline-none focus-visible:ring-2'
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/></svg>\")"
            }}
          >
            {product.sizes.map(s => (
              <option key={s.id} value={s.id}>
                {s.sizeLabel}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className='text-foreground text-2xl font-semibold'>{formatPrice(size.price)}</div>

      <div className='flex flex-row items-center gap-4'>
        <label htmlFor='quantity-input' className='text-foreground text-sm font-medium'>
          Darabszám
        </label>
        <input
          id='quantity-input'
          type='number'
          min={1}
          value={quantity}
          onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          className='border-border bg-background focus-visible:ring-ring w-28 rounded-md border px-3 py-2 text-base outline-none focus-visible:ring-2'
        />
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <Button type='button' onClick={handleAdd} className='rounded-full px-6'>
          Kosárba
        </Button>
        {showCartLink && (
          <Button asChild variant='outline' className='rounded-full px-6'>
            <a href='/kosar'>Tovább a kosárhoz</a>
          </Button>
        )}
      </div>

      {feedback && <p className='text-primary text-sm font-medium'>{feedback}</p>}
    </div>
  )
}

export default ProductPurchase
