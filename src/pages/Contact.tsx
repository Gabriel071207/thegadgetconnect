import { MessageCircle, Mail, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, message },
      });
      if (error) throw error;
      toast.success("Message sent! We'll get back to you soon.");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-medium text-foreground mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <a
              href="https://wa.me/2348128629010"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-card rounded-xl p-4 card-shadow hover:-translate-y-0.5 transition-all nexus-ease"
            >
              <div className="bg-primary/10 p-2 rounded-lg">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">WhatsApp</p>
                <p className="text-xs text-muted-foreground">+234 812 862 9010</p>
              </div>
            </a>
            <div className="flex items-center gap-3 bg-card rounded-xl p-4 card-shadow">
              <div className="bg-accent/10 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">thegadgetconnect1207@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card rounded-xl p-4 card-shadow">
              <div className="bg-deal/10 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-deal" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p className="text-xs text-muted-foreground">Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 card-shadow space-y-4">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your Message"
              rows={4}
              required
              className="w-full px-4 py-3 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
