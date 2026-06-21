import { motion } from "framer-motion";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import morning from "@/assets/day-morning.jpg";
import night from "@/assets/day-night.jpg";
import { useSectionContent } from "@/hooks/useSiteContent";
import { EditableText } from "@/components/EditableText";

const FALLBACK = [
  { url: g1,      caption: "Arquitetura sob medida",         span: "lg:col-span-8 lg:row-span-2 aspect-[16/10]" },
  { url: g2,      caption: "Portaria com controle facial",   span: "lg:col-span-4 aspect-[4/5]" },
  { url: g3,      caption: "Trilha ecológica preservada",    span: "lg:col-span-4 aspect-[4/5]" },
  { url: morning, caption: "Manhãs em família",              span: "lg:col-span-4 aspect-[4/5]" },
  { url: night,   caption: "Convívio ao entardecer",         span: "lg:col-span-8 aspect-[16/9]" },
];

export default function Gallery() {
  const { content } = useSectionContent("gallery");
  const items = (content?.items?.length ? content.items : FALLBACK) as typeof FALLBACK;
  const c = {
    eyebrow: content?.eyebrow ?? "Galeria",
    title:   content?.title   ?? "Imagens que",
    title2:  content?.title2  ?? "antecipam o sentir.",
  };

  return (
    <section id="gallery" className="bg-paper">
      <div className="container-custom section-padding">
        <div className="max-w-3xl mb-16 md:mb-20">
          <EditableText sectionKey="gallery" fieldKey="eyebrow" value={c.eyebrow} as="div" className="eyebrow mb-8" />
          <h2 className="display text-ink text-[36px] md:text-[52px] lg:text-[64px] text-balance leading-[0.98]">
            <EditableText sectionKey="gallery" fieldKey="title" value={c.title} as="span" />{" "}
            <EditableText sectionKey="gallery" fieldKey="title2" value={c.title2} as="span" className="italic gold-text" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {items.map((img, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: (i % 3) * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className={`relative group overflow-hidden bg-paper-warm ${img.span ?? "aspect-[4/3] lg:col-span-4"}`}
            >
              <img
                src={img.url}
                alt={img.caption ?? ""}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {img.caption && (
                <figcaption className="absolute bottom-0 left-0 p-6 text-paper translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <span className="text-[10px] uppercase tracking-[0.32em] text-gold/80">0{i + 1}</span>
                  <p className="font-display text-lg font-light mt-1">{img.caption}</p>
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
