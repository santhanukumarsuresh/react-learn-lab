import CodeSandbox from '../components/CodeSandbox'

export default function ChoosingStateStructure() {
  return (
    <>
      <p>
        Once you're comfortable with <code>useState</code>, the next skill is deciding{' '}
        <em>how to shape</em> your state. A good structure makes bugs rare; a messy one
        invites them. Here are a few rules of thumb that experienced React developers
        follow.
      </p>

      <h2>Rule 1: Group related values that always change together</h2>
      <p>
        If two values always update at the same time, keep them in one object instead of
        two separate <code>useState</code> calls:
      </p>
      <CodeSandbox
        code={`function Example() {
  // 🚫 Two separate pieces of state that move together
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);

  // ✅ One object for a position that always updates as a pair
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function moveRight() {
    setPosition({ x: position.x + 10, y: position.y });
  }

  return (
    <div>
      <p>Position: ({position.x}, {position.y})</p>
      <button onClick={moveRight}>Move right</button>
    </div>
  );
}

render(<Example />);`}
      />

      <h2>Rule 2: Avoid contradictions</h2>
      <p>
        Don't use separate booleans that could accidentally both be true at once, like{' '}
        <code>isLoading</code> and <code>isError</code>. Instead, use one variable that can
        only be one thing at a time:
      </p>
      <CodeSandbox
        code={`function Example() {
  // 🚫 isLoading and isError could both accidentally become true
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  // ✅ status can only ever be one value
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "error" | "success"

  return <p>Status: {status}</p>;
}

render(<Example />);`}
      />

      <h2>Rule 3: Avoid redundant state</h2>
      <p>
        If a value can be calculated from other state you already have, don't store it
        separately — just calculate it during render (remember "You Might Not Need an
        Effect"?):
      </p>
      <CodeSandbox
        code={`function Example() {
  const [items, setItems] = useState(["Apple", "Banana"]);
  // 🚫 No need for a separate "count" piece of state —
  // it would need to be manually kept in sync every time items changes!
  const count = items.length; // ✅ just derive it

  return <p>{count} items</p>;
}

render(<Example />);`}
      />

      <h2>Rule 4: Avoid duplication</h2>
      <p>
        If the same piece of information is stored in two places, they can drift apart and
        disagree. Keep a single source of truth, and reference it — don't copy it.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/choosing-the-state-structure" target="_blank" rel="noreferrer">
          react.dev: Choosing the State Structure
        </a>
      </blockquote>
    </>
  )
}
