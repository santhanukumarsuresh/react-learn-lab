import { useEffect } from 'react'
import { useThemeStore } from '../store/theme'

/**
 * Applies the theme store to the DOM:
 *   - toggles the `dark` class on <html> so the CSS token blocks switch
 *     (same class the pre-paint bootstrap script in index.html sets)
 *   - overrides --primary / --ring when a custom accent is chosen
 *
 * Because every Tailwind color utility maps to these CSS variables (see
 * index.css), changing them here restyles the whole app instantly. The
 * animated switch itself lives in src/lib/theme-transition.js.
 */
export default function ThemeProvider({ children }) {
  const mode = useThemeStore((s) => s.mode)
  const accent = useThemeStore((s) => s.accent)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  useEffect(() => {
    const root = document.documentElement
    if (accent) {
      root.style.setProperty('--primary', accent)
      root.style.setProperty('--ring', accent)
    } else {
      root.style.removeProperty('--primary')
      root.style.removeProperty('--ring')
    }
  }, [accent])

  return children
}
