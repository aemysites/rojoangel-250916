/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all text content from a node
  function getAllTextContent(node) {
    // Collect tag group, heading, paragraphs, and any links
    const fragment = document.createDocumentFragment();
    // Tag group (optional)
    const tagGroup = node.querySelector('.tag-group');
    if (tagGroup) fragment.appendChild(tagGroup.cloneNode(true));
    // Heading (h2/h3/h4)
    const heading = node.querySelector('h2, h3, h4');
    if (heading) fragment.appendChild(heading.cloneNode(true));
    // All paragraphs
    node.querySelectorAll('p').forEach(p => {
      fragment.appendChild(p.cloneNode(true));
    });
    // Any call-to-action links (if present)
    node.querySelectorAll('a').forEach(a => {
      // Only add if not the card wrapper itself
      if (!a.classList.contains('utility-link-content-block')) {
        fragment.appendChild(a.cloneNode(true));
      }
    });
    return fragment;
  }

  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Compose rows for the table
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards2)'];
  rows.push(headerRow);

  // Find all cards with images
  const cardSelectors = [
    'a.utility-link-content-block .utility-aspect-1x1',
    'a.utility-link-content-block .utility-aspect-3x2'
  ];
  // Get all card anchor elements
  const cardAnchors = grid.querySelectorAll('a.utility-link-content-block');
  cardAnchors.forEach(card => {
    // Try to get image from aspect div
    const imgDiv = card.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    const img = imgDiv ? imgDiv.querySelector('img') : null;
    if (img) {
      // Get all text content (tags, heading, paragraphs, cta)
      const textCell = getAllTextContent(card);
      rows.push([img, textCell]);
    }
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
