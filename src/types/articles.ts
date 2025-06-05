import { Document } from "@contentful/rich-text-types";

export type Article = {
  sys: { id: string };
  title: string;
  slug: string;
  excerpt: string;
  publishedDate?: string;
  content?: { json: Document };
  tags?: string[];
  featuredMedia?: {
    url: string;
    title: string;
    width?: number;
    height?: number;
  };
  author: {
    name: string;
    slug: string;
  };
};

export interface ArticlesListProps {
  initialArticles: Article[];
  initialTotal: number;
}
