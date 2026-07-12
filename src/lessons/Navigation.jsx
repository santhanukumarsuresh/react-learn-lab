import CodeSandbox from '../components/CodeSandbox'
import CodeBlock from '../components/CodeBlock'

export default function Navigation() {
  return (
    <>
      <p>
        You've already met <code>&lt;Link&gt;</code> — it's how you write clickable
        navigation in React Router, instead of a regular <code>&lt;a&gt;</code> tag. Let's
        look at a couple more tools for moving between pages.
      </p>

      <h2>Why not a plain &lt;a&gt; tag?</h2>
      <p>
        A regular link makes the browser throw away the whole page and fetch a new one from
        the server — slow, and it loses all your app's state. <code>&lt;Link&gt;</code>{' '}
        swaps the page instantly, without a reload.
      </p>

      <h2>NavLink: know which page is active</h2>
      <p>
        <code>&lt;NavLink&gt;</code> works just like <code>&lt;Link&gt;</code>, but it can
        style itself differently when it matches the current page — perfect for
        highlighting the active tab in a menu:
      </p>
      <CodeBlock>{`import { NavLink } from "react-router-dom";

function Nav() {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "#0284c7" : "#64748b",
  });

  return (
    <nav>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/shop" style={linkStyle}>Shop</NavLink>
    </nav>
  );
}`}</CodeBlock>

      <p>
        This sandbox's sidebar on the left is actually using this exact pattern — the
        current lesson is always highlighted!
      </p>

      <h2>Navigating from code</h2>
      <p>
        Sometimes you need to send the user to a new page after something happens — like
        after they submit a form. The <code>useNavigate</code> hook gives you a function for
        that:
      </p>
      <CodeBlock>{`import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // ...save the form...
    navigate("/thanks");
  }

  return <form onSubmit={handleSubmit}>{/* fields */}</form>;
}`}</CodeBlock>

      <p>
        Here's the same idea acted out with plain state, since we can't nest a second live
        router inside this page's own router:
      </p>
      <CodeSandbox
        code={`function Home({ goTo }) {
  return (
    <div>
      <h2>🏠 Home</h2>
      <button onClick={() => goTo("thanks")}>Continue</button>
    </div>
  );
}
function Thanks() {
  return <h2>🎉 Thanks!</h2>;
}

function Example() {
  const [page, setPage] = useState("home");

  return page === "home" ? <Home goTo={setPage} /> : <Thanks />;
}

render(<Example />);`}
      />

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://reactrouter.com/api/hooks/useNavigate" target="_blank" rel="noreferrer">
          reactrouter.com: useNavigate
        </a>
      </blockquote>
    </>
  )
}
