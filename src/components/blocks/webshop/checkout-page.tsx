'use client'

import { useEffect, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/assets/data/webshop'
import { clearCart, resolveCart, useCart } from '@/lib/cart'

const inputClass =
  'border-border bg-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-base outline-none focus-visible:ring-2'

const CheckoutPage = () => {
  const cart = useCart()
  const [mounted, setMounted] = useState(false)
  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [shippingAddress, setShippingAddress] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className='text-muted-foreground'>Pénztár betöltése...</div>
  }

  const items = resolveCart(cart)
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0)

  if (submitted) {
    return (
      <div className='space-y-6'>
        <div className='border-border bg-card space-y-3 rounded-xl border p-6'>
          <h2 className='font-serif text-2xl font-semibold'>Köszönjük a rendelést!</h2>
          <p className='text-muted-foreground'>
            Hamarosan elküldjük a díjbekérőt a megadott email-címre. A rendelésed a fizetés beérkezése után válik
            véglegessé.
          </p>
        </div>
        <Button asChild className='rounded-full px-6'>
          <a href='/webshop'>Vissza a webshopba</a>
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='space-y-4'>
        <p className='text-muted-foreground text-lg'>A kosarad üres, így nincs mit kifizetni.</p>
        <Button asChild className='rounded-full px-6'>
          <a href='/webshop'>Tovább a webshopba</a>
        </Button>
      </div>
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setErrorMessage(null)
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billingName,
          billingAddress,
          shippingSameAsBilling: sameAsShipping,
          shippingAddress: sameAsShipping ? '' : shippingAddress,
          email,
          note,
          items: cart.map(item => ({
            productSlug: item.productSlug,
            sizeId: item.sizeId,
            quantity: item.quantity
          }))
        })
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) {
        setErrorMessage(data.error ?? 'Nem sikerült elküldeni a rendelést. Próbáld újra később.')
        return
      }
      clearCart()
      setSubmitted(true)
    } catch {
      setErrorMessage('Hálózati hiba. Ellenőrizd az internetkapcsolatot és próbáld újra.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className='grid gap-8 lg:grid-cols-[1fr_24rem]' onSubmit={handleSubmit}>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <label htmlFor='billing-name' className='text-foreground text-sm font-medium'>
            Számlázási név
          </label>
          <input
            id='billing-name'
            required
            value={billingName}
            onChange={e => setBillingName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='billing-address' className='text-foreground text-sm font-medium'>
            Számlázási cím
          </label>
          <input
            id='billing-address'
            required
            value={billingAddress}
            onChange={e => setBillingAddress(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between gap-3'>
            <label htmlFor='shipping-address' className='text-foreground text-sm font-medium'>
              Szállítási cím
            </label>
            <label className='text-muted-foreground inline-flex items-center gap-2 text-sm'>
              <input
                type='checkbox'
                checked={sameAsShipping}
                onChange={e => setSameAsShipping(e.target.checked)}
                className='size-4'
              />
              Megegyezik a számlázási címmel
            </label>
          </div>
          {!sameAsShipping && (
            <input
              id='shipping-address'
              required={!sameAsShipping}
              value={shippingAddress}
              onChange={e => setShippingAddress(e.target.value)}
              className={inputClass}
            />
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='email' className='text-foreground text-sm font-medium'>
            Email-cím
          </label>
          <input
            id='email'
            type='email'
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='note' className='text-foreground text-sm font-medium'>
            Megjegyzés
          </label>
          <textarea id='note' rows={4} value={note} onChange={e => setNote(e.target.value)} className={inputClass} />
        </div>

        <div className='border-border bg-muted/40 text-muted-foreground space-y-2 rounded-xl border p-4 text-sm'>
          <p>
            <strong className='text-foreground'>Fizetés:</strong> A rendelés leadása után díjbekérőt küldünk a megadott
            email-címre. A rendelésed a díjbekérő kiegyenlítése után válik véglegessé.
          </p>
        </div>

        {errorMessage && (
          <p className='text-destructive text-sm font-medium' role='alert'>
            {errorMessage}
          </p>
        )}

        <Button type='submit' disabled={submitting} className='rounded-full px-6'>
          {submitting ? 'Küldés...' : 'Megrendelem'}
        </Button>
      </div>

      <aside className='border-border bg-card h-fit space-y-4 rounded-xl border p-5'>
        <h2 className='font-serif text-xl font-semibold'>Rendelés összegzése</h2>
        <ul className='divide-border space-y-3 divide-y'>
          {items.map(item => (
            <li key={`${item.productSlug}-${item.sizeId}`} className='flex gap-3 pt-3 first:pt-0'>
              <img
                src={item.product.profileImage}
                alt={item.product.title}
                className='h-16 w-16 shrink-0 rounded-lg object-cover'
              />
              <div className='min-w-0 flex-1 space-y-0.5'>
                <p className='text-foreground text-sm font-medium'>{item.product.title}</p>
                {item.product.sizes.length > 1 && (
                  <p className='text-muted-foreground text-xs'>Méret: {item.size.sizeLabel}</p>
                )}
                <p className='text-muted-foreground text-xs'>
                  {item.quantity} × {formatPrice(item.size.price)}
                </p>
              </div>
              <p className='text-foreground text-sm font-medium'>{formatPrice(item.lineTotal)}</p>
            </li>
          ))}
        </ul>
        <div className='border-border flex items-center justify-between border-t pt-4'>
          <p className='text-foreground font-medium'>Összesen</p>
          <p className='text-foreground text-lg font-semibold'>{formatPrice(total)}</p>
        </div>
      </aside>
    </form>
  )
}

export default CheckoutPage
