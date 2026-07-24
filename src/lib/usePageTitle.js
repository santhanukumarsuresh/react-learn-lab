import { useEffect } from 'react'

const SITE = 'React Learn Lab'

/** Per-route document titles (client-side SEO, mirrors frontendwar's head handling). */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Learn React the Fun Way`
  }, [title])
}
