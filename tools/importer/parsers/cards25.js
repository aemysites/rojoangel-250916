/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card-like div
  function extractCardContent(cardDiv) {
    const img = cardDiv.querySelector('img');
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        textContainer = document.createElement('div');
        if (h3) textContainer.appendChild(h3.cloneNode(true));
        if (p) textContainer.appendChild(p.cloneNode(true));
      }
    }
    // Only return if both image and text content are present
    if (img && textContainer && textContainer.textContent.trim()) {
      return [img, textContainer];
    }
    return null;
  }

  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Only include cards with both image and non-empty text content
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  cards.forEach((cardDiv) => {
    const card = extractCardContent(cardDiv);
    if (card) {
      rows.push(card);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
