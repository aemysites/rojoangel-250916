/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card anchor
  function extractCardInfo(cardAnchor) {
    // Find the image (mandatory, always first img)
    const img = cardAnchor.querySelector('img');

    // Find the card content container (the div after the img)
    const contentDiv = img.nextElementSibling;

    // Compose the text cell: include ALL content from contentDiv
    // This ensures all text, tags, headings, paragraphs, and CTA are included
    const textCell = document.createElement('div');
    // Clone all children of contentDiv into textCell
    Array.from(contentDiv.children).forEach(child => {
      textCell.appendChild(child.cloneNode(true));
    });

    return [img, textCell];
  }

  // Get all card anchors (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // For each card, extract info and push as a row
  cards.forEach(cardAnchor => {
    rows.push(extractCardInfo(cardAnchor));
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
