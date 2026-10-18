import { create } from 'zustand'

interface AddressState {
  activeAddressId: string | null
  setActive: (id: string | null) => void
}

export const useAddressStore = create<AddressState>((set) => ({
  activeAddressId: null,
  setActive: (id) => set({ activeAddressId: id }),
}))