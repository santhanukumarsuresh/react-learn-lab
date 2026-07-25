import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes without duplicates or conflicts (shadcn/ui-style). */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
