// Shared anti-spam screening for the public form endpoints (contact + order).
// All checks run before any email is sent, so spam never costs a Resend call.

// Minimum time (ms) a genuine human needs to fill in a form. Bots post near-instantly.
export const MIN_FILL_MS = 3000

const verifyTurnstile = async (secret: string, token: string, ip?: string): Promise<boolean> => {
  if (!token) {
    return false
  }

  try {
    const body = new FormData()

    body.append('secret', secret)
    body.append('response', token)

    if (ip) {
      body.append('remoteip', ip)
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
    const data = (await res.json()) as { success?: boolean }

    return data.success === true
  } catch {
    return false
  }
}

export type SpamVerdict =
  | { allow: true }

  // Honeypot / time-trap tripped — respond with a fake success so the bot can't tell it was blocked.
  | { allow: false; fakeSuccess: true }

  // Turnstile verification failed — surface a real error so a genuine user can retry.
  | { allow: false; fakeSuccess: false; message: string }

type Submission = {
  honeypot: string
  elapsed: number
  turnstileToken: string
  ip?: string
}

export const screenSubmission = async ({ honeypot, elapsed, turnstileToken, ip }: Submission): Promise<SpamVerdict> => {
  // 1. Honeypot: a field hidden from real users. If it's filled, it's a bot.
  if (honeypot) {
    return { allow: false, fakeSuccess: true }
  }

  // 2. Time-trap: `elapsed` is set client-side to the time spent on the form.
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return { allow: false, fakeSuccess: true }
  }

  // 3. Cloudflare Turnstile: only enforced once the secret is configured,
  //    so the forms keep working before the keys are added.
  const secret = import.meta.env.TURNSTILE_SECRET_KEY

  if (secret) {
    const passed = await verifyTurnstile(secret, turnstileToken, ip)

    if (!passed) {
      return {
        allow: false,
        fakeSuccess: false,
        message: 'A robotellenőrzés sikertelen. Frissítsd az oldalt és próbáld újra.'
      }
    }
  }

  return { allow: true }
}
