import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Crown, Medal, Users, Globe } from "lucide-react";

const objectives = [
  { icon: ShoppingCart, label: "Vender mais", description: "Converta visualizações em vendas" },
  { icon: Crown, label: "Posicionar marca", description: "Destaque-se da concorrência" },
  { icon: Medal, label: "Gerar autoridade", description: "Seja referência no seu mercado" },
  { icon: Users, label: "Atrair investidores", description: "Apresente-se profissionalmente" },
  { icon: Globe, label: "Fortalecer presença digital", description: "Domine as redes sociais" },
];

const Objectives = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Propósito
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            O vídeo certo para{" "}
            <span className="text-gradient">cada objetivo</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Cada projeto nasce com um propósito claro. Entendemos seu objetivo 
            e criamos o vídeo perfeito para alcançá-lo.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {objectives.map((objective, index) => (
            <motion.div
              key={objective.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group flex items-center gap-4 px-6 py-4 rounded-full border-gradient bg-card hover:bg-primary/10 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <objective.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">{objective.label}</h4>
                <p className="text-sm text-muted-foreground">{objective.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objectives;
