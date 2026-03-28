'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type BusinessRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'STAFF';

interface RoleContextType {
  role: BusinessRole;
  setRole: (role: BusinessRole) => void;
  isOwner: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isStaff: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  // Default to OWNER for initial dev, but in real app would fetch from Supabase
  const [role, setRole] = useState<BusinessRole>('OWNER');

  const value = {
    role,
    setRole,
    isOwner: role === 'OWNER',
    isAdmin: role === 'ADMIN' || role === 'OWNER',
    isManager: role === 'MANAGER' || role === 'ADMIN' || role === 'OWNER',
    isStaff: role === 'STAFF',
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function useBusinessRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useBusinessRole must be used within a RoleProvider');
  }
  return context;
}
