import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubdomainData } from "@/lib/subdomains";
import { protocol, rootDomain } from "@/lib/utils";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`,
  };
}

export default async function SubdomainPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.linkTopRight}>
        <Link href={`${protocol}://${rootDomain}`}>{rootDomain}</Link>
      </div>

      <div className={styles.center}>
        <div className={styles.content}>
          <div className={styles.emoji}>{subdomainData.emoji}</div>
          <h1 className={styles.title}>
            Welcome to {subdomain}.{rootDomain}
          </h1>
          <p className={styles.subtitle}>This is your custom subdomain page</p>
        </div>
      </div>
    </div>
  );
}
