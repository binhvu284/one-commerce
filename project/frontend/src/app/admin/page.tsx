"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Building2, Users, CreditCard, Activity, ArrowRight, Store, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  {
    title: "Total Organizations",
    value: "2,543",
    icon: Building2,
    trend: "+12.5%",
    trendUp: true,
  },
  {
    title: "Active Users",
    value: "45,231",
    icon: Users,
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "Monthly Revenue",
    value: "$124,500",
    icon: CreditCard,
    trend: "+24.1%",
    trendUp: true,
  },
  {
    title: "System Status",
    value: "99.9%",
    icon: Activity,
    trend: "All systems operational",
    trendUp: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to the OneCommerce Administration Panel.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trendUp && stat.title !== 'System Status' ? 'text-green-500' : 'text-muted-foreground'} mt-1`}>
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
            <CardDescription>
              Organization onboarding and user growth over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-muted/20 rounded-md border border-dashed flex items-center justify-center text-muted-foreground">
              [Chart Component Mockup - Replace with Recharts]
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>
              Navigate directly to environment interfaces.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/business" className="block group">
              <div className="flex items-center justify-between rounded-lg border p-4 transition-all hover:border-primary hover:shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Business UI</h4>
                    <p className="text-sm text-muted-foreground">Manage products & orders</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link href="/store" className="block group">
              <div className="flex items-center justify-between rounded-lg border p-4 transition-all hover:border-primary hover:shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Customer UI</h4>
                    <p className="text-sm text-muted-foreground">Browse and shop</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
