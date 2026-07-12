import CodeSandbox from '../components/CodeSandbox'

export default function UseState() {
  return (
    <>
      <p>
        So far, every value in our examples has been "frozen" — it never changes while the
        page is running. But real apps need to remember things: how many likes a post has,
        whether a menu is open, what you typed in a search box.
      </p>

      <p>
        React gives us a special tool for this called <code>useState</code>. It's a{' '}
        <strong>Hook</strong> — a special function that starts with "use" and lets your
        component tap into React's features.
      </p>

      <h2>A counter that remembers</h2>
      <p>Click the button below and watch the number change — try editing the code too!</p>
      <CodeSandbox
        code={`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
}

render(<Counter />);`}
      />

      <h2>How to read useState</h2>
      <p>
        <code>useState(0)</code> creates a piece of state that starts at <code>0</code>. It
        gives back two things in an array:
      </p>
      <ul>
        <li>
          <code>count</code> — the current value (like reading the box)
        </li>
        <li>
          <code>setCount</code> — a function to change the value (like replacing what's in
          the box)
        </li>
      </ul>

      <p>
        Whenever you call <code>setCount</code>, React automatically re-runs your component
        and updates the screen with the new value. You never have to manually touch the HTML
        — React does that for you!
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useState" target="_blank" rel="noreferrer">
          react.dev: useState
        </a>
      </blockquote>
    </>
  )
}
