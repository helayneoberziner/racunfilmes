import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield, ScanFace, Trophy, Volleyball, Wine, Flame, Briefcase, Baby,
  ToyBrick, Dog, Sprout, Trees, PartyPopper, UtensilsCrossed,
} from "lucide-react";
import { useSectionContent } from "@/hooks/useSiteContent";

const ICONS: Record<string, any> = {
  Shield, ScanFace, Trophy, Volleyball, Wine, Flame, Briefcase, Baby,
  ToyBrick, Dog, Sprout, Trees, PartyPopper, UtensilsCrossed,
};

const DEFAULT_ITEMS = [
  { icon: "Shield",     title: "Portaria 24 horas" },
  { icon: "ScanFace",   title: "Controle facial" },
  { icon: "Volleyball", title: "Quadra Beach Tennis" },
  { icon: "Trophy",     title: "Quadra Poliesportiva" },
  { icon: "PartyPopper",title: "Salão de Festas" },
  { icon: "Flame",      title: "3 Espaços Grill" },
  { icon: "UtensilsCrossed", title: "2 Espaços Gourmet" },
  { icon: "Briefcase",  title: "3 Coworkings" },
  { icon: "ToyBrick",   title: "Playground" },
  { icon: "Baby",       title: "Brinquedoteca" },
  { icon: "Dog",        title: "Pet Place" },
  { icon: "Flame",      title: "Fire Place" },
  { icon: "Sprout",     title: "Espaço Horta" },
  { icon: "Trees",      title: "Trilha Ecológica" },
];

export default function Infrastructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent("infrastructure");
  const items = (content?.items?.length ? content.items : DEFAULT_ITEMS) as typeof DEFAULT_ITEMS;
  const c = {
    eyebrow: content?.eyebrow ?? "Infraestrutura",
    title:   content?.title   ?? "Tudo o que sua família precisa,",
    title2:  content?.title2  ?? "a poucos passos de casa.",
  };

  return (
    <section id="infra" ref={ref} className="bg-paper-warm/40 bg-paper">
      <div className="container-custom section-padding">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1}} className="mb-8">
              <EditableText sectionKey="infrastructure" fieldKey="eyebrow" value={c.eyebrow} as="span" className="eyebrow" />
            </motion.div>
            <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1.1,delay:0.1}}
              className="display text-ink text-[36px] md:text-[52px] lg:text-[64px] text-balance leading-[0.98]">
              <EditableText sectionKey="infrastructure" fieldKey="title" value={c.title} as="span" /><br />
              <EditableText sectionKey="infrastructure" fieldKey="title2" value={c.title2} as="span" className="italic gold-text" />
            </motion.h2>
          </div>
          <div className="text-sm text-muted-foreground font-light max-w-xs">
            {items.length} ambientes pensados para os ritmos da vida — do esporte ao silêncio.
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-foreground/10">
          {items.map((it, i) => {
            const Icon = ICONS[it.icon] ?? Shield;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05 }}
                className="group relative border-r border-b border-foreground/10 p-6 md:p-8 lg:p-10 min-h-[180px] md:min-h-[220px] flex flex-col justify-between bg-paper hover:bg-emerald-deep hover:text-paper transition-colors duration-500"
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent group-hover:text-gold transition-colors" strokeWidth={1.2} />
                <div>
                  <div className="num-marker text-xs text-muted-foreground group-hover:text-gold/70 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-display font-light text-lg md:text-xl leading-tight text-balance">
                    {it.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
