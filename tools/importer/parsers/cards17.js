/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required (single cell, no colspan)
  const headerRow = ['Cards (cards17)'];

  // Get all immediate child divs (each is a card wrapper with an image)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows: each card gets [image, text cell] (text cell must not be omitted)
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // For text cell, use the image alt text as fallback for title, styled as a heading
    let textCell = '';
    if (img && img.alt) {
      const title = document.createElement('h3');
      title.textContent = img.alt;
      textCell = title;
    } else {
      textCell = '';
    }
    return [img, textCell];
  });

  // Compose the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
