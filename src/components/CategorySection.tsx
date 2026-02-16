import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catShoes from "@/assets/cat-shoes.jpg";

const categories = [
  { name: "Mujer", image: catWomen, href: "/products?category=women" },
  { name: "Hombre", image: catMen, href: "/products?category=men" },
  { name: "Accesorios", image: catAccessories, href: "/products?category=accessories" },
  { name: "Calzado", image: catShoes, href: "/products?category=shoes" },
];

export default function CategorySection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] gold-text">Explora</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Categorías</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={cat.href} className="group relative block overflow-hidden aspect-[3/4]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-background">{cat.name}</h3>
                  <span className="text-xs font-body text-background/70 uppercase tracking-wider mt-1 inline-block group-hover:text-accent transition-colors">
                    Ver todo →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
