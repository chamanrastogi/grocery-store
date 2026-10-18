import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  drawerOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: Math.min(i.quantity + (item.quantity ?? 1), i.maxStock) }
                : i,
            ),
          })
        } else {
          set({ items: [...get().items, { ...item, quantity: item.quantity ?? 1 }] })
        }
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      setQuantity: (productId, quantity) =>
        set({
          items: get()
            .items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: Math.max(0, Math.min(quantity, i.maxStock)) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        }),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    { name: 'greengrocer-cart' },
  ),
)

export const selectCartCount = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartSubtotal = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const selectCartDiscount = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + (item.originalPrice && item.originalPrice > item.price
    ? (item.originalPrice - item.price) * item.quantity
    : 0), 0)