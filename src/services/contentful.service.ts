import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

const GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

export async function fetchContentfulGraphQL(query: string, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = await response.json();

  if (json.errors) {
    console.error(
      "GraphQL execution errors:",
      JSON.stringify(json.errors, null, 2)
    );
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

export const GET_HOMEPAGE_QUERY = `
  query GetHomepage {
    machCollection(limit: 1) {
      items {
        sys { id }
        title
        subtitle
        description {json}
        image {
          sys { id }
          title
          description
          url
          width
          height
        }
      }
    }
  }
`;

export const GET_AUTHORS_QUERY = `
  query GetAuthors {
    authorCollection {
      items {
        sys { id }
        name
        slug
        bio { json }
        avatar {
          url
          title
          description
          width
          height
        }
        email
        jobTitle
        socialLinks
      }
    }
  }
`;

export const GET_AUTHOR_BY_SLUG_QUERY = `
  query GetAuthorBySlug($slug: String!) {
    authorCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys { id }
        name
        slug
        bio { json }
        avatar {
          url
          title
          description
          width
          height
        }
        email
        jobTitle
        socialLinks
      }
    }
  }
`;

export const GET_ARTICLES_QUERY = `
  query GetArticles($limit: Int = 1, $skip: Int = 0) {
    articlesCollection(order: publishedDate_DESC, limit: $limit, skip: $skip) {
      total  
      items {
        sys { id }
        title
        slug
        excerpt
        publishedDate
        tags
        featuredMedia {
          url
          title
          description
          width
          height
        }
        author {
          ...on Author {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_SLUG_QUERY = `
  query GetArticleBySlug($slug: String!) {
    articlesCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys { id }
        title
        slug
        excerpt
        publishedDate
        content { json }
        tags
        featuredMedia {
          url
          title
          description
          width
          height
        }
        author {
          ...on Author {
            name
          }
        }
      }
    }
  }
`;

export const GET_ALL_ARTICLES_QUERY = `
  query GetAllArticles {
    articlesCollection(order: publishedDate_DESC) {
      items {
        sys { id }
        title
        slug
        excerpt
        publishedDate
        author {
          ... on Author {
            name
            slug
          }
        }
      }
    }
  }
`;
