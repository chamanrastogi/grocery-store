import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  max?: number
  min?: number
  size?: 'sm' | 'md'
  className?: string
}

export function QuantityStepper({
  value,
  onChange,
  max = 99,
  min = 1,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const iconSize = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
  return (
    <div
      className={cn('inline-flex items-center rounded-lg border border-line-strong bg-surface', className)}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconSize, 'rounded-r-none text-ink-soft hover:bg-paper')}
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </Button>
      <span
        className="w-8 text-center font-display text-sm font-semibold text-ink tabular-nums"
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconSize, 'rounded-l-none text-brand-700 hover:bg-brand-50')}
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  )
}