import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { curriculum, totalLessons } from '../data/curriculum'
import { partIcons } from '../data/partIcons'
import { useProgress } from '../data/ProgressContext'
import ProgressBar from '../components/ProgressBar'

export default function HomePage() {
  const firstLesson = curriculum[0].lessons[0]
  const { completed } = useProgress()
  const percent = totalLessons ? Math.round((completed.size / totalLessons) * 100) : 0

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
        <Link
          to={`/learn/${curriculum[0].id}/${firstLesson.slug}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-500"
        >
          {percent > 0 ? 'Continue Learning' : 'Start Learning'}
          <ArrowRight size={18} />
        </Link>

        {percent > 0 && (
          <div className="mx-auto mt-8 max-w-xs">
            <ProgressBar percent={percent} />
          </div>
        )}
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {curriculum.map((part) => {
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
