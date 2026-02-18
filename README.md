# Aura Commerce Platform

Plataforma de e-commerce especializada en **muebles, tableros y herrajes** con sistema de personalización de productos. Desarrollada con React, TypeScript y Tailwind CSS.

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** >= 18.x
- **npm** o **bun**

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd aura-commerce-platform

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:8080`

---

## 📁 Estructura del Proyecto

```
aura-commerce-platform/
├── public/                     # Archivos estáticos
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/                 # Imágenes y recursos importados
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes base de shadcn/ui
│   │   ├── CartDrawer.tsx      # Drawer del carrito de compras
│   │   ├── CategorySection.tsx # Sección de categorías
│   │   ├── ConfiguratorPreview.tsx
│   │   ├── DealOfDay.tsx       # Oferta del día
│   │   ├── FeaturedProducts.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── NavLink.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProtectedRoute.tsx  # Wrapper para rutas protegidas
│   │   ├── ServicesSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── context/
│   │   ├── AuthContext.tsx     # Autenticación de usuarios
│   │   └── CartContext.tsx     # Estado global del carrito
│   ├── data/
│   │   └── products.ts         # Datos de productos (mock)
│   ├── hooks/                  # Custom hooks
│   ├── lib/
│   │   └── auth.ts             # Lógica de autenticación (localStorage)
│   ├── pages/
│   │   ├── Auth.tsx            # Login / Registro
│   │   ├── Index.tsx           # Página de inicio
│   │   ├── NotFound.tsx        # 404
│   │   ├── ProductDetail.tsx   # Detalle de producto
│   │   ├── Products.tsx        # Catálogo con filtros
│   │   └── Profile.tsx         # Perfil de usuario
│   ├── App.tsx                 # Configuración de rutas
│   ├── index.css               # Estilos globales + Tailwind
│   └── main.tsx                # Punto de entrada
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🛣️ Rutas de la Aplicación

| Ruta | Componente | Descripción | Protegida |
|------|------------|-------------|-----------|
| `/` | `Index` | Página principal con hero, categorías, productos destacados, servicios y testimonios | ❌ |
| `/products` | `Products` | Catálogo completo con filtros (tipo, categoría, marca, precio) y ordenamiento | ❌ |
| `/products?category=muebles` | `Products` | Filtrado por categoría | ❌ |
| `/product/:id` | `ProductDetail` | Detalle de producto con galería, opciones de personalización y servicios adicionales | ❌ |
| `/auth` | `Auth` | Página de inicio de sesión y registro | ❌ |
| `/profile` | `Profile` | Perfil de usuario con gestión de datos, pedidos, favoritos y seguridad | ✅ |
| `*` | `NotFound` | Página 404 | ❌ |

---

## 🔐 Autenticación

El sistema incluye autenticación completa con gestión de usuarios local (localStorage).

### Características

| Feature | Descripción |
|---------|-------------|
| **Registro** | Crear cuenta con email, contraseña, nombre y apellido |
| **Login** | Acceso con email y contraseña |
| **Perfil** | Gestión de datos personales (nombre, teléfono) |
| **Seguridad** | Cambio de contraseña con validación |
| **Sesión persistente** | Los datos se mantienen entre recargas |
| **Rutas protegidas** | Redirección automática a `/auth` si no hay sesión |

### Estructura de Usuario

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}
```

### Uso del Contexto

```typescript
import { useAuth } from "@/context/AuthContext";

function MiComponente() {
  const { 
    user,              // Usuario actual o null
    loading,           // Estado de carga
    isAuthenticated,   // Booleano
    login,             // (email, password) => Promise
    register,          // (email, password, name, lastName) => Promise
    logout,            // () => void
    updateProfile,     // (data) => Promise
    changePassword     // (current, new) => Promise
  } = useAuth();
}
```

### Migrar a Supabase (Recomendado para producción)

1. Instalar: `npm install @supabase/supabase-js`
2. Crear proyecto en [supabase.com](https://supabase.com)
3. Reemplazar `src/lib/auth.ts` con el cliente de Supabase
4. Usar `src/lib/auth-supabase.ts` (ver ejemplo abajo)

```typescript
// Ejemplo de configuración Supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tu-proyecto.supabase.co',
  'tu-anon-key'
);

// Registro
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: { data: { name, lastName } }
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});

// Logout
await supabase.auth.signOut();
```

---

## 🗄️ Gestión de Datos e Imágenes

### Estado Actual (Datos Mock)

Actualmente los productos están definidos en `src/data/products.ts`:

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  priceUnit?: string;        // ej: "m²" para tableros
  image: string;
  images?: string[];         // Galería adicional
  category: string;
  type: 'furniture' | 'board' | 'hardware' | 'accessory' | 'service';
  brand: string;
  rating: number;
  reviews: number;
  badge?: 'new' | 'sale' | 'soldout' | 'custom';
  colors?: string[];         // Colores disponibles
  sizes?: string[];          // Tallas disponibles
  thickness?: string[];      // Espesores (tableros)
  description?: string;
  specs?: Record<string, string>;
  inStock: boolean;
  customizable?: boolean;
}
```

### Opciones para Base de Datos con Imágenes

#### Opción 1: Supabase (Recomendada)

```bash
npm install @supabase/supabase-js
```

**Ventajas:**
- PostgreSQL + almacenamiento de imágenes integrado
- API instantánea con autenticación
- Plan gratuito generoso

**Estructura sugerida:**

```sql
-- Tabla products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  original_price DECIMAL,
  price_unit TEXT,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  brand TEXT NOT NULL,
  rating DECIMAL DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  badge TEXT,
  description TEXT,
  specs JSONB,
  in_stock BOOLEAN DEFAULT true,
  customizable BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla product_images
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0
);

-- Tabla product_colors
CREATE TABLE product_colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hex_code TEXT
);

-- Tabla product_sizes
CREATE TABLE product_sizes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL
);
```

**Subida de imágenes a Supabase Storage:**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);

// Subir imagen
const { data, error } = await supabase.storage
  .from('products')
  .upload(`product-${productId}/${file.name}`, file, {
    cacheControl: '3600',
    upsert: false
  });

// Obtener URL pública
const { data: { publicUrl } } = supabase.storage
  .from('products')
  .getPublicUrl(data.path);
```

#### Opción 2: Firebase

```bash
npm install firebase
```

**Firestore + Storage:**

```typescript
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Subir imagen
const storage = getStorage();
const imageRef = ref(storage, `products/${productId}/${file.name}`);
await uploadBytes(imageRef, file);
const imageUrl = await getDownloadURL(imageRef);

// Guardar producto
const db = getFirestore();
await addDoc(collection(db, 'products'), {
  name: 'Producto',
  price: 100,
  imageUrl,
  // ...
});
```

#### Opción 3: Cloudinary (Solo Imágenes)

```bash
npm install cloudinary
```

**Ventajas:**
- Optimización automática de imágenes
- Transformaciones on-the-fly
- CDN global

```typescript
// Backend: subir imagen
import { v2 as cloudinary } from 'cloudinary';

const result = await cloudinary.uploader.upload(file.path, {
  folder: 'aura-commerce/products',
  transformation: [
    { width: 800, height: 1000, crop: 'fill' },
    { quality: 'auto' }
  ]
});

// result.secure_url contiene la URL
```

#### Opción 4: Backend Propio (Node.js + Express + Multer)

```bash
npm install express multer cors
```

```typescript
// server.js
import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const storage = multer.diskStorage({
  destination: './uploads/products/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

app.post('/api/products', upload.array('images', 5), async (req, res) => {
  const images = req.files.map(f => `/uploads/products/${f.filename}`);
  // Guardar producto con imágenes en BD
});

app.use('/uploads', express.static('uploads'));
```

---

## 🎨 Personalización de Productos

El sistema soporta:

| Opción | Descripción | Ejemplo |
|--------|-------------|---------|
| **Colores** | Selector de colores disponibles | "Roble Claro", "Blanco", "Nogal" |
| **Tamaños** | Medidas predefinidas | "35cm", "40cm", "45cm" |
| **Espesores** | Para tableros | "15mm", "18mm", "25mm" |
| **Servicios extra** | Corte CNC, enchapado | +$15 corte, +$12 enchapado |

---

## 🛒 Carrito de Compras

Estado global manejado con **Context API** (`src/context/CartContext.tsx`):

```typescript
interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

// Funciones disponibles
const { 
  items,        // Array de items
  isOpen,       // Estado del drawer
  addItem,      // Añadir producto
  removeItem,   // Eliminar producto
  updateQuantity, // Actualizar cantidad
  total,        // Total calculado
  itemCount,    // Cantidad total de items
  clearCart     // Vaciar carrito
} = useCart();
```

---

## 🧪 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo (Vite)
npm run build        # Build para producción
npm run build:dev    # Build modo desarrollo
npm run preview      # Preview del build
npm run lint         # ESLint
npm run test         # Ejecutar tests (Vitest)
npm run test:watch   # Tests en modo watch
```

---

## 📦 Dependencias Principales

| Categoría | Librerías |
|-----------|-----------|
| **UI** | React 18, shadcn/ui, Radix UI, Tailwind CSS |
| **Estado** | Context API, TanStack Query |
| **Rutas** | React Router DOM v6 |
| **Forms** | React Hook Form, Zod |
| **Animaciones** | Framer Motion |
| **Iconos** | Lucide React |
| **Tests** | Vitest, Testing Library |

---

## 🔧 Configuración de Tailwind

El tema incluye colores personalizados en `tailwind.config.ts`:

```typescript
colors: {
  wood: {
    DEFAULT: "hsl(var(--wood))",
    light: "hsl(var(--wood-light))",
    dark: "hsl(var(--wood-dark))",
  },
  warm: "hsl(var(--warm))",
  // ... colores de shadcn
}
```

Fuentes:
- **Display**: DM Serif Display (títulos)
- **Body**: DM Sans (texto)

---

## 🚀 Próximos Pasos Sugeridos

1. **Configurar Supabase** para productos e imágenes
2. **Implementar autenticación** de usuarios
3. **Agregar pasarela de pago** (Stripe, MercadoPago)
4. **Panel de administración** para gestión de productos
5. **Sistema de reseñas** real
6. **Búsqueda** con debounce
7. **SEO** con meta tags dinámicos

---

## 📄 Licencia

MIT

---

## 👨‍💻 Desarrollo

Desarrollado con ❤️ usando Vite, React y TypeScript.
