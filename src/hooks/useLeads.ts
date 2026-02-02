import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  project_type: string | null;
  objective: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 'novo' | 'contatado' | 'em_negociacao' | 'convertido' | 'perdido';

export const LEAD_STATUSES: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'novo', label: 'Novo', color: 'bg-blue-500' },
  { value: 'contatado', label: 'Contatado', color: 'bg-yellow-500' },
  { value: 'em_negociacao', label: 'Em Negociação', color: 'bg-purple-500' },
  { value: 'convertido', label: 'Convertido', color: 'bg-green-500' },
  { value: 'perdido', label: 'Perdido', color: 'bg-destructive' },
];

export function useLeads() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Lead[];
    },
  });

  const updateLeadStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: 'Status atualizado',
        description: 'O status do lead foi atualizado com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateLeadNotes = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { error } = await supabase
        .from('leads')
        .update({ notes })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: 'Notas salvas',
        description: 'As notas foram atualizadas com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: 'Lead excluído',
        description: 'O lead foi removido com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const stats = {
    total: leads.length,
    novo: leads.filter(l => l.status === 'novo').length,
    contatado: leads.filter(l => l.status === 'contatado').length,
    em_negociacao: leads.filter(l => l.status === 'em_negociacao').length,
    convertido: leads.filter(l => l.status === 'convertido').length,
    perdido: leads.filter(l => l.status === 'perdido').length,
  };

  return {
    leads,
    isLoading,
    error,
    stats,
    updateLeadStatus,
    updateLeadNotes,
    deleteLead,
  };
}
