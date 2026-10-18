import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <Skeleton className="aspect-square rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-1 h-4 w-1/3" />
        <Skeleton className="mt-2 h-9 w-full rounded-md" />
      </div>
    </Card>
  )
}