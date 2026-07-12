import CodeSandbox from '../components/CodeSandbox'

export default function Destructuring() {
  return (
    <>
      <p>
        <strong>Destructuring</strong> is a shortcut for pulling values out of an array or
        object and putting them straight into variables — like unpacking a lunchbox instead
        of reaching into it every single time.
      </p>

      <h2>Destructuring an object</h2>
      <p>Without destructuring, you'd write:</p>
      <CodeSandbox
        code={`function Example() {
  const robot = { name: "Rex", power: "laser eyes" };
  const name = robot.name;
  const power = robot.power;
  return <p>{name} has {power}</p>;
}

render(<Example />);`}
      />

      <p>With destructuring, you grab both at once using curly braces:</p>
      <CodeSandbox
        code={`function Example() {
  const robot = { name: "Rex", power: "laser eyes" };
  const { name, power } = robot;
  return <p>{name} has {power}</p>;
}

render(<Example />);`}
      />

      <h2>Destructuring an array</h2>
      <p>
        Arrays use square brackets instead, and grab items in order. You've actually already
        seen this with <code>useState</code>!
      </p>
      <CodeSandbox
        code={`function Example() {
  const colors = ["red", "green", "blue"];
  const [first, second] = colors;
  return <p>First: {first}, Second: {second}</p>;
}

render(<Example />);`}
      />

      <h2>Destructuring props</h2>
      <p>
        This is the most common place you'll see destructuring in React — right inside a
        component's parameters:
      </p>
      <CodeSandbox
        code={`function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}

function Example() {
  return <Greeting name="Ava" />;
}

render(<Example />);`}
      />

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
          target="_blank"
          rel="noreferrer"
        >
          MDN: Destructuring assignment
        </a>
      </blockquote>
    </>
  )
}
