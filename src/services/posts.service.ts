import { Post } from "@/types/posts";

const fetchPosts = async (page: number, limit = 10): Promise<Post[]> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const getPostById = async (id: string): Promise<Post | null> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};

export { fetchPosts, getPostById };
