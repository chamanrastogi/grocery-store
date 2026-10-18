import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export function LoginPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setError(null)
    setSubmitting(true)
    setTimeout(() => {
      toast({ title: 'Welcome back!', description: 'You are now signed in.', variant: 'success' })
      navigate('/')
    }, 700)
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12 sm:px-6">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-muted">Sign in to shop faster and track your orders.</p>

        {error ? (
          <p role="alert" className="mt-4 rounded-lg border border-tangerine-200 bg-tangerine-50 px-3 py-2.5 text-sm text-tangerine-700">
            {error}
          </p>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <a href="/login" className="font-medium text-brand-700 hover:text-brand-800" onClick={(e) => { e.preventDefault(); toast({ title: 'Reset link sent', description: 'Check your inbox for a password reset link.' }) }}>
              Forgot password?
            </a>
          </div>
          <Button type="submit" className="w-full" size="lg" loading={submitting}>
            {!submitting ? <Lock className="h-4 w-4" aria-hidden="true" /> : null}
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          New to Greengrocer?{' '}
          <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}