import { Link } from 'react-router-dom'
import { curriculum } from '../data/curriculum'

export default function HomePage() {
  const firstLesson = curriculum[0].lessons[0]

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <p className="text-6xl">⚛️</p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-slate-50">
          React Learn Lab
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
          Learn React from scratch — with simple words, fun examples, and code you can play
          with right in your browser.
        </p>
        <Link
          to={`/learn/${curriculum[0].id}/${firstLesson.slug}`}
          className="mt-8 inline-block rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white shadow hover:bg-sky-500"
        >
          Start Learning →
        </Link>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {curriculum.map((part) => (
          <Link
            key={part.id}
            to={`/learn/${part.id}/${part.lessons[0].slug}`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-2xl">{part.icon}</p>
            <p className="mt-2 font-semibold text-slate-800 dark:text-slate-100">
              {part.title}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {part.lessons.length} lessons
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
