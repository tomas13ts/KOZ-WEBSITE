import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

const initialStats = (t) => [
  { id: "fpsBoost",  label: t("stats.fpsBoost"),  target: 8,    suffix: "+" },
  { id: "latency",   label: t("stats.latency"),   target: 25,   suffix: "%" },
  { id: "games",     label: t("stats.games"),     target: 500,  suffix: "+" },
  { id: "users",     label: t("stats.users"),     target: 2000, suffix: "+" },
]

export default function Stats() {
  const { t, language } = useLanguage()

  const [stats, setStats] = useState(() =>
    initialStats(t).map((s) => ({ ...s, value: 0 }))
  )

  // Atualiza labels e reinicia valores quando o idioma muda
  useEffect(() => {
    setStats(initialStats(t).map((s) => ({ ...s, value: 0 })))
  }, [language, t])

  // Animação dos números
  useEffect(() => {
    if (!stats.length) return

    const timers = stats.map((_, index) =>
      setInterval(() => {
        setStats((prev) => {
          const next = [...prev]
          const current = next[index]
          if (!current) return prev
          if (current.value < current.target) {
            const step = Math.max(current.target / 60, 1)
            current.value = Math.min(current.value + step, current.target)
          }
          return next
        })
      }, 30)
    )

    return () => {
      timers.forEach(clearInterval)
    }
  }, [stats.length])

  return (
    <section className="py-20" id="stats">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          {t("stats.title")}
        </h2>
        <p className="text-sm md:text-base text-koz-muted max-w-xl">
          {t("stats.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id} // <- key estável
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
