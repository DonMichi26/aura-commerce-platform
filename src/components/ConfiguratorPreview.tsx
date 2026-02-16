import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import { melamineColors } from "@/data/products";

export default function ConfiguratorPreview() {
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(200);
  const [depth, setDepth] = useState(55);
  const [selectedColor, setSelectedColor] = useState(melamineColors[1]);
  const [doors, setDoors] = useState(3);

  const area = ((width * height * 2 + width * depth * 2 + depth * height * 2) / 10000);
  const estimatedPrice = Math.round(area * 42 + doors * 35 + 120);

  return (
    <section className="section-padding bg-secondary/60">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] wood-text">Herramienta interactiva</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Configurador de Muebles</h2>
            <p className="text-sm text-muted-foreground font-body mt-3 leading-relaxed">
              Diseña tu mueble ideal. Selecciona medidas, tipo de melamina, color y accesorios. Obtén un presupuesto instantáneo.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-xs font-body font-semibold uppercase tracking-wider mb-2 block">Dimensiones (cm)</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Ancho", value: width, setter: setWidth },
                    { label: "Alto", value: height, setter: setHeight },
                    { label: "Profundidad", value: depth, setter: setDepth },
                  ].map((dim) => (
                    <div key={dim.label}>
                      <span className="text-xs text-muted-foreground font-body">{dim.label}</span>
                      <input
                        type="number"
                        value={dim.value}
                        onChange={(e) => dim.setter(+e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-border text-sm font-body bg-background rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-body font-semibold uppercase tracking-wider mb-2 block">Color de Melamina</label>
                <div className="flex flex-wrap gap-2">
                  {melamineColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-md border-2 transition-all ${selectedColor.name === color.name ? "border-accent scale-110" : "border-border hover:border-muted-foreground"}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">{selectedColor.name}</p>
              </div>

              <div>
                <label className="text-xs font-body font-semibold uppercase tracking-wider mb-2 block">Número de puertas</label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => setDoors(n)}
                      className={`w-10 h-10 rounded-md border text-sm font-body font-medium transition-colors ${doors === n ? "bg-accent text-accent-foreground border-accent" : "border-border hover:border-accent/50"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {/* 3D Preview placeholder */}
            <div className="relative aspect-square bg-background rounded-xl border border-border overflow-hidden flex items-center justify-center">
              <div className="relative" style={{ width: `${Math.min(width / 2.5, 80)}%`, height: `${Math.min(height / 2.5, 85)}%` }}>
                {/* Simple cabinet visualization */}
                <div
                  className="w-full h-full rounded-sm border-2 border-foreground/20 relative overflow-hidden"
                  style={{ backgroundColor: selectedColor.hex }}
                >
                  <div className="absolute inset-2 grid gap-0.5" style={{ gridTemplateColumns: `repeat(${doors}, 1fr)` }}>
                    {Array.from({ length: doors }).map((_, i) => (
                      <div key={i} className="border border-foreground/10 rounded-sm relative">
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-foreground/20" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="text-xs font-body text-muted-foreground">{width} × {height} × {depth} cm</p>
                </div>
              </div>

              <div className="absolute top-4 right-4 text-xs font-body text-muted-foreground bg-secondary/80 px-2 py-1 rounded">
                Vista previa
              </div>
            </div>

            {/* Price estimate */}
            <div className="mt-6 p-5 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Calculator size={18} className="wood-text" />
                <span className="text-sm font-body font-semibold">Presupuesto estimado</span>
              </div>
              <div className="space-y-1.5 text-sm font-body">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tableros ({selectedColor.name})</span>
                  <span>${Math.round(area * 42)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Herrajes ({doors} puertas)</span>
                  <span>${doors * 35}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Corte y enchapado</span>
                  <span>$120</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
                  <span>Total estimado</span>
                  <span className="wood-text">${estimatedPrice}</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2.5 wood-gradient text-accent-foreground text-sm font-body font-semibold tracking-wider rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Solicitar cotización formal
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
