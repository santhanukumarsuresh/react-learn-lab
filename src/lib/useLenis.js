import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Buttery smooth scrolling (Lenis) on a custom scroll container.
 * Returns a ref to attach to the scrolling element. Respects
 * prefers-reduced-motion by not initializing at all.
 */
export function useLenis() {
  const wrapperRef = useRef(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      wrapper,
      content: wrapper.firstElementChild ?? wrapper,
      duration: 1.05,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let frame
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return { wrapperRef, lenisRef }
}
