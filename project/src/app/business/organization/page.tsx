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

const integrations = [
  { id: 'stripe', name: 'Stripe', description: 'Cards, Apple Pay, Google Pay', status: 'connected' },
  { id: 'paypal', name: 'PayPal', description: 'Fast, secure online checkout', status: 'disconnected' },
  { id: 'momo', name: 'MoMo', description: 'Digital e-wallet in Vietnam', status: 'coming_soon' },
];

export default function MyOrganization() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[var(--text-primary)]">Organization Workspace</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage your brand identity, domains, and payment integrations.
        </p>
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
                    className="w-full h-11 px-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] text-sm font-bold text-[var(--text-primary)] focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all"
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
                       className="flex-1 h-11 px-4 rounded-r-xl bg-[var(--bg-muted)] border border-[var(--border)] text-sm font-bold text-[var(--text-primary)] focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all"
                    />
                 </div>
              </div>
              <div className="pt-2">
                 <Button variant="primary" size="sm">Save Branding</Button>
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
           <Button variant="outline" size="sm">Add Custom Domain</Button>
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
