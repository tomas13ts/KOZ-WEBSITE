import { motion } from "framer-motion"

export default function BetaAnnouncement() {
  return (
    <section className="py-16" id="beta">
      <div className="card-glass">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-4 text-sm font-semibold text-koz-accent-orange">
            Limited Early Access
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Early access to <span className="gradient-text">KOZ Optimizer</span>
          </h2>

          <p className="text-sm md:text-base text-koz-muted max-w-xl mb-6">
            KOZ is currently in open beta. Get access to the latest
            performance tweaks and help shape the next generation of PC
            optimization.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-koz-light">
              <span>✓</span>
              Full feature access during beta
            </div>
            <div className="flex items-center gap-2 text-sm text-koz-light">
              <span>✓</span>
              Lifetime discount for early users
            </div>
            <div className="flex items-center gap-2 text-sm text-koz-light">
              <span>✓</span>
              Direct feedback channel to the dev team
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-sm"
          >
            Get beta access
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
