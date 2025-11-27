import { motion } from "framer-motion"

const testimonials = [
  {
    name: "GODMOTA",
    role: "CS player",
    quote:
      "Service felt five‑star. PC finally handles casino slots and CS the way it should.",
    fpsGain: "CS: smoother & stable",
  },
  {
    name: "Bardock",
    role: "FiveM · Haven RP",
    quote:
      "Second optimization with Krips, now with overclock. Went from barely playable city FPS to smooth 300+ on a heavy server.",
    fpsGain: "90–100 → 300 FPS",
  },
  {
    name: "dn",
    role: "FiveM player",
    quote:
      "Tried several optimizations before, nothing compares. FPS are locked and stable with zero input lag.",
    fpsGain: "450+ FPS lock",
  },
  {
    name: "EsQ_23",
    role: "FiveM player",
    quote:
      "Top‑tier service, every question answered. Exclusive strafe feels better than ever and the system is clearly faster.",
    fpsGain: "Strafe upgrade · smoother aim",
  },
  {
    name: "015",
    role: "FiveM · Crazy Strafe",
    quote:
      "Two weeks after the session the setup still feels better every day. Exclusive strafe and 12.5 sens feel perfect in raids.",
    fpsGain: "330–360 FPS raids",
  },
  {
    name: "Dudyz",
    role: "FiveM & Valorant",
    quote:
      "Tier 3 speaks for itself. Huge FPS on base with 300 players and a solid boost on Valorant as well.",
    fpsGain: "FiveM base: 500 FPS",
  },
  {
    name: "Relax",
    role: "FiveM arena",
    quote:
      "Tier 3 turned arena fights into a different game. Super clean, fluid and fast. Exactly the kind of boost people look for.",
    fpsGain: "300–350 → 563+ FPS",
  },
  {
    name: "tuber",
    role: "FiveM player",
    quote:
      "Massive upgrade in both consistency and responsiveness. The before/after clips make it obvious.",
    fpsGain: "Big FPS jump · smoother fights",
  },
  {
    name: "ezzy.exe",
    role: "FiveM & YouTube",
    quote:
      "No ksOS, just Tier 3 and exclusive strafe. Simple, efficient and far ahead of the usual ‘optimizer’ attempts you see around.",
    fpsGain: "Strafe + FPS upgrade",
  },
  {
    name: "Félix",
    role: "FiveM player",
    quote:
      "Always had high FPS, but never reached this level of stability before. Tier 3 with exclusive strafe pushed it to a new ceiling.",
    fpsGain: "Up to 563 FPS",
  },
]

// animação tipo slider lento
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
  // duplicar array para loop contínuo
  const items = [...testimonials, ...testimonials]

  return (
    <section className="py-20" id="testimonials">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Feedback from real players
        </h2>
        <p className="text-sm md:text-base text-koz-muted max-w-xl">
          These are just a few of the results reported by players using our
          Tier 3 optimizations, exclusive strafe setups and custom Windows
          builds.
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
          {items.map((t, index) => (
            <div
              key={`${t.name}-${index}`}
              className="card-glass min-w-[280px] max-w-[320px] flex flex-col justify-between"
            >
              <p className="text-sm text-koz-light mb-3">
                “{t.quote}”
              </p>
              <div className="flex items-end justify-between text-[11px] text-koz-muted">
                <div>
                  <div className="font-medium text-koz-light">
                    {t.name}
                  </div>
                  <div>{t.role}</div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-wide text-koz-muted">
                    FPS gain
                  </span>
                  <span className="text-xs text-koz-light">
                    {t.fpsGain}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex justify-between items-center gap-4">
        <p className="text-xs text-koz-muted max-w-md">
          All feedback comes from real clients on our Discord server, where we
          share full clips, prints and detailed before/after results.
        </p>
        <motion.a
          href="https://discord.gg/kripsoptimization"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-secondary text-xs whitespace-nowrap"
        >
          View more feedback on Discord
        </motion.a>
      </div>
    </section>
  )
}
