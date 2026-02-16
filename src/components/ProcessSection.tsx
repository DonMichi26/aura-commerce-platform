import { motion } from "framer-motion";
import { ClipboardList, Ruler, Cog, Truck } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "1. Elige tu proyecto", desc: "Selecciona muebles terminados o diseña tu propio mueble con nuestro configurador." },
  { icon: Ruler, title: "2. Personaliza medidas", desc: "Define dimensiones exactas, tipo de melamina, color de canto y herrajes." },
  { icon: Cog, title: "3. Fabricamos", desc: "Nuestro equipo produce con maquinaria CNC de alta precisión y control de calidad." },
  { icon: Truck, title: "4. Recibe o retira", desc: "Envío a domicilio o retiro en taller. Incluye instrucciones de armado." },
];

export default function ProcessSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] wood-text">Cómo funciona</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Tu Proyecto en 4 Pasos</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4 relative">
                <step.icon size={24} className="wood-text" />
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-px bg-border -translate-y-1/2" />
                )}
              </div>
              <h3 className="font-display text-base font-semibold">{step.title}</h3>
              <p className="text-sm font-body text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
