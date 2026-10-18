import type { Category } from '@/types'
import { CategoryCard } from '@/components/category/category-card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/utils/cn'

interface CategoryGridProps {
  categories?: Category[]
  isLoading?: boolean
  className?: string
}

export function CategoryGrid({ categories, isLoading, className }: CategoryGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5', className)}>
      {isLoading || !categories
        ? Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
          ))
        : categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
    </div>
  )
}