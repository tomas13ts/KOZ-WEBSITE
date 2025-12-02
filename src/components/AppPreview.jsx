import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AppPreview() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Motion values para animação ultra suave
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config para movimento super fluido
  const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rotação suave e limitada
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    mouseY.set(rotateXValue);
    mouseX.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="page-container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer"
            style={{ perspective: "1500px" }}
          >
            <motion.div
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              {/* Image Container - Clean */}
              <div className="relative rounded-2xl overflow-hidden border border-koz-border/40 shadow-2xl">
                <img
                  src="/koz-dashboard.png"
                  alt="KOZ Dashboard"
                  className="w-full h-auto"
                  draggable="false"
                />
                
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-koz-darker/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Glow effect clean */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -inset-1 bg-gradient-to-r from-koz-primary/20 to-koz-secondary/20 rounded-2xl blur-xl -z-10"
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
