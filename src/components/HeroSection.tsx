import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "@/assets/hero-furniture-1.jpg";
import hero2 from "@/assets/hero-furniture-2.jpg";

const slides = [
  {
    image: hero1,
    subtitle: "Muebles a tu medida",
    title: "Diseño y Calidad\nen Melamina",
    description: "Muebles modulares, tableros cortados a medida y todo lo que necesitas para tu proyecto.",
    cta: "Ver catálogo",
    href: "/products",
  },
  {
    image: hero2,
    subtitle: "Servicio profesional",
    title: "Corte, Enchapado\ny Asesoría",
    description: "Servicio de corte CNC de precisión, enchapado de cantos y asesoría de diseño personalizada.",
    cta: "Solicitar cotización",
    href: "/products?category=servicios",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden bg-secondary">
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative container-wide h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-xl">
            <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
              {slide.subtitle}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight whitespace-pre-line text-primary-foreground">
              {slide.title}
            </h1>
            <p className="text-sm sm:text-base font-body text-primary-foreground/70 mt-4 max-w-md">{slide.description}</p>
            <div className="flex gap-3 mt-8">
              <Link to={slide.href} className="inline-block px-7 py-3 wood-gradient text-accent-foreground text-sm font-body font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity rounded-md">
                {slide.cta}
              </Link>
              <Link to="/configurator" className="inline-block px-7 py-3 border border-primary-foreground/30 text-primary-foreground text-sm font-body font-medium tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-md">
                Configurador 3D
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)} className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors rounded-md">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-0.5 transition-all duration-300 rounded-full ${i === current ? "w-8 bg-accent" : "w-4 bg-primary-foreground/30"}`} />
          ))}
        </div>
        <button onClick={() => setCurrent((c) => (c + 1) % slides.length)} className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors rounded-md">
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
