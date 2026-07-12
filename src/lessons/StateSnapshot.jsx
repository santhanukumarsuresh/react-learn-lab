import CodeSandbox from '../components/CodeSandbox'

export default function StateSnapshot() {
  return (
    <>
      <p>
        Here's something that trips up almost everyone at first: reading state right after
        calling its setter still gives you the <em>old</em> value. This isn't a bug — it's
        how React is designed to work, and once it clicks, a lot of confusing behavior
        starts making sense.
      </p>

      <h2>State doesn't change mid-render</h2>
      <p>
        Every time your component renders, React hands it a "snapshot" of state as it was{' '}
        <em>at that moment</em>. That snapshot never changes during that render, no matter
        how many times you call the setter. Try this:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log("count right after calling setCount:", count);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+1 (check the console!)</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Open your console and click the button — you'll see the logged number is always one
        step <em>behind</em> what's on screen. <code>count</code> inside{' '}
        <code>handleClick</code> is frozen at the value it had when this render started;
        calling <code>setCount</code> schedules a new render with the new value, but doesn't
        change the current snapshot.
      </p>

      <h2>This explains the "+3 that's actually +1" bug</h2>
      <p>
        Remember this surprise from the state-updating lesson?
      </p>
      <CodeSandbox
        code={`function Example() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+3?</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        All three calls use the exact same snapshot value of <code>count</code>, because
        it's the same render — like three people separately deciding to write "5" on a
        sticky note instead of building on each other's answer.
      </p>

      <h2>The fix, revisited</h2>
      <p>
        That's exactly why the functional update form —{' '}
        <code>setCount(prev =&gt; prev + 1)</code> — works: instead of reading the frozen
        snapshot, it asks React for whatever the truly latest value turns out to be when
        it's applied.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/state-as-a-snapshot" target="_blank" rel="noreferrer">
          react.dev: State as a Snapshot
        </a>
      </blockquote>
    </>
  )
}
