
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const isAuthenticated = false; // Replace with your auth logic
  const user = null; // Replace with your user data
  
  // Demo user data for UI development
  const demoUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin' as const,
  };

  const isLandingPage = location.pathname === '/';
  
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          user={demoUser} 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />

        <div className="flex flex-1 pt-16">
          {isAuthenticated && !isLandingPage && (
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              user={demoUser}
            />
          )}

          <main 
            className={cn(
              "flex-1 transition-all duration-300 ease-in-out",
              isAuthenticated && !isLandingPage && !isMobile && "ml-64",
              isLandingPage && "px-0"
            )}
          >
            {children}
          </main>
        </div>

        <Toaster />
        <Sonner />
      </div>
    </TooltipProvider>
  );
}
