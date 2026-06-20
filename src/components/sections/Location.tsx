import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULT_POINTS = [
  { name: "Cooper Blumenau",    time: "4 min" },
  { name: "Colégio Alfa",       time: "6 min" },
  { name: "Centro de Blumenau", time: "12 min" },
  { name: "Hospital Santa Isabel", time: "10 min" },
  { name: "Shopping Neumarkt",  time: "14 min" },
  { name: "Parque Vila Germânica", time: "16 min" },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent("location");
  const c = {
    eyebrow: content?.eyebrow ?? "Localização privilegiada",
    title:   content?.title   ?? "Rua Divinópolis, bairro Velha.",
    title2:  content?.title2  ?? "Onde a cidade encontra a serra.",
    text:    content?.text    ?? "A poucos minutos do que importa, e ao mesmo tempo distante o suficiente para preservar o silêncio. O bairro Velha é um dos endereços mais valorizados de Blumenau — e o Lago di Garda nasce em sua margem mais nobre.",
    points:  (content?.points ?? DEFAULT_POINTS) as typeof DEFAULT_POINTS,
  };

  const mapUrl = "https://maps.google.com/maps?q=Rua+Divin%C3%B3polis+Velha+Blumenau&z=14&output=embed";

  return (
    <section id="location" ref={ref} className="bg-paper">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1}}
              className="eyebrow mb-8">{c.eyebrow}</motion.div>
            <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1.1,delay:0.1}}
              className="display text-ink text-[36px] md:text-[52px] lg:text-[60px] text-balance">
              {c.title}<br /><span className="italic gold-text">{c.title2}</span>
            </motion.h2>
            <motion.p initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1,delay:0.2}}
              className="mt-8 text-foreground/70 font-light leading-relaxed text-pretty max-w-md">{c.text}</motion.p>

            <div className="mt-12">
              <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-5">Distâncias estimadas</div>
              <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
                {c.points.map((p, i) => (
                  <motion.li key={i}
                    initial={{opacity:0,x:-12}} animate={inView?{opacity:1,x:0}:{}}
                    transition={{duration:0.6, delay: 0.35 + i*0.06}}
                    className="flex items-center justify-between py-4 group">
                    <span className="font-light text-ink">{p.name}</span>
                    <span className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-accent transition-colors">
                      <span className="h-px w-8 bg-foreground/20 group-hover:bg-accent transition-colors" />
                      {p.time}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1.1,delay:0.2}}
              className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden border border-foreground/10 editorial-shadow bg-emerald-deep"
            >
              <iframe
                src={mapUrl}
                className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-[0.95]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Lago di Garda"
              />
              <div className="absolute top-6 left-6 glass-dark text-paper px-5 py-4">
                <div className="text-[10px] uppercase tracking-[0.32em] text-gold/80 mb-1">Endereço</div>
                <div className="font-display text-lg font-light">Rua Divinópolis</div>
                <div className="text-sm text-paper/70 font-light">Bairro Velha · Blumenau / SC</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
