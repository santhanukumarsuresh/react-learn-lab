import { Link } from 'react-router-dom'
import { useProgress } from '../data/useProgress'

export default function LessonLayout({ partId, lesson, prev, next, children }) {
  const { isComplete, toggleComplete } = useProgress()
  const done = isComplete(partId, lesson.slug)

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900 dark:text-slate-50">
        {lesson.title}
      </h1>

      <div className="prose prose-slate max-w-none dark:prose-invert">{children}</div>

      <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <button
          onClick={() => toggleComplete(partId, lesson.slug)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            done
              ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
              : 'bg-sky-600 text-white hover:bg-sky-500'
          }`}
        >
          {done ? '✓ Marked as done' : 'Mark as done'}
        </button>
      </div>

      <div className="mt-8 flex justify-between gap-4 text-sm">
        {prev ? (
          <Link
            to={`/learn/${prev.part.id}/${prev.lesson.slug}`}
            className="rounded-lg border border-slate-200 px-4 py-2 text-slate-600 hover:border-sky-400 hover:text-sky-600 dark:border-slate-800 dark:text-slate-300"
          >
            ← {prev.lesson.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/learn/${next.part.id}/${next.lesson.slug}`}
            className="rounded-lg border border-slate-200 px-4 py-2 text-slate-600 hover:border-sky-400 hover:text-sky-600 dark:border-slate-800 dark:text-slate-300"
          >
            {next.lesson.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </article>
  )
}
