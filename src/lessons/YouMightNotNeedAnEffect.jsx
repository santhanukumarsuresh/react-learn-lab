import CodeSandbox from '../components/CodeSandbox'

export default function YouMightNotNeedAnEffect() {
  return (
    <>
      <p>
        <code>useEffect</code> is powerful, but it's also the most overused Hook in React.
        A LOT of beginner bugs come from reaching for <code>useEffect</code> when plain
        JavaScript during render would have worked better. Let's look at the two most common
        mistakes.
      </p>

      <h2>Mistake 1: computing a value with an effect</h2>
      <p>
        Here, <code>fullName</code> is calculated inside an effect. It works, but it causes
        an extra unnecessary render every time, and there's a moment where the screen shows
        stale data:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [firstName, setFirstName] = useState("Ada");
  const [lastName, setLastName] = useState("Lovelace");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(firstName + " " + lastName); // 🚫 unnecessary effect
  }, [firstName, lastName]);

  return <p>{fullName}</p>;
}

render(<Example />);`}
      />

      <p>
        If a value can be calculated directly from props or state, just calculate it during
        render — no Hook needed at all:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [firstName, setFirstName] = useState("Ada");
  const [lastName, setLastName] = useState("Lovelace");
  const fullName = firstName + " " + lastName; // ✅ just a plain calculation

  return <p>{fullName}</p>;
}

render(<Example />);`}
      />

      <h2>Mistake 2: resetting state in response to a prop, with an effect</h2>
      <p>
        Needing to "reset" something whenever a prop changes is a common trap. Often, the
        cleanest fix is to give the component a different <code>key</code> so React
        recreates it fresh — but for simple cases, deriving values directly during render
        (like above) avoids the problem entirely.
      </p>

      <h2>So when DO you need useEffect?</h2>
      <p>
        Reach for <code>useEffect</code> when you need to synchronize your component with
        something <em>outside</em> of React — talking to a server, manually controlling a
        non-React widget, subscribing to a browser event, or setting up a timer. If you're
        just transforming data you already have, you probably don't need an effect at all.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 Quick test: if you could answer "what should this value be?" using only the
        current props and state, calculate it directly during render. Only use an effect
        for things that must happen <em>after</em> the screen updates.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/you-might-not-need-an-effect"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: You Might Not Need an Effect
        </a>
      </blockquote>
    </>
  )
}
