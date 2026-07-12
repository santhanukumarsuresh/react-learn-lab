import CodeSandbox from '../components/CodeSandbox'

export default function FormEvents() {
  return (
    <>
      <p>
        Forms are how users type things into your app — a search box, a name field, a
        comment box. In React, we usually keep the input's value in state, so React always
        knows exactly what's inside it. This is called a{' '}
        <strong>controlled input</strong>.
      </p>

      <h2>A controlled text input</h2>
      <CodeSandbox
        code={`function Example() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <input value={name} onChange={handleChange} placeholder="Type your name" />
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Every keystroke fires <code>onChange</code>, which reads the new text from{' '}
        <code>event.target.value</code> and saves it in state. Because the input's{' '}
        <code>value</code> is always set from that same state, React and the input stay in
        sync.
      </p>

      <h2>Handling form submission</h2>
      <p>
        When the user submits a form (like pressing Enter or clicking a Submit button), you
        usually want to stop the page from reloading — React handles that with{' '}
        <code>event.preventDefault()</code>:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Say hi</button>
      {submitted && <p>Hi, {submitted}! 👋</p>}
    </form>
  );
}

render(<Example />);`}
      />

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react-dom/components/input" target="_blank" rel="noreferrer">
          react.dev: input
        </a>
      </blockquote>
    </>
  )
}
