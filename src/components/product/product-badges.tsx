import type { Product } from '@/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'

const badgeStyles: Record<NonNullable<Product['badges']>[number], { label: string; variant: 'deal' | 'fresh' | 'default' | 'honey' | 'neutral' }> = {
  'best-seller': { label: 'Best Seller', variant: 'honey' },
  deal: { label: 'Deal', variant: 'deal' },
  fresh: { label: 'Fresh', variant: 'fresh' },
  new: { label: 'New', variant: 'default' },
  organic: { label: 'Organic', variant: 'default' },
  limited: { label: 'Limited', variant: 'neutral' },
}

interface ProductBadgesProps {
  product: Product
  className?: string
}

export function ProductBadges({ product, className }: ProductBadgesProps) {
  const badges = product.badges.slice(0, 2)
  if (badges.length === 0) return null
  return (
    <div className={cn('pointer-events-none flex flex-col items-start gap-1', className)}>
      {badges.map((badge) => (
        <Badge key={badge} variant={badgeStyles[badge].variant}>
          {badgeStyles[badge].label}
        </Badge>
      ))}
    </div>
  )
}