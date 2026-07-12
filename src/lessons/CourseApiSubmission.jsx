import CodeSandbox from '../components/CodeSandbox'

export default function CourseApiSubmission() {
  return (
    <>
      <p>
        So far our form just saved data to local state instantly. Real apps send that data
        to a server — which takes time, and can fail. Let's build a proper{' '}
        <strong>service layer</strong> that simulates a real API call with a Promise, then
        wire our form up to handle loading and error states correctly.
      </p>

      <h2>Step 1: a service function that "talks to a server"</h2>
      <p>
        Real API calls use <code>fetch</code>. To practice the exact same async patterns
        without needing a real backend, we'll simulate one with a Promise and{' '}
        <code>setTimeout</code> — this mirrors precisely how a real{' '}
        <code>fetch(...)</code> call behaves: it takes time, and it can succeed or fail.
      </p>
      <CodeSandbox
        code={`function saveCourse(course) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!course.title || course.title.trim() === "") {
        reject(new Error("Title is required"));
        return;
      }
      resolve({ ...course, id: Date.now() });
    }, 1200); // pretend the network takes 1.2 seconds
  });
}

function Example() {
  const [status, setStatus] = useState("idle"); // idle | saving | success | error
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;

    setStatus("saving");
    try {
      const saved = await saveCourse({ title });
      setStatus("success");
      console.log("Saved!", saved);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Course title" disabled={status === "saving"} />
      <button type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Saving..." : "Save Course"}
      </button>
      {status === "success" && <p style={{ color: "green" }}>✅ Course saved!</p>}
      {status === "error" && <p style={{ color: "red" }}>❌ {errorMessage}</p>}
    </form>
  );
}

render(<Example />);`}
      />

      <p>
        Try submitting with an empty title — after about a second, you'll see the error
        message. Fill in a title and it'll succeed instead. Notice how the button is
        disabled and shows "Saving..." the whole time the promise is pending, so the user
        always knows what's happening.
      </p>

      <h2>The same idea, with a real fetch call</h2>
      <p>In a real project talking to a real backend, the service function looks like this:</p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`async function saveCourse(course) {
  const response = await fetch("https://api.example.com/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error("Failed to save course");
  }

  return response.json();
}`}</code>
      </pre>
      <p>
        Everything else — the <code>try/catch</code>, the <code>status</code> state, the
        disabled button — stays exactly the same. That's the real payoff of learning
        promises and async/await properly: the pattern doesn't change whether you're
        talking to a fake timer or a real server.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 You could also build this exact form with <code>useActionState</code>, which you
        learned earlier — it bundles the status/error/pending tracking into one Hook
        instead of three separate pieces of state. Both approaches are valid; many existing
        codebases still use the manual pattern shown here.
      </div>
    </>
  )
}
