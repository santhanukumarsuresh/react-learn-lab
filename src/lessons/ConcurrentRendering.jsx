import CodeSandbox from '../components/CodeSandbox'

export default function ConcurrentRendering() {
  return (
    <>
      <p>
        You've already used <code>useTransition</code> and <code>useDeferredValue</code> —
        both are applications of a bigger architectural shift in React called{' '}
        <strong>concurrent rendering</strong>. Let's go deeper into what's actually
        happening under the hood.
      </p>

      <h2>Before: synchronous, all-or-nothing rendering</h2>
      <p>
        In older React, once rendering started, it ran to completion, blocking the main
        thread the entire time. A render triggered by a big state change had to finish
        entirely before the browser could do anything else — including responding to a
        keystroke or a click.
      </p>

      <h2>Now: interruptible rendering</h2>
      <p>
        With concurrent rendering, React can start preparing a render, pause partway
        through if something more urgent comes in (like a keystroke), handle the urgent
        work first, and then either resume or restart the paused render. Critically: React
        never shows the user a half-finished render — from the outside, updates still
        appear to happen atomically, just with smarter internal scheduling.
      </p>

      <h2>Priority, not just "fast" vs "slow"</h2>
      <p>
        Concurrent React assigns different priority levels to different kinds of updates:
      </p>
      <ul>
        <li>
          <strong>Discrete events</strong> (clicks, key presses) — highest priority, handled
          essentially synchronously so the UI always feels responsive to direct input.
        </li>
        <li>
          <strong>Transitions</strong> (anything wrapped in <code>startTransition</code>) —
          lower priority, can be interrupted or even thrown away entirely if a newer update
          supersedes it before it finishes.
        </li>
      </ul>

      <h2>A transition can be interrupted and discarded mid-flight</h2>
      <p>
        This is the part that surprises people: React doesn't just delay a transition — it
        can start rendering it, get interrupted by a newer state change, and throw away
        that half-finished work entirely, starting fresh with the latest state instead of
        finishing something already stale:
      </p>
      <CodeSandbox
        code={`function generateResults(query) {
  console.log("Computing results for:", query);
  const all = Array.from({ length: 2000 }, (_, i) => "Result " + i);
  return all.filter((r) => r.includes(query)).length;
}

function Example() {
  const [query, setQuery] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      setResultCount(generateResults(value));
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Type fast..." />
      {isPending && <span> (computing...)</span>}
      <p>{resultCount} matches</p>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Type quickly and watch the console — you'll see multiple "Computing results for"
        logs fire in rapid succession as you type, because each new keystroke can interrupt
        an in-progress transition before it finishes, discarding that stale work in favor of
        computing against your latest input.
      </p>

      <h2>Strict Mode double-rendering: a related concurrent-safety check</h2>
      <p>
        You may have noticed components rendering twice in development under{' '}
        <code>&lt;StrictMode&gt;</code>. This is intentional: it's React proactively
        checking that your components can handle being interrupted and re-rendered safely
        — a property concurrent rendering depends on. If double-rendering causes visible
        bugs (like a counter jumping by 2), it's usually revealing a component that isn't
        "pure" (see the Keeping Components Pure lesson).
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 The deep technical machinery here (fiber trees, work loops, lanes) is internal to
        React and not something you write directly. What matters practically: keep render
        logic pure and side-effect-free, so React is always free to pause, restart, or
        discard a render without breaking your app.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/blog/2022/03/29/react-v18" target="_blank" rel="noreferrer">
          react.dev: React 18 (introducing concurrent features)
        </a>
      </blockquote>
    </>
  )
}
