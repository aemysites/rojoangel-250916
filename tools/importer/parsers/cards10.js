/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all card elements (direct children that are links)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  cardLinks.forEach((card) => {
    // Find image container and image
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageContainer) {
      imageEl = imageContainer.querySelector('img');
    }

    // Find text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        // Use the tag element directly if present
        const tag = tagGroup.querySelector('.tag');
        if (tag) {
          textContent.push(tag);
        }
      }
      // Heading (optional)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }
      // Description (optional)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
      // Call-to-action: use the card link itself if it has an href and isn't just '#'
      if (card.href && card.href !== '#' && card.href !== window.location.href) {
        // Use the heading text as CTA if available, otherwise fallback to 'Learn more'
        let ctaText = heading ? heading.textContent.trim() : 'Learn more';
        const cta = document.createElement('a');
        cta.href = card.href;
        cta.textContent = ctaText;
        cta.className = 'card-cta';
        textContent.push(cta);
      }
    }

    // Compose the row: [image, text content]
    rows.push([
      imageEl || '',
      textContent
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
