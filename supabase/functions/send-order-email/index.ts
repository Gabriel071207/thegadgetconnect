import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-NG", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { order } = await req.json();
    if (!order) {
      return new Response(JSON.stringify({ error: "Missing order data" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items;
    const productList = items
      .map((item: any) => `• ${item.name} × ${item.quantity} — ${formatNaira(item.price * item.quantity)}`)
      .join("\n");

    // 1. Send admin notification email
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">🛒 New Order Received!</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Customer Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.customer_name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.customer_email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.customer_phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Address</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.shipping_address}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Payment Method</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.payment_method}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Payment Reference</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.payment_reference || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Total Amount</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #16a34a; font-size: 18px;">${formatNaira(order.total_amount)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Date</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formatDate(order.created_at)}</td></tr>
        </table>
        <h3>Products Ordered:</h3>
        <pre style="background: #f5f5f5; padding: 12px; border-radius: 8px;">${productList}</pre>
      </div>
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Gadget Connect <onboarding@resend.dev>",
        to: ["thegadgetconnect1207@gmail.com"],
        subject: `New Order from ${order.customer_name} — ${formatNaira(order.total_amount)}`,
        html: adminHtml,
      }),
    });

    // 2. Send customer confirmation email
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Order Confirmation – Gadget Connect</h2>
        <p>Dear ${order.customer_name},</p>
        <p>Thank you for your order from <strong>Gadget Connect</strong>.</p>
        <p>Your order has been successfully received and is now being processed. Your item(s) will be shipped to your provided address within <strong>7 to 10 working days</strong>, depending on your location.</p>
        <h3>Order Details:</h3>
        <pre style="background: #f5f5f5; padding: 12px; border-radius: 8px;">${productList}</pre>
        <p style="font-size: 18px; color: #16a34a;"><strong>Total: ${formatNaira(order.total_amount)}</strong></p>
        ${order.payment_reference ? `<p>Payment Reference: <strong>${order.payment_reference}</strong></p>` : ""}
        <p>If you have any questions, feel free to contact us:</p>
        <ul>
          <li>WhatsApp: <a href="https://wa.me/2348128629010">+234 812 862 9010</a></li>
          <li>Email: thegadgetconnect1207@gmail.com</li>
        </ul>
        <p>Thank you for choosing Gadget Connect.</p>
        <p>Best regards,<br/><strong>Gadget Connect Team</strong></p>
      </div>
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Gadget Connect <onboarding@resend.dev>",
        to: [order.customer_email],
        subject: "Order Confirmation – Gadget Connect",
        html: customerHtml,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
