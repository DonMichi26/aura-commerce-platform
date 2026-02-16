import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import catMuebles from "@/assets/cat-muebles.jpg";
import catTableros from "@/assets/cat-tableros.jpg";
import catHerrajes from "@/assets/cat-herrajes.jpg";
import catServicios from "@/assets/cat-servicios.jpg";

const categories = [
  { name: "Muebles Armados", desc: "Closets, cocinas, escritorios", image: catMuebles, href: "/products?category=muebles" },
  { name: "Tableros", desc: "Melaminizados en todas las medidas", image: catTableros, href: "/products?category=tableros" },
  { name: "Herrajes y Accesorios", desc: "Bisagras, correderas, cantos", image: catHerrajes, href: "/products?category=herrajes" },
  { name: "Servicios Profesionales", desc: "Corte CNC, enchapado, diseño", image: catServicios, href: "/products?category=servicios" },
];

export default function CategorySection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] wood-text">Explora nuestro catálogo</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Categorías</h2>
          <p className="text-sm text-muted-foreground font-body mt-2 max-w-lg mx-auto">
            Todo lo que necesitas para fabricar o renovar tus muebles, desde tableros hasta el último tornillo.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={cat.href} className="group relative block overflow-hidden rounded-lg aspect-[3/4]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-lg font-semibold text-primary-foreground">{cat.name}</h3>
                  <p className="text-xs font-body text-primary-foreground/70 mt-1">{cat.desc}</p>
                  <span className="text-xs font-body text-accent uppercase tracking-wider mt-2 inline-block group-hover:translate-x-1 transition-transform">
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
