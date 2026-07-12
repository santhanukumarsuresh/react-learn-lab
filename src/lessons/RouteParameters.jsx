import CodeSandbox from '../components/CodeSandbox'

export default function RouteParameters() {
  return (
    <>
      <p>
        So far, every route has pointed to one fixed page. But what about something like a
        product page, where <code>/products/1</code>, <code>/products/2</code>, and{' '}
        <code>/products/3</code> all use the <em>same</em> component, just showing
        different data? That's exactly what <strong>route parameters</strong> are for.
      </p>

      <h2>Defining a route with a parameter</h2>
      <p>
        Put a colon before a segment of the path to mark it as a parameter:
      </p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`<Route path="/products/:productId" element={<ProductPage />} />`}</code>
      </pre>
      <p>
        Now any URL like <code>/products/42</code> matches this route, and{' '}
        <code>42</code> becomes available as <code>productId</code>.
      </p>

      <h2>Reading the parameter with useParams</h2>
      <p>
        Since we can't nest a second live router inside this page's own router, here's a
        simplified version using plain state to represent "the current productId," the same
        way earlier routing lessons did:
      </p>
      <CodeSandbox
        code={`function ProductPage({ productId }) {
  const products = {
    "1": "Rubber Duck",
    "2": "Wireless Mouse",
    "3": "Coffee Mug",
  };

  return <h2>Product #{productId}: {products[productId] || "Not found"}</h2>;
}

function Example() {
  const [productId, setProductId] = useState("1");

  return (
    <div>
      <nav>
        <button onClick={() => setProductId("1")}>Product 1</button>
        <button onClick={() => setProductId("2")}>Product 2</button>
        <button onClick={() => setProductId("3")}>Product 3</button>
      </nav>
      <ProductPage productId={productId} />
    </div>
  );
}

render(<Example />);`}
      />

      <p>In a real app with React Router, you'd read it like this instead:</p>
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        <code className="font-mono">{`import { useParams } from "react-router-dom";

function ProductPage() {
  const { productId } = useParams();
  return <h2>Product #{productId}</h2>;
}`}</code>
      </pre>
      <p>
        <code>useParams()</code> reads whatever's in the URL at that moment and gives you an
        object with each named parameter — here, just <code>productId</code>, matching the{' '}
        <code>:productId</code> in the route's path.
      </p>

      <h2>Multiple parameters</h2>
      <p>
        You can have more than one in the same path, like{' '}
        <code>/users/:userId/posts/:postId</code> — <code>useParams()</code> would then
        return <code>{'{ userId, postId }'}</code>.
      </p>

      <blockquote>
        📚 Learn more:{' '}
        <a href="https://reactrouter.com/start/framework/route-module#params" target="_blank" rel="noreferrer">
          reactrouter.com: URL Params
        </a>
      </blockquote>
    </>
  )
}
