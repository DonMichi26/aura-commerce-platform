import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const slides = [
  {
    image: hero1,
    subtitle: "Nueva Colección",
    title: "Elegancia\nAtemporal",
    cta: "Explorar colección",
    href: "/products",
  },
  {
    image: hero2,
    subtitle: "Accesorios Premium",
    title: "Detalles que\nMarcan la Diferencia",
    cta: "Ver accesorios",
    href: "/products?category=accessories",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden bg-secondary">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative container-wide h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg"
          >
            <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] gold-text mb-4 block">
              {slide.subtitle}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line">
              {slide.title}
            </h1>
            <Link
              to={slide.href}
              className="inline-block mt-8 px-8 py-3 bg-primary text-primary-foreground text-sm font-body font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              {slide.cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
          className="w-10 h-10 border border-foreground/20 flex items-center justify-center hover:bg-foreground/10 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-0.5 transition-all duration-300 ${i === current ? "w-8 bg-foreground" : "w-4 bg-foreground/30"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="w-10 h-10 border border-foreground/20 flex items-center justify-center hover:bg-foreground/10 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
