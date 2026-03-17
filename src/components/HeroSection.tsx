import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import heroImg from "@/assets/products/hero-devices.png";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <Zap className="w-3 h-3" /> New Arrivals In Stock
            </span>
            <h1 className="text-4xl md:text-6xl font-medium text-foreground leading-[1.1] mb-6">
              Engineering the future of your
              <span className="text-primary"> desk setup.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Premium gadgets. Transparent pricing. Trade-in your old devices. Order directly via WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors nexus-ease"
              >
                Browse Gadgets <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/deals"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors nexus-ease"
              >
                View Deals
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0, 0, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[80px]" />
              <img
                src={heroImg}
                alt="Premium gadgets collection - phones, laptops, earbuds, tablets and more"
                className="relative w-80 md:w-[28rem]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
