import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Founder = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const whatsappNumber = "5547999999999";
  const message = encodeURIComponent("Olá! Gostaria de conversar sobre um projeto.");

  return (
    <section id="fundador" className="py-20 md:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-primary rounded-2xl opacity-20 blur-2xl" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden border-gradient">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
                  alt="Fundador da Racun Filmes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-4 -right-4 bg-card border-gradient rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center glow-primary">
                    <Play className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">5+ anos</p>
                    <p className="text-xs text-muted-foreground">de experiência</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Quem está por trás
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-2">
              Olá, eu sou o{" "}
              <span className="text-gradient">[Seu Nome]</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Fundador & Diretor Criativo da Racun Filmes
            </p>

            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                [Escreva aqui sua história pessoal - como começou no audiovisual, 
                o que te motivou, sua jornada até fundar a Racun Filmes...]
              </p>
              <p>
                [Compartilhe sua visão sobre o mercado audiovisual, o que te diferencia, 
                seus valores e como você aborda cada projeto...]
              </p>
              <p>
                [Mencione conquistas, clientes importantes atendidos ou projetos 
                que marcaram sua carreira...]
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-card border-gradient">
                <span className="text-xl font-bold text-gradient">Estratégia</span>
                <p className="text-xs text-muted-foreground mt-1">Sempre com propósito</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border-gradient">
                <span className="text-xl font-bold text-gradient">Qualidade</span>
                <p className="text-xs text-muted-foreground mt-1">Em cada frame</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border-gradient">
                <span className="text-xl font-bold text-gradient">Resultado</span>
                <p className="text-xs text-muted-foreground mt-1">Foco em conversão</p>
              </div>
            </div>

            {/* CTA and Social */}
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vamos conversar
                </a>
              </Button>

              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com/racunfilmes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/seunome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
