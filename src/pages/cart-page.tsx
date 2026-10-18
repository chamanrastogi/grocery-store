import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Tag, Trash2, Truck } from 'lucide-react'
import { SmartImage } from '@/components/common/smart-image'
import { EmptyState } from '@/components/common/empty-state'
import { QuantityStepper } from '@/components/product/quantity-stepper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCartStore, selectCartDiscount, selectCartSubtotal } from '@/stores/cart-store'
import { formatPrice } from '@/utils/format'

const FREE_DELIVERY_THRESHOLD = 499
const DELIVERY_FEE = 40

export function CartPage() {
  const navigate = useNavigate()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore(selectCartSubtotal)
  const discount = useCartStore(selectCartDiscount)
  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD
  const deliveryFee = items.length === 0 || freeDelivery ? 0 : DELIVERY_FEE
  const total = subtotal - discount + deliveryFee

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 font-display text-2xl font-bold text-ink sm:text-3xl">Your Cart</h1>
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Start adding your favourite groceries and we'll bring them to your door."
          actionLabel="Start shopping"
          onAction={() => navigate('/products')}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Your Cart
        </h1>
        <span className="text-sm text-ink-muted">
          {items.reduce((n, i) => n + i.quantity, 0)} items
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((item) => {
            const itemTotal = item.price * item.quantity
            return (
              <Card key={item.productId} className="p-4">
                <div className="flex gap-4">
                  <Link to={`/product/${item.slug}`} className="shrink-0">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      fallback="🛒"
                      className="h-20 w-20 rounded-lg border border-line object-cover sm:h-24 sm:w-24"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-display text-sm font-semibold leading-snug text-ink hover:text-brand-700"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => useCartStore.getState().removeItem(item.productId)}
                        className="rounded p-1.5 text-ink-muted transition-colors hover:bg-paper hover:text-tangerine-600"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-muted">{item.unit}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(next) => useCartStore.getState().setQuantity(item.productId, next)}
                        max={item.maxStock}
                        size="sm"
                      />
                      <div className="flex items-baseline gap-2">
                        {item.originalPrice && item.originalPrice > item.price ? (
                          <span className="text-xs text-ink-muted line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </span>
                        ) : null}
                        <span className="font-display text-base font-bold text-ink">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="h-fit space-y-4 lg:sticky lg:top-24">
          {!freeDelivery ? (
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
              <p className="flex items-start gap-2 text-sm text-brand-800">
                <Truck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more to get free delivery.
              </p>
            </div>
          ) : null}

          <Card className="p-5">
            <h2 className="font-display text-base font-bold text-ink">Order summary</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 ? (
                <div className="flex justify-between text-brand-700">
                  <dt className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                    Discount
                  </dt>
                  <dd className="font-medium">−{formatPrice(discount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-ink-soft">Delivery fee</dt>
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
            <Button
              size="lg"
              className="mt-4 w-full"
              onClick={() => navigate('/checkout')}
            >
              Proceed to checkout
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              className="mt-2 w-full"
              asChild
            >
              <Link to="/products">Continue shopping</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}