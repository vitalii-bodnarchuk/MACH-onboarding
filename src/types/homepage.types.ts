import { Document } from "@contentful/rich-text-types";
import { Asset } from "./author";

export type HomepageContent = {
  sys: {
    id: string;
  };
  title: string;
  subtitle?: string;
  description: { json: Document };
  image?: Asset;
};

export type HomepageResponse = {
  machCollection: {
    items: HomepageContent[];
  };
};
