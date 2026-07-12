import CodeSandbox from '../components/CodeSandbox'

export default function HigherOrderComponents() {
  return (
    <>
      <p>
        A <strong>Higher-Order Component</strong> (HOC) is a function that takes a
        component and returns a <em>new</em> component with extra behavior bolted on —
        conceptually similar to how <code>Array.prototype.map</code> takes a function and
        returns a new array. It's an older pattern (most new code prefers custom hooks
        instead), but it's still common in real codebases and libraries, so recognizing it
        matters.
      </p>

      <h2>The shape of a HOC</h2>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`function withExtraProp(WrappedComponent) {
  return function EnhancedComponent(props) {
    return <WrappedComponent {...props} extra="hello" />;
  };
}`}</code>
      </pre>
      <p>
        A HOC is just a function that returns a component — that returned component
        renders the original one, usually passing through the original props plus
        something extra.
      </p>

      <h2>A practical example: withLoading</h2>
      <CodeSandbox
        code={`function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...rest }) {
    if (isLoading) {
      return <p>⏳ Loading...</p>;
    }
    return <WrappedComponent {...rest} />;
  };
}

function CourseList({ courses }) {
  return (
    <ul>
      {courses.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}

const CourseListWithLoading = withLoading(CourseList);

function Example() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <button onClick={() => setIsLoading(!isLoading)}>Toggle loading</button>
      <CourseListWithLoading
        isLoading={isLoading}
        courses={["React Basics", "Advanced Hooks"]}
      />
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        <code>withLoading</code> knows nothing about courses specifically — it can wrap{' '}
        <em>any</em> component that needs a loading state, which is the whole point:
        reusing cross-cutting behavior without copy-pasting the same{' '}
        <code>if (isLoading)</code> check everywhere.
      </p>

      <h2>HOCs vs. custom hooks</h2>
      <p>
        Today, most of what HOCs used to solve is handled more simply with a custom hook:
      </p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`// HOC version — wraps the whole component, adds a layer to the tree
const CourseListWithLoading = withLoading(CourseList);

// Hook version — no extra wrapper component, logic lives inside
function CourseList({ courses, isLoading }) {
  if (isLoading) return <p>Loading...</p>;
  return <ul>{courses.map((c) => <li key={c}>{c}</li>)}</ul>;
}`}</code>
      </pre>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 You'll mostly encounter HOCs when reading older React code or certain libraries
        (like <code>connect()</code> from older Redux, or <code>withRouter</code> from
        older React Router). For new code you write yourself, reach for a custom hook
        first — it avoids extra wrapper components and is usually easier to follow.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://legacy.reactjs.org/docs/higher-order-components.html"
          target="_blank"
          rel="noreferrer"
        >
          React (legacy docs): Higher-Order Components
        </a>
      </blockquote>
    </>
  )
}
