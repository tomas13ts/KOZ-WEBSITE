import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Hero() {
  const [openPreview, setOpenPreview] = useState(false)

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side: copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full glass-effect text-xs font-semibold text-koz-primary">
              <span className="mr-2">⭑</span>
              KOZ app currently in development
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="gradient-text">Optimize</span> your{" "}
            <span className="gradient-text">PC for gaming</span>
            <br />
            <span className="text-koz-light">without guesswork</span>
          </h1>

          <p className="hero-subtitle mb-3">
            KOZ is a Windows optimization app built from the same workflows used
            in our one‑to‑one tuning services for competitive players.
          </p>
          <p className="hero-subtitle mb-8">
            While the app is in development, all updates, previews and
            changelogs are shared inside our Discord community with over 4,000
            members and 2,000+ paying clients.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <motion.a
              href="https://discord.gg/kripsoptimization"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Join the Discord community
            </motion.a>
          </div>
        </motion.div>

        {/* Right side: 3D mockup with click to expand */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-koz-primary/40 via-koz-secondary/30 to-koz-cyan/20 blur-3xl opacity-50 pointer-events-none" />

          <motion.button
            type="button"
            onClick={() => setOpenPreview(true)}
            whileHover={{ rotateX: 8, rotateY: -8, translateY: -6 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="relative rounded-[24px] overflow-hidden border border-koz-border bg-gradient-to-b from-white/8 to-white/2 shadow-xl shadow-koz-primary/20 cursor-pointer outline-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="/koz-dashboard.png"
              alt="KOZ app system overview"
              className="block w-full h-auto"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Fullscreen preview */}
      <AnimatePresence>
        {openPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setOpenPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-[90%] rounded-3xl overflow-hidden border border-koz-border-light bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-[0_24px_120px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/koz-dashboard.png"
                alt="KOZ app system overview large preview"
                className="block w-full h-auto"
              />

              <button
                type="button"
                onClick={() => setOpenPreview(false)}
                className="absolute top-4 right-4 px-3 py-1 rounded-full glass-effect text-xs text-koz-light"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
