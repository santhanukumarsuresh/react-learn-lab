import CodeBlock from '../components/CodeBlock'

export default function FirstProject() {
  return (
    <>
      <p>
        The fastest way to start a real React project on your own computer uses a tool
        called <strong>Vite</strong> (pronounced "veet," it's French for "fast"). Open your
        terminal and type:
      </p>

      <CodeBlock>{`npm create vite@latest my-first-app -- --template react
cd my-first-app
npm install
npm run dev`}</CodeBlock>

      <p>
        That last command starts a little local server on your computer. Open the link it
        shows you (usually <code>http://localhost:5173</code>) in your browser, and you'll
        see your very first React app running!
      </p>

      <h2>What just happened?</h2>
      <ul>
        <li>
          <code>npm create vite@latest</code> downloaded a starter React project for you.
        </li>
        <li>
          <code>npm install</code> downloaded all the extra code your project needs to run.
        </li>
        <li>
          <code>npm run dev</code> started a live preview that updates instantly whenever
          you save a file.
        </li>
      </ul>

      <p>
        You don't need to run these commands right now to keep learning here — every lesson
        has code boxes you can try directly in the browser. But when you're ready to build
        your own project, this is exactly how you'll start!
      </p>
    </>
  )
}
