import PostList from "@/components/postList/PostList";
import styles from "./postPage.module.scss";

const PostPage = () => {
  return (
    <main className={styles.postsWrapper}>
      <h1 className={styles.pageTitle}>Posts</h1>
      <PostList />
    </main>
  );
};

export default PostPage;
