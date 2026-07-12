export default function ProgressBar({ percent, className = '', showLabel = true }) {
  return (
    <div className={className}>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1.5 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
          {percent}%
        </p>
      )}
    </div>
  )
}
