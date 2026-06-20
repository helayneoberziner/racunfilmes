import { motion } from "framer-motion";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import morning from "@/assets/day-morning.jpg";
import night from "@/assets/day-night.jpg";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULT_IMAGES = [
  { src: g1,      caption: "Arquitetura sob medida", span: "lg:col-span-8 lg:row-span-2 aspect-[16/10]" },
  { src: g2,      caption: "Portaria com controle facial", span: "lg:col-span-4 aspect-[4/5]" },
  { src: g3,      caption: "Trilha ecológica preservada", span: "lg:col-span-4 aspect-[4/5]" },
  { src: morning, caption: "Manhãs em família", span: "lg:col-span-4 aspect-[4/5]" },
  { src: night,   caption: "Convívio ao entardecer", span: "lg:col-span-8 aspect-[16/9]" },
];

export default function Gallery() {
  const { content } = useSectionContent("gallery");
  const images = (content?.items?.length ? content.items : DEFAULT_IMAGES) as typeof DEFAULT_IMAGES;
  const c = {
    eyebrow: content?.eyebrow ?? "Galeria",
    title:   content?.title   ?? "Imagens que",
    title2:  content?.title2  ?? "antecipam o sentir.",
  };

  return (
    <section id="gallery" className="bg-paper">
      <div className="container-custom section-padding">
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="eyebrow mb-8">{c.eyebrow}</div>
          <h2 className="display text-ink text-[36px] md:text-[52px] lg:text-[64px] text-balance leading-[0.98]">
            {c.title} <span className="italic gold-text">{c.title2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: (i % 3) * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className={`relative group overflow-hidden bg-paper-warm ${img.span ?? "aspect-[4/3] lg:col-span-4"}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <figcaption className="absolute bottom-0 left-0 p-6 text-paper translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] uppercase tracking-[0.32em] text-gold/80">0{i + 1}</span>
                <p className="font-display text-lg font-light mt-1">{img.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
