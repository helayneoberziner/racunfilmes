import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULT_ITEMS = [
  { q: "Qual o tamanho mínimo dos lotes?",       a: "Os lotes têm metragem a partir de 320m², com configurações que permitem grande liberdade arquitetônica." },
  { q: "Quando inicia a comercialização?",         a: "Estamos em fase de lançamento. Agende uma visita para conhecer o masterplan e as condições de pré-lançamento." },
  { q: "O condomínio aceita pets?",                a: "Sim. Há um Pet Place dedicado e regras claras de convivência para garantir conforto a todos os moradores." },
  { q: "Existe padrão construtivo obrigatório?",  a: "Existe um caderno de orientações arquitetônicas para preservar a harmonia visual e a valorização patrimonial do empreendimento." },
  { q: "Como funciona a segurança?",                a: "Portaria 24h com controle facial, perímetro monitorado por câmeras com IA e ronda interna." },
  { q: "Quais formas de pagamento estão disponíveis?", a: "Trabalhamos com condições diretas com a incorporadora, financiamento bancário e planos personalizados." },
];

export default function FAQ() {
  const { content } = useSectionContent("faq");
  const items = (content?.items?.length ? content.items : DEFAULT_ITEMS) as typeof DEFAULT_ITEMS;

  return (
    <section className="bg-paper">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-8">Perguntas frequentes</div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="display text-ink text-[36px] md:text-[48px] lg:text-[56px] text-balance leading-tight"
            >
              O que você ainda <span className="italic gold-text">precisa saber</span>.
            </motion.h2>
            <p className="mt-6 text-foreground/65 font-light max-w-sm">
              Não encontrou sua dúvida? Nossa equipe responde com clareza e sem pressa.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-foreground/15">
              {items.map((it, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-foreground/15">
                  <AccordionTrigger className="py-7 text-left hover:no-underline group">
                    <div className="flex items-start gap-6 w-full">
                      <span className="num-marker text-xs text-muted-foreground group-hover:text-accent transition-colors mt-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display font-light text-xl md:text-2xl text-ink leading-snug text-balance">
                        {it.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-12 pb-8 text-foreground/70 font-light leading-relaxed text-pretty max-w-2xl">
                    {it.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
