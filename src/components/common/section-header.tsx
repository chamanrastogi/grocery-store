import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  viewAllHref?: string
  className?: string
}

export function SectionHeader({ title, subtitle, viewAllHref, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-4 flex items-end justify-between gap-4', className)}>
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p> : null}
      </div>
      {viewAllHref ? (
        <Link
          to={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          View all
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  )
}