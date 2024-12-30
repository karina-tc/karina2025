import { Code } from 'astro:components';

function renderRichText(richText: any[], isCodeBlock = false) {
  // For code blocks, just return the plain text without any processing
  if (isCodeBlock) {
    return richText.map(text => text.plain_text).join('');
  }
  
  return richText.map((text: any) => {
    let content = text.plain_text;
    
    // Only process annotations if we're not in a code block
    if (text.annotations?.code) {
      content = content.replace(/`/g, '').trim();
      content = `<code class="notion-inline-code">${content}</code>`;
    }
    
    if (text.annotations) {
      if (text.annotations.bold) content = `<strong>${content}</strong>`;
      if (text.annotations.italic) content = `<em>${content}</em>`;
      if (text.annotations.strikethrough) content = `<del>${content}</del>`;
      if (text.annotations.underline) content = `<u>${content}</u>`;
      if (text.annotations.color !== 'default') {
        content = `<span class="notion-color-${text.annotations.color}">${content}</span>`;
      }
    }

    if (text.href) {
      content = `<a href="${text.href}" class="notion-link">${content}</a>`;
    }

    return content;
  }).join('');
}

export function renderNotionBlock(block: any) {
  switch (block.type) {
    case 'code':
      const code = block.code.rich_text[0].plain_text;
      const language = block.code.language || 'plaintext';
      
      // Use our CodeBlock component via a custom element
      return `<astro-code-block code="${encodeURIComponent(code)}" lang="${language}"></astro-code-block>`;
    
    case 'paragraph':
      return `<p>${renderRichText(block.paragraph.rich_text)}</p>`;
    case 'heading_1':
      return `<h1>${renderRichText(block.heading_1.rich_text)}</h1>`;
    case 'heading_2':
      return `<h2>${renderRichText(block.heading_2.rich_text)}</h2>`;
    case 'heading_3':
      return `<h3>${renderRichText(block.heading_3.rich_text)}</h3>`;
    case 'bulleted_list_item':
      return `<li>${renderRichText(block.bulleted_list_item.rich_text)}</li>`;
    case 'numbered_list_item':
      return `<ol><li>${renderRichText(block.numbered_list_item.rich_text)}</li></ol>`;
    case 'quote':
      return `<blockquote>${renderRichText(block.quote.rich_text)}</blockquote>`;
    case 'callout':
      return `
        <div class="callout ${block.callout.color}">
          ${block.callout.icon?.emoji ? `<span class="callout-icon">${block.callout.icon.emoji}</span>` : ''}
          <div class="callout-content">
            ${renderRichText(block.callout.rich_text)}
          </div>
        </div>
      `;
    case 'image':
      const imageUrl = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
      const caption = block.image.caption?.length ? block.image.caption.map((text: any) => text.plain_text).join('') : '';
      return `
        <figure>
          <img src="${imageUrl}" alt="${caption}" loading="lazy" />
          ${caption ? `<figcaption>${caption}</figcaption>` : ''}
        </figure>
      `;
    case 'divider':
      return `<hr class="notion-hr" />`;
    case 'video':
      if (block.video.type === 'external') {
        // Handle YouTube, Vimeo, etc.
        const videoUrl = block.video.external.url;
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
          const videoId = videoUrl.includes('youtube.com') 
            ? videoUrl.split('v=')[1]
            : videoUrl.split('youtu.be/')[1];
          return `
            <div class="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/${videoId}"
                title="YouTube video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          `;
        } else if (videoUrl.includes('vimeo.com')) {
          const videoId = videoUrl.split('vimeo.com/')[1];
          return `
            <div class="video-wrapper">
              <iframe
                src="https://player.vimeo.com/video/${videoId}"
                title="Vimeo video"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          `;
        }
        // Fallback for other external videos
        return `<video controls src="${videoUrl}" class="video-player"></video>`;
      } else {
        // Handle uploaded videos
        return `<video controls src="${block.video.file.url}" class="video-player"></video>`;
      }
    default:
      console.log('Unhandled block type:', block.type);
      return '';
  }
}

export function renderNotionBlocks(blocks: any[]) {
  let html = '';
  let isInList = false;

  blocks.forEach((block) => {
    if (block.type === 'bulleted_list_item') {
      if (!isInList) {
        html += '<ul class="list-disc list-inside space-y-2">';
        isInList = true;
      }
      html += renderNotionBlock(block);
    } else {
      if (isInList) {
        html += '</ul>';
        isInList = false;
      }
      html += renderNotionBlock(block);
    }
  });

  if (isInList) {
    html += '</ul>';
  }

  return html;
}