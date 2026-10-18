export interface Category {
  slug: string
  name: string
  emoji: string
  image: string
  tagline: string
  productCount: number
}

export interface ProductVariant {
  id: string
  label: string
  unit: string
  price: number
  originalPrice?: number
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  categorySlug: string
  brand: string
  emoji: string
  image: string
  gallery: string[]
  unit: string
  price: number
  originalPrice?: number
  rating: number
  ratingCount: number
  stock: number
  tags: string[]
  badges: Array<'best-seller' | 'deal' | 'fresh' | 'new' | 'organic' | 'limited'>
  description: string
  nutrition: { label: string; value: string }[]
  variants?: ProductVariant[]
  reviews: Review[]
  isBestSeller: boolean
  isDeal: boolean
  isFreshPick: boolean
}

export interface CartItem {
  productId: string
  slug: string
  name: string
  image: string
  unit: string
  price: number
  originalPrice?: number
  quantity: number
  maxStock: number
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

export interface ProductFilters {
  categories: string[]
  brands: string[]
  minPrice: number | null
  maxPrice: number | null
  minRating: number | null
  inStockOnly: boolean
  dealOnly: boolean
}

export type OrderStatus =
  | 'Placed'
  | 'Packed'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'

export interface OrderItem {
  productId: string
  slug: string
  name: string
  image: string
  unit: string
  price: number
  quantity: number
}

export interface OrderAddress {
  label: string
  line1: string
  line2?: string
  city: string
  pincode: string
  phone: string
}

export interface Order {
  id: string
  placedAt: string
  status: OrderStatus
  items: OrderItem[]
  address: OrderAddress
  paymentMethod: string
  deliveryFee: number
  discount: number
  subtotal: number
  total: number
  timeline: { label: string; at: string; done: boolean }[]
}

export interface Address {
  id: string
  label: string
  name: string
  line1: string
  line2?: string
  city: string
  pincode: string
  phone: string
  isDefault: boolean
}

export interface AppUser {
  name: string
  email: string
  phone: string
  avatarColor: string
}

export interface DeliverySlot {
  id: string
  label: string
  time: string
  available: boolean
}