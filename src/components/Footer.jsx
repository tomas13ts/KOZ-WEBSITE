import { motion } from "framer-motion"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-koz-border-light pt-10 pb-8">
      <div className="page-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Logo + texto curto */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-koz-primary to-koz-secondary flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="KOZ Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-koz-light">
                KOZ Optimizer
              </div>
              <div className="text-xs text-koz-muted">
                Focused Windows performance tuning for gamers.
              </div>
            </div>
          </div>

          {/* Links simples */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-koz-muted">
            <a href="#features" className="hover:text-koz-primary">
              Features
            </a>
            <a href="#stats" className="hover:text-koz-primary">
              Performance
            </a>
            <span className="hidden md:inline text-koz-border-light">|</span>
            <a href="#" className="hover:text-koz-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-koz-primary">
              Terms
            </a>
          </div>
        </div>

        {/* Linha final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-koz-muted"
        >
          <span>© {year} KOZ. All rights reserved.</span>
          <span>Made for competitive PC gamers.</span>
        </motion.div>
      </div>
    </footer>
  )
}
