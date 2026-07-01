import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import masterplan from "@/assets/masterplan.jpg";
import { useSectionContent } from "@/hooks/useSiteContent";
import { EditableText } from "@/components/EditableText";

const DEFAULT_PINS = [
  { x: 28, y: 48, label: "Lotes residenciais" },
  { x: 52, y: 62, label: "Lago central" },
  { x: 72, y: 42, label: "Clube de lazer" },
  { x: 80, y: 58, label: "Quadras esportivas" },
  { x: 48, y: 14, label: "Portaria principal" },
];

export default function Masterplan() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<number | null>(null);
  const { content } = useSectionContent("masterplan");
  const c = {
    eyebrow: content?.eyebrow ?? "Masterplan",
    title:   content?.title   ?? "Cada lote pensado",
    title2:  content?.title2  ?? "como uma vista.",
    text:    content?.text    ?? "O traçado curvo abraça o lago central e respeita o relevo natural, garantindo privacidade e vista privilegiada para todos os lotes.",
    pins:    (content?.pins ?? DEFAULT_PINS) as typeof DEFAULT_PINS,
  };

  return (
    <section id="masterplan" ref={ref} className="bg-paper">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1}} className="mb-8">
              <EditableText sectionKey="masterplan" fieldKey="eyebrow" value={c.eyebrow} as="span" className="eyebrow" />
            </motion.div>
            <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1.1,delay:0.1}}
              className="display text-ink text-[36px] md:text-[48px] lg:text-[56px] text-balance">
              <EditableText sectionKey="masterplan" fieldKey="title" value={c.title} as="span" /><br />
              <EditableText sectionKey="masterplan" fieldKey="title2" value={c.title2} as="span" className="italic gold-text" />
            </motion.h2>
            <motion.p initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1,delay:0.2}}
              className="mt-8 text-foreground/70 font-light leading-relaxed text-pretty">
              <EditableText sectionKey="masterplan" fieldKey="text" value={c.text} as="span" multiline />
            </motion.p>

            <div className="mt-10 space-y-3">
              {c.pins.map((p, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={`w-full text-left flex items-center gap-4 py-3 border-b border-foreground/10 text-sm font-light transition-colors ${active === i ? "text-accent" : "text-ink/80"}`}
                >
                  <span className={`num-marker text-xs transition-colors ${active===i?"text-accent":"text-muted-foreground"}`}>{String(i+1).padStart(2,"0")}</span>
                  <span className="flex-1">{p.label}</span>
                  <span className={`h-px transition-all ${active===i?"w-12 bg-accent":"w-6 bg-foreground/20"}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <motion.div
              initial={{opacity:0, scale:0.97}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:1.2,ease:[0.2,0.7,0.2,1]}}
              className="relative aspect-[4/3] bg-paper-warm overflow-hidden border border-foreground/10 editorial-shadow"
            >
              <img src={masterplan} alt="Masterplan Lago di Garda" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1600} height={1200} />
              <div className="absolute inset-0 bg-paper/10" />
              {c.pins.map((p, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive((a) => (a === i ? null : i))}
                  className="absolute group"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
                >
                  <span className={`relative block w-3 h-3 rounded-full bg-accent ${active===i?"scale-150":""} transition-transform`}>
                    <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
                  </span>
                  <span className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] px-2 py-1 bg-ink text-paper transition-all ${active===i?"opacity-100 translate-x-0":"opacity-0 -translate-x-2 pointer-events-none"}`}>
                    {String(i+1).padStart(2,"0")} · {p.label}
                  </span>
                </button>
              ))}

              <div className="absolute bottom-4 right-4 glass-card px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Implantação preliminar
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
