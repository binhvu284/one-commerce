'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { BusinessUser, BusinessRole, Permission } from '@/lib/types/business';
import { mockPermissions } from '@/lib/mock/business';
import { Shield, Check, Info } from 'lucide-react';
import { cn } from '@/lib/cn';

interface RoleModalProps {
  user: BusinessUser | null;
  open: boolean;
  onClose: () => void;
  onSave: (userId: string, role: BusinessRole, permissions: string[]) => void;
}

export function RoleModal({ user, open, onClose, onSave }: RoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<BusinessRole>('staff');
  const [enabledPermissions, setEnabledPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
      setEnabledPermissions(user.permissions);
    }
  }, [user]);

  if (!user) return null;

  const roles: { id: BusinessRole; title: string; desc: string }[] = [
    { id: 'owner', title: 'Owner', desc: 'Full access to everything including billing and deletion.' },
    { id: 'admin', title: 'Admin', desc: 'Can manage most settings and users, but can\'t delete organization.' },
    { id: 'manager', title: 'Manager', desc: 'Can manage products, orders and view basic reports.' },
    { id: 'staff', title: 'Staff', desc: 'Limited access, mainly for order fulfillment and support.' },
  ];

  const handleTogglePermission = (id: string) => {
    setEnabledPermissions(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const categories = Array.from(new Set(mockPermissions.map(p => p.category)));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit Permissions: ${user.name}`}
      description="Update security roles and granular access levels for this team member."
      size="lg"
      confirmLabel="Save Changes"
      onConfirm={() => onSave(user.id, selectedRole, enabledPermissions)}
    >
      <div className="space-y-8">
        {/* Role Selection */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-4 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            Base Role
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "flex flex-col text-left p-4 rounded-xl border-2 transition-all group",
                  selectedRole === role.id 
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20" 
                    : "border-[var(--border)] hover:border-[var(--text-muted)]"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "text-sm font-black",
                    selectedRole === role.id ? "text-indigo-600 dark:text-indigo-400" : "text-[var(--text-primary)]"
                  )}>
                    {role.title}
                  </span>
                  {selectedRole === role.id && (
                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{role.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Granular Permissions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
              <Info className="w-3.5 h-3.5" />
              Granular Access
            </h3>
            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded-full">
              {enabledPermissions.length} Enabled
            </span>
          </div>

          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category} className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-widest pl-1 border-l-2 border-indigo-500/30">
                  {category} Management
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mockPermissions
                    .filter(p => p.category === category)
                    .map((p) => (
                      <label 
                        key={p.id}
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-xl border border-[var(--border)] cursor-pointer transition-all hover:bg-[var(--bg-muted)]/30",
                          enabledPermissions.includes(p.id) && "bg-emerald-50/30 border-emerald-500/30"
                        )}
                      >
                        <div className="relative flex items-center mt-0.5">
                          <input
                            type="checkbox"
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[var(--border)] checked:bg-emerald-500 checked:border-emerald-500 transition-all"
                            checked={enabledPermissions.includes(p.id)}
                            onChange={() => handleTogglePermission(p.id)}
                          />
                          <Check className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-[var(--text-primary)]">{p.name}</p>
                          <p className="text-[10px] text-[var(--text-secondary)]">{p.description}</p>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Modal>
  );
}
