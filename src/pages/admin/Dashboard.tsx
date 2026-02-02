import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeads } from '@/hooks/useLeads';
import { 
  Users, 
  MessageSquare, 
  Film, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const { stats, isLoading } = useLeads();

  const statCards = [
    {
      title: 'Total de Leads',
      value: stats.total,
      description: 'Contatos recebidos',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      title: 'Novos',
      value: stats.novo,
      description: 'Aguardando contato',
      icon: Clock,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      title: 'Em Negociação',
      value: stats.em_negociacao,
      description: 'Em andamento',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      title: 'Convertidos',
      value: stats.convertido,
      description: 'Clientes fechados',
      icon: CheckCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo da Racun Filmes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-gradient bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoading ? '-' : stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/admin/leads">
              <Card className="border-gradient bg-card/50 card-hover cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Gerenciar Leads</CardTitle>
                  <CardDescription>
                    Visualize e gerencie todos os contatos recebidos
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Card className="border-gradient bg-card/50 opacity-60">
              <CardHeader>
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4">
                  <Film className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-muted-foreground">Portfólio</CardTitle>
                <CardDescription>
                  Em breve - Gerencie os vídeos e projetos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gradient bg-card/50 opacity-60">
              <CardHeader>
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-muted-foreground">Conteúdo do Site</CardTitle>
                <CardDescription>
                  Em breve - Atualize textos e informações
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
          <Card className="border-gradient bg-card/50">
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>As atividades recentes aparecerão aqui</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {!isAdmin && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">
              ⚠️ Você está logado, mas não possui permissões de administrador. 
              Solicite acesso a um administrador para gerenciar o conteúdo.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
