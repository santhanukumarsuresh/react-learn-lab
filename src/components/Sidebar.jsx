import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { curriculum, totalLessons } from '../data/curriculum'
import { useProgress } from '../data/useProgress'

export default function Sidebar({ open, onClose }) {
  const { partId } = useParams()
  const { completed, isComplete } = useProgress()
  const [collapsed, setCollapsed] = useState({})

  const toggle = (id) => setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  const percent = totalLessons ? Math.round((completed.size / totalLessons) * 100) : 0

  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950 p-4 transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 rounded-lg bg-slate-900 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-200">📘 Your Progress</p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {completed.size} / {totalLessons} lessons complete
          </p>
        </div>

        <nav className="space-y-1">
          {curriculum.map((part) => {
            const isOpenPart = collapsed[part.id] !== true
            const isActivePart = part.id === partId
            return (
              <div key={part.id}>
                <button
                  onClick={() => toggle(part.id)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold ${
                    isActivePart ? 'text-sky-400' : 'text-slate-200'
                  } hover:bg-slate-900`}
                >
                  <span>
                    {part.icon} {part.title}
                  </span>
                  <span className="text-slate-500">{isOpenPart ? '▾' : '▸'}</span>
                </button>
                {isOpenPart && (
                  <ul className="ml-3 border-l border-slate-800 pl-3">
                    {part.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <NavLink
                          to={`/learn/${part.id}/${lesson.slug}`}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                              isActive
                                ? 'bg-sky-500/10 font-medium text-sky-400'
                                : 'text-slate-400 hover:text-slate-200'
                            }`
                          }
                        >
                          <span className="w-4 shrink-0 text-center">
                            {isComplete(part.id, lesson.slug) ? '✓' : ''}
                          </span>
                          <span className={!lesson.ready ? 'italic text-slate-500' : ''}>
                            {lesson.title}
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
