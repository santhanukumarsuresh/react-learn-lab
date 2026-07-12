import CodeSandbox from '../components/CodeSandbox'

export default function Variables() {
  return (
    <>
      <p>
        A <strong>variable</strong> is like a labeled box where you can store a piece of
        information — a number, a word, anything! In modern JavaScript, we create boxes
        using two words: <code>let</code> and <code>const</code>.
      </p>

      <h2>const — a box that can't change</h2>
      <p>
        Use <code>const</code> when the value inside the box should never change, like your
        birthday.
      </p>
      <CodeSandbox
        code={`function Example() {
  const name = "Rex the Robot";
  return <p>My name is {name}!</p>;
}

render(<Example />);`}
      />

      <h2>let — a box that can change</h2>
      <p>
        Use <code>let</code> when the value might change later, like your score in a game.
      </p>
      <CodeSandbox
        code={`function Example() {
  let score = 0;
  score = score + 10;
  return <p>Your score is {score}</p>;
}

render(<Example />);`}
      />

      <h2>Why not var?</h2>
      <p>
        You might see an older keyword called <code>var</code> in old code. Modern React
        code almost always uses <code>let</code> and <code>const</code> instead, because
        they're safer and easier to understand.
      </p>

      <blockquote>
        📚 Read more on the official docs:{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const"
          target="_blank"
          rel="noreferrer"
        >
          MDN: const
        </a>
      </blockquote>
    </>
  )
}
