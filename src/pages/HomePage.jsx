import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Atom, BarChart3, Sparkles } from 'lucide-react'
import { partsForTier, totalLessonsForTier } from '../data/curriculum'
import { partIcons } from '../data/partIcons'
import { useProgress } from '../store/progress'
import { useTier } from '../store/tier'
import { usePageTitle } from '../lib/usePageTitle'
import { fadeUp, staggerContainer, EASE_OUT } from '../lib/motion-presets'
import ProgressBar from '../components/ProgressBar'
import TierTabs from '../components/TierTabs'

// Code-split: the Three.js and Recharts bundles only load on the home page,
// after paint (and the chart only if there's progress to show).
const Hero3D = lazy(() => import('../components/Hero3D'))
const ProgressChart = lazy(() => import('../components/ProgressChart'))

export default function HomePage() {
  const { isComplete } = useProgress()
  const [tier, setTier] = useTier()

  usePageTitle()

  const parts = partsForTier(tier)
  const total = totalLessonsForTier(tier)
  const completedInTier = parts.reduce(
    (sum, part) => sum + part.lessons.filter((l) => isComplete(part.id, l.slug)).length,
    0
  )
  const percent = total ? Math.round((completedInTier / total) * 100) : 0
  const firstPart = parts[0]
  const firstLesson = firstPart?.lessons[0]

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Ambient floating gradient blobs behind the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-130 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 20, 0], y: [0, 25, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-1/5 h-64 w-64 rounded-full bg-brand-teal/15 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, -30, 0], y: [0, 15, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 left-1/2 h-56 w-56 rounded-full bg-brand-orange/15 blur-3xl"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {/* 3D React atom hero (procedural, lazy-loaded) */}
        <motion.div variants={fadeUp} className="mx-auto h-52 sm:h-64">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <span className="grid size-16 animate-pulse place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-light text-white shadow-lg shadow-brand/30">
                  <Atom size={30} />
                </span>
              </div>
            }
          >
            <Hero3D />
          </Suspense>
        </motion.div>

        <motion.span
          variants={fadeUp}
          custom={1}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground shadow-sm"
        >
          <Sparkles size={14} className="text-primary" />
          Free, beginner-friendly, interactive
        </motion.span>

        <motion.h1
          variants={fadeUp}
          custom={2}
          className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          <span className="bg-gradient-to-r from-brand via-brand-light to-brand-teal bg-clip-text text-transparent dark:from-brand-light dark:via-brand-teal dark:to-brand-light">
            React Learn Lab
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
        >
          Learn React from scratch — with simple words, fun examples, code you can play with
          right in your browser, and quick quizzes to lock it all in.
        </motion.p>

        <motion.div variants={fadeUp} custom={4} className="mx-auto mt-6 w-fit">
          <TierTabs tier={tier} onChange={setTier} layoutGroup="home" />
        </motion.div>

        {firstLesson && (
          <motion.div variants={fadeUp} custom={5} className="mt-6">
            <motion.span whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-flex">
              <Link
                to={`/learn/${firstPart.id}/${firstLesson.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
              >
                {percent > 0 ? 'Continue Learning' : 'Start Learning'}
                <ArrowRight size={18} />
              </Link>
            </motion.span>
          </motion.div>
        )}

        {percent > 0 && (
          <motion.div variants={fadeUp} custom={6} className="mx-auto mt-8 max-w-xs">
            <ProgressBar percent={percent} />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {tier === 'advanced' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="mx-auto mt-10 max-w-xl rounded-lg border border-brand-orange/40 bg-brand-orange/10 p-4 text-center text-sm text-orange-800 dark:text-orange-200">
              🔥 You're in the <strong>Advanced Track</strong> — senior-level topics like
              performance engineering, concurrent rendering, and testing. Comfortable with the
              Core Course first? These lessons assume it.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dashboard (Recharts on brand chart tokens) */}
      {completedInTier > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            <BarChart3 size={16} className="text-primary" />
            Your progress by part
          </p>
          <Suspense fallback={<div className="h-56 w-full animate-pulse rounded-lg bg-muted" />}>
            <ProgressChart parts={parts} isComplete={isComplete} />
          </Suspense>
        </motion.div>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {parts.map((part, i) => {
          const PartIcon = partIcons[part.id]
          return (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.45, ease: EASE_OUT }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={`/learn/${part.id}/${part.lessons[0].slug}`}
                className="group block h-full rounded-xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  {PartIcon && <PartIcon size={20} />}
                </div>
                <p className="mt-3 font-semibold">{part.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {part.lessons.length} lessons
                </p>
                <p className="mt-2 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Start <ArrowRight size={14} />
                </p>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
