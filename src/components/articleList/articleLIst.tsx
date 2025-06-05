"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article, ArticlesListProps } from "@/types/articles";
import styles from "./articleList.module.scss";
import Tags from "../tags/tags";

export default function ArticlesList({
  initialArticles,
  initialTotal,
}: ArticlesListProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialArticles.length < initialTotal);

  const loadMoreArticles = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/articles?skip=${articles.length}&limit=1`
      );
      const data = await response.json();

      if (data.articles) {
        setArticles((prev) => [...prev, ...data.articles]);
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error("Error loading more articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ul className={styles.articlesList}>
        {articles.map((article) => (
          <li key={article.sys.id} style={{ marginBottom: "2rem" }}>
            {article.featuredMedia && (
              <div className={styles.heroWrapper}>
                <Image
                  src={article.featuredMedia.url}
                  alt={article.featuredMedia.title}
                  width={1200}
                  layout="responsive"
                  height={600}
                  className={styles.heroImage}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                />
              </div>
            )}
            <h2>{article.title}</h2>
            {article.excerpt && <p>{article.excerpt}</p>}
            {article.tags && <Tags tags={article.tags} />}
            <Link href={`/authors/${article.author.slug}`}>
              {article.author?.name && (
                <>
                  <span className={styles.authorBy}>By</span>
                  <span className={styles.authorName}>
                    {article.author.name}
                  </span>
                </>
              )}
            </Link>

            <Link
              href={`/articles/${article.slug}`}
              className={styles.readMore}
            >
              <p>Read more...</p>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            onClick={loadMoreArticles}
            disabled={loading}
            className={"button"}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
