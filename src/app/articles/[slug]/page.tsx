import {
  GET_ARTICLE_BY_SLUG_QUERY,
  fetchContentfulGraphQL,
} from "@/services/contentful.service";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/backButton/BackButton";
import Tags from "@/components/tags/tags";
import styles from "../article.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: `Article: ${slug}` };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchContentfulGraphQL(GET_ARTICLE_BY_SLUG_QUERY, {
    slug,
  });

  const article = data.articlesCollection.items[0];
  if (!article) return notFound();

  return (
    <main>
      <BackButton />
      <h1 className={styles.articlesTitle}>{article.title}</h1>
      {article.author?.name && (
        <p style={{ color: "#666" }}>By {article.author.name}</p>
      )}
      {article.publishedDate && (
        <p>{new Date(article.publishedDate).toLocaleDateString()}</p>
      )}

      {article.featuredMedia && (
        <div className={styles.heroWrapper}>
          <Image
            src={article.featuredMedia.url}
            alt={article.featuredMedia.title}
            layout="responsive"
            height={600}
            width={1200}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            className={styles.heroImage}
          />
        </div>
      )}

      <article className={styles.article}>
        {documentToReactComponents(article.content?.json)}
      </article>
      {article.tags && <Tags tags={article.tags} />}
    </main>
  );
}
