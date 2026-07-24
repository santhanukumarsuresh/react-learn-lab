import { useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronRight, CheckCircle2, Circle, Trophy } from 'lucide-react'
import { curriculum, partsForTier, totalLessonsForTier } from '../data/curriculum'
import { useProgress } from '../store/progress'
import { useTier } from '../store/tier'
import { partIcons } from '../data/partIcons'
import { cn } from '../lib/utils'
import ProgressBar from './ProgressBar'
import TierTabs from './TierTabs'

const EASE = [0.22, 1, 0.36, 1]

export default function Sidebar({ open, onClose }) {
  const { partId } = useParams()
  const { isComplete } = useProgress()
  const [tier, setTier] = useTier()
  const [collapsed, setCollapsed] = useState({})
  const previousPartId = useRef(partId)

  // useTier already resolves the correct tier for the initial page load.
  // This only handles client-side navigation afterwards — e.g. clicking
  // "next lesson" right at the boundary from the last core lesson into the
  // first advanced one, which should flip the tab without a full reload.
  useEffect(() => {
    if (partId === previousPartId.current) return
    previousPartId.current = partId
    const activePart = curriculum.find((p) => p.id === partId)
    if (activePart) {
      setTier(activePart.tier || 'core')
    }
  }, [partId, setTier])

  const toggle = (id) => setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))

  const parts = partsForTier(tier)
  const total = totalLessonsForTier(tier)
  const completedInTier = parts.reduce(
    (sum, part) => sum + part.lessons.filter((l) => isComplete(part.id, l.slug)).length,
    0
  )
  const percent = total ? Math.round((completedInTier / total) * 100) : 0

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close menu"
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 shrink-0 overflow-y-auto border-r border-border bg-background p-4 transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <TierTabs tier={tier} onChange={setTier} layoutGroup="sidebar" className="mb-4" />

        <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
            <Trophy size={16} className="text-brand-yellow drop-shadow" />
            Your Progress
          </p>
          <ProgressBar percent={percent} showLabel={false} />
          <p className="mt-2 text-xs text-muted-foreground">
            {completedInTier} / {total} lessons complete
          </p>
        </div>

        <nav className="space-y-1">
          {parts.map((part) => {
            const isOpenPart = collapsed[part.id] !== true
            const isActivePart = part.id === partId
            const PartIcon = partIcons[part.id]
            return (
              <div key={part.id}>
                <button
                  onClick={() => toggle(part.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold transition-colors hover:bg-accent',
                    isActivePart ? 'text-primary' : 'text-foreground'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {PartIcon && <PartIcon size={16} className="shrink-0" />}
                    {part.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpenPart ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="text-muted-foreground"
                  >
                    <ChevronRight size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpenPart && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="ml-3 space-y-0.5 overflow-hidden border-l border-border pl-3"
                    >
                      {part.lessons.map((lesson) => {
                        const done = isComplete(part.id, lesson.slug)
                        return (
                          <li key={lesson.slug}>
                            <NavLink
                              to={`/learn/${part.id}/${lesson.slug}`}
                              onClick={onClose}
                              className={({ isActive }) =>
                                cn(
                                  'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                                  isActive
                                    ? 'bg-primary/10 font-medium text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                )
                              }
                            >
                              {done ? (
                                <motion.span
                                  key="done"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', bounce: 0.6 }}
                                  className="shrink-0 text-brand-teal"
                                >
                                  <CheckCircle2 size={14} />
                                </motion.span>
                              ) : (
                                <Circle size={14} className="shrink-0 text-border" />
                              )}
                              <span>{lesson.title}</span>
                            </NavLink>
                          </li>
                        )
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
