import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  "Productos": [
    { name: "Muebles armados", href: "/products?category=muebles" },
    { name: "Tableros melaminizados", href: "/products?category=tableros" },
    { name: "Herrajes", href: "/products?category=herrajes" },
    { name: "Cantos y accesorios", href: "/products?category=accesorios" },
  ],
  "Servicios": [
    { name: "Corte a medida", href: "/products?category=servicios" },
    { name: "Enchapado de cantos", href: "/products?category=servicios" },
    { name: "Asesoría de diseño", href: "/products?category=servicios" },
    { name: "Cotización online", href: "/products?category=servicios" },
  ],
  "Ayuda": [
    { name: "Envíos y entregas", href: "/" },
    { name: "Devoluciones", href: "/" },
    { name: "Guías de montaje", href: "/" },
    { name: "Preguntas frecuentes", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-semibold mb-1">Ofertas y novedades</h3>
            <p className="text-sm text-primary-foreground/50 font-body">Recibe ofertas exclusivas y novedades en melaminas.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input type="email" placeholder="tu@email.com" className="bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2.5 text-sm font-body text-primary-foreground placeholder:text-primary-foreground/30 flex-1 md:w-64 rounded-l-md focus:outline-none focus:border-accent" />
            <button className="wood-gradient px-6 py-2.5 text-sm font-body font-semibold tracking-wider uppercase text-accent-foreground rounded-r-md hover:opacity-90 transition-opacity">
              Suscribirse
            </button>
          </div>
        </div>
      </div>

      <div className="container-wide py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 wood-gradient rounded-sm flex items-center justify-center">
                <span className="text-xs font-bold text-accent-foreground font-body">M</span>
              </div>
              <span className="font-display text-lg font-bold">MelaHome</span>
            </div>
            <p className="text-xs text-primary-foreground/40 font-body leading-relaxed">
              Tu tienda especializada en melamina, muebles modulares y servicios de carpintería profesional.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-primary-foreground/40 hover:text-accent transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-primary-foreground/40 hover:text-accent transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-primary-foreground/40 hover:text-accent transition-colors"><Mail size={18} /></a>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-primary-foreground/40 font-body"><Phone size={12} /><span>+1 (555) 123-4567</span></div>
              <div className="flex items-center gap-2 text-xs text-primary-foreground/40 font-body"><MapPin size={12} /><span>Zona Industrial, Local 42</span></div>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-xs font-semibold uppercase tracking-wider mb-4 text-primary-foreground/60">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm font-body text-primary-foreground/40 hover:text-primary-foreground transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-primary-foreground/30">
          <span>© 2026 MelaHome. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <span>Visa</span><span>Mastercard</span><span>Transferencia</span><span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
