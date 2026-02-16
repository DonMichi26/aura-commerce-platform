import { useState, useEffect } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function DealOfDay() {
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const { hours, minutes, seconds } = useCountdown(endOfDay);

  const saleProducts = products.filter((p) => p.badge === "sale").slice(0, 2);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] gold-text">No te lo pierdas</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Oferta del Día</h2>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Clock size={18} className="gold-text" />
            <div className="flex gap-2">
              {[
                { value: hours, label: "Hrs" },
                { value: minutes, label: "Min" },
                { value: seconds, label: "Seg" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-1">
                  <span className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground font-body font-bold text-lg">
                    {String(t.value).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-muted-foreground font-body uppercase">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {saleProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
