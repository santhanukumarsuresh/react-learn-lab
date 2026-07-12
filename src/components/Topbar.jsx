import { Link } from 'react-router-dom'

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open menu"
          className="rounded-md p-2 text-slate-300 hover:bg-slate-900 lg:hidden"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-100">
          <span className="text-xl">⚛️</span>
          <span>React Learn Lab</span>
        </Link>
      </div>
      <a
        href="https://react.dev"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-slate-400 hover:text-sky-400"
      >
        Official React Docs ↗
      </a>
    </header>
  )
}
