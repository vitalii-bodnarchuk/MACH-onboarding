"use client";

import Link from "next/link";
import styles from "./postList.module.scss";
import { usePostList } from "./usePostList";

const PostList = () => {
  const { posts, loading, loadMore } = usePostList();

  return (
    <div className={styles.postsWrapper}>
      {posts.map((post) => (
        <article key={post.id} className={styles.postCard}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postExcerpt}>{post.body.slice(0, 100)}...</p>
          <Link href={`/posts/${post.id}`} className={styles.readMore}>
            Read more
          </Link>
        </article>
      ))}

      <div className={styles.loadMoreWrapper}>
        <button
          onClick={loadMore}
          className="button"
          disabled={loading}
          aria-label="Load more posts"
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
};

export default PostList;
