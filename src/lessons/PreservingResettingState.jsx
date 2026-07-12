import CodeSandbox from '../components/CodeSandbox'

export default function PreservingResettingState() {
  return (
    <>
      <p>
        React keeps a component's state alive as long as that component stays in the same
        "spot" in the tree between renders. Sometimes that's exactly what you want —
        sometimes it surprises you. Let's see both.
      </p>

      <h2>State is preserved by default</h2>
      <p>
        Click the button below a few times to bump the counter, then toggle the checkbox.
        Notice the count <em>doesn't</em> reset, even though the surrounding component
        re-rendered:
      </p>
      <CodeSandbox
        code={`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

function Example() {
  const [showExtra, setShowExtra] = useState(false);
  return (
    <div>
      <Counter />
      <label>
        <input
          type="checkbox"
          checked={showExtra}
          onChange={() => setShowExtra(!showExtra)}
        />
        Show extra text
      </label>
      {showExtra && <p>Here's some extra text!</p>}
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        As long as <code>&lt;Counter /&gt;</code> stays in the same position in the tree,
        React treats it as "the same component" and keeps its state — even though{' '}
        <code>Example</code> re-rendered around it.
      </p>

      <h2>Forcing a reset with key</h2>
      <p>
        Sometimes you <em>want</em> a fresh start — like when switching between two
        different users' profile forms. Giving a component a different <code>key</code>{' '}
        tells React "treat this as a completely different component," which resets its
        state:
      </p>
      <CodeSandbox
        code={`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

function Example() {
  const [person, setPerson] = useState("Ava");

  return (
    <div>
      <button onClick={() => setPerson(person === "Ava" ? "Leo" : "Ava")}>
        Switch to {person === "Ava" ? "Leo" : "Ava"}
      </button>
      <p>Counter for: {person}</p>
      <Counter key={person} />
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Try bumping the count, then switching people — this time the counter resets to 0,
        because <code>key={'{person}'}</code> changes, and React throws away the old
        component and mounts a brand-new one in its place.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/preserving-and-resetting-state"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Preserving and Resetting State
        </a>
      </blockquote>
    </>
  )
}
