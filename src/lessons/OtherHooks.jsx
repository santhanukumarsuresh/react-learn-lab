import CodeBlock from '../components/CodeBlock'

export default function OtherHooks() {
  return (
    <>
      <p>
        That covers every hook you'll use in day-to-day React work. There are two more,
        extremely rare Hooks worth knowing exist, even if you'll almost never write them
        yourself.
      </p>

      <h2>useDebugValue: labeling custom hooks in DevTools</h2>
      <p>
        When you inspect a component in React DevTools, custom hooks show up in the
        component's Hooks list. <code>useDebugValue</code> lets you attach a friendly label
        to make that list easier to read — purely a developer-experience tool, with zero
        effect on how your app runs:
      </p>
      <CodeBlock>{`function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useDebugValue(isOnline ? "Online ✅" : "Offline ❌");

  // ...rest of the hook
  return isOnline;
}`}</CodeBlock>
      <p>
        Without it, DevTools would just show the raw internal state. With it, anyone
        inspecting your custom hook sees a clear, human-readable summary instead.
      </p>

      <h2>useInsertionEffect: for CSS-in-JS library authors</h2>
      <p>
        This one is the most specialized Hook in React — it exists almost exclusively for
        authors of styling libraries (like styled-components or Emotion) who need to inject{' '}
        <code>&lt;style&gt;</code> tags into the page <em>before</em> any layout effects run,
        to avoid a flash of unstyled content. Application code essentially never calls this
        directly.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 You now know every Hook that ships with React. In real projects, you'll spend
        95% of your time with just <code>useState</code>, <code>useEffect</code>,{' '}
        <code>useRef</code>, and <code>useContext</code> — the rest are specialized tools
        for specific performance or library-authoring problems, good to recognize, not
        necessary to memorize.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/reference/react/hooks" target="_blank" rel="noreferrer">
          react.dev: Built-in React Hooks (full list)
        </a>
      </blockquote>
    </>
  )
}
