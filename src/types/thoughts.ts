export interface ThoughtBase {
  title: string;
  date: string;
  description?: string;
  href?: string;
}

export interface NotionThought extends ThoughtBase {
  categories: string[];
  showcase?: string;
  readingTime: number;
  content: any; // Define more specific type for Notion blocks
}

export interface MarkdownThought extends ThoughtBase {
  // Add any markdown-specific properties
} 