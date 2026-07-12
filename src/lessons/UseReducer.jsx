import CodeSandbox from '../components/CodeSandbox'

export default function UseReducer() {
  return (
    <>
      <p>
        When a component has several pieces of state that all change together in
        complicated ways, juggling a bunch of separate <code>useState</code> calls can get
        messy. <code>useReducer</code> lets you collect all your update logic into one
        place, called a <strong>reducer</strong>.
      </p>

      <h2>The idea: describe "what happened," not "what changes"</h2>
      <p>
        Instead of calling a setter directly, you <strong>dispatch an action</strong> — a
        small object describing what happened, like <code>{'{ type: "incremented" }'}</code>.
        A reducer function decides how state should change in response.
      </p>

      <h2>A counter, rebuilt with useReducer</h2>
      <CodeSandbox
        code={`function counterReducer(state, action) {
  switch (action.type) {
    case "incremented":
      return { count: state.count + 1 };
    case "decremented":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function Example() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "decremented" })}>-1</button>
      <button onClick={() => dispatch({ type: "incremented" })}>+1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        <code>{'useReducer(counterReducer, { count: 0 })'}</code> works a lot like{' '}
        <code>useState</code>: it gives back the current state and a function — but instead
        of a setter, you get <code>dispatch</code>, which sends an action to your reducer.
      </p>

      <h2>Why bother? A to-do list with useReducer</h2>
      <p>
        This really shines once state gets more complex — all the "how do I update this"
        logic lives in one readable function instead of scattered across event handlers:
      </p>
      <CodeSandbox
        code={`function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added":
      return [...tasks, { id: Date.now(), text: action.text, done: false }];
    case "toggled":
      return tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "removed":
      return tasks.filter((t) => t.id !== action.id);
    default:
      return tasks;
  }
}

function Example() {
  const [tasks, dispatch] = useReducer(tasksReducer, [
    { id: 1, text: "Feed the cat", done: false },
  ]);

  return (
    <div>
      <button onClick={() => dispatch({ type: "added", text: "New task" })}>
        Add task
      </button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: "toggled", id: t.id })}
              />
              {t.text}
            </label>
            <button onClick={() => dispatch({ type: "removed", id: t.id })}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        A good rule of thumb: start with <code>useState</code>. Reach for{' '}
        <code>useReducer</code> once you notice several related state updates that would be
        clearer described together as "actions" instead of scattered setter calls.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/extracting-state-logic-into-a-reducer"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Extracting State Logic into a Reducer
        </a>
      </blockquote>
    </>
  )
}
