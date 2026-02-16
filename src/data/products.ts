export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  priceUnit?: string;
  image: string;
  images?: string[];
  category: string;
  type: 'furniture' | 'board' | 'hardware' | 'accessory' | 'service';
  brand: string;
  rating: number;
  reviews: number;
  badge?: 'new' | 'sale' | 'soldout' | 'custom';
  colors?: string[];
  sizes?: string[];
  thickness?: string[];
  description?: string;
  specs?: Record<string, string>;
  inStock: boolean;
  customizable?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Closet Modular 6 Puertas",
    price: 459,
    originalPrice: 549,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
    category: "Muebles",
    type: "furniture",
    brand: "MelaPro",
    rating: 4.8,
    reviews: 87,
    badge: "sale",
    colors: ["Roble Claro", "Blanco", "Nogal", "Gris Ceniza"],
    description: "Closet modular de 6 puertas fabricado en melamina de 18mm con bisagras de cierre suave. Interior con barras cromadas y repisas ajustables. Diseño funcional y elegante.",
    specs: { "Material": "Melamina 18mm", "Ancho": "240 cm", "Alto": "200 cm", "Profundidad": "55 cm", "Acabado": "Texturizado" },
    inStock: true,
    customizable: true,
  },
  {
    id: "2",
    name: "Escritorio en L con Cajones",
    price: 285,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=800&fit=crop",
    category: "Muebles",
    type: "furniture",
    brand: "MelaPro",
    rating: 4.9,
    reviews: 124,
    badge: "new",
    colors: ["Blanco", "Roble Claro", "Gris"],
    description: "Escritorio en L con 3 cajones y pasacables integrado. Ideal para home office. Fabricado en melamina de 25mm.",
    specs: { "Material": "Melamina 25mm", "Ancho": "150 x 120 cm", "Alto": "75 cm", "Profundidad": "60 cm" },
    inStock: true,
    customizable: true,
  },
  {
    id: "3",
    name: "Tablero Melaminizado Roble Natural",
    price: 42,
    priceUnit: "m²",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
    category: "Tableros",
    type: "board",
    brand: "Masisa",
    rating: 4.7,
    reviews: 256,
    colors: ["Roble Natural", "Roble Gris", "Roble Miel"],
    thickness: ["15mm", "18mm", "25mm"],
    description: "Tablero melaminizado de alta calidad con acabado texturizado roble natural. Disponible en diferentes espesores. Ideal para muebles de cocina, closets y estanterías.",
    specs: { "Formato": "2.44 x 1.83 m", "Densidad": "620 kg/m³", "Resistencia": "Alto tráfico", "Certificación": "FSC" },
    inStock: true,
    customizable: true,
  },
  {
    id: "4",
    name: "Bisagra Cierre Suave 35mm",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&h=800&fit=crop",
    category: "Herrajes",
    type: "hardware",
    brand: "Hettich",
    rating: 4.9,
    reviews: 342,
    badge: "new",
    description: "Bisagra de cazoleta 35mm con sistema de cierre suave integrado. Compatible con puertas de melamina de 15-25mm.",
    specs: { "Tipo": "Cazoleta", "Diámetro": "35mm", "Apertura": "110°", "Material": "Acero niquelado" },
    inStock: true,
  },
  {
    id: "5",
    name: "Cocina Integral Minimalista",
    price: 1250,
    originalPrice: 1490,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop",
    category: "Muebles",
    type: "furniture",
    brand: "MelaPro",
    rating: 4.8,
    reviews: 45,
    badge: "sale",
    colors: ["Blanco + Roble", "Gris + Blanco", "Nogal + Negro"],
    description: "Cocina integral completa con módulos superiores e inferiores, cajones con cierre suave y tirador oculto. Diseño minimalista y funcional.",
    specs: { "Material": "Melamina 18mm", "Largo": "300 cm", "Módulos": "8 piezas", "Incluye": "Herrajes completos" },
    inStock: true,
    customizable: true,
  },
  {
    id: "6",
    name: "Corredera Telescópica 45cm",
    price: 8.90,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&h=800&fit=crop",
    category: "Herrajes",
    type: "hardware",
    brand: "Hettich",
    rating: 4.6,
    reviews: 189,
    sizes: ["35cm", "40cm", "45cm", "50cm", "60cm"],
    description: "Corredera telescópica de extensión total con cierre suave. Capacidad de carga de 30kg por par.",
    specs: { "Extensión": "Total", "Carga": "30kg/par", "Material": "Acero galvanizado" },
    inStock: true,
  },
  {
    id: "7",
    name: "Canto ABS Roble 22mm x 50m",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
    category: "Accesorios",
    type: "accessory",
    brand: "Rehau",
    rating: 4.5,
    reviews: 98,
    colors: ["Roble Natural", "Blanco", "Nogal", "Gris Ceniza", "Negro"],
    description: "Canto ABS de 0.45mm de espesor con adhesivo hot-melt. Acabado texturizado que combina perfectamente con tableros melaminizados.",
    specs: { "Ancho": "22mm", "Espesor": "0.45mm", "Largo": "50 metros", "Adhesivo": "Hot-melt" },
    inStock: true,
  },
  {
    id: "8",
    name: "Mueble de Baño Suspendido",
    price: 345,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=800&fit=crop",
    category: "Muebles",
    type: "furniture",
    brand: "MelaPro",
    rating: 4.7,
    reviews: 67,
    badge: "new",
    colors: ["Blanco Mate", "Roble Claro", "Gris Antracita"],
    description: "Mueble de baño suspendido con cajones cierre suave y tapa de cuarzo. Diseño contemporáneo resistente a la humedad.",
    specs: { "Material": "Melamina RH 18mm", "Ancho": "80 cm", "Incluye": "Lavabo + Espejo", "Resistencia": "Anti-humedad" },
    inStock: true,
    customizable: true,
  },
];

export const categories = [
  { name: "Muebles Armados", slug: "muebles", count: 156 },
  { name: "Tableros", slug: "tableros", count: 89 },
  { name: "Herrajes", slug: "herrajes", count: 234 },
  { name: "Accesorios", slug: "accesorios", count: 178 },
  { name: "Servicios", slug: "servicios", count: 12 },
];

export const brands = ["MelaPro", "Masisa", "Hettich", "Rehau", "Arauco", "Blum"];

export const services = [
  { id: "s1", name: "Corte a Medida", description: "Cortes de precisión CNC con tolerancia de ±0.5mm", icon: "scissors", price: "Desde $2/corte" },
  { id: "s2", name: "Enchapado de Cantos", description: "Aplicación de canto ABS con máquina industrial", icon: "layers", price: "Desde $1.50/ml" },
  { id: "s3", name: "Perforación y Taladrado", description: "Perforaciones para bisagras, tarugos y sistema 32", icon: "target", price: "Desde $0.50/und" },
  { id: "s4", name: "Asesoría de Diseño", description: "Diseño personalizado de tu proyecto con renderizado 3D", icon: "pen-tool", price: "Consulta gratis" },
];

export const testimonials = [
  {
    id: 1,
    name: "Roberto G.",
    text: "Excelente calidad en los tableros y el servicio de corte es impecable. Siempre preciso al milímetro.",
    rating: 5,
    avatar: "R",
    role: "Carpintero profesional",
  },
  {
    id: 2,
    name: "María L.",
    text: "Diseñaron y fabricaron toda mi cocina. El resultado superó mis expectativas. Muy profesionales.",
    rating: 5,
    avatar: "M",
    role: "Cliente particular",
  },
  {
    id: 3,
    name: "Jorge P.",
    text: "Como mueblista los uso para todo. Precios competitivos y siempre tienen stock de todas las melaminas.",
    rating: 5,
    avatar: "J",
    role: "Fabricante de muebles",
  },
];

export const melamineColors = [
  { name: "Blanco Liso", hex: "#F5F5F0" },
  { name: "Roble Natural", hex: "#C4A87C" },
  { name: "Roble Gris", hex: "#A89B8C" },
  { name: "Nogal", hex: "#6B4C3B" },
  { name: "Gris Ceniza", hex: "#8E8E8E" },
  { name: "Negro", hex: "#2C2C2C" },
  { name: "Roble Miel", hex: "#D4A847" },
  { name: "Wengue", hex: "#4A3728" },
];
