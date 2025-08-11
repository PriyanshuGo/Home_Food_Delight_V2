"use client";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useRouter } from "next/navigation";
import {
  motion,
  useAnimation,
  Variants,
  Transition,
  useTransform,
  useScroll,
} from "framer-motion";
import CountUp from "react-countup";
import { useRef, useEffect, useState } from "react";

// Animation Variants
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" as Transition["ease"] },
  },
});

const slideLeft = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" },
  },
});

const scalePop = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

function HeroPage() {
  const router = useRouter();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  // Scroll-based parallax
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 300], ["0%", "20%"]);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <div>
      <section
        className="relative bg-gradient-to-br from-warm-beige to-white py-20 overflow-hidden"
        style={{ backgroundAttachment: "fixed" }}
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&h=800&fit=crop')] bg-cover bg-center opacity-10"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            {/* Badge with scale pop */}
            <motion.div variants={scalePop(0)}>
              <Badge variant="outline" className="border-saffron text-saffron bg-white/80">
                ⭐ Authentic Home-Style Cooking Since 2020
              </Badge>
            </motion.div>

            {/* Title with fadeUp */}
            <motion.h1
              variants={fadeUp(0.2)}
              className="text-4xl md:text-6xl font-bold text-brown leading-tight"
            >
              Taste of <span className="text-saffron">Home</span>,<br />
              Delivered Fresh Daily
            </motion.h1>

            {/* Subtitle sliding in from left */}
            <motion.p
              variants={slideLeft(0.4)}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              “We don&apos;t reheat food — we cook it fresh when you order. Order early, and enjoy
              meals that feel like home.”
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp(0.6)}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-saffron hover:bg-saffron-dark text-white px-8 py-3 text-lg shadow-warm-lg"
                onClick={() => router.push("/menu")}
              >
                View Today&apos;s Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm text-muted-foreground"
              >
                <Clock className="h-4 w-4 text-saffron" />
                <span>Order now</span>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              className="flex justify-center items-center space-x-8 pt-8"
            >
              <motion.div variants={scalePop(0.4)}>
                <p className="text-2xl font-bold text-saffron">
                  {inView && <CountUp end={100} duration={2} />}%
                </p>
                <p className="text-sm text-muted-foreground">Fresh Daily</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HeroPage;
