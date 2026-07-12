import CodeSandbox from '../components/CodeSandbox'

export default function CodeSplittingSuspense() {
  return (
    <>
      <p>
        Right now, your whole app's JavaScript downloads in one bundle before anything can
        render — even code for pages the user might never visit. <strong>Code
        splitting</strong> breaks your app into smaller chunks that load on demand, and{' '}
        <code>React.lazy</code> + <code>&lt;Suspense&gt;</code> is how React handles that
        gracefully, with a loading fallback instead of a blank screen.
      </p>

      <h2>The real-world pattern</h2>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`import { lazy, Suspense } from "react";

// This component's code isn't downloaded until it's actually needed
const SettingsPage = lazy(() => import("./SettingsPage.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading settings...</p>}>
      <SettingsPage />
    </Suspense>
  );
}`}</code>
      </pre>
      <p>
        <code>lazy(() =&gt; import(...))</code> tells your bundler (Vite, Webpack) to split{' '}
        <code>SettingsPage.jsx</code> into its own file, only fetched over the network when
        this component is actually about to render for the first time.
      </p>

      <h2>Seeing the loading state live</h2>
      <p>
        Since we can't split real files inside this sandbox, here's a lazy component whose
        "download" is simulated with a delay — watch the fallback appear, then get replaced:
      </p>
      <CodeSandbox
        code={`const SlowWidget = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: function SlowWidget() {
          return <p>✅ I finally loaded!</p>;
        },
      });
    }, 1500);
  })
);

function Example() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Load widget</button>
      {show && (
        <Suspense fallback={<p>⏳ Loading widget...</p>}>
          <SlowWidget />
        </Suspense>
      )}
    </div>
  );
}

render(<Example />);`}
      />

      <h2>Suspense boundaries can wrap multiple lazy components</h2>
      <p>
        One <code>&lt;Suspense&gt;</code> can cover several lazy children — it shows the
        fallback until <em>all</em> of them are ready, then reveals everything at once,
        avoiding a jarring "popcorn" effect where pieces of the page appear one by one.
      </p>

      <h2>Common places to split your code</h2>
      <ul>
        <li>Route-level pages (each React Router route gets its own chunk)</li>
        <li>Rarely-used features (a settings modal, an admin panel)</li>
        <li>Heavy third-party libraries (a charting library, a rich text editor)</li>
      </ul>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 Don't lazy-load everything — splitting has its own overhead (an extra network
        request per chunk). It pays off most for large, non-critical pieces of your app
        that aren't needed on first load.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/lazy" target="_blank" rel="noreferrer">
          react.dev: lazy
        </a>
      </blockquote>
    </>
  )
}
