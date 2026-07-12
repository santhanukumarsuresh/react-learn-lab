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
        That's a complete, working to-do app! Try adding your own tasks and removing them.
        Every big React app is really just lots of small ideas like this one, combined
        together.
      </p>

      <h2>Ideas to try on your own</h2>
      <ul>
        <li>Add a checkbox to mark a task as done (hint: store objects instead of strings)</li>
        <li>Show how many tasks are left</li>
        <li>Save the list to <code>localStorage</code> so it's still there after a refresh</li>
      </ul>

      <p>🎉 Congratulations on making it through the whole course!</p>
    </>
  )
}
