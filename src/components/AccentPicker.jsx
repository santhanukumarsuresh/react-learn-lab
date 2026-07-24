import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Palette } from 'lucide-react'
import { ACCENT_SWATCHES, useThemeStore } from '../store/theme'

/**
 * Small popover with brand accent swatches. Picking one live-overrides the
 * --primary / --ring tokens (see ThemeProvider), restyling the whole app.
 */
export default function AccentPicker() {
  const accent = useThemeStore((s) => s.accent)
  const setAccent = useThemeStore((s) => s.setAccent)
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Pick accent color"
        title="Pick accent color"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <Palette size={16} />
        <span
          className="absolute right-1 bottom-1 size-2 rounded-full ring-1 ring-card"
          style={{ backgroundColor: accent || 'var(--brand)' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-40 mt-2 w-44 rounded-xl border border-border bg-card p-3 shadow-xl"
          >
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Accent color</p>
            <div className="grid grid-cols-4 gap-2">
              {ACCENT_SWATCHES.map((swatch) => {
                const active = accent === swatch.value
                return (
                  <motion.button
                    key={swatch.value}
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={swatch.name}
                    title={swatch.name}
                    onClick={() => setAccent(active ? null : swatch.value)}
                    className="flex size-8 items-center justify-center rounded-full text-white shadow-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                    style={{ backgroundColor: swatch.value }}
                  >
                    {active && <Check size={14} />}
                  </motion.button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={() => setAccent(null)}
              className="mt-3 w-full rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Reset to default
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
