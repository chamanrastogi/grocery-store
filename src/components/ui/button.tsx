import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-display text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800',
        secondary:
          'bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-200',
        outline:
          'border border-line-strong bg-surface text-ink hover:bg-paper hover:border-brand-400',
        ghost: 'text-ink-soft hover:bg-paper hover:text-ink',
        destructive:
          'bg-tangerine-600 text-white hover:bg-tangerine-700',
        link: 'text-brand-700 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-6 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }