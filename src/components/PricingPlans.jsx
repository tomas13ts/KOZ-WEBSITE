// PricingPlans.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Flame, Rocket, Crown, Lock, RotateCcw, Bolt, Gamepad2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext"

const plans = [
  {
    id: "1month",
    duration: 1,
    price: "9,99€",
    priceValue: 9.99,
    link: "",
    icon: Zap,
    popular: false,
  },
  {
    id: "3months",
    duration: 3,
    price: "26,99€",
    priceValue: 26.99,
    link: "",
    icon: Flame,
    popular: true,
  },
  {
    id: "6months",
    duration: 6,
    price: "49,99€",
    priceValue: 49.99,
    link: "",
    icon: Rocket,
    popular: false,
  },
  {
    id: "12months",
    duration: 12,
    price: "95,99€",
    priceValue: 95.99,
    link: "",
    icon: Crown,
    popular: false,
  },
];

const getSavings = (plan) => {
  if (plan.duration === 1) return null;
  const monthlyEquivalent = 9.99 * plan.duration;
  const savings = ((monthlyEquivalent - plan.priceValue) / monthlyEquivalent * 100).toFixed(0);
  return savings > 0 ? savings : null;
};

const getPricePerMonth = (plan) => {
  return (plan.priceValue / plan.duration).toFixed(2);
};

// Componente Typewriter com loop infinito
function TypewriterText({ text, className }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const handleType = () => {
      const fullText = text;

      if (!isDeleting && displayText === fullText) {
        // Texto completo - pausa 3 segundos antes de apagar
        setTimeout(() => setIsDeleting(true), 3000);
        return;
      }

      if (isDeleting && displayText === "") {
        // Texto apagado - recomeça
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(80);
        return;
      }

      const timeout = setTimeout(() => {
        if (!isDeleting) {
          // Escrevendo
          setDisplayText(fullText.substring(0, displayText.length + 1));
          setTypingSpeed(80);
        } else {
          // Apagando
          setDisplayText(fullText.substring(0, displayText.length - 1));
          setTypingSpeed(50); // Apaga mais rápido
        }
      }, typingSpeed);

      return () => clearTimeout(timeout);
    };

    const timeout = handleType();
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text, typingSpeed, loopNum]);

  return (
    <h2 className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-8 bg-gradient-to-b from-koz-primary to-koz-secondary ml-1"
      >
        |
      </motion.span>
    </h2>
  );
}

export default function PricingPlans() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="page-container relative z-10">
        {/* Header com Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-xl mx-auto"
        >
          <TypewriterText 
            text={t("pricing.title")}
            className="text-3xl md:text-4xl font-bold gradient-text mb-2 tracking-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-koz-muted/90 font-medium"
          >
            {t("pricing.subtitle")}
          </motion.p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const savings = getSavings(plan);
            const pricePerMonth = getPricePerMonth(plan);
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative group"
              >
                <div
                  className={`
                    relative h-full card-glass p-5 rounded-2xl transition-all duration-300
                    ${plan.popular 
                      ? 'ring-2 ring-koz-primary/60 shadow-xl shadow-koz-primary/10 md:scale-[1.02]' 
                      : 'hover:ring-1 hover:ring-koz-primary/30'
                    }
                    hover:-translate-y-1 hover:shadow-lg hover:shadow-koz-primary/5
                  `}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-koz-primary to-koz-secondary px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-md">
                        {t("pricing.recommended")}
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-5 flex justify-center">
                    <div className="p-3 bg-koz-primary/10 rounded-xl border border-koz-primary/20 group-hover:border-koz-primary/40 transition-colors">
                      <Icon className="w-8 h-8 text-koz-primary" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-koz-light">
                      {plan.duration}
                    </h3>
                    <p className="text-xs text-koz-muted font-medium uppercase tracking-wider mt-0.5">
                      {plan.duration === 1 ? t("pricing.month") : t("pricing.months")}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-koz-border/50">
                    <div className="text-3xl font-black gradient-text text-center mb-1">
                      {plan.price}
                    </div>
                    <div className="text-xs text-koz-muted text-center">
                      {pricePerMonth}€/{t("pricing.perMonth")}
                    </div>
                    {savings && (
                      <div className="text-[10px] text-koz-green font-bold mt-1.5 text-center">
                        {t("pricing.save")} {savings}%
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-5 flex-grow">
                    {[
                      t("pricing.features.optimization"),
                      t("pricing.features.ramClean"),
                      t("pricing.features.profiles"),
                      t("pricing.features.monitoring"),
                      t("pricing.features.support"),
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <span className="text-koz-primary text-sm flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-koz-light/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={plan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      block w-full py-2.5 px-4 rounded-xl text-sm font-bold text-center transition-all duration-300
                      ${plan.popular 
                        ? 'btn-primary' 
                        : 'btn-secondary'
                      }
                    `}
                  >
                    {t("pricing.buyNow")}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-effect rounded-2xl p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Lock, text: t("pricing.trust.secure") },
                { icon: RotateCcw, text: t("pricing.trust.guarantee") },
                { icon: Bolt, text: t("pricing.trust.instant") },
                { icon: Gamepad2, text: t("pricing.trust.cancel") },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2.5 group cursor-default"
                >
                  <div className="p-2.5 bg-koz-primary/10 rounded-lg border border-koz-primary/20 group-hover:border-koz-primary/40 transition-colors">
                    <item.icon className="w-5 h-5 text-koz-primary" strokeWidth={2} />
                  </div>
                  <span className="text-xs text-koz-muted font-medium text-center leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
