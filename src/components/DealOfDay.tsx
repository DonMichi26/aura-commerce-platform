import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

export default function DealOfDay() {
  const saleProducts = products.filter((p) => p.badge === "sale").slice(0, 2);

  if (saleProducts.length === 0) return null;

  return (
    <section className="section-padding bg-secondary/40">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] wood-text flex items-center justify-center gap-2">
            <Tag size={14} />
            Ofertas especiales
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Precios de Liquidación</h2>
          <p className="text-sm text-muted-foreground font-body mt-2">Stock limitado — ¡No te lo pierdas!</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {saleProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
