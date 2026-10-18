import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

interface RatingProps {
  value: number
  size?: number
  showValue?: boolean
  count?: number
  className?: string
}

export function Rating({ value, size = 14, showValue = true, count, className }: RatingProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        className="inline-flex items-center"
        role="img"
        aria-label={`Rated ${value.toFixed(1)} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.max(0, Math.min(1, value - (star - 1)))
          return (
            <span key={star} className="relative inline-block" style={{ width: size, height: size }}>
              <Star
                className="absolute inset-0 fill-line text-line"
                style={{ width: size, height: size }}
                aria-hidden="true"
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
                aria-hidden="true"
              >
                <Star
                  className="fill-honey-400 text-honey-400"
                  style={{ width: size, height: size }}
                />
              </span>
            </span>
          )
        })}
      </span>
      {showValue ? (
        <span className="text-xs font-medium text-ink-soft">
          {value.toFixed(1)}
          {count !== undefined ? <span className="text-ink-muted"> ({count.toLocaleString()})</span> : null}
        </span>
      ) : null}
    </span>
  )
}