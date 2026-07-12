import CodeSandbox from '../components/CodeSandbox'

export default function CompoundComponents() {
  return (
    <>
      <p>
        Think about a native <code>&lt;select&gt;</code> and its <code>&lt;option&gt;</code>{' '}
        children — they work together as a set, silently sharing state (which option is
        selected) without you ever passing that state around by hand. The{' '}
        <strong>compound components</strong> pattern lets you build custom component APIs
        that feel exactly that natural.
      </p>

      <h2>The problem it solves</h2>
      <p>
        Imagine a <code>&lt;Tabs&gt;</code> component. A "prop-heavy" version might look
        like <code>&lt;Tabs items={'{'}[...]{'}'} activeIndex={'{'}0{'}'} /&gt;</code> —
        rigid, and awkward to customize the layout of each tab. Compound components instead
        let you compose it with JSX children, the same way you'd write HTML:
      </p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Profile</Tabs.Tab>
    <Tabs.Tab index={1}>Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel index={0}>Profile content</Tabs.Panel>
  <Tabs.Panel index={1}>Settings content</Tabs.Panel>
</Tabs>`}</code>
      </pre>

      <h2>Building it with Context</h2>
      <p>
        The trick: a shared context, created once and provided by the outer component, lets
        every inner piece read and update the same state without any prop drilling:
      </p>
      <CodeSandbox
        code={`const TabsContext = createContext(null);

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div style={{ display: "flex", gap: 8 }}>{children}</div>;
}

function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = activeIndex === index;
  return (
    <button
      onClick={() => setActiveIndex(index)}
      style={{ fontWeight: isActive ? "bold" : "normal" }}
    >
      {children}
    </button>
  );
}

function Panel({ index, children }) {
  const { activeIndex } = useContext(TabsContext);
  if (activeIndex !== index) return null;
  return <div style={{ padding: 8 }}>{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = Panel;

function Example() {
  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab index={0}>Profile</Tabs.Tab>
        <Tabs.Tab index={1}>Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel index={0}>👤 Profile content here.</Tabs.Panel>
      <Tabs.Panel index={1}>⚙️ Settings content here.</Tabs.Panel>
    </Tabs>
  );
}

render(<Example />);`}
      />

      <p>
        Attaching <code>Tabs.List</code>, <code>Tabs.Tab</code>, and <code>Tabs.Panel</code>{' '}
        as properties on the <code>Tabs</code> function is just a naming convenience — it
        signals "these pieces belong together" and keeps the import list short (
        <code>import {'{ Tabs }'}</code> gives you everything).
      </p>

      <h2>Why this beats one giant prop-driven component</h2>
      <ul>
        <li>Consumers control the exact markup structure and styling of each part.</li>
        <li>Adding a new piece (like a close button) doesn't require touching the API.</li>
        <li>
          The internal state-sharing (via context) is invisible to whoever uses the
          component — it "just works," like native HTML elements do.
        </li>
      </ul>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/passing-data-deeply-with-context" target="_blank" rel="noreferrer">
          react.dev: Passing Data Deeply with Context
        </a>{' '}
        (the same context foundation this pattern builds on)
      </blockquote>
    </>
  )
}
