import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden bg-secondary mb-3">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {/* Badges */}
        {product.badge && (
          <span className={`absolute top-3 left-3 ${
            product.badge === 'new' ? 'badge-new' : product.badge === 'sale' ? 'badge-sale' : 'badge-soldout'
          }`}>
            {product.badge === 'new' ? 'Nuevo' : product.badge === 'sale' ? 'Oferta' : 'Agotado'}
          </span>
        )}
        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
            <Heart size={14} />
          </button>
        </div>
        {/* Add to cart */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addItem(product)}
            className="w-full py-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase hover:bg-primary transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            Añadir al carrito
          </button>
        </div>
      </div>

      <Link to={`/product/${product.id}`} className="block">
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-sm font-body font-medium mt-0.5 group-hover:text-accent transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            <Star size={11} className="fill-accent text-accent" />
            <span className="text-xs font-body text-muted-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground font-body">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-body font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground font-body line-through">${product.originalPrice}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
