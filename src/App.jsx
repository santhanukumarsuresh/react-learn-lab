import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import HomePage from './pages/HomePage'
import LessonPage from './pages/LessonPage'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Topbar onMenuClick={() => setMenuOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn/:partId/:lessonSlug" element={<LessonPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
