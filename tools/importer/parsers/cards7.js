/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (must be exactly one column)
  const headerRow = ['Cards (cards7)'];

  // Get all immediate children (the cards)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Each card is a div with an image inside
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return null;

    // Try to get text content from alt attribute
    let textContent = img.getAttribute('alt') || '';
    textContent = textContent.trim();
    if (!textContent) textContent = 'Card';

    // Structure the text as a heading (title)
    const heading = document.createElement('h3');
    heading.textContent = textContent;

    return [img, heading];
  }).filter(Boolean);

  // Compose the table rows
  const tableRows = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
