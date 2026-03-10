import { AdminLayout } from '@/components/admin/AdminLayout';
import { useSiteContent } from '@/hooks/useSiteContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Save, Loader2, Plus, Trash2, Upload, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SectionEditorProps {
  label: string;
  sectionKey: string;
  fields: FieldConfig[];
  content: Record<string, any> | null;
  onSave: (sectionKey: string, content: Record<string, any>) => void;
  isSaving: boolean;
}

interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea';
  placeholder?: string;
}

function SectionEditor({ label, sectionKey, fields, content, onSave, isSaving }: SectionEditorProps) {
  const [local, setLocal] = useState<Record<string, any>>(content ?? {});

  useEffect(() => {
    if (content) setLocal(content);
  }, [content]);

  const handleChange = (key: string, value: string) => {
    setLocal(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AccordionItem value={sectionKey} className="border-gradient rounded-lg bg-card overflow-hidden">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <span className="font-semibold text-lg">{label}</span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-4">
          {fields.map(field => (
            <div key={field.key}>
              <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <Textarea
                  value={local[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-background border-border"
                  rows={3}
                />
              ) : (
                <Input
                  value={local[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-background border-border"
                />
              )}
            </div>
          ))}
          <Button
            onClick={() => onSave(sectionKey, local)}
            disabled={isSaving}
            className="mt-2"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Salvar {label}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

interface ListEditorProps {
  label: string;
  sectionKey: string;
  headerFields: FieldConfig[];
  itemFields: FieldConfig[];
  itemsKey: string;
  content: Record<string, any> | null;
  onSave: (sectionKey: string, content: Record<string, any>) => void;
  isSaving: boolean;
}

function ListSectionEditor({ label, sectionKey, headerFields, itemFields, itemsKey, content, onSave, isSaving }: ListEditorProps) {
  const [local, setLocal] = useState<Record<string, any>>(content ?? {});

  useEffect(() => {
    if (content) setLocal(content);
  }, [content]);

  const handleChange = (key: string, value: string) => {
    setLocal(prev => ({ ...prev, [key]: value }));
  };

  const items: any[] = local[itemsKey] ?? [];

  const handleItemChange = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setLocal(prev => ({ ...prev, [itemsKey]: newItems }));
  };

  const addItem = () => {
    const emptyItem: Record<string, string> = {};
    itemFields.forEach(f => { emptyItem[f.key] = ''; });
    setLocal(prev => ({ ...prev, [itemsKey]: [...items, emptyItem] }));
  };

  const removeItem = (index: number) => {
    setLocal(prev => ({ ...prev, [itemsKey]: items.filter((_, i) => i !== index) }));
  };

  return (
    <AccordionItem value={sectionKey} className="border-gradient rounded-lg bg-card overflow-hidden">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <span className="font-semibold text-lg">{label}</span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-4">
          {/* Header fields */}
          {headerFields.map(field => (
            <div key={field.key}>
              <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <Textarea
                  value={local[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-background border-border"
                  rows={2}
                />
              ) : (
                <Input
                  value={local[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-background border-border"
                />
              )}
            </div>
          ))}

          {/* Items list */}
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">Itens</label>
              <Button variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </div>
            {items.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-background space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Item {index + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeItem(index)} className="text-destructive h-7 px-2">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                {itemFields.map(field => (
                  <div key={field.key}>
                    <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        value={item[field.key] ?? ''}
                        onChange={e => handleItemChange(index, field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="bg-card border-border text-sm"
                        rows={2}
                      />
                    ) : (
                      <Input
                        value={item[field.key] ?? ''}
                        onChange={e => handleItemChange(index, field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="bg-card border-border text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <Button
            onClick={() => onSave(sectionKey, local)}
            disabled={isSaving}
            className="mt-2"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Salvar {label}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function LogoUploadSection({ content, onSave, isSaving }: { content: Record<string, any> | null; onSave: (key: string, content: Record<string, any>) => void; isSaving: boolean }) {
  const [logoUrl, setLogoUrl] = useState(content?.logo_url ?? '');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (content?.logo_url) setLogoUrl(content.logo_url);
  }, [content]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `logo.${ext}`;

    // Remove old file if exists
    await supabase.storage.from('site-assets').remove([path]);

    const { error } = await supabase.storage.from('site-assets').upload(path, file, { upsert: true });
    if (error) {
      setUploading(false);
      return;
    }
    const { data: publicData } = supabase.storage.from('site-assets').getPublicUrl(path);
    const url = publicData.publicUrl + '?t=' + Date.now();
    setLogoUrl(url);
    onSave('general', { ...content, logo_url: url });
    setUploading(false);
  };

  const handleRemove = () => {
    setLogoUrl('');
    onSave('general', { ...content, logo_url: '' });
  };

  return (
    <AccordionItem value="general" className="border-gradient rounded-lg bg-card overflow-hidden">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <span className="font-semibold text-lg">Configurações Gerais</span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-4">
          <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Logo do Site</label>
          {logoUrl ? (
            <div className="flex items-center gap-4">
              <div className="h-14 bg-background rounded-lg p-2 border border-border flex items-center">
                <img src={logoUrl} alt="Logo" className="h-full w-auto object-contain" />
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemove} className="text-destructive">
                <X className="h-4 w-4 mr-1" /> Remover
              </Button>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
            >
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
              ) : (
                <>
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Clique para enviar a logo</p>
                </>
              )}
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function Content() {
  const { sections, isLoading, getSection, updateSection } = useSiteContent();
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const handleSave = async (sectionKey: string, content: Record<string, any>) => {
    setSavingKey(sectionKey);
    await updateSection.mutateAsync({ sectionKey, content });
    setSavingKey(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Conteúdo do Site</h1>
          <p className="text-muted-foreground">
            Edite os textos exibidos em cada seção do site
          </p>
        </div>

        <Accordion type="multiple" className="space-y-3">
          {/* Logo / Configurações Gerais */}
          <LogoUploadSection
            content={getSection('general')}
            onSave={handleSave}
            isSaving={savingKey === 'general'}
          />

          {/* Hero */}
          <SectionEditor
            label="Hero (Banner Principal)"
            sectionKey="hero"
            content={getSection('hero')}
            onSave={handleSave}
            isSaving={savingKey === 'hero'}
            fields={[
              { key: 'badge', label: 'Badge (etiqueta)', type: 'text', placeholder: 'Produtora Audiovisual' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'Vídeos que' },
              { key: 'title_highlight1', label: 'Título (destaque 1)', type: 'text', placeholder: 'vendem' },
              { key: 'title_connector', label: 'Título (conector)', type: 'text', placeholder: 'e' },
              { key: 'title_highlight2', label: 'Título (destaque 2)', type: 'text', placeholder: 'posicionam' },
              { key: 'subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Descrição do banner' },
              { key: 'whatsapp_number', label: 'WhatsApp (número)', type: 'text', placeholder: '5547999999999' },
              { key: 'whatsapp_message', label: 'Mensagem WhatsApp', type: 'text', placeholder: 'Olá! Gostaria de...' },
            ]}
          />

          {/* Strategy */}
          <SectionEditor
            label="Declaração Estratégica"
            sectionKey="strategy"
            content={getSection('strategy')}
            onSave={handleSave}
            isSaving={savingKey === 'strategy'}
            fields={[
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'Vídeos com' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'estratégia' },
              { key: 'title_suffix', label: 'Título (sufixo)', type: 'text', placeholder: ', não apenas estética' },
              { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
            ]}
          />

          {/* About */}
          <SectionEditor
            label="Quem Somos"
            sectionKey="about"
            content={getSection('about')}
            onSave={handleSave}
            isSaving={savingKey === 'about'}
            fields={[
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Quem Somos' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'Muito mais que' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'vídeo bonito' },
              { key: 'description1', label: 'Descrição (parágrafo 1)', type: 'textarea' },
              { key: 'description2', label: 'Descrição (parágrafo 2)', type: 'textarea' },
              { key: 'card_subtitle', label: 'Subtítulo do card', type: 'text', placeholder: 'Transformando marcas...' },
              { key: 'stat1_value', label: 'Estatística 1 - Valor', type: 'text', placeholder: '50+' },
              { key: 'stat1_label', label: 'Estatística 1 - Label', type: 'text', placeholder: 'Projetos' },
              { key: 'stat2_value', label: 'Estatística 2 - Valor', type: 'text', placeholder: '30+' },
              { key: 'stat2_label', label: 'Estatística 2 - Label', type: 'text', placeholder: 'Clientes' },
              { key: 'stat3_value', label: 'Estatística 3 - Valor', type: 'text', placeholder: '5+' },
              { key: 'stat3_label', label: 'Estatística 3 - Label', type: 'text', placeholder: 'Anos' },
            ]}
          />

          {/* Segments */}
          <ListSectionEditor
            label="Segmentos"
            sectionKey="segments"
            content={getSection('segments')}
            onSave={handleSave}
            isSaving={savingKey === 'segments'}
            itemsKey="items"
            headerFields={[
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Segmentos' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'Mercados que' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'atendemos' },
              { key: 'subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Experiência em diferentes segmentos...' },
            ]}
            itemFields={[
              { key: 'title', label: 'Título', type: 'text', placeholder: 'Nome do segmento' },
              { key: 'description', label: 'Descrição', type: 'text', placeholder: 'Descrição curta' },
            ]}
          />

          {/* Objectives */}
          <ListSectionEditor
            label="Objetivos"
            sectionKey="objectives"
            content={getSection('objectives')}
            onSave={handleSave}
            isSaving={savingKey === 'objectives'}
            itemsKey="items"
            headerFields={[
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Propósito' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'O vídeo certo para o' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'objetivo certo' },
              { key: 'subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Trabalhamos com estratégia...' },
            ]}
            itemFields={[
              { key: 'label', label: 'Texto', type: 'text', placeholder: 'Ex: Vender mais' },
            ]}
          />

          {/* Process */}
          <ListSectionEditor
            label="Processo"
            sectionKey="process"
            content={getSection('process')}
            onSave={handleSave}
            isSaving={savingKey === 'process'}
            itemsKey="items"
            headerFields={[
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Processo' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'Como' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'trabalhamos' },
              { key: 'subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Um processo estruturado...' },
            ]}
            itemFields={[
              { key: 'title', label: 'Título', type: 'text', placeholder: 'Ex: Briefing' },
            ]}
          />

          {/* Services */}
          <ListSectionEditor
            label="Serviços"
            sectionKey="services"
            content={getSection('services')}
            onSave={handleSave}
            isSaving={savingKey === 'services'}
            itemsKey="items"
            headerFields={[
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Serviços' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'O que' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'fazemos' },
              { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
            ]}
            itemFields={[
              { key: 'title', label: 'Título', type: 'text', placeholder: 'Nome do serviço' },
              { key: 'description', label: 'Descrição', type: 'textarea', placeholder: 'Descrição do serviço' },
            ]}
          />

          {/* FAQ */}
          <ListSectionEditor
            label="Perguntas Frequentes (FAQ)"
            sectionKey="faq"
            content={getSection('faq')}
            onSave={handleSave}
            isSaving={savingKey === 'faq'}
            itemsKey="items"
            headerFields={[
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'FAQ' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'Perguntas' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'frequentes' },
            ]}
            itemFields={[
              { key: 'question', label: 'Pergunta', type: 'text', placeholder: 'Pergunta frequente' },
              { key: 'answer', label: 'Resposta', type: 'textarea', placeholder: 'Resposta...' },
            ]}
          />

          {/* Contact */}
          <SectionEditor
            label="Contato"
            sectionKey="contact"
            content={getSection('contact')}
            onSave={handleSave}
            isSaving={savingKey === 'contact'}
            fields={[
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Orçamento' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'Vamos' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'conversar' },
              { key: 'title_suffix', label: 'Título (sufixo)', type: 'text', placeholder: '?' },
              { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
              { key: 'whatsapp_number', label: 'WhatsApp (número)', type: 'text', placeholder: '5547999999999' },
              { key: 'area_title', label: 'Título área de atuação', type: 'text', placeholder: 'Área de Atuação' },
              { key: 'area_description', label: 'Descrição área de atuação', type: 'textarea', placeholder: 'Blumenau, Vale do Itajaí...' },
            ]}
          />

          {/* Testimonials */}
          <ListSectionEditor
            label="Depoimentos"
            sectionKey="testimonials"
            content={getSection('testimonials')}
            onSave={handleSave}
            isSaving={savingKey === 'testimonials'}
            itemsKey="items"
            headerFields={[
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Depoimentos' },
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'O que' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'clientes dizem' },
              { key: 'logos_label', label: 'Texto acima dos logos', type: 'text', placeholder: 'Empresas que confiam em nós' },
            ]}
            itemFields={[
              { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome do cliente' },
              { key: 'company', label: 'Empresa', type: 'text', placeholder: 'Nome da empresa' },
              { key: 'content', label: 'Depoimento', type: 'textarea', placeholder: 'Texto do depoimento...' },
              { key: 'rating', label: 'Nota (1-5)', type: 'text', placeholder: '5' },
            ]}
          />

          {/* CTA */}
          <SectionEditor
            label="CTA (Chamada Final)"
            sectionKey="cta"
            content={getSection('cta')}
            onSave={handleSave}
            isSaving={savingKey === 'cta'}
            fields={[
              { key: 'title_prefix', label: 'Título (prefixo)', type: 'text', placeholder: 'Pronto para' },
              { key: 'title_highlight', label: 'Título (destaque)', type: 'text', placeholder: 'transformar sua marca' },
              { key: 'title_suffix', label: 'Título (sufixo)', type: 'text', placeholder: '?' },
              { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
              { key: 'whatsapp_number', label: 'WhatsApp (número)', type: 'text', placeholder: '5547999999999' },
              { key: 'whatsapp_message', label: 'Mensagem WhatsApp', type: 'text', placeholder: 'Olá! Quero...' },
            ]}
          />
        </Accordion>
      </div>
    </AdminLayout>
  );
}
