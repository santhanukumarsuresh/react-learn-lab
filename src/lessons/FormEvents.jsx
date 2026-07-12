import CodeSandbox from '../components/CodeSandbox'

export default function FormEvents() {
  return (
    <>
      <p>
        Forms are how users type things into your app — a search box, a name field, a
        signup form with checkboxes and dropdowns. React gives you two solid ways to read
        what's inside a form: keeping every field in <strong>state</strong> (a{' '}
        <strong>controlled</strong> form), or reading everything at once from the{' '}
        <strong>submit event</strong> using <code>FormData</code>. You'll use both in real
        projects, so let's build both.
      </p>

      <h2>A single controlled text input</h2>
      <CodeSandbox
        code={`function Example() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <input value={name} onChange={handleChange} placeholder="Type your name" />
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Every keystroke fires <code>onChange</code>, which reads the new text from{' '}
        <code>event.target.value</code> and saves it in state. Because the input's{' '}
        <code>value</code> always comes from that same state, React and the input stay in
        sync.
      </p>

      <h2>Every input type, controlled</h2>
      <p>
        Different input types store their value a little differently. Instead of one{' '}
        <code>useState</code> per field, real forms usually keep one object in state and a
        single <code>handleChange</code> that works for every field, keyed by its{' '}
        <code>name</code> attribute:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [form, setForm] = useState({
    name: "",
    age: 10,
    bio: "",
    plan: "free",
    color: "blue",
    subscribe: false,
    birthday: "",
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      // checkboxes use "checked", everything else uses "value"
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const row = { display: "block", marginBottom: 10 };

  return (
    <form>
      <input style={row} name="name" value={form.name} onChange={handleChange} placeholder="Name" />

      {/* number input — value is always a string, even for type="number" */}
      <input style={row} type="number" name="age" value={form.age} onChange={handleChange} />

      <textarea style={row} name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />

      {/* radio buttons: same "name" groups them, "checked" compares to state */}
      <label style={row}>
        <input type="radio" name="plan" value="free" checked={form.plan === "free"} onChange={handleChange} />
        {" "}Free
      </label>
      <label style={row}>
        <input type="radio" name="plan" value="pro" checked={form.plan === "pro"} onChange={handleChange} />
        {" "}Pro
      </label>

      <select style={row} name="color" value={form.color} onChange={handleChange}>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
      </select>

      {/* checkboxes use "checked", not "value" */}
      <label style={row}>
        <input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} />
        {" "}Subscribe to newsletter
      </label>

      <input style={row} type="date" name="birthday" value={form.birthday} onChange={handleChange} />

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

render(<Example />);`}
      />
      <p>Try changing every field — the live JSON at the bottom updates instantly.</p>
      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        ⚠️ Two gotchas that trip people up: <strong>checkboxes</strong> read/write{' '}
        <code>checked</code>, not <code>value</code>. And <strong>radio buttons</strong>{' '}
        need the exact same <code>name</code> to form a group — each one checks itself by
        comparing its own <code>value</code> to the current state.
      </div>

      <h2>Handling submission with state</h2>
      <p>
        When the user submits a form, call <code>event.preventDefault()</code> to stop the
        browser's default full-page reload, then do whatever you need with the state you
        already have:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Say hi</button>
      {submitted && <p>Hi, {submitted}! 👋</p>}
    </form>
  );
}

render(<Example />);`}
      />

      <h2>Handling submission with FormData (no state needed)</h2>
      <p>
        Here's the other way — and it's important to know, because you'll see it constantly
        in real projects. Instead of wiring up a piece of state for every single field, you
        can let the browser track the values, and grab <em>all</em> of them at once from
        the submit event using <code>new FormData(event.target)</code>:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"),
      age: Number(formData.get("age")),
      bio: formData.get("bio"),
      plan: formData.get("plan"),
      color: formData.get("color"),
      // a single checkbox: present in FormData only if checked
      subscribe: formData.has("subscribe"),
      // multiple checkboxes sharing one name: use getAll for an array
      interests: formData.getAll("interests"),
    };

    setResult(data);
  }

  const row = { display: "block", marginBottom: 10 };

  return (
    <form onSubmit={handleSubmit}>
      <input style={row} name="name" defaultValue="Ava" placeholder="Name" />
      <input style={row} type="number" name="age" defaultValue={10} />
      <textarea style={row} name="bio" defaultValue="Loves React" />

      <label style={row}>
        <input type="radio" name="plan" value="free" defaultChecked />
        {" "}Free
      </label>
      <label style={row}>
        <input type="radio" name="plan" value="pro" />
        {" "}Pro
      </label>

      <select style={row} name="color" defaultValue="green">
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
      </select>

      <label style={row}>
        <input type="checkbox" name="subscribe" defaultChecked />
        {" "}Subscribe to newsletter
      </label>

      <label style={row}>
        <input type="checkbox" name="interests" value="react" defaultChecked />
        {" "}React
      </label>
      <label style={row}>
        <input type="checkbox" name="interests" value="css" />
        {" "}CSS
      </label>

      <button type="submit" style={{ marginTop: 4 }}>Submit</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}

render(<Example />);`}
      />
      <p>
        Click Submit and watch the JSON appear — every field's value was captured from a
        single <code>FormData</code> object, without a single <code>useState</code> call.
        Notice the fields use <code>defaultValue</code>/<code>defaultChecked</code> instead
        of <code>value</code>/<code>checked</code> — that's what makes them{' '}
        <strong>uncontrolled</strong>: the browser (not React state) tracks what the user
        types, and you only read it when you actually need it, at submit time.
      </p>

      <h2>The FormData cheat sheet</h2>
      <ul>
        <li>
          <strong>Text, number, email, date, select, textarea</strong> —{' '}
          <code>formData.get("fieldName")</code> (always returns a string — convert numbers
          yourself with <code>Number(...)</code>).
        </li>
        <li>
          <strong>A single checkbox</strong> — <code>formData.has("fieldName")</code>{' '}
          (true if checked, since unchecked checkboxes aren't included in FormData at all).
        </li>
        <li>
          <strong>Radio buttons</strong> — <code>formData.get("groupName")</code> returns
          the <code>value</code> of whichever one is checked.
        </li>
        <li>
          <strong>Multiple checkboxes, same name</strong> —{' '}
          <code>formData.getAll("fieldName")</code> returns an array of every checked
          value.
        </li>
      </ul>

      <h2>So which one should you use?</h2>
      <ul>
        <li>
          <strong>Controlled (state)</strong> — when you need to react to every keystroke:
          live validation, showing a character count, disabling a button until a field is
          valid, or syncing multiple fields together.
        </li>
        <li>
          <strong>FormData</strong> — for simpler forms where you only care about the
          values at submit time. Less code, no re-renders on every keystroke, and it's the
          exact pattern the <code>useActionState</code> Hook you learned earlier is built
          around.
        </li>
      </ul>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/FormData"
          target="_blank"
          rel="noreferrer"
        >
          MDN: FormData
        </a>
      </blockquote>
    </>
  )
}
