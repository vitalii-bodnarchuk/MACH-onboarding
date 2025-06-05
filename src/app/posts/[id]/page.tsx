import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/services/posts.service";
import styles from "./postDetail.module.scss";
import { Metadata } from "next";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `Post ${id}`,
  };
};

const PostDetailPage = async ({ params }: PostPageProps) => {
  const { id } = await params;

  const post = await getPostById(id);

  if (!post) return notFound();

  return (
    <main className={styles.wrapper}>
      <Link href="/posts" className="button">
        Back to posts
      </Link>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <p className={styles.postBody}>{post.body}</p>
    </main>
  );
};

export default PostDetailPage;
