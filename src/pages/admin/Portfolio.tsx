import { useState, useRef } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { usePortfolioVideos, usePortfolioPhotos, usePortfolioAdmin, PortfolioVideo, PortfolioPhoto } from '@/hooks/usePortfolio';
import { Film, Image, Plus, Pencil, Trash2, Upload, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const videoCategories = ["Institucionais", "Comerciais", "Imobiliário", "Redes Sociais", "Eventos", "Campanhas Eleitorais"];

export default function PortfolioAdmin() {
  const { data: videos = [], isLoading: videosLoading } = usePortfolioVideos();
  const { data: photos = [], isLoading: photosLoading } = usePortfolioPhotos();
  const { addVideo, updateVideo, deleteVideo, addPhoto, updatePhoto, deletePhoto, uploadPhoto, uploadThumbnail } = usePortfolioAdmin();
  const { toast } = useToast();

  // Video form state
  const [videoForm, setVideoForm] = useState({
    title: '',
    category: '',
    thumbnail_url: '',
    video_url: '',
    display_order: 0,
    is_active: true,
  });
  const [editingVideo, setEditingVideo] = useState<PortfolioVideo | null>(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Photo form state
  const [photoForm, setPhotoForm] = useState({
    title: '',
    image_url: '',
    display_order: 0,
    is_active: true,
  });
  const [editingPhoto, setEditingPhoto] = useState<PortfolioPhoto | null>(null);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Video handlers
  const handleVideoSubmit = async () => {
    if (!videoForm.title || !videoForm.category || !videoForm.video_url) {
      toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' });
      return;
    }

    if (editingVideo) {
      await updateVideo.mutateAsync({ id: editingVideo.id, ...videoForm });
    } else {
      await addVideo.mutateAsync(videoForm);
    }
    resetVideoForm();
    setVideoDialogOpen(false);
  };

  const handleEditVideo = (video: PortfolioVideo) => {
    setEditingVideo(video);
    setVideoForm({
      title: video.title,
      category: video.category,
      thumbnail_url: video.thumbnail_url,
      video_url: video.video_url,
      display_order: video.display_order,
      is_active: video.is_active,
    });
    setVideoDialogOpen(true);
  };

  const resetVideoForm = () => {
    setEditingVideo(null);
    setVideoForm({
      title: '',
      category: '',
      thumbnail_url: '',
      video_url: '',
      display_order: 0,
      is_active: true,
    });
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    try {
      const url = await uploadThumbnail(file);
      setVideoForm(prev => ({ ...prev, thumbnail_url: url }));
      toast({ title: 'Thumbnail enviada com sucesso!' });
    } catch (error) {
      toast({ title: 'Erro ao enviar thumbnail', variant: 'destructive' });
    } finally {
      setUploadingThumbnail(false);
    }
  };

  // Photo handlers
  const handlePhotoSubmit = async () => {
    if (!photoForm.image_url) {
      toast({ title: 'Selecione uma imagem', variant: 'destructive' });
      return;
    }

    if (editingPhoto) {
      await updatePhoto.mutateAsync({ id: editingPhoto.id, ...photoForm });
    } else {
      await addPhoto.mutateAsync(photoForm);
    }
    resetPhotoForm();
    setPhotoDialogOpen(false);
  };

  const handleEditPhoto = (photo: PortfolioPhoto) => {
    setEditingPhoto(photo);
    setPhotoForm({
      title: photo.title || '',
      image_url: photo.image_url,
      display_order: photo.display_order,
      is_active: photo.is_active,
    });
    setPhotoDialogOpen(true);
  };

  const resetPhotoForm = () => {
    setEditingPhoto(null);
    setPhotoForm({
      title: '',
      image_url: '',
      display_order: 0,
      is_active: true,
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const url = await uploadPhoto(file);
      setPhotoForm(prev => ({ ...prev, image_url: url }));
      toast({ title: 'Foto enviada com sucesso!' });
    } catch (error) {
      toast({ title: 'Erro ao enviar foto', variant: 'destructive' });
    } finally {
      setUploadingPhoto(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar Portfólio</h1>
          <p className="text-muted-foreground">
            Adicione, edite e organize os vídeos e fotos do seu portfólio
          </p>
        </div>

        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              Vídeos ({videos.length})
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Fotos ({photos.length})
            </TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Vídeos do Portfólio</h2>
              <Dialog open={videoDialogOpen} onOpenChange={(open) => { setVideoDialogOpen(open); if (!open) resetVideoForm(); }}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Vídeo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingVideo ? 'Editar Vídeo' : 'Novo Vídeo'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-title">Título *</Label>
                      <Input
                        id="video-title"
                        value={videoForm.title}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Ex: Vídeo Institucional Premium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-category">Categoria *</Label>
                      <Select
                        value={videoForm.category}
                        onValueChange={(value) => setVideoForm(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {videoCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-url">URL do Vídeo (YouTube embed) *</Label>
                      <Input
                        id="video-url"
                        value={videoForm.video_url}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, video_url: e.target.value }))}
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Thumbnail</Label>
                      <div className="flex gap-2">
                        <Input
                          value={videoForm.thumbnail_url}
                          onChange={(e) => setVideoForm(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                          placeholder="URL da imagem ou faça upload"
                        />
                        <input
                          type="file"
                          ref={thumbnailInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => thumbnailInputRef.current?.click()}
                          disabled={uploadingThumbnail}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      {videoForm.thumbnail_url && (
                        <img src={videoForm.thumbnail_url} alt="Preview" className="w-32 h-20 object-cover rounded mt-2" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-order">Ordem de exibição</Label>
                      <Input
                        id="video-order"
                        type="number"
                        value={videoForm.display_order}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={videoForm.is_active}
                        onCheckedChange={(checked) => setVideoForm(prev => ({ ...prev, is_active: checked }))}
                      />
                      <Label>Ativo (visível no site)</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleVideoSubmit} disabled={addVideo.isPending || updateVideo.isPending}>
                      {editingVideo ? 'Salvar' : 'Adicionar'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {videosLoading ? (
              <div className="text-center py-8 text-muted-foreground">Carregando...</div>
            ) : videos.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Film className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Nenhum vídeo cadastrado ainda</p>
                  <p className="text-sm text-muted-foreground mt-1">Clique em "Adicionar Vídeo" para começar</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {videos.map((video) => (
                  <Card key={video.id} className={`border-gradient ${!video.is_active ? 'opacity-60' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          {video.thumbnail_url ? (
                            <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Film className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{video.title}</h3>
                            {!video.is_active && (
                              <span className="text-xs px-2 py-0.5 bg-muted rounded-full flex items-center gap-1">
                                <EyeOff className="h-3 w-3" /> Oculto
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{video.category}</p>
                          <p className="text-xs text-muted-foreground mt-1">Ordem: {video.display_order}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(video.video_url.replace('?autoplay=1', ''), '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditVideo(video)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remover vídeo?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja remover "{video.title}"? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteVideo.mutate(video.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Remover
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Fotos do Portfólio</h2>
              <Dialog open={photoDialogOpen} onOpenChange={(open) => { setPhotoDialogOpen(open); if (!open) resetPhotoForm(); }}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Foto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingPhoto ? 'Editar Foto' : 'Nova Foto'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="photo-title">Título (opcional)</Label>
                      <Input
                        id="photo-title"
                        value={photoForm.title}
                        onChange={(e) => setPhotoForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Ex: Ensaio Corporativo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Imagem *</Label>
                      <div className="flex gap-2">
                        <Input
                          value={photoForm.image_url}
                          onChange={(e) => setPhotoForm(prev => ({ ...prev, image_url: e.target.value }))}
                          placeholder="URL da imagem ou faça upload"
                        />
                        <input
                          type="file"
                          ref={photoInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => photoInputRef.current?.click()}
                          disabled={uploadingPhoto}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      {photoForm.image_url && (
                        <img src={photoForm.image_url} alt="Preview" className="w-32 h-24 object-cover rounded mt-2" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photo-order">Ordem de exibição</Label>
                      <Input
                        id="photo-order"
                        type="number"
                        value={photoForm.display_order}
                        onChange={(e) => setPhotoForm(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={photoForm.is_active}
                        onCheckedChange={(checked) => setPhotoForm(prev => ({ ...prev, is_active: checked }))}
                      />
                      <Label>Ativo (visível no site)</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handlePhotoSubmit} disabled={addPhoto.isPending || updatePhoto.isPending}>
                      {editingPhoto ? 'Salvar' : 'Adicionar'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {photosLoading ? (
              <div className="text-center py-8 text-muted-foreground">Carregando...</div>
            ) : photos.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Nenhuma foto cadastrada ainda</p>
                  <p className="text-sm text-muted-foreground mt-1">Clique em "Adicionar Foto" para começar</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <Card key={photo.id} className={`overflow-hidden ${!photo.is_active ? 'opacity-60' : ''}`}>
                    <div className="aspect-square relative group">
                      <img src={photo.image_url} alt={photo.title || 'Foto'} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="secondary" size="icon" onClick={() => handleEditPhoto(photo)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remover foto?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja remover esta foto? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deletePhoto.mutate(photo.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remover
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      {!photo.is_active && (
                        <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
                          <EyeOff className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium truncate">{photo.title || 'Sem título'}</p>
                      <p className="text-xs text-muted-foreground">Ordem: {photo.display_order}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
