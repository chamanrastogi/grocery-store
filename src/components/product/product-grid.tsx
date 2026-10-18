import type { Product } from '@/types'
import { ProductCard } from '@/components/product/product-card'
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton'
import { cn } from '@/utils/cn'

interface ProductGridProps {
  products?: Product[]
  isLoading?: boolean
  skeletonCount?: number
  columns?: { base: number; sm?: number; lg?: number }
  className?: string
}

const baseClasses = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' } as const
const smClasses = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' } as const
const lgClasses = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' } as const

export function ProductGrid({
  products,
  isLoading,
  skeletonCount = 8,
  columns = { base: 2, sm: 3, lg: 4 },
  className,
}: ProductGridProps) {
  const gridClass = cn(
    'grid gap-3 sm:gap-4',
    baseClasses[columns.base as keyof typeof baseClasses] ?? 'grid-cols-2',
    columns.sm ? smClasses[columns.sm as keyof typeof smClasses] : 'sm:grid-cols-3',
    columns.lg ? lgClasses[columns.lg as keyof typeof lgClasses] : 'lg:grid-cols-4',
    className,
  )

  if (isLoading || !products) {
    return (
      <div className={gridClass}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}