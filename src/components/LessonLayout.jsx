import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useProgress } from '../data/ProgressContext'
import { partIcons } from '../data/partIcons'
import { quizzes } from '../data/quizzes'
import { codingChallenges } from '../data/codingChallenges'
import Quiz from './Quiz'
import CodeChallenge from './CodeChallenge'

export default function LessonLayout({ partId, part, lesson, prev, next, children }) {
  const { isComplete, toggleComplete } = useProgress()
  const done = isComplete(partId, lesson.slug)
  const PartIcon = part && partIcons[part.id]
  const questions = quizzes[lesson.slug]
  const challenge = codingChallenges[lesson.slug]

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {part && (
        <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-sky-600 dark:text-sky-400">
          {PartIcon && <PartIcon size={15} />}
          {part.title}
        </p>
      )}
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900 dark:text-slate-50">
        {lesson.title}
      </h1>

      <div className="prose prose-slate max-w-none dark:prose-invert">{children}</div>

      {challenge && <CodeChallenge {...challenge} />}

      {questions && questions.length > 0 && <Quiz questions={questions} />}

      <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <button
          onClick={() => toggleComplete(partId, lesson.slug)}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            done
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
              : 'bg-sky-600 text-white hover:bg-sky-500'
          }`}
        >
          <CheckCircle2 size={16} />
          {done ? 'Marked as done' : 'Mark as done'}
        </button>
      </div>

      <div className="mt-8 flex justify-between gap-4 text-sm">
        {prev ? (
          <Link
            to={`/learn/${prev.part.id}/${prev.lesson.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-slate-600 hover:border-sky-400 hover:text-sky-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:text-sky-400"
          >
            <ArrowLeft size={15} />
            {prev.lesson.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/learn/${next.part.id}/${next.lesson.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-slate-600 hover:border-sky-400 hover:text-sky-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:text-sky-400"
          >
            {next.lesson.title}
            <ArrowRight size={15} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </article>
  )
}
