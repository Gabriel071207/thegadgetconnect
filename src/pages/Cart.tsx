import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { productImages } from "@/data/productImages";
import { formatNaira } from "@/lib/currency";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <ShoppingCart className="w-16 h-16 text-muted-foreground/30" />
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link to="/shop" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Browse Gadgets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-medium text-foreground mb-8">Cart</h1>
        <AnimatePresence mode="popLayout">
          {items.map(item => {
            const img = productImages[item.product.id] || item.product.image;
            return (
              <motion.div
                key={item.product.id}
                layout
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 bg-card rounded-xl p-4 card-shadow mb-4"
              >
                <div className="w-20 h-20 bg-secondary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src={img} alt={item.product.name} className="w-16 h-16 object-contain mix-blend-lighten" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {item.selectedStorage && `${item.selectedStorage} · `}{item.selectedColor}
                  </p>
                  <p className="text-primary font-mono mt-1">{formatNaira(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono text-sm w-6 text-center text-foreground">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div className="bg-card rounded-xl p-6 card-shadow mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-2xl font-mono text-primary">{formatNaira(subtotal)}</span>
          </div>
          <div className="flex gap-3">
            <Link
              to="/checkout"
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium text-center hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="px-4 py-3 rounded-lg text-sm bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
