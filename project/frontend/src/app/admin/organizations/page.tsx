"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, Search, Filter, MoreVertical, ShieldCheck, ShieldAlert, Eye, Power, PowerOff } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { DropdownMenu, DropdownMenuItem } from "../../../components/ui/DropdownMenu";

// Mock Data
type OrganizationStatus = "Active" | "Inactive" | "Suspended";

interface Organization {
  id: string;
  name: string;
  domain: string;
  plan: string;
  status: OrganizationStatus;
  users: number;
  joinedAt: string;
}

const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "org_1",
    name: "Acme Corp",
    domain: "acme.onecommerce.com",
    plan: "Enterprise",
    status: "Active",
    users: 145,
    joinedAt: "2023-11-12",
  },
  {
    id: "org_2",
    name: "TechNova Solutions",
    domain: "technova.onecommerce.com",
    plan: "Pro",
    status: "Active",
    users: 42,
    joinedAt: "2024-01-05",
  },
  {
    id: "org_3",
    name: "Global Retailers",
    domain: "globalretail.onecommerce.com",
    plan: "Basic",
    status: "Inactive",
    users: 12,
    joinedAt: "2024-02-28",
  },
  {
    id: "org_4",
    name: "Stellar Boutique",
    domain: "stellar.onecommerce.com",
    plan: "Pro",
    status: "Suspended",
    users: 8,
    joinedAt: "2024-03-10",
  },
  {
    id: "org_5",
    name: "Zenith Marketing",
    domain: "zenith.onecommerce.com",
    plan: "Enterprise",
    status: "Active",
    users: 210,
    joinedAt: "2023-08-22",
  },
];

const StatusBadge = ({ status }: { status: OrganizationStatus }) => {
  switch (status) {
    case "Active":
      return (
        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
          <ShieldCheck className="mr-1 h-3 w-3" />
          Active
        </span>
      );
    case "Inactive":
      return (
        <span className="inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-500 ring-1 ring-inset ring-gray-500/20">
          <Power className="mr-1 h-3 w-3" />
          Inactive
        </span>
      );
    case "Suspended":
      return (
        <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/20">
          <ShieldAlert className="mr-1 h-3 w-3" />
          Suspended
        </span>
      );
  }
};

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrgs = MOCK_ORGANIZATIONS.filter(org => 
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    org.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>
          <p className="text-muted-foreground">
            Manage all business tenants registered on OneCommerce.
          </p>
        </div>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or domain..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">Domain</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Users</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                        {org.name.charAt(0)}
                      </div>
                      <div className="font-medium">{org.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{org.domain}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={org.status} />
                  </td>
                  <td className="px-6 py-4">{org.plan}</td>
                  <td className="px-6 py-4">{org.users}</td>
                  <td className="px-6 py-4 text-muted-foreground">{org.joinedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end">
                      <DropdownMenu
                        trigger={
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        }
                      >
                        <div className="flex flex-col py-1">
                          <Link href={`/admin/organizations/${org.id}`}>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                              View Details
                            </DropdownMenuItem>
                          </Link>
                          {org.status === 'Active' ? (
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <PowerOff className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600 focus:text-green-600">
                              <Power className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                        </div>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrgs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                    No organizations found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
