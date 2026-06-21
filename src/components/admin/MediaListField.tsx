import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Loader2, Trash2, ChevronUp, ChevronDown, Plus } from 'lucide-react';

export interface GalleryItem {
  url: string;
  caption?: string;
  span?: string;
}

interface Props {
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  folder: string;
}

const SPAN_OPTIONS: { label: string; value: string }[] = [
  { label: 'Grande retrato (4 col, 4/5)',   value: 'lg:col-span-4 aspect-[4/5]' },
  { label: 'Banner largo (8 col, 16/9)',    value: 'lg:col-span-8 aspect-[16/9]' },
  { label: 'Banner alto (8 col, 16/10)',    value: 'lg:col-span-8 lg:row-span-2 aspect-[16/10]' },
  { label: 'Quadrado médio (6 col, 1/1)',   value: 'lg:col-span-6 aspect-square' },
  { label: 'Coluna estreita (4 col, 3/4)',  value: 'lg:col-span-4 aspect-[3/4]' },
];

export function MediaListField({ items, onChange, folder }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded: GalleryItem[] = [];
      for (const file of files) {
        const ext = file.name.split('.').pop() || 'bin';
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from('site-assets').upload(path, file, {
          contentType: file.type,
          upsert: true,
          cacheControl: '3600',
        });
        if (!error) {
          const { data: pub } = supabase.storage.from('site-assets').getPublicUrl(path);
          uploaded.push({ url: pub.publicUrl, caption: '', span: SPAN_OPTIONS[0].value });
        }
      }
      onChange([...(items ?? []), ...uploaded]);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const update = (i: number, patch: Partial<GalleryItem>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">Imagens</label>
        <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="rounded-none h-7" disabled={uploading}>
          {uploading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Plus className="h-3 w-3 mr-1" />} Adicionar
        </Button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleAddUpload} />
      </div>

      {(!items || items.length === 0) && (
        <div className="border-2 border-dashed border-border p-6 text-center text-xs text-muted-foreground font-light">
          Nenhuma imagem enviada. Clique em "Adicionar" para enviar uma ou várias.
        </div>
      )}

      <div className="space-y-2">
        {items?.map((it, i) => (
          <div key={i} className="p-3 border border-border bg-paper flex gap-3">
            <div className="w-24 h-24 bg-ink/5 border border-border overflow-hidden shrink-0">
              <img src={it.url} alt={it.caption ?? ''} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <Input
                value={it.caption ?? ''}
                placeholder="Legenda"
                onChange={(e) => update(i, { caption: e.target.value })}
                className="h-8 text-sm"
              />
              <select
                value={it.span ?? SPAN_OPTIONS[0].value}
                onChange={(e) => update(i, { span: e.target.value })}
                className="w-full h-8 text-xs px-2 border border-input bg-background"
              >
                {SPAN_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => move(i, -1)} disabled={i === 0}><ChevronUp className="h-3 w-3" /></Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ChevronDown className="h-3 w-3" /></Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-destructive" onClick={() => remove(i)}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
