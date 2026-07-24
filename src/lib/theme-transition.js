/**
 * Runs `apply` (the DOM/state change that switches the theme) inside a
 * View Transition, then plays a premium full-page reveal:
 *   - the incoming theme is unveiled via an expanding circular clip-path
 *     from the click point, and
 *   - the outgoing theme settles back with a subtle scale + fade for depth.
 *
 * Gracefully degrades to an instant swap when the browser lacks the View
 * Transitions API or the user prefers reduced motion.
 */
const DURATION = 700
const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)' // easeInOutQuart

export function runThemeTransition(apply, origin) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (typeof document.startViewTransition !== 'function' || prefersReduced) {
    apply()
    return
  }

  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? window.innerHeight / 2
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(apply)

  transition.ready
    .then(() => {
      const root = document.documentElement

      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        { duration: DURATION, easing: EASING, pseudoElement: '::view-transition-new(root)' }
      )

      root.animate(
        { transform: ['scale(1)', 'scale(0.965)'], opacity: [1, 0.55] },
        { duration: DURATION, easing: EASING, pseudoElement: '::view-transition-old(root)' }
      )
    })
    .catch(() => {
      /* transition was skipped/interrupted — the theme still applied */
    })
}
