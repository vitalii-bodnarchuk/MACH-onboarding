import Link from "next/link";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  fetchContentfulGraphQL,
  GET_AUTHORS_QUERY,
} from "@/services/contentful.service";
import { Author } from "@/types/author";
import styles from "./authors.module.scss";

const AuthorsPage = async () => {
  try {
    const data: { authorCollection: { items: Author[] } } =
      await fetchContentfulGraphQL(GET_AUTHORS_QUERY);
    const authors = data.authorCollection.items;

    return (
      <main>
        <h1 className={styles.title}>Our Authors</h1>

        <div className={styles.authorsGrid}>
          {authors.map((author: Author) => (
            <div key={author.sys.id}>
              {author.avatar && (
                <div className={styles.authorAvatar}>
                  <Image
                    src={author.avatar.url}
                    alt={author.name}
                    width={560}
                    className={styles.authorImage}
                    height={400}
                  />
                </div>
              )}

              <div className={styles.authorInfo}>
                <h2 className={styles.authorName}>{author.name}</h2>
                {author.jobTitle && (
                  <p className={styles.jobTitle}>{author.jobTitle}</p>
                )}

                {author.bio && (
                  <div className={styles.bio}>
                    {documentToReactComponents(author.bio.json)}
                  </div>
                )}

                <Link
                  href={`/authors/${author.slug}`}
                  className={`button ${styles.viewProfileButton}`}
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    return <div>Error loading authors</div>;
  }
};

export default AuthorsPage;
