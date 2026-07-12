import CodeSandbox from '../components/CodeSandbox'

export default function Functions() {
  return (
    <>
      <p>
        A <strong>function</strong> is a mini machine: you give it something, it does a job,
        and it can hand something back. Imagine a toaster — you put in bread (the input),
        and you get toast out (the output)!
      </p>

      <h2>A regular function</h2>
      <CodeSandbox
        code={`function greet(name) {
  return "Hello, " + name + "!";
}

function Example() {
  return <p>{greet("Maya")}</p>;
}

render(<Example />);`}
      />

      <h2>Arrow functions</h2>
      <p>
        React code almost always uses a shorter way to write functions, called an{' '}
        <strong>arrow function</strong>. It looks like this:
      </p>
      <CodeSandbox
        code={`const greet = (name) => {
  return "Hello, " + name + "!";
};

function Example() {
  return <p>{greet("Maya")}</p>;
}

render(<Example />);`}
      />

      <p>
        If the function only returns one thing, you can make it even shorter by removing the
        curly braces and the word <code>return</code>:
      </p>
      <CodeSandbox
        code={`const greet = (name) => "Hello, " + name + "!";

function Example() {
  return <p>{greet("Maya")}</p>;
}

render(<Example />);`}
      />

      <p>
        In React, you'll write arrow functions all the time — especially for components and
        for handling clicks!
      </p>
    </>
  )
}
