import CodeSandbox from '../components/CodeSandbox'
import CodeBlock from '../components/CodeBlock'

export default function UseHook() {
  return (
    <>
      <p>
        <code>use</code> is a newer, special kind of Hook — it's the only one that can be
        called <em>conditionally</em>, inside loops, or after an early return, which breaks
        the usual "Rules of Hooks" on purpose. It can read two very different things:{' '}
        <strong>context</strong> and <strong>Promises</strong>.
      </p>

      <h2>Reading context with use()</h2>
      <p>
        <code>use(SomeContext)</code> works just like <code>useContext(SomeContext)</code>{' '}
        — but because it's not a "regular" Hook, you're allowed to call it inside an{' '}
        <code>if</code> statement, which <code>useContext</code> never allows:
      </p>
      <CodeSandbox
        code={`const ThemeContext = createContext("light");

function Banner({ show }) {
  if (!show) return null;
  const theme = use(ThemeContext); // ✅ fine — conditional use() is allowed
  return <p>Theme is: {theme}</p>;
}

function Example() {
  return (
    <ThemeContext.Provider value="dark">
      <Banner show={true} />
    </ThemeContext.Provider>
  );
}

render(<Example />);`}
      />

      <h2>Reading a Promise with use()</h2>
      <p>
        This is the more powerful use case: <code>use(somePromise)</code> pauses the
        component until the promise resolves, working together with a{' '}
        <code>&lt;Suspense&gt;</code> boundary to show a fallback while waiting:
      </p>
      <CodeBlock>{`function Comments({ commentsPromise }) {
  const comments = use(commentsPromise); // "pauses" here until resolved
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
}

function Page({ commentsPromise }) {
  return (
    <Suspense fallback={<p>Loading comments...</p>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}`}</CodeBlock>
      <p>
        Instead of manually tracking <code>isLoading</code> state with{' '}
        <code>useEffect</code>, <code>use()</code> lets React handle the waiting — the
        nearest <code>&lt;Suspense&gt;</code> boundary automatically shows its{' '}
        <code>fallback</code> until the promise settles.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 You can't just create a new Promise directly inside render and pass it to{' '}
        <code>use()</code> — that would restart the fetch on every render. The promise
        needs to come from somewhere stable, like a caching data-fetching library or a
        framework's data loader.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/use" target="_blank" rel="noreferrer">
          react.dev: use
        </a>
      </blockquote>
    </>
  )
}
