import { NextResponse } from "next/server";
import {
  GET_ARTICLES_QUERY,
  fetchContentfulGraphQL,
} from "@/services/contentful.service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const skip = parseInt(url.searchParams.get("skip") || "0");
    const limit = parseInt(url.searchParams.get("limit") || "1");

    const data = await fetchContentfulGraphQL(GET_ARTICLES_QUERY, {
      skip,
      limit,
    });

    return NextResponse.json({
      articles: data.articlesCollection.items,
      total: data.articlesCollection.total,
      hasMore: skip + limit < data.articlesCollection.total,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
