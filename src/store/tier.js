import { create } from 'zustand'
import { curriculum } from '../data/curriculum'

const STORAGE_KEY = 'react-learn-lab:tier'

// On first load, a deep link into an advanced lesson should show the
// Advanced tab immediately — not flash the Core tab first and correct
// itself a moment later. Resolved synchronously from the URL here.
function getInitialTier() {
  const match = window.location.pathname.match(/\/learn\/([^/]+)\//)
  if (match) {
    const part = curriculum.find((p) => p.id === match[1])
    if (part) return part.tier || 'core'
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'advanced' ? 'advanced' : 'core'
  } catch {
    return 'core'
  }
}

export const useTierStore = create((set) => ({
  tier: getInitialTier(),
  setTier: (tier) => {
    try {
      localStorage.setItem(STORAGE_KEY, tier)
    } catch {
      /* ignore */
    }
    set({ tier })
  },
}))

// Drop-in replacement for the old useTier hook — same [tier, setTier] shape.
export function useTier() {
  const tier = useTierStore((s) => s.tier)
  const setTier = useTierStore((s) => s.setTier)
  return [tier, setTier]
}
