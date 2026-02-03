import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface LeadNotificationRequest {
  name: string;
  email: string;
  whatsapp: string;
  projectType?: string;
  objective: string;
  company?: string;
  deadline?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(RESEND_API_KEY);

    const lead: LeadNotificationRequest = await req.json();

    // Validate required fields
    if (!lead.name || !lead.email || !lead.whatsapp || !lead.objective) {
      throw new Error("Missing required lead fields");
    }

    // Format the email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">
          🎬 Novo Lead Recebido!
        </h1>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0;">Dados do Contato</h2>
          <p><strong>Nome:</strong> ${lead.name}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/${lead.whatsapp.replace(/\D/g, '')}">${lead.whatsapp}</a></p>
          ${lead.company ? `<p><strong>Empresa:</strong> ${lead.company}</p>` : ''}
        </div>

        <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0;">Detalhes do Projeto</h2>
          ${lead.projectType ? `<p><strong>Tipo de Projeto:</strong> ${lead.projectType}</p>` : ''}
          ${lead.deadline ? `<p><strong>Prazo:</strong> ${lead.deadline}</p>` : ''}
          <p><strong>Objetivo:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #FF6B35;">
            ${lead.objective}
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${lead.name}! Recebemos sua solicitação de orçamento e vamos analisá-la.`)}" 
             style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            📱 Responder via WhatsApp
          </a>
        </div>

        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
          Este e-mail foi enviado automaticamente pelo sistema de leads do site.
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Leads <onboarding@resend.dev>", // Change to your verified domain: noreply@yourdomain.com
      to: ["seu-email@empresa.com"], // Change to your actual notification email
      subject: `🎬 Novo Lead: ${lead.name} - ${lead.projectType || 'Orçamento'}`,
      html: emailHtml,
    });

    console.log("Lead notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error sending lead notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
