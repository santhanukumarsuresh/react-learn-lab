import CodeSandbox from '../components/CodeSandbox'

export default function UseId() {
  return (
    <>
      <p>
        Form fields need to connect a <code>&lt;label&gt;</code> to its{' '}
        <code>&lt;input&gt;</code> using matching <code>id</code>/<code>htmlFor</code>{' '}
        attributes. But if you hardcode an id and use the same component twice on one page,
        you get two elements with the same id — which breaks accessibility and can confuse
        the browser. <code>useId</code> generates a unique id for you, safely, every time.
      </p>

      <h2>The problem with hardcoded ids</h2>
      <CodeSandbox
        code={`function EmailField() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </div>
  );
}

function Example() {
  return (
    <div>
      <EmailField />
      <EmailField />
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Both fields end up with <code>id="email"</code> — technically invalid HTML, and it
        means clicking the second label focuses the <em>first</em> field instead.
      </p>

      <h2>The fix</h2>
      <CodeSandbox
        code={`function EmailField() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}

function Example() {
  return (
    <div>
      <EmailField />
      <EmailField />
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Now every instance of <code>EmailField</code> generates its own unique id
        automatically — no manual bookkeeping needed, and it works correctly no matter how
        many times the component is used on the page.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 <code>useId</code> is specifically for accessibility attributes like{' '}
        <code>id</code> — it is <em>not</em> meant for generating keys in a list (use a
        stable id from your data for that) or random values for things like database
        records.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useId" target="_blank" rel="noreferrer">
          react.dev: useId
        </a>
      </blockquote>
    </>
  )
}
