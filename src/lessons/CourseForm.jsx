import CodeSandbox from '../components/CodeSandbox'

export default function CourseForm() {
  return (
    <>
      <p>
        Now let's build the "Add a Course" form. Real forms need more than just controlled
        inputs — they need <strong>validation</strong>, so users get clear feedback instead
        of silently broken data, and a nice touch like auto-focusing the first field.
      </p>

      <h2>Building the validated form</h2>
      <CodeSandbox
        code={`function validateField(name, value) {
  if (name === "title" && (!value || value.trim() === "")) {
    return "Course title is required";
  }
  if (name === "category" && !value) {
    return "Please choose a category";
  }
  return "";
}

function CourseForm({ onSave }) {
  const titleInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    isFree: false,
  });
  const [errors, setErrors] = useState({ title: "", category: "" });

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const titleError = validateField("title", formData.title);
    const categoryError = validateField("category", formData.category);

    if (titleError || categoryError) {
      setErrors({ title: titleError, category: categoryError });
      return;
    }
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <br />
        <input ref={titleInputRef} name="title" value={formData.title} onChange={handleChange} />
        <div style={{ color: "red", fontSize: 12 }}>{errors.title}</div>
      </div>
      <div>
        <label>Category</label>
        <br />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Choose...</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="design">Design</option>
        </select>
        <div style={{ color: "red", fontSize: 12 }}>{errors.category}</div>
      </div>
      <div>
        <label>
          <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} />
          Free course
        </label>
      </div>
      <button type="submit">Save Course</button>
    </form>
  );
}

function Example() {
  const [saved, setSaved] = useState(null);
  return (
    <div>
      <CourseForm onSave={setSaved} />
      {saved && <p>✅ Saved: {saved.title} ({saved.category})</p>}
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Try clicking "Save Course" with nothing filled in — you'll see both error messages
        appear. Notice a few patterns worth calling out:
      </p>
      <ul>
        <li>
          <code>titleInputRef</code> + a one-time <code>useEffect</code> auto-focuses the
          first field when the form appears — a nice touch for usability.
        </li>
        <li>
          <code>validateField</code> is a small, reusable, pure function — easy to test on
          its own, separate from the component.
        </li>
        <li>
          Errors clear themselves the moment the user starts fixing that specific field,
          rather than lingering until the next submit.
        </li>
      </ul>
    </>
  )
}
