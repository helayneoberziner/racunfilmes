import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSectionContent } from "@/hooks/useSiteContent";
import { EditableText } from "@/components/EditableText";

export default function Lotes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent("lotes");
  const c = {
    eyebrow: content?.eyebrow ?? "Os lotes",
    big:     content?.big     ?? "320m²",
    suffix:  content?.suffix  ?? "a partir de",
    title:   content?.title   ?? "Liberdade para projetar a casa que sua família merece.",
    text:    content?.text    ?? "Lotes generosos, com topografia favorável e infraestrutura urbana pronta. Você escolhe o arquiteto, o ritmo e a obra — nós garantimos o entorno.",
    bullets: (content?.bullets ?? [
      "Topografia favorável à construção",
      "Infraestrutura urbana entregue",
      "Padrão arquitetônico controlado",
      "Alta valorização patrimonial",
    ]) as string[],
  };

  return (
    <section id="lotes" ref={ref} className="bg-emerald-deep text-paper relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(circle at 80% 20%, hsl(42 52% 60%) 0%, transparent 50%)" }}
      />
      <div className="container-custom section-padding relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold/80 mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <EditableText sectionKey="lotes" fieldKey="eyebrow" value={c.eyebrow} as="span" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1 }}
              className="flex flex-col"
            >
              <EditableText sectionKey="lotes" fieldKey="suffix" value={c.suffix} as="span" className="text-paper/60 text-sm uppercase tracking-[0.28em] font-light mb-3" />
              <EditableText sectionKey="lotes" fieldKey="big" value={c.big} as="span" className="display text-[84px] sm:text-[120px] md:text-[180px] lg:text-[220px] leading-[0.85] font-extralight text-paper" />
              <span className="mt-4 text-gold text-sm uppercase tracking-[0.3em]">Área útil</span>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.15 }}
              className="display text-[32px] md:text-[44px] lg:text-[52px] leading-tight text-balance"
            >
              <EditableText sectionKey="lotes" fieldKey="title" value={c.title} as="span" />
            </motion.h2>
            <p className="mt-8 text-paper/75 font-light leading-relaxed text-pretty max-w-lg">
              <EditableText sectionKey="lotes" fieldKey="text" value={c.text} as="span" multiline />
            </p>

            <ul className="mt-12 space-y-4">
              {c.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 * i }}
                  className="flex items-center gap-5 border-b border-paper/15 pb-4"
                >
                  <span className="num-marker text-xs text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-light text-paper/90">{b}</span>
                </motion.li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-12 group inline-flex items-center gap-4 px-7 py-4 bg-gold text-ink text-[11px] uppercase tracking-[0.32em] font-medium hover:bg-paper transition-colors duration-500"
            >
              Consultar disponibilidade
              <span className="h-px w-8 bg-ink/60 group-hover:w-12 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
