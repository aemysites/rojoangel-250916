/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row for Cards block (must be a single cell)
  const headerRow = ['Cards (cards17)'];

  // Get all immediate child divs (each card)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows: each card is a row with [image, text]
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;

    // Use the image alt as the card title
    let title = img.alt && img.alt.trim() ? img.alt.trim() : '';
    // No other text content in the source html, so only use the title
    let textCell = document.createElement('div');
    if (title) {
      const heading = document.createElement('h3');
      heading.textContent = title;
      textCell.appendChild(heading);
    }
    // If there is other text content in the cardDiv, add it below the heading
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const desc = document.createElement('p');
        desc.textContent = node.textContent.trim();
        textCell.appendChild(desc);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        const desc = document.createElement('p');
        desc.textContent = node.textContent.trim();
        textCell.appendChild(desc);
      }
    });
    return [img, textCell];
  }).filter(Boolean);

  // Compose table cells: header row (single cell), then card rows (2 cells)
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
