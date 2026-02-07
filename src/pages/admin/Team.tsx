import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useTeamMembers, useTeamAdmin, TeamMember } from '@/hooks/useTeam';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash2, Upload, Users, Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamForm {
  name: string;
  role: string;
  bio: string;
  image_url: string;
  instagram: string;
  linkedin: string;
  display_order: number;
  is_active: boolean;
}

const emptyForm: TeamForm = {
  name: '',
  role: '',
  bio: '',
  image_url: '',
  instagram: '',
  linkedin: '',
  display_order: 0,
  is_active: true,
};

export default function TeamAdmin() {
  const { data: members, isLoading } = useTeamMembers();
  const { addMember, updateMember, deleteMember, uploadPhoto } = useTeamAdmin();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<TeamForm>(emptyForm);
  const [uploading, setUploading] = useState(false);

  const openAdd = () => {
    setEditingMember(null);
    setForm({ ...emptyForm, display_order: (members?.length ?? 0) });
    setDialogOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio ?? '',
      image_url: member.image_url ?? '',
      instagram: member.instagram ?? '',
      linkedin: member.linkedin ?? '',
      display_order: member.display_order,
      is_active: member.is_active,
    });
    setDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadPhoto(file);
      setForm((prev) => ({ ...prev, image_url: url }));
      toast({ title: 'Foto enviada com sucesso!' });
    } catch (err: any) {
      toast({ title: 'Erro ao enviar foto', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.role) {
      toast({ title: 'Preencha pelo menos o nome e o cargo', variant: 'destructive' });
      return;
    }

    if (editingMember) {
      await updateMember.mutateAsync({ id: editingMember.id, ...form });
    } else {
      await addMember.mutateAsync(form);
    }
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este membro?')) return;
    await deleteMember.mutateAsync(id);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Equipe
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Gerencie os membros da equipe exibidos no site.
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Membro
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? 'Editar Membro' : 'Novo Membro'}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Photo */}
                <div className="space-y-2">
                  <Label>Foto</Label>
                  <div className="flex items-center gap-4">
                    {form.image_url && (
                      <img
                        src={form.image_url}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                      />
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                      <Button variant="outline" size="sm" asChild disabled={uploading}>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          {uploading ? 'Enviando...' : 'Enviar Foto'}
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label>Nome *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Nome completo"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label>Cargo *</Label>
                  <Input
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    placeholder="Ex: Diretor Criativo"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={form.bio}
                    onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                    placeholder="Uma breve descrição sobre o membro"
                    rows={3}
                  />
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Instagram className="h-3 w-3" /> Instagram
                    </Label>
                    <Input
                      value={form.instagram}
                      onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Linkedin className="h-3 w-3" /> LinkedIn
                    </Label>
                    <Input
                      value={form.linkedin}
                      onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>

                {/* Order & Active */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2 w-24">
                    <Label>Ordem</Label>
                    <Input
                      type="number"
                      value={form.display_order}
                      onChange={(e) => setForm((p) => ({ ...p, display_order: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Ativo</Label>
                    <Switch
                      checked={form.is_active}
                      onCheckedChange={(checked) => setForm((p) => ({ ...p, is_active: checked }))}
                    />
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={addMember.isPending || updateMember.isPending}
                >
                  {addMember.isPending || updateMember.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Members list */}
        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Carregando...</p>
        ) : !members?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum membro cadastrado ainda.</p>
              <p className="text-sm">Clique em "Novo Membro" para começar.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <Card key={member.id} className={!member.is_active ? 'opacity-50' : ''}>
                <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 bg-muted">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Users className="h-8 w-8" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-primary text-sm">{member.role}</p>
                    {member.bio && (
                      <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{member.bio}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <Button variant="outline" size="sm" onClick={() => openEdit(member)}>
                      <Pencil className="h-3 w-3 mr-1" /> Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
