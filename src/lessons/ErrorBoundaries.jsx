import CodeSandbox from '../components/CodeSandbox'

export default function ErrorBoundaries() {
  return (
    <>
      <p>
        If a component throws an error while rendering, React's default behavior is
        drastic: it unmounts the <em>entire</em> app, leaving a blank white screen. An{' '}
        <strong>error boundary</strong> is a special component that catches errors in the
        components below it and shows a fallback UI instead of crashing everything.
      </p>

      <h2>Why this still requires a class component</h2>
      <p>
        As of today, React only supports error boundaries as class components — there's no{' '}
        <code>useErrorBoundary</code> Hook (yet). It's one of the few remaining places
        class components are unavoidable, using two special lifecycle methods:{' '}
        <code>static getDerivedStateFromError</code> and <code>componentDidCatch</code>.
      </p>

      <h2>Building an error boundary</h2>
      <CodeSandbox
        code={`class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // update state so the next render shows the fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // log the error somewhere, e.g. an error-tracking service
    console.log("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p style={{ color: "red" }}>⚠️ Something went wrong in this section.</p>;
    }
    return this.props.children;
  }
}

function BuggyCounter() {
  const [count, setCount] = useState(0);

  if (count === 3) {
    throw new Error("I crash at 3!");
  }

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

function Example() {
  return (
    <div>
      <p>Click the button 3 times to trigger a crash:</p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <p>This text is outside the boundary, and stays alive either way.</p>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Click to 3 and watch <code>BuggyCounter</code> get replaced by the fallback message
        — while the surrounding text keeps working perfectly. Without the boundary, that
        error would have taken down the whole page.
      </p>

      <h2>Where to place boundaries</h2>
      <p>
        You don't need just one giant boundary around your whole app (though that's a good
        safety net too). Wrapping boundaries around independent sections — a sidebar, a
        chart widget, a comments section — means one broken feature doesn't take the rest
        of the page down with it.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ Error boundaries only catch errors during <strong>rendering</strong>, in
        lifecycle methods, and in constructors of the tree below them. They do{' '}
        <em>not</em> catch errors inside event handlers (use a regular{' '}
        <code>try/catch</code> there), async code, or server-side rendering.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Catching rendering errors with an error boundary
        </a>
      </blockquote>
    </>
  )
}
