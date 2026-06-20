import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import morning from "@/assets/day-morning.jpg";
import afternoon from "@/assets/day-afternoon.jpg";
import night from "@/assets/day-night.jpg";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULT_MOMENTS = [
  { time: "06h30", title: "Manhã na trilha ecológica", text: "O dia começa entre as araucárias, com o som da mata atlântica e o orvalho ainda nas folhas. Trilha homologada dentro do condomínio.", img: morning, align: "left" as const },
  { time: "10h00", title: "Crianças no playground",   text: "Áreas pensadas por faixa etária, brinquedoteca coberta e supervisão. As crianças crescem com liberdade dentro de um perímetro seguro.", img: morning, align: "right" as const },
  { time: "14h00", title: "Foco nos coworkings",       text: "Três espaços de trabalho com fibra dedicada, salas privativas e cabines acústicas. Home office sem abrir mão da família.", img: afternoon, align: "left" as const },
  { time: "17h30", title: "Beach Tennis ao entardecer",text: "Quadras profissionais sob iluminação cênica. Comunidade ativa, esporte como ritual.", img: afternoon, align: "right" as const },
  { time: "20h00", title: "Jantar no espaço gourmet",  text: "Dois espaços gourmet, três grills e adega compartilhada. A gastronomia como linguagem de convivência.", img: night, align: "left" as const },
  { time: "22h00", title: "Noite no fire place",       text: "Lareira ao ar livre, sob o céu estrelado do Vale. Onde longas conversas viram memórias.", img: night, align: "right" as const },
];

export default function UmDia() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent("um_dia");
  const moments = (content?.items?.length ? content.items : DEFAULT_MOMENTS) as typeof DEFAULT_MOMENTS;

  return (
    <section id="um-dia" ref={ref} className="bg-emerald-deep text-paper relative overflow-hidden">
      <div className="container-custom section-padding">
        <div className="max-w-3xl mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-gold/80 mb-8 font-medium"
          >
            <span className="h-px w-8 bg-gold/60" /> Um dia no Lago di Garda
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="display text-paper text-[40px] md:text-[60px] lg:text-[76px] text-balance leading-[0.95]"
          >
            Da primeira luz à<br /><span className="italic gold-text">última estrela</span>.
          </motion.h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-paper/15 -translate-x-px hidden sm:block" />

          <div className="space-y-24 md:space-y-32">
            {moments.map((m, i) => {
              const right = (m.align ?? (i % 2 === 0 ? "left" : "right")) === "right";
              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.2,0.7,0.2,1] }}
                  className={`relative grid sm:grid-cols-2 gap-10 md:gap-16 items-center ${right ? "sm:[direction:rtl]" : ""}`}
                >
                  <div className="sm:[direction:ltr] relative">
                    <div className="aspect-[4/5] overflow-hidden bg-ink/50">
                      <img
                        src={m.img || morning}
                        alt={m.title}
                        className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-[1.04]"
                        loading="lazy"
                        width={1280} height={1600}
                      />
                    </div>
                    <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 px-3 py-1 bg-gold text-ink text-[10px] uppercase tracking-[0.28em] font-medium">
                      {m.time}
                    </div>
                  </div>

                  <div className="sm:[direction:ltr] sm:px-4 md:px-8">
                    <div className="num-marker text-sm tracking-[0.3em] text-gold/80 mb-4">
                      0{i + 1} <span className="text-paper/40">/ 0{moments.length}</span>
                    </div>
                    <h3 className="font-display font-light text-3xl md:text-4xl lg:text-5xl leading-tight text-balance">
                      {m.title}
                    </h3>
                    <p className="mt-6 text-paper/70 font-light leading-relaxed text-pretty max-w-md">
                      {m.text}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
