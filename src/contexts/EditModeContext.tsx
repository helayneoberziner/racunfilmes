import { createContext, useContext, useState, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface EditModeValue {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  canEdit: boolean;
  saveField: (sectionKey: string, fieldKey: string, value: string) => Promise<void>;
}

const EditModeContext = createContext<EditModeValue>({
  enabled: false,
  setEnabled: () => {},
  canEdit: false,
  saveField: async () => {},
});

export function EditModeProvider({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const qc = useQueryClient();
  const { toast } = useToast();

  const saveField = async (sectionKey: string, fieldKey: string, value: string) => {
    try {
      const { data: existing } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', sectionKey)
        .maybeSingle();

      const current = (existing?.content as Record<string, any>) ?? {};
      const next = { ...current, [fieldKey]: value };

      const { error } = await supabase
        .from('site_content')
        .upsert({ section_key: sectionKey, content: next }, { onConflict: 'section_key' });

      if (error) throw error;

      qc.invalidateQueries({ queryKey: ['site-content'] });
      qc.invalidateQueries({ queryKey: ['site-content', sectionKey] });
    } catch (err: any) {
      toast({ title: 'Erro ao salvar', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <EditModeContext.Provider value={{ enabled, setEnabled, canEdit: isAdmin, saveField }}>
      {children}
    </EditModeContext.Provider>
  );
}

export const useEditMode = () => useContext(EditModeContext);
