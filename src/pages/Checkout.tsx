import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Check, Banknote, CreditCard, Building2 } from "lucide-react";
import { formatNaira } from "@/lib/currency";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Pay on Delivery");

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

  const paymentMethods = [
    { label: "Pay on Delivery", icon: Banknote, description: "Cash on delivery" },
    { label: "Paystack", icon: CreditCard, description: "Pay with card via Paystack" },
    { label: "Direct Transfer", icon: Building2, description: "Bank transfer to Access Bank" },
  ];

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
              {paymentMethods.map(method => (
                <label key={method.label} className={`flex items-center gap-3 bg-card rounded-lg p-3 card-shadow cursor-pointer transition-all ${paymentMethod === method.label ? "ring-1 ring-primary/40" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={method.label}
                    checked={paymentMethod === method.label}
                    onChange={() => setPaymentMethod(method.label)}
                    className="accent-primary"
                  />
                  <method.icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-foreground">{method.label}</span>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </label>
              ))}
            </div>

            {paymentMethod === "Direct Transfer" && (
              <div className="bg-card rounded-lg p-4 card-shadow border border-primary/10">
                <p className="text-sm font-medium text-foreground mb-2">Bank Transfer Details</p>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Bank: <span className="text-foreground font-medium">Access Bank</span></p>
                  <p className="text-muted-foreground">Account Number: <span className="text-foreground font-mono font-medium">1899035962</span></p>
                  <p className="text-muted-foreground">Account Name: <span className="text-foreground font-medium">The Gadget Connect</span></p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Please send proof of payment via WhatsApp after transfer.</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Order Summary</h2>
            <div className="bg-card rounded-xl p-4 card-shadow space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                  <span className="font-mono text-foreground">{formatNaira(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-foreground/5 pt-3 flex justify-between">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-mono text-xl text-primary">{formatNaira(subtotal)}</span>
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
