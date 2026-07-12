// Hands-on coding practice, keyed by lesson slug. Each entry gets an editable
// starter sandbox and a "View Solution" reveal (mirrors the Quiz component's UX).
// starterCode/solutionCode must end with a `render(<Example />);` call, same as CodeSandbox.

export const codingChallenges = {
  functions: {
    prompt:
      'Write an arrow function called `shout` that takes a word and returns it in all caps with an exclamation mark (e.g. "hi" → "HI!"). Use it inside Example.',
    starterCode: `const shout = (word) => {
  // TODO: return the word in all caps, with "!" at the end
  return word;
};

function Example() {
  return <p>{shout("hooray")}</p>;
}

render(<Example />);`,
    solutionCode: `const shout = (word) => word.toUpperCase() + "!";

function Example() {
  return <p>{shout("hooray")}</p>;
}

render(<Example />);`,
    explanation:
      '`.toUpperCase()` is a built-in string method that returns the word in capitals, and `+ "!"` tacks the exclamation mark on the end — all in one short arrow function expression.',
  },

  'arrays-objects': {
    prompt:
      'Given the `colors` array, render each one inside its own `<li>` using `.map()`. Don\'t forget a unique `key`!',
    starterCode: `function Example() {
  const colors = ["Red", "Green", "Blue"];

  return (
    <ul>
      {/* TODO: use colors.map() to render an <li> for each color */}
    </ul>
  );
}

render(<Example />);`,
    solutionCode: `function Example() {
  const colors = ["Red", "Green", "Blue"];

  return (
    <ul>
      {colors.map((color) => (
        <li key={color}>{color}</li>
      ))}
    </ul>
  );
}

render(<Example />);`,
    explanation:
      '.map() runs once per item, turning each color string into an `<li>` element. The `key` prop (here, the color itself, since they\'re all unique) helps React track each item.',
  },

  'conditional-rendering': {
    prompt:
      'Finish the `WeatherMessage` component: show "Bring an umbrella! ☔" when `isRaining` is true, otherwise show "Enjoy the sun! ☀️" — using a ternary.',
    starterCode: `function WeatherMessage({ isRaining }) {
  // TODO: return one message or the other, using a ternary
  return <p>???</p>;
}

function Example() {
  return <WeatherMessage isRaining={true} />;
}

render(<Example />);`,
    solutionCode: `function WeatherMessage({ isRaining }) {
  return <p>{isRaining ? "Bring an umbrella! ☔" : "Enjoy the sun! ☀️"}</p>;
}

function Example() {
  return <WeatherMessage isRaining={true} />;
}

render(<Example />);`,
    explanation:
      'A ternary `condition ? ifTrue : ifFalse` is a single expression, which is exactly what curly braces in JSX need — perfect for a simple either/or choice like this.',
  },

  'rendering-lists': {
    prompt:
      'The `students` array only shows grade-5 students. Use `.filter()` before `.map()` to only render students where `grade === 5`.',
    starterCode: `function Example() {
  const students = [
    { id: "s1", name: "Ava", grade: 5 },
    { id: "s2", name: "Leo", grade: 4 },
    { id: "s3", name: "Mia", grade: 5 },
  ];

  return (
    <ul>
      {/* TODO: filter to grade 5 only, then map to <li> elements */}
      {students.map((s) => (
        <li key={s.id}>{s.name}</li>
      ))}
    </ul>
  );
}

render(<Example />);`,
    solutionCode: `function Example() {
  const students = [
    { id: "s1", name: "Ava", grade: 5 },
    { id: "s2", name: "Leo", grade: 4 },
    { id: "s3", name: "Mia", grade: 5 },
  ];

  return (
    <ul>
      {students
        .filter((s) => s.grade === 5)
        .map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
    </ul>
  );
}

render(<Example />);`,
    explanation:
      'Arrays chain nicely — `.filter()` first narrows the array down to just the students you want, and the `.map()` after it only has to worry about turning those into JSX.',
  },

  props: {
    prompt:
      'Finish the `Badge` component so it displays the `label` prop it receives, wrapped in square brackets, like [NEW].',
    starterCode: `function Badge({ label }) {
  // TODO: display the label wrapped in [ ]
  return <span>???</span>;
}

function Example() {
  return <Badge label="NEW" />;
}

render(<Example />);`,
    solutionCode: `function Badge({ label }) {
  return <span>[{label}]</span>;
}

function Example() {
  return <Badge label="NEW" />;
}

render(<Example />);`,
    explanation:
      'JSX lets you mix literal characters like `[` and `]` right alongside curly-brace expressions — `[{label}]` renders as the brackets plus whatever `label` currently is.',
  },

  'use-state': {
    prompt:
      'Build a toggle button: clicking it should switch the text between "OFF" and "ON" using useState.',
    starterCode: `function Example() {
  // TODO: create state for isOn, starting at false
  const isOn = false;

  return (
    <button onClick={() => {/* TODO: flip isOn */}}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}

render(<Example />);`,
    solutionCode: `function Example() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}

render(<Example />);`,
    explanation:
      '`setIsOn(!isOn)` flips the boolean every click — true becomes false and vice versa — and React re-renders the button with the new text automatically.',
  },

  'updating-arrays-in-state': {
    prompt:
      'Add a working `removeItem` function that removes the clicked item from the `items` array, without mutating it.',
    starterCode: `function Example() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  function removeItem(itemToRemove) {
    // TODO: update items to exclude itemToRemove, using .filter()
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          {item} <button onClick={() => removeItem(item)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

render(<Example />);`,
    solutionCode: `function Example() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  function removeItem(itemToRemove) {
    setItems(items.filter((item) => item !== itemToRemove));
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          {item} <button onClick={() => removeItem(item)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

render(<Example />);`,
    explanation:
      '.filter() builds a new array containing everything except the matching item, and that new array becomes the new state — nothing in the original array is touched.',
  },

  'click-events': {
    prompt:
      'There\'s a bug: the alert fires immediately when the page loads instead of waiting for a click. Fix the `onClick` handler.',
    starterCode: `function Example() {
  function sayHi() {
    alert("Hi there!");
  }

  // TODO: fix the bug below — it calls sayHi() immediately!
  return <button onClick={sayHi()}>Say hi</button>;
}

render(<Example />);`,
    solutionCode: `function Example() {
  function sayHi() {
    alert("Hi there!");
  }

  return <button onClick={sayHi}>Say hi</button>;
}

render(<Example />);`,
    explanation:
      '`onClick={sayHi()}` calls the function immediately while rendering, and passes its *return value* (undefined) as the handler. Removing the parentheses — `onClick={sayHi}` — passes the function itself, so React can call it later, on click.',
  },

  'custom-hooks': {
    prompt:
      'Finish the `useCounter` custom hook so it returns `{ count, increment }`, where `increment` adds 1 to count.',
    starterCode: `function useCounter(startingValue) {
  const [count, setCount] = useState(startingValue);
  // TODO: create an increment function that adds 1 to count
  // TODO: return { count, increment }
}

function Example() {
  const { count, increment } = useCounter(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

render(<Example />);`,
    solutionCode: `function useCounter(startingValue) {
  const [count, setCount] = useState(startingValue);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

function Example() {
  const { count, increment } = useCounter(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

render(<Example />);`,
    explanation:
      'The hook bundles a piece of state and the logic to update it into one reusable function. Returning an object lets the caller destructure exactly the pieces it needs — `count` and `increment`.',
  },

  'use-ref': {
    prompt:
      'Wire up the ref so clicking the button focuses the input. You need to attach `inputRef` to the input, and call `.focus()` on it.',
    starterCode: `function Example() {
  const inputRef = useRef(null);

  function handleClick() {
    // TODO: focus the input using inputRef
  }

  return (
    <div>
      {/* TODO: attach inputRef to this input using the ref prop */}
      <input placeholder="Click the button to focus me" />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}

render(<Example />);`,
    solutionCode: `function Example() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}

render(<Example />);`,
    explanation:
      'The `ref` prop tells React to store the real DOM node inside `inputRef.current`. Once attached, you can call real browser methods on it directly, like `.focus()`.',
  },
}
