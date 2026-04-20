import { CustomerNavbar } from '@/components/customer/Navbar';
import { CustomerFooter } from '@/components/customer/Footer';
import { PromoStrip } from '@/components/customer/PromoStrip';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      <PromoStrip />
      <CustomerNavbar />
      <main className="pt-16">
        {children}
      </main>
      <CustomerFooter />
    </div>
  );
}
