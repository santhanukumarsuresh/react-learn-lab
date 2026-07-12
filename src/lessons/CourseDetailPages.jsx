import CodeSandbox from '../components/CodeSandbox'

export default function CourseDetailPages() {
  return (
    <>
      <p>
        The last piece: giving each course its own dedicated page, reachable at a URL like{' '}
        <code>/courses/2</code>, using everything you learned about React Router and route
        parameters. We'll also build a reusable <code>useFetch</code> custom hook — a
        pattern used constantly in real-world React apps.
      </p>

      <h2>A reusable useFetch hook</h2>
      <p>
        Instead of repeating loading/error logic in every component that needs data, we
        wrap it once in a custom hook. Notice the <code>ignore</code> flag in the cleanup —
        it prevents a subtle bug where a slow, outdated request could overwrite fresher data
        if the user navigates away and back quickly:
      </p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`function useFetch(fetchFunction) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      const result = await fetchFunction();
      if (!ignore) {
        setData(result);
        setIsLoading(false);
      }
    }
    load();

    return () => {
      ignore = true;
    };
  }, [fetchFunction]);

  return { data, isLoading };
}`}</code>
      </pre>

      <h2>Putting it together with routing</h2>
      <p>
        Since we can't nest a second live router inside this page's own router, here's the
        pattern acted out with state standing in for the URL, exactly like earlier routing
        lessons:
      </p>
      <CodeSandbox
        code={`const courses = {
  "1": { title: "React Fundamentals", instructor: "Ava Chen", description: "Learn React from the ground up." },
  "2": { title: "JavaScript Deep Dive", instructor: "Leo Martins", description: "Master modern JavaScript." },
};

function getCourse(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(courses[id]), 800);
  });
}

function useFetch(fetchFunction) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    fetchFunction().then((result) => {
      if (!ignore) {
        setData(result);
        setIsLoading(false);
      }
    });
    return () => { ignore = true; };
  }, [fetchFunction]);

  return { data, isLoading };
}

function CourseDetailPage({ courseId, onBack }) {
  const { data: course, isLoading } = useFetch(() => getCourse(courseId));

  if (isLoading) return <p>Loading course...</p>;

  return (
    <div>
      <button onClick={onBack}>← Back to catalog</button>
      <h2>{course.title}</h2>
      <p>by {course.instructor}</p>
      <p>{course.description}</p>
    </div>
  );
}

function HomePage({ onSelectCourse }) {
  return (
    <ul>
      {Object.entries(courses).map(([id, course]) => (
        <li key={id}>
          <button onClick={() => onSelectCourse(id)}>{course.title}</button>
        </li>
      ))}
    </ul>
  );
}

function Example() {
  const [selectedId, setSelectedId] = useState(null);

  return selectedId ? (
    <CourseDetailPage courseId={selectedId} onBack={() => setSelectedId(null)} />
  ) : (
    <HomePage onSelectCourse={setSelectedId} />
  );
}

render(<Example />);`}
      />

      <p>In a real project with React Router, the route setup looks like this instead:</p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/courses/:courseId" element={<CourseDetailPage />} />
</Routes>

// inside CourseDetailPage:
const { courseId } = useParams();
const { data: course, isLoading } = useFetch(() => getCourse(courseId));`}</code>
      </pre>

      <p>
        And with that, the Course Catalog is complete! You've now built a project using
        list rendering, forms with validation, interactive state updates, a real (simulated)
        API call with loading and error states, memoized statistics, custom hooks, and
        client-side routing with route parameters — the same skills used to build real
        production React apps.
      </p>
    </>
  )
}
