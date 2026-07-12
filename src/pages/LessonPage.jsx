import { Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Construction } from 'lucide-react'
import { findLesson, getAdjacentLessons } from '../data/curriculum'
import LessonLayout from '../components/LessonLayout'
import { lessonComponents } from '../lessons/registry'

export default function LessonPage() {
  const { partId, lessonSlug } = useParams()
  const found = findLesson(partId, lessonSlug)

  if (!found) return <Navigate to="/" replace />

  const { part, lesson } = found
  const { prev, next } = getAdjacentLessons(partId, lessonSlug)
  const Content = lessonComponents[lesson.slug]

  return (
    <LessonLayout partId={part.id} part={part} lesson={lesson} prev={prev} next={next}>
      <Suspense fallback={<p>Loading lesson…</p>}>
        {Content ? <Content /> : <ComingSoon title={lesson.title} />}
      </Suspense>
    </LessonLayout>
  )
}

function ComingSoon({ title }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900">
      <Construction className="mx-auto text-slate-400" size={36} />
      <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">
        "{title}" is being written!
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Check back soon, or read ahead on{' '}
        <a
          className="text-sky-600 underline"
          href="https://react.dev/learn"
          target="_blank"
          rel="noreferrer"
        >
          react.dev/learn
        </a>
        .
      </p>
    </div>
  )
}
