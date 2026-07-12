import CodeSandbox from '../components/CodeSandbox'

export default function Portals() {
  return (
    <>
      <p>
        Normally, a component renders as a DOM node <em>inside</em> its parent's DOM node —
        matching the component tree exactly. A <strong>portal</strong> breaks that rule on
        purpose: it lets a component render its DOM output into a completely different part
        of the page, while still behaving like a normal child in React's component tree
        (props, context, and event bubbling all still work as expected).
      </p>

      <h2>Why you'd want that</h2>
      <p>
        The classic use case is a modal or tooltip. If a modal renders deep inside a
        component with <code>overflow: hidden</code> or a low <code>z-index</code>, it can
        get visually clipped or hidden behind other elements — even though logically it
        should appear "on top of everything." A portal renders its actual DOM elsewhere (like
        directly under <code>&lt;body&gt;</code>), sidestepping the problem entirely.
      </p>

      <h2>Using createPortal</h2>
      <p>
        Here, the modal's content is rendered into a separate container element instead of
        inside the button's own nested div — click the button to see it appear in the
        second box, even though the code renders it "inside" the first:
      </p>
      <CodeSandbox
        code={`function Modal({ children, container }) {
  if (!container) return null;
  return createPortal(children, container);
}

function Example() {
  const [show, setShow] = useState(false);
  const portalTarget = useRef(null);

  return (
    <div>
      <button onClick={() => setShow(true)}>Open "modal"</button>

      <div style={{ border: "2px solid #38bdf8", padding: 8, overflow: "hidden", height: 50, marginTop: 8 }}>
        <p>I'm a container with overflow: hidden (only 50px tall)</p>
        {show && (
          <Modal container={portalTarget.current}>
            <div style={{ background: "#fef08a", padding: 8 }}>
              🎉 I'm rendered in a totally different DOM node, so I'm never clipped!{" "}
              <button onClick={() => setShow(false)}>Close</button>
            </div>
          </Modal>
        )}
      </div>

      <p style={{ marginTop: 8 }}>Portal target (elsewhere on the page):</p>
      <div ref={portalTarget} style={{ border: "2px dashed #94a3b8", padding: 8, minHeight: 30 }} />
    </div>
  );
}

render(<Example />);`}
      />

      <p>
        Even though the modal content is rendered into a completely separate DOM node,
        it's still logically a child of <code>Example</code> in React's tree — a click
        inside the modal still bubbles up through React's event system as if it were nested
        normally, and it still has access to any context from its logical parents.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 Common real-world uses: modals, tooltips, dropdown menus, toast notifications —
        anything that needs to visually "escape" its parent's layout constraints while
        staying part of the same React component tree.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/reference/react-dom/createPortal"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: createPortal
        </a>
      </blockquote>
    </>
  )
}
