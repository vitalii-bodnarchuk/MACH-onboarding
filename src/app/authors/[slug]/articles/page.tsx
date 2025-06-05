import Link from "next/link";
import {
  fetchContentfulGraphQL,
  GET_ALL_ARTICLES_QUERY,
} from "@/services/contentful.service";
import { Article } from "@/types/articles";
import styles from "../../authors.module.scss";

type AuthorArticlesPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AuthorArticlesPage({
  params,
}: AuthorArticlesPageProps) {
  const { slug } = await params;

  const data = await fetchContentfulGraphQL(GET_ALL_ARTICLES_QUERY);
  const articles = data.articlesCollection.items.filter(
    (article: Article) => article.author?.slug === slug
  );

  return (
    <main>
      <Link href={`/authors/${slug}`} className={styles.backButton}>
        ← Back to Author Profile
      </Link>
      <h1 className={styles.title}>Articles by Author</h1>
      {articles.length === 0 && <p>No articles found for this author.</p>}
      <ul className={styles.articlesList}>
        {articles.map((article: Article) => (
          <li key={article.sys.id} className={styles.listItem}>
            <Link href={`/articles/${article.slug}`}>
              <span className={styles.articleTitle}>{article.title}</span>
            </Link>
            <p>{article.excerpt}</p>
            <small>
              {new Date(article?.publishedDate || "").toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}
