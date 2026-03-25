"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Users, CreditCard, Clock, MapPin, Globe, ShieldCheck, Mail, Phone, Edit, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

// Mock Data for single organization
const MOCK_ORG_DETAIL = {
  id: "org_1",
  name: "Acme Corp",
  domain: "acme.onecommerce.com",
  plan: "Enterprise",
  status: "Active",
  users: 145,
  joinedAt: "2023-11-12",
  owner: "Jane Doe",
  email: "jane.doe@acmecorp.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  description: "Leading provider of advanced anvil and rocket solutions for coyotes.",
  billingCycle: "Annually",
  nextBillingDate: "2024-11-12"
};

export default function OrganizationDetailPage({ params }: { params: { id: string } }) {
  // In a real app we'd fetch the data based on params.id
  const org = MOCK_ORG_DETAIL;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/organizations">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary text-xl font-bold">
              {org.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                {org.name}
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Active
                </span>
              </h2>
              <a href={`https://${org.domain}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline hover:text-primary">
                {org.domain}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="destructive">
              Deactivate
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Organization Overview</CardTitle>
              <CardDescription>Key details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm">{org.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Workspace Domain:</span>
                  <span className="text-muted-foreground">{org.domain}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Owner Email:</span>
                  <span className="text-muted-foreground">{org.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span className="text-muted-foreground">{org.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span className="text-muted-foreground">{org.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions performed within the organization.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-1 rounded-full bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New store layout published</p>
                      <p className="text-xs text-muted-foreground">By {org.owner} • {i + 1} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View All Activity</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-3 text-sm focus:outline-none">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Plan Type</span>
                </div>
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {org.plan}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Licensed Users</span>
                </div>
                <span className="font-medium">{org.users}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Next Billing</span>
                </div>
                <span className="font-medium">{org.nextBillingDate}</span>
              </div>
              
              <Button className="w-full mt-2">
                <Settings className="mr-2 h-4 w-4" />
                Manage Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
