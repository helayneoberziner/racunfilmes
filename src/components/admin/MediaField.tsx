import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, X, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

interface Props {
  label?: string;
  value?: string;
  /** Detected from extension on upload; can be overridden via onTypeChange */
  type?: 'image' | 'video';
  folder: string;
  accept?: string;
  onChange: (url: string, type: 'image' | 'video') => void;
  onClear?: () => void;
}

/** Upload a single image or video to the public `site-assets` bucket. */
export function MediaField({ label, value, type, folder, accept = 'image/*,video/*', onChange, onClear }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'bin';
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from('site-assets').upload(path, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: '3600',
      });
      if (error) throw error;
      const { data: pub } = supabase.storage.from('site-assets').getPublicUrl(path);
      const detected: 'image' | 'video' = file.type.startsWith('video/') ? 'video' : 'image';
      onChange(pub.publicUrl, detected);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      {label && (
        <label className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5 block">
          {label}
        </label>
      )}

      {value ? (
        <div className="flex items-start gap-3">
          <div className="w-28 h-20 bg-ink/5 border border-border overflow-hidden flex items-center justify-center shrink-0">
            {type === 'video' ? (
              <video src={value} className="h-full w-full object-cover" muted />
            ) : (
              <img src={value} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1">
              {type === 'video' ? <VideoIcon className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
              {type ?? 'arquivo'}
            </div>
            <p className="text-xs text-muted-foreground truncate font-light">{value.split('/').pop()}</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-none" onClick={() => fileRef.current?.click()}>
                {uploading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Upload className="h-3 w-3 mr-1" />}
                Substituir
              </Button>
              {onClear && (
                <Button variant="ghost" size="sm" className="h-7 text-[10px] text-destructive" onClick={onClear}>
                  <X className="h-3 w-3 mr-1" /> Remover
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border p-5 text-center cursor-pointer hover:border-accent transition-colors"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
          ) : (
            <>
              <Upload className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground font-light">
                Clique para enviar uma imagem ou vídeo
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
