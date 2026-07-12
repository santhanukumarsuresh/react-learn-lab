import CodeSandbox from '../components/CodeSandbox'

export default function UseMemo() {
  return (
    <>
      <p>
        Some calculations are expensive — sorting a huge list, crunching numbers, filtering
        thousands of items. Normally, your whole component function re-runs on every
        render, redoing that expensive work even when the result wouldn't have changed.{' '}
        <code>useMemo</code> lets you cache ("memoize") the result and skip the recalculation
        when nothing relevant changed.
      </p>

      <h2>The problem: repeating expensive work for no reason</h2>
      <p>
        Click the button below — notice the console logs "Sorting..." every single time,
        even though we're only toggling the theme, not touching the list:
      </p>
      <CodeSandbox
        code={`function slowSort(items) {
  console.log("Sorting...");
  return [...items].sort();
}

function Example() {
  const [isDark, setIsDark] = useState(false);
  const names = ["Zoe", "Ava", "Mia", "Leo"];
  const sorted = slowSort(names); // 🚫 re-sorts on every render, even theme toggles

  return (
    <div style={{ background: isDark ? "#1e293b" : "white", color: isDark ? "white" : "black", padding: 8 }}>
      <p>{sorted.join(", ")}</p>
      <button onClick={() => setIsDark(!isDark)}>Toggle theme</button>
    </div>
  );
}

render(<Example />);`}
      />

      <h2>The fix: only re-sort when the list actually changes</h2>
      <CodeSandbox
        code={`function slowSort(items) {
  console.log("Sorting...");
  return [...items].sort();
}

function Example() {
  const [isDark, setIsDark] = useState(false);
  const names = ["Zoe", "Ava", "Mia", "Leo"];
  const sorted = useMemo(() => slowSort(names), [names]); // ✅ cached

  return (
    <div style={{ background: isDark ? "#1e293b" : "white", color: isDark ? "white" : "black", padding: 8 }}>
      <p>{sorted.join(", ")}</p>
      <button onClick={() => setIsDark(!isDark)}>Toggle theme</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        <code>useMemo(calculateValue, dependencies)</code> only re-runs{' '}
        <code>calculateValue</code> when something in the dependency array changes. On every
        other render, it just hands back the value it cached last time.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 Don't reach for <code>useMemo</code> everywhere — it has its own small cost, and
        most calculations are cheap enough that React handles them instantly. Save it for
        calculations that are genuinely slow (sorting/filtering large lists, heavy math) or
        for keeping object/array references stable for other optimizations like{' '}
        <code>React.memo</code>.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useMemo" target="_blank" rel="noreferrer">
          react.dev: useMemo
        </a>
      </blockquote>
    </>
  )
}
