import CodeBlock from '../components/CodeBlock'

export default function Modules() {
  return (
    <>
      <p>
        A React project is made of many small files, each holding a piece of code — a
        component, a function, some data. <strong>Modules</strong> are how those files share
        code with each other, using two keywords: <code>export</code> and <code>import</code>.
      </p>

      <h2>Exporting from a file</h2>
      <p>
        Say you have a file called <code>Greeting.jsx</code> with a component inside it. To
        let other files use it, you <strong>export</strong> it:
      </p>
      <CodeBlock>{`// Greeting.jsx
export default function Greeting() {
  return <h1>Hello there!</h1>;
}`}</CodeBlock>

      <p>
        <code>export default</code> means "this is the main thing this file offers." Each
        file can only have one default export.
      </p>

      <h2>Importing into another file</h2>
      <p>Now another file can bring that component in with an import:</p>
      <CodeBlock>{`// App.jsx
import Greeting from "./Greeting.jsx";

function App() {
  return <Greeting />;
}`}</CodeBlock>

      <h2>Named exports</h2>
      <p>
        Sometimes a file shares several things, not just one. Use <strong>named
        exports</strong> for that — you write the item's name in curly braces on both ends:
      </p>
      <CodeBlock>{`// mathHelpers.js
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}`}</CodeBlock>
      <CodeBlock>{`// App.jsx
import { add, subtract } from "./mathHelpers.js";`}</CodeBlock>

      <h2>Quick rule of thumb</h2>
      <ul>
        <li>
          <code>export default</code> → one main thing per file, imported <em>without</em>{' '}
          curly braces.
        </li>
        <li>
          <code>export</code> (named) → many things per file, imported <em>with</em> curly
          braces, using the exact same name.
        </li>
      </ul>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
          target="_blank"
          rel="noreferrer"
        >
          MDN: JavaScript modules
        </a>
      </blockquote>
    </>
  )
}
