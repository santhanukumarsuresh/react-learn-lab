import CodeSandbox from '../components/CodeSandbox'

export default function UseActionState() {
  return (
    <>
      <p>
        Submitting a form usually means: mark it as loading, call an API, handle success or
        failure, then update the UI — all wired up by hand with several{' '}
        <code>useState</code> calls. <code>useActionState</code> bundles that entire pattern
        into a single Hook built specifically for form actions.
      </p>

      <h2>A form that "submits" to a fake API</h2>
      <p>
        <code>useActionState</code> takes an <em>action function</em> (which can be async!)
        and an initial state, and gives you back the latest state, a special "form action" to
        wire into your form, and an <code>isPending</code> flag:
      </p>
      <CodeSandbox
        code={`async function submitName(previousState, formData) {
  const name = formData.get("name");

  await new Promise((resolve) => setTimeout(resolve, 800)); // pretend API call

  if (!name || name.trim() === "") {
    return { error: "Name is required", success: false };
  }
  return { error: null, success: true, name };
}

function Example() {
  const [state, formAction, isPending] = useActionState(submitName, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction}>
      <input name="name" placeholder="Your name" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.success && <p style={{ color: "green" }}>Thanks, {state.name}!</p>}
    </form>
  );
}

render(<Example />);`}
      />

      <p>
        Try submitting with an empty name, then with a real one. Notice you never had to
        write your own <code>isLoading</code> state, your own <code>onSubmit</code> handler,
        or manually call <code>event.preventDefault()</code> — passing{' '}
        <code>formAction</code> straight to the form's <code>action</code> prop handles all
        of it.
      </p>

      <h2>How the action function works</h2>
      <ul>
        <li>
          It receives the <em>previous state</em> and the submitted <code>FormData</code>.
        </li>
        <li>
          Whatever it returns becomes the new state — available as <code>state</code>.
        </li>
        <li>
          While it's running (including any <code>await</code>), <code>isPending</code> is{' '}
          <code>true</code>.
        </li>
      </ul>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useActionState" target="_blank" rel="noreferrer">
          react.dev: useActionState
        </a>
      </blockquote>
    </>
  )
}
