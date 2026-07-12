import CodeSandbox from '../components/CodeSandbox'

export default function UpdatingObjects() {
  return (
    <>
      <p>
        You already learned the golden rule: never mutate state directly. That rule matters
        just as much for objects as it does for arrays. Let's see exactly how to update one
        field of an object in state, the right way.
      </p>

      <h2>The wrong way: mutating directly</h2>
      <p>
        This looks like it should work, but React won't notice anything changed, because
        it's still the exact same object in memory:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [robot, setRobot] = useState({ name: "Rex", power: "laser eyes" });

  function upgrade() {
    robot.power = "super laser eyes"; // 🚫 mutates the existing object
    setRobot(robot); // React sees the same reference — no re-render!
  }

  return (
    <div>
      <p>{robot.name}: {robot.power}</p>
      <button onClick={upgrade}>Upgrade (broken)</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>Click the button a few times — the screen never updates!</p>

      <h2>The right way: spread + override</h2>
      <p>
        Instead, build a <em>new</em> object using spread syntax, and override just the
        field that changed:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [robot, setRobot] = useState({ name: "Rex", power: "laser eyes" });

  function upgrade() {
    setRobot({ ...robot, power: "super laser eyes" }); // ✅ a brand-new object
  }

  return (
    <div>
      <p>{robot.name}: {robot.power}</p>
      <button onClick={upgrade}>Upgrade</button>
    </div>
  );
}

render(<Example />);`}
      />

      <h2>Updating a nested object</h2>
      <p>
        If your object has an object inside it, you need to spread at <em>every</em> level
        you're changing:
      </p>
      <CodeSandbox
        code={`function Example() {
  const [player, setPlayer] = useState({
    name: "Ava",
    stats: { level: 1, score: 0 },
  });

  function addPoint() {
    setPlayer({
      ...player,
      stats: { ...player.stats, score: player.stats.score + 1 },
    });
  }

  return (
    <div>
      <p>{player.name} — Level {player.stats.level}, Score {player.stats.score}</p>
      <button onClick={addPoint}>+1 point</button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Notice we spread <code>player</code> first, then spread <code>player.stats</code>{' '}
        inside that — each level needs its own fresh copy, or the update won't be noticed at
        that level.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://react.dev/learn/updating-objects-in-state" target="_blank" rel="noreferrer">
          react.dev: Updating Objects in State
        </a>
      </blockquote>
    </>
  )
}
