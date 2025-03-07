
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  UserCog,
  X,
} from 'lucide-react';
import { FadeIn } from './animations/PageTransition';
import { useAuth } from '@/contexts/AuthContext';

type NavbarProps = {
  user?: {
    name: string;
    email?: string;
    avatar?: string;
    role: 'admin' | 'employee';
  } | null;
  onMenuToggle?: () => void;
  isMobile?: boolean;
};

export function Navbar({ user, onMenuToggle, isMobile }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const getDashboardUrl = () => {
    if (!user) return '/login';
    return user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard';
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled || !isLandingPage
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuToggle}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-90"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
              <span className="absolute text-lg font-bold">A</span>
              <span className="absolute right-[-2px] bottom-[-2px] flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                +
              </span>
            </div>
            <span className="text-gradient">achieve+</span>
          </Link>
        </div>
        
        <FadeIn>
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 pl-2 pr-3"
                    >
                      <UserAvatar
                        name={user?.name}
                        image={user?.avatar}
                        size="sm"
                        showStatus
                        status="online"
                      />
                      {!isMobile && (
                        <>
                          <span className="max-w-[100px] truncate text-sm font-medium">
                            {user?.name}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2">
                      <UserCog className="h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={toggleTheme}
                    >
                      {theme === 'light' ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                      <span>
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Get started</Link>
                </Button>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </header>
  );
}
