import {
  fetchContentfulGraphQL,
  GET_AUTHOR_BY_SLUG_QUERY,
} from "@/services/contentful.service";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../authors.module.scss";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AuthorDetailPage(props: AuthorPageProps) {
  const { slug } = await props.params;

  const data = await fetchContentfulGraphQL(GET_AUTHOR_BY_SLUG_QUERY, { slug });
  const author = data.authorCollection.items[0];
  if (!author) return notFound();

  return (
    <main>
      <Link href="/authors" className={styles.backButton}>
        ← Move to Authors
      </Link>

      <div className={styles.authorWrapper}>
        {author.avatar && (
          <div className={styles.authorAvatar}>
            <Image
              src={author.avatar.url}
              alt={author.avatar.title}
              width={150}
              height={150}
              className={styles.authorAvatarImage}
            />
          </div>
        )}
        <h1>{author.name}</h1>
        {author.jobTitle && (
          <p className={styles.jobTitle}>{author.jobTitle}</p>
        )}
      </div>

      {author.bio && (
        <div className={styles.bio}>
          {documentToReactComponents(author.bio.json)}
        </div>
      )}

      <div className={styles.socialWrapper}>
        <h3>Connect with {author.name}</h3>
        <div className={styles.socialLinks}>
          {author.email && (
            <a href={`mailto:${author.email}`} className={"button"}>
              Email
            </a>
          )}
          {author.socialLinks?.twitter && (
            <a
              href={author.socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              Twitter
            </a>
          )}
          {author.socialLinks?.instagram && (
            <a
              href={author.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              Instagram
            </a>
          )}

          <Link href={`/authors/${author.slug}/articles`} className="button">
            View Articles by {author.name}
          </Link>
        </div>
      </div>
    </main>
  );
}
