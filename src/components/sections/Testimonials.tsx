import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    company: "Construtora Premium",
    content: "O vídeo institucional elevou nossa imagem e gerou resultados reais.",
    rating: 5,
  },
  {
    name: "Marina Santos",
    company: "Restaurante Sabor & Arte",
    content: "Aumentamos em 300% o engajamento após a primeira campanha.",
    rating: 5,
  },
  {
    name: "Roberto Lima",
    company: "Tech Solutions",
    content: "Profissionalismo do início ao fim. Entrega além das expectativas.",
    rating: 5,
  },
];

const clientLogos = [
  "Construtora Premium",
  "Tech Solutions",
  "Sabor & Arte",
  "Imobiliária Vale",
  "Grupo Empresarial SC",
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            O que <span className="text-gradient">clientes dizem</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative p-6 rounded-xl border-gradient bg-card"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-3" />
              
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" />
                ))}
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Empresas que confiam em nós</p>
          <div className="flex flex-wrap justify-center gap-6">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="px-5 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
