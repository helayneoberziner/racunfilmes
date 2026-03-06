import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  MessageSquare, ClipboardList, FileText, Camera, 
  Clapperboard, Wand2, Send 
} from "lucide-react";
import { useSectionContent } from "@/hooks/useSiteContent";

const ICON_MAP: Record<string, any> = {
  MessageSquare, ClipboardList, FileText, Camera, Clapperboard, Wand2, Send,
};

const DEFAULTS = {
  tag: "Processo",
  title_prefix: "Como",
  title_highlight: "trabalhamos",
  subtitle: "Um processo estruturado que garante qualidade em cada etapa.",
  items: [
    { icon: "MessageSquare", title: "Briefing" },
    { icon: "ClipboardList", title: "Planejamento" },
    { icon: "FileText", title: "Roteiro" },
    { icon: "Camera", title: "Captação" },
    { icon: "Clapperboard", title: "Direção" },
    { icon: "Wand2", title: "Pós-produção" },
    { icon: "Send", title: "Entrega" },
  ],
};

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent("process");
  const c = { ...DEFAULTS, ...content };

  return (
    <section id="process" className="py-20 md:py-28 bg-gradient-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {c.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            {c.title_prefix} <span className="text-gradient">{c.title_highlight}</span>
          </h2>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {(c.items as any[]).map((step, index) => {
              const Icon = ICON_MAP[step.icon] ?? MessageSquare;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-10">
                    {index + 1}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-card border-gradient flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors duration-300 mt-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm">{step.title}</h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
