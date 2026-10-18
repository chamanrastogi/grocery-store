import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Heart, MapPin, Package, Settings, Bell } from 'lucide-react'
import { fetchOrders, fetchUser } from '@/services/api'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useWishlistStore } from '@/stores/wishlist-store'
import { useToast } from '@/components/ui/use-toast'

const quickLinks = [
  { to: '/orders', label: 'My orders', description: 'Track & reorder', icon: Package },
  { to: '/addresses', label: 'Addresses', description: 'Delivery locations', icon: MapPin },
  { to: '/wishlist', label: 'Wishlist', description: 'Items you saved', icon: Heart },
]

export function ProfilePage() {
  const { data: user, isLoading } = useQuery({ queryKey: ['user'], queryFn: fetchUser })
  const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: fetchOrders })
  const wishlistCount = useWishlistStore((s) => s.ids.length)
  const { toast } = useToast()

  if (isLoading || !user) {
    return (
      <div className="space-y-4 animate-pulse">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
      </div>
    )
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className={`font-display text-xl font-bold text-white ${user.avatarColor}`}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-bold text-ink">{user.name}</h1>
            <p className="text-sm text-ink-muted">{user.email}</p>
            <p className="text-sm text-ink-muted">{user.phone}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast({ title: 'Edit profile', description: 'Profile editing is coming soon.' })}>
              <Settings className="h-4 w-4" aria-hidden="true" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast({ title: 'Notifications', description: 'You have 2 unread offers.' })}>
              <Bell className="h-4 w-4" aria-hidden="true" />
              Alerts
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Orders" value={String(orders?.length ?? 0)} />
        <StatCard label="Wishlist" value={String(wishlistCount)} />
        <StatCard label="Addresses" value="2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickLinks.map(({ to, label, description, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-brand-300"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block font-display text-sm font-semibold text-ink">{label}</span>
                <span className="block text-xs text-ink-muted">{description}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4 text-center">
      <p className="font-display text-2xl font-bold text-brand-700">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-ink-muted">{label}</p>
    </Card>
  )
}