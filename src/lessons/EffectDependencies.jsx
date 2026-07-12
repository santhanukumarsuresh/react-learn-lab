import CodeSandbox from '../components/CodeSandbox'

export default function EffectDependencies() {
  return (
    <>
      <p>
        The dependency array is the part of <code>useEffect</code> that trips people up the
        most. The good news: you don't really "choose" what goes in it — React (and ESLint)
        can tell you, because the rule is simple: <strong>list every reactive value your
        effect actually reads</strong>.
      </p>

      <h2>A dependency array is not a suggestion</h2>
      <p>
        This effect reads <code>city</code> but "forgets" to list it. It looks like it
        works at first, but it'll quietly show stale data if <code>city</code> ever
        changes:
      </p>
      <CodeSandbox
        code={`function Weather({ city }) {
  useEffect(() => {
    console.log("Checking weather for " + city);
    // 🚫 missing city in the dependency array below —
    // this effect will never re-run when city changes!
  }, []);

  return <p>Weather for {city}</p>;
}

function Example() {
  const [city, setCity] = useState("Paris");
  return (
    <div>
      <Weather city={city} />
      <button onClick={() => setCity(city === "Paris" ? "Tokyo" : "Paris")}>
        Switch city
      </button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Check the console — the effect only logs once, for "Paris," even after switching
        cities. The fix is simple: add <code>city</code> to the array.
      </p>
      <CodeSandbox
        code={`function Weather({ city }) {
  useEffect(() => {
    console.log("Checking weather for " + city);
  }, [city]); // ✅ now it re-runs whenever city changes

  return <p>Weather for {city}</p>;
}

function Example() {
  const [city, setCity] = useState("Paris");
  return (
    <div>
      <Weather city={city} />
      <button onClick={() => setCity(city === "Paris" ? "Tokyo" : "Paris")}>
        Switch city
      </button>
    </div>
  );
}

render(<Example />);`}
      />

      <h2>The real fix for "too many dependencies" isn't lying to React</h2>
      <p>
        If your dependency array feels too big or annoying, it's usually a signal to
        restructure the code — not to remove a dependency and hope for the best. Common
        fixes:
      </p>
      <ul>
        <li>Move a value that doesn't need to trigger re-runs outside the component.</li>
        <li>
          Calculate a value directly during render instead of storing it in state (back to
          "You Might Not Need an Effect"!).
        </li>
        <li>
          Use the functional update form, <code>setCount(c =&gt; c + 1)</code>, so{' '}
          <code>count</code> doesn't need to be a dependency just to update it.
        </li>
      </ul>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 Never remove a dependency just to stop an effect from re-running "too often." If
        it feels wrong, that's a sign to change how the effect is written — the dependency
        array is honest about what your code actually depends on.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/removing-effect-dependencies"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Removing Effect Dependencies
        </a>
      </blockquote>
    </>
  )
}
