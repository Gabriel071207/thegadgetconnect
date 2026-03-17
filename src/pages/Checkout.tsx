import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <div className="bg-primary/10 p-4 rounded-full">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-medium text-foreground">Order Placed!</h2>
        <p className="text-muted-foreground">You'll receive a confirmation shortly.</p>
        <Link to="/shop" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No items to checkout.</p>
        <Link to="/shop" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium">
          Browse Gadgets
        </Link>
      </div>
    );
  }

  const handlePlace = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setPlaced(true);
    toast.success("Order placed successfully!");
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-medium text-foreground mb-8">Checkout</h1>
        <form onSubmit={handlePlace} className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-foreground">Shipping Information</h2>
            {["Full Name", "Address", "City", "Phone Number"].map(field => (
              <input
                key={field}
                placeholder={field}
                required
                className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            ))}
            <h2 className="text-lg font-medium text-foreground pt-4">Payment Method</h2>
            <div className="space-y-2">
              {["Pay on Delivery", "Paystack", "Flutterwave", "Stripe"].map(method => (
                <label key={method} className="flex items-center gap-3 bg-card rounded-lg p-3 card-shadow cursor-pointer">
                  <input type="radio" name="payment" value={method} defaultChecked={method === "Pay on Delivery"} className="accent-primary" />
                  <span className="text-sm text-foreground">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Order Summary</h2>
            <div className="bg-card rounded-xl p-4 card-shadow space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                  <span className="font-mono text-foreground">${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-foreground/5 pt-3 flex justify-between">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-mono text-xl text-primary">${subtotal.toLocaleString()}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
