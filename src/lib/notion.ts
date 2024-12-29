import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getImage } from 'astro:assets';

// Define expected structure of Notion database properties
type NotionProperties = {
  Title: { title: Array<{ plain_text: string }> };
  Date: { date: { start: string } };
  Categories: { multi_select: Array<{ name: string }> };
  Slug: { rich_text: Array<{ plain_text: string }> };
};

// Define shape of processed thought posts for the frontend
export interface ThoughtPost {
  title: string;
  date: string;
  categories: string[];
  href: string;
  content: string;
}

// Helper to safely get environment variables
const getEnvVar = (key: string): string => {
  if (import.meta.env[key]) return import.meta.env[key];
  if (process.env[key]) return process.env[key];
  throw new Error(`Environment variable ${key} is not set`);
};

// Cache configuration to minimize API calls
const CACHE_DURATION = 60 * 1000; // 1 minute
const cache = new Map();

// Initialize Notion client
const notion = new Client({
  auth: getEnvVar('NOTION_API_KEY')
});

// Format dates consistently
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Main function to fetch and process thoughts from Notion
export async function getThoughts(): Promise<ThoughtPost[]> {
  const cacheKey = 'thoughts-list';
  
  // Return cached data if valid
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch live posts from Notion
  const response = await notion.databases.query({
    database_id: getEnvVar('NOTION_DATABASE_ID'),
    filter: {
      property: 'Status',
      status: { equals: 'Live' }
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  });

  // Process each post
  const pages = response.results as PageObjectResponse[];
  const thoughtsWithContent = await Promise.all(pages.map(async page => {
    // Get preview content from first few blocks
    const blocks = await notion.blocks.children.list({
      block_id: page.id,
      page_size: 3
    });

    // Extract and format preview text
    const previewText = blocks.results
      .filter((block: any) => block.type === 'paragraph')
      .map((block: any) => block.paragraph.rich_text
        .map((text: any) => text.plain_text)
        .join('')
      )
      .join(' ')
      .slice(0, 200);

    // Extract and format post metadata
    const { properties } = page as unknown as { properties: NotionProperties };
    return {
      title: properties.Title.title[0].plain_text,
      date: formatDate(properties.Date.date.start),
      categories: properties.Categories.multi_select.map(cat => cat.name),
      href: `/thoughts/${properties.Slug.rich_text[0].plain_text}`,
      content: previewText
    };
  }));

  // Cache results
  cache.set(cacheKey, {
    data: thoughtsWithContent,
    timestamp: Date.now()
  });

  return thoughtsWithContent;
}

export async function getThoughtContent(slug: string) {
  // First find the page ID by slug
  const response = await notion.databases.query({
    database_id: getEnvVar('NOTION_DATABASE_ID'),
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug
      }
    }
  });

  if (!response.results.length) {
    return null;
  }

  const page = response.results[0];
  const blocks = await notion.blocks.children.list({
    block_id: page.id
  });

  // Get the showcase image URL, handling both uploaded and external files
  const showcaseProperty = (page as any).properties.showcase;
  let showcaseImage = null;

  if (showcaseProperty?.files?.length > 0) {
    const file = showcaseProperty.files[0];
    // Handle both internal Notion files and external URLs
    const imageUrl = file.type === 'external' ? file.external.url : file.file.url;
    
    try {
      // Optimize and cache the image
      const optimizedImage = await getImage({
        src: imageUrl,
        width: 1200,
        height: 630,
        format: 'webp', // Convert to WebP for better compression
      });
      showcaseImage = optimizedImage.src;
    } catch (error) {
      console.error('Error optimizing image:', error);
      showcaseImage = imageUrl; // Fallback to original URL if optimization fails
    }
  }

  return {
    title: (page as any).properties.Title.title[0].plain_text,
    date: formatDate((page as any).properties.Date.date.start),
    categories: (page as any).properties.Categories.multi_select.map((cat: any) => cat.name),
    content: blocks.results,
    showcase: showcaseImage
  };
}