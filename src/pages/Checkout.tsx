import { useCart } from "@/context/CartContext";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Check, Banknote, CreditCard, Building2, MessageCircle, Loader2 } from "lucide-react";
import { formatNaira } from "@/lib/currency";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Pay on Delivery");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (placed) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4 px-4">
        <div className="bg-primary/10 p-4 rounded-full">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-medium text-foreground">Order Placed!</h2>
        <p className="text-muted-foreground text-center">You'll receive a confirmation email shortly.</p>
        {orderId && <p className="text-xs text-muted-foreground font-mono">Order ID: {orderId}</p>}
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

  const validateForm = (): boolean => {
    if (!form.fullName.trim()) { toast.error("Full name is required"); return false; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error("Valid email is required"); return false; }
    if (!form.phone.trim()) { toast.error("Phone number is required"); return false; }
    if (!form.address.trim()) { toast.error("Shipping address is required"); return false; }
    if (!form.city.trim()) { toast.error("City is required"); return false; }
    return true;
  };

  const orderItems = items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    storage: item.selectedStorage,
    color: item.selectedColor,
  }));

  const saveOrder = async (paymentRef?: string, status: string = "pending") => {
    const { data, error } = await supabase.from("orders").insert({
      customer_name: form.fullName,
      customer_email: form.email,
      customer_phone: form.phone,
      shipping_address: `${form.address}, ${form.city}`,
      items: orderItems as any,
      total_amount: subtotal,
      payment_method: paymentMethod,
      payment_reference: paymentRef || null,
      payment_status: status,
    }).select("id").single();

    if (error) throw error;
    return data.id;
  };

  const sendEmailNotification = async (oid: string) => {
    try {
      const { data: order } = await supabase.from("orders").select("*").eq("id", oid).single();
      if (order) {
        await supabase.functions.invoke("send-order-email", { body: { order } });
      }
    } catch (e) {
      console.error("Email notification failed:", e);
    }
  };

  const handlePaystack = () => {
    if (!validateForm()) return;

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!paystackKey) {
      toast.error("Paystack is not configured yet. Please contact admin.");
      return;
    }

    setLoading(true);

    try {
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: form.email,
        amount: subtotal * 100, // kobo
        currency: "NGN",
        metadata: {
          custom_fields: [
            { display_name: "Customer Name", variable_name: "customer_name", value: form.fullName },
            { display_name: "Phone", variable_name: "phone", value: form.phone },
          ],
        },
        callback: async (response: { reference: string }) => {
          try {
            const oid = await saveOrder(response.reference, "pending");
            setOrderId(oid);

            // Verify payment via edge function
            const { data } = await supabase.functions.invoke("verify-payment", {
              body: { reference: response.reference, orderId: oid },
            });

            if (data?.success) {
              clearCart();
              setPlaced(true);
              toast.success("Payment successful! Order placed.");
            } else {
              toast.error("Payment verification failed. Contact support.");
            }
          } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Contact support.");
          }
          setLoading(false);
        },
        onClose: () => {
          setLoading(false);
          toast.info("Payment cancelled.");
        },
      });
      handler.openIframe();
    } catch (err) {
      console.error(err);
      toast.error("Could not initialize Paystack.");
      setLoading(false);
    }
  };

  const handlePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (paymentMethod === "Paystack") {
      handlePaystack();
      return;
    }

    if (paymentMethod === "Direct Transfer" && subtotal > 1000000) {
      toast.error("For orders above ₦1,000,000, please contact us on WhatsApp.");
      return;
    }

    setLoading(true);
    try {
      const oid = await saveOrder(undefined, paymentMethod === "Pay on Delivery" ? "pending" : "pending");
      setOrderId(oid);
      await sendEmailNotification(oid);
      clearCart();
      setPlaced(true);
      toast.success("Order placed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Try again.");
    }
    setLoading(false);
  };

  const paymentMethods = [
    { label: "Pay on Delivery", icon: Banknote, description: "Cash on delivery" },
    { label: "Paystack", icon: CreditCard, description: "Pay with card via Paystack" },
    { label: "Direct Transfer", icon: Building2, description: "Bank transfer to Access Bank" },
  ];

  const highValueWhatsApp = `https://wa.me/2348128629010?text=${encodeURIComponent("Hello, I want to place a high-value order on Gadget Connect.")}`;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-6 md:mb-8">Checkout</h1>
        <form ref={formRef} onSubmit={handlePlace} className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-lg font-medium text-foreground">Shipping Information</h2>
            <input placeholder="Full Name *" required value={form.fullName} onChange={e => updateField("fullName", e.target.value)}
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30" />
            <input placeholder="Email Address *" type="email" required value={form.email} onChange={e => updateField("email", e.target.value)}
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30" />
            <input placeholder="Phone Number *" type="tel" required value={form.phone} onChange={e => updateField("phone", e.target.value)}
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30" />
            <input placeholder="Shipping Address *" required value={form.address} onChange={e => updateField("address", e.target.value)}
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30" />
            <input placeholder="City *" required value={form.city} onChange={e => updateField("city", e.target.value)}
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30" />

            <h2 className="text-lg font-medium text-foreground pt-4">Payment Method</h2>
            <div className="space-y-2">
              {paymentMethods.map(method => (
                <label key={method.label} className={`flex items-center gap-3 bg-card rounded-lg p-3 card-shadow cursor-pointer transition-all ${paymentMethod === method.label ? "ring-1 ring-primary/40" : ""}`}>
                  <input type="radio" name="payment" value={method.label} checked={paymentMethod === method.label}
                    onChange={() => setPaymentMethod(method.label)} className="accent-primary" />
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
                {subtotal > 1000000 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-destructive font-medium">⚠️ For transactions above ₦1,000,000, please contact us directly on WhatsApp before proceeding.</p>
                    <a href={highValueWhatsApp} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                      <MessageCircle className="w-4 h-4" /> Contact on WhatsApp
                    </a>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-foreground mb-2">Bank Transfer Details</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">Bank: <span className="text-foreground font-medium">Access Bank</span></p>
                      <p className="text-muted-foreground">Account Number: <span className="text-foreground font-mono font-medium">1899035962</span></p>
                      <p className="text-muted-foreground">Account Name: <span className="text-foreground font-medium">GABRIEL NKECHUKWU UDE</span></p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">Please send proof of payment via WhatsApp after transfer.</p>
                  </>
                )}
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

            {paymentMethod === "Direct Transfer" && subtotal > 1000000 ? (
              <a href={highValueWhatsApp} target="_blank" rel="noreferrer"
                className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> Contact WhatsApp for this Order
              </a>
            ) : (
              <button type="submit" disabled={loading}
                className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {paymentMethod === "Paystack" ? "Pay with Paystack" : "Place Order"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
