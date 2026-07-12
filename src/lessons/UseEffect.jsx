import CodeSandbox from '../components/CodeSandbox'

export default function UseEffect() {
  return (
    <>
      <p>
        Sometimes a component needs to do something that isn't just about drawing the
        screen — like starting a timer, talking to a server, or updating the page's title.
        These are called <strong>side effects</strong>, and React gives us a Hook for them:{' '}
        <code>useEffect</code>.
      </p>

      <h2>A basic effect</h2>
      <p>
        <code>useEffect</code> takes a function, and React runs it after the component
        renders:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("The count is now " + count);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>Open your browser's console to see the message logged every time you click!</p>

      <h2>Controlling when it runs: the dependency array</h2>
      <p>
        Running an effect after <em>every single render</em> is often wasteful. You can tell
        React to only re-run it when certain values change, by passing a{' '}
        <strong>dependency array</strong> as a second argument:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Only runs when count changes: " + count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type here" />
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Typing in the input won't trigger the effect — only clicking the button (which
        changes <code>count</code>) will.
      </p>

      <h2>Three ways to use the dependency array</h2>
      <ul>
        <li>
          <strong>No array</strong> — runs after every render.
        </li>
        <li>
          <strong>Empty array </strong>(<code>[]</code>) — runs only once, right after the
          component first appears.
        </li>
        <li>
          <strong>Array with values</strong> (<code>[count]</code>) — runs whenever any of
          those values change.
        </li>
      </ul>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useEffect" target="_blank" rel="noreferrer">
          react.dev: useEffect
        </a>
      </blockquote>
    </>
  )
}
