import { Link } from 'react-router-dom'
import type { Category } from '@/types'
import { SmartImage } from '@/components/common/smart-image'
import { cn } from '@/utils/cn'

interface CategoryCardProps {
  category: Category
  variant?: 'default' | 'compact'
}

export function CategoryCard({ category, variant = 'default' }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop',
        variant === 'default' ? 'aspect-[4/3]' : 'aspect-square',
      )}
    >
      <SmartImage
        src={category.image}
        alt={category.name}
        fallback={category.emoji}
        tone={category.slug}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden="true" />
      <div className="relative mt-auto p-3 text-left">
        <h3 className="font-display text-sm font-semibold text-white sm:text-base">{category.name}</h3>
        <p className="text-xs text-white/75">{category.tagline}</p>
      </div>
    </Link>
  )
}