import { getDeals } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Zap } from "lucide-react";

export default function Deals() {
  const deals = getDeals();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-deal/10 p-2 rounded-lg">
            <Zap className="w-6 h-6 text-deal" />
          </div>
          <div>
            <h1 className="text-3xl font-medium text-foreground">Deals & Offers</h1>
            <p className="text-sm text-muted-foreground">Limited time discounts on premium gadgets.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        {deals.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No active deals right now.</p>
        )}
      </div>
    </div>
  );
}
