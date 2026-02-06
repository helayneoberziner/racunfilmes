import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PortfolioVideo {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  video_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioPhoto {
  id: string;
  title: string | null;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function usePortfolioVideos() {
  return useQuery({
    queryKey: ['portfolio-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_videos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as PortfolioVideo[];
    },
  });
}

export function usePortfolioPhotos() {
  return useQuery({
    queryKey: ['portfolio-photos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_photos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as PortfolioPhoto[];
    },
  });
}

export function usePortfolioAdmin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Videos mutations
  const addVideo = useMutation({
    mutationFn: async (video: Omit<PortfolioVideo, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('portfolio_videos')
        .insert(video)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-videos'] });
      toast({ title: 'Vídeo adicionado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao adicionar vídeo', description: error.message, variant: 'destructive' });
    },
  });

  const updateVideo = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PortfolioVideo> & { id: string }) => {
      const { data, error } = await supabase
        .from('portfolio_videos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-videos'] });
      toast({ title: 'Vídeo atualizado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao atualizar vídeo', description: error.message, variant: 'destructive' });
    },
  });

  const deleteVideo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('portfolio_videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-videos'] });
      toast({ title: 'Vídeo removido com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao remover vídeo', description: error.message, variant: 'destructive' });
    },
  });

  // Photos mutations
  const addPhoto = useMutation({
    mutationFn: async (photo: Omit<PortfolioPhoto, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('portfolio_photos')
        .insert(photo)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-photos'] });
      toast({ title: 'Foto adicionada com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao adicionar foto', description: error.message, variant: 'destructive' });
    },
  });

  const updatePhoto = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PortfolioPhoto> & { id: string }) => {
      const { data, error } = await supabase
        .from('portfolio_photos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-photos'] });
      toast({ title: 'Foto atualizada com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao atualizar foto', description: error.message, variant: 'destructive' });
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('portfolio_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-photos'] });
      toast({ title: 'Foto removida com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao remover foto', description: error.message, variant: 'destructive' });
    },
  });

  // Upload photo to storage
  const uploadPhoto = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Upload thumbnail to storage
  const uploadThumbnail = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

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
    addVideo,
    updateVideo,
    deleteVideo,
    addPhoto,
    updatePhoto,
    deletePhoto,
    uploadPhoto,
    uploadThumbnail,
  };
}
