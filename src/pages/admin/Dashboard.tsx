import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  MessageSquare, 
  Film, 
  LogOut, 
  LayoutDashboard,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    {
      title: 'Total de Leads',
      value: '0',
      description: 'Contatos recebidos',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Novos',
      value: '0',
      description: 'Aguardando contato',
      icon: Clock,
      color: 'text-yellow-500',
    },
    {
      title: 'Em Andamento',
      value: '0',
      description: 'Em negociação',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
    {
      title: 'Convertidos',
      value: '0',
      description: 'Clientes fechados',
      icon: CheckCircle,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Film className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Racun Filmes</span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">Painel Administrativo</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
              {isAdmin && (
                <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                  Admin
                </span>
              )}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo da Racun Filmes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-gradient bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-gradient bg-card/50 card-hover cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>Gerenciar Leads</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os contatos recebidos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-gradient bg-card/50 card-hover cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle>Portfólio</CardTitle>
              <CardDescription>
                Gerencie os vídeos e projetos do site
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-gradient bg-card/50 card-hover cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle>Mensagens</CardTitle>
              <CardDescription>
                Acompanhe as mensagens e solicitações
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {!isAdmin && (
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-500 text-sm">
              ⚠️ Você está logado, mas não possui permissões de administrador. 
              Solicite acesso a um administrador para gerenciar o conteúdo.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
