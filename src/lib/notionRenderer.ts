export function renderNotionBlock(block: any) {
  switch (block.type) {
    case 'paragraph':
      return `<p>${block.paragraph.rich_text.map((text: any) => text.plain_text).join('')}</p>`;
    case 'heading_1':
      return `<h1>${block.heading_1.rich_text.map((text: any) => text.plain_text).join('')}</h1>`;
    case 'heading_2':
      return `<h2>${block.heading_2.rich_text.map((text: any) => text.plain_text).join('')}</h2>`;
    case 'heading_3':
      return `<h3>${block.heading_3.rich_text.map((text: any) => text.plain_text).join('')}</h3>`;
    case 'bulleted_list_item':
      return `<li>${block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join('')}</li>`;
    case 'numbered_list_item':
      return `<ol><li>${block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join('')}</li></ol>`;
    case 'quote':
      return `<blockquote>${block.quote.rich_text.map((text: any) => text.plain_text).join('')}</blockquote>`;
    case 'callout':
      return `
        <div class="callout ${block.callout.color}">
          ${block.callout.icon?.emoji ? `<span class="callout-icon">${block.callout.icon.emoji}</span>` : ''}
          <div class="callout-content">
            ${block.callout.rich_text.map((text: any) => text.plain_text).join('')}
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