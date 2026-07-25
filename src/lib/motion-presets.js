// Shared framer-motion variants so entrances feel consistent app-wide.

export const EASE_OUT = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: EASE_OUT },
  }),
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}
