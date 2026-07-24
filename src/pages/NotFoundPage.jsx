import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Compass, Home } from 'lucide-react'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary"
      >
        <Compass size={32} />
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-extrabold tracking-tight"
      >
        404 — lost in the component tree
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="max-w-md text-muted-foreground"
      >
        This page doesn't exist (or was unmounted). Let's get you back to the course.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
        >
          <Home size={16} />
          Back home
        </Link>
      </motion.div>
    </div>
  )
}
