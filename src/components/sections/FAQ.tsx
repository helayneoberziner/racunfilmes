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
    question: "Vocês atendem apenas uma cidade?",
    answer: "Não! Atuamos em Blumenau, Vale do Itajaí e todo o Litoral de Santa Catarina. Para projetos especiais, podemos nos deslocar para outras regiões.",
  },
  {
    question: "Vocês criam roteiro?",
    answer: "Sim! O roteiro é parte fundamental do nosso processo criativo. Desenvolvemos toda a narrativa junto com você, garantindo que a mensagem seja clara e impactante.",
  },
  {
    question: "Qual o prazo médio de entrega?",
    answer: "O prazo varia conforme a complexidade do projeto. Vídeos para redes sociais podem ser entregues em até 7 dias, enquanto projetos institucionais mais elaborados levam de 15 a 30 dias.",
  },
  {
    question: "Os vídeos podem ser usados em anúncios?",
    answer: "Com certeza! Inclusive, temos expertise em criar conteúdo otimizado para tráfego pago. Entregamos os arquivos nos formatos ideais para cada plataforma.",
  },
  {
    question: "Vocês trabalham com contrato?",
    answer: "Sim, todos os projetos são formalizados através de contrato, garantindo segurança e transparência para ambas as partes.",
  },
];

const FAQ = () => {
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
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Perguntas{" "}
            <span className="text-gradient">frequentes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tire suas dúvidas sobre nossos serviços e processo de trabalho.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-gradient rounded-xl bg-card px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
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
