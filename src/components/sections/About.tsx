import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Award, TrendingUp } from "lucide-react";

const features = [
  { icon: Target, title: "Estratégia", description: "Objetivo claro em cada projeto" },
  { icon: Lightbulb, title: "Criatividade", description: "Ideias que se destacam" },
  { icon: Award, title: "Qualidade", description: "Execução profissional" },
  { icon: TrendingUp, title: "Resultado", description: "Vídeos que convertem" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Quem Somos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5">
              Muito mais que{" "}
              <span className="text-gradient">vídeo bonito</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-5">
              A Racun Filmes une estratégia, criatividade e execução profissional. 
              Entendemos que um bom vídeo precisa ter propósito e gerar resultado.
            </p>
            <p className="text-muted-foreground mb-8">
              Atuamos com empresas, construtoras, restaurantes, eventos e marcas 
              que buscam se posicionar de forma profissional no mercado.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl border-gradient bg-card p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-5 glow-primary">
                  <span className="text-3xl font-bold text-primary-foreground">R</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Racun Filmes</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Transformando marcas através do audiovisual
                </p>
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="text-center">
                    <span className="text-xl font-bold text-gradient">50+</span>
                    <p className="text-xs text-muted-foreground mt-1">Projetos</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-gradient">30+</span>
                    <p className="text-xs text-muted-foreground mt-1">Clientes</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-gradient">5+</span>
                    <p className="text-xs text-muted-foreground mt-1">Anos</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
