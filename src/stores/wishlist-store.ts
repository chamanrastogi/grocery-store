import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  ids: string[]
  toggle: (productId: string) => void
  has: (productId: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) =>
        set({
          ids: get().ids.includes(productId)
            ? get().ids.filter((id) => id !== productId)
            : [...get().ids, productId],
        }),
      has: (productId) => get().ids.includes(productId),
      clear: () => set({ ids: [] }),
    }),
    { name: 'greengrocer-wishlist' },
  ),
)