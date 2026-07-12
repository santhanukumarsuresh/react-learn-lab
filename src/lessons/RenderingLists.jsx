import CodeSandbox from '../components/CodeSandbox'

export default function RenderingLists() {
  return (
    <>
      <p>
        You've already used <code>.map()</code> a few times to turn an array of data into a
        list of JSX elements. Let's slow down and look at exactly how it works, and why that{' '}
        <code>key</code> prop matters so much.
      </p>

      <h2>The basic pattern</h2>
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

      <p>
        <code>.map()</code> runs your function once per item and collects the results into a
        new array — in this case, an array of <code>&lt;li&gt;</code> elements, which React
        knows how to display as a list.
      </p>

      <h2>Why every item needs a key</h2>
      <p>
        React uses <code>key</code> to tell items apart between renders — it's how React
        knows "this row moved" instead of "this row was deleted and a new one appeared."
        Without stable keys, React can mix up which item is which when the list changes.
      </p>

      <h2>Rendering a list of objects</h2>
      <p>
        Real data is usually an array of objects, each with a unique id — use that id as
        the key, not the array index:
      </p>
      <CodeSandbox
        code={`function Example() {
  const students = [
    { id: "s1", name: "Ava", grade: 5 },
    { id: "s2", name: "Leo", grade: 4 },
    { id: "s3", name: "Mia", grade: 5 },
  ];

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          {student.name} — Grade {student.grade}
        </li>
      ))}
    </ul>
  );
}

render(<Example />);`}
      />

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ Avoid using the array index as a key if the list can be reordered, filtered, or
        have items added/removed in the middle — React can confuse which item is which,
        causing weird bugs like inputs keeping the wrong value. A stable id from your data
        is always safer.
      </div>

      <h2>Filtering before mapping</h2>
      <p>Since arrays chain nicely, you can filter first and then map the results:</p>
      <CodeSandbox
        code={`function Example() {
  const students = [
    { id: "s1", name: "Ava", grade: 5 },
    { id: "s2", name: "Leo", grade: 4 },
    { id: "s3", name: "Mia", grade: 5 },
  ];

  return (
    <ul>
      {students
        .filter((s) => s.grade === 5)
        .map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
    </ul>
  );
}

render(<Example />);`}
      />

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/rendering-lists" target="_blank" rel="noreferrer">
          react.dev: Rendering Lists
        </a>
      </blockquote>
    </>
  )
}
