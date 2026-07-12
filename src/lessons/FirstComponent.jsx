import CodeSandbox from '../components/CodeSandbox'

export default function FirstComponent() {
  return (
    <>
      <p>
        A <strong>component</strong> is just a JavaScript function that returns some JSX.
        That's it! By convention, component names always start with a capital letter.
      </p>

      <CodeSandbox
        code={`function Welcome() {
  return <h1>Welcome to my app!</h1>;
}

function Example() {
  return <Welcome />;
}

render(<Example />);`}
      />

      <p>
        See how <code>Example</code> uses <code>&lt;Welcome /&gt;</code> just like a regular
        HTML tag? That's the magic of components — once you build one, you can use it
        anywhere, as many times as you like.
      </p>

      <CodeSandbox
        code={`function Star() {
  return <span>⭐</span>;
}

function Example() {
  return (
    <p>
      <Star />
      <Star />
      <Star />
    </p>
  );
}

render(<Example />);`}
      />

      <h2>Why break things into components?</h2>
      <ul>
        <li>Each piece is small and easy to understand on its own.</li>
        <li>You can reuse the same component in many places.</li>
        <li>If you fix a bug in one component, it's fixed everywhere it's used.</li>
      </ul>
    </>
  )
}
