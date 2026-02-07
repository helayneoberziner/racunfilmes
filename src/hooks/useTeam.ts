import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  instagram: string | null;
  linkedin: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as TeamMember[];
    },
  });
}

export function useTeamAdmin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addMember = useMutation({
    mutationFn: async (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert(member)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Membro adicionado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao adicionar membro', description: error.message, variant: 'destructive' });
    },
  });

  const updateMember = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TeamMember> & { id: string }) => {
      const { data, error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Membro atualizado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao atualizar membro', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMember = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Membro removido com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao remover membro', description: error.message, variant: 'destructive' });
    },
  });

  const uploadPhoto = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `team/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  return {
    addMember,
    updateMember,
    deleteMember,
    uploadPhoto,
  };
}
