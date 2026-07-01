import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSectionContent } from "@/hooks/useSiteContent";
import { getDefaults } from "@/lib/sectionDefaults";
import { EditableText } from "@/components/EditableText";

export default function Lifestyle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const { content } = useSectionContent("lifestyle");
  const c = { ...getDefaults("lifestyle"), ...(content ?? {}) };

  return (
    <section id="lifestyle" ref={ref} className="relative bg-paper grain">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.2,0.7,0.2,1] }}
              className="mb-8"
            >
              <EditableText sectionKey="lifestyle" fieldKey="eyebrow" value={c.eyebrow} as="span" className="eyebrow" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1 }}
              className="display text-[32px] sm:text-[40px] md:text-[56px] lg:text-[68px] text-ink text-balance"
            >
              <EditableText sectionKey="lifestyle" fieldKey="title_a" value={c.title_a} as="span" />
              <br />
              <EditableText sectionKey="lifestyle" fieldKey="title_b" value={c.title_b} as="span" className="text-foreground/80" />{" "}
              <EditableText sectionKey="lifestyle" fieldKey="highlight" value={c.highlight} as="span" className="italic gold-text" />
              <br />
              <EditableText sectionKey="lifestyle" fieldKey="title_c" value={c.title_c} as="span" />
            </motion.h2>
          </div>

          <div className="lg:col-span-7 lg:pt-20">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed text-pretty max-w-xl"
            >
              <EditableText sectionKey="lifestyle" fieldKey="paragraph" value={c.paragraph} as="span" multiline />
            </motion.p>


            <div className="mt-12 sm:mt-16 grid grid-cols-3 divide-x divide-foreground/15">
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
                  className="px-3 sm:px-4 first:pl-0 last:pr-0"
                >
                  <div className="num-marker text-2xl sm:text-3xl md:text-5xl">{s.v}</div>
                  <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.14em] sm:tracking-[0.18em] text-muted-foreground font-light leading-snug">{s.l}</div>
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
