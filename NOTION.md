# Notion Integration Setup Guide

## Prerequisites
- Notion account
- Notion integration token
- Database setup in Notion

## Environment Variables
Required variables in `.env`:

env
NOTION_TOKEN=your_integration_token
NOTION_DATABASE_ID=your_database_id


## Setting Up Notion Integration

1. Create a new integration at https://www.notion.so/my-integrations
   - Give it a name (e.g., "My Blog Integration")
   - Choose the workspace where your content lives
   - Copy the "Internal Integration Token"

2. Share your database with the integration
   - Open your Notion database
   - Click "..." in the top right corner
   - Click "Add connections"
   - Find and select your integration

3. Get your database ID
   - Open your database in full page view
   - Copy the ID from the URL:
   ```
   https://www.notion.so/workspace/{DATABASE_ID}?v=...
   ```

## Required Database Properties

Your Notion database should have these properties:
- `Title` (title): Post title
- `Slug` (text): URL-friendly version of the title
- `Date` (date): Publication date
- `Categories` (multi-select): Post categories
- `Published` (checkbox): Whether the post is ready to show
- `Showcase` (files & media): Featured image for the post

## Troubleshooting

### Common Issues:
1. "Could not find database"
   - Verify your database ID is correct
   - Check that the integration has access to the database
   - Ensure the database is properly shared

2. "Invalid token"
   - Verify your NOTION_TOKEN in .env
   - Check if token has expired
   - Regenerate token if needed

3. Content not showing
   - Check if page is marked as Published
   - Verify all required properties exist
   - Clear Astro cache and rebuild

4. Images not loading
   - Ensure Showcase images are publicly accessible
   - Check image URLs are valid
   - Verify image permissions in Notion

## Development Tips

1. Testing integration:
typescript
// Test your connection
const response = await notion.databases.query({
database_id: process.env.NOTION_DATABASE_ID
});
console.log(response);


2. Debugging content:
typescript
// Log the raw content
console.log(JSON.stringify(thought, null, 2));


3. Remember to:
   - Keep your integration token secure
   - Handle rate limits appropriately
   - Cache responses when possible
   - Handle all required properties