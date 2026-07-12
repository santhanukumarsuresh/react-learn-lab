import CodeSandbox from '../components/CodeSandbox'

export default function ArraysObjects() {
  return (
    <>
      <p>
        <strong>Arrays</strong> are like a row of lockers, each holding one item, numbered
        starting from 0. <strong>Objects</strong> are like a backpack with labeled pockets —
        each pocket has a name so you know exactly what's inside.
      </p>

      <h2>Arrays: a list of things</h2>
      <CodeSandbox
        code={`function Example() {
  const pets = ["Cat", "Dog", "Parrot"];
  return <p>My first pet was a {pets[0]}</p>;
}

render(<Example />);`}
      />

      <p>
        Notice <code>pets[0]</code> gives the <em>first</em> item, not the second — arrays
        start counting at 0!
      </p>

      <h2>Objects: named information</h2>
      <CodeSandbox
        code={`function Example() {
  const robot = { name: "Rex", power: "laser eyes" };
  return (
    <p>
      {robot.name}'s power is {robot.power}
    </p>
  );
}

render(<Example />);`}
      />

      <h2>Arrays of objects (very common in React!)</h2>
      <CodeSandbox
        code={`function Example() {
  const students = [
    { name: "Ava", grade: 5 },
    { name: "Leo", grade: 4 },
  ];
  return (
    <ul>
      {students.map((s) => (
        <li key={s.name}>
          {s.name} is in grade {s.grade}
        </li>
      ))}
    </ul>
  );
}

render(<Example />);`}
      />

      <p>
        That <code>.map()</code> method is one you'll use constantly in React — it turns a
        list of data into a list of things on screen!
      </p>
    </>
  )
}
