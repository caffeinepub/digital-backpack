import LoginButton from '../auth/LoginButton';

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
}

export default function AppShell({ children, userName }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div 
        className="fixed inset-0 opacity-[0.02] bg-repeat pointer-events-none"
        style={{ backgroundImage: 'url(/assets/generated/backpack-pattern.dim_1600x900.png)' }}
      />
      
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/backpack-logo.dim_512x512.png" 
              alt="Digital Backpack" 
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-lg font-bold">Digital Backpack</h1>
              {userName && (
                <p className="text-xs text-muted-foreground">Welcome, {userName}</p>
              )}
            </div>
          </div>
          <LoginButton />
        </div>
      </header>

      <main className="container py-6 relative z-10">
        {children}
      </main>

      <footer className="border-t mt-12 py-6 bg-background/95 backdrop-blur">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} · Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'digital-backpack'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
