import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { products, categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [condition, setCondition] = useState("All");

  let filtered = products.filter(p => {
    if (category !== "All" && p.category !== category) return false;
    if (brand !== "All" && p.brand !== brand) return false;
    if (condition === "UK Used" && p.condition !== "UK Used") return false;
    if (condition === "Brand New" && p.condition !== "Brand New" && !p.isNew) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-medium text-foreground mb-6">Shop</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search gadgets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-card rounded-lg px-4 py-2.5 text-sm text-foreground card-shadow focus:outline-none"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all nexus-ease ${
                category === c
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {brands.map(b => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all nexus-ease ${
                brand === b
                  ? "bg-accent/10 text-accent"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No gadgets match your filters.</p>
        )}
      </div>
    </div>
  );
}
