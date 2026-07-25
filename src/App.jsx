import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import HomePage from './pages/HomePage'
import LessonPage from './pages/LessonPage'
import NotFoundPage from './pages/NotFoundPage'
import { pageTransition } from './lib/motion-presets'
import { useLenis } from './lib/useLenis'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { wrapperRef, lenisRef } = useLenis()

  // New page → back to the top of the scroll container (instantly, so the
  // page-transition animation isn't fighting a scroll animation).
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else wrapperRef.current?.scrollTo({ top: 0 })
  }, [location.pathname, lenisRef, wrapperRef])

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div ref={wrapperRef} className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="flex min-h-full flex-col">
          <Topbar onMenuClick={() => setMenuOpen(true)} />
          <main className="flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={location.pathname} {...pageTransition}>
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/learn/:partId/:lessonSlug" element={<LessonPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
