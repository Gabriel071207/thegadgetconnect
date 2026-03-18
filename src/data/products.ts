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
  condition?: "UK Used" | "Brand New";
}

// Helper to create products quickly
function phone(id: string, name: string, price: number, specs: Record<string, string>, opts: Partial<Product> = {}): Product {
  return {
    id, name, brand: "Apple", category: "Smartphones", price,
    image: "/placeholder.svg", images: ["/placeholder.svg"],
    storage: [], colors: [{ name: "Black", hex: "#1A1A1A" }],
    specs, description: `${name} — premium smartphone.`,
    rating: 4.7, reviews: Math.floor(Math.random() * 500 + 100),
    inStock: true, condition: "UK Used", ...opts,
  };
}

function mac(id: string, name: string, price: number, specs: Record<string, string>, opts: Partial<Product> = {}): Product {
  return {
    id, name, brand: "Apple", category: "Laptops", price,
    image: "/placeholder.svg", images: ["/placeholder.svg"],
    storage: [], colors: [{ name: "Space Gray", hex: "#4A4A4A" }, { name: "Silver", hex: "#E3E4E5" }],
    specs, description: `${name} — powerful Apple laptop.`,
    rating: 4.8, reviews: Math.floor(Math.random() * 400 + 100),
    inStock: true, condition: "UK Used", ...opts,
  };
}

function ipad(id: string, name: string, price: number, specs: Record<string, string>, opts: Partial<Product> = {}): Product {
  return {
    id, name, brand: "Apple", category: "Tablets", price,
    image: "/placeholder.svg", images: ["/placeholder.svg"],
    storage: [], colors: [{ name: "Space Gray", hex: "#4A4A4A" }, { name: "Silver", hex: "#E3E4E5" }],
    specs, description: `${name} — versatile Apple tablet.`,
    rating: 4.7, reviews: Math.floor(Math.random() * 300 + 50),
    inStock: true, condition: "UK Used", ...opts,
  };
}

export const products: Product[] = [
  // ═══════════════════════════════════════
  // FLAGSHIP / FEATURED PRODUCTS
  // ═══════════════════════════════════════
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Smartphones",
    price: 1800000,
    originalPrice: 2100000,
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
    rating: 4.9, reviews: 1204, inStock: true, isDeal: true,
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 1650000,
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
    rating: 4.8, reviews: 987, inStock: true, isNew: true,
  },
  {
    id: "macbook-pro-m3-max",
    name: "MacBook Pro 14\" M3 Max 36GB 1TB",
    brand: "Apple",
    category: "Laptops",
    price: 3300000,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: ["1TB"],
    colors: [{ name: "Space Black", hex: "#1D1D1F" }, { name: "Silver", hex: "#E3E4E5" }],
    specs: { Display: "14.2\" Liquid Retina XDR", Chip: "M3 Max", RAM: "36GB", Storage: "1TB" },
    description: "The most advanced Mac laptop ever. M3 Max chip with unprecedented performance.",
    rating: 4.9, reviews: 634, inStock: true, isDeal: true, condition: "UK Used",
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    brand: "Apple",
    category: "Audio",
    price: 375000,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: [],
    colors: [{ name: "White", hex: "#F5F5F7" }],
    specs: { Chip: "H2", ANC: "2x more active", Battery: "6 hours", Case: "USB-C MagSafe" },
    description: "Rebuilt from the sound up. Featuring Adaptive Audio, Personalized Spatial Audio, and USB-C charging.",
    rating: 4.7, reviews: 2341, inStock: true,
  },
  {
    id: "ps5-slim",
    name: "PlayStation 5 Slim",
    brand: "Sony",
    category: "Gaming",
    price: 675000,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: ["1TB"],
    colors: [{ name: "White", hex: "#FFFFFF" }],
    specs: { GPU: "10.28 TFLOPS", Storage: "1TB SSD", Resolution: "4K 120Hz", "Ray Tracing": "Yes" },
    description: "Experience lightning-fast loading, deeper immersion with haptic feedback, and a new generation of incredible games.",
    rating: 4.8, reviews: 1567, inStock: true, isNew: true,
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "Wearables",
    price: 1200000,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: [],
    colors: [{ name: "Natural Titanium", hex: "#8F8A81" }, { name: "Black Titanium", hex: "#2E2C2B" }],
    specs: { Display: "49mm Always-On", Chip: "S9 SiP", Battery: "36 hours", Water: "100m depth" },
    description: "The most rugged and capable Apple Watch pushes the limits with the S9 chip.",
    rating: 4.8, reviews: 432, inStock: true,
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Audio",
    price: 525000,
    originalPrice: 600000,
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    storage: [],
    colors: [{ name: "Black", hex: "#1A1A1A" }, { name: "Silver", hex: "#C0C0C0" }],
    specs: { Driver: "30mm", ANC: "Auto NC Optimizer", Battery: "30 hours", Codec: "LDAC" },
    description: "Industry-leading noise canceling with Auto NC Optimizer, crystal clear hands-free calling.",
    rating: 4.7, reviews: 1890, inStock: true, isDeal: true,
  },

  // ═══════════════════════════════════════
  // UK USED iPHONES
  // ═══════════════════════════════════════
  phone("iphone-xr-64", "iPhone XR 64GB", 250000, { Display: "6.1\" Liquid Retina", Chip: "A12 Bionic", Storage: "64GB", Camera: "12MP" }),
  phone("iphone-xr-128", "iPhone XR 128GB", 270000, { Display: "6.1\" Liquid Retina", Chip: "A12 Bionic", Storage: "128GB", Camera: "12MP" }),
  phone("iphone-xs-max-64", "iPhone XS Max 64GB", 270000, { Display: "6.5\" Super Retina", Chip: "A12 Bionic", Storage: "64GB", Camera: "12MP Dual" }),
  phone("iphone-xs-max-256", "iPhone XS Max 256GB", 290000, { Display: "6.5\" Super Retina", Chip: "A12 Bionic", Storage: "256GB", Camera: "12MP Dual" }),
  phone("iphone-11-128", "iPhone 11 128GB", 320000, { Display: "6.1\" Liquid Retina", Chip: "A13 Bionic", Storage: "128GB", Camera: "12MP Dual" }),
  phone("iphone-11-64", "iPhone 11 64GB", 300000, { Display: "6.1\" Liquid Retina", Chip: "A13 Bionic", Storage: "64GB", Camera: "12MP Dual" }),
  phone("iphone-11-pro-64", "iPhone 11 Pro 64GB", 380000, { Display: "5.8\" Super Retina XDR", Chip: "A13 Bionic", Storage: "64GB", Camera: "12MP Triple" }),
  phone("iphone-11-pro-256", "iPhone 11 Pro 256GB", 420000, { Display: "5.8\" Super Retina XDR", Chip: "A13 Bionic", Storage: "256GB", Camera: "12MP Triple" }),
  phone("iphone-11-pro-max-64", "iPhone 11 Pro Max 64GB", 390000, { Display: "6.5\" Super Retina XDR", Chip: "A13 Bionic", Storage: "64GB", Camera: "12MP Triple" }),
  phone("iphone-11-pro-max-256", "iPhone 11 Pro Max 256GB", 440000, { Display: "6.5\" Super Retina XDR", Chip: "A13 Bionic", Storage: "256GB", Camera: "12MP Triple" }),
  phone("iphone-12-64", "iPhone 12 64GB", 340000, { Display: "6.1\" Super Retina XDR", Chip: "A14 Bionic", Storage: "64GB", Camera: "12MP Dual" }),
  phone("iphone-12-128", "iPhone 12 128GB", 380000, { Display: "6.1\" Super Retina XDR", Chip: "A14 Bionic", Storage: "128GB", Camera: "12MP Dual" }),
  phone("iphone-12-pro-128", "iPhone 12 Pro 128GB", 465000, { Display: "6.1\" Super Retina XDR", Chip: "A14 Bionic", Storage: "128GB", Camera: "12MP Triple + LiDAR" }),
  phone("iphone-12-pro-256", "iPhone 12 Pro 256GB", 495000, { Display: "6.1\" Super Retina XDR", Chip: "A14 Bionic", Storage: "256GB", Camera: "12MP Triple + LiDAR" }),
  phone("iphone-12-pro-max-128", "iPhone 12 Pro Max 128GB", 565000, { Display: "6.7\" Super Retina XDR", Chip: "A14 Bionic", Storage: "128GB", Camera: "12MP Triple + LiDAR" }),
  phone("iphone-12-pro-max-256", "iPhone 12 Pro Max 256GB", 605000, { Display: "6.7\" Super Retina XDR", Chip: "A14 Bionic", Storage: "256GB", Camera: "12MP Triple + LiDAR" }),
  phone("iphone-13-128", "iPhone 13 128GB", 490000, { Display: "6.1\" Super Retina XDR", Chip: "A15 Bionic", Storage: "128GB", Camera: "12MP Dual" }),
  phone("iphone-13-256", "iPhone 13 256GB", 540000, { Display: "6.1\" Super Retina XDR", Chip: "A15 Bionic", Storage: "256GB", Camera: "12MP Dual" }),
  phone("iphone-13-pro-128", "iPhone 13 Pro 128GB", 640000, { Display: "6.1\" Super Retina XDR ProMotion", Chip: "A15 Bionic", Storage: "128GB", Camera: "12MP Triple + LiDAR" }),
  phone("iphone-13-pro-max-128", "iPhone 13 Pro Max 128GB", 690000, { Display: "6.7\" Super Retina XDR ProMotion", Chip: "A15 Bionic", Storage: "128GB", Camera: "12MP Triple + LiDAR" }),
  phone("iphone-13-pro-max-256", "iPhone 13 Pro Max 256GB", 725000, { Display: "6.7\" Super Retina XDR ProMotion", Chip: "A15 Bionic", Storage: "256GB", Camera: "12MP Triple + LiDAR" }),
  phone("iphone-14-128", "iPhone 14 128GB", 600000, { Display: "6.1\" Super Retina XDR", Chip: "A15 Bionic", Storage: "128GB", Camera: "12MP Dual" }),
  phone("iphone-14-256", "iPhone 14 256GB", 650000, { Display: "6.1\" Super Retina XDR", Chip: "A15 Bionic", Storage: "256GB", Camera: "12MP Dual" }),
  phone("iphone-14-plus-128", "iPhone 14 Plus 128GB", 705000, { Display: "6.7\" Super Retina XDR", Chip: "A15 Bionic", Storage: "128GB", Camera: "12MP Dual" }),
  phone("iphone-14-plus-256", "iPhone 14 Plus 256GB", 745000, { Display: "6.7\" Super Retina XDR", Chip: "A15 Bionic", Storage: "256GB", Camera: "12MP Dual" }),
  phone("iphone-14-pro-128", "iPhone 14 Pro 128GB", 865000, { Display: "6.1\" Super Retina XDR ProMotion", Chip: "A16 Bionic", Storage: "128GB", Camera: "48MP Triple" }),
  phone("iphone-14-pro-256", "iPhone 14 Pro 256GB", 900000, { Display: "6.1\" Super Retina XDR ProMotion", Chip: "A16 Bionic", Storage: "256GB", Camera: "48MP Triple" }),
  phone("iphone-15-128", "iPhone 15 128GB", 875000, { Display: "6.1\" Super Retina XDR", Chip: "A16 Bionic", Storage: "128GB", Camera: "48MP Dual" }),
  phone("iphone-15-256", "iPhone 15 256GB", 910000, { Display: "6.1\" Super Retina XDR", Chip: "A16 Bionic", Storage: "256GB", Camera: "48MP Dual" }),
  phone("iphone-15-plus-128", "iPhone 15 Plus 128GB", 930000, { Display: "6.7\" Super Retina XDR", Chip: "A16 Bionic", Storage: "128GB", Camera: "48MP Dual" }),
  phone("iphone-16-128", "iPhone 16 128GB", 980000, { Display: "6.1\" Super Retina XDR", Chip: "A18", Storage: "128GB", Camera: "48MP Dual" }),

  // ═══════════════════════════════════════
  // MacBook Pro 13"
  // ═══════════════════════════════════════
  mac("mbp-2017-13-i5-16-256", "MacBook Pro 2017 13\" i5 16GB 256GB", 610000, { Display: "13\" Retina", Chip: "Intel Core i5", RAM: "16GB", Storage: "256GB" }),
  mac("mbp-2018-13-i7-16-1tb", "MacBook Pro 2018 13\" i7 16GB 1TB", 730000, { Display: "13\" Retina", Chip: "Intel Core i7", RAM: "16GB", Storage: "1TB" }),
  mac("mbp-2019-13-i5-16-256", "MacBook Pro 2019 13\" i5 16GB 256GB", 680000, { Display: "13\" Retina", Chip: "Intel Core i5", RAM: "16GB", Storage: "256GB" }),
  mac("mbp-2020-13-i5-8-256", "MacBook Pro 2020 13\" i5 8GB 256GB", 730000, { Display: "13\" Retina", Chip: "Intel Core i5", RAM: "8GB", Storage: "256GB" }),
  mac("mbp-2020-13-i5-16-512", "MacBook Pro 2020 13\" i5 16GB 512GB", 780000, { Display: "13\" Retina", Chip: "Intel Core i5", RAM: "16GB", Storage: "512GB" }),
  mac("mbp-2020-13-m1-16-256", "MacBook Pro 2020 13\" M1 16GB 256GB", 950000, { Display: "13\" Retina", Chip: "Apple M1", RAM: "16GB", Storage: "256GB" }),
  mac("mbp-2020-13-m1-16-512", "MacBook Pro 2020 13\" M1 16GB 512GB", 1030000, { Display: "13\" Retina", Chip: "Apple M1", RAM: "16GB", Storage: "512GB" }),
  mac("mbp-2022-13-m2-8-256", "MacBook Pro 2022 13\" M2 8GB 256GB", 1050000, { Display: "13\" Retina", Chip: "Apple M2", RAM: "8GB", Storage: "256GB" }),
  mac("mbp-2022-13-m2-8-512", "MacBook Pro 2022 13\" M2 8GB 512GB", 1100000, { Display: "13\" Retina", Chip: "Apple M2", RAM: "8GB", Storage: "512GB" }),
  mac("mbp-2022-13-m2-16-512", "MacBook Pro 2022 13\" M2 16GB 512GB", 1260000, { Display: "13\" Retina", Chip: "Apple M2", RAM: "16GB", Storage: "512GB" }),
  mac("mbp-2021-14-m1-16-512", "MacBook Pro 2021 14\" M1 16GB 512GB", 1350000, { Display: "14\" Liquid Retina XDR", Chip: "Apple M1", RAM: "16GB", Storage: "512GB" }),
  mac("mbp-2021-14-m1pro-16-512", "MacBook Pro 2021 14\" M1 Pro 16GB 512GB", 1790000, { Display: "14\" Liquid Retina XDR", Chip: "Apple M1 Pro", RAM: "16GB", Storage: "512GB" }, { condition: "Brand New", isNew: true }),
  mac("mbp-2021-14-m1pro-32-512", "MacBook Pro 2021 14\" M1 Pro 32GB 512GB", 1490000, { Display: "14\" Liquid Retina XDR", Chip: "Apple M1 Pro", RAM: "32GB", Storage: "512GB" }),
  mac("mbp-2023-14-m3max-36-1tb", "MacBook Pro 2023 14\" M3 Max 36GB 1TB", 3300000, { Display: "14\" Liquid Retina XDR", Chip: "Apple M3 Max", RAM: "36GB", Storage: "1TB" }),

  // ═══════════════════════════════════════
  // MacBook Pro 15" & 16"
  // ═══════════════════════════════════════
  mac("mbp-2017-15-i7-16-512", "MacBook Pro 2017 15\" i7 16GB 512GB", 650000, { Display: "15\" Retina", Chip: "Intel Core i7", RAM: "16GB", Storage: "512GB", GPU: "4GB Dedicated" }),
  mac("mbp-2017-15-i7-16-1tb", "MacBook Pro 2017 15\" i7 16GB 1TB", 690000, { Display: "15\" Retina", Chip: "Intel Core i7", RAM: "16GB", Storage: "1TB", GPU: "4GB Dedicated" }),
  mac("mbp-2018-15-i7-16-512", "MacBook Pro 2018 15\" i7 16GB 512GB", 720000, { Display: "15\" Retina", Chip: "Intel Core i7", RAM: "16GB", Storage: "512GB", GPU: "4GB Dedicated" }),
  mac("mbp-2019-16-i7-16-512", "MacBook Pro 2019 16\" i7 16GB 512GB", 770000, { Display: "16\" Retina", Chip: "Intel Core i7", RAM: "16GB", Storage: "512GB", GPU: "4GB Dedicated" }),
  mac("mbp-2019-16-i9-16-512", "MacBook Pro 2019 16\" i9 16GB 512GB", 820000, { Display: "16\" Retina", Chip: "Intel Core i9", RAM: "16GB", Storage: "512GB", GPU: "4GB Dedicated" }),
  mac("mbp-2019-16-i9-16-1tb", "MacBook Pro 2019 16\" i9 16GB 1TB", 860000, { Display: "16\" Retina", Chip: "Intel Core i9", RAM: "16GB", Storage: "1TB", GPU: "4GB Dedicated" }),
  mac("mbp-2019-16-i9-32-512", "MacBook Pro 2019 16\" i9 32GB 512GB", 870000, { Display: "16\" Retina", Chip: "Intel Core i9", RAM: "32GB", Storage: "512GB", GPU: "4GB Dedicated" }),
  mac("mbp-2019-16-i7-32-1tb", "MacBook Pro 2019 16\" i7 32GB 1TB", 870000, { Display: "16\" Retina", Chip: "Intel Core i7", RAM: "32GB", Storage: "1TB", GPU: "4GB Dedicated" }),
  mac("mbp-2021-16-m1pro-16-1tb", "MacBook Pro 2021 16\" M1 Pro 16GB 1TB", 1470000, { Display: "16\" Liquid Retina XDR", Chip: "Apple M1 Pro", RAM: "16GB", Storage: "1TB" }),
  mac("mbp-2021-16-m1pro-32-512", "MacBook Pro 2021 16\" M1 Pro 32GB 512GB", 1490000, { Display: "16\" Liquid Retina XDR", Chip: "Apple M1 Pro", RAM: "32GB", Storage: "512GB" }),
  mac("mbp-2021-16-m1pro-32-1tb", "MacBook Pro 2021 16\" M1 Pro 32GB 1TB", 1670000, { Display: "16\" Liquid Retina XDR", Chip: "Apple M1 Pro", RAM: "32GB", Storage: "1TB" }),
  mac("mbp-2021-16-m1max-32-512", "MacBook Pro 2021 16\" M1 Max 32GB 512GB", 1680000, { Display: "16\" Liquid Retina XDR", Chip: "Apple M1 Max", RAM: "32GB", Storage: "512GB" }),
  mac("mbp-2021-16-m1max-64-2tb", "MacBook Pro 2021 16\" M1 Max 64GB 2TB", 2300000, { Display: "16\" Liquid Retina XDR", Chip: "Apple M1 Max", RAM: "64GB", Storage: "2TB" }),
  mac("mbp-2023-16-m2pro-32-512", "MacBook Pro 2023 16\" M2 Pro 32GB 512GB", 2500000, { Display: "16\" Liquid Retina XDR", Chip: "Apple M2 Pro", RAM: "32GB", Storage: "512GB" }),
  mac("mbp-2023-16-m2max-32-512", "MacBook Pro 2023 16\" M2 Max 32GB 512GB", 2800000, { Display: "16\" Liquid Retina XDR", Chip: "Apple M2 Max", RAM: "32GB", Storage: "512GB" }),
  mac("mbp-2023-16-m3pro-32-512", "MacBook Pro 2023 16\" M3 Pro 32GB 512GB", 2500000, { Display: "16\" Liquid Retina XDR", Chip: "Apple M3 Pro", RAM: "32GB", Storage: "512GB" }),

  // ═══════════════════════════════════════
  // MacBook Air
  // ═══════════════════════════════════════
  mac("mba-2017-13-i7-8-512", "MacBook Air 2017 13\" i7 8GB 512GB", 440000, { Display: "13\" ", Chip: "Intel Core i7", RAM: "8GB", Storage: "512GB" }),
  mac("mba-2019-13-i5-16-512", "MacBook Air 2019 13\" i5 16GB 512GB", 710000, { Display: "13\" Retina", Chip: "Intel Core i5", RAM: "16GB", Storage: "512GB" }),
  mac("mba-2020-13-m1-16-512", "MacBook Air 2020 13\" M1 16GB 512GB", 950000, { Display: "13\" Retina", Chip: "Apple M1", RAM: "16GB", Storage: "512GB" }),
  mac("mba-2022-13-m2-16-512", "MacBook Air 2022 13\" M2 16GB 512GB", 1300000, { Display: "13.6\" Liquid Retina", Chip: "Apple M2", RAM: "16GB", Storage: "512GB" }),
  mac("mba-2023-13-m3-16-256", "MacBook Air 2023 13\" M3 16GB 256GB", 1280000, { Display: "13.6\" Liquid Retina", Chip: "Apple M3", RAM: "16GB", Storage: "256GB" }),

  // ═══════════════════════════════════════
  // UK USED iPADS
  // ═══════════════════════════════════════
  ipad("ipad-mini-4-128", "iPad Mini 4 128GB", 200000, { Display: "7.9\"", Chip: "A8", Storage: "128GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-mini-5-64", "iPad Mini 5 64GB", 260000, { Display: "7.9\" Retina", Chip: "A12 Bionic", Storage: "64GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-mini-5-256", "iPad Mini 5 256GB", 330000, { Display: "7.9\" Retina", Chip: "A12 Bionic", Storage: "256GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-mini-6-64", "iPad Mini 6 64GB", 500000, { Display: "8.3\" Liquid Retina", Chip: "A15 Bionic", Storage: "64GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-mini-6-256", "iPad Mini 6 256GB", 670000, { Display: "8.3\" Liquid Retina", Chip: "A15 Bionic", Storage: "256GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-6-32", "iPad 6th Gen 32GB", 195000, { Display: "9.7\" Retina", Chip: "A10 Fusion", Storage: "32GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-6-128", "iPad 6th Gen 128GB", 250000, { Display: "9.7\" Retina", Chip: "A10 Fusion", Storage: "128GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-7-32", "iPad 7th Gen 32GB", 230000, { Display: "10.2\" Retina", Chip: "A10 Fusion", Storage: "32GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-7-128", "iPad 7th Gen 128GB", 290000, { Display: "10.2\" Retina", Chip: "A10 Fusion", Storage: "128GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-8-32", "iPad 8th Gen 32GB", 270000, { Display: "10.2\" Retina", Chip: "A12 Bionic", Storage: "32GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-8-128", "iPad 8th Gen 128GB", 330000, { Display: "10.2\" Retina", Chip: "A12 Bionic", Storage: "128GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-9-64", "iPad 9th Gen 64GB", 330000, { Display: "10.2\" Retina", Chip: "A13 Bionic", Storage: "64GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-9-256", "iPad 9th Gen 256GB", 370000, { Display: "10.2\" Retina", Chip: "A13 Bionic", Storage: "256GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-10-64-used", "iPad 10th Gen 64GB Wi-Fi", 490000, { Display: "10.9\" Liquid Retina", Chip: "A14 Bionic", Storage: "64GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-air-4-64", "iPad Air 4 64GB", 530000, { Display: "10.9\" Liquid Retina", Chip: "A14 Bionic", Storage: "64GB", Connectivity: "Wi-Fi" }),
  ipad("ipad-air-4-256", "iPad Air 4 256GB", 640000, { Display: "10.9\" Liquid Retina", Chip: "A14 Bionic", Storage: "256GB", Connectivity: "Wi-Fi" }),

  // ═══════════════════════════════════════
  // BRAND NEW iPADS
  // ═══════════════════════════════════════
  ipad("ipad-10-64-new", "iPad 10th Gen 64GB Wi-Fi (New)", 540000, { Display: "10.9\" Liquid Retina", Chip: "A14 Bionic", Storage: "64GB", Connectivity: "Wi-Fi" }, { condition: "Brand New", isNew: true }),
  ipad("ipad-11-128-new", "iPad 11th Gen A16 128GB Wi-Fi (New)", 600000, { Display: "10.9\" Liquid Retina", Chip: "A16 Bionic", Storage: "128GB", Connectivity: "Wi-Fi" }, { condition: "Brand New", isNew: true }),
  ipad("ipad-11-256-new", "iPad 11th Gen A16 256GB Wi-Fi (New)", 750000, { Display: "10.9\" Liquid Retina", Chip: "A16 Bionic", Storage: "256GB", Connectivity: "Wi-Fi" }, { condition: "Brand New", isNew: true }),
  ipad("ipad-mini-7-128-new", "iPad Mini 7 128GB Wi-Fi (New)", 850000, { Display: "8.3\" Liquid Retina", Chip: "A17 Pro", Storage: "128GB", Connectivity: "Wi-Fi" }, { condition: "Brand New", isNew: true }),
];

export const categories = ["All", "Smartphones", "Laptops", "Tablets", "Audio", "Gaming", "Wearables"];
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
