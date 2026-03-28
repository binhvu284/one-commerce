'use client';

import { 
  Building2, 
  Globe, 
  CreditCard, 
  ChevronRight, 
  Upload, 
  Layout, 
  ToggleLeft,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import { useBusinessRole } from '@/components/providers/RoleProvider';

const integrations = [
  { id: 'stripe', name: 'Stripe', description: 'Cards, Apple Pay, Google Pay', status: 'connected' },
  { id: 'paypal', name: 'PayPal', description: 'Fast, secure online checkout', status: 'disconnected' },
  { id: 'momo', name: 'MoMo', description: 'Digital e-wallet in Vietnam', status: 'coming_soon' },
];

export default function MyOrganization() {
  const { role, isAdmin, isOwner, isStaff } = useBusinessRole();

  const MOCK_OWNER = {
    name: 'Alex Rivera',
    email: 'alex@onecommerce.com',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    joinedDate: 'Jan 12, 2024'
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Organization Workspace</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">
            Manage your brand identity, domains, and payment integrations.
          </p>
        </div>
        {isStaff && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Read-only Access</span>
          </div>
        )}
      </div>

      {/* Owner Information Section */}
      <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Building2 className="w-24 h-24 -mr-12 -mt-12" />
         </div>
         <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Owner Account Information</h3>
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-white/20 p-0.5 border border-white/20">
                  <img src={MOCK_OWNER.avatar} alt={MOCK_OWNER.name} className="w-full h-full object-cover rounded-[14px]" />
               </div>
               <div className="flex-1">
                  <div className="flex items-center gap-3">
                     <h4 className="text-xl font-black">{MOCK_OWNER.name}</h4>
                     <Badge variant="neutral" className="bg-white/20 text-white border-transparent text-[8px] uppercase font-black px-2">Owner</Badge>
                  </div>
                  <p className="text-xs text-blue-100 font-medium mt-1">{MOCK_OWNER.email}</p>
               </div>
               <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Created At</p>
                  <p className="text-xs font-bold">{MOCK_OWNER.joinedDate}</p>
               </div>
            </div>
         </div>
      </div>

      {/* Brand Profile */}
      <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-token-sm">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">Brand Identity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           <div className="md:col-span-1 border-r border-dashed border-[var(--border)] pr-10">
              <div className="w-full aspect-square rounded-2xl bg-[var(--bg-muted)] border-2 border-dashed border-[var(--border)] hover:border-violet-500/50 transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer group">
                 <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-violet-500" />
                 </div>
                 <p className="text-xs font-bold text-[var(--text-primary)]">Upload Logo</p>
                 <p className="text-[10px] text-[var(--text-muted)] mt-1 font-medium">PNG, JPG up to 2MB</p>
              </div>
           </div>
           <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Organization Name</label>
                 <input 
                    type="text" 
                    defaultValue="BeautyHub Vietnam"
                    disabled={isStaff}
                    className="w-full h-11 px-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] text-sm font-bold text-[var(--text-primary)] focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Store URL / Slug</label>
                 <div className="flex">
                    <div className="h-11 px-3 flex items-center bg-[var(--bg-muted)] border border-[var(--border)] border-r-0 rounded-l-xl text-xs font-bold text-[var(--text-muted)]">
                       beautyhub.onecommerce.io/
                    </div>
                    <input 
                       type="text" 
                       defaultValue="vietnam"
                       disabled={isStaff}
                       className="flex-1 h-11 px-4 rounded-r-xl bg-[var(--bg-muted)] border border-[var(--border)] text-sm font-bold text-[var(--text-primary)] focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                 </div>
              </div>
              <div className="pt-2">
                 <Button variant="primary" size="sm" disabled={isStaff}>Save Branding</Button>
              </div>
           </div>
        </div>
      </div>

      {/* Domain Settings */}
      <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-token-sm">
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/5 flex items-center justify-center border border-indigo-500/10">
                 <Globe className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                 <h2 className="text-lg font-bold text-[var(--text-primary)] leading-tight">Domain Management</h2>
                 <p className="text-[11px] text-[var(--text-muted)] font-medium">Control your shop's public web address.</p>
              </div>
           </div>
           {!isStaff && <Button variant="outline" size="sm">Add Custom Domain</Button>}
        </div>
        
        <div className="space-y-3">
           <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">beautyhub-vn.store</p>
                    <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Primary Domain</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <Badge variant="success">Active</Badge>
                 <button className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
           </div>

           <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-muted)]/50 border border-[var(--border)] group">
              <div className="flex items-center gap-3 opacity-50">
                 <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-slate-500" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">beautyhub.onecommerce.io</p>
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest italic leading-none mt-0.5">Subdomain (System default)</p>
                 </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-[10px] py-0 px-3 opacity-50 hover:opacity-100">Make Primary</Button>
           </div>
        </div>
      </div>

      {/* Payment Mappings */}
      <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-token-sm">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 rounded-2xl bg-amber-500/5 flex items-center justify-center border border-amber-500/10">
              <CreditCard className="w-5 h-5 text-amber-500" />
           </div>
           <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] leading-tight">Payment Gateways</h2>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">Configure how you receive payments from customers.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {integrations.map(i => (
             <div key={i.id} className={cn(
               "p-4 rounded-[2rem] border transition-all relative overflow-hidden group",
               i.status === 'connected' 
                 ? "bg-slate-900 border-violet-500/30" 
                 : "bg-[var(--bg-muted)]/30 border-transparent hover:border-[var(--border)] grayscale"
             )}>
                <div className="relative z-10">
                   <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition-transform">
                         {i.id === 'stripe' ? <Layout className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                      </div>
                      <Badge variant={i.status === 'connected' ? 'success' : i.status === 'coming_soon' ? 'neutral' : 'warning'}>
                         {i.status === 'connected' ? 'Live' : i.status === 'coming_soon' ? 'Upcoming' : 'Setup Required'}
                      </Badge>
                   </div>
                   <h3 className="font-bold text-white mb-1">{i.name}</h3>
                   <p className="text-[11px] text-slate-500 font-medium mb-6 leading-relaxed">
                      {i.description}
                   </p>
                   <Button 
                      variant={i.status === 'connected' ? 'outline' : 'primary'} 
                      size="sm" 
                      className="w-full h-10 text-[11px]"
                      disabled={isStaff && i.status !== 'connected'}
                   >
                      {i.status === 'connected' ? 'View Dashboard' : 'Connect Account'}
                   </Button>
                </div>
                {i.status === 'connected' && (
                  <div className="absolute inset-0 bg-violet-600/5 blur-3xl rounded-full translate-x-1/2 -z-10" />
                )}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
