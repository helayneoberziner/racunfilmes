import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  MessageSquare, 
  ClipboardList, 
  FileText, 
  Camera, 
  Clapperboard, 
  Wand2, 
  Send 
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Briefing",
    description: "Entendemos seus objetivos, público e mensagem",
  },
  {
    icon: ClipboardList,
    title: "Planejamento",
    description: "Definimos estratégia, cronograma e recursos",
  },
  {
    icon: FileText,
    title: "Roteiro",
    description: "Criamos a narrativa perfeita para seu vídeo",
  },
  {
    icon: Camera,
    title: "Captação",
    description: "Filmagem profissional com equipamentos de ponta",
  },
  {
    icon: Clapperboard,
    title: "Direção",
    description: "Condução criativa de cada cena",
  },
  {
    icon: Wand2,
    title: "Pós-produção",
    description: "Edição, color grading e finalização",
  },
  {
    icon: Send,
    title: "Entrega",
    description: "Vídeo finalizado nos formatos adequados",
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Processo Criativo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Como{" "}
            <span className="text-gradient">trabalhamos</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Um processo estruturado que garante qualidade e profissionalismo 
            em cada etapa do projeto.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Number */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-10">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-card border-gradient flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300 mt-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h4 className="font-bold mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
