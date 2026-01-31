import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Vocês atendem fora da cidade?",
    answer: "Sim! Atuamos em Blumenau, Vale do Itajaí e Litoral de Santa Catarina. Para projetos especiais, podemos nos deslocar para outras regiões.",
  },
  {
    question: "Vocês criam roteiro?",
    answer: "Sim! O roteiro é parte do nosso processo. Desenvolvemos a narrativa junto com você.",
  },
  {
    question: "Qual o prazo médio de entrega?",
    answer: "Vídeos para redes sociais em até 7 dias. Projetos institucionais de 15 a 30 dias.",
  },
  {
    question: "Os vídeos podem ser usados em anúncios?",
    answer: "Com certeza! Entregamos nos formatos ideais para cada plataforma de anúncios.",
  },
  {
    question: "Como funciona o orçamento?",
    answer: "Após o briefing, enviamos uma proposta detalhada em até 24h úteis. O valor varia conforme escopo e complexidade.",
  },
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-gradient-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Perguntas <span className="text-gradient">frequentes</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-gradient rounded-lg bg-card px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary py-4 text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
