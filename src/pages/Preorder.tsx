import { useState } from "react";
import { Package, Check, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/data/products";
import { formatNaira } from "@/lib/currency";
import { Link } from "react-router-dom";

const conditions = [
  { label: "Brand New", desc: "Factory sealed, untouched", emoji: "✨" },
  { label: "UK Used", desc: "Lightly used, fully functional", emoji: "👍" },
  { label: "No Preference", desc: "Either is fine", emoji: "🤷" },
];

export default function Preorder() {
  const [step, setStep] = useState(1);
  const [gadgetName, setGadgetName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Check if the described gadget matches any product on the site
  const matchedProduct = products.find(
    (p) =>
      gadgetName &&
      p.name.toLowerCase().includes(gadgetName.toLowerCase())
  );

  const preorderPrice = matchedProduct
    ? matchedProduct.price - 50000
    : null;

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Pre-order submitted! We'll contact you shortly.");
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <div className="bg-primary/10 p-4 rounded-full">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-medium text-foreground">Pre-Order Received</h2>
        <p className="text-muted-foreground text-center max-w-md">
          We've received your pre-order request. Delivery takes <strong className="text-foreground">7–10 business days</strong>. We'll reach out to confirm details and payment.
        </p>
        <Link
          to="/shop"
          className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-medium text-foreground">Pre-Order</h1>
            <p className="text-sm text-muted-foreground">
              Describe the gadget you want. Pre-orders are ₦50,000 cheaper and deliver in 7–10 days.
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground block">
              What gadget are you looking for?
            </label>
            <input
              value={gadgetName}
              onChange={(e) => setGadgetName(e.target.value)}
              placeholder="e.g. iPhone 16 Pro Max 256GB"
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <label className="text-sm font-medium text-foreground block">
              Additional details (color, specs, etc.)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Natural Titanium color, 256GB storage, must include charger..."
              rows={4}
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
            />

            {matchedProduct && preorderPrice && preorderPrice > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-foreground font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> Match found on our store!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong className="text-foreground">{matchedProduct.name}</strong> — Regular price:{" "}
                  <span className="line-through">{formatNaira(matchedProduct.price)}</span>{" "}
                  → Pre-order price:{" "}
                  <span className="text-primary font-medium">{formatNaira(preorderPrice)}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  You save ₦50,000 by pre-ordering! Delivery in 7–10 days.
                </p>
              </div>
            )}

            <button
              onClick={() => gadgetName && setStep(2)}
              disabled={!gadgetName}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              Next: Condition
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground">
              What condition should the gadget be in?
            </p>
            <div className="grid grid-cols-3 gap-3">
              {conditions.map((c) => (
                <button
                  key={c.label}
                  onClick={() => {
                    setCondition(c.label);
                    setStep(3);
                  }}
                  className={`bg-card rounded-xl p-4 card-shadow text-center hover:-translate-y-1 transition-all nexus-ease ${
                    condition === c.label ? "ring-1 ring-primary" : ""
                  }`}
                >
                  <span className="text-2xl block mb-2">{c.emoji}</span>
                  <p className="text-sm font-medium text-foreground">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground">Your Contact Details</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp / Phone Number"
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <div className="bg-card rounded-lg p-4 card-shadow text-sm space-y-1">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Gadget:</strong> {gadgetName}
              </p>
              {description && (
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Details:</strong> {description}
                </p>
              )}
              <p className="text-muted-foreground">
                <strong className="text-foreground">Condition:</strong> {condition}
              </p>
              {matchedProduct && preorderPrice && preorderPrice > 0 && (
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Pre-order Price:</strong>{" "}
                  <span className="text-primary">{formatNaira(preorderPrice)}</span>{" "}
                  <span className="line-through text-xs">{formatNaira(matchedProduct.price)}</span>
                </p>
              )}
              <p className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> Delivery: 7–10 business days
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!name || !phone}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              Submit Pre-Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
