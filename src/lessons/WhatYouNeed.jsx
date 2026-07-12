import CodeBlock from '../components/CodeBlock'

export default function WhatYouNeed() {
  return (
    <>
      <p>
        You don't need much to get started — most of this course works right in your web
        browser! But if you want to build projects on your own computer, here's what to
        install:
      </p>

      <h2>1. Node.js</h2>
      <p>
        Node.js lets your computer run JavaScript outside of a browser. Download it from{' '}
        <a href="https://nodejs.org" target="_blank" rel="noreferrer">
          nodejs.org
        </a>{' '}
        — pick the version marked <strong>LTS</strong> (it means "Long Term Support," the
        safest choice).
      </p>

      <h2>2. A code editor</h2>
      <p>
        A code editor is like a notebook made for writing code. We recommend{' '}
        <a href="https://code.visualstudio.com" target="_blank" rel="noreferrer">
          Visual Studio Code
        </a>{' '}
        — it's free and used by millions of developers.
      </p>

      <h2>3. Check it worked</h2>
      <p>Open a terminal and type:</p>
      <CodeBlock>{`node -v\nnpm -v`}</CodeBlock>
      <p>If you see version numbers printed, you're all set!</p>
    </>
  )
}
