import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { products, getDeals, getNewArrivals } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight, Smartphone, Laptop, Headphones, Gamepad2, Watch, Tablet } from "lucide-react";

const categoryIcons = [
  { name: "Smartphones", icon: Smartphone },
  { name: "Laptops", icon: Laptop },
  { name: "Audio", icon: Headphones },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Wearables", icon: Watch },
  { name: "Tablets", icon: Tablet },
];

export default function Index() {
  const deals = getDeals();
  const newArrivals = getNewArrivals();

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categoryIcons.map(cat => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              className="bg-card rounded-xl p-4 card-shadow flex flex-col items-center gap-2 hover:-translate-y-1 transition-all duration-200 nexus-ease group"
            >
              <cat.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-foreground">Flash Deals</h2>
          <Link to="/deals" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-foreground">New Arrivals</h2>
          <Link to="/shop" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-medium text-foreground mb-6">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
