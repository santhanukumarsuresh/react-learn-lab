import CodeSandbox from '../components/CodeSandbox'

export default function UseOptimistic() {
  return (
    <>
      <p>
        When you post a comment or send a message, most apps show it on screen{' '}
        <em>immediately</em> — before the server has actually confirmed it worked. This
        makes the app feel instant, even though the network request is still in flight.
        That trick is called an <strong>optimistic update</strong>, and{' '}
        <code>useOptimistic</code> makes it easy to build.
      </p>

      <h2>An optimistic comment list</h2>
      <CodeSandbox
        code={`async function saveComment(text) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // pretend API call
  return { id: Date.now(), text };
}

function Example() {
  const [comments, setComments] = useState([{ id: 1, text: "First comment!" }]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newText) => [
      ...currentComments,
      { id: "temp", text: newText + " (sending...)" },
    ]
  );

  async function handleSubmit(formData) {
    const text = formData.get("comment");
    addOptimisticComment(text); // shows instantly, before the API responds
    const saved = await saveComment(text);
    setComments((prev) => [...prev, saved]); // the "real" confirmed update
  }

  return (
    <div>
      <ul>
        {optimisticComments.map((c) => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
      <form action={handleSubmit}>
        <input name="comment" placeholder="Write a comment..." />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Post a comment and watch closely — it appears instantly with "(sending...)", then a
        second later gets replaced by the real, confirmed version once{' '}
        <code>saveComment</code> actually finishes.
      </p>

      <h2>How it works</h2>
      <p>
        <code>useOptimistic(state, updateFn)</code> takes your real state and a function
        describing how to compute a temporary, "hoped-for" version. The value it returns (
        <code>optimisticComments</code> here) automatically falls back to the real{' '}
        <code>comments</code> once the actual state updates — you never have to manually
        clean up the temporary entry.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 If the real request fails, React automatically reverts the optimistic UI back to
        the last real state — just make sure to handle the error (like showing a "failed to
        send" message) in your own code too.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/useOptimistic" target="_blank" rel="noreferrer">
          react.dev: useOptimistic
        </a>
      </blockquote>
    </>
  )
}
