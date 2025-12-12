import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import LanguageSelector from "./LanguageSelector"

export default function Navbar() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.download"), href: "#stats" },
    { label: t("nav.testimonials"), href: "#testimonials" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f0f1e]/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-4 focus:outline-none mx-auto md:mx-0"
          >
            <img src="/logo.png" alt="KOZ logo" className="h-6 w-6" />
            <span className="text-xl font-semibold tracking-tight text-white">
              KOZ
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-red-600/90 text-white flex items-center gap-1">
              🎅 Christmas Prices
            </span>
          </button>

  {/* Desktop nav */}
  <div className="hidden md:flex items-center gap-8">
    {navItems.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="text-gray-300 hover:text-white transition-colors text-sm"
      >
        {item.label}
      </a>
    ))}

    <a
      href="https://discord.gg/kripsoptimization"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium shadow-lg shadow-indigo-500/30 transition-colors"
    >
      Discord
    </a>

    <LanguageSelector />
  </div>
</div>


        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 flex flex-col gap-4 pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors py-2 text-sm"
              >
                {item.label}
              </a>
            ))}

            <a
              href="https://discord.gg/kripsoptimization"
              onClick={() => setMobileMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium shadow-lg shadow-indigo-500/30 transition-colors text-center"
            >
              Discord
            </a>

            <LanguageSelector />
          </motion.div>
        )}
      </div>
    </nav>
  )
}
