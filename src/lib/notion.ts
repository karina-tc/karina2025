import { Client } from '@notionhq/client';

const getEnvVar = (key: string): string => {
  // Try import.meta.env first (local development)
  if (import.meta.env[key]) {
    return import.meta.env[key];
  }
  // Fall back to process.env (production/Netlify)
  if (process.env[key]) {
    return process.env[key];
  }
  throw new Error(`Environment variable ${key} is not set`);
};

const notion = new Client({
  auth: getEnvVar('NOTION_API_KEY')
});

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export async function getThoughts() {
  const response = await notion.databases.query({
    database_id: getEnvVar('NOTION_DATABASE_ID'),
    filter: {
      property: 'Status',
      status: {
        equals: 'Live'
      }
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  // Fetch preview content for each thought
  const thoughtsWithContent = await Promise.all(response.results.map(async page => {
    // Fetch first few blocks for preview
    const blocks = await notion.blocks.children.list({
      block_id: page.id,
      page_size: 3 // Fetch first 3 blocks
    });

    // Convert blocks to plain text, excluding headers
    const previewText = blocks.results
      .filter((block: any) => block.type === 'paragraph')
      .map((block: any) => block.paragraph.rich_text.map((text: any) => text.plain_text).join(''))
      .join(' ');

    const { properties } = page as any;
    return {
      title: properties.Title.title[0].plain_text,
      date: formatDate(properties.Date.date.start),
      categories: properties.Categories.multi_select.map((cat: any) => cat.name),
      href: `/thoughts/${properties.Slug.rich_text[0].plain_text}`,
      content: previewText
    };
  }));

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
    showcaseImage = file.type === 'external' ? file.external.url : file.file.url;
  }

  return {
    title: (page as any).properties.Title.title[0].plain_text,
    date: formatDate((page as any).properties.Date.date.start),
    categories: (page as any).properties.Categories.multi_select.map((cat: any) => cat.name),
    content: blocks.results,
    showcase: showcaseImage
  };
}