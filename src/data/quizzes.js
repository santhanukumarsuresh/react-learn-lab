// One practical multiple-choice question per lesson, keyed by lesson slug.
// Keep options short, keep the correct answer honest (not always position A),
// and make the explanation teach something even if the learner guessed right.

export const quizzes = {
  welcome: [
    {
      question: 'In React, small reusable pieces of a website (like a button or a card) are called...?',
      options: ['Modules', 'Components', 'Widgets', 'Templates'],
      correctIndex: 1,
      explanation:
        'Components are the LEGO bricks of React — small, reusable pieces you snap together to build a whole app.',
    },
  ],
  'what-you-need': [
    {
      question: 'Which tool lets JavaScript run on your computer, outside of a web browser?',
      options: ['Node.js', 'Visual Studio Code', 'npm', 'Git'],
      correctIndex: 0,
      explanation:
        'Node.js is the JavaScript runtime that powers your dev tools. npm (which comes bundled with it) is the package manager, and VS Code is just the editor you type in.',
    },
  ],
  variables: [
    {
      question: 'Which keyword should you use for a value that should never be reassigned?',
      options: ['var', 'let', 'const', 'static'],
      correctIndex: 2,
      explanation:
        '`const` locks the variable so it can\'t be reassigned. `let` allows reassignment, and `var` is an older, less safe way to declare variables.',
    },
  ],
  functions: [
    {
      question: 'Which of these is a valid "no curly braces" arrow function that returns a greeting?',
      options: [
        'const greet = (name) => { "Hi " + name };',
        'const greet = (name) => "Hi " + name;',
        'function greet(name) => "Hi " + name;',
        'const greet = (name) -> "Hi " + name;',
      ],
      correctIndex: 1,
      explanation:
        'Without curly braces, an arrow function automatically returns whatever comes right after the arrow — no `return` keyword needed. The other options use invalid syntax.',
    },
  ],
  'arrays-objects': [
    {
      question: 'Given `const pets = ["Cat", "Dog"];`, what does `pets[1]` give you?',
      options: ['"Cat"', '"Dog"', 'undefined', 'An error'],
      correctIndex: 1,
      explanation:
        'Arrays start counting at 0, so `pets[0]` is "Cat" and `pets[1]` is "Dog" — the second item.',
    },
  ],
  destructuring: [
    {
      question: 'What does `name` equal after `const { name } = { name: "Rex", power: "laser" };`?',
      options: ['"Rex"', '"laser"', 'undefined', 'The whole object'],
      correctIndex: 0,
      explanation:
        'Destructuring pulls the value out of the matching key — here, `name` grabs "Rex" straight out of the object.',
    },
  ],
  'spread-rest': [
    {
      question: 'What does `{ ...robot, power: "new laser" }` actually do?',
      options: [
        'Changes robot.power directly',
        'Deletes every other field on robot',
        'Creates a brand-new object with robot\'s fields, overriding power',
        'Throws an error',
      ],
      correctIndex: 2,
      explanation:
        'Spread copies every field from `robot` into a new object first, then `power: "new laser"` overwrites just that one field — the original `robot` is left untouched.',
    },
  ],
  modules: [
    {
      question: "How do you import the default export from a file called Greeting.jsx?",
      options: [
        "import { Greeting } from './Greeting.jsx';",
        "import Greeting from './Greeting.jsx';",
        "require('./Greeting.jsx');",
        "export Greeting from './Greeting.jsx';",
      ],
      correctIndex: 1,
      explanation:
        'A default export is imported without curly braces, and you can name it whatever you like on the way in.',
    },
  ],
  'what-is-react': [
    {
      question: 'What is the core idea behind React?',
      options: [
        'Writing every page as one giant HTML file',
        'Breaking the UI into small, reusable components',
        'Replacing JavaScript with a new language',
        'Only working on the backend server',
      ],
      correctIndex: 1,
      explanation:
        "React's whole philosophy is composition: build small components once, then reuse and combine them to make bigger interfaces.",
    },
  ],
  'first-project': [
    {
      question: 'Which command starts the local development server for a Vite React project?',
      options: ['npm run build', 'npm run dev', 'npm install react', 'npm run server'],
      correctIndex: 1,
      explanation:
        '`npm run dev` starts a live local server with instant reloading. `npm run build` instead creates the final production files.',
    },
  ],
  'what-is-jsx': [
    {
      question: 'What will `<p>2 + 2 equals {2 + 2}</p>` show in the browser?',
      options: ['2 + 2 equals {2 + 2}', '2 + 2 equals 4', 'An error', 'Nothing at all'],
      correctIndex: 1,
      explanation:
        'Anything inside curly braces in JSX is run as real JavaScript, so `{2 + 2}` is evaluated and replaced with `4`.',
    },
  ],
  'jsx-expressions': [
    {
      question: 'Which of these is safe to put inside JSX curly braces `{ }`?',
      options: [
        'An if statement',
        'A variable declaration like `let x = 5`',
        'A ternary like `isReady ? "Yes" : "No"`',
        'A for loop',
      ],
      correctIndex: 2,
      explanation:
        'Curly braces can only hold an expression — something that produces a value. Ternaries produce a value; if statements, variable declarations, and loops do not.',
    },
  ],
  'jsx-rules': [
    {
      question: 'Why does `return (<h1>Hi</h1><p>Bye</p>);` fail to compile?',
      options: [
        "It's missing a semicolon",
        'A component can only return one root element',
        "<p> tags aren't allowed in JSX",
        "Text content isn't allowed inside tags",
      ],
      correctIndex: 1,
      explanation:
        'JSX requires a single top-level element. Wrap the two elements in a `<div>` or an empty `<>...</>` Fragment to fix it.',
    },
  ],
  'first-component': [
    {
      question: 'Which of these is a valid React component name?',
      options: ['welcome()', 'Welcome()', '1Component()', 'my-component()'],
      correctIndex: 1,
      explanation:
        'Component names must start with a capital letter — that\'s how React tells them apart from regular HTML tags like `<div>`.',
    },
  ],
  props: [
    {
      question: 'How does a component receive a prop passed like `<Greeting name="Ava" />`?',
      options: [
        'Through a global variable called name',
        'As a function parameter, e.g. `function Greeting(props)`, then reading `props.name`',
        "It can't — props aren't readable inside the component",
        'Through `this.name`, like in a class',
      ],
      correctIndex: 1,
      explanation:
        'React passes all of a component\'s props in as a single object, usually named `props`, which you can also destructure directly in the parameters.',
    },
  ],
  composing: [
    {
      question: 'What does a component\'s special `children` prop represent?',
      options: [
        "The component's own internal state",
        'Whatever JSX is nested between its opening and closing tags',
        'A list of every component in the app',
        "The parent component's file name",
      ],
      correctIndex: 1,
      explanation:
        'Whatever you place between `<Card>` and `</Card>` is automatically passed to `Card` as `props.children` — perfect for wrapper components.',
    },
  ],
  'click-events': [
    {
      question: 'What\'s wrong with `<button onClick={handleClick()}>Click</button>`?',
      options: [
        "Nothing, it's correct",
        'It calls handleClick immediately during render, instead of waiting for a click',
        "onClick isn't a real prop",
        "Buttons can't have click handlers"
      ],
      correctIndex: 1,
      explanation:
        'The parentheses call the function right away while React is rendering. Pass the function itself — `onClick={handleClick}` — so React calls it later, on click.',
    },
  ],
  'form-events': [
    {
      question: 'In a controlled input, where does the text the user is typing usually live?',
      options: [
        'Only in the DOM, React never sees it',
        'In a piece of React state, kept in sync via onChange',
        'In a browser cookie',
        "It isn't tracked anywhere"
      ],
      correctIndex: 1,
      explanation:
        'A controlled input\'s `value` comes from state, and `onChange` updates that same state on every keystroke — keeping React and the input in sync.',
    },
  ],
  'use-state': [
    {
      question: 'What does calling `useState(0)` give you back?',
      options: [
        'Just the current number',
        'An array with the current value and a setter function',
        'A Promise that resolves later',
        'Nothing — it returns void'
      ],
      correctIndex: 1,
      explanation:
        '`useState` always returns a pair: `[value, setterFunction]` — which is exactly why we destructure it as `const [count, setCount] = useState(0)`.',
    },
  ],
  'updating-state': [
    {
      question: 'Why might calling `setCount(count + 1)` three times in one click handler only add 1, not 3?',
      options: [
        'React silently ignores repeated calls',
        'Each call reads the same "stale" value of count from that render',
        'JavaScript only allows one function call per event',
        "It's a bug you need to work around with a library"
      ],
      correctIndex: 1,
      explanation:
        'All three calls see the same old `count` from when the click started. Use the functional form, `setCount(prev => prev + 1)`, so each update builds on the true latest value.',
    },
  ],
  'use-effect': [
    {
      question: 'What does passing an empty array `[]` as useEffect\'s second argument mean?',
      options: [
        'The effect runs after every single render',
        'The effect never runs at all',
        'The effect runs once, right after the component first appears',
        'The effect runs only when the array itself changes shape'
      ],
      correctIndex: 2,
      explanation:
        'An empty dependency array tells React "nothing to watch," so the effect fires exactly once, right after the first render, and never again.',
    },
  ],
  'custom-hooks': [
    {
      question: 'What naming rule must a custom hook follow?',
      options: [
        'It must be written in ALL_CAPS',
        "Its name must start with the word 'use'",
        "It must end with the word 'Hook'",
        'There is no naming rule at all'
      ],
      correctIndex: 1,
      explanation:
        "Starting a function's name with `use` is how React (and linters) recognize it as a hook, which unlocks the ability to call other hooks inside it.",
    },
  ],
  'basic-routing': [
    {
      question: "What's the job of React Router's <Routes> and <Route> components?",
      options: [
        'They style your app with CSS',
        'They match the current URL and render the matching page component',
        'They fetch data from a server automatically',
        'They handle button click events'
      ],
      correctIndex: 1,
      explanation:
        '`<Routes>` looks at the current URL and picks the single `<Route>` whose `path` matches, rendering that component in its place.',
    },
  ],
  navigation: [
    {
      question: 'Why use <Link> instead of a plain <a> tag in a React Router app?',
      options: [
        '<Link> just looks nicer by default',
        '<Link> swaps pages instantly without a full page reload, keeping app state',
        "<a> tags don't work inside React at all",
        "There's no real difference between them"
      ],
      correctIndex: 1,
      explanation:
        'A plain `<a>` forces the browser to reload everything from the server. `<Link>` intercepts the click and swaps components instantly, so your app never loses its state.',
    },
  ],
  'mini-project': [
    {
      question: 'Why use `tasks.filter((_, i) => i !== indexToRemove)` instead of mutating the array directly?',
      options: [
        '.filter() runs faster than any other method',
        "It creates a brand-new array without changing the original, so React notices the state change",
        "It's the only method JavaScript allows on arrays",
        '.splice() does not exist in JavaScript'
      ],
      correctIndex: 1,
      explanation:
        'React compares state by reference. `.filter()` returns a new array, which React sees as "different" and re-renders for — mutating the original array in place wouldn\'t trigger an update.',
    },
  ],
  'template-literals': [
    {
      question: 'What does `` `Hi, ${name}!` `` produce if `name` is `"Ada"`?',
      options: ['"Hi, ${name}!"', '"Hi, Ada!"', 'An error', '"Hi, undefined!"'],
      correctIndex: 1,
      explanation:
        'Inside backticks, `${ }` is evaluated as real JavaScript and its result is dropped into the string — so `${name}` becomes "Ada".',
    },
  ],
  'conditional-rendering': [
    {
      question: 'Why is `{count && <p>Items: {count}</p>}` risky when `count` can be 0?',
      options: [
        "It's not risky at all",
        'It throws an error when count is 0',
        'React renders a stray "0" on screen, since 0 is falsy but still gets displayed',
        "It always shows the <p>, even at 0"
      ],
      correctIndex: 2,
      explanation:
        '`&&` returns its first falsy operand as-is. `0` is falsy, so React renders the number `0` itself rather than nothing. Using `count > 0 && ...` avoids this.',
    },
  ],
  'rendering-lists': [
    {
      question: "Why shouldn't you use an array's index as its `key` if the list can be reordered?",
      options: [
        'Indexes are always duplicated automatically',
        "React can confuse which item is which as the list changes, causing bugs",
        'JavaScript forbids using numbers as keys',
        'It makes .map() run twice'
      ],
      correctIndex: 1,
      explanation:
        "When items move around, their index changes even though the item itself didn't — so React may match the wrong old element to the wrong new position. A stable id from your data avoids this.",
    },
  ],
  'importing-exporting': [
    {
      question: 'When should you use a named export instead of a default export for a component?',
      options: [
        'Never — named exports are outdated',
        'When a file offers several equally-important components to the outside world',
        'Only for components used in more than 10 places',
        'Default and named exports are exactly the same thing'
      ],
      correctIndex: 1,
      explanation:
        'A single "main" component per file usually gets `export default`. When a file genuinely exports multiple components other files need, name each one so they can be imported individually.',
    },
  ],
  'pure-components': [
    {
      question: 'What makes a React component "impure"?',
      options: [
        'Using props to decide what to render',
        'Changing a variable that exists outside the component while it renders',
        'Returning JSX',
        'Accepting more than one prop'
      ],
      correctIndex: 1,
      explanation:
        "A pure component only reads its props/state and returns JSX — it doesn't change anything outside itself during render. Side effects belong in event handlers or useEffect, not render.",
    },
  ],
  'state-snapshot': [
    {
      question: "Right after calling `setCount(count + 1)`, what does the very next line see when it reads `count`?",
      options: [
        'The brand-new updated value',
        'The old value from the render that\'s currently running',
        'undefined',
        'An error is thrown'
      ],
      correctIndex: 1,
      explanation:
        "React hands each render a frozen snapshot of state. Calling the setter schedules a new render with the new value — it doesn't change the variable in the render that's already running.",
    },
  ],
  'updating-objects': [
    {
      question: 'Why does `robot.power = "new"; setRobot(robot);` fail to update the screen?',
      options: [
        "It's actually correct and works fine",
        "setRobot is being passed the same object reference, so React doesn't detect a change",
        'You need to call setRobot twice',
        'Objects cannot be stored in state at all'
      ],
      correctIndex: 1,
      explanation:
        "React checks whether the new state is a different object from the old one. Mutating and passing back the same reference looks unchanged to React, so it skips re-rendering. Use `{ ...robot, power: 'new' }` instead.",
    },
  ],
  'updating-arrays-in-state': [
    {
      question: 'Which of these safely updates one task inside an array of tasks in state?',
      options: [
        'tasks[2].done = true;',
        'tasks.push({ done: true });',
        'setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));',
        'tasks.splice(2, 1, newTask);'
      ],
      correctIndex: 2,
      explanation:
        '.map() builds a brand-new array, replacing only the matching item with a new object — nothing is mutated in place, so React reliably notices the change.',
    },
  ],
  'lifting-state-up': [
    {
      question: 'Two sibling components both need to reflect the same "selected" value. Where should that state live?',
      options: [
        'Duplicated in useState inside each sibling',
        'In their closest shared parent component, passed down as props',
        "It's impossible for siblings to share state",
        'In the browser\'s localStorage only'
      ],
      correctIndex: 1,
      explanation:
        'Lifting state up means moving it to the nearest common ancestor, which then passes the value and an updater function down as props to both children.',
    },
  ],
  'you-might-not-need-an-effect': [
    {
      question: 'If `fullName` can be calculated directly from `firstName` and `lastName`, what should you do?',
      options: [
        'Store it in its own useState and update it inside a useEffect',
        'Calculate it directly during render: `const fullName = firstName + " " + lastName;`',
        'Fetch it from a server',
        'It can only be done with useReducer'
      ],
      correctIndex: 1,
      explanation:
        'If a value can be derived from existing props/state, just calculate it during render — no Hook needed. Reach for useEffect only for syncing with something outside React.',
    },
  ],
  'use-ref': [
    {
      question: 'What is the key difference between useState and useRef?',
      options: [
        'They are exactly the same',
        'Changing a ref\'s .current value does NOT trigger a re-render, unlike state',
        'useRef can only store numbers',
        'useState is faster than useRef'
      ],
      correctIndex: 1,
      explanation:
        "A ref is a mutable box that persists between renders but doesn't cause React to re-render when it changes — useful for values you need to track without displaying, or for reaching into the DOM.",
    },
  ],
  'use-reducer': [
    {
      question: 'In `useReducer`, what do you call to trigger a state update?',
      options: ['setState()', 'The reducer function directly', 'dispatch(action)', 'update()'],
      correctIndex: 2,
      explanation:
        '`useReducer` gives you `[state, dispatch]`. You send an action object to `dispatch`, and the reducer function decides how state should change in response.',
    },
  ],
  'use-context': [
    {
      question: 'What problem does useContext mainly solve?',
      options: [
        'Making components render faster',
        'Avoiding "prop drilling" — passing data through many components that don\'t need it',
        'Replacing useState entirely',
        'Handling click events'
      ],
      correctIndex: 1,
      explanation:
        'Context lets deeply nested components read a value directly from a Provider higher up the tree, skipping all the components in between that would otherwise have to pass it down as props.',
    },
  ],
  'promises-async-await': [
    {
      question: 'What must a function be marked as before you can use `await` inside it?',
      options: ['static', 'const', 'async', 'export'],
      correctIndex: 2,
      explanation:
        'The `async` keyword marks a function as one that can pause and wait for promises with `await`. Without it, `await` is a syntax error.',
    },
  ],
  'rendering-to-the-dom': [
    {
      question: 'What does `createRoot(document.getElementById("root")).render(<App />)` do?',
      options: [
        'Deletes the HTML file',
        'Tells React to draw the App component tree inside that one HTML element',
        'Creates a new HTML file',
        'Installs React onto the computer'
      ],
      correctIndex: 1,
      explanation:
        'createRoot hands React control of a single empty DOM node, and .render() tells it to draw your whole component tree, starting from App, inside that node.',
    },
  ],
  'ui-as-a-tree': [
    {
      question: 'In a React component tree, which direction do props normally flow?',
      options: ['Sideways between siblings', 'From parents down to children', 'From children up to parents', 'In any direction'],
      correctIndex: 1,
      explanation:
        'Props always flow one way: from a parent down to its children. This is exactly why "lifting state up" means moving state to a shared parent — so it can flow back down to everyone who needs it.',
    },
  ],
  'render-and-commit': [
    {
      question: 'During the "render" step, has anything on the actual screen changed yet?',
      options: ['Yes, immediately', 'No — render just figures out what JSX should look like, in memory', 'Only the background color', 'Render and commit are the same step'],
      correctIndex: 1,
      explanation:
        'Render calculates what the UI should be, entirely in memory. Only the "commit" step actually touches the real screen, and only for the parts that changed.',
    },
  ],
  'choosing-state-structure': [
    {
      question: 'Why is `const count = items.length;` usually better than a separate `count` state variable?',
      options: [
        'It runs faster in all cases',
        'It avoids keeping two values in sync manually — count is always correct because it\'s derived',
        'Arrays cannot have a .length property',
        'It is required by React'
      ],
      correctIndex: 1,
      explanation:
        'If a value can be calculated from state you already have, storing it separately just creates a second copy that can drift out of sync. Deriving it during render keeps a single source of truth.',
    },
  ],
  'preserving-resetting-state': [
    {
      question: 'How do you force React to reset a component\'s state instead of preserving it?',
      options: [
        'Call useState twice',
        'Give the component a different `key` prop',
        'Wrap it in a fragment',
        'It resets automatically every render'
      ],
      correctIndex: 1,
      explanation:
        'React uses a component\'s position in the tree (and its key) to decide whether it\'s "the same" component across renders. Changing the key tells React to treat it as a brand-new instance, resetting its state.',
    },
  ],
  'effect-timing': [
    {
      question: 'What should you ask to decide if code belongs in an effect vs. an event handler?',
      options: [
        'Whether the code uses state at all',
        'Whether it should re-run just because the component re-rendered, or only because of a specific user action',
        'Whether the code is long or short',
        'Effects and event handlers are interchangeable'
      ],
      correctIndex: 1,
      explanation:
        "Effects synchronize with something whenever relevant values change (re-run on re-render). Event handlers only run in direct response to a specific action, like a click — mixing the two causes bugs.",
    },
  ],
  'effect-dependencies': [
    {
      question: 'An effect reads a prop called `city` but the dependency array is empty ([]). What happens?',
      options: [
        'The effect updates automatically anyway',
        'The effect keeps using the stale city value from the first render, even after city changes',
        'React throws an error immediately',
        'Nothing — empty arrays are ignored'
      ],
      correctIndex: 1,
      explanation:
        "An effect's dependency array must list every reactive value it reads. Omitting `city` means the effect never re-runs when city changes, so it keeps working with outdated data.",
    },
  ],
  'route-parameters': [
    {
      question: 'In the route `<Route path="/products/:productId" element={<ProductPage />} />`, how does ProductPage read the id from the URL?',
      options: ['props.id', 'window.location.id', 'The useParams() hook', 'It cannot be read'],
      correctIndex: 2,
      explanation:
        '`useParams()` returns an object with every named segment from the matched path — here, `{ productId: "..." }` — reflecting whatever value is currently in the URL.',
    },
  ],
  'intro-to-typescript': [
    {
      question: 'What does TypeScript add on top of regular JavaScript?',
      options: [
        'A completely different, unrelated language',
        'Optional type labels that catch mistakes before the code even runs',
        'A new way to write CSS',
        'Faster runtime performance only'
      ],
      correctIndex: 1,
      explanation:
        'TypeScript is JavaScript plus type annotations. Your editor and build tools use those labels to catch mismatches — like passing a number where a string was expected — before you ever run the app.',
    },
  ],
}
