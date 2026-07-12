import CodeSandbox from '../components/CodeSandbox'

export default function UpdatingState() {
  return (
    <>
      <p>
        <code>useState</code> is simple to use, but there are a couple of gotchas that trip
        up almost everyone at first. Let's clear them up.
      </p>

      <h2>Gotcha #1: state updates aren't instant</h2>
      <p>
        When you call <code>setCount(count + 1)</code>, React doesn't change{' '}
        <code>count</code> right away — it schedules a re-render for later. If you read{' '}
        <code>count</code> again on the very next line, you'll still see the old value.
      </p>

      <h2>Gotcha #2: multiple updates in a row</h2>
      <p>
        This often surprises people. Try clicking the button below — you might expect the
        count to jump by 3, but it only jumps by 1:
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
        Each of those three calls used the <em>same</em> old value of <code>count</code> from
        when the click started — they don't see each other's updates.
      </p>

      <h2>The fix: functional updates</h2>
      <p>
        When your new state depends on the old state, pass a function to your setter instead
        of a value. React guarantees it always gets the latest state:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+3, for real!</button>
    </div>
  );
}

render(<Example />);`}
      />

      <h2>Gotcha #3: never mutate state directly</h2>
      <p>
        Always create a <em>new</em> array or object when updating state instead of changing
        the existing one. This is where spread syntax comes in handy:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [items, setItems] = useState(["Apple"]);

  function addItem() {
    // ✅ creates a new array — React notices the change
    setItems([...items, "Banana"]);
  }

  return (
    <div>
      <p>{items.join(", ")}</p>
      <button onClick={addItem}>Add Banana</button>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        If you'd written <code>items.push("Banana")</code> instead, React might not notice
        anything changed, because it's still the exact same array in memory.
      </p>
    </>
  )
}
