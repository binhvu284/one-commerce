import { Sidebar } from '@/components/business/Sidebar';
import { Header } from '@/components/admin/Header'; // Reusing admin header for MVP consistency
import { SidebarProvider } from '@/components/providers/SidebarProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { RoleProvider } from '@/components/providers/RoleProvider';

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <RoleProvider>
          <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </RoleProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
