import CodeSandbox from '../components/CodeSandbox'

export default function WhatIsJsx() {
  return (
    <>
      <p>
        <strong>JSX</strong> is a special way of writing HTML-like code directly inside your
        JavaScript. It looks like HTML, but it's actually JavaScript in disguise!
      </p>

      <CodeSandbox
        code={`function Example() {
  return <h1>Hello, world!</h1>;
}

render(<Example />);`}
      />

      <p>
        That <code>&lt;h1&gt;Hello, world!&lt;/h1&gt;</code> isn't a string — it's JSX, and
        React turns it into a real HTML element on the page.
      </p>

      <h2>Mixing JavaScript into JSX</h2>
      <p>
        The superpower of JSX is that you can drop JavaScript right in the middle using
        curly braces <code>{'{ }'}</code>:
      </p>
      <CodeSandbox
        code={`function Example() {
  const dog = "Buddy";
  return <h1>Hello, {dog}!</h1>;
}

render(<Example />);`}
      />

      <p>Anything inside curly braces is treated as real JavaScript — math works too!</p>
      <CodeSandbox
        code={`function Example() {
  return <p>2 + 2 equals {2 + 2}</p>;
}

render(<Example />);`}
      />

      <h2>One rule to remember</h2>
      <p>
        A component can only return <em>one</em> top-level element. If you need multiple
        elements, wrap them in a single parent, like a <code>&lt;div&gt;</code>:
      </p>
      <CodeSandbox
        code={`function Example() {
  return (
    <div>
      <h1>Title</h1>
      <p>Some text below it.</p>
    </div>
  );
}

render(<Example />);`}
      />
    </>
  )
}
