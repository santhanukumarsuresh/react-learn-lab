export default function WhatIsReact() {
  return (
    <>
      <p>
        <strong>React</strong> is a JavaScript library made by Meta (the company behind
        Facebook and Instagram) for building websites and apps. It's the tool behind huge
        sites like Instagram, Netflix, and Airbnb!
      </p>

      <h2>The big idea: components</h2>
      <p>
        Instead of building one giant page, React lets you break your website into small,
        reusable pieces called <strong>components</strong>. Think of a component like a LEGO
        brick — you can build one <code>Button</code> brick and reuse it 50 times across your
        whole app, and if you change the brick's color, every button updates at once!
      </p>

      <h2>Why do people love React?</h2>
      <ul>
        <li>
          <strong>Reusable pieces</strong> — build a component once, use it everywhere.
        </li>
        <li>
          <strong>It updates itself</strong> — when your data changes, React automatically
          updates the screen for you. You don't have to manually repaint anything.
        </li>
        <li>
          <strong>Huge community</strong> — millions of developers use React, so there are
          tons of free tutorials, tools, and answers to questions.
        </li>
      </ul>

      <h2>React vs. plain HTML</h2>
      <p>
        In plain HTML, a page is static — it doesn't change unless you reload it. With
        React, a page is like a living thing: click a button, and the page instantly updates
        without ever reloading.
      </p>

      <blockquote>
        📚 Straight from the source:{' '}
        <a href="https://react.dev/learn" target="_blank" rel="noreferrer">
          react.dev/learn
        </a>
      </blockquote>
    </>
  )
}
