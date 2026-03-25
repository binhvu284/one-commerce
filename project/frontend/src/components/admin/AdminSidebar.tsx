"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  Store,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShoppingBag,
} from "lucide-react";

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 80;

const NAV_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Organizations",
    icon: Building2,
    href: "/admin/organizations",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

const ENVIRONMENT_LINKS = [
  {
    title: "Business UI",
    icon: Store,
    href: "/business",
  },
  {
    title: "Customer UI",
    icon: ShoppingBag,
    href: "/store",
  },
];

export function AdminSidebar({
  isCollapsed,
  onToggle,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ width: SIDEBAR_WIDTH }}
      animate={{ width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative z-40 h-screen flex-shrink-0 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-full flex-col justify-between overflow-y-auto overflow-x-hidden">
        <div>
          {/* Logo Section */}
          <div className="flex h-16 items-center justify-between px-4 py-4">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="font-bold">O</span>
                  </div>
                  <span className="text-lg font-bold tracking-tight">OneCommerce</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={onToggle}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
            >
              {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <div className="px-3 py-2">
            <div className="space-y-1">
              <p className={cn("px-4 text-xs font-semibold text-muted-foreground transition-all duration-200", isCollapsed && "text-center opacity-0")}>
                OVERVIEW
              </p>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent/80 text-primary" : "text-muted-foreground",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3", isActive && "text-primary")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-4 px-3 py-2">
            <div className="space-y-1">
              <p className={cn("px-4 text-xs font-semibold text-muted-foreground transition-all duration-200", isCollapsed && "text-center opacity-0")}>
                SWITCH ENVIRONMENTS
              </p>
              {ENVIRONMENT_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                    isCollapsed ? "justify-center" : "justify-start"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          <button
            className={cn(
              "flex w-full items-center justify-center rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <LogOut className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
