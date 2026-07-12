import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'react-learn-lab:completed-lessons'

function loadCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState(loadCompleted)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
  }, [completed])

  const isComplete = useCallback(
    (partId, slug) => completed.has(`${partId}/${slug}`),
    [completed]
  )

  const markComplete = useCallback((partId, slug) => {
    setCompleted((prev) => new Set(prev).add(`${partId}/${slug}`))
  }, [])

  const toggleComplete = useCallback((partId, slug) => {
    setCompleted((prev) => {
      const key = `${partId}/${slug}`
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  return { completed, isComplete, markComplete, toggleComplete }
}
