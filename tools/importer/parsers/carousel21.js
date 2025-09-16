/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row as required
  const headerRow = ['Carousel (carousel21)'];

  // Find the card-body (contains both title and image)
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) cardBody = element;

  // Find the image (mandatory)
  const img = cardBody.querySelector('img');

  // Defensive: If no image, do not create block
  if (!img) return;

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Build the text content cell
  let textCell = '';
  if (heading && heading.textContent.trim()) {
    const h3 = document.createElement('h3');
    h3.textContent = heading.textContent.trim();
    textCell = h3;
  }

  // Compose the table cells
  const cells = [headerRow, [img, textCell || '']];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
