import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './components/ThemeProvider'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/react-learn-lab">
      <ThemeProvider>
        {/* reducedMotion="user" disables all framer-motion transforms for
            users with prefers-reduced-motion — accessibility first. */}
        <MotionConfig reducedMotion="user">
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </MotionConfig>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
