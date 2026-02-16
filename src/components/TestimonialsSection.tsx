import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/products";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] gold-text">Opiniones</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Lo que Dicen Nuestros Clientes</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-background p-6 border border-border hover-lift"
            >
              <Quote size={20} className="gold-text mb-4" />
              <p className="text-sm font-body text-foreground/80 leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className={j < t.rating ? "fill-accent text-accent" : "text-border"} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-body font-bold">
                  {t.avatar}
                </div>
                <span className="text-sm font-body font-medium">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
