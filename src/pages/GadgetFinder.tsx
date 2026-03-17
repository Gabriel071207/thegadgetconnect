import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { products, categories } from "@/data/products";
import { formatNaira } from "@/lib/currency";
import ProductCard from "@/components/ProductCard";

export default function GadgetFinder() {
  const [budget, setBudget] = useState(3000000);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");

  const matches = products.filter(p => {
    if (p.price > budget) return false;
    if (category !== "All" && p.category !== category) return false;
    if (brand !== "All" && p.brand !== brand) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/10 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-medium text-foreground">Gadget Finder</h1>
            <p className="text-sm text-muted-foreground">Tell us your preferences and we'll find the perfect match.</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 card-shadow mb-8 grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Budget: <span className="font-mono text-primary">{formatNaira(budget)}</span>
            </label>
            <input
              type="range"
              min={100000}
              max={5000000}
              step={50000}
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    category === c ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Brand</label>
            <div className="flex flex-wrap gap-2">
              {["All", "Apple", "Samsung", "Sony"].map(b => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    brand === b ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.p
          key={matches.length}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-sm text-muted-foreground mb-4"
        >
          Matches Found: <span className="font-mono text-primary">{matches.length}</span>
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {matches.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
