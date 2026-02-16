import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, LayoutGrid, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories, brands } from "@/data/products";

const productTypes = [
  { label: "Mueble armado", value: "furniture" },
  { label: "Tablero suelto", value: "board" },
  { label: "Herraje", value: "hardware" },
  { label: "Accesorio", value: "accessory" },
  { label: "Servicio", value: "service" },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(3);

  const filtered = useMemo(() => {
    let result = [...products];
    if (categoryFilter) {
      const catMap: Record<string, string[]> = {
        muebles: ["furniture"],
        tableros: ["board"],
        herrajes: ["hardware"],
        accesorios: ["accessory"],
        servicios: ["service"],
      };
      const types = catMap[categoryFilter];
      if (types) result = result.filter((p) => types.includes(p.type));
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedTypes.length > 0) result = result.filter((p) => selectedTypes.includes(p.type));

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [categoryFilter, priceRange, selectedBrands, selectedTypes, sortBy]);

  const toggleBrand = (b: string) => setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
  const toggleType = (t: string) => setSelectedTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const activeCategory = categories.find((c) => c.slug === categoryFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container-wide py-4">
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-foreground">{activeCategory?.name || "Todos los productos"}</span>
          </div>
        </div>

        <div className="container-wide pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold">{activeCategory?.name || "Catálogo Completo"}</h1>
              <p className="text-sm font-body text-muted-foreground mt-1">{filtered.length} productos</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border text-sm font-body rounded-md hover:bg-secondary transition-colors">
                <SlidersHorizontal size={14} />Filtros
              </button>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border border-border text-sm font-body bg-background rounded-md focus:outline-none focus:ring-1 focus:ring-ring">
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>
              <div className="hidden sm:flex items-center border border-border rounded-md">
                <button onClick={() => setGridCols(2)} className={`p-2 rounded-l-md ${gridCols === 2 ? "bg-secondary" : "hover:bg-secondary/50"} transition-colors`}><Grid3X3 size={14} /></button>
                <button onClick={() => setGridCols(3)} className={`p-2 rounded-r-md ${gridCols === 3 ? "bg-secondary" : "hover:bg-secondary/50"} transition-colors`}><LayoutGrid size={14} /></button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <aside className={`${showFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-y-auto lg:static lg:p-0 lg:z-auto" : "hidden"} lg:block lg:w-56 flex-shrink-0`}>
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="font-display text-lg font-bold">Filtros</h2>
                <button onClick={() => setShowFilters(false)}><X size={20} /></button>
              </div>

              {/* Type */}
              <div className="mb-8">
                <h3 className="text-xs font-body font-semibold uppercase tracking-wider mb-3">Tipo de producto</h3>
                <div className="space-y-2">
                  {productTypes.map((t) => (
                    <label key={t.value} className="flex items-center gap-2 text-sm font-body cursor-pointer">
                      <input type="checkbox" checked={selectedTypes.includes(t.value)} onChange={() => toggleType(t.value)} className="accent-accent w-3.5 h-3.5" />
                      <span className="text-muted-foreground">{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xs font-body font-semibold uppercase tracking-wider mb-3">Categorías</h3>
                <div className="space-y-2">
                  <Link to="/products" className={`block text-sm font-body ${!categoryFilter ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"} transition-colors`}>Todos</Link>
                  {categories.map((c) => (
                    <Link key={c.slug} to={`/products?category=${c.slug}`} className={`block text-sm font-body ${categoryFilter === c.slug ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"} transition-colors`}>
                      {c.name} ({c.count})
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="text-xs font-body font-semibold uppercase tracking-wider mb-3">Marcas</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-sm font-body cursor-pointer">
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-accent w-3.5 h-3.5" />
                      <span className="text-muted-foreground">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <h3 className="text-xs font-body font-semibold uppercase tracking-wider mb-3">Precio</h3>
                <div className="flex items-center gap-2">
                  <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} className="w-full px-2 py-1.5 border border-border text-sm font-body bg-background rounded-md" placeholder="Min" />
                  <span className="text-muted-foreground">—</span>
                  <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} className="w-full px-2 py-1.5 border border-border text-sm font-body bg-background rounded-md" placeholder="Max" />
                </div>
              </div>

              <button onClick={() => setShowFilters(false)} className="lg:hidden w-full py-3 wood-gradient text-accent-foreground text-sm font-body font-semibold tracking-wider uppercase rounded-md">
                Ver {filtered.length} resultados
              </button>
            </aside>

            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground font-body">No se encontraron productos con los filtros seleccionados.</p>
                </div>
              ) : (
                <div className={`grid gap-4 sm:gap-6 ${gridCols === 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3"}`}>
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
