import CodeSandbox from '../components/CodeSandbox'

export default function UpdatingArraysInState() {
  return (
    <>
      <p>
        You've already used spread and <code>.filter()</code> to add and remove items from
        state in earlier lessons. Let's collect the full toolkit for working with arrays in
        state — adding, removing, updating, and inserting — all without mutating.
      </p>

      <h2>Adding an item</h2>
      <CodeSandbox
        code={`function Example() {
  const [items, setItems] = useState(["Apple"]);

  function addItem() {
    setItems([...items, "Banana"]); // spread the old items, add the new one
  }

  return (
    <div>
      <p>{items.join(", ")}</p>
      <button onClick={addItem}>Add Banana</button>
    </div>
  );
}

render(<Example />);`}
      />

      <h2>Removing an item</h2>
      <CodeSandbox
        code={`function Example() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  function removeItem(itemToRemove) {
    setItems(items.filter((item) => item !== itemToRemove));
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          {item} <button onClick={() => removeItem(item)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

render(<Example />);`}
      />

      <h2>Updating one item</h2>
      <p>
        Use <code>.map()</code> to build a new array where every item stays the same,
        except the one you're changing:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Feed the cat", done: false },
    { id: 2, text: "Do homework", done: false },
  ]);

  function toggleDone(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input type="checkbox" checked={task.done} onChange={() => toggleDone(task.id)} />
            {task.done ? <s>{task.text}</s> : task.text}
          </label>
        </li>
      ))}
    </ul>
  );
}

render(<Example />);`}
      />

      <h2>Inserting in the middle</h2>
      <p>
        Spread the part before the insert point, add the new item, then spread the rest:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [items, setItems] = useState(["Apple", "Cherry"]);

  function insertBanana() {
    const middle = 1;
    setItems([...items.slice(0, middle), "Banana", ...items.slice(middle)]);
  }

  return (
    <div>
      <p>{items.join(", ")}</p>
      <button onClick={insertBanana}>Insert Banana in the middle</button>
    </div>
  );
}

render(<Example />);`}
      />

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ Avoid array methods that mutate in place: <code>push</code>, <code>pop</code>,{' '}
        <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>sort</code>,
        and <code>reverse</code>. Prefer their non-mutating cousins:{' '}
        <code>[...arr, item]</code>, <code>.filter()</code>, <code>.map()</code>, and{' '}
        <code>.slice()</code>, which all return a brand-new array.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/updating-arrays-in-state" target="_blank" rel="noreferrer">
          react.dev: Updating Arrays in State
        </a>
      </blockquote>
    </>
  )
}
