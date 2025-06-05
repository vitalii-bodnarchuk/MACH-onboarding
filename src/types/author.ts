import { Document } from "@contentful/rich-text-types";

export type Asset = {
  sys: {
    id: string;
  };
  title: string;
  description?: string;
  url: string;
  width?: number;
  height?: number;
};

export type Author = {
  sys: {
    id: string;
  };
  name: string;
  slug: string;
  bio: {
    json: Document;
  };
  avatar: Asset;
  email?: string;
  jobTitle: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
};

export type AuthorsResponse = {
  authorCollection: {
    items: Author[];
  };
};

export type AuthorResponse = {
  authorCollection: {
    items: Author[];
  };
};
