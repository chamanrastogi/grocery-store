import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SmartImage } from '@/components/common/smart-image'
import { QuantityStepper } from '@/components/product/quantity-stepper'
import { useCartStore, selectCartSubtotal } from '@/stores/cart-store'
import { formatPrice } from '@/utils/format'

const FREE_DELIVERY_THRESHOLD = 499
const DELIVERY_FEE = 40

export function CartDrawer() {
  const navigate = useNavigate()
  const drawerOpen = useCartStore((s) => s.drawerOpen)
  const closeDrawer = useCartStore((s) => s.closeDrawer)
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore(selectCartSubtotal)

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)

  return (
    <Sheet open={drawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent side="right" className="flex w-full max-w-sm flex-col p-0">
        <SheetHeader className="border-b border-line px-5 py-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-600" aria-hidden="true" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? 'Your cart is empty.'
              : `${items.reduce((n, i) => n + i.quantity, 0)} items in your cart`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
              <ShoppingBag className="h-8 w-8 text-brand-600" aria-hidden="true" />
            </div>
            <p className="font-display text-base font-semibold text-ink">Your cart is empty</p>
            <p className="text-sm text-ink-muted">Start adding your favourite groceries.</p>
            <Button
              className="mt-2"
              onClick={() => {
                closeDrawer()
                navigate('/products')
              }}
            >
              Start shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="px-5 pt-4">
              <div className="rounded-lg bg-brand-50 p-3">
                {remaining > 0 ? (
                  <p className="text-xs text-brand-800">
                    Add <strong>{formatPrice(remaining)}</strong> more for free delivery.
                  </p>
                ) : (
                  <p className="text-xs font-medium text-brand-800">You've unlocked free delivery!</p>
                )}
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    fallback="🛒"
                    className="h-16 w-16 shrink-0 rounded-lg border border-line object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug text-ink">{item.name}</p>
                      <button
                        type="button"
                        onClick={() => useCartStore.getState().removeItem(item.productId)}
                        className="rounded p-1 text-ink-muted transition-colors hover:bg-paper hover:text-tangerine-600"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-ink-muted">{item.unit}</p>
                    <div className="mt-auto flex items-center justify-between pt-1">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(next) => useCartStore.getState().setQuantity(item.productId, next)}
                        max={item.maxStock}
                        size="sm"
                      />
                      <span className="font-display text-sm font-semibold text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Subtotal</span>
                <span className="font-display font-semibold text-ink">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Delivery fee of {formatPrice(DELIVERY_FEE)} applies at checkout below {formatPrice(FREE_DELIVERY_THRESHOLD)}.
              </p>
              <Button
                className="mt-4 w-full"
                size="lg"
                onClick={() => {
                  closeDrawer()
                  navigate('/cart')
                }}
              >
                View cart & checkout
              </Button>
              <Separator className="my-3" />
              <button
                type="button"
                onClick={() => {
                  closeDrawer()
                  navigate('/products')
                }}
                className="w-full text-center text-sm font-medium text-brand-700 hover:text-brand-800"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}