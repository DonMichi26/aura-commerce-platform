import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

const footerLinks = {
  "Comprar": [
    { name: "Mujer", href: "/products?category=women" },
    { name: "Hombre", href: "/products?category=men" },
    { name: "Accesorios", href: "/products?category=accessories" },
    { name: "Calzado", href: "/products?category=shoes" },
    { name: "Ofertas", href: "/products?badge=sale" },
  ],
  "Ayuda": [
    { name: "Envíos", href: "/" },
    { name: "Devoluciones", href: "/" },
    { name: "Guía de tallas", href: "/" },
    { name: "Contacto", href: "/" },
    { name: "FAQ", href: "/" },
  ],
  "Empresa": [
    { name: "Sobre nosotros", href: "/" },
    { name: "Sostenibilidad", href: "/" },
    { name: "Prensa", href: "/" },
    { name: "Trabaja con nosotros", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-semibold mb-1">Únete a LUXE</h3>
            <p className="text-sm text-primary-foreground/60 font-body">
              Recibe acceso exclusivo a nuevas colecciones y ofertas especiales.
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2.5 text-sm font-body text-primary-foreground placeholder:text-primary-foreground/40 flex-1 md:w-64 focus:outline-none focus:border-accent"
            />
            <button className="gold-gradient px-6 py-2.5 text-sm font-body font-semibold tracking-wider uppercase text-accent-foreground hover:opacity-90 transition-opacity">
              Suscribirse
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container-wide py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="font-display text-2xl font-bold">LUXE</Link>
            <p className="text-xs text-primary-foreground/50 font-body mt-3 leading-relaxed">
              Moda premium curada para quienes aprecian la calidad y el diseño atemporal.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-primary-foreground/50 hover:text-accent transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-primary-foreground/50 hover:text-accent transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-primary-foreground/50 hover:text-accent transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-primary-foreground/50 hover:text-accent transition-colors"><Mail size={18} /></a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-xs font-semibold uppercase tracking-wider mb-4 text-primary-foreground/70">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm font-body text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-primary-foreground/40">
          <span>© 2026 LUXE. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
