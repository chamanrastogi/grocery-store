import type { DeliverySlot, Order, OrderStatus, AppUser } from '@/types'

export const deliverySlots: DeliverySlot[] = [
  { id: 'slot-1', label: 'Express', time: 'Next 30 min', available: true },
  { id: 'slot-2', label: 'Morning', time: '8:00 – 11:00 AM', available: true },
  { id: 'slot-3', label: 'Afternoon', time: '11:00 AM – 2:00 PM', available: true },
  { id: 'slot-4', label: 'Evening', time: '2:00 – 5:00 PM', available: false },
  { id: 'slot-5', label: 'Night', time: '5:00 – 8:00 PM', available: true },
]

export const mockUser: AppUser = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '9876543210',
  avatarColor: 'bg-brand-600',
}

export function orderStatusLabel(status: OrderStatus): string {
  return status
}

export const mockOrders: Order[] = [
  {
    id: 'GS-10245',
    placedAt: '2026-08-18T09:30:00',
    status: 'Out for Delivery',
    items: [
      { productId: 'p1', slug: 'fresh-tomatoes', name: 'Fresh Tomatoes', image: '', unit: '1 kg', price: 80, quantity: 2 },
      { productId: 'p14', slug: 'whole-milk', name: 'Whole Milk', image: '', unit: '1 L', price: 68, quantity: 1 },
      { productId: 'p11', slug: 'alphonso-mangoes', name: 'Alphonso Mangoes', image: '', unit: '2 pc', price: 249, quantity: 1 },
    ],
    address: {
      label: 'Home', line1: '42, Lake View Residency, Green Park Road', city: 'Mumbai', pincode: '400001', phone: '9876543210',
    },
    paymentMethod: 'UPI · ****@okaxis',
    deliveryFee: 40,
    discount: 50,
    subtotal: 477,
    total: 467,
    timeline: [
      { label: 'Order placed', at: '2026-08-18T09:30:00', done: true },
      { label: 'Packed', at: '2026-08-18T10:05:00', done: true },
      { label: 'Out for delivery', at: '2026-08-18T11:20:00', done: true },
      { label: 'Delivered', at: '2026-08-18T12:00:00', done: false },
    ],
  },
  {
    id: 'GS-10238',
    placedAt: '2026-08-12T18:15:00',
    status: 'Delivered',
    items: [
      { productId: 'p19', slug: 'multigrain-bread', name: 'Multigrain Bread', image: '', unit: '400 g', price: 55, quantity: 1 },
      { productId: 'p24', slug: 'eggs', name: 'Farm Eggs', image: '', unit: '12 pc', price: 98, quantity: 1 },
      { productId: 'p42', slug: 'shampoo', name: 'Nourishing Shampoo', image: '', unit: '340 ml', price: 245, quantity: 1 },
      { productId: 'p43', slug: 'toothpaste', name: 'Fluoride Toothpaste', image: '', unit: '150 g', price: 85, quantity: 2 },
    ],
    address: {
      label: 'Home', line1: '42, Lake View Residency, Green Park Road', city: 'Mumbai', pincode: '400001', phone: '9876543210',
    },
    paymentMethod: 'Card ·••• 4421',
    deliveryFee: 40,
    discount: 0,
    subtotal: 568,
    total: 608,
    timeline: [
      { label: 'Order placed', at: '2026-08-12T18:15:00', done: true },
      { label: 'Packed', at: '2026-08-12T18:50:00', done: true },
      { label: 'Out for delivery', at: '2026-08-12T19:05:00', done: true },
      { label: 'Delivered', at: '2026-08-12T19:42:00', done: true },
    ],
  },
  {
    id: 'GS-10221',
    placedAt: '2026-08-02T10:05:00',
    status: 'Delivered',
    items: [
      { productId: 'p8', slug: 'bananas', name: 'Bananas (Robusta)', image: '', unit: '1 kg', price: 54, quantity: 1 },
      { productId: 'p4', slug: 'spinach', name: 'Spinach (Palak)', image: '', unit: '250 g', price: 25, quantity: 1 },
      { productId: 'p17', slug: 'paneer', name: 'Fresh Paneer', image: '', unit: '200 g', price: 95, quantity: 1 },
    ],
    address: {
      label: 'Office', line1: 'Level 4, Tech Tower, Andheri East', city: 'Mumbai', pincode: '400069', phone: '9876543210',
    },
    paymentMethod: 'Cash on Delivery',
    deliveryFee: 0,
    discount: 0,
    subtotal: 174,
    total: 174,
    timeline: [
      { label: 'Order placed', at: '2026-08-02T10:05:00', done: true },
      { label: 'Packed', at: '2026-08-02T10:40:00', done: true },
      { label: 'Out for delivery', at: '2026-08-02T11:00:00', done: true },
      { label: 'Delivered', at: '2026-08-02T11:35:00', done: true },
    ],
  },
]