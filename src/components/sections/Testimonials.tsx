import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULT_ITEMS = [
  { quote: "Procurávamos um lugar onde nossos filhos pudessem crescer com liberdade e segurança. Encontramos no Lago di Garda exatamente isso — e mais.", author: "Família Lehnen", role: "Futuros moradores" },
  { quote: "É raro um empreendimento conseguir equilibrar natureza, infraestrutura e localização. Aqui o equilíbrio é perfeito.", author: "Arq. Rafael Vieira", role: "Parceiro técnico" },
  { quote: "O padrão construtivo, a curadoria do entorno e a clareza do projeto tornam o Lago di Garda referência em alto padrão na região.", author: "Marina Hoffmann", role: "Corretora especialista" },
];

export default function Testimonials() {
  const { content } = useSectionContent("testimonials");
  const items = (content?.items?.length ? content.items : DEFAULT_ITEMS) as typeof DEFAULT_ITEMS;
  const [i, setI] = useState(0);
  const item = items[i] ?? items[0];

  return (
    <section className="bg-emerald-deep text-paper">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold/80 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" /> Depoimentos
            </div>
          </div>
          <div className="lg:col-span-9">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display font-extralight text-[28px] md:text-[44px] lg:text-[52px] leading-[1.15] text-balance"
            >
              <span className="text-gold/60 mr-3">“</span>
              {item.quote}
              <span className="text-gold/60 ml-2">”</span>
            </motion.blockquote>

            <div className="mt-12 flex items-center justify-between">
              <div>
                <div className="font-display text-lg font-light">{item.author}</div>
                <div className="text-sm text-paper/60 font-light">{item.role}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="num-marker text-sm text-paper/60">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setI((p) => (p - 1 + items.length) % items.length)}
                  className="w-11 h-11 border border-paper/25 hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
                  aria-label="Anterior"
                ><ChevronLeft className="w-4 h-4" /></button>
                <button
                  onClick={() => setI((p) => (p + 1) % items.length)}
                  className="w-11 h-11 border border-paper/25 hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
                  aria-label="Próximo"
                ><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
