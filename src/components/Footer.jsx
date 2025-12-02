import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()

  return (
  <footer className="mt-16 pt-10 pb-8 border-t border-white/5">
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
                {t("footer.tagline")}
              </div>
            </div>
          </div>

          {/* Links simples */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-koz-muted">
            <a href="#features" className="hover:text-koz-primary">
              {t("nav.features")}
            </a>
            <a href="#stats" className="hover:text-koz-primary">
              {t("stats.title")}
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
          <span>{t("footer.copyright").replace("{year}", year)}</span>
          <span>Made for competitive PC gamers.</span>
        </motion.div>
      </div>
    </footer>
  )
}
