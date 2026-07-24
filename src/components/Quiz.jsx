import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HelpCircle, CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react'

function QuizQuestion({ question, options, correctIndex, explanation, index, total }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  function reset() {
    setSelected(null)
    setRevealed(false)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="flex items-start gap-2 font-semibold">
        <HelpCircle size={18} className="mt-0.5 shrink-0 text-primary" />
        <span>
          {total > 1 && (
            <span className="text-muted-foreground">
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
            'border-border hover:border-primary/40 hover:bg-accent/50'
          if (revealed && isCorrect) {
            stateClasses =
              'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/30'
          } else if (revealed && isSelected && !isCorrect) {
            stateClasses = 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/30'
          } else if (isSelected) {
            stateClasses = 'border-primary bg-primary/10'
          }

          // Wrong pick shakes; the right answer pops — instant feedback.
          const feedback =
            revealed && isSelected && !isCorrect
              ? { x: [0, -6, 6, -4, 4, 0] }
              : revealed && isCorrect
                ? { scale: [1, 1.02, 1] }
                : {}

          return (
            <motion.button
              key={option}
              disabled={revealed}
              onClick={() => setSelected(i)}
              whileTap={revealed ? undefined : { scale: 0.98 }}
              animate={feedback}
              transition={{ duration: 0.4 }}
              className={`flex w-full items-center gap-3 rounded-lg border bg-background px-4 py-2.5 text-left text-sm transition disabled:cursor-default ${stateClasses}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
              {revealed && isCorrect && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                >
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                </motion.span>
              )}
              {revealed && isSelected && !isCorrect && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                >
                  <XCircle size={18} className="shrink-0 text-red-500" />
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        {!revealed ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRevealed(true)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Answer
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <RotateCcw size={14} />
            Try Again
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-900/20 dark:text-amber-200">
              <p className="flex items-center gap-1.5 font-semibold">
                <Lightbulb size={15} />
                {selected === correctIndex ? "You got it! Here's why:" : 'Explanation'}
              </p>
              <p className="mt-1.5 leading-relaxed">{explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Quiz({ questions }) {
  if (!questions || questions.length === 0) return null

  return (
    <div className="not-prose my-8">
      <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
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
