import type { APIRoute } from 'astro'
import { Resend } from 'resend'

import { findProduct, findSize, formatPrice, type Product, type ProductSize } from '@/assets/data/webshop'
import { COMPANY_INFO } from '@/consts'

export const prerender = false

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

type IncomingItem = {
  productSlug: string
  sizeId: string
  quantity: number
}

type ResolvedLine = {
  product: Product
  size: ProductSize
  quantity: number
  lineTotal: number
}

const parseItems = (raw: unknown): IncomingItem[] | null => {
  if (!Array.isArray(raw)) return null
  const items: IncomingItem[] = []

  for (const entry of raw) {
    if (
      typeof entry !== 'object' ||
      entry === null ||
      typeof (entry as IncomingItem).productSlug !== 'string' ||
      typeof (entry as IncomingItem).sizeId !== 'string' ||
      typeof (entry as IncomingItem).quantity !== 'number' ||
      !Number.isFinite((entry as IncomingItem).quantity) ||
      (entry as IncomingItem).quantity < 1
    ) {
      return null
    }

    items.push({
      productSlug: (entry as IncomingItem).productSlug,
      sizeId: (entry as IncomingItem).sizeId,
      quantity: Math.floor((entry as IncomingItem).quantity)
    })
  }

  return items
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY
  const fromAddress = import.meta.env.CONTACT_FROM_EMAIL

  if (!apiKey || !fromAddress) {
    return Response.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  let payload: Record<string, unknown>

  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  const billingName = String(payload.billingName ?? '').trim()
  const billingAddress = String(payload.billingAddress ?? '').trim()
  const shippingSameAsBilling = Boolean(payload.shippingSameAsBilling)
  const shippingAddress = String(payload.shippingAddress ?? '').trim()
  const email = String(payload.email ?? '').trim()
  const note = String(payload.note ?? '').trim()
  const items = parseItems(payload.items)

  if (!billingName || !billingAddress || !email) {
    return Response.json({ error: 'Billing name, billing address, and email are required.' }, { status: 400 })
  }

  if (!shippingSameAsBilling && !shippingAddress) {
    return Response.json(
      { error: 'Shipping address is required when it differs from the billing address.' },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  if (!items || items.length === 0) {
    return Response.json({ error: 'Cart is empty.' }, { status: 400 })
  }

  const resolved: ResolvedLine[] = []

  for (const item of items) {
    const product = findProduct(item.productSlug)

    if (!product) {
      return Response.json({ error: `Unknown product: ${item.productSlug}` }, { status: 400 })
    }

    const size = findSize(product, item.sizeId)

    if (size.id !== item.sizeId) {
      return Response.json({ error: `Unknown size: ${item.sizeId}` }, { status: 400 })
    }

    resolved.push({ product, size, quantity: item.quantity, lineTotal: size.price * item.quantity })
  }

  const total = resolved.reduce((sum, line) => sum + line.lineTotal, 0)
  const finalShippingAddress = shippingSameAsBilling ? billingAddress : shippingAddress
  const timestamp = new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' })

  const itemRowsHtml = resolved
    .map(line => {
      const sizeSuffix = line.product.sizes.length > 1 ? ` (${escapeHtml(line.size.sizeLabel)})` : ''

      return `
        <tr>
          <td style="padding: 6px 12px 6px 0;">${line.quantity} ×</td>
          <td style="padding: 6px 12px 6px 0;">${escapeHtml(line.product.title)}${sizeSuffix}</td>
          <td style="padding: 6px 12px 6px 0; text-align: right;">${escapeHtml(formatPrice(line.size.price))}</td>
          <td style="padding: 6px 0; text-align: right;"><strong>${escapeHtml(formatPrice(line.lineTotal))}</strong></td>
        </tr>
      `
    })
    .join('')

  const orderHtml = `
    <h2>Új webshop rendelés érkezett</h2>
    <p style="color: #666; margin: 0 0 16px;">Időpont: ${escapeHtml(timestamp)}</p>

    <h3 style="margin: 24px 0 8px;">Vásárló</h3>
    <p style="margin: 4px 0;"><strong>Név:</strong> ${escapeHtml(billingName)}</p>
    <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p style="margin: 4px 0;"><strong>Számlázási cím:</strong> ${escapeHtml(billingAddress)}</p>
    <p style="margin: 4px 0;"><strong>Szállítási cím:</strong> ${
      shippingSameAsBilling ? '<em>megegyezik a számlázási címmel</em>' : escapeHtml(finalShippingAddress)
    }</p>
    ${
      note
        ? `<p style="margin: 12px 0 4px;"><strong>Megjegyzés:</strong></p>
           <p style="white-space: pre-wrap; margin: 0; padding: 8px 12px; background: #f7f7f7; border-left: 3px solid #ccc;">${escapeHtml(note)}</p>`
        : ''
    }

    <h3 style="margin: 24px 0 8px;">Rendelés</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tbody>${itemRowsHtml}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding-top: 12px; border-top: 1px solid #ccc; text-align: right;"><strong>Összesen:</strong></td>
          <td style="padding-top: 12px; border-top: 1px solid #ccc; text-align: right;"><strong>${escapeHtml(formatPrice(total))}</strong></td>
        </tr>
      </tfoot>
    </table>

    <p style="margin-top: 24px; color: #666;">Következő lépés: díjbekérő küldése a vevő email-címére.</p>
  `

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: COMPANY_INFO.contactPoint.email,
    replyTo: email,
    subject: `Új webshop rendelés — ${billingName} — ${formatPrice(total)}`,
    html: orderHtml
  })

  if (error) {
    console.error('Resend order error:', error)

    return Response.json({ error: 'Failed to send order email.' }, { status: 502 })
  }

  const confirmationItemsHtml = resolved
    .map(line => {
      const sizeSuffix = line.product.sizes.length > 1 ? ` (${escapeHtml(line.size.sizeLabel)})` : ''

      return `<li>${line.quantity} × ${escapeHtml(line.product.title)}${sizeSuffix} — ${escapeHtml(formatPrice(line.lineTotal))}</li>`
    })
    .join('')

  const confirmationHtml = `
    <p>Kedves ${escapeHtml(billingName)}!</p>
    <p>Köszönjük a rendelésedet a Mimóza Design webshopban. Az alábbiakat rögzítettük:</p>
    <ul>${confirmationItemsHtml}</ul>
    <p><strong>Összesen: ${escapeHtml(formatPrice(total))}</strong></p>

    <p style="margin-top: 16px;"><strong>Számlázási név:</strong> ${escapeHtml(billingName)}</p>
    <p style="margin: 4px 0;"><strong>Számlázási cím:</strong> ${escapeHtml(billingAddress)}</p>
    <p style="margin: 4px 0;"><strong>Szállítási cím:</strong> ${
      shippingSameAsBilling ? '<em>megegyezik a számlázási címmel</em>' : escapeHtml(finalShippingAddress)
    }</p>
    ${note ? `<p style="margin: 4px 0;"><strong>Megjegyzés:</strong> ${escapeHtml(note)}</p>` : ''}

    <br/>
    <p>Hamarosan elküldjük a díjbekérőt erre az email-címre. A rendelésed a díjbekérő kiegyenlítése után válik véglegessé.</p>
    <br/>
    <p>Szeretettel,<br/>${escapeHtml(COMPANY_INFO.name)}</p>
  `

  const { error: confirmationError } = await resend.emails.send({
    from: fromAddress,
    to: email,
    replyTo: COMPANY_INFO.contactPoint.email,
    subject: 'Megkaptuk a rendelésed',
    html: confirmationHtml
  })

  if (confirmationError) {
    console.error('Resend order confirmation error:', confirmationError)
  }

  return Response.json({ ok: true })
}
