import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Logo
        </Link>
        <nav className={styles.nav}>
          <Link href="/articles" className={styles.navLink}>
            Articles
          </Link>
          <Link href="/authors" className={styles.navLink}>
            Authors
          </Link>
          <Link href="/posts" className={styles.navLink}>
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
};

export { Header };
