"use client";
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { FaInstagram, FaLinkedin } from "react-icons/fa"; // install: npm install react-icons

import { Separator } from './ui/separator';
import Image from 'next/image';
import { motion } from "framer-motion";
import Logo from '../../public/logo.jpg';


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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Company Info */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center space-x-3 mb-4">
              <motion.div variants={popIn}>
                <Image
                  src={Logo}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-3xl"
                />
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
              <span className="text-sm">Made with love since 2022</span>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={slideLeft}>
            <h3 className="text-lg text-white mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex space-x-3">
                <MapPin className="h-4 w-4 text-saffron mt-1" />
                <div>
                  <a href="https://maps.app.goo.gl/JiyBZGidhvj2REoh8">
                    <p>Flat No. 1, Tower B, Anandam Apartment
                    </p>
                    <p>Dwarka Sector 28, New Delhi – 110077</p>
                  </a>
                </div>
              </div>
              <div className="flex space-x-3">
                <Phone className="h-4 w-4 text-saffron" />
                <a href="tel:+91 88822 92184" className="hover:text-white transition-colors">
                  +91 88822 92184
                </a>
              </div>
              <div className="flex space-x-3">
                <Mail className="h-4 w-4 text-saffron" />
                <a href="mailto:homefooddelightdelhi@gmail.com" className="hover:text-white transition-colors">
                  homefooddelightdelhi@gmail.com
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

        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Section */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-white/70">&copy;  Home Food Delite.</p>
            <p className="text-xs text-white/60">Made with ❤️ for food lovers everywhere</p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/homefooddelightdelhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-saffron transition-colors duration-200"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/home-food-delight/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-saffron transition-colors duration-200"
              aria-label="Connect on LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
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
