import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeads } from '@/hooks/useLeads';
import { Users, TrendingUp, Clock, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const { stats, isLoading } = useLeads();

  const statCards = [
    { title: 'Total de Leads', value: stats.total, description: 'Contatos recebidos', icon: Users },
    { title: 'Novos', value: stats.novo, description: 'Aguardando contato', icon: Clock },
    { title: 'Em Negociação', value: stats.em_negociacao, description: 'Em andamento', icon: TrendingUp },
    { title: 'Convertidos', value: stats.convertido, description: 'Visitas / Fechados', icon: CheckCircle },
  ];

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">Painel</div>
          <h1 className="display text-4xl md:text-5xl font-light text-ink">Bem-vindo ao Lago di Garda.</h1>
          <p className="text-muted-foreground mt-3 max-w-xl font-light">
            Acompanhe leads em tempo real e mantenha o conteúdo do site sempre alinhado à comunicação do empreendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((s) => (
            <Card key={s.title} className="border border-border bg-card rounded-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-medium">{s.title}</CardTitle>
                <s.icon className="h-4 w-4 text-accent" strokeWidth={1.4} />
              </CardHeader>
              <CardContent>
                <div className="font-display text-4xl font-light text-ink">{isLoading ? '—' : s.value}</div>
                <p className="text-xs text-muted-foreground mt-2 font-light">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-5">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link to="/admin/leads">
              <Card className="border border-border bg-card rounded-none hover:border-accent transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Users className="h-5 w-5 text-accent mb-4" strokeWidth={1.4} />
                  <CardTitle className="font-display font-light text-2xl">Central de Leads</CardTitle>
                  <CardDescription className="font-light">Funil completo, filtros e exportação dos contatos.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/admin/content">
              <Card className="border border-border bg-card rounded-none hover:border-accent transition-colors cursor-pointer h-full">
                <CardHeader>
                  <FileText className="h-5 w-5 text-accent mb-4" strokeWidth={1.4} />
                  <CardTitle className="font-display font-light text-2xl">Conteúdo do Site</CardTitle>
                  <CardDescription className="font-light">Edite textos, imagens, diferenciais, FAQ e depoimentos.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>

        {!isAdmin && (
          <div className="p-4 bg-destructive/10 border border-destructive/20">
            <p className="text-destructive text-sm font-light">
              Você está logado, mas não possui permissões de administrador. Solicite acesso a um administrador.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
