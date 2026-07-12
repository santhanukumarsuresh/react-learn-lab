import CodeSandbox from '../components/CodeSandbox'

export default function MiniProject() {
  return (
    <>
      <p>
        You've learned components, props, state, events, and hooks — that's everything you
        need to build a real app! Let's put it all together and build a working to-do list.
      </p>

      <h2>What we're building</h2>
      <ul>
        <li>A text box to type a new task</li>
        <li>A button to add it to the list</li>
        <li>A list of tasks, each with a button to remove it</li>
      </ul>

      <h2>Step 1: remember the list</h2>
      <p>
        We'll keep the whole list of tasks in one piece of state — an array of strings:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [tasks, setTasks] = useState(["Feed the cat", "Do homework"]);

  return (
    <ul>
      {tasks.map((task, i) => (
        <li key={i}>{task}</li>
      ))}
    </ul>
  );
}

render(<Example />);`}
      />

      <h2>Step 2: add the input and a way to add tasks</h2>
      <p>
        We add a second piece of state for whatever's currently typed in the box, then use
        spread syntax to add it to the list without mutating the original array:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [tasks, setTasks] = useState(["Feed the cat"]);
  const [text, setText] = useState("");

  function addTask() {
    if (text.trim() === "") return;
    setTasks([...tasks, text]);
    setText("");
  }

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />

      <h2>Step 3: let people remove a task</h2>
      <p>
        To remove one item, we build a new array that keeps everything{' '}
        <em>except</em> the task we clicked, using <code>.filter()</code>:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [tasks, setTasks] = useState(["Feed the cat", "Do homework", "Walk the dog"]);
  const [text, setText] = useState("");

  function addTask() {
    if (text.trim() === "") return;
    setTasks([...tasks, text]);
    setText("");
  }

  function removeTask(indexToRemove) {
    setTasks(tasks.filter((_, i) => i !== indexToRemove));
  }

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task}{" "}
            <button onClick={() => removeTask(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        That's already a complete, working to-do app! Let's keep going and add three more
        real features: marking tasks done, showing how many are left, and remembering
        everything after a refresh.
      </p>

      <h2>Step 4: mark a task as done</h2>
      <p>
        To track whether each task is done, a plain string isn't enough — we need to
        upgrade each task to an <strong>object</strong> with a <code>text</code> and a{' '}
        <code>done</code> flag. Toggling done follows the same "map and replace one item"
        pattern you learned in Updating Arrays in State:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Feed the cat", done: false },
    { id: 2, text: "Do homework", done: false },
    { id: 3, text: "Walk the dog", done: true },
  ]);
  const [text, setText] = useState("");

  function addTask() {
    if (text.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              {task.done ? <s>{task.text}</s> : task.text}
            </label>{" "}
            <button onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Notice we switched from using the array index as a key to a real{' '}
        <code>id</code> — exactly the lesson from Rendering Lists. Now that tasks can be
        checked, reordering or removing them won't ever mix up the wrong checkbox.
      </p>

      <h2>Step 5: show how many tasks are left</h2>
      <p>
        This is a <em>derived</em> value — it can always be calculated from{' '}
        <code>tasks</code>, so it doesn't need its own <code>useState</code>. Just compute
        it directly during render, exactly like you learned in "You Might Not Need an
        Effect":
      </p>
      <CodeSandbox
        code={`function Example() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Feed the cat", done: false },
    { id: 2, text: "Do homework", done: false },
    { id: 3, text: "Walk the dog", done: true },
  ]);

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  const remaining = tasks.filter((task) => !task.done).length;

  return (
    <div>
      <p>
        {remaining} of {tasks.length} tasks left
      </p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
              {task.done ? <s>{task.text}</s> : task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />

      <h2>Step 6: remember the list after a refresh</h2>
      <p>
        Right now, refreshing the page loses everything — state only lives in memory.{' '}
        <code>localStorage</code> is a small, built-in browser database that survives
        refreshes. We read from it once when the app starts, and write to it with{' '}
        <code>useEffect</code> every time <code>tasks</code> changes:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("demo-tasks");
    return saved ? JSON.parse(saved) : [{ id: 1, text: "Feed the cat", done: false }];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("demo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (text.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task..." />
      <button onClick={addTask}>Add</button>
      <p style={{ fontSize: 12, color: "#64748b" }}>
        Try adding a task, then re-running this sandbox — it remembers!
      </p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        <code>useState(() =&gt; ...)</code> with a function is a small but important
        detail: it only reads from <code>localStorage</code> once, on the very first
        render, instead of on every single re-render.
      </p>

      <h2>The complete app</h2>
      <p>
        Here's everything combined — adding, removing, marking done, a live count, and
        persistence, all together in one finished to-do app:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("final-tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Feed the cat", done: false },
          { id: 2, text: "Do homework", done: false },
        ];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("final-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (text.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  }

  const remaining = tasks.filter((task) => !task.done).length;

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        placeholder="New task..."
      />
      <button onClick={addTask}>Add</button>
      <p>{remaining} of {tasks.length} tasks left</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
              {task.done ? <s>{task.text}</s> : task.text}
            </label>{" "}
            <button onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Every idea in this project — components, props, state, controlled inputs,
        immutable updates, keys, derived values, effects, and persistence — is a skill you
        built up one lesson at a time throughout this course. This is exactly what real
        production React apps are made of, just at a bigger scale.
      </p>

      <p>🎉 Congratulations on making it through the whole course!</p>
    </>
  )
}
