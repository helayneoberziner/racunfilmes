import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeam";

const fallbackTeam = [
  {
    id: "1",
    name: "[Nome 1]",
    role: "Fundador & Diretor Criativo",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "[Sua bio aqui - experiência, visão e paixão pelo audiovisual]",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/in/",
  },
  {
    id: "2",
    name: "[Nome 2]",
    role: "[Cargo]",
    image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "[Bio aqui - experiência e contribuição para a equipe]",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/in/",
  },
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: dbMembers } = useTeamMembers();

  const team = dbMembers && dbMembers.length > 0 ? dbMembers : fallbackTeam;

  return (
    <section id="equipe" className="py-16 md:py-20">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Quem está por trás
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 mb-3">
            Conheça nossa <span className="text-gradient">equipe</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            As pessoas que transformam ideias em vídeos estratégicos.
          </p>
        </motion.div>

        <div className={`grid gap-6 max-w-4xl mx-auto ${team.length === 1 ? 'max-w-md' : team.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-card border-gradient rounded-xl p-5 flex flex-col items-center text-center"
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30">
                  <img
                    src={member.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
              {member.bio && (
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>
              )}

              <div className="flex items-center gap-2 mt-auto">
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
