import { AdminLayout } from '@/components/admin/AdminLayout';
import { useSiteContent } from '@/hooks/useSiteContent';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Save, Loader2, Plus, Trash2, Upload, X, RefreshCw, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getDefaults } from '@/lib/sectionDefaults';

interface FieldConfig { key: string; label: string; type: 'text' | 'textarea'; placeholder?: string; }

/** Merge saved content over defaults so editor always shows the text currently on the public site. */
function mergeWithDefaults(key: string, content: Record<string, any> | null): Record<string, any> {
  const def = getDefaults(key);
  if (!content) return { ...def };
  const merged: Record<string, any> = { ...def, ...content };
  // For known list keys, fall back to defaults when saved list is empty
  for (const k of ['items', 'points', 'pins', 'bullets']) {
    if (Array.isArray(def[k]) && (!Array.isArray(merged[k]) || merged[k].length === 0)) {
      merged[k] = def[k];
    }
  }
  return merged;
}

function SectionEditor({ label, sectionKey, fields, content, onSave, isSaving }:{
  label: string; sectionKey: string; fields: FieldConfig[];
  content: Record<string, any> | null;
  onSave: (k: string, v: Record<string, any>) => void; isSaving: boolean;
}) {
  const [local, setLocal] = useState<Record<string, any>>(() => mergeWithDefaults(sectionKey, content));
  useEffect(() => { setLocal(mergeWithDefaults(sectionKey, content)); }, [content, sectionKey]);

  return (
    <AccordionItem value={sectionKey} className="border border-border bg-card">
      <AccordionTrigger className="px-5 py-3 hover:no-underline">
        <span className="font-display font-light text-base text-ink">{label}</span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5">
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5 block">{f.label}</label>
              {f.type === 'textarea' ? (
                <Textarea value={local[f.key] ?? ''} onChange={(e) => setLocal((p) => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={3} />
              ) : (
                <Input value={local[f.key] ?? ''} onChange={(e) => setLocal((p) => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
              )}
            </div>
          ))}
          <Button onClick={() => onSave(sectionKey, local)} disabled={isSaving} className="mt-1 rounded-none" size="sm">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />} Salvar
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function ListSectionEditor({ label, sectionKey, headerFields, itemFields, itemsKey, content, onSave, isSaving }:{
  label: string; sectionKey: string; headerFields: FieldConfig[]; itemFields: FieldConfig[]; itemsKey: string;
  content: Record<string, any> | null;
  onSave: (k: string, v: Record<string, any>) => void; isSaving: boolean;
}) {
  const [local, setLocal] = useState<Record<string, any>>(() => mergeWithDefaults(sectionKey, content));
  useEffect(() => { setLocal(mergeWithDefaults(sectionKey, content)); }, [content, sectionKey]);
  const items: any[] = local[itemsKey] ?? [];

  const addItem = () => {
    const empty: Record<string, string> = {};
    itemFields.forEach((f) => { empty[f.key] = ''; });
    setLocal((p) => ({ ...p, [itemsKey]: [...items, empty] }));
  };
  const removeItem = (i: number) => setLocal((p) => ({ ...p, [itemsKey]: items.filter((_, idx) => idx !== i) }));
  const setItem = (i: number, k: string, v: string) => {
    const next = [...items]; next[i] = { ...next[i], [k]: v };
    setLocal((p) => ({ ...p, [itemsKey]: next }));
  };

  return (
    <AccordionItem value={sectionKey} className="border border-border bg-card">
      <AccordionTrigger className="px-5 py-3 hover:no-underline">
        <span className="font-display font-light text-base text-ink">{label}</span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5">
        <div className="space-y-3">
          {headerFields.map((f) => (
            <div key={f.key}>
              <label className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5 block">{f.label}</label>
              {f.type === 'textarea' ? (
                <Textarea value={local[f.key] ?? ''} onChange={(e) => setLocal((p) => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={2} />
              ) : (
                <Input value={local[f.key] ?? ''} onChange={(e) => setLocal((p) => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
              )}
            </div>
          ))}

          <div className="space-y-2 mt-5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">Itens</label>
              <Button variant="outline" size="sm" onClick={addItem} className="rounded-none h-7">
                <Plus className="h-3 w-3 mr-1" /> Adicionar
              </Button>
            </div>
            {items.map((item, i) => (
              <div key={i} className="p-3 border border-border bg-paper space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Item {i + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeItem(i)} className="text-destructive h-6 px-2">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                {itemFields.map((f) => (
                  <div key={f.key}>
                    <label className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1 block">{f.label}</label>
                    {f.type === 'textarea' ? (
                      <Textarea value={item[f.key] ?? ''} onChange={(e) => setItem(i, f.key, e.target.value)} placeholder={f.placeholder} rows={2} />
                    ) : (
                      <Input value={item[f.key] ?? ''} onChange={(e) => setItem(i, f.key, e.target.value)} placeholder={f.placeholder} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <Button onClick={() => onSave(sectionKey, local)} disabled={isSaving} className="mt-2 rounded-none" size="sm">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />} Salvar
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function LogoUploadSection({ content, onSave, isSaving }:{
  content: Record<string, any> | null;
  onSave: (k: string, v: Record<string, any>) => void; isSaving: boolean;
}) {
  const [logoUrl, setLogoUrl] = useState(content?.logo_url ?? '');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (content?.logo_url) setLogoUrl(content.logo_url); }, [content]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `logo.${ext}`;
    await supabase.storage.from('site-assets').remove([path]);
    const { error } = await supabase.storage.from('site-assets').upload(path, file, { upsert: true });
    if (error) { setUploading(false); return; }
    const { data: pub } = supabase.storage.from('site-assets').getPublicUrl(path);
    const url = pub.publicUrl + '?t=' + Date.now();
    setLogoUrl(url);
    onSave('general', { ...content, logo_url: url });
    setUploading(false);
  };

  const handleRemove = () => { setLogoUrl(''); onSave('general', { ...content, logo_url: '' }); };

  return (
    <AccordionItem value="general" className="border border-border bg-card">
      <AccordionTrigger className="px-5 py-3 hover:no-underline">
        <span className="font-display font-light text-base text-ink">Logotipo & Identidade</span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5">
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Logotipo do site</label>
          {logoUrl ? (
            <div className="flex items-center gap-4">
              <div className="h-14 bg-paper p-2 border border-border flex items-center">
                <img src={logoUrl} alt="Logo" className="h-full w-auto object-contain" />
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemove} className="text-destructive">
                <X className="h-4 w-4 mr-1" /> Remover
              </Button>
            </div>
          ) : (
            <div onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-accent transition-colors">
              {uploading ? <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /> : (
                <>
                  <Upload className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-light">Clique para enviar o logotipo</p>
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
  const { isLoading, getSection, updateSection } = useSiteContent();
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [previewVersion, setPreviewVersion] = useState(0);

  const handleSave = async (key: string, content: Record<string, any>) => {
    setSavingKey(key);
    await updateSection.mutateAsync({ sectionKey: key, content });
    setSavingKey(null);
    setPreviewVersion((v) => v + 1);
  };

  if (isLoading) {
    return <AdminLayout><div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="space-y-6 -mx-4 md:-mx-8">
        <div className="px-4 md:px-8">
          <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-2">Conteúdo</div>
          <h1 className="display text-3xl md:text-4xl font-light text-ink">Editor do site</h1>
          <p className="text-muted-foreground mt-2 font-light text-sm">
            Os campos abaixo já contêm os textos atualmente exibidos no site. Edite e veja a alteração no preview ao lado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 px-4 md:px-8">
          {/* EDITOR */}
          <div className="max-h-[calc(100vh-180px)] overflow-y-auto pr-2 -mr-2">
            <Accordion type="multiple" className="space-y-2">
              <LogoUploadSection content={getSection('general')} onSave={handleSave} isSaving={savingKey === 'general'} />

              <SectionEditor
                label="Hero — banner principal" sectionKey="hero"
                content={getSection('hero')} onSave={handleSave} isSaving={savingKey === 'hero'}
                fields={[
                  { key: 'eyebrow', label: 'Etiqueta (acima do título)', type: 'text' },
                  { key: 'title_a', label: 'Título — linha 1', type: 'text' },
                  { key: 'title_b', label: 'Título — linha 2 (prefixo)', type: 'text' },
                  { key: 'title_highlight', label: 'Título — palavra em destaque', type: 'text' },
                  { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
                  { key: 'cta_primary', label: 'Botão primário', type: 'text' },
                  { key: 'cta_secondary', label: 'Botão secundário', type: 'text' },
                ]}
              />

              <SectionEditor
                label="Experiência de vida" sectionKey="lifestyle"
                content={getSection('lifestyle')} onSave={handleSave} isSaving={savingKey === 'lifestyle'}
                fields={[
                  { key: 'eyebrow', label: 'Etiqueta', type: 'text' },
                  { key: 'title_a', label: 'Título — linha 1', type: 'text' },
                  { key: 'title_b', label: 'Título — linha 2 (prefixo)', type: 'text' },
                  { key: 'highlight', label: 'Palavra em destaque', type: 'text' },
                  { key: 'title_c', label: 'Título — linha 3', type: 'text' },
                  { key: 'paragraph', label: 'Parágrafo', type: 'textarea' },
                  { key: 'stat1_value', label: 'Estatística 1 — valor', type: 'text' },
                  { key: 'stat1_label', label: 'Estatística 1 — rótulo', type: 'text' },
                  { key: 'stat2_value', label: 'Estatística 2 — valor', type: 'text' },
                  { key: 'stat2_label', label: 'Estatística 2 — rótulo', type: 'text' },
                  { key: 'stat3_value', label: 'Estatística 3 — valor', type: 'text' },
                  { key: 'stat3_label', label: 'Estatística 3 — rótulo', type: 'text' },
                ]}
              />

              <ListSectionEditor
                label="Um dia no Lago di Garda" sectionKey="um_dia" itemsKey="items"
                content={getSection('um_dia')} onSave={handleSave} isSaving={savingKey === 'um_dia'}
                headerFields={[]}
                itemFields={[
                  { key: 'time',  label: 'Horário', type: 'text', placeholder: '06h30' },
                  { key: 'title', label: 'Título', type: 'text' },
                  { key: 'text',  label: 'Texto', type: 'textarea' },
                  { key: 'align', label: 'Alinhamento (left ou right)', type: 'text' },
                ]}
              />

              <ListSectionEditor
                label="Infraestrutura" sectionKey="infrastructure" itemsKey="items"
                content={getSection('infrastructure')} onSave={handleSave} isSaving={savingKey === 'infrastructure'}
                headerFields={[
                  { key: 'eyebrow', label: 'Etiqueta', type: 'text' },
                  { key: 'title', label: 'Título — linha 1', type: 'text' },
                  { key: 'title2', label: 'Título — linha 2 em destaque', type: 'text' },
                ]}
                itemFields={[
                  { key: 'icon', label: 'Ícone (Shield, ScanFace, Trophy, Volleyball, Wine, Flame, Briefcase, Baby, ToyBrick, Dog, Sprout, Trees, PartyPopper, UtensilsCrossed)', type: 'text' },
                  { key: 'title', label: 'Nome do ambiente', type: 'text' },
                ]}
              />

              <ListSectionEditor
                label="Localização" sectionKey="location" itemsKey="points"
                content={getSection('location')} onSave={handleSave} isSaving={savingKey === 'location'}
                headerFields={[
                  { key: 'eyebrow', label: 'Etiqueta', type: 'text' },
                  { key: 'title', label: 'Título — linha 1', type: 'text' },
                  { key: 'title2', label: 'Título — linha 2 em destaque', type: 'text' },
                  { key: 'text', label: 'Texto', type: 'textarea' },
                ]}
                itemFields={[
                  { key: 'name', label: 'Ponto de referência', type: 'text' },
                  { key: 'time', label: 'Tempo', type: 'text' },
                ]}
              />

              <ListSectionEditor
                label="Masterplan" sectionKey="masterplan" itemsKey="pins"
                content={getSection('masterplan')} onSave={handleSave} isSaving={savingKey === 'masterplan'}
                headerFields={[
                  { key: 'eyebrow', label: 'Etiqueta', type: 'text' },
                  { key: 'title', label: 'Título — linha 1', type: 'text' },
                  { key: 'title2', label: 'Título — linha 2 em destaque', type: 'text' },
                  { key: 'text', label: 'Texto', type: 'textarea' },
                ]}
                itemFields={[
                  { key: 'label', label: 'Nome do ponto', type: 'text' },
                  { key: 'x', label: 'Posição X (0-100)', type: 'text' },
                  { key: 'y', label: 'Posição Y (0-100)', type: 'text' },
                ]}
              />

              <SectionEditor
                label="Lotes — destaque" sectionKey="lotes"
                content={getSection('lotes')} onSave={handleSave} isSaving={savingKey === 'lotes'}
                fields={[
                  { key: 'eyebrow', label: 'Etiqueta', type: 'text' },
                  { key: 'suffix', label: 'Texto pequeno acima', type: 'text' },
                  { key: 'big', label: 'Número grande', type: 'text' },
                  { key: 'title', label: 'Título', type: 'text' },
                  { key: 'text', label: 'Texto', type: 'textarea' },
                ]}
              />

              <ListSectionEditor
                label="Diferenciais" sectionKey="differentials" itemsKey="items"
                content={getSection('differentials')} onSave={handleSave} isSaving={savingKey === 'differentials'}
                headerFields={[
                  { key: 'eyebrow', label: 'Etiqueta', type: 'text' },
                  { key: 'title', label: 'Título — linha 1', type: 'text' },
                  { key: 'title2', label: 'Título — linha 2 em destaque', type: 'text' },
                ]}
                itemFields={[
                  { key: 'title', label: 'Título', type: 'text' },
                  { key: 'text', label: 'Texto', type: 'textarea' },
                ]}
              />

              <ListSectionEditor
                label="Depoimentos" sectionKey="testimonials" itemsKey="items"
                content={getSection('testimonials')} onSave={handleSave} isSaving={savingKey === 'testimonials'}
                headerFields={[]}
                itemFields={[
                  { key: 'quote', label: 'Depoimento', type: 'textarea' },
                  { key: 'author', label: 'Autor', type: 'text' },
                  { key: 'role', label: 'Cargo / contexto', type: 'text' },
                ]}
              />

              <ListSectionEditor
                label="Perguntas frequentes" sectionKey="faq" itemsKey="items"
                content={getSection('faq')} onSave={handleSave} isSaving={savingKey === 'faq'}
                headerFields={[]}
                itemFields={[
                  { key: 'q', label: 'Pergunta', type: 'text' },
                  { key: 'a', label: 'Resposta', type: 'textarea' },
                ]}
              />

              <SectionEditor
                label="Formulário de contato" sectionKey="contact_form"
                content={getSection('contact_form')} onSave={handleSave} isSaving={savingKey === 'contact_form'}
                fields={[
                  { key: 'eyebrow', label: 'Etiqueta', type: 'text' },
                  { key: 'title', label: 'Título — linha 1', type: 'text' },
                  { key: 'title2', label: 'Título — linha 2 em destaque', type: 'text' },
                  { key: 'text', label: 'Texto', type: 'textarea' },
                  { key: 'whatsapp_number', label: 'WhatsApp (número internacional)', type: 'text', placeholder: '5547999999999' },
                ]}
              />

              <SectionEditor
                label="CTA final" sectionKey="final_cta"
                content={getSection('final_cta')} onSave={handleSave} isSaving={savingKey === 'final_cta'}
                fields={[
                  { key: 'title', label: 'Título — linha 1', type: 'text' },
                  { key: 'title2', label: 'Título — linha 2 em destaque', type: 'text' },
                  { key: 'cta', label: 'Texto do botão', type: 'text' },
                ]}
              />

              <SectionEditor
                label="Rodapé" sectionKey="footer"
                content={getSection('footer')} onSave={handleSave} isSaving={savingKey === 'footer'}
                fields={[
                  { key: 'address', label: 'Endereço', type: 'text' },
                  { key: 'phone', label: 'Telefone', type: 'text' },
                  { key: 'email', label: 'E-mail', type: 'text' },
                  { key: 'instagram', label: 'Instagram (URL)', type: 'text' },
                ]}
              />
            </Accordion>
          </div>

          {/* PREVIEW */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Preview ao vivo</div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => setPreviewVersion((v) => v + 1)} title="Atualizar preview">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                  <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-ink h-7 px-2">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <div className="border border-border bg-paper editorial-shadow overflow-hidden">
                <iframe
                  key={previewVersion}
                  src={`/?preview=${previewVersion}`}
                  title="Preview do site"
                  className="w-full h-[calc(100vh-200px)] bg-paper"
                />
              </div>
              <p className="text-[10px] text-muted-foreground font-light">
                O preview recarrega automaticamente sempre que você salvar uma seção.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
