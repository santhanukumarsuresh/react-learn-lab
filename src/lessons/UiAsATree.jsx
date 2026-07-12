import CodeSandbox from '../components/CodeSandbox'

export default function UiAsATree() {
  return (
    <>
      <p>
        You've been nesting components inside each other for a while now — a component
        rendering another component, which renders another. Zoom out, and this forms a
        shape you've probably seen before: a <strong>tree</strong>, just like a family tree
        or a folder structure on your computer.
      </p>

      <h2>Seeing the tree</h2>
      <CodeSandbox
        code={`function Avatar() {
  return <span>🧑</span>;
}

function UserInfo() {
  return (
    <div>
      <Avatar />
      <p>Ava</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>My App</h1>
      <UserInfo />
    </div>
  );
}

render(<App />);`}
      />

      <p>Drawn out as a tree, this looks like:</p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`App
├── h1
└── UserInfo
    ├── Avatar (span)
    └── p`}</code>
      </pre>

      <p>
        <code>App</code> is the <strong>root</strong> — the very top of the tree.{' '}
        <code>UserInfo</code> is a <strong>child</strong> of <code>App</code>, and{' '}
        <code>Avatar</code> is a child of <code>UserInfo</code>. Going the other direction,{' '}
        <code>App</code> is a <strong>parent</strong> (and even a "grandparent," from{' '}
        <code>Avatar</code>'s point of view).
      </p>

      <h2>Why this mental model matters</h2>
      <ul>
        <li>
          <strong>Props flow down</strong> the tree, from parents to children — never
          sideways or upward.
        </li>
        <li>
          <strong>State lives at some level</strong> of the tree, and "lifting state up"
          just means moving it to a shared parent higher in the tree.
        </li>
        <li>
          When a piece of state changes, React only needs to re-render that part of the
          tree and everything below it — not the whole app.
        </li>
      </ul>

      <p>
        Thinking in trees is one of the most useful habits you can build as a React
        developer — it makes questions like "where should this state live?" or "why isn't
        this prop showing up?" much easier to answer.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/understanding-your-ui-as-a-tree" target="_blank" rel="noreferrer">
          react.dev: Your UI as a Tree
        </a>
      </blockquote>
    </>
  )
}
