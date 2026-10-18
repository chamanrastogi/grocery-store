import type { Product } from '@/types'
import { SectionHeader } from '@/components/common/section-header'
import { ProductCard } from '@/components/product/product-card'
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton'

interface ProductSectionProps {
  title: string
  subtitle?: string
  viewAllHref?: string
  products?: Product[]
  isLoading?: boolean
  skeletonCount?: number
}

export function ProductSection({
  title,
  subtitle,
  viewAllHref,
  products,
  isLoading,
  skeletonCount = 4,
}: ProductSectionProps) {
  const loading = isLoading || !products

  return (
    <section aria-label={title}>
      <SectionHeader title={title} subtitle={subtitle} viewAllHref={viewAllHref} />
      <div className="flex snap-x gap-3 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 sm:gap-4">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i} className="w-[170px] shrink-0 snap-start sm:w-auto">
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="w-[170px] shrink-0 snap-start sm:w-auto">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </section>
  )
}