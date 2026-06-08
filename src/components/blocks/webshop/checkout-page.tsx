'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'

import { lookupCityByPostalCode } from '@/assets/data/hungarian-postal-codes'
import { formatPrice } from '@/assets/data/webshop'
import { Button } from '@/components/ui/button'
import { clearCart, resolveCart, useCart } from '@/lib/cart'

const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

type TurnstileApi = {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string
      theme?: string
      language?: string
      callback?: (token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
    }
  ) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const baseInputClass = 'w-full rounded-md border px-3 py-2 text-base outline-none bg-background focus-visible:ring-2'
const validInputClass = 'border-border focus-visible:ring-ring'
const invalidInputClass = 'border-destructive focus-visible:ring-destructive'

const inputClassFor = (hasError: boolean) => `${baseInputClass} ${hasError ? invalidInputClass : validInputClass}`

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const POSTAL_PATTERN = /^\d{4}$/

type AddressKey = 'billing' | 'shipping'

type Address = {
  postalCode: string
  city: string
  street: string
}

const EMPTY_ADDRESS: Address = { postalCode: '', city: '', street: '' }

const formatAddress = (a: Address) => `${a.postalCode} ${a.city}, ${a.street}`.trim()

type FieldKey =
  | 'billingName'
  | 'billingPostalCode'
  | 'billingCity'
  | 'billingStreet'
  | 'shippingPostalCode'
  | 'shippingCity'
  | 'shippingStreet'
  | 'email'

const CheckoutPage = () => {
  const cart = useCart()
  const [mounted, setMounted] = useState(false)
  const [billingName, setBillingName] = useState('')
  const [billing, setBilling] = useState<Address>(EMPTY_ADDRESS)
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [shipping, setShipping] = useState<Address>(EMPTY_ADDRESS)
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Anti-spam: honeypot field hidden from real users, and a load timestamp for the time-trap.
  const [honeypot, setHoneypot] = useState('')
  const loadedAtRef = useRef(Date.now())
  const turnstileRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const turnstileTokenRef = useRef('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      return
    }

    const render = () => {
      if (!turnstileRef.current || widgetIdRef.current !== null || !window.turnstile) {
        return
      }

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'light',
        language: 'hu',
        callback: token => {
          turnstileTokenRef.current = token
        },
        'expired-callback': () => {
          turnstileTokenRef.current = ''
        },
        'error-callback': () => {
          turnstileTokenRef.current = ''
        }
      })
    }

    if (window.turnstile) {
      render()

      return
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT_SRC}"]`)

    if (!script) {
      script = document.createElement('script')
      script.src = TURNSTILE_SCRIPT_SRC
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    script.addEventListener('load', render)

    return () => {
      script?.removeEventListener('load', render)

      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [mounted])

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

  const validatePostalCode = (value: string): string | null => {
    if (!value.trim()) return 'Kérlek add meg az irányítószámot.'
    if (!POSTAL_PATTERN.test(value.trim())) return 'Kérlek adj meg egy érvényes 4-jegyű irányítószámot.'

    return null
  }

  const validateField = (field: FieldKey): string | null => {
    switch (field) {
      case 'billingName':
        return billingName.trim() ? null : 'Kérlek add meg a számlázási nevet.'
      case 'billingPostalCode':
        return validatePostalCode(billing.postalCode)
      case 'billingCity':
        return billing.city.trim() ? null : 'Kérlek add meg a települést.'
      case 'billingStreet':
        return billing.street.trim() ? null : 'Kérlek add meg az utcát és házszámot.'
      case 'shippingPostalCode':
        return sameAsShipping ? null : validatePostalCode(shipping.postalCode)
      case 'shippingCity':
        return sameAsShipping || shipping.city.trim() ? null : 'Kérlek add meg a települést.'
      case 'shippingStreet':
        return sameAsShipping || shipping.street.trim() ? null : 'Kérlek add meg az utcát és házszámot.'
      case 'email':
        if (!email.trim()) return 'Kérlek add meg az email-címet.'

        return EMAIL_PATTERN.test(email.trim()) ? null : 'Kérlek adj meg egy érvényes email-címet.'
    }
  }

  const fieldKeys: FieldKey[] = [
    'billingName',
    'billingPostalCode',
    'billingCity',
    'billingStreet',
    'shippingPostalCode',
    'shippingCity',
    'shippingStreet',
    'email'
  ]

  const validateAll = (): Partial<Record<FieldKey, string>> => {
    const next: Partial<Record<FieldKey, string>> = {}

    for (const field of fieldKeys) {
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

  const updateAddress = (key: AddressKey, patch: Partial<Address>) => {
    const setter = key === 'billing' ? setBilling : setShipping

    setter(prev => ({ ...prev, ...patch }))
  }

  const handlePostalCodeChange = (key: AddressKey, value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 4)
    const current = key === 'billing' ? billing : shipping
    const matchedCity = digitsOnly.length === 4 ? lookupCityByPostalCode(digitsOnly) : null
    const nextCity = matchedCity ?? current.city

    updateAddress(key, { postalCode: digitsOnly, city: nextCity })
    clearError(`${key}PostalCode` as FieldKey)
    if (matchedCity) clearError(`${key}City` as FieldKey)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
    const nextErrors = validateAll()

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      const firstErrorKey = fieldKeys.find(k => nextErrors[k])

      if (firstErrorKey) {
        const idMap: Record<FieldKey, string> = {
          billingName: 'billing-name',
          billingPostalCode: 'billing-postal-code',
          billingCity: 'billing-city',
          billingStreet: 'billing-street',
          shippingPostalCode: 'shipping-postal-code',
          shippingCity: 'shipping-city',
          shippingStreet: 'shipping-street',
          email: 'email'
        }

        document.getElementById(idMap[firstErrorKey])?.focus()
      }

      return
    }

    if (TURNSTILE_SITE_KEY && !turnstileTokenRef.current) {
      setErrorMessage('Kérlek várj, amíg a robotellenőrzés befejeződik, majd próbáld újra.')

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
          billingAddress: formatAddress(billing),
          shippingSameAsBilling: sameAsShipping,
          shippingAddress: sameAsShipping ? '' : formatAddress(shipping),
          email,
          note,
          website: honeypot,
          elapsed: Date.now() - loadedAtRef.current,
          turnstileToken: turnstileTokenRef.current,
          items: cart.map(item => ({
            productSlug: item.productSlug,
            sizeId: item.sizeId,
            quantity: item.quantity
          }))
        })
      })

      if (!response.ok) {
        setErrorMessage('Nem sikerült elküldeni a rendelést. Próbáld újra később.')

        // Tokens are single-use — reset so the customer can retry.
        if (widgetIdRef.current !== null) window.turnstile?.reset(widgetIdRef.current)
        turnstileTokenRef.current = ''

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

  const renderAddressFields = (key: AddressKey) => {
    const address = key === 'billing' ? billing : shipping
    const idPrefix = key === 'billing' ? 'billing' : 'shipping'
    const postalKey = (key + 'PostalCode') as FieldKey
    const cityKey = (key + 'City') as FieldKey
    const streetKey = (key + 'Street') as FieldKey

    return (
      <div className='grid gap-4 sm:grid-cols-[8rem_1fr]'>
        <div className='space-y-2'>
          <label htmlFor={`${idPrefix}-postal-code`} className='text-foreground text-sm font-medium'>
            Irányítószám
          </label>
          <input
            id={`${idPrefix}-postal-code`}
            inputMode='numeric'
            autoComplete='postal-code'
            maxLength={4}
            value={address.postalCode}
            onChange={e => handlePostalCodeChange(key, e.target.value)}
            onBlur={() => handleBlur(postalKey)}
            aria-invalid={Boolean(fieldError(postalKey))}
            aria-describedby={fieldError(postalKey) ? `${idPrefix}-postal-code-error` : undefined}
            className={inputClassFor(Boolean(fieldError(postalKey)))}
          />
          {fieldError(postalKey) && (
            <p id={`${idPrefix}-postal-code-error`} className='text-destructive text-sm'>
              {fieldError(postalKey)}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <label htmlFor={`${idPrefix}-city`} className='text-foreground text-sm font-medium'>
            Település
          </label>
          <input
            id={`${idPrefix}-city`}
            autoComplete='address-level2'
            value={address.city}
            onChange={e => {
              updateAddress(key, { city: e.target.value })
              clearError(cityKey)
            }}
            onBlur={() => handleBlur(cityKey)}
            aria-invalid={Boolean(fieldError(cityKey))}
            aria-describedby={fieldError(cityKey) ? `${idPrefix}-city-error` : undefined}
            className={inputClassFor(Boolean(fieldError(cityKey)))}
          />
          {fieldError(cityKey) && (
            <p id={`${idPrefix}-city-error`} className='text-destructive text-sm'>
              {fieldError(cityKey)}
            </p>
          )}
        </div>
        <div className='space-y-2 sm:col-span-2'>
          <label htmlFor={`${idPrefix}-street`} className='text-foreground text-sm font-medium'>
            Utca, házszám, emelet/ajtó
          </label>
          <input
            id={`${idPrefix}-street`}
            autoComplete='street-address'
            placeholder='pl. Petőfi Sándor utca 12. 2. em. 5.'
            value={address.street}
            onChange={e => {
              updateAddress(key, { street: e.target.value })
              clearError(streetKey)
            }}
            onBlur={() => handleBlur(streetKey)}
            aria-invalid={Boolean(fieldError(streetKey))}
            aria-describedby={fieldError(streetKey) ? `${idPrefix}-street-error` : undefined}
            className={inputClassFor(Boolean(fieldError(streetKey)))}
          />
          {fieldError(streetKey) && (
            <p id={`${idPrefix}-street-error`} className='text-destructive text-sm'>
              {fieldError(streetKey)}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <form className='grid gap-8 lg:grid-cols-[1fr_24rem]' onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real users; bots fill it and get rejected. */}
      <div aria-hidden='true' style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <label htmlFor='website'>Weboldal</label>
        <input
          id='website'
          name='website'
          type='text'
          tabIndex={-1}
          autoComplete='off'
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
        />
      </div>

      <div className='space-y-6'>
        <div className='space-y-2'>
          <label htmlFor='billing-name' className='text-foreground text-sm font-medium'>
            Számlázási név
          </label>
          <input
            id='billing-name'
            autoComplete='name'
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

        <fieldset className='space-y-3'>
          <legend className='text-foreground text-sm font-medium'>Számlázási cím</legend>
          {renderAddressFields('billing')}
        </fieldset>

        <fieldset className='space-y-3'>
          <div className='flex items-center justify-between gap-3'>
            <legend className='text-foreground text-sm font-medium'>Szállítási cím</legend>
            <label className='text-muted-foreground inline-flex items-center gap-2 text-sm'>
              <input
                type='checkbox'
                checked={sameAsShipping}
                onChange={e => {
                  setSameAsShipping(e.target.checked)

                  if (e.target.checked) {
                    setErrors(prev => ({
                      ...prev,
                      shippingPostalCode: undefined,
                      shippingCity: undefined,
                      shippingStreet: undefined
                    }))
                  }
                }}
                className='size-4'
              />
              Megegyezik a számlázási címmel
            </label>
          </div>
          {!sameAsShipping && renderAddressFields('shipping')}
        </fieldset>

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

        {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

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
