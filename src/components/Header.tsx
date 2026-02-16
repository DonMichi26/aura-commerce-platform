import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Mujer", href: "/products?category=women" },
  { name: "Hombre", href: "/products?category=men" },
  { name: "Accesorios", href: "/products?category=accessories" },
  { name: "Calzado", href: "/products?category=shoes" },
  { name: "Ofertas", href: "/products?badge=sale" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { setIsOpen, itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs text-center py-1.5 font-body tracking-wider">
        ENVÍO GRATIS EN PEDIDOS +$99 · DEVOLUCIONES GRATUITAS
      </div>

      <div className="container-wide flex items-center justify-between h-16">
        {/* Mobile menu */}
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          LUXE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-body font-medium tracking-wide uppercase text-foreground/80 hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-secondary rounded-sm transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <Link to="/" className="p-2 hover:bg-secondary rounded-sm transition-colors hidden sm:flex">
            <Heart size={18} />
          </Link>
          <Link to="/" className="p-2 hover:bg-secondary rounded-sm transition-colors hidden sm:flex">
            <User size={18} />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-secondary rounded-sm transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="container-wide py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Buscar productos, marcas, categorías..."
                  className="w-full bg-secondary pl-10 pr-4 py-3 text-sm font-body rounded-sm focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border overflow-hidden bg-background"
          >
            <nav className="container-wide py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body font-medium tracking-wide uppercase py-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
