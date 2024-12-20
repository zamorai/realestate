import { Container } from '@/components/ui/container';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-background-page text-text-primary">
      {/* Navbar will go here */}
      <main className="min-h-screen">
        {children}
      </main>
      {/* Footer will go here */}
    </div>
  );
} 