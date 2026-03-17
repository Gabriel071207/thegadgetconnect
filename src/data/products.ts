export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  storage: string[];
  colors: { name: string; hex: string }[];
  specs: Record<string, string>;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isDeal?: boolean;
  isNew?: boolean;
  isPreorder?: boolean;
}

export const products: Product[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Smartphones",
    price: 1199,
    originalPrice: 1399,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Natural Titanium", hex: "#8F8A81" },
      { name: "Blue Titanium", hex: "#3D4656" },
      { name: "White Titanium", hex: "#F2F1EC" },
      { name: "Black Titanium", hex: "#2E2C2B" },
    ],
    specs: { Display: "6.7\" Super Retina XDR", Chip: "A17 Pro", Camera: "48MP Main", Battery: "4422 mAh" },
    description: "Forged in titanium with the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    rating: 4.9,
    reviews: 1204,
    inStock: true,
    isDeal: true,
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 1099,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Titanium Gray", hex: "#6B6B6B" },
      { name: "Titanium Violet", hex: "#8B7FA8" },
      { name: "Titanium Yellow", hex: "#E8D5A3" },
    ],
    specs: { Display: "6.8\" Dynamic AMOLED 2X", Chip: "Snapdragon 8 Gen 3", Camera: "200MP Main", Battery: "5000 mAh" },
    description: "Galaxy AI is here. Search like never before, effortlessly edit photos, and Icons for quick access.",
    rating: 4.8,
    reviews: 987,
    inStock: true,
    isNew: true,
  },
  {
    id: "macbook-pro-m3",
    name: "MacBook Pro 14\" M3 Pro",
    brand: "Apple",
    category: "Laptops",
    price: 1999,
    originalPrice: 2199,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: ["512GB", "1TB", "2TB"],
    colors: [
      { name: "Space Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    specs: { Display: "14.2\" Liquid Retina XDR", Chip: "M3 Pro", RAM: "18GB", Battery: "17 hours" },
    description: "The most advanced Mac laptops ever. With M3, M3 Pro, and M3 Max chips. Unprecedented performance.",
    rating: 4.9,
    reviews: 634,
    inStock: true,
    isDeal: true,
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    brand: "Apple",
    category: "Audio",
    price: 249,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: [],
    colors: [{ name: "White", hex: "#F5F5F7" }],
    specs: { Chip: "H2", ANC: "2x more active", Battery: "6 hours", Case: "USB-C MagSafe" },
    description: "Rebuilt from the sound up. Featuring Adaptive Audio, Personalized Spatial Audio, and USB-C charging.",
    rating: 4.7,
    reviews: 2341,
    inStock: true,
  },
  {
    id: "ps5-slim",
    name: "PlayStation 5 Slim",
    brand: "Sony",
    category: "Gaming",
    price: 449,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: ["1TB"],
    colors: [{ name: "White", hex: "#FFFFFF" }],
    specs: { GPU: "10.28 TFLOPS", Storage: "1TB SSD", Resolution: "4K 120Hz", "Ray Tracing": "Yes" },
    description: "Experience lightning-fast loading, deeper immersion with haptic feedback, and a new generation of incredible games.",
    rating: 4.8,
    reviews: 1567,
    inStock: true,
    isNew: true,
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "Wearables",
    price: 799,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: [],
    colors: [
      { name: "Natural Titanium", hex: "#8F8A81" },
      { name: "Black Titanium", hex: "#2E2C2B" },
    ],
    specs: { Display: "49mm Always-On", Chip: "S9 SiP", Battery: "36 hours", Water: "100m depth" },
    description: "The most rugged and capable Apple Watch pushes the limits with the S9 chip and a magical new way to use it.",
    rating: 4.8,
    reviews: 432,
    inStock: true,
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Audio",
    price: 349,
    originalPrice: 399,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: [],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Silver", hex: "#C0C0C0" },
    ],
    specs: { Driver: "30mm", ANC: "Auto NC Optimizer", Battery: "30 hours", Codec: "LDAC" },
    description: "Industry-leading noise canceling with Auto NC Optimizer, crystal clear hands-free calling.",
    rating: 4.7,
    reviews: 1890,
    inStock: true,
    isDeal: true,
  },
  {
    id: "ipad-pro-m4",
    name: "iPad Pro 13\" M4",
    brand: "Apple",
    category: "Tablets",
    price: 1299,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Space Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    specs: { Display: "13\" Ultra Retina XDR", Chip: "M4", Camera: "12MP Wide", Weight: "579g" },
    description: "The thinnest, most advanced iPad Pro ever. With M4 chip and stunning Ultra Retina XDR display.",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    isPreorder: true,
  },
];

export const categories = ["All", "Smartphones", "Laptops", "Audio", "Gaming", "Wearables", "Tablets"];
export const brands = ["All", "Apple", "Samsung", "Sony"];

export function getProductById(id: string) {
  return products.find(p => p.id === id);
}

export function getDeals() {
  return products.filter(p => p.isDeal);
}

export function getNewArrivals() {
  return products.filter(p => p.isNew);
}
