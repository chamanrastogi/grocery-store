import { Link } from 'react-router-dom'
import { ShoppingBasket } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink', className)}
      aria-label="Greengrocer home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-float">
        <ShoppingBasket className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>
        Green<span className="text-brand-600">world</span>
      </span>
    </Link>
  )
}