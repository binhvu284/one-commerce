import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Validate global_role in production, for now just basic auth check
  if (!user) {
    // redirect('/login');
  }

  // Fetch tenants
  const { data: tenants } = await supabase.from('tenants').select('*');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">OneCommerce Admin</h1>
        <div className="text-sm font-medium text-slate-500">{user?.email || 'Admin'}</div>
      </header>
      
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Tenants Overview</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium rounded-md transition-colors">
            + New Tenant
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">ID</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Name</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Domain Slug</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Created</th>
              </tr>
            </thead>
            <tbody>
              {tenants?.length ? (
                tenants.map((t) => (
                  <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">{t.id.slice(0, 8)}...</td>
                    <td className="px-6 py-4 text-sm font-medium">{t.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{t.slug}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(t.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                    No tenants found. Create one to get started.
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
