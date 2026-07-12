import CodeSandbox from '../components/CodeSandbox'

export default function Props() {
  return (
    <>
      <p>
        <strong>Props</strong> (short for "properties") are how you pass information into a
        component — just like passing arguments into a function. They let you reuse the same
        component with different data.
      </p>

      <CodeSandbox
        code={`function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function Example() {
  return (
    <div>
      <Greeting name="Ava" />
      <Greeting name="Leo" />
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Each <code>&lt;Greeting /&gt;</code> gets its own <code>name</code>, so it displays
        something different, even though it's the exact same component!
      </p>

      <h2>A shortcut: destructuring props</h2>
      <p>
        Instead of writing <code>props.name</code> everywhere, most React code
        "destructures" the props right in the function's parameters:
      </p>
      <CodeSandbox
        code={`function Greeting({ name, emoji }) {
  return (
    <h1>
      {emoji} Hello, {name}!
    </h1>
  );
}

function Example() {
  return <Greeting name="Ava" emoji="🎉" />;
}

render(<Example />);`}
      />

      <p>
        Props always flow in one direction: from a parent component down to its children.
        A component can never change its own props — only the parent decides what to pass
        in.
      </p>
    </>
  )
}
