import CodeSandbox from '../components/CodeSandbox'

export default function Accessibility() {
  return (
    <>
      <p>
        Accessibility (often shortened to <strong>a11y</strong> — "a", 11 letters, "y")
        means building apps that work for everyone, including people using screen readers,
        keyboard-only navigation, or other assistive technology. It's not an "extra
        feature" — it's part of building correctly.
      </p>

      <h2>Semantic HTML is your first, best tool</h2>
      <p>
        Before reaching for ARIA attributes, use the right HTML element. A real{' '}
        <code>&lt;button&gt;</code> is keyboard-focusable, announced correctly by screen
        readers, and triggerable with Enter/Space — all for free. A{' '}
        <code>&lt;div onClick=...&gt;</code> gets none of that automatically:
      </p>
      <CodeSandbox
        code={`function Example() {
  return (
    <div>
      {/* 🚫 Not focusable, not announced as a button, Enter/Space do nothing */}
      <div onClick={() => alert("clicked")} style={{ cursor: "pointer", color: "blue" }}>
        Fake button (div)
      </div>

      {/* ✅ Keyboard accessible and announced correctly, for free */}
      <button onClick={() => alert("clicked")}>
        Real button
      </button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Try tabbing to each with your keyboard, then pressing Enter — only the real{' '}
        <code>&lt;button&gt;</code> responds without extra code.
      </p>

      <h2>Labeling interactive elements</h2>
      <p>
        Icon-only buttons need a text alternative for screen readers, since there's no
        visible text to announce:
      </p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`// 🚫 A screen reader announces this as just "button" — useless
<button onClick={closeModal}>✕</button>

// ✅ Announced as "Close, button"
<button onClick={closeModal} aria-label="Close">✕</button>`}</code>
      </pre>

      <h2>Managing focus for dynamic UI</h2>
      <p>
        When a modal opens, sighted keyboard users and screen reader users alike need focus
        moved into it — otherwise they're stuck interacting with content hidden behind the
        modal. This combines <code>useRef</code> and <code>useEffect</code>, exactly like
        the form auto-focus you built in the Course Catalog project:
      </p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`function Modal({ onClose, children }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current.focus();
  }, []);

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose} aria-label="Close">✕</button>
      {children}
    </div>
  );
}`}</code>
      </pre>

      <h2>Color contrast and "don't rely on color alone"</h2>
      <p>
        A form error shown only as red text is invisible to colorblind users. Pair color
        with an icon, bold text, or a written message — like the ❌/✅ icons used
        throughout this course's own quizzes and forms.
      </p>

      <h2>Testing your own accessibility</h2>
      <ul>
        <li>Unplug your mouse and try navigating your app with only Tab, Enter, and arrow keys.</li>
        <li>Turn on your OS's built-in screen reader (VoiceOver, NVDA, Narrator) and listen.</li>
        <li>
          Use automated tools like <code>axe</code> or the Lighthouse accessibility audit in
          Chrome DevTools to catch common issues automatically.
        </li>
      </ul>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 Accessibility is a spectrum, not a checkbox — you'll never be "100% done." Aim
        to fix the highest-impact issues first: keyboard navigation and semantic HTML cover
        the majority of real-world problems.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/accessibility" target="_blank" rel="noreferrer">
          react.dev: Accessibility
        </a>
      </blockquote>
    </>
  )
}
