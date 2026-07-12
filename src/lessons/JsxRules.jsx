import CodeSandbox from '../components/CodeSandbox'
import CodeBlock from '../components/CodeBlock'

export default function JsxRules() {
  return (
    <>
      <p>
        JSX looks like HTML, but under the hood it's turned into JavaScript, which means it
        plays by a few extra rules that plain HTML doesn't have.
      </p>

      <h2>1. One root element</h2>
      <p>A component must return a single element. This will cause an error:</p>
      <CodeBlock>{`// ❌ Two elements side by side — not allowed
return (
  <h1>Title</h1>
  <p>Some text</p>
);`}</CodeBlock>
      <p>
        Fix it by wrapping them in a parent, like a <code>&lt;div&gt;</code>, or an empty{' '}
        <strong>Fragment</strong> (<code>&lt;&gt;...&lt;/&gt;</code>) when you don't want an
        extra element in the page:
      </p>
      <CodeSandbox
        code={`function Example() {
  return (
    <>
      <h1>Title</h1>
      <p>Some text</p>
    </>
  );
}

render(<Example />);`}
      />

      <h2>2. Every tag must close</h2>
      <p>
        Tags like <code>&lt;img&gt;</code> or <code>&lt;input&gt;</code> that don't wrap
        anything must self-close with a slash:
      </p>
      <CodeBlock>{`<img src="cat.png" />
<input type="text" />`}</CodeBlock>

      <h2>3. className, not class</h2>
      <p>
        Since <code>class</code> is a reserved word in JavaScript, JSX uses{' '}
        <code>className</code> instead:
      </p>
      <CodeSandbox
        code={`function Example() {
  return <p className="highlight">Styled text</p>;
}

render(<Example />);`}
      />

      <h2>4. Attributes use camelCase</h2>
      <p>
        HTML attributes like <code>onclick</code> or <code>tabindex</code> become{' '}
        <code>onClick</code> and <code>tabIndex</code> in JSX — each word after the first
        starts with a capital letter.
      </p>

      <h2>5. Lists need a key</h2>
      <p>
        When you render a list with <code>.map()</code>, each item needs a unique{' '}
        <code>key</code> prop so React can keep track of it:
      </p>
      <CodeSandbox
        code={`function Example() {
  const fruits = ["Apple", "Banana", "Cherry"];
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

render(<Example />);`}
      />
    </>
  )
}
