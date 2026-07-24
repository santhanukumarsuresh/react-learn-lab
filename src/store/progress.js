import { create } from 'zustand'

// Same key + JSON-array format the old ProgressContext used, so every
// learner's saved progress survives the revamp untouched.
const STORAGE_KEY = 'react-learn-lab:completed-lessons'

function loadCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function save(completed) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
  } catch {
    /* ignore */
  }
}

export const useProgressStore = create((set, get) => ({
  completed: loadCompleted(),

  markComplete: (partId, slug) => {
    const next = new Set(get().completed).add(`${partId}/${slug}`)
    save(next)
    set({ completed: next })
  },

  toggleComplete: (partId, slug) => {
    const key = `${partId}/${slug}`
    const next = new Set(get().completed)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    save(next)
    set({ completed: next })
  },
}))

// Drop-in replacement for the old context hook — same shape, no provider needed.
export function useProgress() {
  const completed = useProgressStore((s) => s.completed)
  const markComplete = useProgressStore((s) => s.markComplete)
  const toggleComplete = useProgressStore((s) => s.toggleComplete)
  const isComplete = (partId, slug) => completed.has(`${partId}/${slug}`)
  return { completed, isComplete, markComplete, toggleComplete }
}
