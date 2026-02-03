import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  company: z.string().trim().max(100, "Nome da empresa muito longo").optional(),
  whatsapp: z.string().trim().min(1, "WhatsApp é obrigatório").max(20, "WhatsApp inválido"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  projectType: z.string().trim().max(100, "Tipo de projeto muito longo").optional(),
  deadline: z.string().trim().max(50, "Prazo muito longo").optional(),
  objective: z.string().trim().min(1, "Objetivo é obrigatório").max(1000, "Mensagem muito longa"),
});

type LeadFormData = z.infer<typeof leadSchema>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    company: "",
    whatsapp: "",
    email: "",
    projectType: "",
    deadline: "",
    objective: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = leadSchema.parse(formData);

      // Insert lead into database
      const { error } = await supabase.from("leads").insert({
        name: validatedData.name,
        email: validatedData.email,
        whatsapp: validatedData.whatsapp,
        project_type: validatedData.projectType || null,
        objective: validatedData.objective,
        message: validatedData.company 
          ? `Empresa: ${validatedData.company}${validatedData.deadline ? ` | Prazo: ${validatedData.deadline}` : ""}`
          : validatedData.deadline ? `Prazo: ${validatedData.deadline}` : null,
      });

      if (error) throw error;

      toast.success("Mensagem enviada!", {
        description: "Redirecionando para o WhatsApp...",
      });

      // Reset form
      setFormData({
        name: "",
        company: "",
        whatsapp: "",
        email: "",
        projectType: "",
        deadline: "",
        objective: "",
      });

      // Redirect to WhatsApp after short delay
      const whatsappMessage = encodeURIComponent(
        `Olá! Sou ${validatedData.name}${validatedData.company ? ` da ${validatedData.company}` : ""}. Acabei de enviar um formulário de orçamento pelo site. Gostaria de discutir meu projeto de ${validatedData.projectType || "vídeo"}.`
      );
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
      }, 1500);

    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error("Erro de validação", {
          description: firstError.message,
        });
      } else {
        toast.error("Erro ao enviar", {
          description: "Tente novamente ou entre em contato pelo WhatsApp.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "5547999999999";

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Orçamento
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Vamos <span className="text-gradient">conversar</span>?
          </h2>
          <p className="text-muted-foreground">
            Conte-nos sobre seu projeto e receba um orçamento personalizado.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nome *</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Empresa</label>
                  <Input 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">WhatsApp *</label>
                  <Input 
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(47) 99999-9999"
                    required
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">E-mail *</label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Projeto</label>
                  <Input 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    placeholder="Ex: Institucional, campanha..."
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Prazo</label>
                  <Input 
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    placeholder="Ex: 30 dias"
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Objetivo do vídeo *</label>
                <Textarea 
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  placeholder="Descreva seu projeto e o resultado esperado..."
                  rows={4}
                  required
                  className="bg-card border-border focus:border-primary resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Solicitar Orçamento
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Retornamos em até 24 horas úteis.
              </p>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="p-6 rounded-xl border-gradient bg-card">
              <h3 className="font-bold mb-4">Prefere WhatsApp?</h3>
              <Button variant="whatsapp" size="lg" className="w-full" asChild>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar agora
                </a>
              </Button>
            </div>

            <div className="p-6 rounded-xl border-gradient bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Área de Atuação</h4>
                  <p className="text-sm text-muted-foreground">
                    Blumenau, Vale do Itajaí e Litoral de Santa Catarina
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
