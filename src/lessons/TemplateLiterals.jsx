import CodeSandbox from '../components/CodeSandbox'

export default function TemplateLiterals() {
  return (
    <>
      <p>
        So far we've built strings by gluing pieces together with <code>+</code>, like{' '}
        <code>"Hi, " + name + "!"</code>. It works, but it gets messy fast.{' '}
        <strong>Template literals</strong> are a cleaner way to build strings, using backtick
        characters <code>`</code> instead of quotes.
      </p>

      <h2>Dropping variables straight in</h2>
      <p>
        Inside backticks, you can drop any JavaScript value directly into the string using{' '}
        <code>${'{ }'}</code> — no more <code>+</code> signs:
      </p>
      <CodeSandbox
        code={`function Example() {
  const name = "Maya";
  const oldWay = "Hi, " + name + "!";
  const newWay = \`Hi, \${name}!\`;

  return (
    <p>
      Old way: {oldWay} — New way: {newWay}
    </p>
  );
}

render(<Example />);`}
      />

      <h2>Math and expressions work too</h2>
      <CodeSandbox
        code={`function Example() {
  const price = 8;
  const quantity = 3;

  return <p>{\`Total: $\${price * quantity}\`}</p>;
}

render(<Example />);`}
      />

      <h2>Multi-line strings</h2>
      <p>
        Template literals can also span multiple lines without any special tricks — try
        that with regular quotes and you'll get an error!
      </p>
      <CodeSandbox
        code={`function Example() {
  const poem = \`Roses are red,
Violets are blue,
React is fun,
And so are you!\`;

  return <p style={{ whiteSpace: "pre-line" }}>{poem}</p>;
}

render(<Example />);`}
      />

      <p>
        You'll see template literals everywhere in React code — especially for building
        dynamic class names, URLs, and messages that mix text with variables.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals"
          target="_blank"
          rel="noreferrer"
        >
          MDN: Template literals
        </a>
      </blockquote>
    </>
  )
}
