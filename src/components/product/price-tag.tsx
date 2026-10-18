import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'
import { discountPercent, formatPrice } from '@/utils/format'

interface PriceTagProps {
  price: number
  originalPrice?: number
  className?: string
  priceClassName?: string
}

export function PriceTag({ price, originalPrice, className, priceClassName }: PriceTagProps) {
  const discount = originalPrice ? discountPercent(originalPrice, price) : 0
  const hasDiscount = originalPrice !== undefined && originalPrice > price

  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span className={cn('font-display text-base font-bold text-ink', priceClassName)}>
        {formatPrice(price)}
      </span>
      {hasDiscount ? (
        <>
          <span className="text-xs text-ink-muted line-through">{formatPrice(originalPrice)}</span>
          {discount > 0 ? <Badge variant="deal">{discount}% OFF</Badge> : null}
        </>
      ) : null}
    </div>
  )
}