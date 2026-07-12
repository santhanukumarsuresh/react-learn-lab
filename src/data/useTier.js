import { useEffect, useState } from 'react'
import { curriculum } from './curriculum'

const STORAGE_KEY = 'react-learn-lab:tier'

// On first load, a deep link into an advanced lesson should show the
// Advanced tab immediately — not flash the Core tab first and correct
// itself a moment later. We resolve that synchronously from the URL here,
// rather than via a useEffect (which runs after the first paint).
function getInitialTier() {
  const match = window.location.pathname.match(/\/learn\/([^/]+)\//)
  if (match) {
    const part = curriculum.find((p) => p.id === match[1])
    if (part) return part.tier || 'core'
  }
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'advanced' ? 'advanced' : 'core'
}

// Tracks which difficulty track the learner is browsing: 'core' (the main
// beginner-to-mid course) or 'advanced' (hard, senior-level topics).
export function useTier() {
  const [tier, setTier] = useState(getInitialTier)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, tier)
  }, [tier])

  return [tier, setTier]
}
