import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiter (per function instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max orders per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\-+()]{7,25}$/.test(phone);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(clientIp)) {
      return new Response(JSON.stringify({ error: "Too many orders. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { customer_name, customer_email, customer_phone, shipping_address, items, total_amount, payment_method, payment_reference } = body;

    // Server-side validation
    const errors: string[] = [];

    if (!customer_name || typeof customer_name !== "string" || customer_name.trim().length < 2 || customer_name.length > 200) {
      errors.push("Valid customer name is required (2-200 characters)");
    }
    if (!customer_email || typeof customer_email !== "string" || !validateEmail(customer_email) || customer_email.length > 255) {
      errors.push("Valid email address is required");
    }
    if (!customer_phone || typeof customer_phone !== "string" || !validatePhone(customer_phone)) {
      errors.push("Valid phone number is required");
    }
    if (!shipping_address || typeof shipping_address !== "string" || shipping_address.trim().length < 5 || shipping_address.length > 500) {
      errors.push("Valid shipping address is required (5-500 characters)");
    }
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      errors.push("Order must contain 1-50 items");
    }
    if (typeof total_amount !== "number" || total_amount <= 0 || total_amount > 100000000) {
      errors.push("Invalid total amount");
    }
    const validMethods = ["Pay on Delivery", "Paystack", "Direct Transfer"];
    if (!payment_method || !validMethods.includes(payment_method)) {
      errors.push("Invalid payment method");
    }

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: errors.join("; ") }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Sanitize inputs
    const sanitized = {
      customer_name: customer_name.trim().slice(0, 200),
      customer_email: customer_email.trim().toLowerCase().slice(0, 255),
      customer_phone: customer_phone.trim().slice(0, 30),
      shipping_address: shipping_address.trim().slice(0, 500),
      items,
      total_amount,
      payment_method,
      payment_reference: payment_reference || null,
      payment_status: "pending",
    };

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("orders")
      .insert(sanitized)
      .select("id")
      .single();

    if (error) {
      console.error("Order insert error:", error);
      return new Response(JSON.stringify({ error: "Failed to create order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, orderId: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
