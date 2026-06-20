import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  eyebrow: "Experiência de vida",
  title_a: "Não vendemos lotes.",
  title_b: "Entregamos um",
  highlight: "novo capítulo",
  title_c: "para sua família.",
  paragraph:
    "Lago di Garda nasceu para acolher famílias que entendem que viver bem é viver com tempo, segurança e propósito. Aqui, a arquitetura responde à natureza — e a natureza responde ao silêncio.",
  stat1_value: "320m²",
  stat1_label: "Área mínima dos lotes",
  stat2_value: "24h",
  stat2_label: "Segurança com controle facial",
  stat3_value: "15+",
  stat3_label: "Espaços de convivência",
};

export default function Lifestyle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const { content } = useSectionContent("lifestyle");
  const c = { ...DEFAULTS, ...content };

  return (
    <section id="lifestyle" ref={ref} className="relative bg-paper grain">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.2,0.7,0.2,1] }}
              className="eyebrow mb-8"
            >
              {c.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1 }}
              className="display text-[40px] md:text-[56px] lg:text-[68px] text-ink text-balance"
            >
              {c.title_a}
              <br />
              <span className="text-foreground/80">{c.title_b}</span>{" "}
              <span className="italic gold-text">{c.highlight}</span>
              <br />
              {c.title_c}
            </motion.h2>
          </div>

          <div className="lg:col-span-7 lg:pt-20">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed text-pretty max-w-xl"
            >
              {c.paragraph}
            </motion.p>

            <div className="mt-16 grid grid-cols-3 divide-x divide-foreground/15">
              {[
                { v: c.stat1_value, l: c.stat1_label },
                { v: c.stat2_value, l: c.stat2_label },
                { v: c.stat3_value, l: c.stat3_label },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.1 }}
                  className="px-4 first:pl-0 last:pr-0"
                >
                  <div className="num-marker text-3xl md:text-5xl">{s.v}</div>
                  <div className="mt-3 text-xs md:text-sm uppercase tracking-[0.18em] text-muted-foreground font-light leading-snug">{s.l}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 hairline" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-foreground/70 font-light"
            >
              {["Segurança patrimonial real", "Convivência multigeracional", "Valorização imobiliária", "Arquitetura sob medida", "Natureza preservada", "Privacidade absoluta"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-accent" />
                  <span>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
