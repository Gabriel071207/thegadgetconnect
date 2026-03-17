import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, MessageCircle, Bell, ChevronLeft } from "lucide-react";
import { getProductById } from "@/data/products";
import { productImages } from "@/data/productImages";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/currency";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addItem } = useCart();

  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const img = productImages[product.id] || product.image;
  const storage = selectedStorage || product.storage[0] || "";
  const color = selectedColor || product.colors[0]?.name || "";

  const handleAddToCart = () => {
    addItem(product, storage, color);
    setAddedToCart(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const whatsappText = encodeURIComponent(
    `Hello, I want to order this gadget:\n\nProduct: ${product.name}\nStorage: ${storage}\nColor: ${color}\nPrice: ${formatNaira(product.price)}`
  );
  const whatsappUrl = `https://wa.me/2348128629010?text=${whatsappText}`;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-xl p-8 card-shadow flex items-center justify-center aspect-square"
          >
            <img src={img} alt={product.name} className="w-4/5 h-4/5 object-contain mix-blend-lighten" />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
            <h1 className="text-3xl font-medium text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 fill-deal text-deal" />
              <span className="text-sm text-muted-foreground">
                {product.rating}/5 from {product.reviews.toLocaleString()} verified owners
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-mono text-primary">{formatNaira(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg font-mono text-muted-foreground line-through">
                  {formatNaira(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Storage */}
            {product.storage.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-medium text-foreground mb-2">Storage</p>
                <div className="flex gap-2">
                  {product.storage.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedStorage(s)}
                      className={`px-4 py-2 rounded-lg text-sm font-mono transition-all nexus-ease ${
                        (selectedStorage || product.storage[0]) === s
                          ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  Color — {(selectedColor || product.colors[0]?.name)}
                </p>
                <div className="flex gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        (selectedColor || product.colors[0]?.name) === c.name
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "ring-1 ring-foreground/10"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            <div className="mb-6 bg-card rounded-lg p-4 card-shadow">
              <p className="text-sm font-medium text-foreground mb-3">Key Specs</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs text-muted-foreground">{key}</p>
                    <p className="text-sm font-mono text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all nexus-ease ${
                    addedToCart
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {addedToCart ? "Added ✓" : "Add to Cart"}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors nexus-ease"
                >
                  <MessageCircle className="w-4 h-4" /> Order via WhatsApp
                </a>
              </div>
              <button className="inline-flex items-center justify-center gap-2 bg-card text-muted-foreground px-6 py-3 rounded-lg text-sm card-shadow hover:text-primary transition-colors nexus-ease">
                <Bell className="w-4 h-4" /> Set Price Alert
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
