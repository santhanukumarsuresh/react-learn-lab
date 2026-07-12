import CodeSandbox from '../components/CodeSandbox'

export default function EffectTiming() {
  return (
    <>
      <p>
        Unlike a component, which thinks in terms of "mount, update, unmount," a{' '}
        <code>useEffect</code> thinks in terms of "synchronize, then re-synchronize
        whenever something it depends on changes." That small shift in thinking clears up a
        lot of confusion.
      </p>

      <h2>Every value from render, every effect</h2>
      <p>
        Each time your component renders, it gets a fresh version of the effect function
        too — with the render's own snapshot of props and state baked in. If any value the
        effect actually uses changes, React cleans up the old effect and re-runs the new
        one:
      </p>
      <CodeSandbox
        code={`function Room({ roomId }) {
  useEffect(() => {
    console.log("Connecting to room: " + roomId);
    return () => console.log("Disconnecting from room: " + roomId);
  }, [roomId]);

  return <p>Welcome to {roomId}</p>;
}

function Example() {
  const [roomId, setRoomId] = useState("lobby");
  return (
    <div>
      <Room roomId={roomId} />
      <button onClick={() => setRoomId(roomId === "lobby" ? "music" : "lobby")}>
        Switch room
      </button>
    </div>
  );
}

render(<Example />);`}
      />
      <p>
        Watch the console as you switch rooms — React always disconnects from the old room
        before connecting to the new one. This "cleanup, then reconnect" cycle is exactly
        what "reactive" means here: the effect reacts to changes in the values it depends
        on.
      </p>

      <h2>Don't mix "on every change" logic with "just once" logic</h2>
      <p>
        A common trap is putting code that should run in response to a specific user action
        (like sending a message) inside an effect that's meant to just keep something
        synchronized (like a connection). Keep them separate: connecting is a{' '}
        <em>synchronization</em> concern that belongs in <code>useEffect</code>; sending a
        message is an <em>event</em> that belongs in an event handler like{' '}
        <code>onClick</code>, even if it happens to use the same connection.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 A good question to ask: "should this code re-run just because the component
        re-rendered?" If yes, it likely belongs in an effect. If it should only happen
        because of a specific click or submission, it belongs in an event handler instead.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://react.dev/learn/lifecycle-of-reactive-effects"
          target="_blank"
          rel="noreferrer"
        >
          react.dev: Lifecycle of Reactive Effects
        </a>
      </blockquote>
    </>
  )
}
