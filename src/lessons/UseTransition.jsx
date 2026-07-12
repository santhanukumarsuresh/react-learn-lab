import CodeSandbox from '../components/CodeSandbox'

export default function UseTransition() {
  return (
    <>
      <p>
        Not every state update needs to happen instantly. Typing in a search box should feel
        instant — but re-filtering a huge list based on that search can be marked as "not
        urgent," letting React keep the input feeling snappy even while the slower work
        happens in the background. That's what <code>useTransition</code> is for.
      </p>

      <h2>The problem: one slow update blocks everything</h2>
      <p>
        Without a transition, typing a single character can feel laggy if it also triggers
        an expensive re-render — the browser has to finish that expensive work before it can
        show your next keystroke.
      </p>

      <h2>Marking an update as a low-priority "transition"</h2>
      <CodeSandbox
        code={`function generateItems(query) {
  const all = Array.from({ length: 3000 }, (_, i) => "Item " + i);
  return all.filter((item) => item.includes(query));
}

function Example() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(() => generateItems(""));
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value); // ✅ urgent — update the input right away

    startTransition(() => {
      setItems(generateItems(value)); // 🐢 low-priority — can lag behind
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search 3000 items..." />
      {isPending && <p>Updating list...</p>}
      <p>{items.length} matches</p>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        <code>startTransition</code> wraps the expensive state update, telling React "this
        one can wait if something more urgent (like typing) comes in." <code>isPending</code>{' '}
        turns <code>true</code> while that background work is still catching up, so you can
        show a subtle loading hint without freezing the whole UI.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 A transition doesn't make the work itself faster — it just lets React prioritize
        more urgent updates (like typing) ahead of it, so the app stays responsive while the
        slower update finishes in the background.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useTransition" target="_blank" rel="noreferrer">
          react.dev: useTransition
        </a>
      </blockquote>
    </>
  )
}
