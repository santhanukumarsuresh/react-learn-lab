import CodeSandbox from '../components/CodeSandbox'

export default function JsxExpressions() {
  return (
    <>
      <p>
        You already saw that curly braces <code>{'{ }'}</code> let you drop JavaScript into
        JSX. Let's dig into exactly what you're allowed to put inside them.
      </p>

      <h2>Variables</h2>
      <CodeSandbox
        code={`function Example() {
  const score = 87;
  return <p>Your score: {score}</p>;
}

render(<Example />);`}
      />

      <h2>Function calls</h2>
      <CodeSandbox
        code={`function shout(text) {
  return text.toUpperCase() + "!";
}

function Example() {
  return <p>{shout("we did it")}</p>;
}

render(<Example />);`}
      />

      <h2>Ternaries (a mini if/else)</h2>
      <p>
        Curly braces can only hold an <em>expression</em> — something that produces a value —
        not a full <code>if</code> statement. For simple either/or logic, use a{' '}
        <strong>ternary</strong>: <code>condition ? ifTrue : ifFalse</code>
      </p>
      <CodeSandbox
        code={`function Example() {
  const isRaining = true;
  return <p>{isRaining ? "Bring an umbrella! ☔" : "Enjoy the sun! ☀️"}</p>;
}

render(<Example />);`}
      />

      <h2>Showing something only sometimes</h2>
      <p>
        The <code>&&</code> operator is a handy trick to show something only when a
        condition is true, and nothing at all otherwise:
      </p>
      <CodeSandbox
        code={`function Example() {
  const unreadCount = 3;
  return (
    <p>
      Inbox {unreadCount > 0 && <strong>({unreadCount} new)</strong>}
    </p>
  );
}

render(<Example />);`}
      />

      <h2>What you can't do</h2>
      <p>
        You can't put statements like <code>if</code>, <code>for</code>, or variable
        declarations directly inside curly braces — only values. If you need real logic,
        write it above the <code>return</code> statement instead.
      </p>
    </>
  )
}
