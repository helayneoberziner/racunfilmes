import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-lago.jpg";
import { useSectionContent } from "@/hooks/useSiteContent";
import { getDefaults } from "@/lib/sectionDefaults";
import { EditableText } from "@/components/EditableText";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const { content } = useSectionContent("hero");
  const c = { ...getDefaults("hero"), ...(content ?? {}) };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const isVideo = c.media_type === "video" && !!c.media_url;
  const mediaSrc: string = c.media_url || heroBg;

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {isVideo ? (
          <video
            src={mediaSrc}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img
            src={mediaSrc}
            alt="Vista aérea do Lago di Garda ao entardecer"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-ink/40" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col">
        <div className="container-custom pt-20 md:pt-28 flex justify-between items-start text-paper/70 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.32em] font-light">
          <span>Bairro Velha</span>
          <span className="hidden sm:block">Rua Divinópolis · Blumenau</span>
        </div>

        <div className="container-custom flex-1 flex items-end pb-16 sm:pb-20 md:pb-28">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.2,0.7,0.2,1] }}
              className="flex items-center gap-3 sm:gap-4 text-paper/85 mb-6 sm:mb-8"
            >
              <span className="h-px w-10 sm:w-12 bg-gold" />
              <EditableText
                sectionKey="hero"
                fieldKey="eyebrow"
                value={c.eyebrow}
                as="span"
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.32em] font-medium"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.2,0.7,0.2,1] }}
              className="display text-paper text-[38px] xs:text-[44px] sm:text-[60px] md:text-[88px] lg:text-[112px] leading-[0.95] font-extralight text-balance"
            >
              <EditableText sectionKey="hero" fieldKey="title_a" value={c.title_a} as="span" />
              <br className="hidden sm:block" />{" "}
              <EditableText sectionKey="hero" fieldKey="title_b" value={c.title_b} as="span" className="font-light" />{" "}
              <EditableText sectionKey="hero" fieldKey="title_highlight" value={c.title_highlight} as="span" className="italic font-extralight gold-text" />
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 sm:mt-8 max-w-xl text-paper/80 text-[15px] sm:text-base md:text-lg font-light leading-relaxed text-pretty"
            >
              <EditableText sectionKey="hero" fieldKey="subtitle" value={c.subtitle} as="span" multiline />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-5"
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-4 bg-paper text-ink text-[11px] sm:text-[12px] uppercase tracking-[0.24em] sm:tracking-[0.28em] font-medium hover:bg-gold transition-all duration-500"
              >
                <EditableText sectionKey="hero" fieldKey="cta_primary" value={c.cta_primary} as="span" />
                <span className="h-px w-6 bg-ink/60 group-hover:w-10 transition-all" />
              </button>
              <button
                onClick={() => scrollTo("#lifestyle")}
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-4 border border-paper/40 text-paper text-[11px] sm:text-[12px] uppercase tracking-[0.24em] sm:tracking-[0.28em] font-medium hover:border-paper hover:bg-paper/5 transition-all duration-500"
              >
                <EditableText sectionKey="hero" fieldKey="cta_secondary" value={c.cta_secondary} as="span" />
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper/60">
          <span className="text-[10px] uppercase tracking-[0.4em]">Role</span>
          <ChevronDown className="w-4 h-4 animate-scroll-hint" />
        </div>
      </motion.div>
    </section>
  );
}
