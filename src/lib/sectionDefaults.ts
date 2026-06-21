// Espelha exatamente os textos visíveis no site público.
// Importado pelo editor (admin) E pelas seções, para nunca divergir.

export const sectionDefaults: Record<string, Record<string, any>> = {
  general: {
    logo_url: "",
  },

  hero: {
    eyebrow: "Lago di Garda — Blumenau / SC",
    title_a: "Um novo padrão",
    title_b: "de viver em",
    title_highlight: "Blumenau",
    subtitle:
      "Segurança, natureza e infraestrutura completa para construir a casa dos seus sonhos no bairro Velha.",
    cta_primary: "Agendar Visita",
    cta_secondary: "Conhecer o Empreendimento",
    media_url: "",
    media_type: "image",
  },

  gallery: {
    eyebrow: "Galeria",
    title: "Imagens que",
    title2: "antecipam o sentir.",
    items: [] as { url: string; caption?: string; span?: string }[],
  },

  lifestyle: {
    eyebrow: "Experiência de vida",
    title_a: "Não vendemos lotes.",
    title_b: "Entregamos um",
    highlight: "novo capítulo",
    title_c: "para sua família.",
    paragraph:
      "Lago di Garda nasceu para acolher famílias que entendem que viver bem é viver com tempo, segurança e propósito. Aqui, a arquitetura responde à natureza — e a natureza responde ao silêncio.",
    stat1_value: "320m²",
    stat1_label: "Área mínima dos lotes",
    stat2_value: "24h",
    stat2_label: "Segurança com controle facial",
    stat3_value: "15+",
    stat3_label: "Espaços de convivência",
  },

  um_dia: {
    items: [
      { time: "06h30", title: "Manhã na trilha ecológica", text: "O dia começa entre as araucárias, com o som da mata atlântica e o orvalho ainda nas folhas. Trilha homologada dentro do condomínio.", align: "left" },
      { time: "10h00", title: "Crianças no playground",   text: "Áreas pensadas por faixa etária, brinquedoteca coberta e supervisão. As crianças crescem com liberdade dentro de um perímetro seguro.", align: "right" },
      { time: "14h00", title: "Foco nos coworkings",       text: "Três espaços de trabalho com fibra dedicada, salas privativas e cabines acústicas. Home office sem abrir mão da família.", align: "left" },
      { time: "17h30", title: "Beach Tennis ao entardecer",text: "Quadras profissionais sob iluminação cênica. Comunidade ativa, esporte como ritual.", align: "right" },
      { time: "20h00", title: "Jantar no espaço gourmet",  text: "Dois espaços gourmet, três grills e adega compartilhada. A gastronomia como linguagem de convivência.", align: "left" },
      { time: "22h00", title: "Noite no fire place",       text: "Lareira ao ar livre, sob o céu estrelado do Vale. Onde longas conversas viram memórias.", align: "right" },
    ],
  },

  infrastructure: {
    eyebrow: "Infraestrutura",
    title: "Tudo o que sua família precisa,",
    title2: "a poucos passos de casa.",
    items: [
      { icon: "Shield",     title: "Portaria 24 horas" },
      { icon: "ScanFace",   title: "Controle facial" },
      { icon: "Volleyball", title: "Quadra Beach Tennis" },
      { icon: "Trophy",     title: "Quadra Poliesportiva" },
      { icon: "PartyPopper",title: "Salão de Festas" },
      { icon: "Flame",      title: "3 Espaços Grill" },
      { icon: "UtensilsCrossed", title: "2 Espaços Gourmet" },
      { icon: "Briefcase",  title: "3 Coworkings" },
      { icon: "ToyBrick",   title: "Playground" },
      { icon: "Baby",       title: "Brinquedoteca" },
      { icon: "Dog",        title: "Pet Place" },
      { icon: "Flame",      title: "Fire Place" },
      { icon: "Sprout",     title: "Espaço Horta" },
      { icon: "Trees",      title: "Trilha Ecológica" },
    ],
  },

  location: {
    eyebrow: "Localização privilegiada",
    title: "Rua Divinópolis, bairro Velha.",
    title2: "Onde a cidade encontra a serra.",
    text: "A poucos minutos do que importa, e ao mesmo tempo distante o suficiente para preservar o silêncio. O bairro Velha é um dos endereços mais valorizados de Blumenau — e o Lago di Garda nasce em sua margem mais nobre.",
    points: [
      { name: "Cooper Blumenau",       time: "4 min" },
      { name: "Colégio Alfa",          time: "6 min" },
      { name: "Centro de Blumenau",    time: "12 min" },
      { name: "Hospital Santa Isabel", time: "10 min" },
      { name: "Shopping Neumarkt",     time: "14 min" },
      { name: "Parque Vila Germânica", time: "16 min" },
    ],
  },

  masterplan: {
    eyebrow: "Masterplan",
    title: "Cada lote pensado",
    title2: "como uma vista.",
    text: "O traçado curvo abraça o lago central e respeita o relevo natural, garantindo privacidade e vista privilegiada para todos os lotes.",
    pins: [
      { x: "28", y: "48", label: "Lotes residenciais" },
      { x: "52", y: "62", label: "Lago central" },
      { x: "72", y: "42", label: "Clube de lazer" },
      { x: "80", y: "58", label: "Quadras esportivas" },
      { x: "48", y: "14", label: "Portaria principal" },
    ],
  },

  lotes: {
    eyebrow: "Os lotes",
    suffix: "a partir de",
    big: "320m²",
    title: "Liberdade para projetar a casa que sua família merece.",
    text: "Lotes generosos, com topografia favorável e infraestrutura urbana pronta. Você escolhe o arquiteto, o ritmo e a obra — nós garantimos o entorno.",
  },

  differentials: {
    eyebrow: "Diferenciais",
    title: "Seis razões que fazem do Lago di Garda",
    title2: "o próximo endereço da sua família.",
    items: [
      { title: "Segurança absoluta",   text: "Portaria 24h, controle facial, perímetro monitorado e ronda interna." },
      { title: "Lazer completo",        text: "15+ ambientes de convivência, esporte e gastronomia." },
      { title: "Natureza preservada",   text: "Trilha ecológica, lago central e áreas de mata atlântica nativa." },
      { title: "Valorização real",      text: "Endereço estratégico no bairro Velha, com alto potencial patrimonial." },
      { title: "Localização nobre",     text: "Conexão rápida com centro, escolas, hospitais e o vale." },
      { title: "Infraestrutura pronta", text: "Pavimentação, drenagem, iluminação e fibra entregues." },
    ],
  },

  testimonials: {
    items: [
      { quote: "Procurávamos um lugar onde nossos filhos pudessem crescer com liberdade e segurança. Encontramos no Lago di Garda exatamente isso — e mais.", author: "Família Lehnen", role: "Futuros moradores" },
      { quote: "É raro um empreendimento conseguir equilibrar natureza, infraestrutura e localização. Aqui o equilíbrio é perfeito.", author: "Arq. Rafael Vieira", role: "Parceiro técnico" },
      { quote: "O padrão construtivo, a curadoria do entorno e a clareza do projeto tornam o Lago di Garda referência em alto padrão na região.", author: "Marina Hoffmann", role: "Corretora especialista" },
    ],
  },

  faq: {
    items: [
      { q: "Qual o tamanho mínimo dos lotes?",          a: "Os lotes têm metragem a partir de 320m², com configurações que permitem grande liberdade arquitetônica." },
      { q: "Quando inicia a comercialização?",          a: "Estamos em fase de lançamento. Agende uma visita para conhecer o masterplan e as condições de pré-lançamento." },
      { q: "O condomínio aceita pets?",                 a: "Sim. Há um Pet Place dedicado e regras claras de convivência para garantir conforto a todos os moradores." },
      { q: "Existe padrão construtivo obrigatório?",    a: "Existe um caderno de orientações arquitetônicas para preservar a harmonia visual e a valorização patrimonial do empreendimento." },
      { q: "Como funciona a segurança?",                a: "Portaria 24h com controle facial, perímetro monitorado por câmeras com IA e ronda interna." },
      { q: "Quais formas de pagamento estão disponíveis?", a: "Trabalhamos com condições diretas com a incorporadora, financiamento bancário e planos personalizados." },
    ],
  },

  contact_form: {
    eyebrow: "Agendar visita",
    title: "Comece o próximo capítulo",
    title2: "com uma conversa.",
    text: "Em até 24h um consultor especializado entra em contato. Atendimento humano, sem pressão e sem scripts.",
    whatsapp_number: "5547999999999",
  },

  final_cta: {
    title: "Seu próximo capítulo",
    title2: "começa aqui.",
    cta: "Agendar Visita",
  },

  footer: {
    address: "Rua Divinópolis — Bairro Velha — Blumenau / SC",
    phone: "(47) 99999-9999",
    email: "contato@lagodigarda.com.br",
    instagram: "https://instagram.com/lagodigarda",
  },
};

export function getDefaults(key: string): Record<string, any> {
  return sectionDefaults[key] ?? {};
}
