import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'react-learn-lab:completed-lessons'

function loadCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

const ProgressContext = createContext(null)

// A single shared store for lesson completion, so the sidebar, the progress
// bar, and the lesson page all see the same state the instant it changes —
// not just after a full page reload re-reads localStorage.
export function ProgressProvider({ children }) {
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

  return (
    <ProgressContext.Provider value={{ completed, isComplete, markComplete, toggleComplete }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
