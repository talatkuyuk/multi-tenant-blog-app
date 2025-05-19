"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteSubdomainAction } from "@/app/actions";
import { rootDomain, protocol } from "@/lib/utils";
import styles from "./dashboard.module.css";

type Tenant = {
  subdomain: string;
  emoji: string;
  createdAt: number;
};

type DeleteState = {
  error?: string;
  success?: string;
};

function DashboardHeader() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Subdomain Management</h1>
      <div>
        <Link
          href={`${protocol}://${rootDomain}`}
          className={styles.headerLink}
        >
          {rootDomain}
        </Link>
      </div>
    </div>
  );
}

function TenantGrid({
  tenants,
  action,
  isPending,
}: {
  tenants: Tenant[];
  action: (formData: FormData) => void;
  isPending: boolean;
}) {
  if (tenants.length === 0) {
    return (
      <Card>
        <CardContent className={styles.emptyCardContent}>
          <p>No subdomains have been created yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={styles.grid}>
      {tenants.map((tenant) => (
        <Card key={tenant.subdomain}>
          <CardHeader className={styles.cardHeader}>
            <div className={styles.cardHeaderInner}>
              <CardTitle className="text-xl">{tenant.subdomain}</CardTitle>
              <form action={action}>
                <input
                  type="hidden"
                  name="subdomain"
                  value={tenant.subdomain}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  disabled={isPending}
                  className={styles.deleteButton}
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.cardContentRow}>
              <div className={styles.emoji}>{tenant.emoji}</div>
              <div className={styles.created}>
                Created:{" "}
                {new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(
                  new Date(tenant.createdAt)
                )}
              </div>
            </div>
            <div>
              <a
                href={`${protocol}://${tenant.subdomain}.${rootDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visit}
              >
                Visit subdomain →
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AdminDashboard({ tenants }: { tenants: Tenant[] }) {
  const [state, action, isPending] = useActionState<DeleteState, FormData>(
    deleteSubdomainAction,
    {}
  );

  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <TenantGrid tenants={tenants} action={action} isPending={isPending} />

      {state.error && (
        <div className={`${styles.toast} ${styles.toastError}`}>
          {state.error}
        </div>
      )}

      {state.success && (
        <div className={`${styles.toast} ${styles.toastSuccess}`}>
          {state.success}
        </div>
      )}
    </div>
  );
}
