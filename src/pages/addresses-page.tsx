import { useQuery } from '@tanstack/react-query'
import { MapPin, Pencil, Plus, Trash2 } from 'lucide-react'
import { fetchAddresses } from '@/services/api'
import type { Address } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'
import { useAddressStore } from '@/stores/address-store'
import { useToast } from '@/components/ui/use-toast'

export function AddressesPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['addresses'],
    queryFn: fetchAddresses,
  })
  const activeAddressId = useAddressStore((s) => s.activeAddressId)
  const setActive = useAddressStore((s) => s.setActive)
  const { toast } = useToast()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Addresses</h1>
          <p className="mt-1 text-sm text-ink-muted">Manage where we deliver your groceries.</p>
        </div>
        <Button onClick={() => toast({ title: 'Add address', description: 'Adding a new address is coming soon.' })}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add new
        </Button>
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      ) : !data || data.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No saved addresses"
          description="Add a delivery address to speed up checkout."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isActive={activeAddressId === address.id}
              onSetActive={() => {
                setActive(address.id)
                toast({ title: 'Address set', description: `${address.label} is now your delivery address.`, variant: 'success' })
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function AddressCard({
  address,
  isActive,
  onSetActive,
}: {
  address: Address
  isActive: boolean
  onSetActive: () => void
}) {
  const { toast } = useToast()

  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
            <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
          </span>
          <h2 className="font-display text-base font-semibold text-ink">{address.label}</h2>
          {address.isDefault ? <Badge variant="default">Default</Badge> : null}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => toast({ title: 'Edit address', description: 'Editing addresses is coming soon.' })}
            className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-paper hover:text-ink"
            aria-label={`Edit ${address.label} address`}
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => toast({ title: 'Delete address', description: 'Deleting addresses is coming soon.' })}
            className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-paper hover:text-tangerine-600"
            aria-label={`Delete ${address.label} address`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mt-3 flex-1 text-sm">
        <p className="font-medium text-ink">{address.name}</p>
        <p className="mt-1 leading-relaxed text-ink-soft">
          {address.line1}
          {address.line2 ? `, ${address.line2}` : ''}
          <br />
          {address.city} — {address.pincode}
        </p>
        <p className="mt-1 text-ink-muted">{address.phone}</p>
      </div>
      <Button variant="outline" size="sm" className="mt-4" onClick={onSetActive} disabled={isActive}>
        {isActive ? 'Active delivery address' : 'Deliver here'}
      </Button>
    </Card>
  )
}