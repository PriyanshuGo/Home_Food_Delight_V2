"use client";

import { ArrowRight, Award } from "lucide-react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

// ===== Animation Variants =====
const fadeUpSpring = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: 0.6,
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
});

const iconPop = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay,
      type: "spring",
      stiffness: 120,
      damping: 8,
    },
  },
});

function CTA() {
  const router = useRouter();

  return (
    <motion.section
      className="relative bg-white py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 to-warm-beige opacity-80 pointer-events-none" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          variants={fadeUpSpring(0)}
        >
          {/* Icon */}
          <motion.div variants={iconPop(0.1)}>
            <Award className="h-14 w-14 text-saffron mx-auto" />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUpSpring(0.15)}
            className="text-4xl md:text-5xl font-extrabold text-brown leading-tight"
          >
            Your Daily Dose of{" "}
            <span className="text-saffron">Home-Cooked</span> Happiness 🍱
          </motion.h2>

          {/* Main Description */}
          <motion.p
            variants={fadeUpSpring(0.25)}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Tired of oily takeout? Enjoy delicious, balanced meals made with
            love — just like your mom would make. Delivered fresh, every day.
          </motion.p>

          {/* Secondary Note */}
          <motion.p
            variants={fadeUpSpring(0.35)}
            className="text-sm text-muted-foreground italic"
          >
            No hidden charges — you only pay for your meal + 50% of the delivery
            fee.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUpSpring(0.45)}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            {/* View Menu Button */}
            <motion.div
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
            >
              <Button
                size="lg"
                className="bg-saffron text-white hover:bg-saffron-dark px-8 py-3 text-lg font-medium shadow-md"
                onClick={() => router.push("/menu")}
              >
                View Today’s Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Call Button */}
            <motion.div
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
            >
              <Button
                size="lg"
                variant="ghost"
                className="border border-saffron text-saffron hover:bg-saffron hover:text-white px-8 py-3 text-lg"
              >
                Call Us: +91 88822 92184
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default CTA;
