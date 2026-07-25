import { motion } from 'motion/react'

export default function ProgressBar({ percent, className = '', showLabel = true }) {
  return (
    <div className={className}>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand via-brand-light to-brand-teal"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
        />
      </div>
      {showLabel && (
        <p className="mt-1.5 text-right text-xs font-medium text-muted-foreground">
          {percent}%
        </p>
      )}
    </div>
  )
}
