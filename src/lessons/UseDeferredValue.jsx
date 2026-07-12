import CodeSandbox from '../components/CodeSandbox'

export default function UseDeferredValue() {
  return (
    <>
      <p>
        <code>useDeferredValue</code> solves a very similar problem to{' '}
        <code>useTransition</code>, but from a different angle: instead of wrapping the
        state <em>update</em>, you wrap the <em>value</em> itself, telling React "it's okay
        if the part of the UI using this value lags a little behind."
      </p>

      <h2>useTransition vs. useDeferredValue</h2>
      <ul>
        <li>
          <strong>useTransition</strong> — use when <em>you</em> control the state update
          (you have a setter you can wrap in <code>startTransition</code>).
        </li>
        <li>
          <strong>useDeferredValue</strong> — use when you're just given a value (like a
          prop) and can't wrap the update yourself, but still want to deprioritize using it.
        </li>
      </ul>

      <h2>Deferring a value</h2>
      <CodeSandbox
        code={`function generateItems(query) {
  const all = Array.from({ length: 3000 }, (_, i) => "Item " + i);
  return all.filter((item) => item.includes(query));
}

function SlowList({ query }) {
  const items = generateItems(query); // pretend this is expensive
  return <p>{items.length} matches for "{query}"</p>;
}

function Example() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <SlowList query={deferredQuery} />
      </div>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        The input always shows exactly what you typed instantly. <code>SlowList</code>,
        though, renders using <code>deferredQuery</code> — a version of the value that's
        allowed to lag a step behind during fast typing, keeping the whole page responsive.
        We dim it slightly with <code>isStale</code> so the user knows it's catching up.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 Like <code>useTransition</code>, this doesn't make anything faster — it changes{' '}
        <em>when</em> the slow work happens, so it doesn't block more urgent updates like
        keystrokes.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useDeferredValue" target="_blank" rel="noreferrer">
          react.dev: useDeferredValue
        </a>
      </blockquote>
    </>
  )
}
