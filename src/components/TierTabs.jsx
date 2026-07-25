import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'motion/react'
import { Flame, GraduationCap } from 'lucide-react'
import { cn } from '../lib/utils'

const TIERS = [
  { value: 'core', label: 'Core Course', icon: GraduationCap, activeText: 'text-primary' },
  { value: 'advanced', label: 'Advanced', icon: Flame, activeText: 'text-brand-orange' },
]

/**
 * Core/Advanced track switch — Radix Tabs for accessibility, with a shared
 * framer-motion `layoutId` pill that glides between the active options.
 * The `layoutGroup` prop keeps the Sidebar and Home instances independent.
 */
export default function TierTabs({ tier, onChange, layoutGroup, className }) {
  return (
    <Tabs.Root value={tier} onValueChange={onChange} className={className}>
      <Tabs.List
        aria-label="Course track"
        className="grid w-full grid-cols-2 gap-1 rounded-xl border border-border bg-muted p-1 text-sm font-semibold"
      >
        {TIERS.map(({ value, label, icon: Icon, activeText }) => {
          const active = tier === value
          return (
            <Tabs.Trigger
              key={value}
              value={value}
              className={cn(
                'relative flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                active ? activeText : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {active && (
                <motion.span
                  layoutId={`tier-pill-${layoutGroup}`}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  className="absolute inset-0 rounded-lg bg-card shadow-sm"
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <Icon size={14} />
                {label}
              </span>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
