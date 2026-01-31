import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Crown, Medal, Users, Globe } from "lucide-react";

const objectives = [
  { icon: ShoppingCart, label: "Vender mais" },
  { icon: Crown, label: "Posicionar marca" },
  { icon: Medal, label: "Gerar autoridade" },
  { icon: Users, label: "Atrair investidores" },
  { icon: Globe, label: "Fortalecer presença digital" },
];

const Objectives = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Propósito
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            O vídeo certo para o{" "}
            <span className="text-gradient">objetivo certo</span>
          </h2>
          <p className="text-muted-foreground">
            Trabalhamos com estratégia antes da câmera. Cada projeto nasce com um propósito claro.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {objectives.map((objective, index) => (
            <motion.div
              key={objective.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group flex items-center gap-3 px-5 py-3 rounded-full border-gradient bg-card hover:bg-primary/10 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <objective.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-medium">{objective.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objectives;
