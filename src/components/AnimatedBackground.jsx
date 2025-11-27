import { motion } from "framer-motion"

export default function AnimatedBackground({ scrollY }) {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Camada base: gradiente KOZ */}
      <div className="absolute inset-0 bg-gradient-to-br from-koz-darker via-koz-dark to-koz-darker" />

      {/* Luz principal suave atrás do hero (parallax leve com scroll) */}
      <motion.div
        className="absolute -top-40 left-[-10%] w-[900px] h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.55), transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Reflexo discreto no lado direito */}
      <motion.div
        className="absolute top-1/3 right-[-15%] w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.35), transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Leve parallax com scroll para dar profundidade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 80%, rgba(34,211,238,0.2), transparent 60%)",
          transform: `translateY(${scrollY * 0.05}px)`,
          filter: "blur(30px)",
          opacity: 0.4,
        }}
      />

      {/* Textura quase invisível */}
      <div className="absolute inset-0 bg-grid opacity-[0.015]" />

      {/* Vignette para foco no centro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
    </div>
  )
}
