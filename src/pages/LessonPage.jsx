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
    <div className="rounded-xl border border-dashed border-border bg-muted p-8 text-center">
      <Construction className="mx-auto text-muted-foreground" size={36} />
      <p className="mt-3 font-semibold">"{title}" is being written!</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Check back soon, or read ahead on{' '}
        <a
          className="text-primary underline"
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
