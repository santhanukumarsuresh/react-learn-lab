import CodeBlock from '../components/CodeBlock'

export default function ServerComponents() {
  return (
    <>
      <p>
        Everything you've built in this course is a <strong>Client Component</strong> — it
        runs in the browser. React Server Components (RSC) introduce a second kind of
        component that runs <em>only on the server</em>, never shipping its code to the
        browser at all. This is the architecture behind modern frameworks like Next.js
        (App Router).
      </p>

      <h2>The problem RSC solves</h2>
      <p>
        Traditionally, if a component needs data from a database, you'd fetch it
        client-side with <code>useEffect</code> — meaning the browser has to download
        React, download your component code, run it, discover it needs data,{' '}
        <em>then</em> make a request, and finally render. That's several round trips before
        the user sees real content.
      </p>

      <h2>Server Components: fetch and render before it ever reaches the browser</h2>
      <CodeBlock>{`// CourseList.jsx — a Server Component (no "use client" directive)
async function CourseList() {
  const courses = await db.courses.findMany(); // runs on the server, directly

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>
      <p>
        Notice this component is an <code>async function</code> that awaits data directly
        in its body — no <code>useEffect</code>, no loading state, no client-side fetch at
        all. It runs entirely on the server, and the browser receives ready-made HTML
        (or a compact description of it) — none of this component's code, or the database
        client it uses, is ever sent to the browser.
      </p>

      <h2>Mixing server and client components</h2>
      <p>
        Interactive parts (anything using <code>useState</code>, <code>onClick</code>,
        etc.) still need to run in the browser — those are marked explicitly with a{' '}
        <code>"use client"</code> directive at the top of the file:
      </p>
      <CodeBlock>{`"use client";

function FavoriteButton({ courseId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <button onClick={() => setIsFavorite(!isFavorite)}>
      {isFavorite ? "★" : "☆"}
    </button>
  );
}`}</CodeBlock>
      <p>
        A Server Component can render a Client Component as a child (like{' '}
        <code>FavoriteButton</code> inside <code>CourseList</code>) — the server renders
        everything it can, and just the interactive islands get hydrated with JavaScript
        in the browser.
      </p>

      <h2>Streaming SSR: sending HTML in pieces</h2>
      <p>
        Traditional server-side rendering waits for the <em>entire</em> page's data before
        sending anything. <strong>Streaming</strong> lets the server send the parts of the
        page that are ready immediately, while slower parts (wrapped in{' '}
        <code>&lt;Suspense&gt;</code>) stream in afterward:
      </p>
      <CodeBlock>{`function CoursePage() {
  return (
    <div>
      <Header /> {/* sent immediately */}
      <Suspense fallback={<Skeleton />}>
        <SlowRecommendations /> {/* streams in once ready */}
      </Suspense>
    </div>
  );
}`}</CodeBlock>
      <p>
        This is the exact same <code>&lt;Suspense&gt;</code> component you already learned
        for code splitting — it does double duty for streaming data on the server too.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 This is a big architectural shift, and typically you don't hand-roll it — you
        adopt it through a framework like Next.js that implements the server/client
        boundary, routing, and streaming for you. Understanding the concepts here helps you
        reason about performance and data-loading decisions, even if a framework handles the
        plumbing.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/reference/rsc/server-components"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Server Components
        </a>
      </blockquote>
    </>
  )
}
