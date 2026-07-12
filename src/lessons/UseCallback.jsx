import CodeSandbox from '../components/CodeSandbox'

export default function UseCallback() {
  return (
    <>
      <p>
        <code>useCallback</code> is <code>useMemo</code>'s sibling — but instead of
        caching a <em>value</em>, it caches a <em>function</em>. That matters because every
        time your component re-renders, any function you define inside it is actually a
        brand-new function, even if the code looks identical.
      </p>

      <h2>Why a "new" function can cause problems</h2>
      <p>
        This matters most when you pass a function down to a child wrapped in{' '}
        <code>React.memo</code> (which skips re-rendering when props haven't changed). If
        the function prop is a new reference every time, <code>memo</code> thinks something
        changed and re-renders anyway:
      </p>
      <CodeSandbox
        code={`const Button = memo(function Button({ onClick, children }) {
  console.log("Rendering button:", children);
  return <button onClick={onClick}>{children}</button>;
});

function Example() {
  const [count, setCount] = useState(0);

  // 🚫 a brand-new function every render, defeating memo()
  const handleClick = () => console.log("Clicked!");

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1 (unrelated)</button>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Click "+1" a few times and watch the console — "Rendering button" logs every time,
        even though the button itself never visually changes.
      </p>

      <h2>The fix: memoize the function itself</h2>
      <CodeSandbox
        code={`const Button = memo(function Button({ onClick, children }) {
  console.log("Rendering button:", children);
  return <button onClick={onClick}>{children}</button>;
});

function Example() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // ✅ same function reference across renders

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1 (unrelated)</button>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Now clicking "+1" doesn't cause <code>Button</code> to re-render — its{' '}
        <code>onClick</code> prop is the exact same function every time, so{' '}
        <code>memo</code> can confidently skip it.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 <code>useCallback(fn, deps)</code> is really just{' '}
        <code>useMemo(() =&gt; fn, deps)</code> — a shortcut for the common case of
        memoizing a function specifically. Like <code>useMemo</code>, only use it when it
        solves a real performance problem, not as a default habit.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useCallback" target="_blank" rel="noreferrer">
          react.dev: useCallback
        </a>
      </blockquote>
    </>
  )
}
