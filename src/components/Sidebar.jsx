import { useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Trophy, Flame } from 'lucide-react'
import { curriculum, partsForTier, totalLessonsForTier } from '../data/curriculum'
import { useProgress } from '../data/ProgressContext'
import { useTier } from '../data/useTier'
import { partIcons } from '../data/partIcons'
import ProgressBar from './ProgressBar'

export default function Sidebar({ open, onClose }) {
  const { partId } = useParams()
  const { completed, isComplete } = useProgress()
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
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 dark:border-slate-800 dark:bg-slate-950 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 text-sm font-semibold dark:bg-slate-900">
          <button
            onClick={() => setTier('core')}
            className={`rounded-md px-2 py-1.5 transition ${
              tier === 'core'
                ? 'bg-white text-sky-600 shadow-sm dark:bg-slate-800 dark:text-sky-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Core Course
          </button>
          <button
            onClick={() => setTier('advanced')}
            className={`flex items-center justify-center gap-1 rounded-md px-2 py-1.5 transition ${
              tier === 'advanced'
                ? 'bg-white text-orange-600 shadow-sm dark:bg-slate-800 dark:text-orange-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Flame size={14} />
            Advanced
          </button>
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Trophy size={16} className="text-amber-500" />
            Your Progress
          </p>
          <ProgressBar percent={percent} showLabel={false} />
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
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
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold ${
                    isActivePart
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-slate-700 dark:text-slate-200'
                  } hover:bg-slate-100 dark:hover:bg-slate-900`}
                >
                  <span className="flex items-center gap-2">
                    {PartIcon && <PartIcon size={16} className="shrink-0" />}
                    {part.title}
                  </span>
                  {isOpenPart ? (
                    <ChevronDown size={16} className="text-slate-400" />
                  ) : (
                    <ChevronRight size={16} className="text-slate-400" />
                  )}
                </button>
                {isOpenPart && (
                  <ul className="ml-3 space-y-0.5 border-l border-slate-200 pl-3 dark:border-slate-800">
                    {part.lessons.map((lesson) => {
                      const done = isComplete(part.id, lesson.slug)
                      return (
                        <li key={lesson.slug}>
                          <NavLink
                            to={`/learn/${part.id}/${lesson.slug}`}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                                isActive
                                  ? 'bg-sky-500/10 font-medium text-sky-600 dark:text-sky-400'
                                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                              }`
                            }
                          >
                            {done ? (
                              <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
                            ) : (
                              <Circle size={14} className="shrink-0 text-slate-300 dark:text-slate-700" />
                            )}
                            <span>{lesson.title}</span>
                          </NavLink>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
