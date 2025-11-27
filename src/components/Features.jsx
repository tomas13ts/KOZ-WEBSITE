import { motion } from "framer-motion"

export default function Features() {
  return (
    <section className="py-20" id="features">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Features built for competitive players
        </h2>
        <p className="text-sm md:text-base text-koz-muted max-w-xl">
          KOZ focuses on what actually improves gaming performance, without
          bloat or noise. Everything is designed to be clear and fast to use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1 – Latency optimization */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, margin: "-60px" }}
          className="card-glass"
        >
          <div className="mb-3">
            {/* clean line “signal” icon */}
            <svg
              className="w-6 h-6 text-koz-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 18V10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M10 18V6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M16 18V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M20 18V4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-koz-light mb-2">
            Latency optimization
          </h3>
          <p className="text-sm text-koz-muted">
            Reduce ping spikes and stabilize your connection with network-level
            tweaks.
          </p>
        </motion.div>

        {/* 2 – Game-focused profiles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, margin: "-60px" }}
          className="card-glass"
        >
          <div className="mb-3">
            {/* minimal controller icon */}
            <svg
              className="w-6 h-6 text-koz-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="3.5"
                y="9"
                width="17"
                height="6"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M9 12H7m1-1v2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-koz-light mb-2">
            Game-focused profiles
          </h3>
          <p className="text-sm text-koz-muted">
            Apply optimized presets for your favorite titles with a single
            click.
          </p>
        </motion.div>

        {/* 3 – Real-time monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, margin: "-60px" }}
          className="card-glass"
        >
        <div className="mb-3">
  {/* clean heartbeat line icon */}
  <svg
    className="w-6 h-6 text-koz-primary"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 12h4l2-4 3 8 2-4h7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>
          <h3 className="text-lg font-semibold text-koz-light mb-2">
            Real-time monitoring
          </h3>
          <p className="text-sm text-koz-muted">
            Track CPU, RAM and latency in a clean, distraction‑free interface.
          </p>
        </motion.div>

        {/* 4 – Safe by design */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, margin: "-60px" }}
          className="card-glass"
        >
          <div className="mb-3">
            {/* shield line icon */}
            <svg
              className="w-6 h-6 text-koz-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3.5l6 2.4v5.2c0 3.8-2.1 6.3-6 7.9-3.9-1.6-6-4.1-6-7.9V5.9l6-2.4z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 12.2L11 13.7l3.5-3.7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-koz-light mb-2">
            Safe by design
          </h3>
          <p className="text-sm text-koz-muted">
            All tweaks are reversible. Restore your system to defaults anytime.
          </p>
        </motion.div>

        {/* 5 – Advanced control */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, margin: "-60px" }}
          className="card-glass"
        >
          <div className="mb-3">
            {/* sliders icon */}
            <svg
              className="w-6 h-6 text-koz-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 5v14M12 5v14M18 5v14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-koz-light mb-2">
            Advanced control
          </h3>
          <p className="text-sm text-koz-muted">
            Fine‑tune services, processes and network routes when you need full
            control.
          </p>
        </motion.div>

        {/* 6 – Lightweight engine */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, margin: "-60px" }}
          className="card-glass"
        >
          <div className="mb-3">
            {/* minimal rocket */}
            <svg
              className="w-6 h-6 text-koz-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14 3.5c-3 1.3-4.9 3.2-6.2 6.2l2.8 2.8c3-1.3 4.9-3.2 6.2-6.2L14 3.5z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.2 16.8L6 20l3.2-1.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-koz-light mb-2">
            Lightweight engine
          </h3>
          <p className="text-sm text-koz-muted">
            Built to be fast and efficient, with minimal resource usage.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
