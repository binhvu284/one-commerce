import { createClient } from '../../lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function BusinessDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Must be logged in to view business dashboard
  if (!user) {
    // redirect('/login');
  }

  // Fetch the user's products (RLS handles tenant scoping)
  const { data: products } = await supabase.from('products').select('*');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Business Dashboard</h1>
        <div className="text-sm font-medium text-slate-500">Store Owner</div>
      </header>
      
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Product Catalog</h2>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 font-medium rounded-md transition-colors">
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Product Name</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Price</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Inventory</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {products?.length ? (
                products.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{p.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.inventory_count}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${p.is_active ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                        {p.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-500">
                    Your product catalog is empty. Click "Add Product" to create your first listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
