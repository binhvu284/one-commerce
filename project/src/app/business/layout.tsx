import { Sidebar } from '@/components/business/Sidebar';
import { Header } from '@/components/admin/Header'; // Reusing admin header for MVP consistency
import { SidebarProvider } from '@/components/providers/SidebarProvider';

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-[#fafafa] dark:bg-[#09090b]">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
