import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSectionContent } from "@/hooks/useSiteContent";

export default function WhatsAppButton() {
  const { content } = useSectionContent("contact_form");
  const number = content?.whatsapp_number ?? "5547999999999";
  const message = encodeURIComponent("Olá! Gostaria de conhecer o Lago di Garda.");

  return (
    <motion.a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 sm:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-[0_12px_36px_-12px_rgba(0,0,0,0.4)] hover:bg-[#25D366] transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </motion.a>
  );
}
