import CodeBlock from '../components/CodeBlock'
import CodeSandbox from '../components/CodeSandbox'

export default function UseLayoutEffect() {
  return (
    <>
      <p>
        <code>useLayoutEffect</code> works almost exactly like <code>useEffect</code> — same
        signature, same dependency array — but with one important timing difference that
        matters for a specific kind of bug.
      </p>

      <h2>The timing difference</h2>
      <ul>
        <li>
          <code>useEffect</code> runs <em>after</em> the browser has painted the screen —
          the user might briefly see the "before" state.
        </li>
        <li>
          <code>useLayoutEffect</code> runs <em>before</em> the browser paints — React waits
          for it to finish first, so the user never sees a flash of the wrong thing.
        </li>
      </ul>

      <h2>When this actually matters: measuring the DOM</h2>
      <p>
        Imagine a tooltip that needs to measure its own size to decide whether to appear
        above or below a button, to avoid going off-screen:
      </p>
      <CodeBlock>{`function Tooltip({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState("below");

  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setPosition(spaceBelow < 100 ? "above" : "below");
  }, []);

  return (
    <div ref={ref} className={\`tooltip tooltip-\${position}\`}>
      {children}
    </div>
  );
}`}</CodeBlock>
      <p>
        If this measurement happened in a regular <code>useEffect</code>, the tooltip could
        briefly flash in the wrong position — appear "below," then jump "above" a frame
        later, which looks glitchy. <code>useLayoutEffect</code> finishes its measuring and
        repositioning <em>before</em> anything is painted, so the user only ever sees the
        correct final position.
      </p>

      <h2>Try it: measuring a real element</h2>
      <p>
        Type in the box below — <code>useLayoutEffect</code> measures the box's real height
        after every change and shows it, before the browser paints anything:
      </p>
      <CodeSandbox
        code={`function Example() {
  const boxRef = useRef(null);
  const [text, setText] = useState("Type here to grow me...");
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const rect = boxRef.current.getBoundingClientRect();
    setHeight(Math.round(rect.height));
  }, [text]);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ border: "2px solid #38bdf8", padding: 8, minHeight: 20, whiteSpace: "pre-line" }}
      >
        {text}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ display: "block", marginTop: 8 }}
        placeholder="Add more lines to grow the box above"
      />
      <p>Measured height: {height}px</p>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Add a few line breaks and the measured height updates instantly, with no visible
        flash — that's <code>useLayoutEffect</code> doing its measuring work before the
        browser ever shows the outdated number.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ <code>useLayoutEffect</code> blocks the browser from painting until it finishes,
        so slow code inside it can make your app feel laggy. Default to{' '}
        <code>useEffect</code> for everything — data fetching, subscriptions, timers — and
        only reach for <code>useLayoutEffect</code> when you specifically need to measure
        or adjust the DOM before the user sees it.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useLayoutEffect" target="_blank" rel="noreferrer">
          react.dev: useLayoutEffect
        </a>
      </blockquote>
    </>
  )
}
