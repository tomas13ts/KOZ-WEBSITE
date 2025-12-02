import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"

const VELOCITY = -30 // velocidade do scroll automático

export default function Testimonials() {
  const { t } = useLanguage()
  const [isDragging, setIsDragging] = useState(false)
  const baseX = useMotionValue(0)
  const lastTimeRef = useRef(0)

  const testimonials = t("testimonials.items")
  const items = [...testimonials, ...testimonials, ...testimonials]

  // Auto-scroll contínuo
  useAnimationFrame((time, delta) => {
    if (!isDragging && delta < 100) { // delta check para evitar jumps
      const moveBy = (VELOCITY / 1000) * delta
      const currentX = baseX.get()
      const newX = currentX + moveBy
      
      baseX.set(newX)

      // Loop infinito suave
      if (newX < -2000) {
        baseX.set(newX + 1000)
      }
      if (newX > 100) {
        baseX.set(newX - 1000)
      }
    }
    lastTimeRef.current = time
  })

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    // Pequeno delay para transição suave
    setTimeout(() => {
      setIsDragging(false)
    }, 50)
  }

  return (
    <section className="py-20" id="testimonials">
      <div className="page-container">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {t("testimonials.title")}
          </h2>
          <p className="text-sm md:text-base text-koz-muted max-w-xl">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="overflow-hidden relative cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={{ left: -5000, right: 500 }}
            dragElastic={0.02}
            dragMomentum={false}
            dragTransition={{ 
              power: 0,
              timeConstant: 0
            }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ x: baseX }}
            className="flex gap-4 will-change-transform"
            whileTap={{ cursor: "grabbing" }}
          >
            {items.map((tItem, index) => (
              <motion.div
                key={`${tItem.name}-${index}`}
                className="card-glass min-w-[280px] max-w-[320px] flex flex-col justify-between select-none"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <p className="text-sm text-koz-light mb-3">
                  "{tItem.quote}"
                </p>
                <div className="flex items-end justify-between text-[11px] text-koz-muted">
                  <div>
                    <div className="font-medium text-koz-light">
                      {tItem.name}
                    </div>
                    <div>{tItem.role}</div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-wide text-koz-muted">
                      {t("testimonials.fpsGainLabel")}
                    </span>
                    <span className="text-xs text-koz-light">
                      {tItem.fpsGain}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-koz-darker via-koz-darker/50 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-koz-darker via-koz-darker/50 to-transparent pointer-events-none z-10" />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-koz-muted max-w-md">
            {t("testimonials.disclaimer")}
          </p>
          <motion.a
            href="https://discord.gg/kripsoptimization"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="btn-secondary text-xs whitespace-nowrap"
          >
            {t("testimonials.cta")}
          </motion.a>
        </div>
      </div>
    </section>
  )
}
