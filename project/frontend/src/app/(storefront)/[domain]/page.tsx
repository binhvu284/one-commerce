import { createClient } from '../../../lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function StorefrontPage({ params }: { params: { domain: string } }) {
  const supabase = createClient();
  const slug = params.domain;

  // Find the tenant by slug
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!tenant) {
    notFound();
  }

  // Find active products for this tenant
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('tenant_id', tenant.id)
    .eq('is_active', true);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <header className="border-b border-slate-100 px-6 py-8 md:px-12 md:py-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter">{tenant.name}</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Products</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
          </nav>
          <button className="bg-black text-white px-5 py-2.5 text-sm font-medium rounded-full hover:bg-slate-800 transition-colors">
            Cart (0)
          </button>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-6 py-16 md:px-12 md:py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tighter mb-4">Latest Arrivals</h2>
          <p className="text-slate-500 text-lg">Discover our premium selection of curated products.</p>
        </div>

        {products?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="w-full aspect-square bg-slate-100 rounded-2xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-200/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-full shadow-sm shadow-black/5 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      Quick Add
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-slate-500 text-sm mb-3 line-clamp-2">{p.description || 'Premium product quality.'}</p>
                  <div className="font-medium text-slate-900">${p.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Check back soon</h3>
            <p className="text-slate-500">This store doesn't have any products available yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
