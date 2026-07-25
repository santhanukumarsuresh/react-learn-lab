import { create } from 'zustand'

// Plain-string keys (not zustand/persist JSON) so the pre-paint bootstrap
// script in index.html — and any previously saved preference — keeps working.
const MODE_KEY = 'react-learn-lab:theme'
const ACCENT_KEY = 'react-learn-lab:accent'

/** Selectable accent swatches (applied to the --primary / --ring tokens). */
export const ACCENT_SWATCHES = [
  { name: 'Ocean', value: '#005396' },
  { name: 'Sky', value: '#00a0dc' },
  { name: 'Teal', value: '#11b9b4' },
  { name: 'Coral', value: '#f89e64' },
  { name: 'Violet', value: '#6d5cff' },
  { name: 'Emerald', value: '#16a34a' },
  { name: 'Rose', value: '#e11d48' },
]

function getInitialMode() {
  try {
    const stored = localStorage.getItem(MODE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* private mode etc. */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialAccent() {
  try {
    const stored = localStorage.getItem(ACCENT_KEY)
    if (stored && /^#[0-9a-fA-F]{6}$/.test(stored)) return stored
  } catch {
    /* ignore */
  }
  return null
}

export const useThemeStore = create((set, get) => ({
  mode: getInitialMode(),
  accent: getInitialAccent(),

  setMode: (mode) => {
    try {
      localStorage.setItem(MODE_KEY, mode)
    } catch {
      /* ignore */
    }
    set({ mode })
  },
  toggleMode: () => get().setMode(get().mode === 'dark' ? 'light' : 'dark'),
  setAccent: (accent) => {
    try {
      if (accent) localStorage.setItem(ACCENT_KEY, accent)
      else localStorage.removeItem(ACCENT_KEY)
    } catch {
      /* ignore */
    }
    set({ accent })
  },
}))
