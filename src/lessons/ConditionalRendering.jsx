import CodeSandbox from '../components/CodeSandbox'

export default function ConditionalRendering() {
  return (
    <>
      <p>
        Most apps need to show different things depending on the situation — a "Log In"
        button vs. a welcome message, an empty cart vs. a list of items.{' '}
        <strong>Conditional rendering</strong> is just using regular JavaScript logic to
        decide what JSX to show.
      </p>

      <h2>Option 1: an if statement before the return</h2>
      <p>
        Since <code>if</code> can't go inside curly braces, the simplest option is to
        decide <em>before</em> you return anything:
      </p>
      <CodeSandbox
        code={`function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h2>Welcome back!</h2>;
  }
  return <h2>Please log in.</h2>;
}

function Example() {
  return <Greeting isLoggedIn={false} />;
}

render(<Example />);`}
      />

      <h2>Option 2: the ternary operator</h2>
      <p>For a quick either/or choice inline, a ternary is shorter:</p>
      <CodeSandbox
        code={`function Greeting({ isLoggedIn }) {
  return <h2>{isLoggedIn ? "Welcome back!" : "Please log in."}</h2>;
}

function Example() {
  return <Greeting isLoggedIn={true} />;
}

render(<Example />);`}
      />

      <h2>Option 3: the && operator (show it, or show nothing)</h2>
      <p>
        When you only need to show something <em>sometimes</em>, with nothing to display
        otherwise, <code>&&</code> is the shortest option:
      </p>
      <CodeSandbox
        code={`function Inbox({ unreadCount }) {
  return (
    <p>
      Inbox {unreadCount > 0 && <strong>({unreadCount} new)</strong>}
    </p>
  );
}

function Example() {
  return <Inbox unreadCount={5} />;
}

render(<Example />);`}
      />

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ Watch out with <code>&&</code> and numbers: <code>{'{count && <p>...</p>}'}</code>{' '}
        will render a stray <code>0</code> on screen if <code>count</code> is{' '}
        <code>0</code>, because <code>0</code> is falsy but still gets displayed. Use{' '}
        <code>count &gt; 0 && ...</code> to be safe.
      </div>

      <h2>Option 4: storing JSX in a variable</h2>
      <p>
        For more complex conditions, it can be clearer to build the JSX in a variable
        first, then use that variable in your return:
      </p>
      <CodeSandbox
        code={`function StatusBadge({ status }) {
  let badge;
  if (status === "online") {
    badge = <span style={{ color: "green" }}>🟢 Online</span>;
  } else if (status === "away") {
    badge = <span style={{ color: "orange" }}>🟡 Away</span>;
  } else {
    badge = <span style={{ color: "gray" }}>⚪ Offline</span>;
  }

  return <p>Status: {badge}</p>;
}

function Example() {
  return <StatusBadge status="away" />;
}

render(<Example />);`}
      />

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/conditional-rendering" target="_blank" rel="noreferrer">
          react.dev: Conditional Rendering
        </a>
      </blockquote>
    </>
  )
}
