import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  MapPin,
  PackageCheck,
  Truck,
  Wallet,
} from 'lucide-react'
import { fetchAddresses, fetchDeliverySlots, placeOrder } from '@/services/api'
import type { Address, DeliverySlot } from '@/types'
import { useCartStore, selectCartDiscount, selectCartSubtotal } from '@/stores/cart-store'
import { useAddressStore } from '@/stores/address-store'
import { SmartImage } from '@/components/common/smart-image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'

const FREE_DELIVERY_THRESHOLD = 499
const DELIVERY_FEE = 40

const steps = ['Address', 'Delivery', 'Payment', 'Review']

export function CheckoutPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clear)
  const subtotal = useCartStore(selectCartSubtotal)
  const discount = useCartStore(selectCartDiscount)
  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD
  const deliveryFee = items.length === 0 || freeDelivery ? 0 : DELIVERY_FEE
  const total = subtotal - discount + deliveryFee

  const addressesQuery = useQuery({
    queryKey: ['addresses'],
    queryFn: fetchAddresses,
    staleTime: 30_000,
  })
  const slotsQuery = useQuery({
    queryKey: ['delivery-slots'],
    queryFn: fetchDeliverySlots,
    staleTime: 30_000,
  })

  const [step, setStep] = useState(0)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    useAddressStore.getState().activeAddressId,
  )
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('upi')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [error, setError] = useState<string | null>(null)
  const [placing, setPlacing] = useState(false)

  const addresses = addressesQuery.data ?? []
  const slots = slotsQuery.data ?? []

  if (items.length === 0 && !placing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
          <PackageCheck className="h-8 w-8 text-brand-600" aria-hidden="true" />
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-ink-muted">Add some groceries before heading to checkout.</p>
        <Button className="mt-6" asChild>
          <Link to="/products">Start shopping</Link>
        </Button>
      </div>
    )
  }

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId)
  const selectedSlot = slots.find((s) => s.id === selectedSlotId)

  const validateStep = (targetStep: number): boolean => {
    if (targetStep === 1 && !selectedAddressId) {
      setError('Please select a delivery address.')
      return false
    }
    if (targetStep === 2 && !selectedSlotId) {
      setError('Please choose a delivery slot.')
      return false
    }
    if (targetStep === 3 && !paymentMethod) {
      setError('Please choose a payment method.')
      return false
    }
    if (paymentMethod === 'card' && targetStep === 3) {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        setError('Please fill in your card details.')
        return false
      }
    }
    setError(null)
    return true
  }

  const goNext = () => {
    const next = step + 1
    if (validateStep(next)) setStep(next)
  }

  const goBack = () => {
    setError(null)
    setStep((s) => Math.max(0, s - 1))
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedSlot) return
    setPlacing(true)
    try {
      const order = await placeOrder({
        address: selectedAddress,
        slotId: selectedSlot.id,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI · pay@okaxis'
            : paymentMethod === 'card'
              ? `Card ·••• ${card.number.slice(-4)}`
              : 'Cash on Delivery',
        items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        subtotal,
        deliveryFee,
        discount,
      })
      clearCart()
      toast({ title: 'Order placed!', description: `Your order ${order.id} is confirmed.`, variant: 'success' })
      navigate(`/orders/${order.id}`)
    } catch {
      toast({ title: 'Could not place order', description: 'Please try again in a moment.', variant: 'destructive' })
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Checkout</h1>

      <ol className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar" aria-label="Checkout progress">
        {steps.map((label, index) => {
          const done = index < step
          const current = index === step
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                  done && 'border-brand-600 bg-brand-50 text-brand-700',
                  current && 'border-brand-600 bg-brand-600 text-white',
                  !done && !current && 'border-line text-ink-muted',
                )}
                aria-current={current ? 'step' : undefined}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <span className="font-display text-xs">{index + 1}</span>
                )}
                {label}
              </span>
              {index < steps.length - 1 ? (
                <span className="h-px w-6 bg-line-strong sm:w-10" aria-hidden="true" />
              ) : null}
            </li>
          )
        })}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          {error ? (
            <p role="alert" className="mb-4 rounded-lg border border-tangerine-200 bg-tangerine-50 px-4 py-3 text-sm text-tangerine-700">
              {error}
            </p>
          ) : null}

          {step === 0 ? (
            <AddressStep
              addresses={addresses}
              isLoading={addressesQuery.isLoading}
              selectedId={selectedAddressId}
              onSelect={setSelectedAddressId}
            />
          ) : null}

          {step === 1 ? (
            <DeliveryStep
              slots={slots}
              isLoading={slotsQuery.isLoading}
              selectedId={selectedSlotId}
              onSelect={setSelectedSlotId}
            />
          ) : null}

          {step === 2 ? (
            <PaymentStep
              method={paymentMethod}
              onMethodChange={setPaymentMethod}
              card={card}
              onCardChange={setCard}
            />
          ) : null}

          {step === 3 ? (
            <ReviewStep
              address={selectedAddress}
              slot={selectedSlot}
              paymentLabel={
                paymentMethod === 'upi'
                  ? 'UPI'
                  : paymentMethod === 'card'
                    ? `Card ·••• ${card.number.slice(-4) || '••••'}`
                    : 'Cash on Delivery'
              }
            />
          ) : null}

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={goBack} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={goNext}>
                Continue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button size="lg" onClick={handlePlaceOrder} loading={placing}>
                {placing ? 'Placing order…' : 'Place order'}
                {!placing ? <Lock className="h-4 w-4" aria-hidden="true" /> : null}
              </Button>
            )}
          </div>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <Card className="p-5">
            <h2 className="font-display text-base font-bold text-ink">Order summary</h2>
            <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.productId} className="flex items-center gap-3">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    fallback="🛒"
                    className="h-12 w-12 shrink-0 rounded-md border border-line object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink-muted">Qty {item.quantity}</p>
                  </div>
                  <span className="font-display text-sm font-semibold text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 ? (
                <div className="flex justify-between text-brand-700">
                  <dt>Discount</dt>
                  <dd className="font-medium">−{formatPrice(discount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-ink-soft">Delivery</dt>
                <dd className="font-medium text-ink">
                  {deliveryFee === 0 ? <span className="text-brand-700">Free</span> : formatPrice(deliveryFee)}
                </dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex justify-between">
              <span className="font-display text-base font-bold text-ink">Total</span>
              <span className="font-display text-base font-bold text-ink">{formatPrice(total)}</span>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function AddressStep({
  addresses,
  isLoading,
  selectedId,
  onSelect,
}: {
  addresses: Address[]
  isLoading: boolean
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const { toast } = useToast()
  if (isLoading) {
    return <p className="text-sm text-ink-muted">Loading your saved addresses…</p>
  }
  return (
    <section aria-label="Delivery address">
      <h2 className="mb-4 font-display text-lg font-bold text-ink">Where should we deliver?</h2>
      <div className="grid gap-3">
        {addresses.map((address) => (
          <label
            key={address.id}
            className={cn(
              'flex cursor-pointer items-start gap-3 rounded-xl border bg-surface p-4 transition-colors',
              selectedId === address.id
                ? 'border-brand-600 ring-2 ring-brand-100'
                : 'border-line hover:border-brand-300',
            )}
          >
            <input
              type="radio"
              name="address"
              className="sr-only"
              checked={selectedId === address.id}
              onChange={() => onSelect(address.id)}
            />
            <span
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                selectedId === address.id ? 'border-brand-600' : 'border-line-strong',
              )}
              aria-hidden="true"
            >
              {selectedId === address.id ? <span className="h-2.5 w-2.5 rounded-full bg-brand-600" /> : null}
            </span>
            <span>
              <span className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold text-ink">{address.label}</span>
                {address.isDefault ? (
                  <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                    Default
                  </span>
                ) : null}
              </span>
              <span className="mt-1 block text-sm text-ink-soft">
                {address.name} · {address.line1}
                {address.line2 ? `, ${address.line2}` : ''}, {address.city} {address.pincode}
              </span>
              <span className="mt-0.5 block text-xs text-ink-muted">{address.phone}</span>
            </span>
          </label>
        ))}
      </div>
      <Button variant="outline" className="mt-4" onClick={() => toast({ title: 'Add address', description: 'Adding a new address is coming soon.' })}>
        <MapPin className="h-4 w-4" aria-hidden="true" />
        Add new address
      </Button>
    </section>
  )
}

function DeliveryStep({
  slots,
  isLoading,
  selectedId,
  onSelect,
}: {
  slots: DeliverySlot[]
  isLoading: boolean
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  if (isLoading) {
    return <p className="text-sm text-ink-muted">Loading delivery slots…</p>
  }
  return (
    <section aria-label="Delivery slot">
      <h2 className="mb-4 font-display text-lg font-bold text-ink">When should we deliver?</h2>
      <RadioGroup value={selectedId ?? ''} onValueChange={onSelect} className="grid gap-3">
        {slots.map((slot) => (
          <label
            key={slot.id}
            className={cn(
              'flex cursor-pointer items-center gap-4 rounded-xl border bg-surface p-4 transition-colors',
              !slot.available && 'opacity-50',
              selectedId === slot.id
                ? 'border-brand-600 ring-2 ring-brand-100'
                : 'border-line hover:border-brand-300',
            )}
          >
            <RadioGroupItem value={slot.id} id={`slot-${slot.id}`} disabled={!slot.available} />
            <span className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-brand-600" aria-hidden="true" />
              <span>
                <span className="block font-display text-sm font-semibold text-ink">{slot.label}</span>
                <span className="block text-xs text-ink-muted">{slot.time}</span>
              </span>
            </span>
            {!slot.available ? <span className="ml-auto text-xs font-medium text-ink-muted">Unavailable</span> : null}
          </label>
        ))}
      </RadioGroup>
    </section>
  )
}

function PaymentStep({
  method,
  onMethodChange,
  card,
  onCardChange,
}: {
  method: string
  onMethodChange: (method: string) => void
  card: { number: string; name: string; expiry: string; cvv: string }
  onCardChange: (card: { number: string; name: string; expiry: string; cvv: string }) => void
}) {
  return (
    <section aria-label="Payment method">
      <h2 className="mb-4 font-display text-lg font-bold text-ink">How would you like to pay?</h2>
      <RadioGroup value={method} onValueChange={onMethodChange} className="grid gap-3">
        {[
          { value: 'upi', label: 'UPI', hint: 'Pay with any UPI app', icon: Wallet },
          { value: 'card', label: 'Credit / Debit card', hint: 'Visa, Mastercard, RuPay', icon: CreditCard },
          { value: 'cod', label: 'Cash on delivery', hint: 'Pay when your order arrives', icon: PackageCheck },
        ].map((option) => {
          const Icon = option.icon
          return (
            <div key={option.value}>
              <label
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded-xl border bg-surface p-4 transition-colors',
                  method === option.value
                    ? 'border-brand-600 ring-2 ring-brand-100'
                    : 'border-line hover:border-brand-300',
                )}
              >
                <RadioGroupItem value={option.value} id={`pay-${option.value}`} />
                <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                <span>
                  <span className="block font-display text-sm font-semibold text-ink">{option.label}</span>
                  <span className="block text-xs text-ink-muted">{option.hint}</span>
                </span>
              </label>
              {method === 'card' && option.value === 'card' ? (
                <Card className="mt-3 space-y-3 p-4">
                  <div>
                    <Label htmlFor="card-number">Card number</Label>
                    <Input
                      id="card-number"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={card.number}
                      onChange={(e) => onCardChange({ ...card, number: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-name">Name on card</Label>
                    <Input
                      id="card-name"
                      placeholder="Aarav Sharma"
                      value={card.name}
                      onChange={(e) => onCardChange({ ...card, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="card-expiry">Expiry</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={(e) => onCardChange({ ...card, expiry: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-cvv">CVV</Label>
                      <Input
                        id="card-cvv"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="•••"
                        value={card.cvv}
                        onChange={(e) => onCardChange({ ...card, cvv: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-ink-muted">Demo checkout — no real payment is processed.</p>
                </Card>
              ) : null}
            </div>
          )
        })}
      </RadioGroup>
    </section>
  )
}

function ReviewStep({
  address,
  slot,
  paymentLabel,
}: {
  address?: Address
  slot?: DeliverySlot
  paymentLabel: string
}) {
  return (
    <section aria-label="Review order" className="space-y-4">
      <h2 className="font-display text-lg font-bold text-ink">Review your order</h2>
      <Card className="p-5">
        <h3 className="font-display text-sm font-semibold text-ink">Deliver to</h3>
        {address ? (
          <p className="mt-1 text-sm text-ink-soft">
            {address.name}, {address.line1}
            {address.line2 ? `, ${address.line2}` : ''}, {address.city} {address.pincode}
          </p>
        ) : null}
        <Separator className="my-4" />
        <h3 className="font-display text-sm font-semibold text-ink">Delivery slot</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {slot?.label} · {slot?.time}
        </p>
        <Separator className="my-4" />
        <h3 className="font-display text-sm font-semibold text-ink">Payment</h3>
        <p className="mt-1 text-sm text-ink-soft">{paymentLabel}</p>
      </Card>
      <p className="flex items-center gap-1.5 text-xs text-ink-muted">
        <Lock className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
        By placing this order you agree to our terms and refund policy.
      </p>
    </section>
  )
}