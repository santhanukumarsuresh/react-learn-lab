import CodeSandbox from '../components/CodeSandbox'

export default function UseImperativeHandle() {
  return (
    <>
      <p>
        You already learned that a <code>ref</code> can grab a real DOM node, like calling{' '}
        <code>.focus()</code> on an input. But what if you're building your own component
        and want to offer a similar, controlled "remote control" to its parent — without
        exposing the entire DOM node? That's exactly what{' '}
        <code>useImperativeHandle</code> is for.
      </p>

      <h2>Custom components don't get a ref by default</h2>
      <p>
        To let a parent attach a ref to your component, you first wrap it in{' '}
        <code>forwardRef</code>. Then <code>useImperativeHandle</code> decides exactly what
        that ref exposes:
      </p>
      <CodeSandbox
        code={`const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    clear() {
      inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} placeholder="I'm a fancy input" />;
});

function Example() {
  const fancyRef = useRef(null);

  return (
    <div>
      <FancyInput ref={fancyRef} />
      <button onClick={() => fancyRef.current.focus()}>Focus</button>
      <button onClick={() => fancyRef.current.clear()}>Clear</button>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Notice the parent's <code>fancyRef.current</code> only has <code>.focus()</code> and{' '}
        <code>.clear()</code> — not the raw DOM node, and not access to{' '}
        <code>inputRef</code> directly. <code>useImperativeHandle</code> lets{' '}
        <code>FancyInput</code> control exactly what its "remote control" can do, keeping
        its internal implementation private.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 This is one of the least-used hooks in everyday React code — most components
        should just communicate through props and callbacks. Reach for{' '}
        <code>useImperativeHandle</code> only when you're building a reusable component
        (like a custom input, modal, or video player) that genuinely needs to expose a few
        specific imperative actions to its parent.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/reference/react/useImperativeHandle"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: useImperativeHandle
        </a>
      </blockquote>
    </>
  )
}
