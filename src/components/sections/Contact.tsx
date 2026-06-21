import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSectionContent } from "@/hooks/useSiteContent";
import { EditableText } from "@/components/EditableText";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  email: z.string().trim().email("E-mail inválido").max(255),
  interest: z.string().trim().min(1, "Selecione um interesse").max(100),
});
type Data = z.infer<typeof schema>;

const INTERESTS = ["Conhecer o empreendimento", "Disponibilidade de lotes", "Condições e financiamento", "Visita presencial"];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { content } = useSectionContent("contact_form");
  const c = {
    eyebrow: content?.eyebrow ?? "Agendar visita",
    title:   content?.title   ?? "Comece o próximo capítulo",
    title2:  content?.title2  ?? "com uma conversa.",
    text:    content?.text    ?? "Em até 24h um consultor especializado entra em contato. Atendimento humano, sem pressão e sem scripts.",
    whatsapp_number: content?.whatsapp_number ?? "5547999999999",
  };

  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({ name: "", phone: "", email: "", interest: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const setField = (k: keyof Data, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext = () => {
    if (step === 0) return data.name.trim().length >= 2;
    if (step === 1) return data.phone.trim().length >= 8 && /\S+@\S+\.\S+/.test(data.email);
    if (step === 2) return data.interest.trim().length > 0;
    return false;
  };

  const submit = async () => {
    try {
      const parsed = schema.parse(data);
      setSending(true);
      const { error } = await supabase.from("leads").insert({
        name: parsed.name,
        email: parsed.email,
        whatsapp: parsed.phone,
        project_type: parsed.interest,
        objective: parsed.interest,
        message: `Interesse: ${parsed.interest}`,
      });
      if (error) throw error;

      supabase.functions.invoke("send-lead-notification", {
        body: {
          name: parsed.name, email: parsed.email, whatsapp: parsed.phone,
          projectType: parsed.interest, objective: parsed.interest,
        },
      }).catch(() => {});

      setDone(true);
      toast.success("Recebemos sua solicitação", { description: "Em breve nossa equipe entrará em contato." });

      const msg = encodeURIComponent(`Olá! Sou ${parsed.name} e tenho interesse em "${parsed.interest}" no Lago di Garda.`);
      setTimeout(() => window.open(`https://wa.me/${c.whatsapp_number}?text=${msg}`, "_blank"), 1500);
    } catch (e) {
      if (e instanceof z.ZodError) toast.error(e.errors[0].message);
      else toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="bg-paper">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1}} className="mb-8">
              <EditableText sectionKey="contact_form" fieldKey="eyebrow" value={c.eyebrow} as="span" className="eyebrow" />
            </motion.div>
            <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1.1,delay:0.1}}
              className="display text-ink text-[36px] md:text-[52px] lg:text-[60px] text-balance leading-[0.98]">
              <EditableText sectionKey="contact_form" fieldKey="title" value={c.title} as="span" /><br />
              <EditableText sectionKey="contact_form" fieldKey="title2" value={c.title2} as="span" className="italic gold-text" />
            </motion.h2>
            <p className="mt-8 text-foreground/70 font-light leading-relaxed max-w-md text-pretty">
              <EditableText sectionKey="contact_form" fieldKey="text" value={c.text} as="span" multiline />
            </p>

            <div className="mt-12 space-y-5 text-sm text-foreground/70 font-light">
              <div className="flex items-start gap-4"><span className="num-marker text-accent text-xs mt-1">01</span><span>Conversa inicial sem compromisso para entender seu momento.</span></div>
              <div className="flex items-start gap-4"><span className="num-marker text-accent text-xs mt-1">02</span><span>Apresentação do masterplan, infraestrutura e condições atuais.</span></div>
              <div className="flex items-start gap-4"><span className="num-marker text-accent text-xs mt-1">03</span><span>Visita guiada ao terreno e ao entorno do empreendimento.</span></div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-foreground/10 bg-card editorial-shadow p-8 md:p-12 lg:p-14">
              {done ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-ink">Solicitação recebida.</h3>
                  <p className="mt-3 text-foreground/65 font-light">Estamos preparando seu atendimento. Redirecionando para o WhatsApp…</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-10">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      Etapa {step + 1} <span className="text-foreground/30">/ 03</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[0,1,2].map((n) => (
                        <span key={n} className={`h-px w-10 transition-colors ${n <= step ? "bg-accent" : "bg-foreground/15"}`} />
                      ))}
                    </div>
                  </div>

                  {step === 0 && (
                    <div className="space-y-3">
                      <label className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Como devemos te chamar?</label>
                      <input
                        autoFocus
                        value={data.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="Seu nome completo"
                        className="w-full bg-transparent border-b border-foreground/25 focus:border-accent focus:outline-none py-4 text-xl md:text-2xl font-display font-light text-ink placeholder:text-foreground/30"
                      />
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Telefone com WhatsApp</label>
                        <input
                          autoFocus
                          value={data.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          placeholder="(47) 99999-9999"
                          className="w-full bg-transparent border-b border-foreground/25 focus:border-accent focus:outline-none py-4 text-xl font-display font-light text-ink placeholder:text-foreground/30"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">E-mail</label>
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => setField("email", e.target.value)}
                          placeholder="voce@email.com"
                          className="w-full bg-transparent border-b border-foreground/25 focus:border-accent focus:outline-none py-4 text-xl font-display font-light text-ink placeholder:text-foreground/30"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <label className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Qual seu principal interesse?</label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {INTERESTS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setField("interest", opt)}
                            className={`text-left p-4 md:p-5 border transition-all ${
                              data.interest === opt
                                ? "border-accent bg-accent/5 text-ink"
                                : "border-foreground/15 hover:border-accent/60 text-foreground/75"
                            }`}
                          >
                            <span className="font-light">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-12 flex items-center justify-between gap-4">
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground disabled:opacity-30 hover:text-ink transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                    </button>

                    {step < 2 ? (
                      <button
                        onClick={() => canNext() && setStep((s) => s + 1)}
                        disabled={!canNext()}
                        className="group inline-flex items-center gap-4 px-8 py-4 bg-ink text-paper text-[11px] uppercase tracking-[0.28em] font-medium disabled:opacity-40 hover:bg-accent hover:text-ink transition-colors"
                      >
                        Continuar
                        <span className="h-px w-6 bg-paper/60 group-hover:bg-ink/60 group-hover:w-10 transition-all" />
                      </button>
                    ) : (
                      <button
                        onClick={submit}
                        disabled={!canNext() || sending}
                        className="group inline-flex items-center gap-4 px-8 py-4 bg-accent text-ink text-[11px] uppercase tracking-[0.28em] font-medium disabled:opacity-40 hover:bg-ink hover:text-paper transition-colors"
                      >
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Finalizar <ArrowRight className="w-3.5 h-3.5" /></>}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
