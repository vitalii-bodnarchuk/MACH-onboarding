import ArticlesList from "@/components/articleList/articleList";
import {
  GET_ARTICLES_QUERY,
  fetchContentfulGraphQL,
} from "@/services/contentful.service";
import styles from "./article.module.scss";

export default async function ArticlesPage() {
  const data = await fetchContentfulGraphQL(GET_ARTICLES_QUERY, {
    limit: 1,
    skip: 0,
  });

  const articles = data.articlesCollection.items;
  const total = data.articlesCollection.total;

  return (
    <main>
      <h1 className={styles.articlesTitle}>Articles</h1>
      <ArticlesList initialArticles={articles} initialTotal={total} />
    </main>
  );
}
