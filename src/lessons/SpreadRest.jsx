import CodeSandbox from '../components/CodeSandbox'

export default function SpreadRest() {
  return (
    <>
      <p>
        The three dots <code>...</code> show up a lot in React code. Depending on where you
        use them, they mean one of two opposite things: <strong>spread</strong> (unpack
        everything) or <strong>rest</strong> (gather everything).
      </p>

      <h2>Spread: copy everything out</h2>
      <p>
        Spread takes all the items out of an array or object. It's perfect for making a copy
        with a few changes, without touching the original:
      </p>
      <CodeSandbox
        code={`function Example() {
  const robot = { name: "Rex", power: "laser eyes" };
  const upgradedRobot = { ...robot, power: "super laser eyes" };

  return (
    <p>
      {robot.name} now has {upgradedRobot.power} (original: {robot.power})
    </p>
  );
}

render(<Example />);`}
      />

      <p>Spread works on arrays too — great for adding an item without mutating the original:</p>
      <CodeSandbox
        code={`function Example() {
  const pets = ["Cat", "Dog"];
  const morePets = [...pets, "Parrot"];
  return <p>{morePets.join(", ")}</p>;
}

render(<Example />);`}
      />

      <h2>Rest: gather everything left over</h2>
      <p>
        Rest looks identical but does the opposite — it scoops up whatever's left into a
        single variable. It's often used with props:
      </p>
      <CodeSandbox
        code={`function Button({ label, ...otherProps }) {
  return <button {...otherProps}>{label}</button>;
}

function Example() {
  return <Button label="Click me" onClick={() => alert("Hi!")} />;
}

render(<Example />);`}
      />

      <p>
        Here, <code>label</code> is pulled out on its own, and everything else (like{' '}
        <code>onClick</code>) is gathered into <code>otherProps</code> and passed straight
        through to the real <code>&lt;button&gt;</code>.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
          target="_blank"
          rel="noreferrer"
        >
          MDN: Spread syntax
        </a>
      </blockquote>
    </>
  )
}
