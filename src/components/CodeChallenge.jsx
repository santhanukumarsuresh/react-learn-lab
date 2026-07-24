import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { Code2, Lightbulb, RotateCcw, Sparkles } from 'lucide-react'
import { baseScope } from './CodeSandbox'

export default function CodeChallenge({ prompt, starterCode, solutionCode, explanation, scope }) {
  const [showSolution, setShowSolution] = useState(false)
  const activeCode = showSolution ? solutionCode : starterCode

  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-sky-200 dark:border-sky-900/60">
      <div className="flex items-start gap-2 bg-sky-50 px-5 py-3 dark:bg-sky-950/40">
        <Code2 size={18} className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-sky-600 dark:text-sky-400">
            Try It Yourself
          </p>
          <p className="mt-0.5 text-sm text-slate-700 dark:text-slate-200">{prompt}</p>
        </div>
      </div>

      <LiveProvider key={showSolution} code={activeCode.trim()} noInline scope={baseScope}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-slate-900 p-4 text-sm">
            <LiveEditor className="font-mono" />
          </div>
          <div className="flex flex-col justify-center bg-white p-4 dark:bg-slate-800">
            <LivePreview />
            <LiveError className="mt-2 text-xs text-red-600" />
          </div>
        </div>
      </LiveProvider>

      <div className="border-t border-sky-100 bg-white p-4 dark:border-sky-900/60 dark:bg-slate-900">
        {!showSolution ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSolution(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Sparkles size={15} />
            View Solution
          </motion.button>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSolution(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
            >
              <RotateCcw size={14} />
              Back to My Attempt
            </motion.button>
            <AnimatePresence>
              {explanation && (
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
                      How it works
                    </p>
                    <p className="mt-1.5 leading-relaxed">{explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}
