 import { motion, AnimatePresence } from "framer-motion";
 import { X, ChevronLeft, ChevronRight } from "lucide-react";
 import { useEffect, useCallback } from "react";
 
interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { id: string | number; src: string; title: string }[];
  currentIndex: number;
  onNavigate: (direction: "prev" | "next") => void;
}
 
 const PhotoLightbox = ({ isOpen, onClose, images, currentIndex, onNavigate }: PhotoLightboxProps) => {
   const currentImage = images[currentIndex];
 
   const handleKeyDown = useCallback((e: KeyboardEvent) => {
     if (e.key === "Escape") onClose();
     if (e.key === "ArrowLeft") onNavigate("prev");
     if (e.key === "ArrowRight") onNavigate("next");
   }, [onClose, onNavigate]);
 
   useEffect(() => {
     if (isOpen) {
       document.addEventListener("keydown", handleKeyDown);
       document.body.style.overflow = "hidden";
     }
     return () => {
       document.removeEventListener("keydown", handleKeyDown);
       document.body.style.overflow = "unset";
     };
   }, [isOpen, handleKeyDown]);
 
   if (!currentImage) return null;
 
   return (
     <AnimatePresence>
       {isOpen && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
           onClick={onClose}
         >
           {/* Close button */}
           <button
             onClick={onClose}
             className="absolute top-4 right-4 z-50 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
           >
             <X className="w-6 h-6" />
           </button>
 
           {/* Navigation - Previous */}
           {images.length > 1 && (
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 onNavigate("prev");
               }}
               className="absolute left-4 z-50 p-3 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
             >
               <ChevronLeft className="w-6 h-6" />
             </button>
           )}
 
           {/* Image */}
           <motion.div
             key={currentIndex}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             transition={{ duration: 0.2 }}
             className="relative max-w-[90vw] max-h-[85vh]"
             onClick={(e) => e.stopPropagation()}
           >
             <img
               src={currentImage.src}
               alt={currentImage.title}
               className="max-w-full max-h-[85vh] object-contain rounded-lg"
             />
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent rounded-b-lg">
               <p className="text-center font-medium">{currentImage.title}</p>
               <p className="text-center text-sm text-muted-foreground">
                 {currentIndex + 1} / {images.length}
               </p>
             </div>
           </motion.div>
 
           {/* Navigation - Next */}
           {images.length > 1 && (
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 onNavigate("next");
               }}
               className="absolute right-4 z-50 p-3 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
             >
               <ChevronRight className="w-6 h-6" />
             </button>
           )}
         </motion.div>
       )}
     </AnimatePresence>
   );
 };
 
 export default PhotoLightbox;