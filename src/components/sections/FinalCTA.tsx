import { motion } from "framer-motion";
import hero from "@/assets/hero-lago.jpg";
import { useSectionContent } from "@/hooks/useSiteContent";
import { EditableText } from "@/components/EditableText";

export default function FinalCTA() {
  const { content } = useSectionContent("final_cta");
  const c = {
    title:  content?.title  ?? "Seu próximo capítulo",
    title2: content?.title2 ?? "começa aqui.",
    cta:    content?.cta    ?? "Agendar Visita",
  };

  return (
    <section className="relative isolate overflow-hidden text-paper">
      <div className="absolute inset-0">
        <img src={hero} alt="" className="w-full h-full object-cover animate-drift" loading="lazy" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/80" />
      </div>

      <div className="relative container-custom py-24 sm:py-32 md:py-44 lg:py-56 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.32em] text-gold/80 mb-8 sm:mb-10"
        >
          <span className="h-px w-6 sm:w-8 bg-gold/60" /> Lago di Garda · Blumenau <span className="h-px w-6 sm:w-8 bg-gold/60" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="display text-paper text-[40px] sm:text-[64px] md:text-[96px] lg:text-[120px] leading-[0.95] font-extralight text-balance"
        >
          <EditableText sectionKey="final_cta" fieldKey="title" value={c.title} as="span" /><br />
          <EditableText sectionKey="final_cta" fieldKey="title2" value={c.title2} as="span" className="italic gold-text font-light" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-14"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-5 px-10 py-5 bg-paper text-ink text-[12px] uppercase tracking-[0.32em] font-medium hover:bg-gold transition-colors duration-500"
          >
            <EditableText sectionKey="final_cta" fieldKey="cta" value={c.cta} as="span" />
            <span className="h-px w-10 bg-ink/60 group-hover:w-16 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
