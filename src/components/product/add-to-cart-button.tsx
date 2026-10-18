import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/product/quantity-stepper'
import { useCartStore } from '@/stores/cart-store'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/utils/cn'

interface AddToCartButtonProps {
  product: Product
  className?: string
  size?: 'default' | 'sm' | 'lg'
}

export function AddToCartButton({ product, className, size = 'default' }: AddToCartButtonProps) {
  const quantity = useCartStore((s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0)
  const addItem = useCartStore((s) => s.addItem)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const openDrawer = useCartStore((s) => s.openDrawer)
  const { toast } = useToast()

  const outOfStock = product.stock <= 0

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      unit: product.unit,
      price: product.price,
      originalPrice: product.originalPrice,
      maxStock: product.stock,
    })
    toast({
      title: 'Added to cart',
      description: `${product.name} (${product.unit}) added to your cart.`,
      variant: 'success',
    })
    openDrawer()
  }

  if (outOfStock) {
    return (
      <Button type="button" disabled className={cn('w-full', className)}>
        Out of stock
      </Button>
    )
  }

  if (quantity > 0) {
    return (
      <QuantityStepper
        value={quantity}
        onChange={(next) => setQuantity(product.id, next)}
        max={product.stock}
        size={size === 'sm' ? 'sm' : 'md'}
        className={className}
      />
    )
  }

  return (
    <Button type="button" onClick={handleAdd} size={size} className={cn('w-full', className)}>
      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
      Add to cart
    </Button>
  )
}