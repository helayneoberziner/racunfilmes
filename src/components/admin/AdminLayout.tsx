import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Film, LogOut, LayoutDashboard, Users, Home } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Film className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">Racun Filmes</span>
            </Link>
            
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Ver Site</span>
            </Link>
            
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
              {isAdmin && (
                <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                  Admin
                </span>
              )}
            </span>
            
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {children}
      </main>
    </div>
  );
}
