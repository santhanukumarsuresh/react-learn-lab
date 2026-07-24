import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useProgress } from '../store/progress'
import { partIcons } from '../data/partIcons'
import { quizzes } from '../data/quizzes'
import { codingChallenges } from '../data/codingChallenges'
import { usePageTitle } from '../lib/usePageTitle'
import { cn } from '../lib/utils'
import Quiz from './Quiz'
import CodeChallenge from './CodeChallenge'

const EASE = [0.22, 1, 0.36, 1]

export default function LessonLayout({ partId, part, lesson, prev, next, children }) {
  const { isComplete, toggleComplete } = useProgress()
  const done = isComplete(partId, lesson.slug)
  const PartIcon = part && partIcons[part.id]
  const questions = quizzes[lesson.slug]
  const challenge = codingChallenges[lesson.slug]

  usePageTitle(lesson.title)

  return (
    <motion.article
      key={lesson.slug}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:my-8 lg:max-w-4xl lg:rounded-2xl lg:border lg:border-border lg:bg-card lg:px-10 lg:py-12 lg:shadow-sm"
    >
      {part && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.35, ease: EASE }}
          className="mb-2 flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          {PartIcon && <PartIcon size={15} />}
          {part.title}
        </motion.p>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4, ease: EASE }}
        className="mb-6 text-3xl font-extrabold"
      >
        {lesson.title}
      </motion.h1>

      <div className="prose prose-slate max-w-none dark:prose-invert">{children}</div>

      {challenge && <CodeChallenge {...challenge} />}

      {questions && questions.length > 0 && <Quiz questions={questions} />}

      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => toggleComplete(partId, lesson.slug)}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
            done
              ? 'bg-brand-teal/15 text-brand-teal'
              : 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90'
          )}
        >
          <motion.span
            key={done ? 'done' : 'todo'}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.55 }}
          >
            <CheckCircle2 size={16} />
          </motion.span>
          {done ? 'Marked as done' : 'Mark as done'}
        </motion.button>
      </div>

      <div className="mt-8 flex justify-between gap-4 text-sm">
        {prev ? (
          <motion.span whileHover={{ x: -3 }} className="inline-flex">
            <Link
              to={`/learn/${prev.part.id}/${prev.lesson.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft size={15} />
              {prev.lesson.title}
            </Link>
          </motion.span>
        ) : (
          <span />
        )}
        {next ? (
          <motion.span whileHover={{ x: 3 }} className="inline-flex">
            <Link
              to={`/learn/${next.part.id}/${next.lesson.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {next.lesson.title}
              <ArrowRight size={15} />
            </Link>
          </motion.span>
        ) : (
          <span />
        )}
      </div>
    </motion.article>
  )
}
