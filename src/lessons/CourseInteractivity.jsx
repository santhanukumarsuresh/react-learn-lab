import CodeSandbox from '../components/CodeSandbox'

export default function CourseInteractivity() {
  return (
    <>
      <p>
        A static list isn't very fun. Let's add interactivity: a favorite ⭐ toggle on each
        course, and an enroll button that bumps a student count — both updating state the
        safe, immutable way you practiced earlier.
      </p>

      <CodeSandbox
        code={`const initialCourses = [
  { id: 1, title: "React Fundamentals", students: 128, isFavorite: false },
  { id: 2, title: "JavaScript Deep Dive", students: 84, isFavorite: false },
  { id: 3, title: "CSS for Developers", students: 61, isFavorite: true },
];

function CourseCard({ course, onToggleFavorite, onEnroll }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
      <strong>{course.title}</strong>
      <button onClick={() => onToggleFavorite(course.id)} style={{ marginLeft: 8 }}>
        {course.isFavorite ? "⭐" : "☆"}
      </button>
      <p>{course.students} students enrolled</p>
      <button onClick={() => onEnroll(course.id)}>Enroll</button>
    </div>
  );
}

function Example() {
  const [courses, setCourses] = useState(initialCourses);

  function toggleFavorite(id) {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  }

  function enroll(id) {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, students: c.students + 1 } : c))
    );
  }

  return (
    <div>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onToggleFavorite={toggleFavorite}
          onEnroll={enroll}
        />
      ))}
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Both handlers follow the same shape: <code>.map()</code> over the array, and for the
        one matching item, spread it into a new object with just the changed field updated.
        Everything else stays exactly the same — no mutation, so React reliably notices the
        change and re-renders.
      </p>
    </>
  )
}
