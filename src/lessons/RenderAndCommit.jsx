import CodeSandbox from '../components/CodeSandbox'

export default function RenderAndCommit() {
  return (
    <>
      <p>
        Every time your screen updates, React is quietly doing a little three-step dance:{' '}
        <strong>trigger</strong>, <strong>render</strong>, and <strong>commit</strong>.
        Understanding these steps helps explain a lot of React's behavior.
      </p>

      <h2>Step 1: Trigger</h2>
      <p>
        Something has to kick things off — either the component's very first appearance, or
        a state update from calling a setter like <code>setCount(...)</code>.
      </p>

      <h2>Step 2: Render</h2>
      <p>
        React calls your component function to figure out what the JSX <em>should</em> look
        like now. This step happens entirely in memory — nothing has touched the actual
        screen yet. Think of it like a chef preparing a whole dish in the kitchen before it
        ever reaches the table.
      </p>

      <h2>Step 3: Commit</h2>
      <p>
        Only after rendering finishes does React update the real screen — and it's smart
        about it, changing only the specific parts that are actually different, not
        redrawing everything from scratch.
      </p>

      <h2>Seeing it in action</h2>
      <p>
        Watch the console as you click — you'll see the render step (the function body
        running) happen every time, even though only one number in the middle of the page
        actually changes on screen:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [count, setCount] = useState(0);
  console.log("Rendering... count is", count);

  return (
    <div>
      <p>Unrelated text that never changes</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Even though the whole function re-runs on every click (the render step), React
        compares the new result to the old one and only commits the tiny change — updating
        just the number, not the paragraph above it. This comparison process is often
        called "reconciliation," and it's a big part of why React feels so fast.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/render-and-commit" target="_blank" rel="noreferrer">
          react.dev: Render and Commit
        </a>
      </blockquote>
    </>
  )
}
