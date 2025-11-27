import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const initialStats = [
  { label: "Average FPS boost", target: 65, suffix: "%" },
  { label: "Latency reduction", target: 25, suffix: "%" },
  { label: "Games optimized", target: 500, suffix: "+" },
  { label: "Beta users", target: 2000, suffix: "+" },
]

export default function Stats() {
  const [stats, setStats] = useState(
    initialStats.map((s) => ({ ...s, value: 0 }))
  )

  useEffect(() => {
    const timers = stats.map((_, index) =>
      setInterval(() => {
        setStats((prev) => {
          const next = [...prev]
          const current = next[index]
          if (current.value < current.target) {
            const step = Math.max(current.target / 60, 1)
            current.value = Math.min(current.value + step, current.target)
          }
          return next
        })
      }, 30)
    )

    return () => timers.forEach(clearInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="py-20" id="stats">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Performance you can measure
        </h2>
        <p className="text-sm md:text-base text-koz-muted max-w-xl">
          Live metrics reported by KOZ users, so you have a clear idea of what
          to expect before installing.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, margin: "-40px" }}
            className="card-glass text-center"
          >
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
              {Math.round(stat.value)}
              {stat.suffix}
            </div>
            <div className="text-xs md:text-sm text-koz-muted">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
