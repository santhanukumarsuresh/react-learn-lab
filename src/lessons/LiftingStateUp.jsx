import CodeSandbox from '../components/CodeSandbox'

export default function LiftingStateUp() {
  return (
    <>
      <p>
        Sometimes two components need to know about the same changing information — like
        two panels that both need to reflect the same "selected item." Since each
        component's state is private to itself, you can't share it directly. The fix is
        called <strong>lifting state up</strong>: move the state to their closest shared
        parent, and pass it down as props.
      </p>

      <h2>The problem: state trapped in one component</h2>
      <p>
        Here, each button has its own separate state, so clicking one doesn't affect the
        other — but we want only one to be selected at a time:
      </p>
      <CodeSandbox
        code={`function Tab({ label }) {
  const [selected, setSelected] = useState(false);
  return (
    <button
      onClick={() => setSelected(true)}
      style={{ fontWeight: selected ? "bold" : "normal" }}
    >
      {label} {selected ? "✅" : ""}
    </button>
  );
}

function Example() {
  return (
    <div>
      <Tab label="Home" />
      <Tab label="Profile" />
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Try clicking both — they don't know about each other, so both can be "selected" at
        once. That's the sign state needs to move up.
      </p>

      <h2>The fix: move state to the parent</h2>
      <CodeSandbox
        code={`function Tab({ label, isSelected, onSelect }) {
  return (
    <button onClick={onSelect} style={{ fontWeight: isSelected ? "bold" : "normal" }}>
      {label} {isSelected ? "✅" : ""}
    </button>
  );
}

function Example() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div>
      <Tab label="Home" isSelected={activeTab === "Home"} onSelect={() => setActiveTab("Home")} />
      <Tab label="Profile" isSelected={activeTab === "Profile"} onSelect={() => setActiveTab("Profile")} />
      <p>Currently viewing: {activeTab}</p>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Now <code>Example</code> — the shared parent — owns the single source of truth,{' '}
        <code>activeTab</code>. Each <code>Tab</code> is just told whether it's selected via
        props, and reports clicks back up through the <code>onSelect</code> callback prop.
      </p>

      <h2>The pattern in three steps</h2>
      <ol>
        <li>Find the closest component that's a parent of everyone who needs the state.</li>
        <li>
          Move the <code>useState</code> call up to that parent.
        </li>
        <li>
          Pass the value down as a prop, and pass a function down (like{' '}
          <code>onSelect</code>) so children can request a change.
        </li>
      </ol>
      <p>
        This is the same idea behind the controlled inputs you built earlier — the parent
        owns the state, and children are just given the value plus a way to ask for
        changes.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/sharing-state-between-components"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Sharing State Between Components
        </a>
      </blockquote>
    </>
  )
}
