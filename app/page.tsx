import Link from "next/link";
import { SubdomainForm } from "./subdomain-form";
import { rootDomain } from "@/lib/utils";
import styles from "./page.module.css";

export default async function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.adminLinkWrapper}>
        <Link href="/admin" className={styles.adminLink}>
          Admin
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.headingGroup}>
          <h1 className={styles.title}>{rootDomain}</h1>
          <p className={styles.subtitle}>
            Create your own subdomain with a custom emoji
          </p>
        </div>

        <div className={styles.formCard}>
          <SubdomainForm />
        </div>
      </div>
    </div>
  );
}
