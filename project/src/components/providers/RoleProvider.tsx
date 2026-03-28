'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export type BusinessRole = 'OWNER' | 'ADMIN' | 'STAFF';

interface RoleContextType {
  role: BusinessRole;
  setRole: (role: BusinessRole) => void;
  isOwner: boolean;
  isAdmin: boolean;
  isStaff: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

function RoleProviderContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<BusinessRole>('OWNER');

  useEffect(() => {
    const roleParam = searchParams.get('role')?.toUpperCase() as BusinessRole;
    if (roleParam && ['OWNER', 'ADMIN', 'STAFF'].includes(roleParam)) {
      setRole(roleParam);
    }
  }, [searchParams]);

  const value = {
    role,
    setRole,
    isOwner: role === 'OWNER',
    isAdmin: role === 'ADMIN' || role === 'OWNER',
    isStaff: role === 'STAFF',
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <RoleProviderContent>
        {children}
      </RoleProviderContent>
    </Suspense>
  );
}

export function useBusinessRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useBusinessRole must be used within a RoleProvider');
  }
  return context;
}
