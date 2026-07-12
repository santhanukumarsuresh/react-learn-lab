import CodeBlock from '../components/CodeBlock'

export default function IntroToTypescript() {
  return (
    <>
      <p>
        Congratulations on making it through the whole course! As a bonus, let's peek at a
        tool many professional React teams use alongside JavaScript:{' '}
        <strong>TypeScript</strong>.
      </p>

      <h2>What is TypeScript?</h2>
      <p>
        TypeScript is JavaScript with an extra layer: <strong>types</strong>. A type is just
        a label saying what kind of value something is — a number, a string, an array of
        products, etc. You write regular JavaScript, plus these extra labels, and a tool
        checks your code for mistakes <em>before</em> you even run it.
      </p>

      <h2>A quick example</h2>
      <p>In plain JavaScript, this mistake isn't caught until your app is running:</p>
      <CodeBlock>{`function greet(name) {
  return "Hello, " + name.toUpperCase() + "!";
}

greet(42); // 💥 crashes at runtime — numbers don't have .toUpperCase()`}</CodeBlock>

      <p>
        In TypeScript, you can label what <code>greet</code> expects, and your editor warns
        you immediately — no need to even run the code:
      </p>
      <CodeBlock>{`function greet(name: string) {
  return "Hello, " + name.toUpperCase() + "!";
}

greet(42); // ❌ TypeScript error, right in your editor:
           // Argument of type 'number' is not assignable to parameter of type 'string'`}</CodeBlock>

      <h2>Typing props in React</h2>
      <p>
        This is where TypeScript shines the most in React — it makes sure you always pass
        the right props to a component:
      </p>
      <CodeBlock>{`type GreetingProps = {
  name: string;
  emoji?: string; // the "?" means this prop is optional
};

function Greeting({ name, emoji }: GreetingProps) {
  return (
    <h1>
      {emoji} Hello, {name}!
    </h1>
  );
}

// <Greeting name="Ava" />           ✅ works
// <Greeting emoji="🎉" />           ❌ error: missing required "name"
// <Greeting name={42} />            ❌ error: name should be a string`}</CodeBlock>

      <h2>Should you learn it now?</h2>
      <p>
        Not necessarily right away! Everything you learned in this course is real,
        transferable React knowledge — TypeScript sits <em>on top of</em> that foundation,
        it doesn't replace it. Many developers spend months comfortable in plain
        JavaScript before picking up TypeScript, and that's a perfectly good path.
      </p>

      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/30">
        💡 If you do want to try it, most tools that create new React projects (like Vite)
        offer a TypeScript template with one flag — you don't have to set anything up by
        hand.
      </div>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://www.typescriptlang.org/docs/handbook/react.html" target="_blank" rel="noreferrer">
          TypeScript Handbook: React
        </a>
      </blockquote>
    </>
  )
}
