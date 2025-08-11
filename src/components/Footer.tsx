"use client";
import { MapPin, Phone, Mail, Clock, Heart, Instagram, Twitter } from 'lucide-react';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function Footer() {
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const popIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
      className="bg-brown text-white mt-16 border-t border-saffron/20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center space-x-3 mb-4">
              <motion.div variants={popIn}>
              </motion.div>
              <div>
                <h3 className="text-lg text-white">Home Food Delite</h3>
                <p className="text-sm text-white/70">Authentic Tiffin Service</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Bringing the taste of home to your doorstep with fresh, authentic Indian meals prepared daily with love and traditional recipes.
            </p>
            <motion.div
              variants={slideLeft}
              className="flex items-center space-x-2 text-white/70 mt-4"
            >
              <Heart className="h-4 w-4 text-saffron" />
              <span className="text-sm">Made with love since 2020</span>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={slideLeft}>
            <h3 className="text-lg text-white mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex space-x-3">
                <MapPin className="h-4 w-4 text-saffron mt-1" />
                <div>
                  <p>123 Main St Anytown CA</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Phone className="h-4 w-4 text-saffron" />
                <a href="tel:+ (555) 123-4567" className="hover:text-white transition-colors">
                  +91 555 123-4567
                </a>
              </div>
              <div className="flex space-x-3">
                <Mail className="h-4 w-4 text-saffron" />
                <a href="mailto:info@greeneartlandscaping.com" className="hover:text-white transition-colors">
                  info@greeneartlandscaping.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Operating Hours */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg text-white mb-4">Operating Hours</h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex space-x-3">
                <Clock className="h-4 w-4 text-saffron mt-1" />
                <div>
                  <p className="text-white">Order Timing:</p>
                  <p>6:00 AM - 10:00 AM</p>
                  <p className="text-xs text-white/60">(Daily orders)</p>
                </div>
              </div>
              <div>
                <p className="text-white">Working Days:</p>
                <p>Monday - Sunday</p>
                <p className="text-xs text-white/60">(No holidays for hunger!)</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={slideLeft}>
            <h3 className="text-lg text-white mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              {["Today's Menu", "About Us", "Pricing", "Contact", "FAQ"].map((item, idx) => (
                <motion.a
                  variants={fadeUp}
                  key={idx}
                  href="#"
                  className="block text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Section */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-white/70">&copy;  Home Food Delite.</p>
            <p className="text-xs text-white/60">Made with ❤️ for food lovers everywhere</p>
          </div>
          <div>

          </div>
        </motion.div>

        {/* Special Offers Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-8 bg-saffron p-5 rounded-lg text-center shadow-md shadow-orange-600/50"
        >
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white/90 text-base font-semibold"
          >
            *Delivery Free within <span className="font-bold">3km</span> 🚚
          </motion.p>
          <p className="text-white/70 text-sm mt-1 italic">
            Hurry, offer valid for a limited time!
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
