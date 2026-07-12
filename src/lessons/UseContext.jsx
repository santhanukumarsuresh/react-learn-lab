import CodeSandbox from '../components/CodeSandbox'

export default function UseContext() {
  return (
    <>
      <p>
        You've been passing data down through props — parent to child. But what if a deeply
        nested component needs something from way up at the top, like the current theme or
        logged-in user? Passing it down through every single component in between (even ones
        that don't need it) is called{' '}
        <strong>prop drilling</strong>, and it gets old fast. <code>useContext</code> lets
        you skip straight to the data.
      </p>

      <h2>Step 1: create a context</h2>
      <p>Outside any component, create a context with a default value:</p>
      <CodeSandbox
        code={`const ThemeContext = createContext("light");

function Example() {
  return <p>Just created a context!</p>;
}

render(<Example />);`}
      />

      <h2>Step 2: provide a value from a parent</h2>
      <p>
        Wrap the part of your app that should share this value in a{' '}
        <code>&lt;ThemeContext.Provider&gt;</code>:
      </p>

      <h2>Step 3: read it anywhere inside, no matter how deep</h2>
      <p>
        Here, <code>ThemedButton</code> is nested two levels deep, but it reaches straight
        into the context — no props passed through <code>Toolbar</code> at all:
      </p>
      <CodeSandbox
        code={`const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme === "dark" ? "#1e293b" : "#f1f5f9",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      I'm a {theme} button
    </button>
  );
}

function Toolbar() {
  // Toolbar doesn't care about theme, and doesn't pass it down manually.
  return <ThemedButton />;
}

function Example() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

render(<Example />);`}
      />

      <p>
        Every component inside the <code>Provider</code> can call{' '}
        <code>useContext(ThemeContext)</code> and instantly get <code>"dark"</code> — no
        matter how many components are in between.
      </p>

      <h2>Combining context with state</h2>
      <p>
        Context is often paired with <code>useState</code> in a parent, so the value can
        actually change over time, and everything reading it updates automatically:
      </p>
      <CodeSandbox
        code={`const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button>Current theme: {theme}</button>;
}

function Example() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <ThemedButton />
      <br />
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
    </ThemeContext.Provider>
  );
}

render(<Example />);`}
      />

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 Context is great for things that many components across your app need — theme,
        logged-in user, language. For state that's only shared between a couple of nearby
        components, plain props (and lifting state up) are usually simpler.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/passing-data-deeply-with-context"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Passing Data Deeply with Context
        </a>
      </blockquote>
    </>
  )
}
