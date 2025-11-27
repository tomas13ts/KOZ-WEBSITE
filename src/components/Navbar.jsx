import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Performance", href: "#stats" },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${isScrolled ? "glass-effect" : ""}`}
    >
      {/* Logo + nome */}
      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-koz-primary to-koz-secondary flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="KOZ Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-sm md:text-base font-semibold text-koz-light">
          KOZ
        </span>
      </motion.div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <div className="nav-links flex items-center">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <motion.a
          href="https://discord.gg/kripsoptimization"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="ml-4 text-xs font-semibold text-koz-light px-4 py-2 rounded-full glass-effect"
        >
          Discord
        </motion.a>
      </div>

      {/* Mobile button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden flex flex-col gap-1.5 ml-auto"
      >
        <span className="w-6 h-0.5 bg-koz-primary" />
        <span className="w-6 h-0.5 bg-koz-primary" />
        <span className="w-6 h-0.5 bg-koz-primary" />
      </motion.button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-16 left-0 right-0 md:hidden glass-effect px-6 py-4"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-koz-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://discord.gg/kripsoptimization"
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Discord
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
