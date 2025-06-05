import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
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
        {content.image && (
          <div className={styles.heroWrapper}>
            <Image
              src={content.image.url}
              alt={content.image.description || content.image.title}
              width={1200}
              layout="responsive"
              height={600}
              className={styles.heroImage}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        )}

        <h1 className={styles.title}>{content.title}</h1>

        {content.subtitle && (
          <h2 className={styles.subtitle}>{content.subtitle}</h2>
        )}

        <div className={styles.description}>
          {documentToReactComponents(content.description.json)}
        </div>
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
