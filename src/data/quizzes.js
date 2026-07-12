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
}
