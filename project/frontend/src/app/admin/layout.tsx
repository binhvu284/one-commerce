import { AdminLayout } from "../../components/admin/AdminLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | OneCommerce",
  description: "Manage OneCommerce organizations, users, and settings.",
};

export default function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
