/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows, first row is block name
  // Header row: exactly one column
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Get all direct children (each is a card image container)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // First cell: the image element itself
    const imageCell = img;
    // Second cell: Use all text content except image, as a single block
    let textContent = '';
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') return;
      textContent += node.textContent ? node.textContent.trim() + ' ' : '';
    });
    textContent = textContent.trim();
    if (!textContent) textContent = img.getAttribute('alt') || '';
    rows.push([imageCell, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
