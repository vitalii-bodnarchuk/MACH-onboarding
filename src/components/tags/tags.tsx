import React from "react";
import styles from "./tags.module.scss";

interface TagsProps {
  tags: string[];
}

export default function Tags({ tags }: TagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.chip}>
          {tag}
        </span>
      ))}
    </div>
  );
}
