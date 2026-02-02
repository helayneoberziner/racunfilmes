import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lead, LEAD_STATUSES, useLeads } from '@/hooks/useLeads';
import { LeadStatusBadge } from './LeadStatusBadge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Mail, Phone, Calendar, FileText, Target, Loader2, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface LeadDetailsSheetProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailsSheet({ lead, open, onOpenChange }: LeadDetailsSheetProps) {
  const { updateLeadStatus, updateLeadNotes, deleteLead } = useLeads();
  const [notes, setNotes] = useState(lead?.notes || '');
  const [isNotesChanged, setIsNotesChanged] = useState(false);

  if (!lead) return null;

  const handleStatusChange = (status: string) => {
    updateLeadStatus.mutate({ id: lead.id, status });
  };

  const handleSaveNotes = () => {
    updateLeadNotes.mutate({ id: lead.id, notes });
    setIsNotesChanged(false);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setIsNotesChanged(value !== (lead.notes || ''));
  };

  const handleDelete = () => {
    deleteLead.mutate(lead.id);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl">{lead.name}</SheetTitle>
              <SheetDescription className="mt-1">
                Detalhes do lead e histórico
              </SheetDescription>
            </div>
            <LeadStatusBadge status={lead.status} />
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Informações de Contato</h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                  {lead.email}
                </a>
              </div>
              
              {lead.whatsapp && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {lead.whatsapp}
                  </a>
                </div>
              )}
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Recebido em {format(new Date(lead.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                </span>
              </div>
            </div>
          </div>

          {/* Project Info */}
          {(lead.project_type || lead.objective) && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Sobre o Projeto</h3>
              
              <div className="space-y-2">
                {lead.project_type && (
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Tipo: {lead.project_type}</span>
                  </div>
                )}
                
                {lead.objective && (
                  <div className="flex items-center gap-3 text-sm">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span>Objetivo: {lead.objective}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          {lead.message && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Mensagem</h3>
              <div className="p-3 bg-muted/50 rounded-lg text-sm">
                {lead.message}
              </div>
            </div>
          )}

          {/* Status Update */}
          <div className="space-y-3">
            <Label htmlFor="status">Atualizar Status</Label>
            <Select
              value={lead.status}
              onValueChange={handleStatusChange}
              disabled={updateLeadStatus.isPending}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEAD_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label htmlFor="notes">Notas Internas</Label>
            <Textarea
              id="notes"
              placeholder="Adicione notas sobre este lead..."
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={4}
              className="bg-muted/50"
            />
            {isNotesChanged && (
              <Button
                size="sm"
                onClick={handleSaveNotes}
                disabled={updateLeadNotes.isPending}
              >
                {updateLeadNotes.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Notas'
                )}
              </Button>
            )}
          </div>

          {/* Delete */}
          <div className="pt-4 border-t border-border">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir Lead
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. O lead "{lead.name}" será permanentemente removido.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
