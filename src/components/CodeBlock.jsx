// A simple read-only, styled code snippet (not editable).
export default function CodeBlock({ children }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
      <code className="font-mono">{children}</code>
    </pre>
  )
}
