import CodeBlock from '../components/CodeBlock'

export default function ImportingExporting() {
  return (
    <>
      <p>
        You already learned the general rules for <code>import</code>/<code>export</code> in
        the JavaScript warm-up. Now let's look at how that applies specifically to
        organizing React components across files — something every real project needs.
      </p>

      <h2>One main component per file</h2>
      <p>
        The most common pattern is: each file exports one main component as its{' '}
        <code>default</code> export, named after the file itself.
      </p>
      <CodeBlock>{`// Avatar.jsx
export default function Avatar({ name }) {
  return <span>🧑 {name}</span>;
}`}</CodeBlock>
      <CodeBlock>{`// App.jsx
import Avatar from "./Avatar.jsx";

function App() {
  return <Avatar name="Ava" />;
}`}</CodeBlock>

      <h2>A file can have several components</h2>
      <p>
        Sometimes a small helper component only makes sense next to the component that uses
        it. It's fine to define more than one component in a file — just make sure only one
        is the <code>default</code> export:
      </p>
      <CodeBlock>{`// UserCard.jsx
function Avatar({ name }) {
  return <span>🧑 {name}</span>;
}

export default function UserCard({ name, role }) {
  return (
    <div>
      <Avatar name={name} />
      <p>{role}</p>
    </div>
  );
}`}</CodeBlock>
      <p>
        Here, <code>Avatar</code> is only used inside this file, so it doesn't need its own
        export — only <code>UserCard</code>, the one other files actually need, is exported.
      </p>

      <h2>Exporting several components by name</h2>
      <p>
        If a file genuinely offers multiple components to the outside world — like a small
        library of icons — use named exports for each one:
      </p>
      <CodeBlock>{`// icons.jsx
export function StarIcon() {
  return <span>⭐</span>;
}
export function HeartIcon() {
  return <span>❤️</span>;
}`}</CodeBlock>
      <CodeBlock>{`// App.jsx
import { StarIcon, HeartIcon } from "./icons.jsx";`}</CodeBlock>

      <h2>A quick way to decide</h2>
      <ul>
        <li>One component is the "point" of this file → <code>export default</code>.</li>
        <li>
          Several components are equally important and used from other files →{' '}
          named exports for each.
        </li>
        <li>
          A component is only a helper for another component in the same file → don't
          export it at all.
        </li>
      </ul>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/importing-and-exporting-components"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Importing and Exporting Components
        </a>
      </blockquote>
    </>
  )
}
