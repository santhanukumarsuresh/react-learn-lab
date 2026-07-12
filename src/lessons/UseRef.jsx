import CodeSandbox from '../components/CodeSandbox'

export default function UseRef() {
  return (
    <>
      <p>
        Sometimes you need to remember a value between renders, but you don't want changing
        it to trigger a re-render — like tracking how many times a button was clicked
        without needing that number on screen, or reaching directly into the DOM to focus an
        input. That's exactly what <code>useRef</code> is for.
      </p>

      <h2>useState vs. useRef</h2>
      <ul>
        <li>
          <code>useState</code> — changing it re-renders the component, and the new value
          shows up on screen.
        </li>
        <li>
          <code>useRef</code> — changing it does <em>not</em> re-render anything. It's a
          plain box that just remembers a value.
        </li>
      </ul>

      <h2>A counter that doesn't re-render</h2>
      <p>
        Watch what happens: clicking the button changes <code>ref.current</code>, but the
        number on screen never updates by itself — because nothing tells React to
        re-render:
      </p>
      <CodeSandbox
        code={`function Example() {
  const clickCount = useRef(0);

  function handleClick() {
    clickCount.current = clickCount.current + 1;
    alert("You've clicked " + clickCount.current + " times (check the alert, not the page!)");
  }

  return <button onClick={handleClick}>Click me</button>;
}

render(<Example />);`}
      />
      <p>
        A ref's <code>.current</code> value updates instantly and stays remembered, but it's
        invisible to React's rendering system — perfect for values you need to track but
        never need to display directly.
      </p>

      <h2>Reaching into the DOM: focusing an input</h2>
      <p>
        The other big use for refs is grabbing a direct reference to a real DOM element,
        so you can do things React doesn't have a prop for — like manually focusing an
        input:
      </p>
      <CodeSandbox
        code={`function Example() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Passing <code>inputRef</code> to the input's <code>ref</code> prop tells React
        "store the real DOM node here." Once it's attached, <code>inputRef.current</code> is
        the actual <code>&lt;input&gt;</code> element, with all its regular browser methods
        like <code>.focus()</code>.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/referencing-values-with-refs" target="_blank" rel="noreferrer">
          react.dev: Referencing Values with Refs
        </a>
      </blockquote>
    </>
  )
}
