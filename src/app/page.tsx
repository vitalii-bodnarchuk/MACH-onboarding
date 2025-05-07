import Link from "next/link";
import { fetchHomepageContent } from "@/services/homepage.service";
import styles from "./page.module.scss";

const HomePage = async () => {
  try {
    const content = await fetchHomepageContent();

    if (!content) {
      return (
        <main className={styles.wrapper}>Failed to load homepage content.</main>
      );
    }

    return (
      <main className={styles.wrapper}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.description}>{content.description}</p>
        <Link href={content.linkTarget} className="button">
          {content.linkLabel}
        </Link>
      </main>
    );
  } catch (error) {
    console.error("Error loading homepage content:", error);
    return (
      <main className={styles.wrapper}>
        Something went wrong while loading content.
      </main>
    );
  }
};

export default HomePage;
