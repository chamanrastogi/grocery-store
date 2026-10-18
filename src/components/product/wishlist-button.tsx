import { Heart } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useWishlistStore } from '@/stores/wishlist-store'
import { useToast } from '@/components/ui/use-toast'

interface WishlistButtonProps {
  productId: string
  productName: string
  className?: string
  size?: 'sm' | 'md'
}

export function WishlistButton({ productId, productName, className, size = 'md' }: WishlistButtonProps) {
  const { toggle, has } = useWishlistStore()
  const { toast } = useToast()
  const active = has(productId)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(productId)
    toast({
      title: active ? 'Removed from wishlist' : 'Added to wishlist',
      description: `${productName} ${active ? 'removed from' : 'saved to'} your wishlist.`,
      variant: active ? 'default' : 'success',
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center justify-center rounded-full border bg-surface shadow-float transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
        size === 'sm' ? 'h-8 w-8' : 'h-9 w-9',
        active ? 'border-tangerine-200 text-tangerine-600' : 'border-line text-ink-muted hover:text-tangerine-600',
        className,
      )}
    >
      <Heart className={cn('h-4 w-4', active && 'fill-tangerine-500 text-tangerine-500')} aria-hidden="true" />
    </button>
  )
}