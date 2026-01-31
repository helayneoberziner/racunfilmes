import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Award, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Estratégia",
    description: "Cada projeto nasce de um objetivo claro e mensurável",
  },
  {
    icon: Lightbulb,
    title: "Criatividade",
    description: "Ideias originais que se destacam no mercado",
  },
  {
    icon: Award,
    title: "Qualidade",
    description: "Execução profissional em cada detalhe",
  },
  {
    icon: TrendingUp,
    title: "Resultado",
    description: "Vídeos que geram conversão e engajamento",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-gradient-dark">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Muito mais que{" "}
              <span className="text-gradient">vídeo bonito</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              A Racun Filmes é uma produtora audiovisual que une estratégia, 
              criatividade e execução profissional. Entendemos que um bom vídeo 
              precisa ir além da estética — ele precisa ter propósito e gerar resultado.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Atuamos com empresas, construtoras, restaurantes, eventos e marcas 
              que buscam se posicionar de forma profissional no mercado. Nossa 
              visão publicitária é aplicada em cada projeto, garantindo que cada 
              frame comunique a mensagem certa para o público certo.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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
            <div className="aspect-square rounded-2xl border-gradient bg-card p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center mb-6 glow-primary">
                  <span className="text-4xl font-bold text-primary-foreground">R</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Racun Filmes</h3>
                <p className="text-muted-foreground">
                  Transformando marcas através do audiovisual
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 w-full">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gradient">50+</span>
                    <p className="text-xs text-muted-foreground mt-1">Projetos</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gradient">30+</span>
                    <p className="text-xs text-muted-foreground mt-1">Clientes</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gradient">5+</span>
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
