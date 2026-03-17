import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/5 surface-l2 mt-20">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="The Gadget Connect" className="h-10 w-10 rounded-full" />
            <span className="font-medium text-foreground">The Gadget Connect</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Engineering the future of your desk setup. Premium gadgets, transparent pricing.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Shop</h4>
          <div className="flex flex-col gap-2">
            {["Smartphones", "Laptops", "Audio", "Gaming", "Wearables"].map(c => (
              <Link key={c} to={`/shop?category=${c}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{c}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Services</h4>
          <div className="flex flex-col gap-2">
            <Link to="/trade-in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Trade-In</Link>
            <Link to="/finder" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Gadget Finder</Link>
            <Link to="/deals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Deals</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Support</h4>
          <div className="flex flex-col gap-2">
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/5 py-6 text-center">
        <p className="text-xs text-muted-foreground">© 2025 The Gadget Connect. All rights reserved.</p>
      </div>
    </footer>
  );
}
