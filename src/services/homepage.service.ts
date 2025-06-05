import { HomepageContent, HomepageResponse } from "@/types/homepage.types";
import {
  fetchContentfulGraphQL,
  GET_HOMEPAGE_QUERY,
} from "./contentful.service";

export const fetchHomepageContent =
  async (): Promise<HomepageContent | null> => {
    try {
      const data: HomepageResponse = await fetchContentfulGraphQL(
        GET_HOMEPAGE_QUERY
      );
      return data.machCollection.items[0] || null;
    } catch (error) {
      console.error("Error fetching homepage content:", error);
      return null;
    }
  };
