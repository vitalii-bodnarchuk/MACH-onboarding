"use client";

import { useEffect, useState, useRef } from "react";
import { Post } from "@/types/posts";
import { fetchPosts } from "@/services/posts.service";

export const usePostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const loadedPages = useRef<Set<number>>(new Set());

  const loadPosts = async (pageToLoad: number) => {
    if (loadedPages.current.has(pageToLoad)) return;

    setLoading(true);
    try {
      const newPosts = await fetchPosts(pageToLoad);
      setPosts((prev) => {
        const combined = [...prev, ...newPosts];
        return Array.from(new Map(combined.map((p) => [p.id, p])).values());
      });
      loadedPages.current.add(pageToLoad);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((p) => p + 1);
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  return {
    posts,
    loading,
    loadMore,
  };
};
