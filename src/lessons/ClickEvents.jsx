import CodeSandbox from '../components/CodeSandbox'

export default function ClickEvents() {
  return (
    <>
      <p>
        Buttons aren't very useful if nothing happens when you click them! React lets you
        run a function whenever something happens on the page — a click, a key press, a
        mouse hover. These are called <strong>events</strong>.
      </p>

      <h2>onClick</h2>
      <p>
        Add an <code>onClick</code> prop to any element and give it a function to run:
      </p>
      <CodeSandbox
        code={`function Example() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}

render(<Example />);`}
      />

      <h2>Inline arrow functions</h2>
      <p>
        For short handlers, it's common to write the function directly inline instead of
        naming it separately:
      </p>
      <CodeSandbox
        code={`function Example() {
  return (
    <button onClick={() => alert("Boom! 💥")}>
      Click me
    </button>
  );
}

render(<Example />);`}
      />

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ Common mistake: writing <code>onClick={'{handleClick()}'}</code> (with
        parentheses) runs the function immediately when the page loads, instead of waiting
        for a click! Always pass the function itself, without calling it:{' '}
        <code>onClick={'{handleClick}'}</code>.
      </div>

      <h2>Combining clicks with state</h2>
      <p>The real power of events shows up when they update state:</p>
      <CodeSandbox
        code={`function Example() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}

render(<Example />);`}
      />
    </>
  )
}
