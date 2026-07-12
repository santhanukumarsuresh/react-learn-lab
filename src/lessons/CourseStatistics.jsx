import CodeSandbox from '../components/CodeSandbox'

export default function CourseStatistics() {
  return (
    <>
      <p>
        Let's add a stats bar at the top of the catalog: total courses, average rating, and
        how many are free. These are all values <em>derived</em> from our course list —
        exactly the kind of calculation you learned to wrap in <code>useMemo</code> when it
        might get expensive.
      </p>

      <CodeSandbox
        code={`const courses = [
  { id: 1, title: "React Fundamentals", rating: 5, isFree: false },
  { id: 2, title: "JavaScript Deep Dive", rating: 4, isFree: true },
  { id: 3, title: "CSS for Developers", rating: 4, isFree: true },
  { id: 4, title: "Advanced TypeScript", rating: 5, isFree: false },
];

function useCourseStats(courses) {
  return useMemo(() => {
    const total = courses.length;
    const freeCount = courses.filter((c) => c.isFree).length;
    const averageRating =
      courses.reduce((sum, c) => sum + c.rating, 0) / total;

    return { total, freeCount, averageRating: averageRating.toFixed(1) };
  }, [courses]);
}

function StatsBar({ stats }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: 8, background: "#f1f5f9" }}>
      <span>📚 {stats.total} courses</span>
      <span>⭐ {stats.averageRating} avg rating</span>
      <span>🆓 {stats.freeCount} free</span>
    </div>
  );
}

function Example() {
  const stats = useCourseStats(courses);
  return (
    <div>
      <StatsBar stats={stats} />
      <ul>
        {courses.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        We wrapped the whole calculation in a custom hook, <code>useCourseStats</code>,
        which itself uses <code>useMemo</code> internally — combining two ideas you've
        already learned. This is a great example of a custom hook: it's reusable, and
        anyone using it doesn't need to know or care that memoization is happening inside.
      </p>

      <p>
        Since <code>courses</code> only changes when a course is actually added or edited,
        the stats only get recalculated then — not on every unrelated re-render, like
        toggling a favorite on a different course elsewhere in the app.
      </p>
    </>
  )
}
