import CodeSandbox from '../components/CodeSandbox'

export default function CourseCatalogOverview() {
  return (
    <>
      <p>
        Time for a bigger project! Over the next several lessons, you'll build a{' '}
        <strong>Course Catalog</strong> — a small app for browsing online courses, complete
        with a form to add new courses, real (simulated) API calls, computed statistics,
        and dedicated detail pages with routing. It pulls together nearly everything you've
        learned into one real app.
      </p>

      <h2>What we're building</h2>
      <ul>
        <li>A homepage listing all courses, with their title, instructor, and rating</li>
        <li>A validated form for adding a new course</li>
        <li>A "favorite" toggle on each course (interactivity)</li>
        <li>A simulated API call when saving a course, with loading and error states</li>
        <li>Computed statistics, like the average rating across all courses</li>
        <li>A dedicated page for each course, reachable at its own URL</li>
      </ul>

      <h2>Step 1: rendering the list</h2>
      <p>
        Every project starts with getting some data on screen. Here's our starting course
        data and the list that renders it:
      </p>
      <CodeSandbox
        code={`const courses = [
  { id: 1, title: "React Fundamentals", instructor: "Ava Chen", rating: 5 },
  { id: 2, title: "JavaScript Deep Dive", instructor: "Leo Martins", rating: 4 },
  { id: 3, title: "CSS for Developers", instructor: "Mia Torres", rating: 4 },
];

function StarRating({ rating }) {
  return <span>{"⭐".repeat(rating)}</span>;
}

function CourseCard({ course }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
      <strong>{course.title}</strong>
      <p>by {course.instructor}</p>
      <StarRating rating={course.rating} />
    </div>
  );
}

function Example() {
  return (
    <div>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Nothing new here — <code>.map()</code>, a unique <code>key</code>, and breaking the
        UI into small components, just like you've practiced throughout this course. The
        rest of the project builds on top of exactly this foundation.
      </p>
    </>
  )
}
