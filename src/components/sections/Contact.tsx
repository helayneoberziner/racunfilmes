import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Mensagem enviada!", {
      description: "Retornaremos em até 24 horas úteis.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const whatsappNumber = "5547999999999";
  const message = encodeURIComponent("Olá! Gostaria de solicitar um orçamento.");

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
                    placeholder="Seu nome"
                    required
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Empresa</label>
                  <Input 
                    placeholder="Nome da empresa"
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">WhatsApp *</label>
                  <Input 
                    placeholder="(47) 99999-9999"
                    required
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">E-mail *</label>
                  <Input 
                    type="email"
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
                    placeholder="Ex: Institucional, campanha..."
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Prazo</label>
                  <Input 
                    placeholder="Ex: 30 dias"
                    className="bg-card border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Objetivo do vídeo *</label>
                <Textarea 
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
                  href={`https://wa.me/${whatsappNumber}?text=${message}`}
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
