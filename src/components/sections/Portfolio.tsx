import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Todos", "Institucionais", "Comerciais", "Imobiliário", "Redes Sociais", "Eventos"];

const portfolioItems = [
  {
    id: 1,
    title: "Vídeo Institucional Premium",
    category: "Institucionais",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Campanha Publicitária",
    category: "Comerciais",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Tour Empreendimento",
    category: "Imobiliário",
    thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Conteúdo Social",
    category: "Redes Sociais",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Cobertura de Evento",
    category: "Eventos",
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Filme Comercial",
    category: "Comerciais",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  },
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredItems = activeCategory === "Todos" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const whatsappNumber = "5547999999999";
  const message = encodeURIComponent("Olá! Vi o portfólio e gostaria de saber mais sobre os serviços.");

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-gradient-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Portfólio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Nossos <span className="text-gradient">melhores trabalhos</span>
          </h2>
          <p className="text-muted-foreground">
            Projetos selecionados que demonstram nosso padrão de qualidade.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-primary text-primary-foreground glow-primary"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center glow-primary mb-3">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                </div>
                <h4 className="text-base font-bold">{item.title}</h4>
                <span className="text-sm text-primary">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA após portfólio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Gostou do que viu?</p>
          <Button variant="whatsapp" size="lg" asChild>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Falar sobre seu projeto
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
