import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Users, Home, FileText } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AdminLayoutProps { children: React.ReactNode; }

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/content', label: 'Conteúdo', icon: FileText },
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
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border bg-paper/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="font-display text-xl font-light">Lago</span>
              <span className="h-px w-6 bg-accent self-center" />
              <span className="font-display text-xl font-light">di Garda</span>
              <span className="ml-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Painel</span>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-ink border-b border-accent"
                      : "text-muted-foreground hover:text-ink"
                  )}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-ink flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Ver Site</span>
            </Link>

            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
              {isAdmin && (
                <span className="ml-2 px-2 py-0.5 bg-accent/15 text-accent text-[10px] uppercase tracking-[0.2em] rounded-sm">Admin</span>
              )}
            </span>

            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-10">{children}</main>
    </div>
  );
}
