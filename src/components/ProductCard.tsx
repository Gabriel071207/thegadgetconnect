import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import type { Product } from "@/data/products";
import { productImages } from "@/data/productImages";
import { formatNaira } from "@/lib/currency";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const img = productImages[product.id] || product.image;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.2, 0, 0, 1] }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="bg-card rounded-xl p-2.5 md:p-4 card-shadow transition-all duration-200 nexus-ease group-hover:-translate-y-1 group-hover:card-hover-shadow">
          <div className="relative aspect-square mb-2 md:mb-3 overflow-hidden rounded-lg bg-secondary/30 flex items-center justify-center">
            <img
              src={img}
              alt={product.name}
              className="w-4/5 h-4/5 object-contain transition-transform duration-300 nexus-ease group-hover:scale-105"
            />
            {product.isDeal && (
              <span className="absolute top-1 left-1 md:top-2 md:left-2 bg-deal/90 text-primary-foreground text-[10px] md:text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-md flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 md:w-3 md:h-3" /> {discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-1 left-1 md:top-2 md:left-2 bg-accent/90 text-accent-foreground text-[10px] md:text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-md">
                NEW
              </span>
            )}
            {product.isPreorder && (
              <span className="absolute top-1 left-1 md:top-2 md:left-2 bg-muted text-muted-foreground text-[10px] md:text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-md">
                PRE-ORDER
              </span>
            )}
            {product.condition && (
              <span className={`absolute top-1 right-1 md:top-2 md:right-2 text-[10px] md:text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-md ${
                product.condition === "Brand New"
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {product.condition}
              </span>
            )}
          </div>
          <div>
            <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">{product.brand}</p>
            <h3 className="text-xs md:text-sm font-medium text-foreground truncate">{product.name}</h3>
            <div className="flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1">
              <span className="text-primary font-mono text-sm md:text-lg">{formatNaira(product.price)}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground font-mono text-[10px] md:text-sm line-through">
                  {formatNaira(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1 md:mt-2">
              <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-deal text-deal" />
              <span className="text-[10px] md:text-xs text-muted-foreground">
                {product.rating} ({product.reviews.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
