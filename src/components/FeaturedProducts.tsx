import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] gold-text">Selección curada</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Productos Destacados</h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-block text-sm font-body font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todo →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
