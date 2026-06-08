import type { APIContext } from 'astro'
import { type CreateEmailOptions, type CreateEmailResponse, Resend } from 'resend'

import { extractAntiSpamFields, screenSubmission } from '@/lib/anti-spam'

// The single choke point for sending email from any endpoint.
//
// Every route that wants to email must obtain its mailer through `guardEmailRequest`,
// which parses the request body once, runs anti-spam screening, and only then hands back
// a `sendEmail` function. There is no other exported way to reach Resend, so a new endpoint
// that forgets to call this simply cannot send mail — it fails safe instead of failing open.
//
// The raw Resend client is intentionally NOT exported (and `eslint.config.mjs` forbids
// importing `resend` anywhere but this file) so the guard can't be bypassed.

// A Resend message without `from` — the guard fills in the configured sender automatically.
export type EmailMessage = Omit<CreateEmailOptions, 'from'> & { from?: string }

// Parsed request body, shared back to the handler so it isn't re-read.
export type ParsedBody = { type: 'form'; data: FormData } | { type: 'json'; data: Record<string, unknown> }

export type EmailGuard =
  | { ok: false; response: Response }
  | { ok: true; body: ParsedBody; sendEmail: (message: EmailMessage) => Promise<CreateEmailResponse> }

export const guardEmailRequest = async ({ request, clientAddress }: APIContext): Promise<EmailGuard> => {
  const apiKey = import.meta.env.RESEND_API_KEY
  const fromAddress = import.meta.env.CONTACT_FROM_EMAIL

  if (!apiKey || !fromAddress) {
    return { ok: false, response: Response.json({ error: 'Email service is not configured.' }, { status: 500 }) }
  }

  // Parse the body once and pass it back, so the handler doesn't consume the stream a second time.
  let body: ParsedBody

  try {
    const contentType = request.headers.get('content-type') ?? ''

    body = contentType.includes('application/json')
      ? { type: 'json', data: (await request.json()) as Record<string, unknown> }
      : { type: 'form', data: await request.formData() }
  } catch {
    return { ok: false, response: Response.json({ error: 'Invalid submission.' }, { status: 400 }) }
  }

  // Anti-spam screening — runs before the mailer is ever created.
  const verdict = await screenSubmission({ ...extractAntiSpamFields(body.data), ip: clientAddress })

  if (!verdict.allow) {
    const response = verdict.fakeSuccess
      ? Response.json({ ok: true })
      : Response.json({ error: verdict.message }, { status: 400 })

    return { ok: false, response }
  }

  const resend = new Resend(apiKey)

  const sendEmail = (message: EmailMessage): Promise<CreateEmailResponse> =>
    // Cast: `Omit<…, 'from'>` loosens Resend's "at least one content field" constraint,
    // but the caller-facing `EmailMessage` type still enforces it.
    resend.emails.send({ ...message, from: message.from ?? fromAddress } as CreateEmailOptions)

  return { ok: true, body, sendEmail }
}
