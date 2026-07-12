import CodeSandbox from '../components/CodeSandbox'

export default function CustomHooks() {
  return (
    <>
      <p>
        Once you've used <code>useState</code> and <code>useEffect</code> a bit, you'll
        notice the same little patterns showing up in different components. A{' '}
        <strong>custom hook</strong> lets you package that pattern into your own reusable
        function.
      </p>

      <h2>The rule: it's just a function</h2>
      <p>
        A custom hook is a regular JavaScript function whose name starts with{' '}
        <code>use</code>, and which can call other hooks inside it.
      </p>

      <h2>Example: useCounter</h2>
      <p>Let's package up the "click to count" logic we've written a few times now:</p>
      <CodeSandbox
        code={`function useCounter(startingValue) {
  const [count, setCount] = useState(startingValue);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  return { count, increment, decrement };
}

function Example() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-1</button>
      <button onClick={increment}>+1</button>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Now any component can call <code>useCounter()</code> and instantly get its own
        independent counter — without repeating the state logic every time.
      </p>

      <h2>Example: useWindowWidth</h2>
      <p>Custom hooks are especially handy for combining state with an effect:</p>
      <CodeSandbox
        code={`function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    console.log("Hook mounted — imagine we're checking network status here!");
  }, []);

  return isOnline;
}

function Example() {
  const isOnline = useOnlineStatus();
  return <p>Status: {isOnline ? "🟢 Online" : "🔴 Offline"}</p>;
}

render(<Example />);`}
      />

      <p>
        Custom hooks don't do anything magical — they're just a way to reuse stateful logic
        across components, keeping your components short and focused.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/reusing-logic-with-custom-hooks"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Reusing Logic with Custom Hooks
        </a>
      </blockquote>
    </>
  )
}
