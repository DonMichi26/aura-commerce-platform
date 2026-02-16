export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  badge?: 'new' | 'sale' | 'soldout';
  colors?: string[];
  sizes?: string[];
  description?: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Silk Blend Tailored Blazer",
    price: 289,
    originalPrice: 389,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    ],
    category: "Women",
    brand: "Maison Noir",
    rating: 4.8,
    reviews: 124,
    badge: "sale",
    colors: ["Black", "Ivory", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Impeccably tailored blazer crafted from a luxurious silk blend. Features a single-button closure, peaked lapels, and a slightly oversized silhouette for effortless elegance.",
    inStock: true,
  },
  {
    id: "2",
    name: "Cashmere Crew Neck Sweater",
    price: 195,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    category: "Women",
    brand: "Lune Studio",
    rating: 4.9,
    reviews: 89,
    badge: "new",
    colors: ["Cream", "Grey", "Navy"],
    sizes: ["XS", "S", "M", "L"],
    description: "Pure cashmere sweater with a relaxed crew neckline. Soft, lightweight, and perfect for layering.",
    inStock: true,
  },
  {
    id: "3",
    name: "Italian Leather Chelsea Boots",
    price: 345,
    image: "https://images.unsplash.com/photo-1542840410-3092f99611a3?w=600&h=800&fit=crop",
    category: "Shoes",
    brand: "Artisan & Co",
    rating: 4.7,
    reviews: 67,
    colors: ["Black", "Brown"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    description: "Handcrafted Chelsea boots in supple Italian leather with elastic side panels and a low stacked heel.",
    inStock: true,
  },
  {
    id: "4",
    name: "Minimalist Gold Chain Necklace",
    price: 128,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    category: "Accessories",
    brand: "Aurum",
    rating: 4.6,
    reviews: 203,
    badge: "new",
    colors: ["Gold", "Silver", "Rose Gold"],
    description: "Delicate chain necklace in 18k gold-plated sterling silver. Adjustable length for versatile styling.",
    inStock: true,
  },
  {
    id: "5",
    name: "Structured Wool Overcoat",
    price: 495,
    originalPrice: 650,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop",
    category: "Men",
    brand: "Maison Noir",
    rating: 4.9,
    reviews: 56,
    badge: "sale",
    colors: ["Charcoal", "Camel", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "A timeless overcoat in premium Italian wool with a structured shoulder, notch lapels, and concealed button closure.",
    inStock: true,
  },
  {
    id: "6",
    name: "Slim Fit Cotton Trousers",
    price: 145,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
    category: "Men",
    brand: "Lune Studio",
    rating: 4.5,
    reviews: 178,
    colors: ["Black", "Khaki", "Navy"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Impeccably tailored slim-fit trousers in premium stretch cotton.",
    inStock: true,
  },
  {
    id: "7",
    name: "Leather Crossbody Bag",
    price: 275,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
    category: "Accessories",
    brand: "Artisan & Co",
    rating: 4.8,
    reviews: 92,
    colors: ["Black", "Tan", "Burgundy"],
    description: "Compact crossbody bag in full-grain leather with gold-tone hardware and an adjustable strap.",
    inStock: true,
  },
  {
    id: "8",
    name: "Linen Blend Summer Dress",
    price: 165,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
    category: "Women",
    brand: "Lune Studio",
    rating: 4.7,
    reviews: 134,
    badge: "new",
    colors: ["White", "Sand", "Sage"],
    sizes: ["XS", "S", "M", "L"],
    description: "Effortless summer dress in a breathable linen-cotton blend with a relaxed A-line silhouette.",
    inStock: true,
  },
];

export const categories = [
  { name: "Women", slug: "women", count: 248 },
  { name: "Men", slug: "men", count: 186 },
  { name: "Accessories", slug: "accessories", count: 124 },
  { name: "Shoes", slug: "shoes", count: 97 },
];

export const brands = ["Maison Noir", "Lune Studio", "Artisan & Co", "Aurum"];

export const testimonials = [
  {
    id: 1,
    name: "Sofía M.",
    text: "La calidad de las prendas es excepcional. El blazer de seda es simplemente perfecto.",
    rating: 5,
    avatar: "S",
  },
  {
    id: 2,
    name: "Carlos R.",
    text: "Envío rápido y empaque premium. La experiencia de compra es increíble.",
    rating: 5,
    avatar: "C",
  },
  {
    id: 3,
    name: "Ana L.",
    text: "Me encanta la selección curada. Cada pieza se siente especial y única.",
    rating: 4,
    avatar: "A",
  },
];
