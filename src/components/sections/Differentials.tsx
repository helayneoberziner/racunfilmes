import { motion } from "framer-motion";
import { useSectionContent } from "@/hooks/useSiteContent";
import { EditableText } from "@/components/EditableText";

const DEFAULT_ITEMS = [
  { title: "Segurança absoluta", text: "Portaria 24h, controle facial, perímetro monitorado e ronda interna." },
  { title: "Lazer completo",      text: "15+ ambientes de convivência, esporte e gastronomia." },
  { title: "Natureza preservada", text: "Trilha ecológica, lago central e áreas de mata atlântica nativa." },
  { title: "Valorização real",     text: "Endereço estratégico no bairro Velha, com alto potencial patrimonial." },
  { title: "Localização nobre",    text: "Conexão rápida com centro, escolas, hospitais e o vale." },
  { title: "Infraestrutura pronta",text: "Pavimentação, drenagem, iluminação e fibra entregues." },
];

export default function Differentials() {
  const { content } = useSectionContent("differentials");
  const items = (content?.items?.length ? content.items : DEFAULT_ITEMS) as typeof DEFAULT_ITEMS;
  const c = {
    eyebrow: content?.eyebrow ?? "Diferenciais",
    title:   content?.title   ?? "Seis razões que fazem do Lago di Garda",
    title2:  content?.title2  ?? "o próximo endereço da sua família.",
  };

  return (
    <section className="bg-paper-warm/40 bg-paper">
      <div className="container-custom section-padding">
        <div className="max-w-3xl mb-16 md:mb-20">
          <EditableText sectionKey="differentials" fieldKey="eyebrow" value={c.eyebrow} as="div" className="eyebrow mb-8" />
          <h2 className="display text-ink text-[28px] sm:text-[34px] md:text-[48px] lg:text-[58px] text-balance leading-tight">
            <EditableText sectionKey="differentials" fieldKey="title" value={c.title} as="span" />{" "}
            <EditableText sectionKey="differentials" fieldKey="title2" value={c.title2} as="span" className="italic gold-text" />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 lg:gap-x-20">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1 }}
              className="relative pt-6 border-t border-foreground/20"
            >
              <span className="num-marker text-xs text-accent absolute -top-px left-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display font-light text-2xl md:text-3xl text-ink leading-tight text-balance">
                {it.title}
              </h3>
              <p className="mt-4 text-foreground/65 font-light leading-relaxed text-pretty">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
