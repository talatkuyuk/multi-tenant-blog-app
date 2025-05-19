import { getAllSubdomains } from "@/lib/subdomains";
import type { Metadata } from "next";
import { AdminDashboard } from "./dashboard";
import { rootDomain } from "@/lib/utils";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Admin Dashboard | ${rootDomain}`,
  description: `Manage subdomains for ${rootDomain}`,
};

export default async function AdminPage() {
  // TODO: You can add authentication here with your preferred auth provider
  const tenants = await getAllSubdomains();

  return (
    <div className={styles.container}>
      <AdminDashboard tenants={tenants} />
    </div>
  );
}
