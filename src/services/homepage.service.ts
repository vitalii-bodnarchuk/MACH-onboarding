import { HomepageContent } from "@/types/homepageContent.types";
import { contentfulClient } from "./contentful";

const fetchHomepageContent = async (): Promise<HomepageContent | null> => {
  const res = await contentfulClient.getEntries({
    content_type: "homePageContent",
  });

  const raw = res.items[0]?.fields as {
    title: string;
    description: string;
    linkLabel: string;
    linkTarget: string;
  };

  if (!raw) return null;

  return {
    title: raw.title,
    description: raw.description,
    linkLabel: raw.linkLabel,
    linkTarget: raw.linkTarget,
  };
};

export { fetchHomepageContent };
