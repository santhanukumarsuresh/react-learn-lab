import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Flame } from 'lucide-react'
import { partsForTier, totalLessonsForTier } from '../data/curriculum'
import { partIcons } from '../data/partIcons'
import { useProgress } from '../data/ProgressContext'
import { useTier } from '../data/useTier'
import ProgressBar from '../components/ProgressBar'

export default function HomePage() {
  const { completed, isComplete } = useProgress()
  const [tier, setTier] = useTier()

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
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/30">
          <Sparkles size={30} />
        </div>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          React Learn Lab
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
          Learn React from scratch — with simple words, fun examples, code you can play with
          right in your browser, and quick quizzes to lock it all in.
        </p>

        <div className="mx-auto mt-6 flex w-fit gap-1 rounded-lg bg-slate-100 p-1 text-sm font-semibold dark:bg-slate-900">
          <button
            onClick={() => setTier('core')}
            className={`rounded-md px-4 py-1.5 transition ${
              tier === 'core'
                ? 'bg-white text-sky-600 shadow-sm dark:bg-slate-800 dark:text-sky-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Core Course
          </button>
          <button
            onClick={() => setTier('advanced')}
            className={`flex items-center gap-1 rounded-md px-4 py-1.5 transition ${
              tier === 'advanced'
                ? 'bg-white text-orange-600 shadow-sm dark:bg-slate-800 dark:text-orange-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Flame size={14} />
            Advanced Track
          </button>
        </div>

        {firstLesson && (
          <Link
            to={`/learn/${firstPart.id}/${firstLesson.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-500"
          >
            {percent > 0 ? 'Continue Learning' : 'Start Learning'}
            <ArrowRight size={18} />
          </Link>
        )}

        {percent > 0 && (
          <div className="mx-auto mt-8 max-w-xs">
            <ProgressBar percent={percent} />
          </div>
        )}
      </div>

      {tier === 'advanced' && (
        <div className="mx-auto mt-10 max-w-xl rounded-lg border border-orange-200 bg-orange-50 p-4 text-center text-sm text-orange-800 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-200">
          🔥 You're in the <strong>Advanced Track</strong> — senior-level topics like
          performance engineering, concurrent rendering, and testing. Comfortable with the
          Core Course first? These lessons assume it.
        </div>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {parts.map((part) => {
          const PartIcon = partIcons[part.id]
          return (
            <Link
              key={part.id}
              to={`/learn/${part.id}/${part.lessons[0].slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600 transition group-hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:group-hover:bg-sky-500/20">
                {PartIcon && <PartIcon size={20} />}
              </div>
              <p className="mt-3 font-semibold text-slate-800 dark:text-slate-100">
                {part.title}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {part.lessons.length} lessons
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
