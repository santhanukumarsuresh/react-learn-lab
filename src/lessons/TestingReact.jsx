import CodeBlock from '../components/CodeBlock'

export default function TestingReact() {
  return (
    <>
      <p>
        Tests give you confidence that your components keep working as you change code
        around them. The industry-standard tool for React is{' '}
        <strong>React Testing Library</strong> (RTL), usually paired with a test runner
        like <strong>Vitest</strong> or Jest. Its core philosophy: test your components the
        way a <em>user</em> actually interacts with them, not their internal implementation
        details.
      </p>

      <h2>A basic component test</h2>
      <CodeBlock>{`// Counter.jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Counter.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Counter from "./Counter";

describe("Counter", () => {
  it("starts at 0 and increments when clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Increment" }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});`}</CodeBlock>

      <h2>The "testing philosophy" that matters most</h2>
      <ul>
        <li>
          <strong>Query like a user would find things</strong> — RTL's{' '}
          <code>getByRole</code>, <code>getByLabelText</code>, and{' '}
          <code>getByText</code> mimic how a real person or assistive technology would
          locate elements, rather than reaching into internal component state or
          implementation details.
        </li>
        <li>
          <strong>Interact, don't manually trigger</strong> —{' '}
          <code>userEvent.click(...)</code> simulates a real click (including focus, hover,
          etc.), instead of manually calling <code>onClick()</code> as a function.
        </li>
        <li>
          <strong>Assert on what's visible</strong> — check what text/elements appear on
          screen, not whether a particular piece of internal state equals a particular
          value.
        </li>
      </ul>

      <h2>Testing async behavior (like our form submission)</h2>
      <p>
        Remember the Course Catalog's promise-based form? Testing it means waiting for the
        UI to update after the "API call" resolves, using <code>findBy*</code> queries
        (which wait) instead of <code>getBy*</code> (which check immediately):
      </p>
      <CodeBlock>{`it("shows a success message after saving", async () => {
  const user = userEvent.setup();
  render(<CourseForm />);

  await user.type(screen.getByPlaceholderText("Course title"), "React Testing");
  await user.click(screen.getByRole("button", { name: /save course/i }));

  // findBy* automatically waits/retries until the element appears
  expect(await screen.findByText(/course saved/i)).toBeInTheDocument();
});`}</CodeBlock>

      <h2>Mocking network requests</h2>
      <p>
        For components that call real <code>fetch</code>, tests typically use a library
        like <strong>MSW</strong> (Mock Service Worker) to intercept network requests and
        return fake responses — so tests run fast, offline, and deterministically, without
        hitting a real server.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ Avoid snapshot tests as your main strategy — they compare a rendered output
        blob against a saved file, and tend to "pass" even after accidentally breaking
        something, as long as the developer blindly updates the snapshot. Prefer explicit
        assertions about specific, meaningful behavior instead.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank" rel="noreferrer">
          testing-library.com: React Testing Library
        </a>
      </blockquote>
    </>
  )
}
