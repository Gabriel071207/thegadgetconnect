import { useState } from "react";
import { RefreshCw, Upload, Check } from "lucide-react";
import { toast } from "sonner";

const conditions = [
  { label: "Mint", desc: "Like new, no scratches", emoji: "✨" },
  { label: "Used", desc: "Minor wear, fully functional", emoji: "👍" },
  { label: "Cracked", desc: "Visible damage, still works", emoji: "🔧" },
];

export default function TradeIn() {
  const [step, setStep] = useState(1);
  const [model, setModel] = useState("");
  const [storage, setStorage] = useState("");
  const [condition, setCondition] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Trade-in request submitted! We'll review it shortly.");
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <div className="bg-primary/10 p-4 rounded-full">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-medium text-foreground">Offer Pending</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Trade-in value is calculated based on current market demand and device condition. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-2 rounded-lg">
            <RefreshCw className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-medium text-foreground">Trade-In</h1>
            <p className="text-sm text-muted-foreground">Submit your old device and get credit toward a new one.</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
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
            <label className="text-sm font-medium text-foreground block">Device Model</label>
            <input
              value={model}
              onChange={e => setModel(e.target.value)}
              placeholder="e.g. iPhone 13 Pro"
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <label className="text-sm font-medium text-foreground block">Storage</label>
            <input
              value={storage}
              onChange={e => setStorage(e.target.value)}
              placeholder="e.g. 128GB"
              className="w-full px-4 py-3 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground card-shadow focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <button
              onClick={() => model && setStep(2)}
              disabled={!model}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              Next: Condition
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground">Select Condition</p>
            <div className="grid grid-cols-3 gap-3">
              {conditions.map(c => (
                <button
                  key={c.label}
                  onClick={() => { setCondition(c.label); setStep(3); }}
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
            <p className="text-sm font-medium text-foreground">Upload Photos</p>
            <div className="border-2 border-dashed border-foreground/10 rounded-xl p-12 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
            </div>
            <div className="bg-card rounded-lg p-4 card-shadow text-sm">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Summary:</strong> {model} · {storage || "N/A"} · {condition}
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Submit Trade-In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
