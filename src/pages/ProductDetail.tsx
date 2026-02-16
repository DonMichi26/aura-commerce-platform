import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, Share2, ShoppingBag, ChevronRight, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-wide py-20 text-center">
          <p className="text-muted-foreground font-body">Producto no encontrado.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || [product.image];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedSize);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumbs */}
        <div className="container-wide py-4">
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link to="/products" className="hover:text-foreground transition-colors">Productos</Link>
            <ChevronRight size={12} />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        {/* Product */}
        <div className="container-wide pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-3">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 ${
                    product.badge === 'sale' ? 'badge-sale' : product.badge === 'new' ? 'badge-new' : 'badge-soldout'
                  }`}>
                    {product.badge === 'sale' ? `-${discount}%` : product.badge === 'new' ? 'Nuevo' : 'Agotado'}
                  </span>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-20 overflow-hidden border-2 ${i === selectedImage ? "border-foreground" : "border-transparent"} transition-colors`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <p className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(product.rating) ? "fill-accent text-accent" : "text-border"} />
                  ))}
                </div>
                <span className="text-sm font-body text-muted-foreground">{product.rating} ({product.reviews} reseñas)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-body font-bold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground font-body line-through">${product.originalPrice}</span>
                    <span className="badge-sale">{discount}% OFF</span>
                  </>
                )}
              </div>

              {/* Colors */}
              {product.colors && (
                <div className="mt-6">
                  <h3 className="text-xs font-body font-semibold uppercase tracking-wider mb-2">
                    Color {selectedColor && `— ${selectedColor}`}
                  </h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border text-sm font-body transition-colors ${
                          selectedColor === color
                            ? "border-foreground bg-primary text-primary-foreground"
                            : "border-border hover:border-foreground/50"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-body font-semibold uppercase tracking-wider">Talla</h3>
                    <button className="text-xs font-body text-muted-foreground underline">Guía de tallas</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-10 border text-sm font-body transition-colors ${
                          selectedSize === size
                            ? "border-foreground bg-primary text-primary-foreground"
                            : "border-border hover:border-foreground/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-body font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-primary text-primary-foreground text-sm font-body font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  Añadir al carrito
                </button>
                <button className="p-3 border border-border hover:bg-secondary transition-colors">
                  <Heart size={18} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                {[
                  { icon: Truck, label: "Envío gratis +$99" },
                  { icon: RotateCcw, label: "Devolución gratis" },
                  { icon: Shield, label: "Pago seguro" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-1.5">
                    <Icon size={18} className="gold-text" />
                    <span className="text-xs font-body text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex gap-6 border-b border-border">
                  {(["description", "specs", "reviews"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm font-body font-medium uppercase tracking-wider transition-colors relative ${
                        activeTab === tab
                          ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab === "description" ? "Descripción" : tab === "specs" ? "Detalles" : `Reseñas (${product.reviews})`}
                    </button>
                  ))}
                </div>
                <div className="py-4">
                  {activeTab === "description" && (
                    <p className="text-sm font-body text-muted-foreground leading-relaxed">{product.description}</p>
                  )}
                  {activeTab === "specs" && (
                    <div className="space-y-2 text-sm font-body">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Marca</span><span>{product.brand}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Categoría</span><span>{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Disponibilidad</span><span>{product.inStock ? "En stock" : "Agotado"}</span>
                      </div>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <p className="text-sm font-body text-muted-foreground">Las reseñas estarán disponibles próximamente.</p>
                  )}
                </div>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 text-xs font-body text-muted-foreground hover:text-foreground mt-4 transition-colors">
                <Share2 size={14} />
                Compartir este producto
              </button>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="font-display text-2xl font-bold mb-8">También te puede gustar</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
