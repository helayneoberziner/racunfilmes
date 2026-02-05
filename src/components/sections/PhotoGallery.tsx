 import { motion } from "framer-motion";
 import { useInView } from "framer-motion";
 import { useRef, useState } from "react";
 import { ZoomIn } from "lucide-react";
 import PhotoLightbox from "@/components/PhotoLightbox";
 
 // Placeholder photos - você pode substituir por fotos reais
 const photoItems = [
   {
     id: 1,
     title: "Ensaio Corporativo",
     src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop",
     category: "Corporativo",
   },
   {
     id: 2,
     title: "Retrato Profissional",
     src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
     category: "Retratos",
   },
   {
     id: 3,
     title: "Produto Premium",
     src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
     category: "Produtos",
   },
   {
     id: 4,
     title: "Arquitetura Comercial",
     src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
     category: "Arquitetura",
   },
   {
     id: 5,
     title: "Evento Empresarial",
     src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
     category: "Eventos",
   },
   {
     id: 6,
     title: "Branding Session",
     src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
     category: "Branding",
   },
 ];
 
 const PhotoGallery = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
 
   const handlePhotoClick = (index: number) => {
     setSelectedIndex(index);
   };
 
   const handleNavigate = (direction: "prev" | "next") => {
     if (selectedIndex === null) return;
     if (direction === "prev") {
       setSelectedIndex(selectedIndex === 0 ? photoItems.length - 1 : selectedIndex - 1);
     } else {
       setSelectedIndex(selectedIndex === photoItems.length - 1 ? 0 : selectedIndex + 1);
     }
   };
 
   const closeLightbox = () => {
     setSelectedIndex(null);
   };
 
   return (
     <>
       <div ref={ref} className="mt-16">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="text-center mb-10"
         >
           <span className="text-primary font-semibold text-sm uppercase tracking-wider">
             Fotografia
           </span>
           <h3 className="text-2xl sm:text-3xl font-bold mt-2">
             Imagens que <span className="text-gradient">contam histórias</span>
           </h3>
         </motion.div>
 
         {/* Masonry-style Photo Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           {photoItems.map((photo, index) => (
             <motion.div
               key={photo.id}
               initial={{ opacity: 0, y: 20 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5, delay: 0.1 * index }}
               className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                 index === 0 || index === 5 ? "row-span-2" : ""
               }`}
               onClick={() => handlePhotoClick(index)}
             >
               <div className={`w-full ${index === 0 || index === 5 ? "h-[400px] md:h-[500px]" : "h-[200px] md:h-[240px]"}`}>
                 <img
                   src={photo.src}
                   alt={photo.title}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
               </div>
               
               {/* Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               
               {/* Content */}
               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center glow-primary mb-2 transform group-hover:scale-110 transition-transform duration-300">
                   <ZoomIn className="w-5 h-5 text-primary-foreground" />
                 </div>
                 <h4 className="text-sm font-bold text-center px-2">{photo.title}</h4>
                 <span className="text-xs text-primary">{photo.category}</span>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
 
       {/* Photo Lightbox */}
       <PhotoLightbox
         isOpen={selectedIndex !== null}
         onClose={closeLightbox}
         images={photoItems}
         currentIndex={selectedIndex ?? 0}
         onNavigate={handleNavigate}
       />
     </>
   );
 };
 
 export default PhotoGallery;