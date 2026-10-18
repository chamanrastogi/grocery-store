import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Check, CheckCircle2, Circle } from 'lucide-react'
import { fetchOrder } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { SmartImage } from '@/components/common/smart-image'
import { NotFoundPage } from '@/pages/not-found-page'
import { formatDate, formatPrice, formatTime, pluralize } from '@/utils/format'
import { cn } from '@/utils/cn'

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrder(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse space-y-4 px-4 py-6 sm:px-6">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    )
  }

  if (isError || !data) return <NotFoundPage />

  const order = data

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Link
        to="/orders"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to orders
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Order #{order.id}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Placed {formatDate(order.placedAt)} at {formatTime(order.placedAt)}
          </p>
        </div>
        <Badge variant="fresh">{order.status}</Badge>
      </div>

      <Card className="p-5">
        <h2 className="font-display text-base font-bold text-ink">Delivery timeline</h2>
        <ol className="mt-5 space-y-0">
          {order.timeline.map((step, index) => {
            const isLast = index === order.timeline.length - 1
            return (
              <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                {!isLast ? (
                  <span
                    className={cn(
                      'absolute left-[9px] top-6 h-full w-0.5',
                      step.done ? 'bg-brand-500' : 'bg-line',
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                    step.done ? 'bg-brand-600 text-white' : 'border-2 border-line-strong text-ink-muted',
                  )}
                  aria-hidden="true"
                >
                  {step.done ? <Check className="h-3 w-3" strokeWidth={3} /> : <Circle className="h-2.5 w-2.5" />}
                </span>
                <div>
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      step.done ? 'text-ink' : 'text-ink-muted',
                    )}
                  >
                    {step.label}
                  </p>
                  {step.at ? (
                    <p className="text-xs text-ink-muted">{formatDate(step.at)} · {formatTime(step.at)}</p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-5">
          <h2 className="font-display text-base font-bold text-ink">
            {pluralize(order.items.length, 'item')}
          </h2>
          <ul className="mt-4 space-y-4">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center gap-4">
                <SmartImage
                  src={item.image}
                  alt={item.name}
                  fallback="🛒"
                  className="h-16 w-16 shrink-0 rounded-lg border border-line object-cover"
                />
                <div className="min-w-0 flex-1">
                  <Link to={`/product/${item.slug}`} className="text-sm font-semibold text-ink hover:text-brand-700">
                    {item.name}
                  </Link>
                  <p className="text-xs text-ink-muted">
                    {item.unit} · Qty {item.quantity}
                  </p>
                </div>
                <span className="font-display text-sm font-semibold text-ink">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-display text-base font-bold text-ink">Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-medium text-ink">{formatPrice(order.subtotal)}</dd>
              </div>
              {order.discount > 0 ? (
                <div className="flex justify-between text-brand-700">
                  <dt>Discount</dt>
                  <dd className="font-medium">−{formatPrice(order.discount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-ink-soft">Delivery</dt>
                <dd className="font-medium text-ink">
                  {order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}
                </dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex justify-between">
              <span className="font-display text-base font-bold text-ink">Total</span>
              <span className="font-display text-base font-bold text-ink">{formatPrice(order.total)}</span>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-base font-bold text-ink">Details</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div>
                <dt className="text-ink-soft">Deliver to</dt>
                <dd className="mt-0.5 text-ink">
                  {order.address.label} — {order.address.line1}, {order.address.city} {order.address.pincode}
                </dd>
              </div>
              <div>
                <dt className="text-ink-soft">Phone</dt>
                <dd className="text-ink">{order.address.phone}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Payment</dt>
                <dd className="text-ink">{order.paymentMethod}</dd>
              </div>
            </dl>
          </Card>

          <Button className="w-full" asChild>
            <Link to="/products">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Reorder items
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}