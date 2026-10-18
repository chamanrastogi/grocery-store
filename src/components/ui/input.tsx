import * as React from 'react'
import { cn } from '@/utils/cn'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-tangerine-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }