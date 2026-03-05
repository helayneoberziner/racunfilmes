import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SiteContent {
  id: string;
  section_key: string;
  content: Record<string, any>;
  updated_at: string;
}

export function useSiteContent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: sections = [], isLoading } = useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('section_key');

      if (error) throw error;
      return data as SiteContent[];
    },
  });

  const getSection = (key: string): Record<string, any> | null => {
    const section = sections.find(s => s.section_key === key);
    return section?.content ?? null;
  };

  const updateSection = useMutation({
    mutationFn: async ({ sectionKey, content }: { sectionKey: string; content: Record<string, any> }) => {
      const { error } = await supabase
        .from('site_content')
        .update({ content })
        .eq('section_key', sectionKey);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      toast({ title: 'Conteúdo salvo', description: 'As alterações foram salvas com sucesso.' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    },
  });

  return { sections, isLoading, getSection, updateSection };
}

/** Lightweight hook for public sections — returns content for a single key */
export function useSectionContent(key: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['site-content', key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', key)
        .single();

      if (error) throw error;
      return data.content as Record<string, any>;
    },
    staleTime: 5 * 60 * 1000, // 5 min cache for public pages
  });

  return { content: data ?? null, isLoading };
}
