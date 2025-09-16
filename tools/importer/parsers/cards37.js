/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image from a card anchor/div
  function extractImage(card) {
    // Find the first <img> inside the card
    return card.querySelector('img');
  }

  // Helper to extract the text content (title, description, CTA) from a card anchor/div
  function extractTextContent(card) {
    const fragment = document.createDocumentFragment();
    // Title: h2 or h3 or h4
    let title = card.querySelector('h2, h3, h4');
    if (title) fragment.appendChild(title);
    // Description: first <p>
    let desc = card.querySelector('p');
    if (desc) fragment.appendChild(desc);
    // CTA: .button or a.button
    let cta = card.querySelector('.button, a.button');
    if (cta) fragment.appendChild(cta);
    return fragment;
  }

  // Find the grid that contains the cards
  const container = element.querySelector('.w-layout-grid.grid-layout');
  if (!container) return;

  // The first card is a direct child <a> of the grid
  const cards = [];
  // Get all direct children of the grid
  const children = Array.from(container.children);
  // First child is a card (large card)
  if (children[0].matches('a')) {
    cards.push(children[0]);
  }
  // Second child is a nested grid containing more cards
  if (children[1] && children[1].classList.contains('w-layout-grid')) {
    const nestedCards = Array.from(children[1].querySelectorAll(':scope > a'));
    cards.push(...nestedCards);
  }

  // Defensive: If there are more direct <a> after the nested grid, add them
  for (let i = 2; i < children.length; i++) {
    if (children[i].matches('a')) {
      cards.push(children[i]);
    }
  }

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);
  // Card rows
  cards.forEach(card => {
    const img = extractImage(card);
    const textContent = extractTextContent(card);
    rows.push([
      img ? img : '',
      textContent.childNodes.length > 0 ? textContent : '',
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
