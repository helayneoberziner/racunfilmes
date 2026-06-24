import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Shield, Trash2, UserCog } from "lucide-react";

type Role = "super_admin" | "admin" | "editor";

interface ManagedUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
}

const ROLE_LABEL: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Administrador",
  editor: "Editor",
  user: "Usuário",
};

export default function Settings() {
  const { toast } = useToast();
  const { isSuperAdmin, user } = useAuth();
  const { getSection, updateSection, isLoading } = useSiteContent();

  // ------------------ General info ------------------
  const footer = getSection("footer") ?? {};
  const general = getSection("general") ?? {};
  const tracking = getSection("tracking") ?? {};
  const [info, setInfo] = useState({
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    linkedin: "",
    google_maps_url: "",
    business_hours: "",
    logo_url: "",
  });
  const [pixels, setPixels] = useState({
    meta_pixel_id: "",
    google_analytics_id: "",
    google_tag_id: "",
    tiktok_pixel_id: "",
    custom_head_html: "",
  });

  useEffect(() => {
    if (!isLoading) {
      setInfo({
        address: footer.address ?? "",
        phone: footer.phone ?? "",
        whatsapp: footer.whatsapp ?? "",
        email: footer.email ?? "",
        instagram: footer.instagram ?? "",
        facebook: footer.facebook ?? "",
        youtube: footer.youtube ?? "",
        tiktok: footer.tiktok ?? "",
        linkedin: footer.linkedin ?? "",
        google_maps_url: footer.google_maps_url ?? "",
        business_hours: footer.business_hours ?? "",
        logo_url: general.logo_url ?? "",
      });
      setPixels({
        meta_pixel_id: tracking.meta_pixel_id ?? "",
        google_analytics_id: tracking.google_analytics_id ?? "",
        google_tag_id: tracking.google_tag_id ?? "",
        tiktok_pixel_id: tracking.tiktok_pixel_id ?? "",
        custom_head_html: tracking.custom_head_html ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const saveInfo = async () => {
    const { logo_url, ...rest } = info;
    await updateSection.mutateAsync({ sectionKey: "footer", content: rest });
    await updateSection.mutateAsync({
      sectionKey: "general",
      content: { ...general, logo_url },
    });
  };

  const savePixels = async () => {
    await updateSection.mutateAsync({ sectionKey: "tracking", content: pixels });
    toast({ title: "Pixels atualizados", description: "Recarregue o site público para aplicar." });
  };

  // ------------------ Users ------------------
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: "", password: "", role: "editor" as Role });
  const [busy, setBusy] = useState(false);

  const call = async (action: string, payload: Record<string, unknown> = {}) => {
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action, ...payload },
    });
    if (error) throw error;
    if ((data as any)?.error) throw new Error((data as any).error);
    return data;
  };

  const loadUsers = async () => {
    if (!isSuperAdmin) return;
    setLoadingUsers(true);
    try {
      const data = await call("list");
      setUsers((data as any).users ?? []);
    } catch (e: any) {
      toast({ title: "Erro ao carregar usuários", description: e.message, variant: "destructive" });
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => { loadUsers(); /* eslint-disable-next-line */ }, [isSuperAdmin]);

  const handleInvite = async () => {
    setBusy(true);
    try {
      await call("invite", inviteForm);
      toast({ title: "Acesso criado", description: `Usuário ${inviteForm.email} adicionado.` });
      setOpenInvite(false);
      setInviteForm({ email: "", password: "", role: "editor" });
      loadUsers();
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleSetRole = async (userId: string, role: Role) => {
    try {
      await call("set_role", { user_id: userId, role });
      toast({ title: "Permissão atualizada" });
      loadUsers();
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    }
  };

  const handleRemoveAccess = async (userId: string) => {
    if (!confirm("Remover acesso administrativo deste usuário?")) return;
    try {
      await call("remove_access", { user_id: userId });
      toast({ title: "Acesso removido" });
      loadUsers();
    } catch (e: any) {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    }
  };

  const topRole = (roles: string[]): string => {
    if (roles.includes("super_admin")) return "super_admin";
    if (roles.includes("admin")) return "admin";
    if (roles.includes("editor")) return "editor";
    return "user";
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-ink">Configurações</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Informações de contato, redes sociais e gestão de acessos.
        </p>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="pixels">Rastreio & Pixels</TabsTrigger>
          <TabsTrigger value="users" disabled={!isSuperAdmin}>
            Acessos {!isSuperAdmin && "(somente Super Admin)"}
          </TabsTrigger>
        </TabsList>

        {/* ============ INFO TAB ============ */}
        <TabsContent value="info">
          <Card className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="font-display text-xl text-ink mb-1">Marca</h2>
              <p className="text-sm text-muted-foreground mb-4">Logo exibida no topo do site.</p>
              <Label>URL da logo</Label>
              <Input
                value={info.logo_url}
                onChange={(e) => setInfo({ ...info, logo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="border-t pt-6">
              <h2 className="font-display text-xl text-ink mb-4">Contato & Localização</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Endereço</Label>
                  <Textarea
                    value={info.address}
                    onChange={(e) => setInfo({ ...info, address: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
                </div>
                <div>
                  <Label>WhatsApp (com DDI)</Label>
                  <Input
                    value={info.whatsapp}
                    onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })}
                    placeholder="554732096098"
                  />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
                </div>
                <div>
                  <Label>Horário de atendimento</Label>
                  <Input
                    value={info.business_hours}
                    onChange={(e) => setInfo({ ...info, business_hours: e.target.value })}
                    placeholder="Seg–Sex 9h–18h"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Link do Google Maps</Label>
                  <Input
                    value={info.google_maps_url}
                    onChange={(e) => setInfo({ ...info, google_maps_url: e.target.value })}
                    placeholder="https://maps.google.com/?q=..."
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="font-display text-xl text-ink mb-4">Redes sociais</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Instagram</Label>
                  <Input value={info.instagram} onChange={(e) => setInfo({ ...info, instagram: e.target.value })} />
                </div>
                <div>
                  <Label>Facebook</Label>
                  <Input value={info.facebook} onChange={(e) => setInfo({ ...info, facebook: e.target.value })} />
                </div>
                <div>
                  <Label>YouTube</Label>
                  <Input value={info.youtube} onChange={(e) => setInfo({ ...info, youtube: e.target.value })} />
                </div>
                <div>
                  <Label>TikTok</Label>
                  <Input value={info.tiktok} onChange={(e) => setInfo({ ...info, tiktok: e.target.value })} />
                </div>
                <div>
                  <Label>LinkedIn</Label>
                  <Input value={info.linkedin} onChange={(e) => setInfo({ ...info, linkedin: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={saveInfo} disabled={updateSection.isPending}>
                {updateSection.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Salvar alterações
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ============ USERS TAB ============ */}
        <TabsContent value="users">
          {!isSuperAdmin ? (
            <Card className="p-8 text-center text-muted-foreground">
              Apenas Super Admins podem gerenciar acessos.
            </Card>
          ) : (
            <Card className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl text-ink">Usuários com acesso</h2>
                  <p className="text-sm text-muted-foreground">
                    Conceda acesso a editores e administradores.
                  </p>
                </div>
                <Dialog open={openInvite} onOpenChange={setOpenInvite}>
                  <DialogTrigger asChild>
                    <Button><Plus className="w-4 h-4 mr-2" />Adicionar usuário</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar novo acesso</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>E-mail</Label>
                        <Input
                          type="email"
                          value={inviteForm.email}
                          onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Senha provisória (mín. 8)</Label>
                        <Input
                          type="text"
                          value={inviteForm.password}
                          onChange={(e) => setInviteForm({ ...inviteForm, password: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Nível de acesso</Label>
                        <Select
                          value={inviteForm.role}
                          onValueChange={(v) => setInviteForm({ ...inviteForm, role: v as Role })}
                        >
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="editor">Editor — edita conteúdo</SelectItem>
                            <SelectItem value="admin">Administrador — acesso completo</SelectItem>
                            <SelectItem value="super_admin">Super Admin — gerencia usuários</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="ghost" onClick={() => setOpenInvite(false)}>Cancelar</Button>
                      <Button onClick={handleInvite} disabled={busy}>
                        {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Criar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {loadingUsers ? (
                <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
              ) : (
                <div className="divide-y border rounded-md">
                  {users
                    .filter((u) => u.roles.some((r) => ["super_admin", "admin", "editor"].includes(r)))
                    .map((u) => {
                      const current = topRole(u.roles);
                      const isSelf = u.id === user?.id;
                      return (
                        <div key={u.id} className="p-4 flex flex-col md:flex-row md:items-center gap-3 justify-between">
                          <div>
                            <div className="font-medium text-ink flex items-center gap-2">
                              {current === "super_admin" && <Shield className="w-4 h-4 text-accent" />}
                              {u.email}
                              {isSelf && <span className="text-xs text-muted-foreground">(você)</span>}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {ROLE_LABEL[current]} · Último login:{" "}
                              {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString("pt-BR") : "—"}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              value={current}
                              onValueChange={(v) => handleSetRole(u.id, v as Role)}
                              disabled={isSelf}
                            >
                              <SelectTrigger className="w-[180px]">
                                <UserCog className="w-3.5 h-3.5 mr-1" />
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="super_admin">Super Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveAccess(u.id)}
                              disabled={isSelf}
                              title="Remover acesso"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  {users.filter((u) => u.roles.some((r) => ["super_admin", "admin", "editor"].includes(r))).length === 0 && (
                    <div className="p-8 text-center text-muted-foreground text-sm">Nenhum usuário com acesso ainda.</div>
                  )}
                </div>
              )}
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
