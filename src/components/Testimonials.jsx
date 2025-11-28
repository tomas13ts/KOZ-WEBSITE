import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

const sliderVariants = {
  initial: { x: 0 },
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 60,
        ease: "linear",
      },
    },
  },
}

export default function Testimonials() {
  const { t } = useLanguage()

  // lê os testemunhos do ficheiro de traduções
  const testimonials = t("testimonials.items")

  // duplicar array para loop contínuo
  const items = [...testimonials, ...testimonials]

  return (
    <section className="py-20" id="testimonials">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          {t("testimonials.title")}
        </h2>
        <p className="text-sm md:text-base text-koz-muted max-w-xl">
          {t("testimonials.subtitle")}
        </p>
      </div>

      {/* slider horizontal lento */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-4"
          variants={sliderVariants}
          initial="initial"
          animate="animate"
        >
          {items.map((tItem, index) => (
            <div
              key={`${tItem.name}-${index}`}
              className="card-glass min-w-[280px] max-w-[320px] flex flex-col justify-between"
            >
              <p className="text-sm text-koz-light mb-3">
                “{tItem.quote}”
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
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex justify-between items-center gap-4">
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
    </section>
  )
}
