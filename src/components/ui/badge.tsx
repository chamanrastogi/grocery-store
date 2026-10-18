import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-display text-[11px] font-semibold tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-brand-100 text-brand-800',
        deal: 'bg-tangerine-100 text-tangerine-700',
        fresh: 'bg-brand-600 text-white',
        outline: 'border border-line-strong text-ink-soft',
        honey: 'bg-honey-100 text-honey-600',
        neutral: 'bg-paper text-ink-soft border border-line',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }