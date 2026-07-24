import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const SERIES = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

function shortLabel(title) {
  // "Part 4 · Components" → "Part 4"; "Start Here" stays as-is.
  return title.split('·')[0].trim()
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold">{d.fullTitle}</p>
      <p className="mt-0.5 text-muted-foreground">
        {d.done} / {d.total} lessons complete
      </p>
    </div>
  )
}

/** Per-part completion dashboard (Recharts, reading the brand chart tokens). */
export default function ProgressChart({ parts, isComplete }) {
  const data = parts.map((part) => {
    const done = part.lessons.filter((l) => isComplete(part.id, l.slug)).length
    return {
      name: shortLabel(part.title),
      fullTitle: part.title,
      done,
      total: part.lessons.length,
    }
  })

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={48}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip cursor={{ fill: 'var(--accent)', opacity: 0.5 }} content={<ChartTooltip />} />
          <Bar dataKey="done" radius={[6, 6, 0, 0]} maxBarSize={36} isAnimationActive>
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={SERIES[i % SERIES.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
