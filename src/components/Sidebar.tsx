
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Award,
  BarChart,
  CheckSquare,
  Home,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { FadeIn, SlideIn } from './animations/PageTransition';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    role: 'admin' | 'employee';
  };
};

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
  adminOnly?: boolean;
};

export function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
    },
    {
      title: 'My Tasks',
      icon: CheckSquare,
      href: '/tasks',
    },
    {
      title: 'Analytics',
      icon: BarChart,
      href: '/analytics',
      adminOnly: true,
    },
    {
      title: 'Team',
      icon: Users,
      href: '/team',
      adminOnly: true,
    },
    {
      title: 'Achievements',
      icon: Award,
      href: '/achievements',
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || user.role === 'admin'
  );

  if (isMobile) {
    return (
      <>
        <div
          className={cn(
            'fixed inset-0 z-40 bg-black/50 transition-opacity duration-200',
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={onClose}
        />
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border overflow-hidden transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <h2 className="text-lg font-semibold">achieve+</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4">
              <SidebarContent
                items={filteredNavItems}
                currentPath={location.pathname}
              />
            </div>
          </ScrollArea>
        </aside>
      </>
    );
  }

  return (
    <aside className="hidden md:block fixed inset-y-0 left-0 z-30 w-64 border-r border-border bg-background pt-16 overflow-hidden">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 mt-2">
          <SidebarContent
            items={filteredNavItems}
            currentPath={location.pathname}
          />
        </div>
      </ScrollArea>
    </aside>
  );
}

function SidebarContent({
  items,
  currentPath,
}: {
  items: NavItem[];
  currentPath: string;
}) {
  return (
    <FadeIn>
      <div className="space-y-1">
        {items.map((item, index) => (
          <SlideIn 
            key={item.title} 
            delay={index * 0.05}
            direction="left" 
            className="w-full"
          >
            <Link
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                currentPath === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          </SlideIn>
        ))}
        
        <SlideIn delay={items.length * 0.05} direction="left" className="w-full">
          <div className="mt-6 pt-6 border-t border-border">
            <Link
              to="/logout"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </SlideIn>

        <SlideIn delay={(items.length + 1) * 0.05} direction="left" className="w-full">
          <div className="mt-6 pt-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <PlusCircle className="h-4 w-4" /> Create New Task
            </Button>
          </div>
        </SlideIn>
      </div>
    </FadeIn>
  );
}
