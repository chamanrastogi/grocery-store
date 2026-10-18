import { categories } from '@/data/categories'
import { products, getProduct, getRelated } from '@/data/products'
import { mockOrders } from '@/data/orders'
import { mockAddresses } from '@/data/addresses'
import { deliverySlots, mockUser } from '@/data/orders'
import type {
  Address,
  AppUser,
  Category,
  DeliverySlot,
  Order,
  Product,
  ProductFilters,
  SortOption,
} from '@/types'

const LATENCY = 400
const wait = (ms = LATENCY) => new Promise((resolve) => setTimeout(resolve, ms))
const clone = <T>(value: T): T => structuredClone(value)

export async function fetchCategories(): Promise<Category[]> {
  await wait(250)
  return clone(categories)
}

export async function fetchProducts(): Promise<Product[]> {
  await wait()
  return clone(products)
}

export async function fetchProduct(slug: string): Promise<Product> {
  await wait()
  const product = getProduct(slug)
  if (!product) throw new Error('Product not found')
  return clone(product)
}

export async function fetchRelated(product: Product, limit = 4): Promise<Product[]> {
  await wait(200)
  return clone(getRelated(product, limit))
}

export async function searchProducts(query: string): Promise<Product[]> {
  await wait(300)
  const q = query.trim().toLowerCase()
  if (!q) return []
  return clone(
    products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    ),
  )
}

export async function queryProducts(
  filters: ProductFilters,
  sort: SortOption,
): Promise<Product[]> {
  await wait()
  let result = [...products]

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.categorySlug))
  }
  if (filters.brands.length > 0) {
    result = result.filter((p) => filters.brands.includes(p.brand))
  }
  if (filters.minPrice !== null) {
    result = result.filter((p) => p.price >= (filters.minPrice ?? 0))
  }
  if (filters.maxPrice !== null) {
    result = result.filter((p) => p.price <= (filters.maxPrice ?? Infinity))
  }
  if (filters.minRating !== null) {
    result = result.filter((p) => p.rating >= (filters.minRating ?? 0))
  }
  if (filters.inStockOnly) {
    result = result.filter((p) => p.stock > 0)
  }
  if (filters.dealOnly) {
    result = result.filter((p) => p.originalPrice !== undefined)
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      result.sort((a, b) => (b.badges.includes('new') ? 1 : 0) - (a.badges.includes('new') ? 1 : 0))
      break
    default:
      result.sort((a, b) => b.ratingCount - a.ratingCount)
  }

  return clone(result)
}

export async function fetchBrands(): Promise<string[]> {
  await wait(150)
  return Array.from(new Set(products.map((p) => p.brand))).sort()
}

export async function fetchOrders(): Promise<Order[]> {
  await wait()
  return clone(mockOrders)
}

export async function fetchOrder(id: string): Promise<Order> {
  await wait()
  const order = mockOrders.find((o) => o.id === id)
  if (!order) throw new Error('Order not found')
  return clone(order)
}

export async function fetchAddresses(): Promise<Address[]> {
  await wait(250)
  return clone(mockAddresses)
}

export async function fetchDeliverySlots(): Promise<DeliverySlot[]> {
  await wait(200)
  return clone(deliverySlots)
}

export async function fetchUser(): Promise<AppUser> {
  await wait(150)
  return clone(mockUser)
}

export interface PlaceOrderInput {
  address: Address
  slotId: string
  paymentMethod: string
  items: { slug: string; quantity: number }[]
  subtotal: number
  deliveryFee: number
  discount: number
}

export async function placeOrder(input: PlaceOrderInput): Promise<Order> {
  await wait(900)
  const items = input.items
    .map((item) => {
      const product = getProduct(item.slug)
      if (!product) return null
      return {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        unit: product.unit,
        price: product.price,
        quantity: item.quantity,
      }
    })
    .filter((i): i is NonNullable<typeof i> => i !== null)

  const total = input.subtotal + input.deliveryFee - input.discount
  const now = new Date()
  const id = `GS-${String(10250 + Math.floor(Math.random() * 900)).slice(0, 5)}`

  return clone<Order>({
    id,
    placedAt: now.toISOString(),
    status: 'Placed',
    items,
    address: {
      label: input.address.label,
      line1: input.address.line1,
      line2: input.address.line2,
      city: input.address.city,
      pincode: input.address.pincode,
      phone: input.address.phone,
    },
    paymentMethod: input.paymentMethod,
    deliveryFee: input.deliveryFee,
    discount: input.discount,
    subtotal: input.subtotal,
    total,
    timeline: [
      { label: 'Order placed', at: now.toISOString(), done: true },
      { label: 'Packed', at: '', done: false },
      { label: 'Out for delivery', at: '', done: false },
      { label: 'Delivered', at: '', done: false },
    ],
  })
}