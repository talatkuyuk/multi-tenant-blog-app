"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { rootDomain, protocol } from "@/lib/utils";
import styles from "./not-found.module.css";

export default function NotFound() {
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/subdomain/")) {
      const extractedSubdomain = pathname.split("/")[2];
      if (extractedSubdomain) {
        setSubdomain(extractedSubdomain);
      }
    } else {
      const hostname = window.location.hostname;
      if (hostname.includes(`.${rootDomain.split(":")[0]}`)) {
        const extractedSubdomain = hostname.split(".")[0];
        setSubdomain(extractedSubdomain);
      }
    }
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.textCenter}>
        <h1 className={styles.title}>
          {subdomain ? (
            <>
              <span className={styles.highlight}>{subdomain}</span>.{rootDomain}{" "}
              doesn't exist
            </>
          ) : (
            "Subdomain Not Found"
          )}
        </h1>
        <p className={styles.description}>
          This subdomain hasn't been created yet.
        </p>
        <div className={styles.buttonWrapper}>
          <Link href={`${protocol}://${rootDomain}`} className={styles.button}>
            {subdomain ? `Create ${subdomain}` : `Go to ${rootDomain}`}
          </Link>
        </div>
      </div>
    </div>
  );
}
