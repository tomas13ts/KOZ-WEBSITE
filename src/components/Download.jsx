import { motion } from "framer-motion"

const platforms = [
  {
    os: "Windows",
    icon: "🪟",
    description: "Windows 10 / 11, 64-bit",
    version: "v0.9.0 Beta",
    size: "≈ 150 MB",
    primary: true,
  },
  {
    os: "macOS",
    icon: "",
    description: "Planned support",
    version: "Coming soon",
    size: "",
    disabled: true,
  },
  {
    os: "Linux",
    icon: "🐧",
    description: "Planned support",
    version: "Coming soon",
    size: "",
    disabled: true,
  },
]

export default function Download() {
  return (
    <section className="py-20" id="download">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Ready to{" "}
          <span className="gradient-text">optimize your setup</span>?
        </h2>
        <p className="text-sm md:text-base text-koz-muted max-w-xl">
          KOZ is currently available for Windows, with more platforms on the
          roadmap. Download the beta and start testing the new performance
          engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {platforms.map((platform) => (
          <motion.div
            key={platform.os}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, margin: "-40px" }}
            className={`card-glass text-left ${
              platform.disabled ? "opacity-60" : ""
            }`}
          >
            <div className="text-3xl mb-3">{platform.icon}</div>
            <h3 className="text-lg font-semibold text-koz-light mb-1">
              {platform.os}
            </h3>
            <p className="text-sm text-koz-muted mb-3">
              {platform.description}
            </p>
            <p className="text-xs text-koz-muted mb-4">
              {platform.version}
              {platform.size && ` • ${platform.size}`}
            </p>

            <button
              disabled={platform.disabled}
              className={`w-full py-2 rounded-lg text-sm font-semibold ${
                platform.disabled
                  ? "border border-koz-border text-koz-muted cursor-not-allowed"
                  : "btn-primary"
              }`}
            >
              {platform.disabled ? "Coming soon" : "Download beta"}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
