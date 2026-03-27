import { CustomerNavbar } from '@/components/customer/Navbar';
import { CustomerFooter } from '@/components/customer/Footer';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      <CustomerNavbar />
      <main className="pt-20">
        {children}
      </main>
      <CustomerFooter />
    </div>
  );
}
