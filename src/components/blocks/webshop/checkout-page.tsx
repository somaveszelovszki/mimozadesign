'use client'

import { useEffect, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/assets/data/webshop'
import { clearCart, resolveCart, useCart } from '@/lib/cart'

const baseInputClass = 'w-full rounded-md border px-3 py-2 text-base outline-none bg-background focus-visible:ring-2'
const validInputClass = 'border-border focus-visible:ring-ring'
const invalidInputClass = 'border-destructive focus-visible:ring-destructive'

const inputClassFor = (hasError: boolean) => `${baseInputClass} ${hasError ? invalidInputClass : validInputClass}`

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldKey = 'billingName' | 'billingAddress' | 'shippingAddress' | 'email'

const CheckoutPage = () => {
  const cart = useCart()
  const [mounted, setMounted] = useState(false)
  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [shippingAddress, setShippingAddress] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
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

  const validateField = (field: FieldKey): string | null => {
    switch (field) {
      case 'billingName':
        return billingName.trim() ? null : 'Kérlek add meg a számlázási nevet.'
      case 'billingAddress':
        return billingAddress.trim() ? null : 'Kérlek add meg a számlázási címet.'
      case 'shippingAddress':
        if (sameAsShipping) return null
        return shippingAddress.trim() ? null : 'Kérlek add meg a szállítási címet.'
      case 'email':
        if (!email.trim()) return 'Kérlek add meg az email-címet.'
        return EMAIL_PATTERN.test(email.trim()) ? null : 'Kérlek adj meg egy érvényes email-címet.'
    }
  }

  const validateAll = (): Partial<Record<FieldKey, string>> => {
    const fields: FieldKey[] = ['billingName', 'billingAddress', 'shippingAddress', 'email']
    const next: Partial<Record<FieldKey, string>> = {}
    for (const field of fields) {
      const message = validateField(field)
      if (message) next[field] = message
    }
    return next
  }

  const handleBlur = (field: FieldKey) => {
    const message = validateField(field)
    setErrors(prev => ({ ...prev, [field]: message ?? undefined }))
  }

  const clearError = (field: FieldKey) => {
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
    const nextErrors = validateAll()
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      const firstErrorId = Object.keys(nextErrors)[0]
      if (firstErrorId) {
        const map: Record<FieldKey, string> = {
          billingName: 'billing-name',
          billingAddress: 'billing-address',
          shippingAddress: 'shipping-address',
          email: 'email'
        }
        document.getElementById(map[firstErrorId as FieldKey])?.focus()
      }
      return
    }
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

  const fieldError = (field: FieldKey) => errors[field]

  return (
    <form className='grid gap-8 lg:grid-cols-[1fr_24rem]' onSubmit={handleSubmit} noValidate>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <label htmlFor='billing-name' className='text-foreground text-sm font-medium'>
            Számlázási név
          </label>
          <input
            id='billing-name'
            value={billingName}
            onChange={e => {
              setBillingName(e.target.value)
              clearError('billingName')
            }}
            onBlur={() => handleBlur('billingName')}
            aria-invalid={Boolean(fieldError('billingName'))}
            aria-describedby={fieldError('billingName') ? 'billing-name-error' : undefined}
            className={inputClassFor(Boolean(fieldError('billingName')))}
          />
          {fieldError('billingName') && (
            <p id='billing-name-error' className='text-destructive text-sm'>
              {fieldError('billingName')}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='billing-address' className='text-foreground text-sm font-medium'>
            Számlázási cím
          </label>
          <input
            id='billing-address'
            value={billingAddress}
            onChange={e => {
              setBillingAddress(e.target.value)
              clearError('billingAddress')
            }}
            onBlur={() => handleBlur('billingAddress')}
            aria-invalid={Boolean(fieldError('billingAddress'))}
            aria-describedby={fieldError('billingAddress') ? 'billing-address-error' : undefined}
            className={inputClassFor(Boolean(fieldError('billingAddress')))}
          />
          {fieldError('billingAddress') && (
            <p id='billing-address-error' className='text-destructive text-sm'>
              {fieldError('billingAddress')}
            </p>
          )}
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
                onChange={e => {
                  setSameAsShipping(e.target.checked)
                  if (e.target.checked) clearError('shippingAddress')
                }}
                className='size-4'
              />
              Megegyezik a számlázási címmel
            </label>
          </div>
          {!sameAsShipping && (
            <>
              <input
                id='shipping-address'
                value={shippingAddress}
                onChange={e => {
                  setShippingAddress(e.target.value)
                  clearError('shippingAddress')
                }}
                onBlur={() => handleBlur('shippingAddress')}
                aria-invalid={Boolean(fieldError('shippingAddress'))}
                aria-describedby={fieldError('shippingAddress') ? 'shipping-address-error' : undefined}
                className={inputClassFor(Boolean(fieldError('shippingAddress')))}
              />
              {fieldError('shippingAddress') && (
                <p id='shipping-address-error' className='text-destructive text-sm'>
                  {fieldError('shippingAddress')}
                </p>
              )}
            </>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='email' className='text-foreground text-sm font-medium'>
            Email-cím
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              clearError('email')
            }}
            onBlur={() => handleBlur('email')}
            autoComplete='email'
            inputMode='email'
            aria-invalid={Boolean(fieldError('email'))}
            aria-describedby={fieldError('email') ? 'email-error' : undefined}
            className={inputClassFor(Boolean(fieldError('email')))}
          />
          {fieldError('email') && (
            <p id='email-error' className='text-destructive text-sm'>
              {fieldError('email')}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='note' className='text-foreground text-sm font-medium'>
            Megjegyzés
          </label>
          <textarea
            id='note'
            rows={4}
            value={note}
            onChange={e => setNote(e.target.value)}
            className={inputClassFor(false)}
          />
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
