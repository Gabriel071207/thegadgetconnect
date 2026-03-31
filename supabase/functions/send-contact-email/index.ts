import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Send admin notification
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">📩 New Contact Message</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
        </table>
        <h3>Message:</h3>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
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
        subject: `New Contact Message from ${name}`,
        html: adminHtml,
      }),
    });

    // 2. Send confirmation to customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">We received your message!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to <strong>Gadget Connect</strong>. We've received your message and will get back to you as soon as possible.</p>
        <p>If your enquiry is urgent, feel free to contact us directly:</p>
        <ul>
          <li>WhatsApp: <a href="https://wa.me/2348128629010">+234 812 862 9010</a></li>
          <li>Email: thegadgetconnect1207@gmail.com</li>
        </ul>
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
        to: [email],
        subject: "We received your message – Gadget Connect",
        html: customerHtml,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact email error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
