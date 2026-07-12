import CodeSandbox from '../components/CodeSandbox'

export default function PureComponents() {
  return (
    <>
      <p>
        React expects every component to behave like a <strong>pure function</strong>: given
        the same props, it should always return the same JSX, and it shouldn't change
        anything that existed before it was called. This sounds abstract, so let's see what
        it means in practice.
      </p>

      <h2>A math analogy</h2>
      <p>
        Think of a pure function like the math function <code>double(x) = 2x</code>. Call{' '}
        <code>double(3)</code> a hundred times, and you always get 6 — it never changes the
        world around it, and it never returns something different for the same input. A
        component should work the same way with its props.
      </p>

      <h2>Impure: changing something outside the component</h2>
      <p>
        This component "guesses" it can just tweak an outside variable while rendering. Try
        clicking the button a few times — notice how the count keeps climbing weirdly, even
        for the same props, because rendering itself has a side effect:
      </p>
      <CodeSandbox
        code={`let guestCount = 0;

function Guest() {
  guestCount = guestCount + 1; // 🚫 changing something outside during render
  return <p>Guest #{guestCount}</p>;
}

function Example() {
  const [renders, setRenders] = useState(0);
  return (
    <div>
      <Guest />
      <Guest />
      <Guest />
      <button onClick={() => setRenders(renders + 1)}>Re-render</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Every time <code>Example</code> re-renders, the three <code>&lt;Guest /&gt;</code>{' '}
        calls bump the shared <code>guestCount</code> again, even though nothing about the
        guests actually changed. That's a side effect happening during render — exactly what
        pure components should avoid.
      </p>

      <h2>Pure: only using props and local state</h2>
      <CodeSandbox
        code={`function Guest({ number }) {
  return <p>Guest #{number}</p>;
}

function Example() {
  const [renders, setRenders] = useState(0);
  return (
    <div>
      <Guest number={1} />
      <Guest number={2} />
      <Guest number={3} />
      <button onClick={() => setRenders(renders + 1)}>Re-render</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Now no matter how many times <code>Example</code> re-renders, each{' '}
        <code>&lt;Guest /&gt;</code> always shows the same number for the same props — calm
        and predictable.
      </p>

      <h2>Where do side effects belong, then?</h2>
      <p>
        Things like changing a variable, updating a timer, or fetching data are totally
        normal — they just don't belong <em>during render</em>. They belong inside event
        handlers (like <code>onClick</code>) or inside <code>useEffect</code>, both of which
        run <em>after</em> React has figured out what to show.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/keeping-components-pure" target="_blank" rel="noreferrer">
          react.dev: Keeping Components Pure
        </a>
      </blockquote>
    </>
  )
}
