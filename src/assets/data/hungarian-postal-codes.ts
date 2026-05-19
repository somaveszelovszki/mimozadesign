import postalCodes from './hungarian-postal-codes.json'

const map = postalCodes as Record<string, string>

export const lookupCityByPostalCode = (postalCode: string): string | null => {
  const normalized = postalCode.trim()

  if (!/^\d{4}$/.test(normalized)) return null

  return map[normalized] ?? null
}

export const isValidPostalCode = (postalCode: string): boolean =>
  /^\d{4}$/.test(postalCode.trim()) && postalCode.trim() in map
