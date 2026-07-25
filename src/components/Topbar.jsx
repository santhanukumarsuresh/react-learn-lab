import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, Atom, ExternalLink } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import AccentPicker from './AccentPicker'

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/85 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open menu"
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="group flex items-center gap-2 font-bold">
          <motion.span
            whileHover={{ rotate: 180 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
            className="grid place-items-center text-primary"
          >
            <Atom size={22} />
          </motion.span>
          <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent dark:from-brand-light dark:to-brand-teal">
            React Learn Lab
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary sm:flex"
        >
          Official React Docs
          <ExternalLink size={13} />
        </a>
        <AccentPicker />
        <ThemeToggle />
      </div>
    </header>
  )
}
