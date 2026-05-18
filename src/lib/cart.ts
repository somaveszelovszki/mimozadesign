import { useSyncExternalStore } from 'react'

import { findProduct, findSize, type Product, type ProductSize } from '@/assets/data/webshop'

export type CartItem = {
  productSlug: string
  sizeId: string
  quantity: number
}

export type ResolvedCartItem = {
  productSlug: string
  sizeId: string
  quantity: number
  product: Product
  size: ProductSize
  lineTotal: number
}

const STORAGE_KEY = 'mimoza-cart'
const EVENT_NAME = 'mimoza:cart-changed'

const readCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item: unknown): item is CartItem =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as CartItem).productSlug === 'string' &&
        typeof (item as CartItem).sizeId === 'string' &&
        typeof (item as CartItem).quantity === 'number'
    )
  } catch {
    return []
  }
}

const writeCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent(EVENT_NAME))
}

export const getCart = readCart

export const addToCart = (productSlug: string, sizeId: string, quantity: number) => {
  const items = readCart()
  const existing = items.find(i => i.productSlug === productSlug && i.sizeId === sizeId)
  if (existing) {
    existing.quantity += quantity
  } else {
    items.push({ productSlug, sizeId, quantity })
  }
  writeCart(items)
}

export const updateQuantity = (productSlug: string, sizeId: string, quantity: number) => {
  const items = readCart().map(i => (i.productSlug === productSlug && i.sizeId === sizeId ? { ...i, quantity } : i))
  writeCart(items.filter(i => i.quantity > 0))
}

export const removeFromCart = (productSlug: string, sizeId: string) => {
  writeCart(readCart().filter(i => !(i.productSlug === productSlug && i.sizeId === sizeId)))
}

export const clearCart = () => writeCart([])

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  const handler = () => callback()
  window.addEventListener(EVENT_NAME, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(EVENT_NAME, handler)
    window.removeEventListener('storage', handler)
  }
}

const getSnapshot = (): string => {
  if (typeof window === 'undefined') return '[]'
  return window.localStorage.getItem(STORAGE_KEY) ?? '[]'
}

const getServerSnapshot = (): string => '[]'

export const useCart = (): CartItem[] => {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as CartItem[]
  } catch {
    return []
  }
}

export const useCartCount = (): number => {
  const cart = useCart()
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

export const resolveCart = (items: CartItem[]): ResolvedCartItem[] =>
  items
    .map(item => {
      const product = findProduct(item.productSlug)
      if (!product) return null
      const size = findSize(product, item.sizeId)
      return {
        productSlug: item.productSlug,
        sizeId: size.id,
        quantity: item.quantity,
        product,
        size,
        lineTotal: size.price * item.quantity
      }
    })
    .filter((item): item is ResolvedCartItem => item !== null)
