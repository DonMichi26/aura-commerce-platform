import { Scissors, Layers, Target, PenTool, ArrowRight } from "lucide-react";
import { services } from "@/data/products";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const iconMap: Record<string, React.ElementType> = {
  scissors: Scissors,
  layers: Layers,
  target: Target,
  "pen-tool": PenTool,
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-accent">Servicios profesionales</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Fabricamos a Tu Medida</h2>
          <p className="text-sm text-primary-foreground/60 font-body mt-2 max-w-lg mx-auto">
            Contamos con maquinaria CNC de última generación para garantizar cortes y acabados perfectos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Scissors;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 border border-primary-foreground/10 rounded-lg hover:border-accent/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg wood-gradient flex items-center justify-center mb-4">
                  <Icon size={20} className="text-accent-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold">{service.name}</h3>
                <p className="text-sm font-body text-primary-foreground/60 mt-2 leading-relaxed">{service.description}</p>
                <p className="text-sm font-body font-semibold text-accent mt-3">{service.price}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <Link to="/products?category=servicios" className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent text-sm font-body font-medium tracking-wide rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            Solicitar cotización
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
