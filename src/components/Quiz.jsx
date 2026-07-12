import { useState } from 'react'
import { HelpCircle, CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react'

function QuizQuestion({ question, options, correctIndex, explanation, index, total }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  function reset() {
    setSelected(null)
    setRevealed(false)
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="flex items-start gap-2 font-semibold text-slate-800 dark:text-slate-100">
        <HelpCircle size={18} className="mt-0.5 shrink-0 text-sky-500" />
        <span>
          {total > 1 && (
            <span className="text-slate-400 dark:text-slate-500">
              Question {index + 1}/{total} —{' '}
            </span>
          )}
          {question}
        </span>
      </p>

      <div className="mt-4 space-y-2">
        {options.map((option, i) => {
          const isCorrect = i === correctIndex
          const isSelected = i === selected

          let stateClasses =
            'border-slate-200 hover:border-sky-300 hover:bg-white dark:border-slate-700 dark:hover:border-sky-700 dark:hover:bg-slate-800'
          if (revealed && isCorrect) {
            stateClasses =
              'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/30'
          } else if (revealed && isSelected && !isCorrect) {
            stateClasses = 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/30'
          } else if (isSelected) {
            stateClasses = 'border-sky-400 bg-sky-50 dark:border-sky-700 dark:bg-sky-900/30'
          }

          return (
            <button
              key={option}
              disabled={revealed}
              onClick={() => setSelected(i)}
              className={`flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-2.5 text-left text-sm text-slate-700 transition disabled:cursor-default dark:bg-slate-950/40 dark:text-slate-200 ${stateClasses}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-500 dark:border-slate-600 dark:text-slate-400">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
              {revealed && isCorrect && (
                <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
              )}
              {revealed && isSelected && !isCorrect && (
                <XCircle size={18} className="shrink-0 text-red-500" />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            View Answer
          </button>
        ) : (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
          >
            <RotateCcw size={14} />
            Try Again
          </button>
        )}
      </div>

      {revealed && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-900/20 dark:text-amber-200">
          <p className="flex items-center gap-1.5 font-semibold">
            <Lightbulb size={15} />
            {selected === correctIndex ? "You got it! Here's why:" : 'Explanation'}
          </p>
          <p className="mt-1.5 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  )
}

export default function Quiz({ questions }) {
  if (!questions || questions.length === 0) return null

  return (
    <div className="not-prose my-8">
      <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        Quick Check
      </p>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <QuizQuestion key={q.question} {...q} index={i} total={questions.length} />
        ))}
      </div>
    </div>
  )
}
