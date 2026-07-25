import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// shadcn/ui-style button built on class-variance-authority + token colors.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90',
        outline:
          'border border-border bg-transparent text-foreground hover:border-primary/50 hover:text-primary',
        ghost: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        success:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      },
      size: {
        default: 'px-4 py-2',
        lg: 'px-6 py-3 text-base',
        sm: 'px-3 py-1.5 text-xs',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export default function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { buttonVariants }
