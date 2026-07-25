import { Component } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import Button from './ui/Button'

/**
 * App-level error boundary so a single broken lesson or route degrades
 * gracefully instead of white-screening the whole course.
 */
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle size={28} />
        </span>
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {String(this.state.error?.message || this.state.error)}
        </p>
        <Button
          onClick={() => {
            this.setState({ error: null })
            window.location.reload()
          }}
        >
          <RotateCcw size={15} />
          Reload the page
        </Button>
      </div>
    )
  }
}
