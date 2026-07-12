import CodeSandbox from '../components/CodeSandbox'
import CodeBlock from '../components/CodeBlock'

export default function BasicRouting() {
  return (
    <>
      <p>
        So far, every lesson has been a single page. Real websites usually have several
        pages — a home page, an about page, a contact page — and clicking a link should
        switch between them <em>without</em> a full page reload. That's what{' '}
        <strong>React Router</strong> does.
      </p>

      <h2>Installing it</h2>
      <CodeBlock>{`npm install react-router-dom`}</CodeBlock>

      <h2>The building blocks</h2>
      <ul>
        <li>
          <code>&lt;BrowserRouter&gt;</code> — wraps your whole app once, at the very top,
          and keeps track of the current URL.
        </li>
        <li>
          <code>&lt;Routes&gt;</code> — a container that looks at the current URL and picks
          which page to show.
        </li>
        <li>
          <code>&lt;Route&gt;</code> — maps one URL path to one component.
        </li>
        <li>
          <code>&lt;Link&gt;</code> — a clickable link that changes the URL without
          reloading the page.
        </li>
      </ul>

      <p>Here's what a tiny two-page app looks like in real React Router code:</p>
      <CodeBlock>{`import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>🏠 Home Page</h2>;
}

function About() {
  return <h2>ℹ️ About Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`}</CodeBlock>

      <p>
        Because this course's own pages are already built with React Router, we can't nest
        a second live router inside this lesson's sandbox. Instead, here's a simplified demo
        using plain state that mimics exactly what's happening under the hood — swapping
        which "page" is shown, without a reload:
      </p>
      <CodeSandbox
        code={`function Home() {
  return <h2>🏠 Home Page</h2>;
}

function About() {
  return <h2>ℹ️ About Page</h2>;
}

function Example() {
  const [path, setPath] = useState("/");

  return (
    <div>
      <nav>
        <a onClick={() => setPath("/")} style={{ cursor: "pointer", marginRight: 8 }}>
          Home
        </a>
        |
        <a onClick={() => setPath("/about")} style={{ cursor: "pointer", marginLeft: 8 }}>
          About
        </a>
      </nav>
      {path === "/" ? <Home /> : <About />}
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        That's the core idea: React Router watches the URL and swaps components, just like{' '}
        <code>path</code> swaps components here — except it also updates the real browser
        address bar and lets the back/forward buttons work.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://reactrouter.com/start/framework/routing" target="_blank" rel="noreferrer">
          reactrouter.com: Routing
        </a>
      </blockquote>
    </>
  )
}
