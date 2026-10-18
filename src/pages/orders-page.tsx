import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Package } from 'lucide-react'
import { fetchOrders } from '@/services/api'
import type { OrderStatus } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'
import { SmartImage } from '@/components/common/smart-image'
import { formatDate, formatPrice, pluralize } from '@/utils/format'
import { cn } from '@/utils/cn'

const statusStyles: Record<OrderStatus, 'default' | 'fresh' | 'honey' | 'neutral'> = {
  Placed: 'default',
  Packed: 'honey',
  'Out for Delivery': 'fresh',
  Delivered: 'default',
  Cancelled: 'neutral',
}

export function OrdersPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">My Orders</h1>
        <p className="mt-1 text-sm text-ink-muted">Track, reorder and manage your past orders.</p>
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : !data || data.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="When you place your first order, it will show up here for easy reordering."
          actionLabel="Shop now"
          onAction={() => navigate('/products')}
        />
      ) : (
        <div className="space-y-4">
          {data.map((order) => (
            <Card key={order.id} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-base font-bold text-ink">Order #{order.id}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Placed {formatDate(order.placedAt)}</p>
                </div>
                <Badge variant={statusStyles[order.status]} className={cn(order.status === 'Out for Delivery' && 'animate-pulse')}>
                  {order.status}
                </Badge>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item) => (
                    <SmartImage
                      key={item.productId}
                      src={item.image}
                      alt={item.name}
                      fallback="🛒"
                      className="h-12 w-12 rounded-lg border-2 border-surface object-cover"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-ink">
                    {pluralize(order.items.length, 'item')}
                  </p>
                  <p className="text-ink-muted">· {formatPrice(order.total)}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-4">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/orders/${order.id}`}>View order</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to={`/orders/${order.id}`}>
                    Track order
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}