import type { APIRoute } from 'astro'
import { Resend } from 'resend'

import { COMPANY_INFO } from '@/consts'
import { screenSubmission } from '@/lib/anti-spam'

export const prerender = false

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024
const MAX_ATTACHMENTS = 5

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.RESEND_API_KEY
  const fromAddress = import.meta.env.CONTACT_FROM_EMAIL

  if (!apiKey || !fromAddress) {
    return Response.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return Response.json({ error: 'Invalid form submission.' }, { status: 400 })
  }

  // Anti-spam screening — runs before any email is sent.
  const verdict = await screenSubmission({
    honeypot: String(formData.get('website') ?? '').trim(),
    elapsed: Number(formData.get('elapsed') ?? 0),
    turnstileToken: String(formData.get('cf-turnstile-response') ?? ''),
    ip: clientAddress
  })

  if (!verdict.allow) {
    return verdict.fakeSuccess
      ? Response.json({ ok: true })
      : Response.json({ error: verdict.message }, { status: 400 })
  }

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const uploadedFiles = formData.getAll('attachment').filter((f): f is File => f instanceof File && f.size > 0)

  if (!name || !email || !message) {
    return Response.json({ error: 'A név, email és üzenet mező kitöltése kötelező.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Érvénytelen email cím.' }, { status: 400 })
  }

  if (uploadedFiles.length > MAX_ATTACHMENTS) {
    return Response.json({ error: `Legfeljebb ${MAX_ATTACHMENTS} fájlt csatolhatsz.` }, { status: 400 })
  }

  const attachments: { filename: string; content: string }[] = []

  for (const file of uploadedFiles) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return Response.json({ error: `A(z) "${file.name}" csatolmány túl nagy (max. 10 MB).` }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    attachments.push({
      filename: file.name || 'attachment',
      content: buffer.toString('base64')
    })
  }

  const html = `
    <h2>Új üzenet érkezett</h2>
    <p><strong>Név:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Üzenet:</strong></p>
    <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
  `

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: COMPANY_INFO.contactPoint.email,
    replyTo: email,
    subject: `Új üzenet — ${name}`,
    html,
    attachments: attachments.length ? attachments : undefined
  })

  if (error) {
    console.error('Resend error:', error)

    return Response.json({ error: 'Nem sikerült elküldeni az üzenetet. Próbáld újra később.' }, { status: 502 })
  }

  const sentAt = new Date().toLocaleString('hu-HU', {
    timeZone: 'Europe/Budapest',
    dateStyle: 'long',
    timeStyle: 'short'
  })

  const confirmationHtml = `
    <p>Kedves ${escapeHtml(name)}!</p>
    <p>Köszönjük, hogy felvetted velünk a kapcsolatot. Megkaptuk az üzenetedet, és hamarosan válaszolunk.</p>
    <p>Szeretettel,<br/>${escapeHtml(COMPANY_INFO.name)}</p>
    <div class="gmail_quote gmail_quote_container">
      <div dir="ltr" class="gmail_attr">${escapeHtml(sentAt)} ${escapeHtml(name)} &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt; wrote:<br></div>
      <blockquote class="gmail_quote" style="margin:0 0 0 .8ex;border-left:1px solid #ccc;padding-left:1ex">
        <div style="white-space: pre-wrap">${escapeHtml(message)}</div>
      </blockquote>
    </div>
  `

  const { error: confirmationError } = await resend.emails.send({
    from: fromAddress,
    to: email,
    replyTo: COMPANY_INFO.contactPoint.email,
    subject: 'Megkaptuk az üzeneted',
    html: confirmationHtml
  })

  if (confirmationError) {
    console.error('Resend confirmation error:', confirmationError)
  }

  return Response.json({ ok: true })
}
