import CodeSandbox from '../components/CodeSandbox'

export default function Composing() {
  return (
    <>
      <p>
        Real apps are built by combining lots of small components into bigger ones — like
        building a house out of rooms, and rooms out of walls, doors, and windows. This is
        called <strong>composition</strong>.
      </p>

      <h2>Components inside components</h2>
      <CodeSandbox
        code={`function Avatar() {
  return <span>🧑</span>;
}

function UserCard({ name }) {
  return (
    <div>
      <Avatar />
      <strong> {name}</strong>
    </div>
  );
}

function Example() {
  return (
    <div>
      <UserCard name="Ava" />
      <UserCard name="Leo" />
    </div>
  );
}

render(<Example />);`}
      />

      <h2>The special "children" prop</h2>
      <p>
        Sometimes you want a component to wrap whatever content is placed inside it — like a
        picture frame that works around any photo. React gives every component a special
        prop called <code>children</code> for exactly this:
      </p>
      <CodeSandbox
        code={`function Card({ children }) {
  return (
    <div style={{ border: "2px solid #38bdf8", padding: "12px", borderRadius: "8px" }}>
      {children}
    </div>
  );
}

function Example() {
  return (
    <Card>
      <h2>I'm inside the card!</h2>
      <p>Anything can go here.</p>
    </Card>
  );
}

render(<Example />);`}
      />

      <p>
        Whatever you put between <code>&lt;Card&gt;</code> and <code>&lt;/Card&gt;</code>{' '}
        automatically becomes <code>props.children</code> inside <code>Card</code>. This
        pattern is everywhere — modals, buttons, layout wrappers, and more.
      </p>
    </>
  )
}
