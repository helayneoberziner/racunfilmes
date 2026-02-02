import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLeads, Lead, LEAD_STATUSES } from '@/hooks/useLeads';
import { LeadStatusBadge } from '@/components/admin/LeadStatusBadge';
import { LeadDetailsSheet } from '@/components/admin/LeadDetailsSheet';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, Users, Loader2, Inbox } from 'lucide-react';

export default function Leads() {
  const { leads, isLoading, stats } = useLeads();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.whatsapp && lead.whatsapp.includes(searchQuery));

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Leads</h1>
          <p className="text-muted-foreground">
            Gerencie todos os contatos recebidos pelo site
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-border bg-card/50">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          {LEAD_STATUSES.map((status) => (
            <Card key={status.value} className="border-border bg-card/50">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {stats[status.value as keyof typeof stats] || 0}
                </div>
                <p className="text-xs text-muted-foreground">{status.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-border bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou WhatsApp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-muted/50">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  {LEAD_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-border bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lista de Leads
            </CardTitle>
            <CardDescription>
              {filteredLeads.length} {filteredLeads.length === 1 ? 'lead encontrado' : 'leads encontrados'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Nenhum lead encontrado</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {leads.length === 0
                    ? 'Os leads aparecerão aqui quando alguém preencher o formulário de contato.'
                    : 'Tente ajustar os filtros de busca.'}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead>Nome</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">WhatsApp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow
                        key={lead.id}
                        className="cursor-pointer hover:bg-muted/30"
                        onClick={() => handleLeadClick(lead)}
                      >
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {lead.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {lead.whatsapp || '-'}
                        </TableCell>
                        <TableCell>
                          <LeadStatusBadge status={lead.status} />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">
                          {format(new Date(lead.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <LeadDetailsSheet
        lead={selectedLead}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </AdminLayout>
  );
}
