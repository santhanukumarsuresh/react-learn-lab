import CodeBlock from '../components/CodeBlock'

export default function PromisesAsyncAwait() {
  return (
    <>
      <p>
        Some things in JavaScript take time — fetching data from the internet, reading a
        file, waiting for a timer. A <strong>Promise</strong> is JavaScript's way of saying
        "I don't have your answer yet, but I promise to let you know when I do."
      </p>

      <h2>A promise has three possible states</h2>
      <ul>
        <li>
          <strong>Pending</strong> — still waiting for the result.
        </li>
        <li>
          <strong>Fulfilled</strong> — it worked! Here's your data.
        </li>
        <li>
          <strong>Rejected</strong> — something went wrong.
        </li>
      </ul>

      <h2>The old way: .then()</h2>
      <p>
        You can attach a callback with <code>.then()</code> that runs once the promise
        finishes:
      </p>
      <CodeBlock>{`fetch("https://api.example.com/pets")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log("Something went wrong:", error));`}</CodeBlock>

      <h2>The modern way: async/await</h2>
      <p>
        <code>async</code> and <code>await</code> let you write code that <em>looks</em>{' '}
        synchronous (top to bottom, like normal), even though it's still working
        asynchronously behind the scenes:
      </p>
      <CodeBlock>{`async function getPets() {
  try {
    const response = await fetch("https://api.example.com/pets");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}`}</CodeBlock>

      <h2>The two rules to remember</h2>
      <ul>
        <li>
          A function must be marked <code>async</code> before you can use{' '}
          <code>await</code> inside it.
        </li>
        <li>
          <code>await</code> pauses that function until the promise finishes — but the rest
          of your app keeps running normally while it waits.
        </li>
      </ul>

      <p>
        You'll see this pattern all the time in React apps when loading data from a server
        — often paired with <code>useEffect</code>, which you'll meet soon!
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
          target="_blank"
          rel="noreferrer"
        >
          MDN: async function
        </a>
      </blockquote>
    </>
  )
}
