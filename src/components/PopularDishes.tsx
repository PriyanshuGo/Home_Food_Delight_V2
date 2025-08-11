"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, Variants, Transition } from "framer-motion";

const popUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  },
});

function PopularDishes() {
  const router = useRouter();

  const popularDishes = [
    {
      id: "rajma-chawal",
      name: "Rajma Chawal",
      description:
        "Traditional kidney bean curry served with steamed basmati rice",
      price: 120,
      image: "/menuItems/FishFry.webp",
      popular: true,
    },
    {
      id: "dal-tadka",
      name: "Dal Tadka Thali",
      description:
        "Yellow lentil curry with roti, rice, pickle, and salad",
      price: 100,
      image: "/menuItems/FishFry.webp",
      popular: true,
    },
    {
      id: "chole-bhature",
      name: "Chole Bhature",
      description:
        "Spiced chickpea curry served with fluffy deep-fried bread",
      price: 140,
      image: "/menuItems/FishFry.webp",
      popular: true,
    },
    {
      id: "paneer-butter-masala",
      name: "Paneer Butter Masala",
      description: "Creamy cottage cheese curry with naan and rice",
      price: 160,
      image: "/menuItems/FishFry.webp",
      popular: true,
    },
  ];

  return (
    <section className="py-16 bg-warm-beige">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={popUp(0)}
            className="text-3xl md:text-4xl font-bold text-brown mb-4"
          >
            Today&apos;s Popular Dishes
          </motion.h2>
          <motion.p
            variants={popUp(0.1)}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Fresh, authentic flavors prepared daily with traditional recipes and the finest ingredients
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {popularDishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              variants={popUp(i * 0.15)}
              whileHover={{ rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Card className="overflow-hidden border-0 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative">
                  {/* Image reveal animation */}
                  <motion.div
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>

                  {dish.popular && (
                    <Badge className="absolute top-3 left-3 bg-saffron text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-brown">{dish.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {dish.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-saffron">
                      ₹{dish.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-saffron hover:scale-105 hover:bg-saffron-dark transition-transform duration-200 text-white"
                      onClick={() => router.push("/menu")}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Menu */}
        <motion.div
          className="text-center mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={popUp(0.3)}
        >
          <Button
            variant="outline"
            className="border-saffron text-saffron hover:bg-saffron hover:text-white"
            onClick={() => router.push("/menu")}
          >
            View Full Menu
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default PopularDishes;
