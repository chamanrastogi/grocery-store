import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { DialogPortal, DialogOverlay } from '@/components/ui/dialog'

type SheetSide = 'top' | 'bottom' | 'left' | 'right'

const sheetSides: Record<SheetSide, string> = {
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 rounded-t-2xl border-t',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
}

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { side?: SheetSide }
>(({ side = 'right', className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 bg-surface p-6 shadow-pop focus-visible:outline-none animate-in',
        sheetSides[side],
        side === 'bottom' && 'animate-[enter_0.25s_cubic-bezier(0.16,1,0.3,1)]',
        side === 'left' && 'animate-[slide-in-left_0.25s_cubic-bezier(0.16,1,0.3,1)]',
        side === 'right' && 'animate-[slide-in-right_0.25s_cubic-bezier(0.16,1,0.3,1)]',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 disabled:pointer-events-none">
        <X className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-left', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-lg font-semibold text-ink', className)}
    {...props}
  />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-ink-muted', className)}
    {...props}
  />
))
SheetDescription.displayName = DialogPrimitive.Description.displayName

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription }