/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Only direct children that are links (cards)
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach((cardLink) => {
      // Image (if present)
      let img = cardLink.querySelector('img');
      // Title (h3)
      let title = cardLink.querySelector('h3');
      // Description (div.paragraph-sm)
      let desc = cardLink.querySelector('.paragraph-sm');
      // Defensive: fallback if not found
      // Compose text cell
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      cards.push([
        img || '',
        textCell
      ]);
    });
    return cards;
  }

  // Find all tab panes (each with a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  let allCards = [];
  tabPanes.forEach((tabPane) => {
    // Find the grid inside this tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      allCards = allCards.concat(cards);
    }
  });

  // Compose the table rows
  const headerRow = ['Cards (cards23)'];
  const tableRows = [headerRow, ...allCards];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
