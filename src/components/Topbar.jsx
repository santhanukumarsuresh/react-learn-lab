import { Link } from 'react-router-dom'
import { Menu, Atom, ExternalLink, Sun, Moon } from 'lucide-react'
import { useTheme } from '../data/useTheme'

export default function Topbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open menu"
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
          <Atom size={22} className="text-sky-500" />
          <span>React Learn Lab</span>
        </Link>
      </div>
      <div className="flex items-center gap-1 sm:gap-3">
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1 text-sm text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 sm:flex"
        >
          Official React Docs
          <ExternalLink size={13} />
        </a>
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
