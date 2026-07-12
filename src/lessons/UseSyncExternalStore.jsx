import CodeBlock from '../components/CodeBlock'
import CodeSandbox from '../components/CodeSandbox'

export default function UseSyncExternalStore() {
  return (
    <>
      <p>
        Most of the time, state lives inside React via <code>useState</code>. But
        sometimes your component needs to read from something React doesn't manage at all —
        the browser's online/offline status, the window size, or a state store from a
        library like Redux. <code>useSyncExternalStore</code> is the official, safe way to
        subscribe to that kind of "external" state.
      </p>

      <h2>Why not just useState + useEffect?</h2>
      <p>
        You actually can wire this up with <code>useState</code> and{' '}
        <code>useEffect</code> — and for simple cases, many developers do. But{' '}
        <code>useSyncExternalStore</code> is specifically designed to avoid subtle bugs that
        can happen with concurrent rendering (like showing torn/inconsistent values across
        different parts of the screen), so React itself recommends it for this exact job.
      </p>

      <h2>Subscribing to the browser's online status</h2>
      <CodeBlock>{`function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function StatusBadge() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? "🟢 Online" : "🔴 Offline"}</p>;
}`}</CodeBlock>

      <p>
        <code>useSyncExternalStore</code> takes two functions:
      </p>
      <ul>
        <li>
          <strong>subscribe</strong> — tells React how to listen for changes, and returns a
          cleanup function (just like an effect's cleanup).
        </li>
        <li>
          <strong>getSnapshot</strong> — returns the current value, read fresh every time
          it's asked.
        </li>
      </ul>
      <p>
        React calls <code>getSnapshot</code> whenever it needs to check if the external
        value has changed, and automatically re-renders your component when it has.
      </p>

      <h2>Try it: a tiny external store</h2>
      <p>
        Here's a genuinely external store — a plain object living completely outside
        React, with its own <code>subscribe</code> and <code>getSnapshot</code>. Two
        separate components below both read from it and stay in sync automatically:
      </p>
      <CodeSandbox
        code={`// A store that lives entirely outside React — just a variable and some listeners.
let count = 0;
const listeners = new Set();

const counterStore = {
  increment() {
    count += 1;
    listeners.forEach((listener) => listener());
  },
  subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  getSnapshot() {
    return count;
  },
};

function useCounterStore() {
  return useSyncExternalStore(counterStore.subscribe, counterStore.getSnapshot);
}

function DisplayA() {
  const count = useCounterStore();
  return <p>Display A sees: {count}</p>;
}

function DisplayB() {
  const count = useCounterStore();
  return <p>Display B sees: {count}</p>;
}

function Example() {
  return (
    <div>
      <button onClick={() => counterStore.increment()}>Increment shared count</button>
      <DisplayA />
      <DisplayB />
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Click the button — both displays update together, even though neither of them
        called <code>setState</code> directly. The store itself owns the truth;{' '}
        <code>useSyncExternalStore</code> just keeps React's rendering honest about it.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 You'll rarely write this yourself — it's mostly used inside libraries (state
        managers, browser API wrappers). But recognizing it helps you understand how tools
        like Redux's <code>useSelector</code> safely connect external state to React under
        the hood.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/reference/react/useSyncExternalStore"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: useSyncExternalStore
        </a>
      </blockquote>
    </>
  )
}
