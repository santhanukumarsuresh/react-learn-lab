import CodeSandbox from '../components/CodeSandbox'

export default function ReactMemoLesson() {
  return (
    <>
      <p>
        You've used <code>useMemo</code> and <code>useCallback</code> to memoize values and
        functions <em>inside</em> a component. <code>React.memo</code> does the equivalent
        thing to an entire <em>component</em>: it skips re-rendering it entirely if its
        props haven't changed since last time.
      </p>

      <h2>How React decides to re-render, by default</h2>
      <p>
        Without <code>memo</code>, when a parent re-renders, <strong>every</strong> child
        component re-renders too — regardless of whether its own props actually changed.
        For cheap components this is invisible, but for expensive ones (heavy computed
        JSX, large lists, charts), it adds up.
      </p>

      <h2>Wrapping a component in memo</h2>
      <CodeSandbox
        code={`const ExpensiveRow = memo(function ExpensiveRow({ label }) {
  console.log("Rendering row:", label);
  // imagine something expensive happening here
  return <li>{label}</li>;
});

function Example() {
  const [count, setCount] = useState(0);
  const items = ["Alpha", "Beta", "Gamma"];

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Unrelated re-render ({count})</button>
      <ul>
        {items.map((item) => (
          <ExpensiveRow key={item} label={item} />
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Click the button and watch the console — after the first render, the rows stop
        logging. <code>memo</code> does a shallow comparison of each prop between renders;
        since <code>label</code> never changes, it skips re-rendering that row entirely,
        even though the parent re-renders on every click.
      </p>

      <h2>The trap: props that "look" the same but aren't</h2>
      <p>
        <code>memo</code>'s comparison is shallow — it checks <code>===</code> on each
        prop. Objects, arrays, and inline functions are recreated every render by default,
        so they'll never be <code>===</code> to the previous render's version, silently
        defeating <code>memo</code>:
      </p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`// 🚫 defeats memo — a new object every render
<ExpensiveChart config={{ color: "blue" }} />

// 🚫 defeats memo — a new function every render
<ExpensiveRow onClick={() => doSomething()} />

// ✅ stable references — memo can actually help
const config = useMemo(() => ({ color: "blue" }), []);
const handleClick = useCallback(() => doSomething(), []);
<ExpensiveChart config={config} />
<ExpensiveRow onClick={handleClick} />`}</code>
      </pre>
      <p>
        This is exactly why <code>useMemo</code> and <code>useCallback</code> exist — they
        keep object/function props referentially stable so that wrapping a child in{' '}
        <code>memo</code> actually pays off.
      </p>

      <h2>Custom comparison</h2>
      <p>
        <code>memo</code> accepts an optional second argument for custom comparison logic,
        for the rare case where shallow comparison isn't precise enough:
      </p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`const Row = memo(RowComponent, (prevProps, nextProps) => {
  // return true if you want to SKIP re-rendering (props are "equal")
  return prevProps.item.id === nextProps.item.id && prevProps.item.done === nextProps.item.done;
});`}</code>
      </pre>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ Don't wrap everything in <code>memo</code> "just in case." The comparison itself
        has a cost, and most components are cheap enough that re-rendering them is faster
        than the memoization overhead. Profile first (React DevTools' Profiler tab), then
        memoize the components that are actually measurably expensive.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/memo" target="_blank" rel="noreferrer">
          react.dev: memo
        </a>
      </blockquote>
    </>
  )
}
