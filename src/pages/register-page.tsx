import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export function RegisterPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('Name, email and password are required.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setError(null)
    setSubmitting(true)
    setTimeout(() => {
      toast({ title: 'Account created', description: `Welcome, ${form.name.split(' ')[0]}!`, variant: 'success' })
      navigate('/')
    }, 700)
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12 sm:px-6">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Create your account</h1>
        <p className="mt-1 text-sm text-ink-muted">Join for exclusive deals and one-tap reordering.</p>

        {error ? (
          <p role="alert" className="mt-4 rounded-lg border border-tangerine-200 bg-tangerine-50 px-3 py-2.5 text-sm text-tangerine-700">
            {error}
          </p>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="reg-name">Full name</Label>
            <Input
              id="reg-name"
              autoComplete="name"
              placeholder="Aarav Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="reg-email">Email</Label>
            <Input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="reg-phone">Phone (optional)</Label>
            <Input
              id="reg-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="reg-password">Password</Label>
            <Input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full" size="lg" loading={submitting}>
            {!submitting ? <UserPlus className="h-4 w-4" aria-hidden="true" /> : null}
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}