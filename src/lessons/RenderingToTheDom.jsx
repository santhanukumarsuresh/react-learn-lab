import CodeBlock from '../components/CodeBlock'

export default function RenderingToTheDom() {
  return (
    <>
      <p>
        You've been writing components this whole time, but how does React actually get
        them onto the screen? Let's peek behind the curtain at the very first few lines of
        code that kick off every React app.
      </p>

      <h2>The one real HTML element</h2>
      <p>
        Every React app starts with a normal, plain HTML file with one empty element,
        usually a <code>&lt;div&gt;</code>, that acts as a placeholder:
      </p>
      <CodeBlock>{`<!-- index.html -->
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>`}</CodeBlock>
      <p>
        That single empty <code>&lt;div id="root"&gt;</code> is where your <em>entire</em>{' '}
        React app will live.
      </p>

      <h2>createRoot: telling React where to work</h2>
      <p>
        In your JavaScript entry file, you tell React to take control of that div using{' '}
        <code>createRoot</code>:
      </p>
      <CodeBlock>{`// main.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);`}</CodeBlock>

      <p>
        <code>document.getElementById("root")</code> grabs that plain HTML div,{' '}
        <code>createRoot(...)</code> hands control of it to React, and <code>.render(&lt;App /&gt;)</code>{' '}
        tells React "draw my whole app, starting from this one component, inside here."
      </p>

      <h2>Everything else grows from there</h2>
      <p>
        From that single <code>&lt;App /&gt;</code>, your whole app branches out — App
        renders other components, which render other components, and so on. This is why
        it's so important that a component only returns one root element: React needs a
        single starting point at every level to know what to draw next.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 You'll almost never touch this file after setting up a project — tools like Vite
        generate it for you automatically. But knowing it's there helps demystify exactly
        how a React app "boots up."
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react-dom/client/createRoot" target="_blank" rel="noreferrer">
          react.dev: createRoot
        </a>
      </blockquote>
    </>
  )
}
